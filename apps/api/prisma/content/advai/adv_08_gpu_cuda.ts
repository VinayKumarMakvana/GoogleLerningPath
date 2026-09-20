export const adv_08_gpu_cuda = {
  GPU_CUDA: {
    title: 'GPU Computing & CUDA Fundamentals',
    description: 'Master GPU architecture, CUDA programming model, memory hierarchy, GPU profiling, and AI/ML engineering performance concepts.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 75,
    prerequisites: ['Distributed ML Training'],
    learningContent: `
# GPU Computing & CUDA Fundamentals

## 1. GPU vs CPU Architecture
| Characteristic | CPU | GPU |
|---------------|-----|-----|
| Cores | 8-128 large cores | Thousands of small cores |
| Clock speed | 3-5 GHz | 1-2 GHz |
| Optimization | Low latency (single thread) | High throughput (parallel) |
| Memory | DDR5 (100 GB/s) | HBM3 (3.3 TB/s bandwidth) |
| Cache | Large (per-core L1/L2/L3) | Small (shared per SM) |
| Best for | Sequential logic | Embarrassingly parallel math |

**Why GPUs dominate ML:** Matrix multiplication (the core of neural networks) is embarrassingly parallel — each output element is independent. A GPU with 10,000+ cores computes all matrix elements simultaneously.

## 2. CUDA Programming Model
\`\`\`cuda
// CUDA kernel: runs in parallel on the GPU
__global__ void matrix_add(float* A, float* B, float* C, int N) {
    // Each thread computes one element
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < N) {
        C[idx] = A[idx] + B[idx];
    }
}

// Host (CPU) code
int main() {
    int N = 1024 * 1024;
    float *d_A, *d_B, *d_C;

    // Allocate on GPU (device)
    cudaMalloc(&d_A, N * sizeof(float));
    cudaMalloc(&d_B, N * sizeof(float));
    cudaMalloc(&d_C, N * sizeof(float));

    // Copy from CPU (host) to GPU (device)
    cudaMemcpy(d_A, h_A, N * sizeof(float), cudaMemcpyHostToDevice);
    cudaMemcpy(d_B, h_B, N * sizeof(float), cudaMemcpyHostToDevice);

    // Launch: 256 threads per block, N/256 blocks
    int threadsPerBlock = 256;
    int blocksPerGrid = (N + threadsPerBlock - 1) / threadsPerBlock;
    matrix_add<<<blocksPerGrid, threadsPerBlock>>>(d_A, d_B, d_C, N);

    // Copy result back to CPU
    cudaMemcpy(h_C, d_C, N * sizeof(float), cudaMemcpyDeviceToHost);
}
\`\`\`

## 3. GPU Memory Hierarchy
\`\`\`
Global Memory (VRAM, HBM): 24-80 GB, ~3 TB/s bandwidth, high latency
    ↓ (cached)
L2 Cache: Few MB, shared across all SMs
    ↓
Shared Memory (per SM): 48-228 KB, very fast (similar to L1 latency)
    ↓
Registers (per thread): Fastest, 255 registers per thread limit
\`\`\`

**Memory bottleneck in ML:** Most DL operations are memory-bandwidth bound, not compute-bound. Flash Attention rewrites the attention kernel to minimize global memory reads/writes.

## 4. GPU Utilization and Profiling
\`\`\`python
# PyTorch profiler: identify GPU bottlenecks
from torch.profiler import profile, record_function, ProfilerActivity

with profile(activities=[ProfilerActivity.CPU, ProfilerActivity.CUDA]) as prof:
    with record_function("model_forward"):
        output = model(input_tensor)

print(prof.key_averages().table(sort_by="cuda_time_total", row_limit=10))

# nvidia-smi monitoring (shell)
# watch -n 1 nvidia-smi  → real-time GPU utilization
# Key metrics: GPU-Util (%), Memory-Used/Total, Power (W)

# PyTorch memory tracking
print(torch.cuda.memory_summary(device='cuda:0'))
\`\`\`

## 5. Key Performance Concepts for AI
- **SM (Streaming Multiprocessor):** Basic processing unit on NVIDIA GPU. Each SM runs many warps (groups of 32 threads) concurrently.
- **Warp:** 32 threads that execute the same instruction in lockstep (SIMT — Single Instruction, Multiple Threads). Branch divergence within a warp is costly.
- **Occupancy:** How well the GPU is utilized. Low occupancy → GPU is underutilized.
- **Memory bandwidth vs compute:** For small batches, models are memory-bandwidth bound. For large batches, they are compute-bound. Batch size determines the performance regime.
`,
    fullNotes: `
# Detailed Notes: GPU and CUDA

- **Tensor Cores:** NVIDIA Volta+ GPUs have Tensor Cores that perform 4×4 matrix multiply-accumulate operations in a single clock cycle. PyTorch automatically uses Tensor Cores for FP16 and BF16 matrix operations. This is why using float16 (torch.autocast) often provides 2-4× speedup over float32 on modern GPUs.
- **NVLink vs PCIe:** Multiple GPUs can communicate over PCIe (slower) or NVLink (faster). NVLink provides 600 GB/s bidirectional bandwidth between A100s, vs ~64 GB/s for PCIe 4.0. Critical for DDP and model parallelism communication.
- **CUDA Streams:** Enable concurrent GPU kernel execution. Multiple independent operations can be submitted to different CUDA streams and execute in parallel (if enough GPU resources). PyTorch uses streams internally for overlapping data transfers and computation.
`,
    shortNotes: `
- GPU: thousands of small cores optimized for massively parallel math
- CUDA kernel: function running in parallel across thousands of threads
- Grid → Blocks → Threads: three-level hierarchy for work distribution
- GPU memory hierarchy: HBM (large, slow) → L2 → Shared Memory → Registers (fast, small)
- Most DL is memory-bandwidth bound (not compute bound) — minimize memory access
- Tensor Cores: specialized units for FP16/BF16 matrix multiply → use autocast
- Profile before optimizing: torch profiler shows where time is actually spent
`,
    cheatSheet: `
### GPU Memory Math for LLMs
\`\`\`
Memory for model weights:
  Parameters × bytes_per_param
  7B params × 2 bytes (FP16) = 14 GB
  7B params × 0.5 bytes (INT4) = 3.5 GB

Memory for KV Cache:
  batch_size × num_layers × num_heads × head_dim × seq_len × 2 (K,V) × 2 bytes
  (grows linearly with batch size and sequence length)

Total GPU memory needed:
  Weights + KV Cache + Activations + Overhead
\`\`\`
### PyTorch GPU Memory Optimization
\`\`\`python
# Mixed precision (2× speedup, 2× memory saving)
with torch.autocast('cuda', dtype=torch.bfloat16): outputs = model(inputs)

# Gradient checkpointing (recompute activations, save 4-8× memory)
model.gradient_checkpointing_enable()

# Clear cache between runs
torch.cuda.empty_cache()
\`\`\`
`,
    interviewQuestions: [
      { question: 'Why is GPU memory bandwidth often the bottleneck in LLM inference, not compute?', answerHint: 'LLM inference (especially at small batch sizes) is memory-bandwidth bound, not compute-bound. During the decoding phase (generating one token at a time), the model must load all 7B+ parameters from GPU HBM memory for each forward pass. For a 7B model in FP16, that\'s 14 GB of memory reads per token. An A100 has ~312 TFLOPS of compute but 2 TB/s of memory bandwidth. Arithmetic intensity (FLOPs per byte) for small batch token generation is very low — the GPU is mostly waiting for data from memory. Solutions: quantization (reduce bytes read), batching (amortize parameter reads across requests), speculative decoding.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'CUDA Programming Guide (NVIDIA)', url: 'https://docs.nvidia.com/cuda/cuda-c-programming-guide/', type: 'ARTICLE', priority: 'S', source: 'NVIDIA', isOfficial: true, description: 'Official NVIDIA CUDA programming reference.' },
      { title: 'Making Deep Learning Go Brrrr (Horace He)', url: 'https://horace.io/brrr_intro.html', type: 'ARTICLE', priority: 'S', source: 'Horace He', isOfficial: false, description: 'The best intuitive explanation of GPU performance for ML — memory vs compute bound.' }
    ]
  }
};
