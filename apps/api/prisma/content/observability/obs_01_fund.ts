export const obs_01_fund = {
  OBSERVABILITY_FUNDAMENTALS: {
    title: 'Observability Fundamentals',
    description: 'Understand the difference between Observability and Monitoring, and the Three Pillars: Logs, Metrics, and Traces.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: [],
    learningContent: `
# Observability Fundamentals

Before the cloud, we had **Monitoring**. We wrote scripts to ping servers to see if they were alive. If CPU hit 100%, an alarm went off. Monitoring answers: *"Is the system broken?"*

In modern, highly distributed microservice architectures, knowing *that* a system is broken is useless because the system is so complex you won't know *why*. **Observability (O11y)** answers: *"Why is the system broken, and where exactly is the fault?"*

## The Three Pillars of Observability
To achieve true observability, a system must emit three types of telemetry data:

### 1. Logs (Events)
A log is an immutable timestamped record of a discrete event that happened over time (e.g., "User 123 failed to login at 10:04 AM").
- *Pros:* High fidelity, contains exact details and context.
- *Cons:* Extremely expensive to store at scale. Hard to aggregate across thousands of servers without a centralized system (like ELK/Datadog).

### 2. Metrics (Aggregations)
A metric is a numeric representation of data measured over intervals of time (e.g., "The login endpoint had 500 requests in the last minute, with an average latency of 45ms").
- *Pros:* Extremely cheap to store (just numbers). Perfect for triggering Alerts and building Dashboards.
- *Cons:* Low fidelity. It tells you latency spiked, but it cannot tell you *which specific user's request* caused the spike.

### 3. Distributed Traces (Request Scoping)
A trace represents the end-to-end journey of a single user request as it travels through a distributed system (e.g., Web -> API Gateway -> Auth Service -> Payment Service -> Database).
- *Pros:* Essential for debugging microservices. Tells you exactly which microservice caused the bottleneck.
- *Cons:* Difficult to instrument retroactively.

## The Workflow
1. A **Metric** spikes and triggers an **Alert**.
2. The engineer looks at a **Dashboard** and sees a latency spike in the Payment Service.
3. The engineer uses a **Distributed Trace** to see the exact path of the slow requests.
4. The trace leads them to specific **Logs** in the Database layer, revealing the root cause (e.g., a missing index).
`,
    fullNotes: `
# Detailed Notes: Observability

- **Control Theory:** The term "Observability" comes from control theory (introduced by Rudolf E. Kálmán). It is a measure of how well internal states of a system can be inferred from knowledge of its external outputs. If you have to push new code to output a \`console.log\` just to debug an issue, your system is not observable.
- **Cardinality:** A critical concept in metrics. Cardinality refers to the number of unique values a metric tag can have. Tagging a metric with \`http_status=200\` (low cardinality, maybe 5 unique values) is good. Tagging a metric with \`user_id=987654321\` (high cardinality, millions of unique values) will crash your time-series database (like Prometheus).
`,
    shortNotes: `
- Monitoring tells you a system is broken. Observability lets you ask *why* it's broken.
- Three Pillars: Logs (Events), Metrics (Numbers), Traces (Request Paths).
- Metrics are cheap and drive Alerts.
- Logs are expensive and provide context.
- Traces connect logs and metrics across distributed boundaries.
- High Cardinality metrics (like tracking exact user IDs) will destroy metric databases.
`,
    cheatSheet: `
### Telemetry Comparison
| Type | Use Case | Cost | Example |
| :--- | :--- | :--- | :--- |
| **Metrics** | Alerting, Dashboards | Low | \`http_requests_total{status="500"} 42\` |
| **Logs** | Deep debugging, Auditing | High | \`{"level":"error", "msg":"DB timeout"}\` |
| **Traces** | Microservice bottlenecks | Med | \`[Span A] -> [Span B] -> [Span C]\` |
`,
    interviewQuestions: [
      { question: 'What is the difference between Observability and Monitoring?', answerHint: 'Monitoring focuses on known unknowns. You pre-define dashboards and alerts for things you expect might break (like CPU > 90%). Observability focuses on unknown unknowns. It is the practice of instrumenting your code so comprehensively with logs, metrics, and traces that you can dynamically query the system to understand completely novel failure modes without having to ship new code.', type: 'CONCEPTUAL' },
      { question: 'Why should you never put a specific user ID or order ID into a Metric tag/label?', answerHint: 'This is the High Cardinality problem. Time-series databases (like Prometheus) create a new time-series for every unique combination of tags. If you tag a metric with a user ID, and you have a million users, you will create a million distinct time-series, which will exhaust the memory of the metrics server and crash it. User IDs belong in Logs or Traces, not Metrics.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Distributed Systems Observability', url: 'https://www.oreilly.com/library/view/distributed-systems-observability/9781492033431/', type: 'BOOK', priority: 'S', source: 'Cindy Sridharan', isOfficial: true }
    ]
  }
};
