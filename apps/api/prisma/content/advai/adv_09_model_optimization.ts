export const adv_09_model_optimization = {
  MODEL_OPTIMIZATION: {
    title: 'Model Optimization & Quantization',
    description: 'Master techniques to compress and accelerate ML models for production: quantization, pruning, distillation, and graph compilation.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 75,
    prerequisites: ['GPU Computing & CUDA Fundamentals'],
    learningContent: `
# Model Optimization & Quantization

## 1. Why Optimize Models?
Large models (especially LLMs) are bottlenecked by memory bandwidth and footprint.
- A 70B parameter model in FP16 requires ~140 GB of VRAM just for weights (requires 2× 80GB A100s).
- Loading 140 GB from HBM to compute units takes ~70ms at 2 TB/s bandwidth (speed of light limit for one token).
Optimization reduces memory size and increases throughput.

## 2. Quantization
Convert model weights (and sometimes activations) from higher precision (FP32/FP16) to lower precision (INT8/INT4).

**Post-Training Quantization (PTQ):**
Quantize a trained model without retraining. Fast, but can degrade accuracy on smaller models.
- **W8A8 (INT8):** Both weights and activations quantized. ~4x smaller.
- **W4A16 (INT4):** Weights quantized to 4-bit, activations stay FP16. ~8x smaller. Used heavily for LLMs (AWQ, GPTQ, GGUF).

\`\`\`python
# Example: HuggingFace with AWQ (Activation-aware Weight Quantization)
from transformers import AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained(
    "TheBloke/Llama-2-7b-Chat-AWQ",
    device_map="auto"
)
# The model weights are now stored as 4-bit integers in VRAM.
# During inference, they are decompressed to FP16 in the GPU cache for computation.
\`\`\`

**Quantization-Aware Training (QAT):**
Simulate quantization effects during training (fake quantization). Yields higher accuracy but requires training compute.

## 3. Pruning
Remove less important weights (or entire neurons/channels) from the model.
- **Unstructured pruning:** Zero out individual weights. (Hardware often can't accelerate this without specialized sparse tensor cores).
- **Structured pruning:** Remove entire channels or attention heads. Leads to immediate memory and latency gains.

## 4. Knowledge Distillation
Train a smaller "student" model to mimic the outputs (logits) of a larger "teacher" model.
- The student learns the "soft targets" (probability distribution) of the teacher, which contains more information than hard labels.
- Loss = α * CrossEntropy(Student, True Labels) + (1-α) * KL_Divergence(Student_Logits, Teacher_Logits)

## 5. Model Compilation & Graph Optimization
Frameworks like PyTorch execute eagerly (op-by-op). Model compilation fuses operations into optimized CUDA kernels.
- **Operator Fusion:** e.g., combining MatMul + Add + ReLU into a single kernel execution, saving memory read/writes.
- **ONNX Runtime / TensorRT:** Export model to an optimized execution engine.
- **torch.compile:** PyTorch 2.0+ JIT compiler.

\`\`\`python
import torch

model = MyModel().cuda()
# Compile the model to fuse operations and optimize execution
optimized_model = torch.compile(model)

# First few runs will be slow (JIT compilation phase)
# Subsequent runs will be 1.2x - 2.0x faster
for _ in range(10):
    outputs = optimized_model(inputs)
\`\`\`
`,
    fullNotes: `
# Detailed Notes: Model Optimization

- **GPTQ vs AWQ:** Both are W4A16 PTQ methods for LLMs. AWQ observes that ~1% of salient weights are critical for performance and keeps them in FP16 while quantizing the rest to INT4. GPTQ uses second-order information (Hessian) to optimally adjust remaining weights to compensate for quantization error.
- **KV Cache Quantization:** In LLMs, the KV cache grows linearly with context length. Quantizing the KV cache from FP16 to FP8 or INT8 is critical for serving long-context requests concurrently.
- **TensorRT-LLM:** NVIDIA's highly optimized library for LLM inference. It compiles the model into a TensorRT engine with fused attention (FlashAttention), in-flight batching, and optimized decoding kernels.
`,
    shortNotes: `
- Optimization goals: reduce memory footprint, reduce latency, increase throughput
- Quantization: reduce precision (FP16 → INT8/INT4). W4A16 is standard for LLMs.
- PTQ (Post-Training) vs QAT (Quantization-Aware Training)
- Pruning: unstructured (sparse weights) vs structured (remove channels/heads)
- Distillation: train small student to match large teacher's logits
- Model Compilation: fuse operations (MatMul+ReLU) to reduce HBM memory bandwidth
- torch.compile(): PyTorch 2.x feature for easy model compilation
`,
    cheatSheet: `
### Quantization Formats Comparison
| Format | Weights | Activations | Size vs FP16 | Accuracy Drop | Best For |
|--------|---------|-------------|--------------|---------------|----------|
| FP16/BF16 | 16-bit | 16-bit | 1.0x | None | Baseline/Training |
| INT8 (W8A8) | 8-bit | 8-bit | 0.5x | Minimal | High throughput serving |
| INT4 (W4A16) | 4-bit | 16-bit | ~0.25x | Low-Mod | Consumer GPUs, Memory-bound |
| GGUF (llama.cpp) | 2-8 bit | FP16/32 | Variable | Variable | CPU/Mac inference |

### Optimization Pipeline
1. Choose smaller architecture / Distillation
2. Apply INT8/INT4 Quantization
3. Compile with torch.compile or TensorRT
`,
    interviewQuestions: [
      { question: 'Why does W4A16 quantization (4-bit weights, 16-bit activations) provide a speedup for LLM inference even though the actual math is still done in 16-bit precision?', answerHint: 'LLM inference during the decoding phase (generating tokens one by one) is heavily memory-bandwidth bound, not compute-bound. The GPU is waiting for weights to be loaded from HBM into the SM registers. W4A16 stores the weights in 4-bit in HBM. When a weight is needed, the GPU reads the 4-bit value (taking 1/4th the bandwidth/time of FP16), loads it into the fast L1/L2 cache or registers, and then dynamically de-quantizes it back to FP16 to perform the matrix multiplication. The time saved transferring data from HBM vastly outweighs the small compute overhead of de-quantization, resulting in faster inference.', type: 'TECHNICAL' },
      { question: 'What is operator fusion and why is it important for GPU performance?', answerHint: 'Operator fusion combines multiple sequential operations (e.g., Matrix Multiply -> Bias Add -> ReLU) into a single optimized GPU kernel. Without fusion, PyTorch executes them independently: it computes the MatMul, writes the result to HBM, reads it back for the Bias Add, writes it back, reads it again for ReLU, and writes it back. This causes excessive memory bandwidth usage (the main bottleneck). A fused kernel performs all three operations while the data is still in the ultra-fast on-chip registers, drastically reducing HBM traffic and speeding up execution. Tools like torch.compile and TensorRT automate this.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'PyTorch torch.compile Tutorial', url: 'https://pytorch.org/tutorials/intermediate/torch_compile_tutorial.html', type: 'ARTICLE', priority: 'S', source: 'PyTorch', isOfficial: true, description: 'Official guide to PyTorch model compilation.' },
      { title: 'A Survey of Quantization Methods for LLMs', url: 'https://arxiv.org/abs/2208.07339', type: 'ARTICLE', priority: 'A', source: 'arXiv', isOfficial: false, description: 'Comprehensive review of quantization techniques like PTQ and QAT.' }
    ]
  }
};
