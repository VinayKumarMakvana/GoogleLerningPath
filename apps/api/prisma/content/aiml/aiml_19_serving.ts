export const aiml_19_serving = {
  MODEL_SERVING: {
    title: 'Model Serving & Inference Fundamentals',
    description: 'Master model serialization, inference APIs, batching, latency/throughput, quantization concepts, and inference monitoring.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 75,
    prerequisites: ['AI Evaluation & Safety', 'Python APIs & Backend Integration'],
    learningContent: `
# Model Serving & Inference Fundamentals

## 1. Model Serialization
\`\`\`python
import torch

# PyTorch: Save and load model weights
torch.save(model.state_dict(), 'model.pth')
model.load_state_dict(torch.load('model.pth'))

# TorchScript: Serialize for production (no Python dependency)
scripted_model = torch.jit.script(model)
scripted_model.save('model_scripted.pt')
scripted_loaded = torch.jit.load('model_scripted.pt')

# ONNX: Interoperable format — export PyTorch, run anywhere
torch.onnx.export(
    model, dummy_input,
    "model.onnx",
    input_names=["input"],
    output_names=["output"],
    dynamic_axes={"input": {0: "batch_size"}}  # Variable batch size
)

# For scikit-learn: joblib
import joblib
joblib.dump(sklearn_model, 'model.pkl')
\`\`\`

## 2. Building Inference APIs
\`\`\`python
from fastapi import FastAPI
from pydantic import BaseModel
import torch
import numpy as np

app = FastAPI()

class PredictRequest(BaseModel):
    features: list[float]

class PredictResponse(BaseModel):
    prediction: float
    probability: float

# Load model once at startup
model = torch.jit.load('model_scripted.pt')
model.eval()

@app.post("/predict", response_model=PredictResponse)
async def predict(request: PredictRequest):
    with torch.no_grad():
        x = torch.FloatTensor([request.features])
        logits = model(x)
        prob = torch.sigmoid(logits).item()
    return PredictResponse(prediction=int(prob > 0.5), probability=prob)
\`\`\`

## 3. Batching for Throughput
\`\`\`python
import asyncio
from collections import defaultdict

# Dynamic batching: accumulate requests and process them together
class DynamicBatcher:
    def __init__(self, max_batch_size=32, max_wait_ms=10):
        self.queue = asyncio.Queue()
        self.max_batch = max_batch_size
        self.max_wait = max_wait_ms / 1000

    async def batch_predict(self, features_list):
        # Single GPU forward pass on entire batch
        with torch.no_grad():
            batch = torch.FloatTensor(features_list)
            return model(batch).tolist()
\`\`\`

**Throughput vs Latency:**
- Single request: low latency, poor GPU utilization
- Batch of 32: higher latency, 10-20× better GPU utilization

## 4. Quantization Concepts
Reduce model size and speed up inference by using lower-precision arithmetic:

| Precision | Size | Speed | Quality Loss |
|-----------|------|-------|-------------|
| float32 | 4B/param | Baseline | None |
| float16 | 2B/param | ~2× | Minimal |
| int8 | 1B/param | ~4× | Small |
| int4 | 0.5B/param | ~8× | Moderate |

\`\`\`python
# Post-training quantization with bitsandbytes
from transformers import AutoModelForCausalLM, BitsAndBytesConfig

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3-8B",
    quantization_config=BitsAndBytesConfig(load_in_8bit=True)
)
\`\`\`

## 5. Caching for LLM APIs
\`\`\`python
import hashlib, redis

redis_client = redis.Redis()

def cached_llm_call(prompt: str, model: str = "gpt-4o") -> str:
    cache_key = hashlib.sha256(f"{model}:{prompt}".encode()).hexdigest()
    cached = redis_client.get(cache_key)
    if cached:
        return cached.decode()

    response = openai_client.chat.completions.create(
        model=model, messages=[{"role":"user","content":prompt}]
    )
    result = response.choices[0].message.content
    redis_client.setex(cache_key, 3600, result)  # Cache for 1 hour
    return result
\`\`\`

## 6. Inference Monitoring
Key metrics to track:
- **Latency:** p50, p95, p99 response times
- **Throughput:** Requests per second
- **Error rate:** 4xx/5xx responses
- **Token usage:** Input/output tokens per request (cost)
- **GPU utilization:** GPU must be well-utilized
- **Cache hit rate:** For prompt caching
`,
    fullNotes: `
# Detailed Notes: Model Serving

- **CPU vs GPU Inference:** LLMs require GPU for reasonable latency. Classical ML models (XGBoost, sklearn) run efficiently on CPU. Small neural networks can be CPU-deployed if latency requirements are relaxed.
- **Model Versioning:** Maintain multiple model versions simultaneously. Use feature flags or A/B routing to direct traffic to specific versions. Shadow mode: new model processes requests silently alongside old model for comparison.
- **Advanced Serving (9L):** vLLM, TensorRT-LLM, continuous batching, speculative decoding, multi-GPU serving — these belong to Phase 9L.
`,
    shortNotes: `
- Serialize PyTorch models with TorchScript or ONNX for production
- FastAPI + Pydantic: standard Python inference API framework
- Batching: process multiple requests together for GPU throughput
- Quantization: float16 (minimal loss) → int8 (~4×speedup) → int4 (~8×speedup)
- Cache LLM responses by prompt hash to reduce latency and cost
- Monitor: p50/p95/p99 latency, throughput, error rate, GPU utilization
- CPU for classical ML, GPU for DL/LLM inference
`,
    cheatSheet: `
### Model Serialization Formats
| Format | Framework | Use Case |
|--------|----------|---------|
| .pth (state_dict) | PyTorch | Training checkpoints |
| .pt (TorchScript) | PyTorch | Production serving |
| .onnx | Cross-framework | Interoperable serving |
| .pkl (joblib) | sklearn | Classical ML serving |
| safetensors | HuggingFace | Safe, fast HF format |

### Inference Optimization Priority
1. Batching (biggest GPU throughput win)
2. Mixed precision (float16/bfloat16)
3. Quantization (int8/int4 for LLMs)
4. Response caching (for repeat queries)
5. Model compilation (torch.compile)
`,
    interviewQuestions: [
      { question: 'What is the difference between model latency and throughput, and how do you optimize each?', answerHint: 'Latency is the time for a single request to complete (affects user experience). Throughput is the number of requests processed per second (affects cost). They often trade off: batching increases throughput by processing multiple requests together, but increases individual request latency. To minimize latency: use model distillation, quantization, caching, and avoid batching (process requests immediately). To maximize throughput: use dynamic batching, GPU, mixed precision, and model parallelism. For web-facing APIs: optimize p99 latency (tail latency). For batch processing: maximize throughput.', type: 'TECHNICAL' },
      { question: 'Why and when would you use int8 quantization for model inference?', answerHint: 'Int8 quantization maps float32 weights to 8-bit integers, reducing memory by 4× and improving inference speed by ~2-4× (integer arithmetic is faster than float on most hardware). It is appropriate when: (1) model size is a constraint (serving large models on limited GPU memory), (2) inference throughput needs to improve, (3) slight quality degradation (~0.5-1% accuracy loss) is acceptable. Not appropriate for safety-critical applications where accuracy is paramount, or for models that are already quantization-sensitive (some architectures degrade more than others).', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'FastAPI for ML Serving (HuggingFace)', url: 'https://huggingface.co/docs/api-inference', type: 'ARTICLE', priority: 'A', source: 'HuggingFace', isOfficial: true, description: 'HuggingFace Inference API documentation and patterns.' },
      { title: 'Chip Huyen: Designing ML Systems', url: 'https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/', type: 'BOOK', priority: 'S', source: "O'Reilly", isOfficial: false, description: 'Comprehensive guide to production ML system design including serving.' }
    ]
  }
};
