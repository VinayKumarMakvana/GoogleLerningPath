export const adv_11_llm_inference = {
  LLM_INFERENCE: {
    title: 'LLM Inference Systems',
    description: 'Master the mechanics of LLM inference: autoregressive decoding, prefill vs decode phases, KV cache, and throughput/latency tradeoffs.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 75,
    prerequisites: ['Large Language Model Foundations', 'High-Performance Model Serving'],
    learningContent: `
# LLM Inference Systems

## 1. The Two Phases of LLM Inference
Autoregressive text generation happens in two distinct phases with very different performance characteristics.

**Phase 1: Prefill (Prompt Processing)**
The model processes the entire input prompt in one parallel forward pass to compute the initial KV cache and generate the first token.
- **Compute-bound:** High arithmetic intensity (matrix-matrix multiplication).
- **GPU highly utilized:** Excellent parallel efficiency.
- **Metric:** Time to First Token (TTFT).

**Phase 2: Decode (Token Generation)**
The model generates subsequent tokens one-by-one. Each step depends on the previous step.
- **Memory-bandwidth-bound:** Low arithmetic intensity (matrix-vector multiplication). The GPU must load all weights from HBM to compute just one token.
- **GPU underutilized:** Compute units sit idle waiting for memory.
- **Metric:** Time Per Output Token (TPOT) or Inter-Token Latency (ITL).

## 2. The KV Cache
During the decode phase, the model needs the Key (K) and Value (V) tensors for all previous tokens to compute attention.
Instead of recomputing them, we store them in GPU memory: the **KV Cache**.

\`\`\`text
KV Cache Memory Size = batch_size × seq_len × num_layers × num_heads × head_dim × 2 (K and V) × bytes_per_element
\`\`\`
For a 70B model with 32k context, the KV cache can easily exceed the size of the model weights!
Managing KV cache memory is the central challenge of LLM serving.

## 3. Naive Batching vs Continuous Batching
**Naive Batching (Static):**
Requests are grouped into a batch. The batch only finishes when the *longest* generation completes.
- **Problem:** Early-finishing requests sit idle, wasting GPU compute. New requests cannot join until the whole batch finishes.

**Continuous Batching (In-Flight Batching):**
Invention by Orca (2022). Request processing operates at the *iteration level*, not the batch level.
- As soon as Request A finishes, it is evicted.
- Request C immediately takes its place in the batch for the next iteration.
- *Massively* increases throughput (up to 10-20x vs naive batching).

## 4. PagedAttention
Invention by vLLM (2023).
In standard serving, the KV cache for a sequence is allocated in contiguous memory based on maximum possible length.
- **Problem:** Internal fragmentation. Most requests finish early, wasting huge amounts of allocated memory.
- **Solution:** PagedAttention divides the KV cache into fixed-size blocks (pages), analogous to virtual memory in OS. Pages are allocated non-contiguously on demand.
- Eliminates fragmentation, allowing the server to fit many more requests in a batch (higher throughput).

## 5. Speculative Decoding
Decoding is memory-bandwidth bound. We can trade spare compute for faster memory access.
1. A small, fast "draft" model generates K speculative tokens (e.g., 4 tokens).
2. The large "target" model verifies all K tokens in a single parallel forward pass (like a prefill step).
3. Accept the valid tokens, reject the rest, and continue.
Result: Generate multiple tokens per single weight load, increasing generation speed by 2-3x without changing the output distribution.
`,
    fullNotes: `
# Detailed Notes: LLM Inference

- **Throughput vs Latency Tradeoff:** Increasing batch size improves token throughput (tokens/sec) because it amortizes the cost of loading model weights from HBM across multiple requests. However, it increases Time Per Output Token (latency) because computing a larger batch takes slightly longer. Production serving requires tuning the maximum batch size to stay within latency SLAs (e.g., TPOT < 50ms for reading speed).
- **Prefix Caching:** If many users send prompts with the same system instruction or document context (e.g., RAG), the KV cache for that prefix can be computed once and shared across requests, drastically reducing prefill time (TTFT) and compute costs.
`,
    shortNotes: `
- Prefill phase: processes prompt, compute-bound, metric = TTFT (Time to First Token)
- Decode phase: generates output, memory-bandwidth bound, metric = TPOT (Time per Output Token)
- KV Cache: stores keys/values of past tokens to avoid recomputation, takes huge memory
- Continuous Batching: evict finished requests and insert new ones iteration-by-iteration
- PagedAttention (vLLM): allocates KV cache in fixed pages to eliminate memory fragmentation
- Speculative Decoding: draft model guesses tokens, large model verifies in parallel (speedup)
- Prefix caching: share KV cache for common prompt prefixes across users
`,
    cheatSheet: `
### LLM Inference Metrics
| Metric | Definition | User Experience |
|--------|------------|-----------------|
| TTFT | Time To First Token | Snappiness / Response delay |
| TPOT / ITL | Time Per Output Token | Generation speed / Reading speed |
| E2E Latency | TTFT + (TPOT * tokens) | Total wait time |
| Throughput | Output tokens per second | System capacity / Cost efficiency |

### Core Innovations
- **Orca (Continuous Batching):** Solves batch fragmentation (compute waste).
- **vLLM (PagedAttention):** Solves memory fragmentation (memory waste).
- **Speculative Decoding:** Trades compute for memory bandwidth.
`,
    interviewQuestions: [
      { question: 'Explain the difference between the prefill and decode phases of LLM inference.', answerHint: 'The prefill phase processes the input prompt to generate the initial KV cache and the first output token. It happens in parallel across the prompt tokens, making it compute-bound (high arithmetic intensity) and efficient on GPUs. The metric is Time-to-First-Token (TTFT). The decode phase generates subsequent tokens one by one autoregressively. Each step depends on the previous one. To generate a token, the GPU must load the entire model weights from HBM, perform a small matrix-vector multiplication, and write back. This makes it heavily memory-bandwidth bound. The metric is Time-Per-Output-Token (TPOT).', type: 'TECHNICAL' },
      { question: 'What problem does PagedAttention solve in LLM serving?', answerHint: 'Before PagedAttention, serving systems pre-allocated contiguous memory for the maximum possible length of a request\'s KV cache. Since most requests finish well before the max length, this resulted in massive internal memory fragmentation (wasted memory). Because the KV cache is huge, memory limits the maximum batch size, thus limiting throughput. PagedAttention borrows virtual memory concepts from operating systems: it divides the KV cache into fixed-size blocks (pages) that are allocated dynamically and non-contiguously on demand. This virtually eliminates memory waste, allowing the system to batch many more requests concurrently, massively increasing throughput.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'vLLM Paper: PagedAttention', url: 'https://arxiv.org/abs/2309.06180', type: 'ARTICLE', priority: 'S', source: 'arXiv / UC Berkeley', isOfficial: false, description: 'The foundational paper for modern LLM serving architectures.' },
      { title: 'LLM Inference Optimization', url: 'https://kipp.ly/blog/transformer-inference-arithmetic/', type: 'ARTICLE', priority: 'A', source: 'Kipply', isOfficial: false, description: 'Excellent breakdown of LLM inference math and memory bottlenecks.' }
    ]
  }
};
