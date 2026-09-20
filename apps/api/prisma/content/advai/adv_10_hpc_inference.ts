export const adv_10_hpc_inference = {
  HPC_INFERENCE: {
    title: 'High-Performance Model Serving',
    description: 'Master architectures for high-performance ML inference, request batching, concurrency, autoscaling, and multi-model serving.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 75,
    prerequisites: ['Model Serving & Inference Fundamentals', 'Model Optimization & Quantization'],
    learningContent: `
# High-Performance Model Serving

## 1. Inference Architecture Patterns
**Embedded Serving:**
Model is loaded directly within the application process (e.g., a Flask/FastAPI app loading a scikit-learn model).
- Pros: Simple, zero network latency between app and model.
- Cons: App and model scale together. Python GIL limits concurrency. Model updates require app restarts.

**Model-as-a-Service (Dedicated Inference Server):**
Model runs in a dedicated microservice (e.g., Triton, TorchServe, BentoML). Application calls it via REST/gRPC.
- Pros: Independent scaling (scale GPUs for model, CPUs for app). Multi-model serving on one GPU.
- Cons: Network overhead, system complexity.

## 2. NVIDIA Triton Inference Server
Triton is the industry standard for serving ML models on GPUs. It supports PyTorch, ONNX, TensorFlow, and Python backends.

**Key Triton Features:**
- **Concurrent model execution:** Multiple models can run on the same GPU simultaneously.
- **Dynamic batching:** Combines individual inference requests into a batch to maximize GPU throughput.
- **Shared memory:** Avoids serialization/deserialization overhead between client and server.

\`\`\`
# Triton Model Repository Structure
model_repository/
  my_model/
    config.pbtxt        # Model configuration (batch size, backend)
    1/                  # Version 1
      model.plan        # TensorRT engine or model.pt
    2/                  # Version 2
      model.plan
\`\`\`

## 3. Dynamic Batching
A GPU is vastly underutilized when processing single requests. Dynamic batching holds an incoming request for a few milliseconds to group it with other incoming requests, performing one batched forward pass.

\`\`\`text
# Triton config.pbtxt dynamic batching configuration
dynamic_batching {
  max_queue_delay_microseconds: 5000  # Wait up to 5ms to form a batch
}
\`\`\`
*Tradeoff:* Increases individual request latency (by max 5ms) but drastically increases overall system throughput (requests per second).

## 4. Multi-Model Serving and Routing
Serving one model per GPU is inefficient if the model is small or traffic is low.

- **Multi-tenant GPUs:** Load multiple different models onto the same GPU (e.g., via Triton or NVIDIA MIG - Multi-Instance GPU).
- **Model Routing:** An API gateway routes traffic based on requested model version, user tier, or shadow deployment rules.

## 5. Handling Model Loading & Cold Starts
Models take time to load from disk/network into GPU memory (seconds to minutes).
- **Cold start problem:** When an autoscaler spins up a new pod, the first request hits a loading delay.
- **Solution:** Readiness probes. The serving container must only report "Ready" (so the load balancer sends traffic) *after* the model is fully loaded into VRAM and a warmup request has been processed.

\`\`\`python
# FastAPI Example of warmup
@app.on_event("startup")
async def startup_event():
    model.load()
    # Warmup request to trigger JIT compilation/initialization
    dummy_input = torch.zeros((1, 3, 224, 224)).cuda()
    model(dummy_input)
\`\`\`
`,
    fullNotes: `
# Detailed Notes: High-Performance Inference

- **gRPC vs REST:** High-performance serving uses gRPC (Protocol Buffers) over HTTP/2 rather than REST (JSON) over HTTP/1.1. gRPC uses binary serialization, which is much faster and smaller than parsing JSON, especially for large multidimensional arrays (tensors).
- **Autoscaling Metrics:** CPU utilization is a poor autoscaling metric for GPU workloads. Scale based on GPU utilization, inference queue depth, or request concurrency.
- **NVIDIA MIG (Multi-Instance GPU):** Physically partitions a large GPU (like an A100) into up to 7 isolated smaller GPUs, each with dedicated memory and compute bandwidth. Solves the noisy neighbor problem in multi-model serving.
`,
    shortNotes: `
- Model-as-a-Service > Embedded serving for scaling and GPU management
- Triton Inference Server: industry standard, supports multiple frameworks, dynamic batching
- Dynamic Batching: trades slight latency delay (e.g., 5ms) for massive throughput gains
- Use gRPC instead of REST for fast tensor serialization
- Always implement startup warmup requests to prevent cold-start latency spikes
- Autoscaler should watch GPU utilization or queue depth, not CPU
`,
    cheatSheet: `
### Serving Optimization Checklist
- [ ] Use a dedicated inference server (Triton, TorchServe)
- [ ] Serialize model to optimized format (ONNX, TensorRT)
- [ ] Enable dynamic batching with tuned max delay
- [ ] Implement startup warmup requests
- [ ] Use gRPC for communication
- [ ] Configure readiness probes to wait for model load
- [ ] Autoscale based on custom GPU/queue metrics
`,
    interviewQuestions: [
      { question: 'What is dynamic batching in an inference server and what is the key tradeoff?', answerHint: 'Dynamic batching is a feature where the inference server pauses the processing of an incoming request for a short window (e.g., 2-10ms) to wait for other requests to arrive. It then groups them together into a single batch and executes one forward pass on the GPU. The tradeoff is latency vs. throughput: it adds artificial latency to individual requests (up to the max wait window), but significantly increases the overall throughput (requests per second) and GPU utilization, since GPUs are highly efficient at parallel matrix operations but inefficient at single-item processing.', type: 'TECHNICAL' },
      { question: 'How do you handle the cold start problem when scaling out ML model serving?', answerHint: 'ML models (especially large ones) take significant time to load from storage into GPU memory, and frameworks like PyTorch or TensorRT often require a "warmup" forward pass to initialize memory allocators and JIT-compiled kernels. To handle cold starts: (1) Use Kubernetes readiness probes that only return HTTP 200 after the model is loaded AND a dummy warmup request has completed. This prevents the load balancer from sending user traffic to the pod before it\'s ready. (2) Keep a minimum number of replicas always running (min_replicas > 0). (3) Use predictive autoscaling to spin up pods before traffic spikes.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'NVIDIA Triton Inference Server Documentation', url: 'https://github.com/triton-inference-server/server', type: 'ARTICLE', priority: 'S', source: 'NVIDIA', isOfficial: true, description: 'Official Triton GitHub and documentation.' },
      { title: 'Machine Learning System Design Interview: Serving', url: 'https://huyenchip.com/machine-learning-systems-design/serving.html', type: 'BOOK', priority: 'A', source: 'Chip Huyen', isOfficial: false, description: 'Chapter on model deployment and serving patterns.' }
    ]
  }
};
