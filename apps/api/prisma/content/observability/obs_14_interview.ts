export const obs_14_interview = {
  OBS_INTERVIEW_PREP: {
    title: 'Production Reliability Case Studies & Interviews',
    description: 'SRE Interview prep: Walk through real-world debugging scenarios from symptoms to root cause.',
    difficulty: 'EXPERT',
    estimatedLearnTime: 60,
    prerequisites: ['Incident Response & Postmortems', 'Capacity Planning & Resilience'],
    learningContent: `
# Reliability Engineering Case Studies & Interviews

Site Reliability Engineering (SRE) and Systems Engineering interviews focus heavily on your ability to debug complex, ambiguous production scenarios.

## The Debugging Framework

When given a scenario ("Users are reporting 500 errors on checkout"), follow this strict framework:

### 1. Verify and Scope the Impact (Symptoms)
- "Are we seeing the errors in our metrics?"
- "Is it affecting all users, or just users in a specific region? Mobile or Desktop?"
- "When did it start? Was there a recent deployment?"

### 2. Isolate the Fault Domain (Telemetry)
- "I'll look at the high-level **Grafana RED Dashboard**. Is the error rate isolated to the Checkout API, or is the upstream API Gateway failing?"
- "I'll pull up a **Distributed Trace** in Jaeger/Datadog for a failing request. Which span is returning the 500?"
- *Scenario reveals:* The trace shows the Checkout API is failing when making a call to the Payment Service.

### 3. Deep Dive into the Failing Component (Investigation)
- "I'll check the **Logs** of the Payment Service filtered by the \`request_id\` from the trace."
- *Scenario reveals:* The logs show \`ConnectionTimeoutException: Unable to connect to PostgreSQL\`.
- "I will check the **USE Metrics** for the Postgres database."
- *Scenario reveals:* Database CPU is at 20%, but the Active Connection Count is maxed out at 1000/1000.

### 4. Mitigate immediately (Containment)
- "The database connection pool is exhausted. I need to stop the bleeding. I will configure the Checkout API's Circuit Breaker to OPEN, failing fast to protect the DB from further spam."

### 5. Root Cause & Prevention (Postmortem)
- "Why did the connections spike? I will look at the slow query logs."
- *Root Cause:* A missing index caused a query to take 30 seconds instead of 10ms, tying up all connections.
- *Prevention:* Add the index, implement strict database query timeouts, and set up an alert on connection pool saturation.

## Case Study: The Memory Leak
- **Symptom:** PagerDuty fires for "High Latency in Image Service."
- **Telemetry:** CPU is spiking to 100% every 5 minutes.
- **Investigation:** Looking at JVM metrics, the garbage collector is running constantly (GC Thrashing) because memory is at 99%.
- **Root Cause:** A developer loaded entire 50MB images into memory arrays instead of using Streams.
- **Prevention:** Rewrite the code to use \`fs.createReadStream\`.
`,
    fullNotes: `
# Detailed Notes: SRE Interviews

- **The "No Blame" check:** Interviewers will test your culture. If they ask, "Who is at fault here?", you must pivot to the systemic failure. "The pipeline lacked an automated load test to catch the memory leak."
- **Understanding Latency:** Always assume network calls are slow and can fail. A senior engineer never assumes an API call to a third party (like Stripe) will return instantly.
`,
    shortNotes: `
- Follow the Framework: Scope -> Isolate (Traces) -> Deep Dive (Logs/Metrics) -> Mitigate -> Root Cause.
- Never jump to conclusions. Prove your hypothesis using Telemetry.
- Mitigation (stopping the outage) always comes before Root Cause Analysis.
- Emphasize blameless culture and systemic prevention (tests, circuit breakers, timeouts).
`,
    cheatSheet: `
### SRE Golden Signals Checklist
- **If Latency is high, but CPU is low:** Look at Network IO, Database Locks, or downstream service timeouts.
- **If Latency is high, and CPU is high:** Look for GC thrashing, infinite loops, or missing DB indexes.
- **If Errors are high, but Traffic is zero:** The Load Balancer/WAF is likely blocking everything upstream.
`,
    interviewQuestions: [
      { question: 'During an interview, you are given this scenario: "The API latency has suddenly spiked from 50ms to 5000ms. CPU usage on the API servers is low. What steps do you take to investigate?"', answerHint: '1. I would look at Distributed Traces to see exactly where the 5 seconds is being spent. 2. Because CPU is low, the API is likely blocking on I/O. I would check the traces for calls to the Database or external 3rd-party APIs. 3. If the trace shows the Database query taking 4950ms, I would look at the Database metrics (Locks, Disk I/O) and the slow query logs to identify the exact query causing the issue. 4. To mitigate immediately, I would ensure my API has a strict 2-second timeout and circuit breaker configured to prevent connection pool exhaustion.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Debugging under fire: Keep your head when systems have lost their mind', url: 'https://www.youtube.com/watch?v=30jNsCVLPUw', type: 'VIDEO', priority: 'S', source: 'Bryan Cantrill', isOfficial: false }
    ]
  }
};
