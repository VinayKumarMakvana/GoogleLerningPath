export const adv_14_ai_observability = {
  AI_OBSERVABILITY: {
    title: 'AI Observability & Evaluation in Production',
    description: 'Monitor LLM applications in production: tracing, cost tracking, drift detection, hallucination monitoring, and RAG evaluation pipelines.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 60,
    prerequisites: ['AI Evaluation & Safety', 'AI Caching, Batching & Routing'],
    learningContent: `
# AI Observability & Evaluation in Production

## 1. The Observability Stack for AI
Traditional APM (Datadog, New Relic) measures CPU, memory, and HTTP latency.
AI Observability (Langfuse, Phoenix, Traceloop, Arize) measures model quality, tokens, cost, and complex agent traces.

**The Three Pillars of AI Observability:**
1. **System Metrics:** Latency (TTFT, TPOT), GPU utilization, throughput, queue depth.
2. **Cost & Usage:** Token counts (prompt, completion, cached), cost attribution per user/app.
3. **Quality & Behavior:** Hallucinations, relevance, tone, user feedback (thumbs up/down), drift.

## 2. Tracing LLM Chains and Agents
Complex LLM applications (RAG, Agents) involve multiple LLM calls, tool executions, and retrieval steps. A failure could happen anywhere.

\`\`\`python
# Example: Tracing a RAG pipeline with Langfuse/OpenTelemetry
from langfuse.decorators import observe

@observe()
def rag_pipeline(user_query: str):
    # This step is tracked as a child span
    docs = retrieve_documents(user_query)
    
    # This LLM call is tracked, including exact prompt, response, and tokens
    response = generate_answer(user_query, docs)
    return response

@observe(as_type="retrieval")
def retrieve_documents(query):
    # Vector DB call traced
    pass
\`\`\`
Tracing provides a waterfall view of the execution, showing exactly which retrieval step failed or which LLM call hallucinated.

## 3. Continuous Evaluation in Production (LLM-as-a-Judge)
You cannot manually read every production log. You must use automated evaluators on a sample of production traffic.

\`\`\`python
# Run asynchronously on a 5% sample of production logs
def evaluate_production_trace(trace):
    # Evaluate hallucination (Faithfulness)
    faithfulness_score = llm_judge(
        prompt="Does the response contradict the retrieved context?",
        inputs={"context": trace.retrieved_docs, "response": trace.response}
    )
    
    # Evaluate relevance
    relevance_score = llm_judge(
        prompt="Does the response directly answer the user query?",
        inputs={"query": trace.query, "response": trace.response}
    )
    
    # Log scores back to observability platform
    trace.log_scores(faithfulness=faithfulness_score, relevance=relevance_score)
\`\`\`

## 4. RAG-Specific Metrics (RAGAS)
Monitor these specific metrics for RAG applications:
- **Context Precision:** Did the retriever find the right documents, and rank them highly?
- **Context Recall:** Did the retriever find ALL the information needed to answer the query?
- **Faithfulness:** Is the generated answer derived ONLY from the retrieved context (no hallucinations)?
- **Answer Relevance:** Does the answer address the user's question?

## 5. Drift Detection
In traditional ML, monitor:
- **Data Drift:** Input features change distribution (e.g., users start uploading larger images).
- **Concept Drift:** The target variable relationship changes (e.g., user preferences shift).

In Generative AI, monitor:
- **Prompt Drift:** Users start asking different types of questions (e.g., coding questions instead of FAQ questions).
- **Quality Drift:** The underlying LLM is updated by the provider, subtly changing its tone or formatting, breaking downstream parsers.
`,
    fullNotes: `
# Detailed Notes: AI Observability

- **Cost Attribution:** LLM APIs are billed per token. A single complex agent loop might consume $0.50. You must tag all traces with a user ID or tenant ID to calculate COGS (Cost of Goods Sold) per customer and prevent abuse.
- **User Feedback Loop:** The most valuable signal is explicit user feedback (thumbs up/down, edit tracking, regenerate clicks). Observability tools tie this feedback directly to the specific trace, so you can filter for "Thumbs Down" traces and debug exactly what went wrong.
- **Prompt Lineage:** When a prompt is updated, you must track which version of the prompt generated which response in production, to determine if the prompt update actually improved quality.
`,
    shortNotes: `
- AI APM differs from traditional APM: must track tokens, cost, quality, and complex traces
- Tracing (OpenTelemetry/Langfuse): waterfall view of RAG/Agent steps (retrieve → tool → LLM)
- Continuous Eval: use LLM-as-a-judge to score a 5% sample of production logs asynchronously
- RAG Metrics: Context Precision/Recall (retrieval quality), Faithfulness (generation quality)
- Prompt Drift: users change behavior. Quality Drift: underlying model changes behavior.
- Always tag requests with user/tenant ID for cost attribution and abuse detection
- Tie explicit user feedback (thumbs down) directly to the execution trace for debugging
`,
    cheatSheet: `
### LLM Observability Checklist
- [ ] System: TTFT, TPOT, Latency logged per step
- [ ] Cost: Prompt tokens, completion tokens, cached tokens, total $ cost
- [ ] Tracing: Every tool call and retrieval step captured in a single waterfall trace
- [ ] Metadata: User ID, Session ID, Tenant ID, Prompt Version tagged
- [ ] Feedback: API endpoint to attach user feedback to specific trace IDs
- [ ] Evaluation: Nightly pipeline running LLM-as-a-judge on a random sample

### Key RAGAS Metrics
1. **Faithfulness:** Answer contradicts context? (Checks Generator)
2. **Context Precision:** Are relevant docs ranked highest? (Checks Retriever)
3. **Context Recall:** Did we retrieve enough info to answer? (Checks Retriever)
4. **Answer Relevance:** Did we actually answer the question? (Checks End-to-End)
`,
    interviewQuestions: [
      { question: 'In a production RAG system, users are complaining that the bot is hallucinating. How would you use observability tools to debug the root cause?', answerHint: 'Hallucination in RAG usually stems from one of two causes: bad retrieval or bad generation. First, I would filter observability traces for sessions with explicit negative user feedback (thumbs down) or low automated Faithfulness scores. Looking at a specific trace waterfall: (1) Check the retrieved documents step. Did the vector database return relevant context? If no, it\'s a retrieval failure (fix chunking, embeddings, or search query). (2) If the retrieved context DID contain the answer, look at the LLM generation step. Did the LLM ignore the context and hallucinate an answer? If yes, it\'s a generation failure (fix the prompt to strictly enforce grounding, or switch to a more capable model). Tracing isolates the exact point of failure.', type: 'TECHNICAL' },
      { question: 'Why is traditional APM (like Datadog latency/error tracking) insufficient for LLM applications?', answerHint: 'Traditional APM tracks system metrics (latency, CPU, HTTP 500s). While necessary, it misses the core operational metrics of LLMs. (1) Cost: LLMs charge per token, varying by prompt/completion. You must track token usage and cost per trace/tenant. (2) Streaming latency: Total latency doesn\'t matter; TTFT (Time To First Token) and TPOT (Time Per Output Token) determine user experience. (3) Quality: An LLM returns an HTTP 200 OK even if it generates a highly toxic hallucination. You need continuous evaluation (LLM-as-a-judge) to monitor output quality, relevance, and safety. (4) Complexity: Agentic loops make multiple dynamic calls; you need semantic tracing to understand the sequence of actions, not just network requests.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Langfuse Documentation', url: 'https://langfuse.com/docs', type: 'ARTICLE', priority: 'S', source: 'Langfuse', isOfficial: true, description: 'Excellent documentation on LLM observability and tracing concepts.' },
      { title: 'RAGAS: Automated Evaluation of RAG', url: 'https://docs.ragas.io/en/latest/', type: 'ARTICLE', priority: 'S', source: 'RAGAS', isOfficial: true, description: 'The standard framework for evaluating RAG pipelines.' }
    ]
  }
};
