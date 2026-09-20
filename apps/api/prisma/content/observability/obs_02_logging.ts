export const obs_02_logging = {
  STRUCTURED_LOGGING: {
    title: 'Structured Logging',
    description: 'Stop using plain text logs. Learn JSON structured logging, log levels, and request correlation.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['Observability Fundamentals'],
    learningContent: `
# Structured Logging

A standard plain-text log looks like this:
\`2024-03-12 10:04:22 ERROR User 123 failed to purchase item 456 because credit card expired.\`

While a human can read this easily, machines cannot. If you want to build a graph of "Failed purchases per minute" in Datadog or ELK, you have to write complex, brittle Regex to parse the string. 

## Structured Logging
Instead of logging strings, **Structured Logging** means your application outputs logs as JSON objects.
\`\`\`json
{
  "timestamp": "2024-03-12T10:04:22Z",
  "level": "error",
  "event": "purchase_failed",
  "user_id": 123,
  "item_id": 456,
  "reason": "credit_card_expired",
  "request_id": "req-987abc"
}
\`\`\`
Now, querying your log aggregation system is trivial: \`SELECT COUNT(*) FROM logs WHERE event='purchase_failed' AND reason='credit_card_expired'\`.

## Log Levels
Every log must have a severity level to allow filtering.
- **DEBUG:** Verbose information for developers (usually disabled in Production to save disk space).
- **INFO:** Routine application events (e.g., "Server started on port 8080", "Batch job finished").
- **WARN:** Something unexpected happened, but the application recovered (e.g., "API rate limit hit, retrying in 2s").
- **ERROR:** A request failed, but the application as a whole is still running (e.g., "Database timeout while saving user").
- **FATAL / PANIC:** The application is entirely broken and is crashing *right now* (e.g., "Cannot connect to database on startup").

## Correlation IDs (Request IDs)
In a concurrent web server, hundreds of requests are processed simultaneously. If you look at a log file, the logs for User A and User B are interleaved.
To fix this, you generate a unique \`request_id\` (UUID) at the API Gateway. You attach this ID to the request context, and **every single log** generated during that request includes the \`request_id\`. You can then filter the logs by that ID to see a perfect, sequential story of exactly what happened to that specific request.
`,
    fullNotes: `
# Detailed Notes: Logging Practices

- **Log Aggregation:** Microservices run across dozens of ephemeral Kubernetes pods. If a pod crashes, its local log files are deleted forever. Therefore, logs must be streamed (usually via \`stdout\`) to an aggregator (like FluentBit or Logstash), which forwards them to a centralized search cluster (Elasticsearch, Splunk, Datadog).
- **PII and Scrubbing:** Never log Personally Identifiable Information (PII) like plaintext passwords, social security numbers, or full credit card numbers. Your logging library should have automated scrubbers/maskers to redact sensitive fields before they leave the server.
`,
    shortNotes: `
- Stop logging plain strings. Log JSON objects (Structured Logging).
- JSON allows fast, indexable querying without Regex.
- Use strict log levels: DEBUG, INFO, WARN, ERROR, FATAL.
- Never trigger PagerDuty alerts on INFO or WARN logs.
- Inject a unique \`request_id\` into every log line to untangle concurrent requests.
- Stream logs to stdout; let the infrastructure (FluentBit) ship them to centralization (ELK).
- Actively redact PII and secrets before logging.
`,
    cheatSheet: `
### What NOT to log
- Passwords, API Keys, JWTs.
- PII (SSNs, full addresses).
- Useless noise (\`"entering function X"\`, \`"exiting function Y"\` - use Traces for this).
- High-volume generic loops (unless batched).
`,
    interviewQuestions: [
      { question: 'Why is Structured Logging preferred over plain-text logging in production systems?', answerHint: 'Plain-text logs require complex, brittle Regex parsing to extract data for analysis, which breaks if the log format changes slightly. Structured logging (like JSON) treats logs as queryable data structures, allowing log aggregation tools (like Elasticsearch) to index fields directly, making searching, filtering, and metric extraction vastly faster and more reliable.', type: 'TECHNICAL' },
      { question: 'How do you trace the execution flow of a single user\'s request through a heavily concurrent backend service?', answerHint: 'By implementing Correlation IDs (or Request IDs). A unique UUID is generated at the entry point of the request (like the API Gateway). This ID is stored in a thread-local context (or passed down the context object) and automatically appended to every single log statement emitted during the lifecycle of that request. In the log aggregator, filtering by that ID isolates only the logs for that specific request.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'The 12-Factor App: Logs', url: 'https://12factor.net/logs', type: 'ARTICLE', priority: 'S', source: 'Adam Wiggins', isOfficial: true }
    ]
  }
};
