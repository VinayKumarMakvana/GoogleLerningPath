export const sd_08_cap = {
  CAP_THEOREM: {
    title: 'Consistency, Availability & Reliability',
    description: 'Master the CAP theorem, PACELC, consistency models, and how distributed systems handle failure.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 120,
    prerequisites: ['Replication, Partitioning & Sharding'],
    learningContent: `
# Consistency, Availability & Reliability

When building distributed systems, hardware *will* fail. Networks *will* partition. How your system handles these failures is defined by its consistency and availability targets.

## The CAP Theorem
In a distributed system, you can only guarantee two out of the following three traits at the same time:
1. **Consistency (C):** Every read receives the most recent write or an error. (All nodes see the exact same data at the exact same time).
2. **Availability (A):** Every request receives a non-error response, without the guarantee that it contains the most recent write.
3. **Partition Tolerance (P):** The system continues to operate despite an arbitrary number of messages being dropped/delayed between nodes (network failure).

**Reality:** Because networks are unreliable, network partitions (P) are unavoidable. Therefore, when a partition occurs, a distributed system must choose between Consistency (CP) and Availability (AP).
- **CP Systems:** If nodes can't talk, the system refuses to answer (errors out) rather than return stale data. (e.g., Bank transaction, MongoDB).
- **AP Systems:** If nodes can't talk, they return the data they have, even if it's stale. (e.g., Social media feed, Cassandra, DynamoDB).

## Consistency Models
- **Strong Consistency:** After a write completes, any subsequent read will return that updated value. (High latency).
- **Eventual Consistency:** If no new updates are made, eventually all accesses will return the last updated value. (Low latency, high availability).
`,
    fullNotes: `
# Detailed Notes: CAP & PACELC

- **PACELC Theorem:** An extension to CAP. It states that in case of a network Partition (P), one must choose between Availability (A) and Consistency (C). **E**lse (E), even when the system is running normally (no partition), one must choose between Latency (L) and Consistency (C). 
- **Quorums in AP/CP Systems:** Distributed databases use quorums (voting) for reads/writes. \`W + R > N\` (Write nodes + Read nodes > Total Nodes) guarantees strong consistency, but increases latency.
- **Fault Tolerance:** Techniques to prevent system failure.
  - *Retries:* With Exponential Backoff and Jitter (to prevent DDoS'ing your own recovering service).
  - *Circuit Breaker:* If a downstream service is failing, stop sending requests immediately (open circuit) to let it recover, returning cached/fallback data instead.
`,
    shortNotes: `
- CAP Theorem: Pick 2 of Consistency, Availability, Partition Tolerance.
- You must always have P. Therefore, choose CP or AP.
- CP: Stops responding if there's a network split to avoid bad data (Banking).
- AP: Keeps responding with potentially stale data (Social Media).
- Strong Consistency = Slow. Eventual Consistency = Fast.
- Circuit Breakers prevent cascading failures across microservices.
`,
    cheatSheet: `
### Database CAP Classifications
- **CA (Does not scale horizontally):** Single-node PostgreSQL / MySQL.
- **CP (Consistency/Partition Tolerance):** MongoDB, HBase, Redis (mostly).
- **AP (Availability/Partition Tolerance):** Cassandra, DynamoDB, CouchDB.
`,
    interviewQuestions: [
      { question: 'Explain the CAP Theorem and why "CA" is not a valid choice in a distributed system.', answerHint: 'CAP states you can only have two of Consistency, Availability, and Partition Tolerance. Because network failures (Partitions) are physically unavoidable in distributed systems over WAN, the system MUST be partition tolerant. Therefore, you are forced to choose between Consistency and Availability.', type: 'CONCEPTUAL' },
      { question: 'What is Eventual Consistency?', answerHint: 'A model where the system guarantees that if no new updates are made to a given piece of data, eventually all accesses to that item will return the last updated value. It sacrifices immediate consistency for high availability and low latency.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'An Illustrated Proof of the CAP Theorem', url: 'https://mwhittaker.github.io/consistency_in_distributed_systems/1_cap.html', type: 'ARTICLE', priority: 'S', source: 'Michael Whittaker', isOfficial: false }
    ]
  }
};
