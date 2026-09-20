export const adv_20_interview = {
  ADV_INTERVIEW: {
    title: 'Advanced AI Systems & MLOps Interview Preparation',
    description: 'Comprehensive preparation for MLOps and AI Infrastructure interviews: architecture design, serving tradeoffs, and production ML troubleshooting.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['Production AI System Case Studies'],
    learningContent: `
# Advanced AI Systems & MLOps Interview Preparation

## 1. Interview Formats
| Interview Type | What to Expect | Focus Areas |
|---------------|---------------|-------------|
| ML System Design | Design end-to-end ML architectures | Data scale, serving tradeoffs, latency |
| Infra Architecture | Design K8s/GPU platforms | Scaling, cost optimization, fault tolerance |
| MLOps & Lifecycle | Debugging production ML | CI/CD, drift, reproducibility, tracking |
| LLM Engineering | Build GenAI systems | RAG, Agents, vLLM, memory management |

## 2. ML System Design Framework (Advanced)
When given a prompt like *"Design a system to detect credit card fraud in real-time"*:
1. **Requirements & Constraints:** Latency SLA (<50ms?), Throughput (10k QPS?), False Positive tolerance?
2. **Data Pipeline:** Kafka stream of transactions. Labeling strategy (fraud takes 30 days to confirm).
3. **Feature Store:** Offline store for training (BigQuery), Online store (Redis) for serving. Streaming aggregations (Flink) for "txn_count_last_5_mins".
4. **Model Architecture:** XGBoost or LightGBM (fast, tabular) vs Deep Learning.
5. **Training Infra:** Automated daily retraining pipeline (Airflow/Kubeflow). Model Registry (MLflow).
6. **Evaluation & CI/CD:** Shadow deployment → Champion vs Challenger evaluation.
7. **Serving Layer:** Dedicated inference server (Triton).
8. **Observability:** Monitor data drift (feature distributions) and concept drift.

## 3. Top Interview Questions & Deep Answers

**Q: You deploy a model and performance drops 20% after one month. How do you debug?**
A: Structure the debugging process:
1. *Is it a systemic pipeline failure?* Check if the online feature store is receiving stale data (e.g., Flink job crashed).
2. *Is it training-serving skew?* Compare feature distributions in the serving logs vs training data. Did a preprocessing step (like normalization) break in the serving code?
3. *Is it Data Drift?* Have user demographics or input patterns changed? (Covariate shift).
4. *Is it Concept Drift?* Has the underlying relationship changed? (e.g., macroeconomic shift changes purchasing behavior).
*Resolution:* If pipeline failure, fix it. If skew, align offline/online pipelines. If drift, trigger automated retraining on fresh data.

**Q: Design an LLM serving architecture that minimizes cost while maintaining a strict 1-second TTFT SLA.**
A: 
1. Use an AI Gateway (LiteLLM) for semantic caching to serve 30% of traffic instantly at zero cost.
2. Implement Dynamic Routing: use a fast classifier to route easy queries to Llama-3-8B and hard queries to Llama-3-70B.
3. Serve models using vLLM on Kubernetes. Enable PagedAttention and tune \`max-num-seqs\` to maximize continuous batching.
4. Scale pods using KEDA based on the vLLM queue depth (not CPU).
5. If TTFT is the strict bottleneck, prioritize smaller Tensor Parallel sizes (if memory allows) to reduce inter-GPU communication latency, and utilize Prefix Caching for standard system prompts.

## 4. Key Tradeoffs to Mention in Interviews
- **Batch vs. Real-time Inference:** Batch is 10x cheaper (high throughput) but user must wait. Real-time requires 24/7 GPU provisioning.
- **Embedded vs. Microservice Serving:** Embedded (in Flask app) is simple but couples scaling. Microservice (Triton) adds network latency but allows independent GPU scaling.
- **Data Parallelism vs Tensor Parallelism:** Data parallelism scales throughput easily. Tensor parallelism is required when the model memory footprint exceeds a single GPU.
- **Buy vs. Build:** Managed platforms (Vertex AI) save engineering headcount but cost 20-40% more in compute premium and cause vendor lock-in.
`,
    fullNotes: `
# Detailed Notes: Advanced Interviews

- **The "Why" Matters Most:** In system design interviews, the interviewer cares less about the specific technology you choose (e.g., Kafka vs Kinesis) and more about *why* you chose it and the tradeoffs you considered. Always state: "I am choosing X over Y because of constraint Z."
- **Failure Modes:** Senior engineers understand how systems break. proactively mention failure modes: "The streaming feature pipeline might go down, so the inference service must be configured with a fallback default value (or historical batch feature) to ensure the model doesn't crash."
`,
    shortNotes: `
- Design Framework: Requirements → Data → Features → Model → Training → Serving → Monitoring
- Debugging Prod: Pipeline failure → Skew → Data Drift → Concept Drift
- Real-time features require a Feature Store (Redis online, Snowflake offline) and streaming ETL (Flink)
- LLM Serving cost optimization: Semantic caching, Dynamic routing, vLLM continuous batching
- Highlight tradeoffs: Latency vs Throughput, Build vs Buy, Accuracy vs Cost
- Always design for failure: graceful degradation, fallbacks, and timeouts
`,
    cheatSheet: `
### MLOps Troubleshooting Matrix
| Symptom | Probable Cause | Investigation |
|---------|----------------|---------------|
| Immediate accuracy drop at launch | Training-serving skew | Compare online vs offline feature distributions |
| Gradual accuracy drop over weeks | Data/Concept drift | Check recent data vs training data stats |
| High CPU, low GPU util in training | Data loader bottleneck | Profile PyTorch dataloader, increase workers |
| High OOM rate in LLM serving | KV Cache limit | Tune vLLM gpu-memory-utilization |
| Serving latency spikes | Cold starts / autoscaling delay | Check HPA triggers, implement dummy warmups |

### Core Vocabulary
- Training-Serving Skew
- Continuous Batching / PagedAttention
- Data/Concept Drift
- Point-in-time correctness
`,
    interviewQuestions: [
      { question: 'How would you architect a system to train a 70 Billion parameter model from scratch?', answerHint: 'A 70B model requires ~140GB in FP16 just for weights. During training (with Adam optimizer states and gradients), it requires ~1TB of GPU memory, impossible on a single GPU. Architecture: (1) Compute: Use a cluster of A100/H100 GPUs connected via high-bandwidth NVLink/Infiniband. (2) Framework: Use PyTorch with DeepSpeed or FSDP. (3) Parallelism: Implement 3D Parallelism. Use ZeRO Stage 3 / FSDP to shard optimizer states and gradients across nodes. Use Tensor Parallelism within a node (split weights across GPUs), and Pipeline Parallelism across nodes. (4) Storage: High-throughput parallel file system (Lustre) for loading data. (5) Fault Tolerance: Distributed training fails often. Implement frequent asynchronous checkpointing to persistent storage and automated K8s job restarts.', type: 'SYSTEM_DESIGN' },
      { question: 'Explain the difference between Data Drift and Concept Drift, and how an MLOps platform should handle them.', answerHint: 'Data Drift (Covariate Shift) happens when the distribution of inputs P(X) changes. E.g., a model trained on summer clothing data evaluating winter clothing data. Concept Drift happens when the relationship between inputs and outputs P(Y|X) changes. E.g., a spam model fails because spammers invented a new technique. Handling: (1) Data drift can be detected immediately by comparing incoming feature distributions to training distributions using statistical tests (K-S test). The platform should alert when drift exceeds a threshold. (2) Concept drift requires waiting for ground-truth labels to arrive to calculate actual accuracy drops. (3) Resolution for both is automated retraining: the platform triggers a CI/CD pipeline to retrain the model on the most recent temporal window of data, evaluates the challenger against the champion, and deploys if it improves.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Machine Learning Systems Design Interview', url: 'https://huyenchip.com/machine-learning-systems-design/', type: 'BOOK', priority: 'S', source: 'Chip Huyen', isOfficial: false, description: 'Mandatory reading for ML system design interviews.' }
    ]
  }
};
