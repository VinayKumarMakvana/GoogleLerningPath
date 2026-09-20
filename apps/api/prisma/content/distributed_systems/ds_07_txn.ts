export const ds_07_txn = {
  DISTRIBUTED_TRANSACTIONS: {
    title: 'Distributed Transactions',
    description: 'Learn the limitations of Two-Phase Commit (2PC) and how to implement the Saga pattern for microservices.',
    difficulty: 'EXPERT',
    estimatedLearnTime: 120,
    prerequisites: ['Failure Models & Fault Tolerance', 'Partitioning & Distributed Storage'],
    learningContent: `
# Distributed Transactions

In a single relational database, transactions are ACID. If you transfer money, the deduct and add happen atomically.
In a distributed system, the deduct happens in the \`BillingService\` DB, and the add happens in the \`WalletService\` DB. How do you guarantee atomicity across network partitions?

## Two-Phase Commit (2PC)
The traditional algorithm to achieve atomic distributed transactions.
- **Phase 1 (Prepare):** A Coordinator asks all participant DBs if they are ready to commit. They lock the necessary rows and reply "Yes" or "No".
- **Phase 2 (Commit):** If all reply "Yes", the Coordinator says "Commit". If anyone says "No", it says "Abort".
- **The Fatal Flaw:** 2PC is a *blocking* protocol. If a participant replies "Yes" to Phase 1, it locks its rows. If the Coordinator then crashes before sending Phase 2, those rows remain locked indefinitely until the Coordinator recovers. Because of this terrible performance and availability, 2PC is avoided in modern microservices.

## The Saga Pattern
Sagas solve the problem without long-held locks. A Saga is a sequence of local transactions.
- Service A does its local transaction, updates its DB, and publishes an event.
- Service B listens to the event, does its local transaction, and publishes an event.
- **Compensating Transactions:** If Service C fails, we cannot "rollback" A and B because their transactions already committed. Instead, we run *compensating transactions* (e.g., issue a refund) in reverse order.
`,
    fullNotes: `
# Detailed Notes: Sagas

- **Choreography vs Orchestration (Sagas):**
  - *Choreography:* Decentralized. Services listen to each other's events directly. Good for simple workflows (2-3 steps). Hard to track for complex workflows.
  - *Orchestration:* Centralized. A single "Orchestrator" service tells other services what to do via commands, and waits for replies. Good for complex workflows, but introduces a single point of failure/logic.
- **Idempotency is Mandatory:** In a Saga, network timeouts will cause events to be retried. Every step and every compensating transaction MUST be idempotent, or you will refund a user twice.
`,
    shortNotes: `
- 2PC: Traditional, locking, blocking protocol. Do not use in microservices.
- Saga: Sequence of local transactions connected by events.
- Compensating Transactions: Semantic "undo" operations used in Sagas when a later step fails.
- Choreography: Services react to events.
- Orchestration: A central controller commands services.
- Sagas absolutely require idempotent endpoints.
`,
    cheatSheet: `
### Saga Example (E-Commerce)
1. Order Service: Create Order (Status: PENDING) -> emit \`OrderCreated\`.
2. Payment Service: Charge Card -> emit \`PaymentSucceeded\`.
3. Inventory Service: Reserve Items -> FAILED (Out of stock) -> emit \`InventoryFailed\`.
4. Payment Service (Compensation): Refund Card.
5. Order Service (Compensation): Update Order (Status: CANCELLED).
`,
    interviewQuestions: [
      { question: 'Why is Two-Phase Commit (2PC) considered a bad anti-pattern for microservices?', answerHint: '2PC is a blocking protocol. During the prepare phase, databases acquire locks on records. If the coordinator crashes or the network partitions before the commit phase, those locks are held indefinitely, grinding the entire system to a halt. It couples the availability of all participating services.', type: 'TECHNICAL' },
      { question: 'What is a Compensating Transaction in the Saga pattern?', answerHint: 'Because a Saga uses independent local database transactions, you cannot issue a traditional database rollback if a later step fails. A compensating transaction is a semantic undo operation (like refunding a charged card, or un-reserving inventory) executed to revert the effects of a previously successful step.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Saga Pattern in Microservices', url: 'https://microservices.io/patterns/data/saga.html', type: 'ARTICLE', priority: 'S', source: 'Microservices.io', isOfficial: true }
    ]
  }
};
