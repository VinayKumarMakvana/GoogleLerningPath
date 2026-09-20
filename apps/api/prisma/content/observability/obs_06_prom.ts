export const obs_06_prom = {
  PROMETHEUS: {
    title: 'Prometheus',
    description: 'Learn the industry standard Time-Series Database (TSDB), Pull architecture, Exporters, and PromQL.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['Metrics & Instrumentation'],
    learningContent: `
# Prometheus

Prometheus is the de facto standard open-source Time-Series Database (TSDB) for Kubernetes and cloud-native metrics.

## 1. The Pull Model
Unlike most monitoring systems (which expect your app to push metrics to them), Prometheus uses a **Pull (Scrape)** model.
- Your application exposes an HTTP endpoint (usually \`/metrics\`).
- This endpoint returns a plain-text list of current metric values.
- The Prometheus server connects to your app every 15 seconds, scrapes the text, and stores the values in its database.
- *Advantage:* If your app is crashing and CPU is at 100%, it might not have the resources to push metrics over the network. But Prometheus can still try to pull them (or record that the pull failed, triggering an immediate alert).

## 2. Exporters
If you want to monitor Postgres, Postgres doesn't natively expose a \`/metrics\` endpoint. 
You run a **Prometheus Exporter** alongside Postgres. The Exporter queries Postgres using standard SQL, translates the results into the Prometheus text format, and exposes the \`/metrics\` endpoint for Prometheus to scrape. There are exporters for Redis, Linux (Node Exporter), Nginx, etc.

## 3. PromQL (Prometheus Query Language)
PromQL is deeply mathematical, optimized for querying vectors (arrays of time-series data).
- \`http_requests_total\`: An Instant Vector (returns the current total count).
- \`http_requests_total[5m]\`: A Range Vector (returns all the raw data points recorded over the last 5 minutes).
- **The \`rate()\` function:** Because counters only go up, the raw number is useless. You must calculate the per-second rate of increase.
  - \`rate(http_requests_total[5m])\` tells you the Requests Per Second (RPS) averaged over the last 5 minutes.
`,
    fullNotes: `
# Detailed Notes: Prometheus

- **Service Discovery:** How does Prometheus know the IP addresses of the 50 new pods Kubernetes just spun up? Prometheus natively integrates with the Kubernetes API. It watches for new Pods, automatically discovers their IPs, and starts scraping them without any manual configuration changes.
- **Labels (Tags):** Metrics in Prometheus are multi-dimensional. \`http_requests_total{method="GET", status="200"}\`. This allows powerful slicing and dicing in PromQL.
- **Alertmanager:** Prometheus itself does not send emails or Slack messages. It evaluates PromQL rules. If a rule is true (e.g., \`rate(errors[5m]) > 10\`), it fires an alert to a separate component called **Alertmanager**, which handles deduplication, grouping, and routing to PagerDuty/Slack.
`,
    shortNotes: `
- Prometheus is a Time-Series Database (TSDB) built for metrics.
- Uses a PULL model (it scrapes your \`/metrics\` endpoint every 15s).
- Exporters translate 3rd-party software metrics into Prometheus format.
- Seamless Service Discovery in Kubernetes.
- PromQL is the query language.
- Use \`rate(counter[5m])\` to calculate requests per second.
- Alertmanager handles routing alerts to Slack/PagerDuty.
`,
    cheatSheet: `
### PromQL Cheat Sheet
- **Error Rate:** \`rate(http_requests_total{status=~"5.."}[5m])\`
- **Total Request Rate:** \`rate(http_requests_total[5m])\`
- **Percentage Error Rate:** \`(Error Rate / Total Request Rate) * 100\`
- **p99 Latency:** \`histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))\`
`,
    interviewQuestions: [
      { question: 'Why does Prometheus use a Pull model instead of a Push model?', answerHint: 'The Pull model has several advantages: 1) Reliability during failure: a saturated system might not have the CPU/network to push metrics, but Prometheus can still attempt a pull. 2) Simplicity: You can easily test metrics by just running \`curl /metrics\` in your terminal. 3) Automatic state detection: If a pull fails, Prometheus immediately knows the target is down (up=0), whereas in a push model, silence could mean the target is down OR just idle.', type: 'TECHNICAL' },
      { question: 'In PromQL, why do you almost always wrap a Counter metric in a rate() or irate() function?', answerHint: 'A Counter is a cumulative metric that only increases (or resets to 0 on restart). The raw absolute number (e.g., 5,432,100 total requests since yesterday) is generally useless for dashboards or alerting. You want to know how fast it is increasing right now. The \`rate()\` function calculates the per-second rate of increase over a specified time window, giving you Requests Per Second (RPS).', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Prometheus Overview', url: 'https://prometheus.io/docs/introduction/overview/', type: 'ARTICLE', priority: 'S', source: 'Prometheus Docs', isOfficial: true }
    ]
  }
};
