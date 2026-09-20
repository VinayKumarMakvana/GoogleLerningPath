export const ds_10_kafka = {
  APACHE_KAFKA: {
    title: 'Apache Kafka',
    description: 'Master the distributed commit log, partitions, consumer groups, and massive scale event streaming.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 120,
    prerequisites: ['Messaging & Event-Driven Systems'],
    learningContent: `
# Apache Kafka

Kafka is not a traditional message queue; it is a **Distributed Append-Only Commit Log**. It is designed for massive throughput (millions of msgs/sec), persistence, and replayability.

## Core Concepts
- **Topic:** A category or feed name. Topics in Kafka are always multi-subscriber.
- **Partition:** A topic is split into multiple partitions across different brokers (servers) to scale horizontally.
- **Offset:** Every message in a partition gets a sequential ID number called an offset.
- **Immutability & Retention:** Messages are appended to the partition log and are immutable. Kafka DOES NOT delete messages when read. It deletes them based on a retention policy (e.g., 7 days or 50GB).

## Consumer Groups
Kafka's most powerful concept for scaling reads.
- Consumers label themselves with a \`group.id\`.
- Each partition is consumed by EXACTLY ONE consumer within a consumer group.
- If a topic has 4 partitions, and your group has 4 consumers, each consumer reads 1 partition. 
- If you have 5 consumers, 1 will sit idle.
- If you add a completely new Consumer Group, they start from offset 0 and read all the messages independently.
`,
    fullNotes: `
# Detailed Notes: Kafka

- **Dumb Broker / Smart Consumer:** Kafka doesn't track which consumer read which message. Consumers are responsible for tracking their own offset (usually committing it back to a special Kafka internal topic).
- **Message Ordering:** Kafka guarantees strict ordering ONLY within a single partition. If you need ordered events for a specific user, you must use the \`user_id\` as the Partition Key. Kafka hashes the key and ensures all messages for that user go to the exact same partition.
- **Zookeeper / KRaft:** Historically, Kafka used Zookeeper for consensus and cluster metadata. Modern Kafka (v3.3+) uses KRaft (an internal Raft implementation), removing the Zookeeper dependency.
`,
    shortNotes: `
- Distributed Append-Only Log.
- High throughput, disk-based, retains messages.
- Topic is split into Partitions (for scaling).
- Ordering is ONLY guaranteed within a single Partition.
- Use a Partition Key to ensure related messages stay ordered.
- Consumer Groups: 1 Partition -> 1 Consumer in the group.
- Max parallel consumers = Number of partitions.
`,
    cheatSheet: `
### Kafka Scaling Limits
- If a topic has 10 partitions, you can only have a maximum of 10 concurrent consumers in a single consumer group. 
- To increase throughput beyond 10 consumers, you MUST increase the number of partitions.
`,
    interviewQuestions: [
      { question: 'How does Kafka guarantee message ordering?', answerHint: 'Kafka only guarantees ordering within a single partition, not across the whole topic. To ensure ordering for a specific entity (e.g., all events for User A), the producer must use the UserID as a partition key. Kafka hashes the key, guaranteeing all events for User A append to the same partition in order.', type: 'TECHNICAL' },
      { question: 'If a Kafka topic has 5 partitions, and you start a consumer group with 7 consumers, what happens?', answerHint: 'Kafka assigns one partition to each consumer. Five consumers will each process one partition, and the remaining two consumers will sit completely idle. They will only start working if one of the active five consumers crashes (triggering a rebalance).', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Apache Kafka Introduction', url: 'https://kafka.apache.org/intro', type: 'ARTICLE', priority: 'S', source: 'Apache Kafka', isOfficial: true },
      { title: 'Kafka in 100 Seconds', url: 'https://www.youtube.com/watch?v=Ch5VhJzaoaI', type: 'VIDEO', priority: 'A', source: 'Fireship', isOfficial: false }
    ]
  }
};
