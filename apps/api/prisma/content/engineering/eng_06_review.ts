export const eng_06_review = {
  CODE_REVIEW_STANDARDS: {
    title: 'Code Review & Engineering Standards',
    description: 'The human element of engineering. Learn how to conduct empathetic, effective code reviews and define Team Conventions.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 45,
    prerequisites: ['Code Quality & Static Analysis'],
    learningContent: `
# Code Review & Engineering Standards

Code Reviews (Pull Requests / Merge Requests) are the primary mechanism for maintaining codebase quality, spreading knowledge, and preventing bugs. However, toxic code review cultures are the #1 reason developers quit.

## 1. The Purpose of Code Review
- **Catching Bugs:** (Secondary). Linters and Unit Tests should catch most bugs before a human ever looks at the code.
- **Knowledge Sharing:** (Primary). If only one developer knows how the payment system works, you have a Bus Factor of 1. Code review forces a second developer to understand the logic.
- **Enforcing Standards:** Ensuring the code fits the architectural vision of the project.

## 2. Automate the Pedantry
A human should *never* leave a comment saying "You missed a semicolon" or "Use single quotes here."
If a stylistic rule is important, it must be codified in a Linter or Formatter, and the CI pipeline should reject the PR automatically. Humans should only review *logic, architecture, and business requirements*.

## 3. Empathetic Communication
Code review is a critique of the code, not the person.
- **Bad:** "Why did you do this? This is terribly inefficient."
- **Good:** "I noticed this loops over the array twice. Could we optimize this by using a Map to reduce it to a single pass?"
- **Ask, Don't Tell:** Phrase suggestions as questions. It opens a dialogue rather than issuing a command.

## 4. PR Size (The 400-Line Rule)
A review of a 10-line PR will result in 5 comments about architecture and edge cases.
A review of a 1,500-line PR will result in a single comment: *"Looks good to me" (LGTM)*.
Human brains cannot process massive context switches. PRs must be small and focused on a single logical change.
`,
    fullNotes: `
# Detailed Notes: Code Review

- **Nitpicks (Nits):** Sometimes you see a variable name that is slightly confusing, but it doesn't break the code. You can prefix your comment with \`Nit:\` (e.g., "Nit: maybe rename 'data' to 'userData'"). This signals to the author: "This is a minor suggestion, feel free to ignore it if you're in a hurry; I won't block the merge over this."
- **Draft PRs:** Encourage developers to open Draft PRs early in the development cycle. It allows senior engineers to review the *approach* and *architecture* before the developer spends 3 days writing tests for a fundamentally flawed design.
`,
    shortNotes: `
- Code review is primarily for knowledge sharing, not just bug catching.
- Never argue over syntax formatting; use Prettier/Linters to automate it.
- PRs must be small. Massive PRs get rubber-stamped with "LGTM" because humans give up.
- Communicate empathetically: Critique the code, not the author. Phrase suggestions as questions.
- Use 'Nit:' for non-blocking stylistic suggestions.
- Use Draft PRs to get architectural feedback early.
`,
    cheatSheet: `
### Code Review Checklist for Reviewers
1. Does this code solve the business requirement?
2. Are there sufficient Unit/Integration tests?
3. Does it handle edge cases and null values?
4. Are the variable names descriptive?
5. Does this introduce tight coupling or violate SOLID?
`,
    interviewQuestions: [
      { question: 'Why is it a best practice to keep Pull Requests small, and what happens when they are too large?', answerHint: 'Small PRs reduce cognitive load for the reviewer, leading to thorough, high-quality feedback. When a PR is massive (e.g., 2,000 lines), reviewers experience fatigue and often just skim the code, rubber-stamping it with "Looks Good To Me" (LGTM) without actually verifying the logic, which allows severe bugs and architectural flaws to slip into production.', type: 'CONCEPTUAL' },
      { question: 'During a code review, you notice the author used inconsistent indentation and double quotes instead of single quotes. How should you address this?', answerHint: 'I should not leave a comment about it. Instead, I should configure an automated Formatter (like Prettier) and a Linter (like ESLint), integrate them into a Git pre-commit hook or the CI/CD pipeline, and let the machines enforce syntax rules. Human review time is expensive and should be strictly reserved for evaluating business logic, architecture, and testing.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Google Engineering Practices Documentation: How to do a code review', url: 'https://google.github.io/eng-practices/review/reviewer/', type: 'ARTICLE', priority: 'S', source: 'Google', isOfficial: true }
    ]
  }
};
