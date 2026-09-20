export const obs_12_incident = {
  INCIDENT_RESPONSE: {
    title: 'Incident Response & Postmortems',
    description: 'Learn the lifecycle of a production outage, the role of an Incident Commander, and Blameless Root Cause Analysis.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['Alerting & Incident Detection'],
    learningContent: `
# Incident Response & Postmortems

When PagerDuty goes off at 2 AM, chaos is the enemy. Effective Incident Response (IR) requires military-like discipline and strict role definitions.

## 1. Incident Roles
During a major outage, you cannot have 15 engineers shouting in a Zoom call while trying to type SQL queries. You must establish roles:
- **Incident Commander (IC):** The single source of truth. The IC does *not* fix the bug. The IC coordinates the response, dictates who does what, and maintains order. If the IC says "stop typing," everyone stops.
- **Subject Matter Expert (SME) / Resolver:** The engineers actually looking at the logs, profiling the database, and writing the fix.
- **Communications Lead:** The person writing status updates to the CEO and external customers (Twitter/Status Page) so the engineers aren't distracted.

## 2. The IR Lifecycle
1. **Triage:** Acknowledge the page. Determine severity (Is this a Sev-1 global outage, or a Sev-3 minor glitch?).
2. **Containment (Mitigation):** *Do not fix the bug.* Your only goal is to stop the bleeding. If bad code was deployed, **Roll Back immediately**. If a server is crashing, restart it. Do not spend 45 minutes reading the source code while the site is down.
3. **Resolution:** Once the system is stable (mitigated), take your time to properly fix the underlying bug and deploy the patch.
4. **Postmortem:** After the dust settles, analyze the incident to ensure it never happens again.

## 3. The Blameless Postmortem
A document written after a Sev-1 or Sev-2 incident.
- **Rule #1: Blamelessness.** You assume that every engineer acted with the best intentions based on the information they had. You do not write "John broke the database." You write "A migration script executed without a dry-run safety check, leading to table corruption."
- **Root Cause Analysis (The 5 Whys):** Ask "Why?" five times to drill past the technical failure down to the *systemic* failure.
  - *Why did the site go down?* The DB locked.
  - *Why did it lock?* A bad query was run.
  - *Why was it run?* An engineer bypassed CI.
  - *Why did they bypass CI?* The CI pipeline takes 4 hours, and they needed to fix a typo.
  - *Root Cause:* The CI pipeline is too slow, incentivizing dangerous behavior.
- **Action Items:** Explicit tasks (Jira tickets) assigned to specific people with deadlines to fix the systemic issues.
`,
    fullNotes: `
# Detailed Notes: Incident Response

- **MTTD and MTTR:**
  - *Mean Time To Detect (MTTD):* How long it takes from the moment the system breaks until an engineer is paged. (Improved by better Alerting/SLOs).
  - *Mean Time To Resolve (MTTR):* How long it takes to fix the issue and restore service. (Improved by better Runbooks, CI/CD Rollbacks, and Observability).
- **Incident Severity Levels:**
  - *SEV-1:* Critical business impact. Entire site is down. Wake everyone up.
  - *SEV-2:* Major functionality broken (e.g., Checkout is failing for 30% of users). Wake up the specific team.
  - *SEV-3:* Minor issue (e.g., A background email job is delayed). Fix it during business hours.
`,
    shortNotes: `
- Incident Commander (IC): Leads the response. Does NOT write code.
- Mitigation first, Resolution second. (Always roll back bad deploys immediately).
- Blameless Postmortems focus on fixing systems, not punishing humans.
- Use the "5 Whys" to find the systemic root cause.
- MTTD = Mean Time To Detect.
- MTTR = Mean Time To Resolve.
`,
    cheatSheet: `
### Postmortem Document Structure
1. Incident Summary (Executive tl;dr)
2. Timeline (Exact UTC timestamps of events)
3. Impact (How many users affected? How much revenue lost?)
4. Root Cause (The 5 Whys)
5. Action Items (Preventative tasks)
`,
    interviewQuestions: [
      { question: 'During a SEV-1 incident, what is the difference between Mitigation and Resolution?', answerHint: 'Mitigation is the act of stopping the user pain as quickly as possible without necessarily fixing the underlying bug (e.g., rolling back to the previous deployment, horizontally scaling the database, or failing over to a backup region). Resolution is the act of identifying the root cause in the code, writing a proper patch, testing it, and deploying it permanently. During an outage, Mitigation is always the immediate priority.', type: 'CONCEPTUAL' },
      { question: 'Why is a "Blameless" culture essential for effective postmortems?', answerHint: 'If engineers fear being fired or punished for making mistakes, they will hide evidence, point fingers, or sweep incidents under the rug. A blameless culture assumes good intent and focuses on the systemic failure (e.g., "Why did the system allow a human to make this mistake?"). This encourages total transparency, which is the only way to accurately identify the root cause and build preventative safeguards.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Google SRE Book: Postmortem Culture', url: 'https://sre.google/sre-book/postmortem-culture/', type: 'ARTICLE', priority: 'S', source: 'Google', isOfficial: true }
    ]
  }
};
