export const adv_17_ml_platforms = {
  ML_PLATFORMS: {
    title: 'ML Platforms & Infrastructure Architecture',
    description: 'Design end-to-end enterprise ML platforms, AI API gateways, model registries, and multi-tenant AI infrastructure.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 75,
    prerequisites: ['Kubernetes for AI Workloads', 'MLOps Foundations & ML Lifecycle'],
    learningContent: `
# ML Platforms & Infrastructure Architecture

## 1. What is an Internal ML Platform?
As organizations scale, having data scientists manually provision infrastructure fails. An internal ML platform abstracts infrastructure, providing standardized "paved roads" for training, deploying, and monitoring models.

**Key Goals:**
- Reduce time-to-market for new models.
- Standardize security and compliance.
- Optimize compute costs (GPU sharing, spot instance management).
- Provide a unified developer experience.

## 2. Core Architecture of an AI Platform
\`\`\`
[ User / Application ]
         ↓
[ AI API Gateway ] ← (Rate limiting, Auth, Routing, Caching, Semantic Cache)
         ↓
[ Model Serving Layer ] ← (Triton, vLLM, TorchServe on K8s + KEDA Autoscaling)
         ↑
[ Model Registry ] ← (MLflow, Vertex: versioning, staging/prod aliases)
         ↑
[ Training Cluster ] ← (Kubeflow, Ray: distributed jobs, hyperparam sweeps)
         ↑
[ Data & Feature Platform ] ← (Delta Lake, Feast: batch/streaming ingestion)
\`\`\`

## 3. Platform Capabilities

**A. Feature & Data Platform**
- Feature Store (Feast/Hopsworks): Ensures training-serving consistency.
- Data Lineage: Tracks which pipeline produced which dataset.
- Data Quality monitoring.

**B. Experimentation & Training**
- Ephemeral Jupyter/VSCode environments with GPU access.
- Job submission API (abstracting K8s YAML).
- Experiment tracking (W&B, MLflow).
- Distributed compute frameworks (Ray, Spark).

**C. Serving & API Gateway**
- Zero-downtime model rollouts.
- Shadow / Canary deployment traffic shifting.
- Unified LLM gateway (LiteLLM) for external models (OpenAI/Anthropic) and internal models.

**D. Observability & FinOps**
- Centralized GPU utilization metrics.
- Cost attribution per model/team.
- Drift and quality monitoring dashboards.

## 4. Build vs. Buy
**Buy (Managed Cloud):** Vertex AI, SageMaker, Databricks.
- *Pros:* Fast time to value, less DevOps overhead, integrated security.
- *Cons:* Vendor lock-in, high compute premiums, less flexibility.

**Build (Open Source on K8s):** Kubeflow, MLflow, Ray, Triton.
- *Pros:* Ultimate flexibility, avoid cloud premiums, multi-cloud capability.
- *Cons:* Requires a dedicated platform engineering team (3-5+ engineers) to maintain.

*Hybrid approach:* Buy the hard parts (data warehouse, LLM APIs), build the differentiating parts (custom serving, RAG infrastructure).

## 5. Multi-Tenant AI Infrastructure
Large enterprises need isolated environments for different teams.
- **Compute Isolation:** K8s namespaces, node pools, quotas.
- **Data Isolation:** IAM roles per namespace, dedicated buckets.
- **Model Isolation:** Registry namespaces, strict promotion gates.
- **Cost Allocation:** Tagging all resources/requests to charge back to the specific team.
`,
    fullNotes: `
# Detailed Notes: ML Platform Architecture

- **The Paved Road Concept:** A platform should provide a "paved road" — a highly automated, secure, and easy-to-use path for the most common use cases (e.g., deploying a standard classification model or RAG pipeline). Users can go off-road if they need custom architectures, but they lose platform support.
- **Ray:** An open-source unified compute framework that simplifies distributed computing. It provides libraries for ML (Ray Train, Ray Tune, Ray Serve) and is increasingly replacing Kubeflow components for complex distributed AI workloads, especially Reinforcement Learning and massive distributed data processing (used heavily by OpenAI).
- **FinOps in AI:** AI compute is exceptionally expensive. A successful platform must provide visibility. If an endpoint costs $10k/month to run, the platform must surface that cost directly to the owning product team to drive optimization.
`,
    shortNotes: `
- ML Platform: abstracts infra to provide standardized, fast paths for ML lifecycle
- Architecture: Data/Features → Training/Tracking → Registry → Serving → Gateway
- Buy (Vertex/SageMaker/Databricks) vs Build (K8s/Kubeflow/MLflow/Ray)
- Feature Store: solves training-serving skew, enables feature reuse
- AI API Gateway: handles auth, routing, caching, and cost attribution
- FinOps: critical to tag all GPU resources and API calls for team chargebacks
- Ray: leading distributed compute framework for scaling AI workloads
`,
    cheatSheet: `
### Open Source AI Platform Stack
| Component | Leading OSS Tools |
|-----------|------------------|
| Feature Store | Feast, Hopsworks |
| Exp Tracking | MLflow, Aim |
| Orchestration | Kubeflow, Ray, Flyte |
| Model Registry| MLflow |
| Serving | Triton, Seldon, vLLM |
| AI Gateway | LiteLLM |
| Observability | Langfuse, Prometheus/Grafana |

### Platform Success Metrics
- **Time to First Deployment:** Days, not months.
- **GPU Utilization:** >70% aggregate across cluster.
- **Deployment Frequency:** How often models are updated.
- **Incident Recovery Time:** Automated rollback speed.
`,
    interviewQuestions: [
      { question: 'You are tasked with designing an internal ML platform for a company with 50 data scientists. Should you build it on raw Kubernetes using open-source tools (Kubeflow/MLflow) or use a managed service like AWS SageMaker / GCP Vertex AI? Walk through your decision process.', answerHint: 'This is a classic build vs. buy tradeoff. I would evaluate three factors: (1) Team composition: Do we have a dedicated platform engineering/SRE team? Building on raw K8s requires 3-5+ engineers just to maintain the cluster, handle upgrades, and debug K8s issues. If we only have data scientists, we MUST buy. (2) Cost at scale: Managed services charge a premium (often 20-40%) on top of raw compute. If our compute spend is $50k/yr, the premium is negligible. If it\'s $5M/yr, building custom K8s infra saves enough to hire a platform team. (3) Custom requirements: Do we need multi-cloud? Highly specialized hardware? If yes, OSS gives flexibility. Recommendation: Start with managed services (Buy) for speed to market, and only incrementally "Build" specific components (like custom serving for LLMs) when cost or performance limitations of the managed service dictate it.', type: 'SYSTEM_DESIGN' },
      { question: 'What is the role of an AI API Gateway in an enterprise architecture?', answerHint: 'An AI Gateway (like LiteLLM) sits between applications and the actual model serving endpoints (whether internal Triton/vLLM servers or external OpenAI/Anthropic APIs). Its roles are: (1) Unified API: applications use one SDK regardless of the backend model. (2) Routing & Fallbacks: route traffic to cheapest/fastest models, automatically fallback if a provider goes down. (3) Security: centralize API keys, enforce rate limits, and sanitize inputs/outputs. (4) FinOps: track token usage and attribute costs to specific teams/applications (chargeback). (5) Performance: implement semantic or exact caching to reduce latency and cost.', type: 'SYSTEM_DESIGN' }
    ],
    resources: [
      { title: 'Designing Machine Learning Systems (Chip Huyen)', url: 'https://huyenchip.com/machine-learning-systems-design/', type: 'BOOK', priority: 'S', source: 'Chip Huyen', isOfficial: false, description: 'The definitive book on ML systems and platform architecture.' },
      { title: 'Ray Architecture', url: 'https://docs.ray.io/en/latest/ray-core/architecture.html', type: 'ARTICLE', priority: 'A', source: 'Anyscale / Ray', isOfficial: true, description: 'Understanding modern distributed compute architecture.' }
    ]
  }
};
