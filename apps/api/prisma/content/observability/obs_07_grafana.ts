export const obs_07_grafana = {
  GRAFANA_DASHBOARDS: {
    title: 'Grafana & Dashboards',
    description: 'Learn how to visualize telemetry data, design effective dashboards, and avoid visualization pitfalls.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 45,
    prerequisites: ['Prometheus'],
    learningContent: `
# Grafana & Dashboards

Prometheus stores the data; **Grafana** visualizes it. Grafana is an open-source analytics and interactive visualization web application.

## Dashboard Design Principles
A dashboard with 50 chaotic charts is useless during a critical outage. An effective dashboard tells a story at a glance.

### 1. The "Top-Down" Approach
Dashboards should be structured hierarchically.
- **Top Row (Executive Summary):** High-level RED metrics (Global Error Rate, Global RPS, Global p99 Latency). If everything here is green, the system is healthy.
- **Middle Rows (Service Details):** Metrics broken down by individual microservice or database.
- **Bottom Rows (Infrastructure):** Deep hardware metrics (CPU saturation, Disk IO, Network dropped packets) used for deep-dive root cause analysis.

### 2. Context is King
A chart showing "Database CPU is at 80%" is meaningless. Is 80% normal for this time of day? Is it higher than yesterday?
- Always include baselines or previous time-period comparisons.
- Use **Thresholds** (coloring the graph orange at 85%, red at 95%) so on-call engineers instantly know if a value is bad without needing domain expertise.

### 3. Dashboard as Code
Never build production dashboards manually by clicking around the UI. 
If someone accidentally deletes the dashboard, you lose everything. Dashboards must be defined as JSON files (or using tools like Grafonnet/Terraform), committed to Git, and deployed via CI/CD (Provisioning).
`,
    fullNotes: `
# Detailed Notes: Grafana

- **Variables (Templating):** Grafana allows you to define variables (e.g., \`$region\` or \`$kubernetes_pod\`) at the top of the dashboard. Instead of writing 100 hardcoded PromQL queries, you write one query: \`rate(http_requests_total{region="$region"}[5m])\`. The user can dynamically switch between regions.
- **Annotations:** You can configure Grafana to query your CI/CD pipeline (e.g., Jenkins or GitHub) and draw vertical lines on your graphs every time a deployment occurs. When you see a massive spike in errors perfectly aligned with a vertical deployment line, you instantly know the root cause is the new code.
`,
    shortNotes: `
- Prometheus = Database. Grafana = Visualization UI.
- Use a Top-Down design: High-level business metrics first, deep infrastructure metrics at the bottom.
- Add Context: Use thresholds (red/yellow/green) and historical comparisons.
- Provisioning: Store dashboards as JSON in Git (Infrastructure as Code).
- Use Variables to make dashboards dynamic and reusable across environments.
- Use Annotations to overlay deployments on top of metric graphs.
`,
    cheatSheet: `
### Golden Rules of Dashboards
1. If a chart doesn't help you make a decision during an outage, delete it.
2. Put the most important charts at the top left (western reading order).
3. Always label your Y-axis (is it Megabytes or Megabits?).
`,
    interviewQuestions: [
      { question: 'Why is it critical to manage Grafana Dashboards as Code rather than building them manually via the UI?', answerHint: 'Managing dashboards as code (checking the JSON definitions into version control) provides disaster recovery, auditability, and reproducibility. If a dashboard is accidentally modified or deleted during an incident, it can be instantly restored. It also allows dashboards to be reviewed via Pull Requests and seamlessly deployed across multiple environments (Staging, Prod) ensuring consistency.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Best practices for creating dashboards', url: 'https://grafana.com/docs/grafana/latest/dashboards/best-practices/', type: 'ARTICLE', priority: 'S', source: 'Grafana Labs', isOfficial: true }
    ]
  }
};
