export const eng_05_quality = {
  CODE_QUALITY_STATIC_ANALYSIS: {
    title: 'Code Quality & Static Analysis',
    description: 'Enforce quality automatically using Linters, Formatters, Type Systems, and detecting Code Smells.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 45,
    prerequisites: [],
    learningContent: `
# Code Quality & Static Analysis

Human beings are terrible at catching syntax errors, missing semicolons, and subtle memory leaks during Code Review. **Static Analysis** tools read your source code without executing it, finding bugs automatically.

## 1. Formatters vs Linters
- **Formatters (e.g., Prettier, \`gofmt\`):** These tools only care about the *visual appearance* of the code. They enforce line length, spacing, tabs vs spaces, and bracket placement. They end debates over style.
- **Linters (e.g., ESLint, SonarQube, Pylint):** These tools care about *logic and safety*. A linter will throw an error if you declare a variable but never use it, if you use a deprecated API, or if you write an infinite loop. 

## 2. Type Systems (Static vs Dynamic)
Languages like JavaScript and Python are dynamically typed. Errors (like calling \`.toUpperCase()\` on a number) are only caught at *runtime* (when the user clicks a button and the app crashes).
Using a Static Type System (TypeScript, Rust, Java) acts as the ultimate static analysis tool. It proves mathematically that certain classes of errors cannot exist before the code is even compiled.

## 3. Code Smells
Coined by Martin Fowler, a "Code Smell" is a surface indication that usually corresponds to a deeper problem in the system. Static analysis tools (like SonarQube) can detect these automatically:
- **God Class:** A single class (e.g., \`SystemManager\`) that has 5,000 lines of code and handles everything from UI to database connections. Violates the Single Responsibility Principle.
- **Long Method:** A function that spans hundreds of lines. Hard to test, hard to read.
- **Duplicated Code:** Copy-pasting the same logic in 5 places. If a bug is found, you have to remember to fix it in 5 places (Violates the DRY principle - Don't Repeat Yourself).
- **Deep Nesting (Arrow Code):** \`if() { if() { for() { if() { ... } } } }\`. Makes cyclomatic complexity explode. Fix it using "Guard Clauses" (returning early).

## 4. Cyclomatic Complexity
A software metric used to indicate the complexity of a program. It measures the number of linearly independent paths through a source code.
If a function has 10 \`if/else\` statements, its cyclomatic complexity is very high. It means you must write at least 10 different Unit Tests just to cover all the possible paths of execution. High complexity code is unmaintainable.
`,
    fullNotes: `
# Detailed Notes: Code Quality

- **The Broken Window Theory:** Applied to software, it states that if a codebase has "broken windows" (messy code, disabled linters, failing tests), developers will subliminally feel it is acceptable to write more messy code. Enforcing strict CI pipelines prevents the first broken window.
- **Pre-commit Hooks (Husky):** To prevent bad code from ever leaving a developer's laptop, teams use Git pre-commit hooks. When a developer types \`git commit\`, a script runs the Linter and Formatter automatically. If the linter fails, the commit is aborted.
`,
    shortNotes: `
- Formatters (Prettier) fix style (spaces, tabs).
- Linters (ESLint) catch logical errors (unused variables, bad practices).
- Static Typing catches type mismatches before runtime.
- Code Smells (God Class, Duplicated Code) indicate deeper architectural flaws.
- Cyclomatic Complexity measures how many execution paths exist in a function. Lower is better.
- Use Pre-commit hooks to block unformatted/lint-failing code from being committed.
`,
    cheatSheet: `
### Refactoring Arrow Code (Guard Clauses)
**Bad:**
\`\`\`javascript
function process(user) {
  if (user != null) {
    if (user.isActive) {
      // 50 lines of logic
    }
  }
}
\`\`\`
**Good (Guard Clauses):**
\`\`\`javascript
function process(user) {
  if (user == null) return;
  if (!user.isActive) return;
  // 50 lines of logic without nesting
}
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is the difference between a Formatter and a Linter?', answerHint: 'A formatter (like Prettier) is strictly concerned with syntax styling—spaces, line breaks, and quotes—ensuring a unified visual style across a team. It does not check logic. A linter (like ESLint) performs static analysis to find logical errors, anti-patterns, and potential bugs, such as unused variables, unreachable code, or unsafe type coercions.', type: 'TECHNICAL' },
      { question: 'What is Cyclomatic Complexity, and why should it be kept low?', answerHint: 'Cyclomatic complexity is a metric that counts the number of independent execution paths through a block of code (usually driven by if/else, switch statements, and loops). High complexity means the function is doing too many things, making it incredibly hard for a human to read. Furthermore, a function with a complexity of 20 requires at least 20 distinct unit tests to achieve full branch coverage, making testing a nightmare.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'CodeSmells - Martin Fowler', url: 'https://martinfowler.com/bliki/CodeSmell.html', type: 'ARTICLE', priority: 'S', source: 'Martin Fowler', isOfficial: false }
    ]
  }
};
