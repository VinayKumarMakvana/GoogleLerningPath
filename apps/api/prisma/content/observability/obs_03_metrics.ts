export const obs_03_metrics = {
  METRICS_INSTRUMENTATION: {
    title: 'Metrics & Instrumentation',
    description: 'Learn RED and USE methodologies, Counters, Gauges, and Histograms.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['Observability Fundamentals'],
    learningContent: `
# Metrics & Instrumentation

Metrics are numerical measurements taken over time. They are the backbone of dashboards and alerting.

## Metric Types
When you instrument your code, you use specific types of metrics:
1. **Counter:** A number that only goes UP (e.g., \`http_requests_total\`, \`errors_total\`). If the server restarts, it resets to 0. You query the *Rate* of a counter to see requests-per-second.
2. **Gauge:** A number that can go UP or DOWN (e.g., \`memory_usage_bytes\`, \`active_database_connections\`).
3. **Histogram:** Groups values into "buckets" to calculate percentiles (e.g., API latency). This allows you to say "99% of requests finished in under 200ms" (the p99 latency).

## The RED Method (For Applications/Services)
Created by Tom Wilkie, the RED method defines the 3 metrics you MUST monitor for every microservice:
- **Rate:** The number of requests per second.
- **Errors:** The number of those requests that are failing (HTTP 5xx).
- **Duration:** The amount of time those requests take (Latency distributions, p95/p99).

## The USE Method (For Infrastructure/Hardware)
Created by Brendan Gregg, the USE method is for monitoring physical resources (CPU, Disk, Network):
- **Utilization:** The average time the resource was busy servicing work (e.g., "CPU is at 90% utilization").
- **Saturation:** The degree to which the resource has extra work queued up, unable to be serviced (e.g., "CPU run queue length is 15"). A highly utilized resource isn't necessarily bad until it becomes saturated (causing latency).
- **Errors:** The count of error events (e.g., "Disk IO read errors", "Network packet drops").
`,
    fullNotes: `
# Detailed Notes: Metrics

- **Percentiles (p50, p90, p99) vs Averages:** NEVER use Average (Mean) latency for monitoring. If 90 requests take 10ms, and 10 requests take 1000ms (because the DB locked), the average is 109ms. It looks fine. But 10% of your users had a terrible experience! Using the 99th percentile (p99) isolates the slowest 1% of requests, highlighting the outliers.
- **Push vs Pull Metrics:** 
  - *Push (Datadog/StatsD):* The application actively sends UDP packets containing metrics to a central server.
  - *Pull (Prometheus):* The application exposes an \`/metrics\` HTTP endpoint. The central metrics server periodically scrapes (downloads) this endpoint. Pull is generally preferred in modern Kubernetes environments.
`,
    shortNotes: `
- Counter: Only goes up (total requests). Use it to calculate rates.
- Gauge: Goes up and down (memory usage, queue length).
- Histogram: Measures distributions (latency percentiles).
- Avoid Averages for latency. Use Percentiles (p95, p99) to see outliers.
- RED Method (Services): Rate, Errors, Duration.
- USE Method (Infrastructure): Utilization, Saturation, Errors.
`,
    cheatSheet: `
### Latency Percentiles Explained
- **p50 (Median):** 50% of requests are faster than this. Typical user experience.
- **p90:** 90% of requests are faster.
- **p99 (Tail Latency):** 99% of requests are faster. Focus optimization efforts here, as these are the slowest requests that often trigger cascading timeouts.
`,
    interviewQuestions: [
      { question: 'Why should you monitor p99 latency instead of average (mean) latency?', answerHint: 'Averages hide outliers. If the vast majority of requests are very fast, but a small subset are extremely slow (due to garbage collection pauses or database locks), the average will still look acceptable, hiding the fact that some users are experiencing severe degradation. The p99 (99th percentile) specifically highlights the tail latency, representing the worst experiences, which are crucial for ensuring high reliability.', type: 'TECHNICAL' },
      { question: 'Explain the RED method for monitoring microservices.', answerHint: 'The RED method dictates the three golden signals every request-driven service must monitor: Rate (number of requests per second), Errors (number or rate of failing requests), and Duration (the latency distribution of the requests). It provides an immediate, standardized view of the health of any service.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'The RED Method: How to instrument your services', url: 'https://grafana.com/blog/2018/08/02/the-red-method-how-to-instrument-your-services/', type: 'ARTICLE', priority: 'S', source: 'Tom Wilkie (Grafana)', isOfficial: true }
    ]
  }
};
