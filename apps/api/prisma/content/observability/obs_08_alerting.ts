export const obs_08_alerting = {
  ALERTING_INCIDENT_DETECTION: {
    title: 'Alerting & Incident Detection',
    description: 'Stop alert fatigue. Learn symptom-based alerting and actionable runbooks.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['Grafana & Dashboards'],
    learningContent: `
# Alerting & Incident Detection

Bad alerting destroys engineering culture. If on-call engineers are woken up at 3 AM for issues that resolve themselves, they will start ignoring alerts (Alert Fatigue). When a real outage happens, they will sleep through it.

## 1. Symptom-Based Alerting (The Golden Rule)
**Do not alert on Causes. Alert on Symptoms.**
- *Bad Alert (Cause):* "Database CPU is at 95%." (Who cares? If the queries are still returning in 50ms, the user is unaffected. The CPU is just being used efficiently).
- *Good Alert (Symptom):* "API p99 Latency is > 2 seconds." (The user is actively suffering. You investigate and find the cause is Database CPU).
- You only wake people up if the user is experiencing pain (Errors, Latency).

## 2. Actionable Alerts
If an alert fires, the engineer must immediately know what to do. Every alert must include:
1. **Description:** Exactly what is breaking (e.g., "Checkout API Error Rate > 5%").
2. **Severity:** Is this a Sev-1 (Wake me up) or Sev-3 (Look at it tomorrow morning)?
3. **Runbook Link:** A link to a wiki page with explicit, step-by-step instructions on how to debug and mitigate this specific issue. *If there is no runbook, the alert should not exist.*

## 3. Burn Rate Alerting (Advanced)
Instead of static thresholds (Alert if Errors > 5%), modern SRE uses **Error Budgets** (covered in the next topic). You alert when you are "burning" through your allowed budget too quickly. 
- Fast Burn: "At this rate, we will exhaust our monthly error allowance in 4 hours." (Page someone now).
- Slow Burn: "At this rate, we will exhaust our allowance in 3 days." (Send a Slack message during business hours).
`,
    fullNotes: `
# Detailed Notes: Alerting

- **Flapping:** An alert that rapidly turns on and off (e.g., CPU fluctuates between 89% and 91% every minute, triggering and resolving an alert 50 times). Fix this by adding a \`for\` duration. "Alert ONLY IF CPU > 90% \`for\` 5 continuous minutes."
- **Silences and Inhibitions:** In Prometheus Alertmanager, if the entire Database Cluster dies, you will get 500 alerts (API failing, Auth failing, Payments failing). You configure an Inhibition Rule: "If the 'Database Down' alert fires, suppress all downstream 'API Failing' alerts." This isolates the root cause and stops notification spam.
`,
    shortNotes: `
- Alert Fatigue: Ignoring alerts because there is too much noise.
- Alert on Symptoms (User pain), NOT Causes (High CPU).
- Every alert must have an attached Runbook (How-to-fix guide).
- Use 'for' durations to prevent flapping alerts.
- Use Inhibition rules to suppress downstream noise during a cascading failure.
- Differentiate between Paging alerts (Wake up) and Ticketing alerts (Business hours).
`,
    cheatSheet: `
### Alert Evaluation Checklist
Before creating a new alert, ask:
1. Does this represent actual user pain?
2. Is it urgent and actionable right now?
3. Is it possible for this to resolve itself in 5 minutes? (If yes, wait 5 mins before firing).
`,
    interviewQuestions: [
      { question: 'What is the difference between symptom-based alerting and cause-based alerting, and which is preferred?', answerHint: 'Cause-based alerting triggers on internal system states (e.g., "Kafka queue length > 1000" or "CPU > 90%"). This leads to alert fatigue because internal thresholds are often breached without impacting the end-user. Symptom-based alerting triggers on actual user pain (e.g., "Checkout latency > 5s" or "Error rate > 2%"). Symptom-based is heavily preferred because it strictly aligns engineering pages with actual business impact.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Google SRE Book: Monitoring Distributed Systems', url: 'https://sre.google/sre-book/monitoring-distributed-systems/', type: 'BOOK', priority: 'S', source: 'Google', isOfficial: true }
    ]
  }
};
