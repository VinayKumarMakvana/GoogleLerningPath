export const ds_14_interview = {
  DS_INTERVIEW_PREP: {
    title: 'Distributed Systems Interview Preparation',
    description: 'Frameworks for answering deep dive distributed systems questions and evaluating tradeoffs.',
    difficulty: 'EXPERT',
    estimatedLearnTime: 60,
    prerequisites: ['Distributed Systems Case Studies'],
    learningContent: `
# Distributed Systems Interview Preparation

While a standard System Design interview (Phase 9D) focuses on drawing high-level boxes (Client -> LB -> Web -> DB), a **Distributed Systems Interview** (often for Staff/Principal roles or specialized backend teams) drills deeply into the arrows *between* the boxes.

## The Expectation
You will be evaluated on your understanding of:
- **Consistency Models:** When is Eventual Consistency acceptable? When do you need Linearizability?
- **Failure Modes:** Exactly what happens when a specific network switch dies or a GC pause occurs?
- **Concurrency:** How do you handle race conditions across multiple nodes?
- **Tradeoff Articulation:** You must verbally prove that you know there is no perfect solution, only engineering tradeoffs.

## Framework for Deep Dives
When an interviewer asks, "What if the database crashes here?"
1. **Identify the Failure Mode:** "This is a Crash-Recovery scenario."
2. **Explain the Impact:** "Because we are using Asynchronous Replication, any writes that were acknowledged to the client but not yet streamed to the replica will be permanently lost."
3. **Propose the Mitigation:** "We can switch to Synchronous Replication."
4. **Articulate the Tradeoff:** "However, this will increase the latency of every write request by the network RTT to the replica, and if the replica goes offline, our primary database will completely halt writes."

## Common Trap Questions
- *"How do you guarantee exactly-once delivery?"* (Trap: It's impossible over an unreliable network without tightly coupled transactional frameworks. Explain At-Least-Once + Idempotency).
- *"How do we make this globally consistent and highly available?"* (Trap: CAP theorem. You cannot have both if there's a partition. Pick one and justify it).
`,
    fullNotes: `
# Detailed Notes: Interview Prep

- **The "Data Gravity" Concept:** Moving compute to the data is cheaper than moving data to the compute. Mentioning this when discussing large-scale batch or stream processing shows seniority.
- **Observability:** Distributed systems fail in complex ways. Mentioning distributed tracing (OpenTelemetry, Jaeger), correlation IDs, and centralized logging is critical. You cannot debug microservices with SSH and grep.
`,
    shortNotes: `
- Focus on the "arrows" (network, protocols, failures), not just the boxes.
- Always use the framework: Identify Failure -> Impact -> Mitigation -> Tradeoff.
- Know the CAP Theorem and PACELC cold.
- Understand that "Exactly-Once" over WAN is a myth; use Idempotency.
- Do not forget Observability (Distributed Tracing, Correlation IDs).
`,
    cheatSheet: `
### The 3 Core Tradeoffs
1. **Latency vs Consistency:** (Sync vs Async replication).
2. **Availability vs Consistency:** (CAP Theorem during partitions).
3. **Throughput vs Latency:** (Batching Kafka messages increases throughput but increases latency).
`,
    interviewQuestions: [
      { question: 'In an interview, how would you justify choosing an AP (Available/Partition Tolerant) database like Cassandra over a CP database like PostgreSQL for a specific feature?', answerHint: 'I would identify the business requirement. If the feature is a social media feed or a shopping cart, downtime is unacceptable (lost revenue/engagement). Occasional stale data (Eventual Consistency) is perfectly acceptable to the user. Therefore, prioritizing Availability over strict Consistency is the correct business tradeoff.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Designing Data-Intensive Applications (DDIA)', url: 'https://dataintensive.net/', type: 'BOOK', priority: 'S', source: 'Martin Kleppmann', isOfficial: true }
    ]
  }
};
