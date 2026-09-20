export const adv_19_case_studies = {
  CASE_STUDIES: {
    title: 'Production AI System Case Studies',
    description: 'Deep dive into real-world architectures: Recommendation platforms, RAG systems, and LLM inference clusters.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['ML Platforms & Infrastructure Architecture', 'AI Data & Feature Infrastructure'],
    learningContent: `
# Production AI System Case Studies

## Case Study 1: Real-Time Recommendation Platform (e.g., TikTok/Netflix)
**Goal:** Recommend the next video within 50ms.

**Architecture:**
1. **Offline Training Pipeline (Airflow + Spark + Kubeflow):**
   - Nightly batch job processes petabytes of user interactions.
   - Trains a deep two-tower model (User Tower + Item Tower) using PyTorch DDP.
   - Exports Item Embeddings to a Vector Database (FAISS).
2. **Feature Store (Feast):**
   - *Batch:* User historical profiles synced to Redis daily.
   - *Streaming:* Flink processes Kafka event stream (user swiped up, liked) to update Redis counters in <1s.
3. **Inference Flow (Serving):**
   - Request arrives at API Gateway.
   - Gateway fetches real-time user features from Redis (Online Feature Store).
   - *Retrieval (Candidate Generation):* Pass user features to User Tower to get User Embedding. Query Vector DB for top 500 closest Item Embeddings.
   - *Ranking:* Pass the 500 candidates + user features to a heavy XGBoost/Deep ranking model hosted on Triton Inference Server (dynamic batching enabled).
   - Return top 10 items.

## Case Study 2: Enterprise RAG Platform
**Goal:** Company-wide chatbot that answers questions based on internal Confluence/Jira data with strict access control.

**Architecture:**
1. **Data Ingestion (Unstructured Data Pipeline):**
   - Connectors pull documents from Confluence APIs.
   - Text is chunked (semantic splitting), embedded using a self-hosted BGE embedding model on Triton.
   - Chunks + Embeddings + Document ACLs (Access Control Lists) pushed to Vector DB (Pinecone/Milvus).
2. **Inference Flow (Agentic RAG):**
   - User query hits AI Gateway (LiteLLM) for Auth and Cost Tracking.
   - Gateway checks Semantic Cache (Redis). If cache miss, route to RAG Orchestrator (LangChain/LlamaIndex).
   - Orchestrator queries Vector DB, applying the user's Auth Token as a metadata filter (so they only search docs they have access to).
   - Prompt is assembled: \`System Instructions + Retrieved Docs + User Query\`.
   - Sent to LLM Inference Cluster.
3. **LLM Inference Cluster (vLLM on K8s):**
   - Runs Llama-3-70B using Tensor Parallelism across 2 GPUs (TP=2).
   - PagedAttention manages KV cache. Prefix caching enabled for the System Instructions.
4. **Observability:**
   - Langfuse traces the entire execution (retrieval latency, LLM TTFT, prompt tokens).

## Case Study 3: Generative AI Agent Platform
**Goal:** Deploy autonomous AI agents that can read emails and execute actions in SaaS tools.

**Architecture:**
1. **State Management:**
   - Agents are long-running. State (conversation history, tool outputs) is managed in a graph framework (LangGraph) backed by PostgreSQL.
2. **LLM Routing:**
   - *Planning step:* Routed to GPT-4o (high reasoning, expensive).
   - *Data extraction step:* Routed to fine-tuned Llama-3-8B (fast, cheap, outputs strict JSON via guided decoding).
3. **Security (Critical for Agents):**
   - Agents execute tools (e.g., Python code interpreter) inside ephemeral, network-isolated Docker containers (Sandboxing).
   - High-privilege API calls (e.g., "Delete Database") pause the agent execution and require Human-in-the-Loop approval via Slack/UI.
4. **Evaluation:**
   - Traces with tool execution errors are sent to a nightly LLM-as-a-judge pipeline to grade if the agent correctly recovered from the error.
`,
    fullNotes: `
# Detailed Case Study Notes

- **Two-Stage Recommendation Systems:** Almost all large-scale recsys use two stages. Stage 1 (Retrieval/Candidate Generation) is fast and recall-optimized (Vector Search or simple heuristics) reducing billions of items to ~500. Stage 2 (Ranking) is slow, compute-heavy, and precision-optimized (Deep Learning / XGBoost), scoring only the 500 candidates.
- **RAG Document Level Security (ACL):** Enterprise RAG fails if a standard employee can ask "What is the CEO's salary?" and the RAG retrieves HR documents. Vector DBs must support metadata filtering on query, and the ingestion pipeline must attach group IDs / access lists to every chunk as metadata.
`,
    shortNotes: `
- RecSys: 2 stages — Retrieval (Vector DB, fast/recall) → Ranking (Triton XGBoost, slow/precision)
- RecSys Features: Batch (daily sync) + Streaming (Flink/Kafka for real-time clicks) → Redis
- RAG Security: Must use Vector DB metadata filtering with user ACLs at retrieval time
- RAG Pipeline: Ingestion (chunk/embed) → Gateway → Orchestrator → Vector DB → vLLM
- Agent Platforms: Require graph-based state management (LangGraph) and sandboxed tool execution
- Agent Security: Human-in-the-loop approval for destructive actions, SSRF protection
`,
    cheatSheet: `
### Architecture Tradeoffs
| Design Choice | Pros | Cons |
|---------------|------|------|
| Vector DB vs Feature Store | Best for unstructured text | Terrible for structured facts (use FS) |
| Fine-tuning vs RAG | Model learns new task/style | Cannot update facts easily, hallucination risk |
| OpenAI vs Self-hosted (vLLM) | Zero infra overhead | Data privacy risks, higher at-scale cost |
| Embedded serving vs Triton | Simple to build | Fails to scale, Python GIL blocks |
`,
    interviewQuestions: [
      { question: 'Walk me through the architecture of a real-time recommendation system handling millions of items.', answerHint: 'Start with the two-stage pipeline. (1) Offline: Train a deep retrieval model and a heavy ranking model. Push item embeddings to a Vector DB. (2) Features: A Feature Store manages historical user profiles (batch) and real-time interactions via Kafka/Flink (streaming), materializing both into Redis for low-latency access. (3) Inference flow: When a request arrives, fetch the user\'s real-time features from Redis. Pass to the Vector DB to retrieve the top 500 candidate items (Candidate Generation). Pass those 500 items + user features to the heavy ranking model hosted on an inference server (Triton). Return the top 10 ranked items. This architecture balances latency (under 50ms) with accuracy.', type: 'SYSTEM_DESIGN' },
      { question: 'Design the infrastructure for an Enterprise RAG system. How do you handle data privacy and permissions?', answerHint: 'Architecture: Document Ingestion Pipeline → Embedding Model → Vector DB → Orchestrator → LLM. For permissions: When indexing documents from internal systems (Confluence, Drive), the ingestion pipeline must extract the Access Control List (ACL) for each document and attach it as metadata to the chunk in the Vector Database. At inference time, the user authenticates. The Orchestrator receives the user\'s identity/groups. When querying the Vector DB, the Orchestrator applies a hard metadata filter (e.g., `WHERE group IN user_groups`). This ensures the Vector DB never returns chunks the user isn\'t allowed to see, guaranteeing the LLM cannot leak them.', type: 'SYSTEM_DESIGN' }
    ],
    resources: [
      { title: 'System Design for AI (Eugene Yan)', url: 'https://eugeneyan.com/writing/system-design-for-discovery/', type: 'ARTICLE', priority: 'S', source: 'Eugene Yan', isOfficial: false, description: 'Excellent breakdown of real-world recommendation architectures.' }
    ]
  }
};
