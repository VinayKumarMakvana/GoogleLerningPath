export const ds_09_rabbitmq = {
  RABBITMQ: {
    title: 'RabbitMQ',
    description: 'Architecture of a traditional message broker, AMQP, Exchanges, and Queues.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['Messaging & Event-Driven Systems'],
    learningContent: `
# RabbitMQ

RabbitMQ is the most widely deployed open-source traditional message broker. It implements the Advanced Message Queuing Protocol (AMQP).

## Core Concepts
Unlike Kafka, where producers write directly to logs, RabbitMQ has a smart routing layer.
- **Producer:** Sends messages to an Exchange.
- **Exchange:** Receives messages and routes them to zero or more Queues based on routing rules (bindings).
- **Queue:** A buffer that stores messages until they are consumed.
- **Consumer:** Pulls (or is pushed) messages from a Queue.

## Exchange Types
1. **Direct:** Routes messages to a queue whose binding key exactly matches the message's routing key.
2. **Topic:** Routes messages to queues based on wildcard matching of the routing key (e.g., \`logs.error.*\`).
3. **Fanout:** Broadcasts the message to ALL queues bound to the exchange, ignoring the routing key.

## Acknowledgements (Acks)
When a consumer receives a message, it processes it and sends an \`ack\` to RabbitMQ. Only then does RabbitMQ delete the message from RAM/Disk. If the consumer disconnects without sending an ack, RabbitMQ re-queues the message (At-Least-Once delivery).
`,
    fullNotes: `
# Detailed Notes: RabbitMQ

- **Smart Broker / Dumb Consumer:** RabbitMQ tracks the state of every message. It knows exactly which messages have been delivered, acked, or re-queued. This makes it a "smart" broker.
- **Work Queues (Competing Consumers):** If you have 1 queue and 5 consumers connected to it, RabbitMQ will round-robin the messages. Each message is processed by exactly ONE consumer. Excellent for distributing heavy background jobs (like sending emails).
- **Dead Letter Exchanges (DLX):** If a message is rejected (e.g., parsing error), it can be routed to a DLX, which puts it in a Dead Letter Queue for engineers to inspect later.
`,
    shortNotes: `
- Smart Broker, AMQP protocol.
- Producers -> Exchange -> Queue -> Consumer.
- Exchanges route messages via Direct, Topic, or Fanout bindings.
- Messages are DELETED after being acknowledged.
- Competing Consumers pattern scales background workers.
- Use Dead Letter Exchanges for poison messages.
`,
    cheatSheet: `
### RabbitMQ vs Kafka Quick Check
- **Use RabbitMQ:** Task queues, complex routing (Topic/Direct), need messages deleted after processing, exact message tracking.
- **Use Kafka:** Massive throughput, event sourcing, need to replay historical messages, log aggregation.
`,
    interviewQuestions: [
      { question: 'In RabbitMQ, what is the purpose of an Exchange?', answerHint: 'Producers never send messages directly to a queue in RabbitMQ. They send them to an Exchange. The Exchange acts as a router, using bindings and routing keys to determine exactly which queue(s) the message should be delivered to (or discarded if no bindings match).', type: 'TECHNICAL' },
      { question: 'What happens to a message in RabbitMQ if the consumer crashes before sending an acknowledgement?', answerHint: 'RabbitMQ detects the TCP connection drop. Because it has not received an ack, it will take the unacknowledged message and re-queue it, allowing another consumer (or the same one when it reboots) to process it. This guarantees at-least-once delivery.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'RabbitMQ Tutorials', url: 'https://www.rabbitmq.com/getstarted.html', type: 'ARTICLE', priority: 'S', source: 'RabbitMQ', isOfficial: true }
    ]
  }
};
