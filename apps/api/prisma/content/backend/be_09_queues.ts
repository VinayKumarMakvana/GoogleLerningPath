export const be_09_queues = {
  JOB_QUEUES: {
    title: 'Job Queues & Background Processing',
    description: 'Learn how to offload heavy tasks to background workers using message queues.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 120,
    prerequisites: ['Redis Fundamentals'],
    learningContent: `
# Job Queues & Background Processing

In a web application, an HTTP request should be answered as quickly as possible (ideally < 200ms). If a user action triggers a slow process (like sending an email, processing a video, or generating a PDF), doing it synchronously blocks the server and makes the user wait.

## The Solution: Message Queues
Instead of processing the task immediately, the web server pushes a "job" (a message) onto a Queue and immediately responds to the user ("Processing started").
A separate process, called a Worker, listens to the Queue, pulls jobs off one by one, and processes them in the background.

## BullMQ / Bull
In the Node.js ecosystem, Bull and BullMQ are the standard libraries for handling job queues. They are backed by Redis, which stores the queue data and handles the locking mechanisms.
`,
    fullNotes: `
# Detailed Notes: Queues

- **Producer vs Consumer:** The web server is the Producer (adds jobs to the queue). The background worker is the Consumer (processes jobs from the queue).
- **Idempotency:** Background jobs can fail and be retried by the queue. Your job processing logic MUST be idempotent (safe to run multiple times without unintended side effects, like charging a credit card twice).
- **Pub/Sub vs Queues:** Pub/Sub (Publish/Subscribe) sends a message to *all* subscribers. A Job Queue sends a message to *exactly one* available worker.
- **Dead Letter Queue (DLQ):** A secondary queue where jobs are moved if they fail repeatedly. Useful for debugging without clogging the main queue.
`,
    shortNotes: `
- Never block HTTP requests with long-running tasks.
- Use a Message Queue (like RabbitMQ, SQS, or Redis-backed BullMQ).
- Web Server = Producer. Background Process = Consumer/Worker.
- Jobs must be idempotent to handle retries safely.
- Move permanently failed jobs to a Dead Letter Queue.
`,
    cheatSheet: `
\`\`\`javascript
const { Queue, Worker } = require('bullmq');

// Producer (Web Server)
const emailQueue = new Queue('Emails');
await emailQueue.add('welcome_email', { email: 'user@example.com' });
res.send('Email queued!');

// Consumer (Background Worker Process)
const worker = new Worker('Emails', async job => {
  if (job.name === 'welcome_email') {
    await sendEmail(job.data.email);
  }
});
\`\`\`
`,
    interviewQuestions: [
      { question: 'Why should background jobs be idempotent?', answerHint: 'Because if a worker crashes midway through a job, or a network timeout occurs, the queue will retry the job. If it is not idempotent, a retry might cause duplicate side effects (e.g., sending two emails).', type: 'TECHNICAL' },
      { question: 'What is a Dead Letter Queue (DLQ)?', answerHint: 'A DLQ is a holding queue for messages/jobs that cannot be processed successfully after a maximum number of retries. It prevents poison messages from blocking the main queue.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'BullMQ Documentation', url: 'https://docs.bullmq.io/', type: 'ARTICLE', priority: 'S', source: 'BullMQ', isOfficial: true },
      { title: 'Message Queues Explained', url: 'https://www.youtube.com/watch?v=oUJbuFMyBDk', type: 'VIDEO', priority: 'A', source: 'Hussein Nasser', isOfficial: false }
    ]
  }
};
