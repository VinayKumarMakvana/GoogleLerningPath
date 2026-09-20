export const obs_09_slo = {
  SLI_SLO_SLA: {
    title: 'SLI, SLO & SLA',
    description: 'The mathematics of reliability. Understand Error Budgets and how to balance feature velocity with stability.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 60,
    prerequisites: ['Alerting & Incident Detection'],
    learningContent: `
# SLI, SLO, SLA, and Error Budgets

100% reliability is impossible. Trying to achieve it slows development to a crawl and costs billions in redundant infrastructure. Google SRE dictates that you must define *exactly* how unreliable you are allowed to be.

## The Definitions
- **SLI (Service Level Indicator):** A direct, mathematical measurement of system behavior.
  - *Example:* (Number of Successful HTTP Requests / Total HTTP Requests) * 100.
- **SLO (Service Level Objective):** The internal target you set for your SLI.
  - *Example:* Our SLI will remain above **99.9%** (Three Nines) over a 30-day rolling window.
- **SLA (Service Level Agreement):** The legal, external contract with your paying customers. If you breach the SLA, you owe them a financial refund.
  - *Example:* We guarantee **99.9%** uptime.
  - *Rule:* Your internal SLO must always be stricter than your external SLA (e.g., SLO is 99.95%, SLA is 99.9%) so you get alerted before you lose money.

## Error Budgets
If your SLO is 99.9% success over 30 days, that means you are *mathematically allowed* to fail 0.1% of the time. 
This 0.1% is your **Error Budget**. (Roughly 43 minutes of downtime per month).

**How it drives behavior:**
- If you have plenty of Error Budget left, developers can ship features fast, merge risky code, and do chaotic deployments.
- If an outage occurs and you "burn" through your Error Budget, **all feature development stops**. The entire engineering team must shift 100% of their focus to reliability, paying off technical debt, and improving tests until the 30-day rolling window recovers the budget.
`,
    fullNotes: `
# Detailed Notes: Reliability Math

- **The Nines:**
  - 99% (Two Nines): ~7.2 hours of downtime per month. (Good for internal tools).
  - 99.9% (Three Nines): ~43 minutes of downtime per month. (Standard e-commerce).
  - 99.99% (Four Nines): ~4 minutes of downtime per month. (Mission critical).
  - 99.999% (Five Nines): ~26 seconds of downtime per month. (Aviation, pacemakers, telecom. Extremely expensive to maintain).
- **Defining "Availability":** Never use ping tests to define availability. If a user tries to checkout and gets a 500 Error, the system is unavailable to them, even if the server is responding to a ping. SLIs must be measured from the user's perspective (usually via Load Balancer metrics or client-side telemetry).
`,
    shortNotes: `
- SLI (Indicator): The actual math metric (Success / Total).
- SLO (Objective): The internal target (99.9%).
- SLA (Agreement): The legal contract (If we drop below 99%, we pay you).
- Error Budget: 100% - SLO. The amount of failure you are allowed to have.
- If the Error Budget is exhausted, feature development halts, and focus shifts to reliability.
- Measuring SLIs from the user's perspective is critical.
`,
    cheatSheet: `
### SLO Formula (The Good Events method)
\`SLI = (Good Events / Total Events) * 100\`

*Example:* In a 30-day window, you serve 1,000,000 requests. 
To maintain a 99.9% SLO, you must have 999,000 Good Events.
Your Error Budget is exactly 1,000 Bad Events.
`,
    interviewQuestions: [
      { question: 'What is an Error Budget, and how does it balance feature velocity with reliability?', answerHint: 'An error budget is the acceptable margin of failure defined by (100% - SLO). For example, a 99.9% SLO gives a 0.1% error budget. It acts as a control mechanism between product and engineering. If the budget is intact, teams can deploy rapidly and take risks. If the budget is depleted by outages, the agreement dictates that all feature work halts and the team focuses strictly on reliability and tech debt until the budget recovers.', type: 'CONCEPTUAL' },
      { question: 'Why must your internal SLO always be stricter than your external SLA?', answerHint: 'The SLA is a legal contract that carries financial penalties (refunds) if breached. The SLO is an internal engineering target. By setting the SLO stricter than the SLA (e.g. SLO at 99.99% and SLA at 99.9%), engineering teams will receive alerts and deplete their internal error budget, forcing a shift to reliability work well before the company actually breaches the SLA and loses money.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Google SRE Book: Service Level Objectives', url: 'https://sre.google/sre-book/service-level-objectives/', type: 'BOOK', priority: 'S', source: 'Google', isOfficial: true }
    ]
  }
};
