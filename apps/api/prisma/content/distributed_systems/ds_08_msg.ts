export const ds_08_msg = {
  MESSAGING_EVENTS: {
    title: 'Messaging & Event-Driven Systems',
    description: 'Deep dive into asynchronous messaging, delivery semantics, and event sourcing.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 90,
    prerequisites: ['Communication, Time & Ordering'],
    learningContent: `
# Messaging & Event-Driven Systems

To decouple microservices, we use Message Brokers. But dealing with networks means dealing with dropped messages and retries.

## Delivery Semantics
When sending a message through a broker, what guarantees do you have?
1. **At-Most-Once:** Fire and forget. Message is sent once. If it drops, it is lost. (Fastest, acceptable for metrics/analytics).
2. **At-Least-Once:** Message is guaranteed to be delivered, but if the acknowledgement drops, it will be delivered again. (Standard for most robust systems. Requires consumers to be Idempotent).
3. **Exactly-Once:** The holy grail. extremely difficult to achieve across different systems. Usually requires a transactional outbox and tightly coupled frameworks.

## The Transactional Outbox Pattern
A common problem: You save an entity to the database, and you want to publish an event to Kafka.
If you save to the DB, but Kafka is down, the event is lost. If you write to Kafka first, but the DB write fails, you published a lie.
**Solution:**
1. In the *same* database transaction, save the entity to the \`Orders\` table, and insert an event payload into an \`Outbox\` table. (Because it's one DB, it's atomic).
2. A separate background process (or Debezium/CDC) polls the \`Outbox\` table and publishes the events to Kafka, then marks them as sent.
`,
    fullNotes: `
# Detailed Notes: Event Systems

- **Event Sourcing:** Instead of storing the *current state* of an entity, you store the *sequence of events* that led to that state. 
  - *Example:* Instead of storing \`Balance: $50\`, you store \`[Deposit $100, Withdraw $50]\`. 
  - *Pros:* Perfect audit log, ability to time-travel (reconstruct state at any point in history).
  - *Cons:* Extremely complex, requires CQRS for efficient querying.
- **CQRS (Command Query Responsibility Segregation):** Separating the read model (Queries) from the write model (Commands). You write events to an Event Store, and asynchronously project those events into a separate read-optimized database.
`,
    shortNotes: `
- At-Most-Once: High loss, high speed.
- At-Least-Once: Guaranteed delivery, requires Idempotent consumers.
- Exactly-Once: Hard/impossible across distinct systems.
- Transactional Outbox: Solves the "Dual Write" problem between DB and Message Broker.
- Event Sourcing: State is derived from an immutable log of events.
- CQRS: Splitting Read and Write databases to optimize for Event Sourcing.
`,
    cheatSheet: `
### Dual Write Problem
- **Bad:** 
  \`db.save(user); kafka.publish(userCreated);\`
- **Good (Outbox):** 
  \`db.transaction(() => { db.save(user); db.saveOutbox(userCreated); })\`
`,
    interviewQuestions: [
      { question: 'What is the Transactional Outbox pattern?', answerHint: 'It solves the dual-write problem (writing to a DB and a message broker atomically). Instead of writing to both directly, you write the business data and the event payload to two different tables in the SAME database within a single ACID transaction. A separate process then reads the event table and publishes to the broker.', type: 'TECHNICAL' },
      { question: 'Why is "Exactly-Once" delivery so hard to achieve?', answerHint: 'Because networks drop acknowledgements. If a broker delivers a message to a consumer, the consumer processes it, but the ack back to the broker drops, the broker MUST retry, resulting in at-least-once delivery. True exactly-once requires the producer, broker, and consumer to all participate in a complex transaction, which is usually only possible within closed ecosystems (like Kafka Streams).', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'The Transactional Outbox Pattern', url: 'https://microservices.io/patterns/data/transactional-outbox.html', type: 'ARTICLE', priority: 'S', source: 'Microservices.io', isOfficial: true }
    ]
  }
};
