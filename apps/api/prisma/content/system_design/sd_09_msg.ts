export const sd_09_msg = {
  MESSAGING_EVENTS: {
    title: 'Messaging & Event-Driven Architecture',
    description: 'Learn message queues, pub/sub systems (Kafka/RabbitMQ), and asynchronous processing.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 120,
    prerequisites: ['API & Service Design'],
    learningContent: `
# Messaging & Event-Driven Architecture

In a distributed system, services shouldn't always talk to each other synchronously (via HTTP/REST). If Service A calls Service B, and Service B is down, Service A fails. 

## Message Queues (Point-to-Point)
A Message Queue receives, holds, and delivers messages.
- **Producer:** Sends the message.
- **Consumer:** Reads and processes the message.
- Once a message is consumed, it is deleted from the queue. (Example: RabbitMQ, AWS SQS).
- *Use Case:* Background jobs (sending emails, video processing).

## Publish-Subscribe (Pub/Sub)
- **Publisher:** Broadcasts a message to a "Topic".
- **Subscriber:** Multiple services can subscribe to the Topic and receive a copy of the same message.
- *Use Case:* An order is placed. The \`OrderService\` publishes an \`OrderCreated\` event. The \`EmailService\`, \`InventoryService\`, and \`ShippingService\` all receive it simultaneously and act independently. (Example: Kafka, AWS SNS).

## Event-Driven Architecture
The system state changes by reacting to "Events" rather than direct commands. It highly decouples microservices.
`,
    fullNotes: `
# Detailed Notes: Messaging

- **Kafka vs RabbitMQ:**
  - *RabbitMQ:* Smart Broker / Dumb Consumer. RabbitMQ tracks which messages have been read. Great for task queues.
  - *Kafka:* Dumb Broker / Smart Consumer. Kafka is an append-only distributed log. Messages are persisted to disk for a retention period (e.g., 7 days) and are NOT deleted when read. Consumers track their own "offset" (which message they read last). Incredible throughput, great for event streaming.
- **Dead Letter Queue (DLQ):** If a consumer repeatedly fails to process a message (e.g., bug in code), the message is moved to a DLQ so it doesn't block the queue, allowing engineers to inspect the failure later.
`,
    shortNotes: `
- Message Queue = Async processing, decoupling, point-to-point (RabbitMQ, SQS).
- Pub/Sub = One-to-many broadcasting (Kafka, SNS).
- Queues provide buffer/rate-limiting (Consumer pulls at its own pace).
- Kafka stores messages permanently (logs). RabbitMQ deletes after consumption.
- Use a Dead Letter Queue (DLQ) for failed messages.
`,
    cheatSheet: `
### Push vs Pull Consumers
- **Push:** The broker pushes messages to the consumer. Low latency, but can overwhelm the consumer if traffic spikes.
- **Pull (Polling):** The consumer asks the broker for messages when it is ready. Standard in Kafka and SQS. Prevents the consumer from crashing under heavy load.
`,
    interviewQuestions: [
      { question: 'What problem do Message Queues solve in system design?', answerHint: 'Decoupling and buffering. They allow the producer to send data without waiting for the consumer to process it. If traffic spikes, the queue buffers the messages, preventing the consumer backend from crashing under the load (smoothing out traffic).', type: 'CONCEPTUAL' },
      { question: 'What is the main architectural difference between RabbitMQ and Apache Kafka?', answerHint: 'RabbitMQ is a traditional message broker where messages are deleted after being acknowledged by the consumer. Kafka is a distributed event streaming platform (a distributed append-only log) where messages are persisted to disk and consumers read sequentially using offsets.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Kafka vs RabbitMQ', url: 'https://www.youtube.com/watch?v=HjrGVqmzqjs', type: 'VIDEO', priority: 'S', source: 'ByteByteGo', isOfficial: false }
    ]
  }
};
