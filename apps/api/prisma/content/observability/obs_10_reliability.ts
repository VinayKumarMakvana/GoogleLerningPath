export const obs_10_reliability = {
  RELIABILITY_ENGINEERING: {
    title: 'Reliability Engineering & Fault Tolerance',
    description: 'Code defensively using Timeouts, Retries with Exponential Backoff, Circuit Breakers, and Graceful Degradation.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 120,
    prerequisites: ['SLI, SLO & SLA'],
    learningContent: `
# Reliability Engineering & Fault Tolerance

Networks are unreliable. Downstream services will fail. Reliability engineering is about ensuring your application survives when the systems it depends on die.

## 1. Timeouts
**Never make an infinite blocking network call.** If Service A calls Service B, and B hangs, the thread in Service A hangs. Eventually, A runs out of threads and crashes.
- Always set absolute timeouts (e.g., 2000ms). If the call doesn't complete, abort it and free the thread.

## 2. Retries & Exponential Backoff
If a network packet drops, a simple retry often fixes it.
- **The Danger (Retry Storm):** If Service B is overloaded and crashing, and Service A retries immediately, Service A will double the load on B, guaranteeing it stays dead.
- **Exponential Backoff:** Wait 1s, then 2s, then 4s, then 8s. 
- **Jitter:** If 1000 clients all retry at exactly 1s, they cause a Thundering Herd. You must add random "Jitter" (e.g., retry somewhere between 1s and 1.5s) to smooth out the load.

## 3. Circuit Breakers
If Service B is completely down, waiting 2000ms for a timeout on every single request wastes resources in Service A.
- A **Circuit Breaker** wraps the network call. 
- **Closed (Healthy):** Requests flow normally.
- **Open (Failing):** If X% of requests fail within 10 seconds, the circuit "Trips". It immediately returns a fast error (or fallback) for all new requests *without even trying to call Service B*.
- **Half-Open (Testing):** After 30 seconds, it allows exactly 1 request through. If it succeeds, the circuit Closes (recovers). If it fails, it Opens again.

## 4. Graceful Degradation
If Netflix's personalized recommendation engine goes down, the entire homepage shouldn't crash. The system should gracefully degrade by serving a static, pre-cached list of "Top 10 Popular Shows". The user experience is slightly worse, but the core system survives.
`,
    fullNotes: `
# Detailed Notes: Reliability Patterns

- **Bulkheads:** (Borrowed from ship design). If your API has a 'Report Generation' endpoint that is highly CPU intensive, and a 'Login' endpoint. If a user spams the Report endpoint, it will exhaust the shared database connection pool, crashing Login. You use Bulkheads to allocate separate, isolated resource pools (e.g., 10 DB connections for Reports, 40 for Login). If Reports sink, Login stays afloat.
- **Health Checks (Kubernetes):**
  - *Liveness Probe:* "Am I dead?" If it fails, K8s forcibly kills the pod and restarts it. (Fixes deadlocks).
  - *Readiness Probe:* "Am I ready to receive traffic?" If it fails, K8s stops routing HTTP traffic to this pod, but does NOT kill it. (Used during heavy CPU spikes or cache warming).
`,
    shortNotes: `
- Timeouts: Prevent infinite hanging threads.
- Retries must always use Exponential Backoff and Jitter to prevent DDOSing downstream services.
- Circuit Breakers: Fail fast when downstream services are dead to save resources.
- Graceful Degradation: Fallback to a degraded UI instead of crashing the whole app.
- Bulkheads: Isolate resources so a failure in one component doesn't sink another.
- K8s Liveness = Restart the app. K8s Readiness = Stop sending traffic to the app.
`,
    cheatSheet: `
### The Retry Matrix
| Scenario | Action |
| :--- | :--- |
| Network Timeout | Retry (with Jitter) |
| HTTP 500 (Server Error) | Retry (with Backoff) |
| HTTP 400 (Bad Request) | **DO NOT RETRY** (It will always fail) |
| HTTP 401 (Unauthorized) | **DO NOT RETRY** |
`,
    interviewQuestions: [
      { question: 'What is Jitter, and why is it essential when implementing retry logic?', answerHint: 'Jitter is the addition of randomness to the wait time before a retry. If a popular service goes down and comes back up, and 10,000 clients all have a strict 2-second retry policy, they will all hit the recovering server at the exact same millisecond (a Thundering Herd), crashing it again. Adding jitter (e.g., retrying randomly between 1.5s and 2.5s) spreads the load out over time, allowing the server to recover gracefully.', type: 'TECHNICAL' },
      { question: 'Explain how a Circuit Breaker pattern works.', answerHint: 'It prevents a system from repeatedly trying to execute an operation that is likely to fail. It has 3 states. CLOSED: Normal operation. OPEN: If the error rate crosses a threshold, the breaker trips, and all subsequent calls immediately return an error or fallback, saving network/CPU resources. HALF-OPEN: After a timeout, it allows a single test request through. If successful, it transitions back to CLOSED; if it fails, it returns to OPEN.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Timeouts, retries, and backoff with jitter', url: 'https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/', type: 'ARTICLE', priority: 'S', source: 'Marc Brooker (AWS Builders Library)', isOfficial: true }
    ]
  }
};
