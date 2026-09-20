export const adv_12_vllm_serving = {
  VLLM_SERVING: {
    title: 'vLLM & Modern Inference Serving',
    description: 'Deploy and configure vLLM in production, manage OpenAI-compatible APIs, handle GPU memory, and tune serving parameters.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 60,
    prerequisites: ['LLM Inference Systems'],
    learningContent: `
# vLLM & Modern Inference Serving

## 1. What is vLLM?
vLLM is the leading open-source LLM inference and serving engine. It implements PagedAttention, continuous batching, tensor parallelism, and optimized CUDA kernels (FlashAttention) to deliver state-of-the-art throughput.

## 2. Deploying vLLM
vLLM can run as a Python library or as a standalone OpenAI-compatible API server.

**Python API:**
\`\`\`python
from vllm import LLM, SamplingParams

# Load model (allocates KV cache and weights)
llm = LLM(model="meta-llama/Llama-3-8B-Instruct", tensor_parallel_size=1)

prompts = ["Explain PagedAttention:", "Write a haiku about GPUs:"]
sampling_params = SamplingParams(temperature=0.7, max_tokens=100)

# Batch inference
outputs = llm.generate(prompts, sampling_params)
for output in outputs:
    print(output.outputs[0].text)
\`\`\`

**OpenAI-Compatible API Server:**
\`\`\`bash
# Start server
python -m vllm.entrypoints.openai.api_server \\
    --model meta-llama/Llama-3-8B-Instruct \\
    --tensor-parallel-size 1 \\
    --gpu-memory-utilization 0.90 \\
    --max-model-len 8192
\`\`\`
Clients can now connect using the standard OpenAI Python SDK, pointing the \`base_url\` to the vLLM server.

## 3. Key vLLM Configuration Parameters

| Parameter | Function | Production Tuning |
|-----------|----------|------------------|
| \`--tensor-parallel-size\` | Number of GPUs to split the model across | Set to minimum GPUs needed to fit model weights + KV cache |
| \`--gpu-memory-utilization\` | Fraction of GPU memory to pre-allocate | Default 0.90. Reduce if running other processes on GPU |
| \`--max-model-len\` | Max context length | Reduce to save KV cache memory if long context isn't needed |
| \`--max-num-seqs\` | Max concurrent requests (batch size) | Tuned automatically by vLLM based on available memory |
| \`--quantization\` | awq, gptq, squeezellm | Use to serve larger models on less hardware |

## 4. Alternative Serving Engines
While vLLM is standard for open-source deployment, others exist for specific needs:
- **TensorRT-LLM (NVIDIA):** Highest peak performance on NVIDIA hardware, requires ahead-of-time model compilation.
- **TGI (Text Generation Inference, HuggingFace):** Strong alternative, well-integrated with HF ecosystem.
- **llama.cpp:** C++ implementation, optimized for CPU and Apple Silicon (Macs) using GGUF quantization.
- **SGLang:** Emerging framework with aggressive prefix caching and constrained decoding.

## 5. Structured Outputs (JSON)
Production agents require structured JSON outputs.
vLLM supports this natively using the \`guided-decoding\` parameters (Outlines integration).

\`\`\`python
# Client-side request to vLLM server
response = client.chat.completions.create(
    model="meta-llama/Llama-3-8B-Instruct",
    messages=[{"role": "user", "content": "Extract user info"}],
    extra_body={
        "guided_json": {
            "type": "object",
            "properties": {
                "name": {"type": "string"},
                "age": {"type": "integer"}
            }
        }
    }
)
\`\`\`
This uses finite-state machines to force the model to output valid JSON, eliminating JSON parsing errors in agent workflows.
`,
    fullNotes: `
# Detailed Notes: vLLM Serving

- **Pre-allocation:** When vLLM starts, it loads model weights, then profiles the remaining GPU memory and pre-allocates almost all of it (governed by \`gpu-memory-utilization\`) for the PagedAttention KV cache. This prevents Out-Of-Memory (OOM) errors during generation but means nvidia-smi will always show the GPU memory as nearly full, even when idle.
- **LoRA Serving (Multi-LoRA):** vLLM supports serving a base model alongside multiple LoRA adapters. Requests specify which LoRA to use. Since LoRAs are small, thousands can be loaded simultaneously on one GPU, enabling highly personalized multi-tenant serving (e.g., a different fine-tuned model for every customer) without multiplying the base model memory cost.
`,
    shortNotes: `
- vLLM: high-throughput serving engine using PagedAttention and continuous batching
- Runs as an OpenAI-compatible API server → drop-in replacement for OpenAI API
- tensor_parallel_size: splits model across N GPUs to fit memory
- gpu_memory_utilization: pre-allocates memory for KV cache (default 90%)
- Guided decoding: enforces JSON schema output using finite-state machines
- TensorRT-LLM: faster but requires AOT compilation. llama.cpp: best for CPU/Mac.
- Multi-LoRA serving: serve 1 base model + many LoRA adapters concurrently
`,
    cheatSheet: `
### Start vLLM Production Server
\`\`\`bash
python -m vllm.entrypoints.openai.api_server \\
  --model mistralai/Mistral-7B-Instruct-v0.2 \\
  --tensor-parallel-size 2 \\
  --gpu-memory-utilization 0.95 \\
  --max-model-len 16384 \\
  --enable-lora \\
  --port 8000
\`\`\`
### Query with OpenAI SDK
\`\`\`python
from openai import OpenAI
client = OpenAI(base_url="http://localhost:8000/v1", api_key="EMPTY")
response = client.chat.completions.create(...)
\`\`\`
`,
    interviewQuestions: [
      { question: 'When you start vLLM, nvidia-smi immediately shows 90% GPU memory usage even before any requests arrive. Why does this happen, and is it a memory leak?', answerHint: 'It is not a memory leak; it is an intentional design choice called pre-allocation. When vLLM initializes, it loads the model weights into GPU memory, determines how much memory is left, and then pre-allocates a massive pool of memory for the PagedAttention KV cache (up to the gpu-memory-utilization limit, default 90%). During inference, vLLM manages this memory pool internally using its own page allocator. This guarantees that vLLM will never encounter a sudden CUDA Out-Of-Memory (OOM) error during generation, which is a common failure mode in dynamic allocation systems.', type: 'TECHNICAL' },
      { question: 'How would you serve 100 differently fine-tuned LLMs to 100 different customers efficiently?', answerHint: 'Serving 100 full models is cost-prohibitive. The solution is Multi-LoRA serving. We fine-tune the models using LoRA (Low-Rank Adaptation), which results in small adapter weights (~100MB each) rather than full model copies. We use an inference server like vLLM that supports Multi-LoRA. We load the base model weights into GPU memory once, and load all 100 LoRA adapters into memory alongside it. When a request arrives, the user specifies their specific LoRA ID. The server routes the request through the base model, dynamically applying the specific LoRA weights during the forward pass. This allows thousands of custom models to be served concurrently on a single GPU cluster.', type: 'SYSTEM_DESIGN' }
    ],
    resources: [
      { title: 'vLLM Documentation', url: 'https://docs.vllm.ai/', type: 'ARTICLE', priority: 'S', source: 'vLLM Team', isOfficial: true, description: 'Official vLLM documentation and deployment guides.' },
      { title: 'Outlines (Structured Decoding)', url: 'https://github.com/outlines-dev/outlines', type: 'ARTICLE', priority: 'A', source: 'Outlines', isOfficial: true, description: 'Library for guided generation used within vLLM.' }
    ]
  }
};
