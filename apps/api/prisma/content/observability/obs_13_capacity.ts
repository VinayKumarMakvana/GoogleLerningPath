export const obs_13_capacity = {
  CAPACITY_PLANNING: {
    title: 'Capacity Planning & Resilience',
    description: 'Load testing, Chaos Engineering, and scaling limits.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 60,
    prerequisites: ['Performance Engineering & Profiling'],
    learningContent: `
# Capacity Planning & Resilience

You cannot scale infinitely. Even cloud environments have limits (e.g., AWS account quotas, Postgres maximum connection limits, physical network bandwidth).

## 1. Load Testing vs Stress Testing
- **Load Testing:** Simulating expected peak traffic (e.g., Black Friday sales) to verify that your system can handle the load while maintaining your latency SLOs.
- **Stress Testing:** Pushing the system *past* expected peak traffic until it completely breaks. The goal is to discover *what* breaks first. Does the DB run out of connections? Does the API run out of memory?
- **Soak Testing:** Running a moderate load against the system for a very long time (e.g., 48 hours) to discover memory leaks or slowly degrading performance.

## 2. Capacity Planning
Based on your Stress Test results, you know your system breaks at 10,000 Requests Per Second (RPS) due to database CPU saturation.
If your marketing team predicts 8,000 RPS for an upcoming sale, you have two choices:
1. Vertically/Horizontally scale the database (expensive).
2. Implement aggressive caching (Redis) or Queueing (Kafka) to absorb the load.

## 3. Chaos Engineering
Popularized by Netflix (Chaos Monkey). It is the discipline of experimenting on a system to build confidence in its capability to withstand turbulent conditions in production.
- *Hypothesis:* "If the Order Service goes down, the User Profile service will continue to work."
- *Experiment:* You deliberately kill the Order Service in production (or a staging environment that mirrors prod).
- *Observation:* You watch the telemetry. If the User Profile service crashes (proving your hypothesis wrong), you have uncovered a hidden systemic dependency. You fix the architecture (e.g., by adding a Circuit Breaker) before a real outage happens.
`,
    fullNotes: `
# Detailed Notes: Resilience

- **Auto-Scaling Lag:** You cannot rely entirely on Kubernetes HPA (Horizontal Pod Autoscaler) or AWS Auto Scaling Groups to handle sudden, massive spikes in traffic (like a Super Bowl ad). It takes time for metrics to trigger, nodes to provision, and application caches to warm up. For massive known events, you must Pre-scale the infrastructure.
- **Dark Launching / Shadow Traffic:** Before releasing a major backend rewrite, you can "shadow" traffic. The API Gateway sends the real user request to the Old Backend (which returns the response to the user), but it also asynchronously sends a copy of the request to the New Backend. You compare the telemetry of the New Backend to ensure it handles the load without affecting users.
`,
    shortNotes: `
- Load Testing verifies performance at expected peak traffic.
- Stress Testing pushes the system until it breaks to find bottlenecks.
- Soak Testing runs for days to find memory leaks.
- Chaos Engineering: Deliberately breaking things (Chaos Monkey) to prove the system is resilient.
- Auto-scaling is not instantaneous; pre-scale for known massive events.
- Shadow Traffic allows you to test new services with real production load silently.
`,
    cheatSheet: `
### The 4 Phases of Chaos Engineering
1. Define the 'Steady State' (Normal metrics).
2. Form a Hypothesis (e.g., "Killing DB node B won't affect users").
3. Introduce Chaos (Kill the node).
4. Verify or Disprove the hypothesis.
`,
    interviewQuestions: [
      { question: 'What is the purpose of Chaos Engineering?', answerHint: 'The purpose is not just to break things, but to proactively discover hidden vulnerabilities, tight couplings, and failure modes in a distributed system before they manifest as critical outages in production. By injecting controlled failures (like killing nodes or adding network latency) and verifying the system\'s resilience, engineers can build robust safeguards like circuit breakers and fallbacks.', type: 'CONCEPTUAL' },
      { question: 'What is the difference between Load Testing and Stress Testing?', answerHint: 'Load testing applies a predetermined, expected maximum amount of traffic to verify that the system meets its Service Level Objectives (SLOs) under peak normal conditions. Stress testing intentionally pushes traffic far beyond normal limits until the system completely fails, with the specific goal of identifying the system\'s weakest link (e.g., DB connections, CPU, memory) so it can be mitigated before real traffic ever reaches that level.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Principles of Chaos Engineering', url: 'https://principlesofchaos.org/', type: 'ARTICLE', priority: 'S', source: 'Chaos Community', isOfficial: true }
    ]
  }
};
