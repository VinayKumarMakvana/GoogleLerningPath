export const obs_04_tracing = {
  DISTRIBUTED_TRACING: {
    title: 'Distributed Tracing',
    description: 'Understand Traces, Spans, and Context Propagation across microservice boundaries.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 60,
    prerequisites: ['Observability Fundamentals'],
    learningContent: `
# Distributed Tracing

In a monolith, you can track performance using a standard profiler. In a microservice architecture, a single user click might traverse an API Gateway, an Auth Service, an Order Service, and a Payment Service. If the request takes 5 seconds, how do you know which service was the bottleneck?

**Distributed Tracing** solves this.

## 1. Traces and Spans
- **Trace:** Represents the entire end-to-end journey of a single request. It is essentially a tree of Spans.
- **Span:** A single logical unit of work within a trace (e.g., "Authenticate User", "Query Postgres", "Call Payment API"). 
  - Every span has a \`name\`, a \`start_time\`, a \`duration\`, and an ID.
  - Spans have parent-child relationships (The "Order" span is the parent of the "Payment" span).

## 2. Context Propagation
How do 5 different microservices know they are participating in the *same* Trace?
- When the API Gateway receives a request, it generates a unique \`TraceID\`.
- It also generates a \`SpanID\` for its own work.
- When the Gateway makes an HTTP request to the Order Service, it **injects this context** into the HTTP Headers (usually using the W3C \`traceparent\` header format).
- The Order Service extracts the \`TraceID\` from the header, does its work (creating a child \`SpanID\`), and passes the headers down to the Payment Service.
- All services asynchronously send their completed Spans to a central tracing backend (like Jaeger, Honeycomb, or Datadog), which stitches them together using the \`TraceID\`.

## 3. Sampling
Tracing every single request in a high-volume system (10,000 requests/sec) will generate terabytes of data and bankrupt you.
- **Head-Based Sampling:** The API Gateway decides randomly (e.g., 1% of the time) to trace a request. It passes a flag in the headers to tell downstream services "trace this one".
- **Tail-Based Sampling:** All traces are generated and held in memory temporarily. The tracing backend decides *after* the request completes whether to save it (e.g., "Drop all successful 200 OK fast traces, but absolutely keep and save any trace that had an Error or took longer than 2 seconds").
`,
    fullNotes: `
# Detailed Notes: Tracing

- **Baggage:** Alongside Trace Context, distributed tracing protocols allow you to pass "Baggage" (custom key-value pairs) in the HTTP headers down the call chain. If the Gateway adds \`user_tier=premium\` to the Baggage, the Payment service 5 hops down can read it without having to query the database.
- **N+1 Query Problem:** Distributed tracing visualizes the N+1 database problem perfectly. The UI will show one parent span ("Get Users") followed by 100 identical tiny, sequential child spans ("Get User Details"), proving a loop is executing independent DB queries instead of a single JOIN.
`,
    shortNotes: `
- Tracing is mandatory for debugging latency in microservices.
- A Trace is a tree of Spans. A Span is a unit of work (with a start and end time).
- Context Propagation moves the \`TraceID\` across network boundaries via HTTP Headers.
- Head-Based Sampling: Randomly select 1% of requests at the start to save costs.
- Tail-Based Sampling: Wait until the request finishes, then save it if it was an error or slow.
`,
    cheatSheet: `
### W3C Trace Context Header (traceparent)
\`00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01\`
- \`00\`: Version
- \`4bf92...\`: **TraceID** (Global identifier for the whole request)
- \`00f06...\`: **Parent SpanID** (Identifier of the caller)
- \`01\`: **TraceFlags** (e.g., 01 means this request is sampled/recorded)
`,
    interviewQuestions: [
      { question: 'What is Context Propagation in Distributed Tracing?', answerHint: 'Context propagation is the mechanism by which trace identifiers (like TraceID and Parent SpanID) are passed between different microservices over network boundaries. This is typically done by injecting these IDs into standard HTTP headers (like the W3C traceparent header) on the client side, and extracting them on the server side, ensuring all discrete units of work are correlated back into a single cohesive Trace.', type: 'TECHNICAL' },
      { question: 'What is the difference between Head-based sampling and Tail-based sampling?', answerHint: 'Head-based sampling makes the decision to record a trace at the very beginning of the request (e.g., randomly picking 1% of incoming traffic). It is simple and cheap but might miss rare errors. Tail-based sampling observes the entire completed trace in memory before deciding whether to persist it to storage, allowing it to intelligently save 100% of errors and slow requests while discarding normal traffic, though it requires significantly more memory and infrastructure.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'W3C Trace Context Specification', url: 'https://www.w3.org/TR/trace-context/', type: 'ARTICLE', priority: 'A', source: 'W3C', isOfficial: true }
    ]
  }
};
