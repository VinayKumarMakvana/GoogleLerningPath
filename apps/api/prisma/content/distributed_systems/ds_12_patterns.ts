export const ds_12_patterns = {
  DS_PATTERNS: {
    title: 'Distributed Architecture Patterns',
    description: 'Advanced distributed patterns: CQRS, Distributed Locking, Service Mesh, and Bulkheads.',
    difficulty: 'EXPERT',
    estimatedLearnTime: 90,
    prerequisites: ['Distributed Transactions', 'Stream Processing & Backpressure'],
    learningContent: `
# Distributed Architecture Patterns

## CQRS (Command Query Responsibility Segregation)
In massive systems, the database model optimized for writing (Commands) is almost never optimized for reading (Queries).
- **CQRS** splits them into two separate databases.
- The Write DB is highly normalized (or an Event Store).
- The Read DB is heavily denormalized (e.g., Elasticsearch or a materialized view in Postgres).
- *Catch:* They are synchronized asynchronously via Kafka. This means reads are **Eventually Consistent**.

## Distributed Locking
If two nodes try to run a scheduled cron job at the same time, or modify the same file, you need a lock. But a local memory lock (Mutex) only works on one machine.
- You use Redis (Redlock algorithm) or Zookeeper.
- **The Danger:** If Node A gets the lock, but then freezes for 10 seconds (GC pause), the lock expires in Redis. Node B gets the lock. Node A wakes up and thinks it still has the lock. Both write, causing corruption.
- *Solution:* Fencing Tokens (covered in Consensus).

## Service Mesh
When you have 500 microservices, managing retries, timeouts, mutual TLS encryption, and tracing inside the application code is a nightmare.
- A **Service Mesh** (like Istio or Linkerd) injects a "Sidecar Proxy" next to every microservice container.
- The application talks to the Sidecar (localhost). The Sidecar handles all the complex distributed networking logic, encryption, and routing to other Sidecars.

## Bulkhead Pattern
Derived from ship construction (where dividing a ship into watertight compartments prevents the whole ship from sinking if a hole opens).
- In software, you isolate resources (e.g., thread pools). If the \`PaymentService\` goes down and requests hang, it shouldn't consume all the threads in the \`OrderService\` and crash the whole application. You allocate a separate thread pool just for payments.
`,
    fullNotes: `
# Detailed Notes: Patterns

- **Circuit Breaker:** Works with Bulkheads. If a downstream service is failing, the Circuit Breaker trips (opens) and instantly returns an error or fallback value, preventing resource exhaustion in the calling service.
- **Sidecar Pattern:** The foundational pattern of a Service Mesh. Instead of importing a bulky language-specific library for tracing/metrics, you deploy a separate language-agnostic proxy container in the same network namespace (Kubernetes Pod).
`,
    shortNotes: `
- CQRS: Separate DBs for Reads and Writes. Requires Eventual Consistency.
- Distributed Lock: Needs Fencing Tokens because nodes can freeze and locks can expire.
- Service Mesh (Sidecar): Offloads networking/security logic from application code to a proxy.
- Bulkhead: Isolates resources (thread pools) so a failure in one component doesn't sink the whole app.
- Circuit Breaker: Fails fast when a downstream service is struggling.
`,
    cheatSheet: `
### When to use CQRS
Only when the read workload and write workload are so drastically different that scaling them on the same database is impossible. CQRS introduces immense operational complexity.
`,
    interviewQuestions: [
      { question: 'What is the Bulkhead pattern?', answerHint: 'It is a fault-tolerance pattern. Just like a ship is divided into watertight compartments, a system partitions its resources (like connection pools or thread pools). If one downstream service becomes slow and exhausts its dedicated thread pool, it won\'t starve the rest of the application, keeping other features online.', type: 'CONCEPTUAL' },
      { question: 'Why is a simple Redis distributed lock insufficient for strict safety, and what is the Redlock algorithm?', answerHint: 'A simple Redis lock can expire if the client experiences a long GC pause, allowing a second client to grab the lock while the first still thinks it holds it. Redlock is an algorithm by Redis\' creator that requires acquiring locks on a majority of N independent Redis nodes, providing higher safety against single Redis node failures, though true safety requires Fencing Tokens at the storage layer.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'CQRS Pattern', url: 'https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs', type: 'ARTICLE', priority: 'S', source: 'Microsoft Azure', isOfficial: true }
    ]
  }
};
