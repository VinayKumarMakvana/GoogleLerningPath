export const eng_12_docs = {
  TECHNICAL_DOCUMENTATION: {
    title: 'Technical Documentation & Engineering Communication',
    description: 'Learn to write Architecture Decision Records (ADRs), Engineering RFCs, and maintainable documentation.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 45,
    prerequisites: ['Code Review & Engineering Standards'],
    learningContent: `
# Technical Documentation & Communication

Code tells you *what* the system does. Documentation tells you *why* the system does it. A senior engineer spends as much time writing prose as they do writing code.

## 1. Architecture Decision Records (ADRs)
If you join a company and see they are using MongoDB for highly relational financial data, your first thought might be "These previous engineers were idiots." 
An **ADR** prevents this. An ADR is a short markdown file committed to the repository that captures a significant architectural decision.
- **Context:** "In 2018, we needed to rapidly ingest unstructured JSON logs."
- **Decision:** "We chose MongoDB because Postgres JSONB performance was poor in that version."
- **Consequences:** "We lose relational integrity, but gain write speed."
By reading the ADR, you now understand the context of the decision at the time it was made.

## 2. Engineering RFCs (Request for Comments)
Before you spend 3 weeks rewriting the authentication system, you write an RFC. 
An RFC is a design document outlining your proposed architecture, the problem it solves, and the alternatives you considered. You share it with the engineering team. They leave comments, point out security flaws you missed, and challenge your assumptions. You achieve consensus *before* writing any code.

## 3. The README and Runbooks
- **The README:** The entry point for a new hire. It should take a developer from \`git clone\` to a running local environment in less than 5 minutes. If it takes 2 days to set up a dev environment, your README is failing.
- **Runbooks:** Explicit, step-by-step instructions on how to handle production outages. "If Alert X fires, check Dashboard Y, run Script Z."

## 4. Documentation as Code
Documentation should not live in a dusty Confluence page that no one has updated since 2019. It should live as Markdown files in the same Git repository as the code.
- When a developer updates an API, they update the Markdown file in the *same Pull Request*. If the PR doesn't include the doc update, it is rejected.
`,
    fullNotes: `
# Detailed Notes: Documentation

- **Self-Documenting Code is a Myth:** "My code is so clean it doesn't need comments" is a dangerous fallacy. Clean code removes the need for comments explaining *what* the code is doing (e.g., \`// loop over users\`). But no amount of clean code can explain *business context* (e.g., \`// We divide by 1.2 here because of a specific tax loophole in France, per legal requirement #492\`). That requires a comment.
- **API Documentation (Swagger/OpenAPI):** Never write API documentation manually in a wiki. Use tools like Swagger to auto-generate interactive documentation directly from your code's type definitions. If the code changes, the documentation updates automatically.
`,
    shortNotes: `
- ADRs record the "Why" behind major architectural choices for future developers.
- RFCs (Request for Comments) are design docs written to gather feedback *before* coding starts.
- Documentation should live in Git alongside the code (Docs as Code).
- Code explains the 'What'. Comments explain the 'Why'.
- Auto-generate API documentation (Swagger) to prevent it from going stale.
- A good README gets a new developer running locally in 5 minutes.
`,
    cheatSheet: `
### Standard ADR Structure
1. **Title:** Use MongoDB for Logging
2. **Status:** Proposed / Accepted / Deprecated
3. **Context:** The problem we are facing.
4. **Decision:** The solution we chose.
5. **Consequences:** The tradeoffs we accepted.
`,
    interviewQuestions: [
      { question: 'What is an Architecture Decision Record (ADR), and why is it valuable to an engineering team?', answerHint: 'An ADR is a short, immutable document stored in version control alongside the codebase that captures a specific architectural decision, the context in which it was made, and the consequences of that choice. It is valuable because it preserves institutional knowledge; when new engineers join years later, they can read the ADR to understand *why* a seemingly strange technology was chosen based on historical constraints, preventing them from blindly tearing it out or repeating past mistakes.', type: 'CONCEPTUAL' },
      { question: 'Explain the concept of "Engineering RFCs" (Request for Comments).', answerHint: 'An RFC is a technical design document written by an engineer before they begin implementing a massive feature or architectural change. It outlines the problem, the proposed solution, and alternative approaches. The document is circulated to the wider engineering team for review and debate. It ensures that security flaws, edge cases, and architectural disagreements are resolved on paper, which is vastly cheaper and faster than discovering them during a code review after weeks of coding.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Documenting Architecture Decisions', url: 'https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions', type: 'ARTICLE', priority: 'S', source: 'Michael Nygard', isOfficial: false }
    ]
  }
};
