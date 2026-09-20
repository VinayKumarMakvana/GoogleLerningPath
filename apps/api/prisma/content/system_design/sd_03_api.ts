export const sd_03_api = {
  API_SERVICE_DESIGN: {
    title: 'API & Service Design',
    description: 'Design robust APIs (REST, GraphQL, gRPC) and understand the differences between synchronous and asynchronous communication.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 90,
    prerequisites: ['Requirements & Estimation'],
    learningContent: `
# API & Service Design

After gathering requirements, you define the system's boundary: The APIs. APIs define how clients interact with your system, and how internal microservices interact with each other.

## API Paradigms
1. **REST (Representational State Transfer):** Standard HTTP verbs (GET, POST, PUT, DELETE). Resource-oriented. Best for public APIs.
2. **GraphQL:** Client specifies exactly what data it wants. Great for mobile clients to prevent over-fetching or under-fetching.
3. **gRPC:** High-performance Remote Procedure Call framework using Protocol Buffers and HTTP/2. Heavily used for internal microservice-to-microservice communication due to low latency and binary format.
4. **WebSockets:** Bidirectional, persistent connection. Used for real-time applications (Chat, live sports scores, trading).

## API Design Best Practices
- **Pagination:** Never return 10,000 records. Use Offset/Limit or Cursor-based pagination.
- **Versioning:** APIs change. Always version them (e.g., \`/v1/users\`) to avoid breaking existing clients.
- **Idempotency:** An API is idempotent if calling it multiple times has the same result as calling it once (e.g., PUT or DELETE). Crucial for handling network retries safely.
`,
    fullNotes: `
# Detailed Notes: API Design

- **Cursor vs Offset Pagination:** Offset (\`LIMIT 10 OFFSET 1000\`) is slow on large datasets because the DB must scan and skip 1000 rows. Cursor-based (\`WHERE id > last_seen_id LIMIT 10\`) is fast and handles real-time data insertions gracefully without skipping items.
- **Synchronous vs Asynchronous APIs:**
  - *Sync:* Client waits for the response (HTTP request/response).
  - *Async:* Client submits a job, gets an immediate "202 Accepted" status, and polls for the result (or receives a webhook callback later). Used for heavy processing tasks (e.g., video encoding).
`,
    shortNotes: `
- REST = Public APIs, Resource-based.
- GraphQL = Flexible querying, prevents over-fetching.
- gRPC = Internal microservices, binary, very fast.
- WebSockets = Real-time, bidirectional.
- Always implement Pagination (Prefer cursor-based for scale).
- Make critical endpoints (like payments) Idempotent.
`,
    cheatSheet: `
### Idempotency Key Flow (Payments)
1. Client generates UUID (Idempotency Key).
2. Client sends POST /payments with Key.
3. Server checks DB: Does Key exist?
4. If YES -> Return saved result (don't charge again).
5. If NO -> Process payment, save result against Key, return success.
`,
    interviewQuestions: [
      { question: 'When would you choose GraphQL over REST?', answerHint: 'When clients have diverse data requirements (e.g., mobile vs web). GraphQL allows the client to request exactly what it needs, preventing over-fetching (wasting bandwidth) and under-fetching (requiring multiple API calls).', type: 'TECHNICAL' },
      { question: 'What is API Idempotency and why is it important?', answerHint: 'Idempotency ensures that making the same request multiple times produces the same result as making it once. It is critical in distributed systems where network timeouts occur; clients can safely retry a POST request (like a payment) without double-charging.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'REST API Design Best Practices', url: 'https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/', type: 'ARTICLE', priority: 'S', source: 'StackOverflow', isOfficial: false }
    ]
  }
};
