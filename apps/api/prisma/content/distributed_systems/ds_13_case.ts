export const ds_13_case = {
  DISTRIBUTED_CASE_STUDIES: {
    title: 'Distributed Systems Case Studies',
    description: 'Apply distributed theories to real-world architectures: Distributed Caches, Event Platforms, and Job Queues.',
    difficulty: 'EXPERT',
    estimatedLearnTime: 180,
    prerequisites: ['Distributed Architecture Patterns'],
    learningContent: `
# Distributed Systems Case Studies

These case studies push past basic High-Level Design and focus on the deep distributed engineering aspects.

## 1. Design a Distributed Cache (like Redis/Memcached)
- **Data Partitioning:** We cannot store all data on one node. We must use **Consistent Hashing** to distribute the keys across a ring of cache nodes.
- **Replication:** To prevent data loss on node crash, we use single-leader replication.
- **Eviction:** When memory is full, we implement LRU (Least Recently Used) using a Doubly Linked List and a Hash Map.
- **Gossip Protocol:** How do nodes know the topology of the ring without a central master? They use Gossip Protocol—periodically whispering to a few random neighbors about the state of the cluster until everyone knows.

## 2. Design a Distributed Job Queue (like Celery/AWS SQS)
- **Requirements:** High throughput, exactly-once processing (if possible), visibility timeout.
- **Storage:** A fast, append-heavy store.
- **Visibility Timeout:** When a consumer pulls a job, it is NOT deleted. It is marked "invisible" for a timeout period (e.g., 5 mins). If the consumer finishes, it sends a Delete command. If the consumer crashes, the timeout expires and the job becomes visible for another consumer to process.
- **Dead Letter Queue:** Jobs that fail 5 times are moved to a DLQ.

## 3. Design an Event/Payment Processing System
- **Requirement:** Process a million payments. Absolutely no double charging.
- **Idempotency:** Every incoming payment request MUST have a unique \`Idempotency-Key\`.
- **Database:** Write the idempotency key and the payment state in a single ACID transaction to Postgres.
- **Downstream communication:** Use the **Transactional Outbox Pattern** to publish a \`PaymentSuccess\` event to Kafka.
- **Sagas:** If the payment succeeds but the subsequent Inventory reservation fails, execute a Compensating Transaction to refund the payment.
`,
    fullNotes: `
# Detailed Notes: Case Studies

- **Gossip Protocol (Epidemic Protocol):** Extremely robust in massive clusters. If you have 10,000 nodes, having a central server track who is alive is a bottleneck. In Gossip, each node pings 3 random nodes every second. Information spreads logarithmically (O(log N)). Cassandra uses this for cluster topology.
- **The Thundering Herd Problem in Distributed Caches:** If a popular cached item expires, thousands of servers query the DB at the exact same millisecond. *Solution:* Use a distributed lock (Redis SETNX) so only the first request queries the DB and repopulates the cache, while the others back off and wait.
`,
    shortNotes: `
- Distributed Cache: Requires Consistent Hashing and LRU eviction.
- Gossip Protocol: Decentralized way for nodes to discover cluster topology.
- Job Queue: Uses Visibility Timeouts to handle consumer crashes.
- Payment System: Requires strict Idempotency Keys and Transactional Outbox.
- Thundering Herd: Fix by locking cache misses so only one worker hits the DB.
`,
    cheatSheet: `
### Distributed Design Principles
1. **Assume Failure:** Networks drop, nodes die, disks corrupt.
2. **Limit Blast Radius:** Use Bulkheads and Circuit Breakers.
3. **Avoid Centralization:** Central coordinators become bottlenecks.
4. **Idempotency Everywhere:** Retries are inevitable.
`,
    interviewQuestions: [
      { question: 'In a distributed job queue, what is a Visibility Timeout?', answerHint: 'When a worker pulls a job from the queue, the job is not deleted. It is temporarily hidden (made invisible) for a specific duration. If the worker successfully processes it, it explicitly deletes the job. If the worker crashes, the timeout expires, making the job visible again so another worker can pick it up, guaranteeing fault tolerance.', type: 'TECHNICAL' },
      { question: 'What is a Gossip Protocol and why is it used?', answerHint: 'It is a decentralized communication protocol where nodes periodically exchange state information with a few randomly selected peers. It is used in large distributed systems (like Cassandra) because it scales logarithmically, handles node failures gracefully, and requires no central master to maintain cluster state.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Designing a Distributed Task Queue', url: 'https://medium.com/system-design-blog/designing-a-distributed-task-queue-9b2f69fb443f', type: 'ARTICLE', priority: 'S', source: 'Medium', isOfficial: false }
    ]
  }
};
