export const eng_13_production = {
  PRODUCTION_OWNERSHIP: {
    title: 'Production Engineering Practices',
    description: 'Transition from "writing code" to "owning systems". Learn tradeoffs, tech debt management, and operational readiness.',
    difficulty: 'EXPERT',
    estimatedLearnTime: 45,
    prerequisites: ['Technical Documentation & Engineering Communication', 'Performance Engineering'],
    learningContent: `
# Production Engineering Practices

A junior engineer thinks their job is done when their PR is merged. A senior engineer knows their job *begins* when the PR is merged. 
Production Ownership is the mindset that you are responsible for how your code behaves in the real world.

## 1. Technical Debt Management
Technical debt is not inherently evil. Taking on tech debt is like taking a financial loan to start a business—it allows you to ship a feature 2 months early to capture market share. 
- **The Danger:** If you never pay down the principal, the "interest" (the time it takes to add new features to a messy codebase) eventually bankrupts the engineering team.
- **The Solution:** Allocate a strict percentage of every sprint (e.g., 20%) to refactoring and paying down tech debt. Do not ask product managers for permission to do this; it is a non-negotiable engineering requirement.

## 2. Engineering Tradeoffs
Every technical decision is a tradeoff. 
- *Should we use Microservices or a Monolith?* Microservices give you independent deployments (good), but introduce distributed tracing nightmares and network latency (bad).
- *Should we use NoSQL or SQL?* NoSQL gives you schema flexibility and horizontal scale (good), but you lose ACID transaction safety and complex JOINs (bad).
A senior engineer never says "X is better than Y." They say, "In our specific context, the tradeoffs of X are more acceptable than the tradeoffs of Y."

## 3. Operational Readiness Reviews (ORR)
Before a major new service goes live, the team conducts an ORR. A checklist ensuring the service won't explode on day one:
1. Are there alerts configured for p99 latency?
2. Is there a Runbook for when the database fails?
3. Have we load-tested it to 150% of expected traffic?
4. How do we roll back if deployment fails?
If the ORR fails, the launch is delayed.

## 4. The 10x Engineer Myth
The industry myth of the "10x Engineer" who works alone in a dark room, writes thousands of lines of complex code, and saves the company. 
In reality, these engineers are a liability. They create massive bus factors and unmaintainable architectures. True "10x Engineering" comes from **Force Multipliers**: an engineer who improves the CI pipeline, mentors 5 juniors, writes excellent documentation, and raises the productivity of the entire team by 2x.
`,
    fullNotes: `
# Detailed Notes: Production Ownership

- **You Build It, You Run It:** Historically, developers threw code over the wall to the QA/Ops team, who had to deploy and maintain it. Amazon revolutionized this with "You build it, you run it." The developers who write the code are the ones carrying the pager at 3 AM when it breaks. This instantly aligns incentives: developers stop writing fragile code because they don't want to be woken up.
- **Failures are Systemic:** When an outage happens, it is never a "human error." If a developer drops a production database, the failure is that the system *allowed* a developer to have drop permissions on production without a two-person approval process.
`,
    shortNotes: `
- Production Ownership: You are responsible for your code after it merges.
- Technical Debt is a tool to move fast, but you must pay the interest continuously (20% of sprint time).
- Every architectural decision is a tradeoff. Nothing is perfect.
- Operational Readiness Reviews (ORR) ensure a service is actually safe to launch.
- A true 10x engineer acts as a force multiplier for the team via mentoring and tooling.
- "You build it, you run it" aligns developer incentives with system stability.
`,
    cheatSheet: `
### The Tradeoff Triangle
You can only pick two:
1. **Good** (High Quality / Features)
2. **Fast** (Quick Time to Market)
3. **Cheap** (Low Engineering Cost)
`,
    interviewQuestions: [
      { question: 'What is Technical Debt, and how should a healthy engineering team manage it?', answerHint: 'Technical debt is the implied cost of additional rework caused by choosing an easy, fast solution now instead of using a better approach that would take longer. It is a useful tool to hit market deadlines, but if left unpaid, the "interest" slows development to a crawl. A healthy team manages it by treating tech debt as a first-class citizen, allocating a dedicated percentage of every sprint (e.g., 20%) to refactoring and paying down the debt, rather than relying on massive, risky "rewrite" projects.', type: 'CONCEPTUAL' },
      { question: 'How do you evaluate whether to build a new feature as a Microservice or add it to the existing Monolith?', answerHint: 'I evaluate the tradeoffs based on the team size and scaling needs. A Monolith is easier to deploy, test, and trace, but can become a bottleneck if dozens of developers are stepping on each other\'s toes. A Microservice allows for independent deployments and language flexibility, but introduces distributed system complexities (network partitions, eventual consistency, distributed tracing). Unless the team is large enough to need independent release cycles, or the specific feature has radically different scaling/hardware needs, I default to a modular Monolith to avoid the operational overhead of microservices.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'The Mythical Man-Month', url: 'https://en.wikipedia.org/wiki/The_Mythical_Man-Month', type: 'BOOK', priority: 'S', source: 'Fred Brooks', isOfficial: false }
    ]
  }
};
