export const eng_04_testing = {
  ADVANCED_TESTING: {
    title: 'Advanced Testing Engineering',
    description: 'Master the Test Pyramid, Mocks vs Stubs, Test-Driven Development (TDD), and Mutation Testing.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 60,
    prerequisites: ['Clean Architecture & Maintainable Systems'],
    learningContent: `
# Advanced Testing Engineering

"Legacy code is simply code without tests." - Michael Feathers.

## 1. The Test Pyramid
A strategy for balancing types of tests to optimize for both confidence and execution speed.
- **Unit Tests (Base):** Fast, isolated tests covering single functions/classes. Should make up 70%+ of your suite. Execution time: milliseconds.
- **Integration Tests (Middle):** Tests how components work together (e.g., testing the application against a real Dockerized Postgres database). Slower, but catches contract mismatches.
- **End-to-End / E2E Tests (Top):** Tests the entire system from the UI down to the database using browser automation (Cypress/Playwright). Extremely slow, highly brittle, but provides the most business confidence. Keep these to a minimum (core critical paths only).

## 2. Test Doubles (Mocks, Stubs, Fakes, Spies)
When unit testing, you must isolate the code from external dependencies (like APIs or databases). You do this using Test Doubles.
- **Dummy:** Objects passed around but never actually used (just to satisfy parameters).
- **Stub:** Returns a hardcoded, canned answer to a specific call. (e.g., \`when(api.getUser()).thenReturn({name: "Bob"})\`).
- **Spy:** A stub that also records how it was called. (e.g., \`expect(emailService.send).toHaveBeenCalledWith("bob@test.com")\`).
- **Mock:** A spy with pre-programmed expectations that throws an error if those expectations are not met.
- **Fake:** A fully working implementation, but taking shortcuts. (e.g., An In-Memory database using an array instead of SQL).

## 3. Test-Driven Development (TDD)
The Red-Green-Refactor cycle.
1. **Red:** Write a failing test for a feature you haven't written yet.
2. **Green:** Write the ugliest, fastest code possible to make the test pass.
3. **Refactor:** Clean up the code, knowing the test guarantees you didn't break the logic.
*Benefit:* TDD forces your code to be highly decoupled and testable by design, because you are acting as the first consumer of your API.

## 4. Mutation Testing
Code Coverage (e.g., 85% coverage) only tells you what lines of code were *executed* during tests. It does NOT guarantee those tests actually contain \`expect()\` assertions. 
**Mutation Testing** automatically changes your source code (e.g., changing \`>\` to \`<\` or \`+\` to \`-\`) and runs your test suite. If the tests still pass, your tests are weak (a "surviving mutant"). If the tests fail, your tests successfully caught the bug (the mutant was "killed").
`,
    fullNotes: `
# Detailed Notes: Testing

- **Flaky Tests:** A test that passes sometimes and fails sometimes without code changes. Flaky tests destroy developer trust. If a test is flaky, you must either fix it immediately or delete it. Common causes: reliance on network calls, reliance on system time/dates, and asynchronous race conditions.
- **Test Data Builders:** Instead of hardcoding massive JSON objects in every test, use the Builder pattern (e.g., \`new UserBuilder().withAdminRights().build()\`). This makes tests much more readable and insulates them against schema changes.
`,
    shortNotes: `
- Test Pyramid: Lots of Unit Tests (fast), some Integration Tests, very few E2E Tests (slow/brittle).
- Stub: Returns canned data.
- Spy: Verifies if a method was called.
- Fake: A lightweight, working implementation (In-Memory DB).
- TDD: Red (fail), Green (pass), Refactor (clean). Forces decoupled design.
- Mutation Testing: Edits your code automatically to see if your tests are actually capable of catching bugs.
- Flaky tests destroy engineering culture. Delete or fix them immediately.
`,
    cheatSheet: `
### Mocks vs Stubs (State vs Behavior)
- **State Verification (Stubs/Fakes):** You test the final state of the system. (e.g., After calling \`register()\`, does the DB contain 1 user?). Preferred.
- **Behavior Verification (Mocks/Spies):** You test the interactions. (e.g., After calling \`register()\`, was \`db.insert()\` called exactly once?). Can lead to brittle tests that break upon refactoring.
`,
    interviewQuestions: [
      { question: 'What is the Test Pyramid, and why is it structured that way?', answerHint: 'The Test Pyramid is a metaphor for how to balance automated testing. The wide base consists of Unit tests, which are extremely fast and cheap to write, allowing for high coverage. The middle layer is Integration tests, checking boundaries and databases. The narrow peak is End-to-End (E2E) UI tests. E2E tests are brittle, incredibly slow, and hard to maintain. If a team has an inverted pyramid (mostly E2E tests), their CI pipeline will take hours and constantly fail due to UI flakiness.', type: 'CONCEPTUAL' },
      { question: 'What is the difference between Code Coverage and Mutation Testing?', answerHint: 'Code coverage simply measures whether a line of code was executed while the test suite was running; it does not guarantee that the test actually asserted the correctness of the output. Mutation testing actively modifies the source code (e.g., changing a + to a -, or removing a function call) and runs the test suite. If the test suite still passes despite the broken code, it proves the tests are ineffective. Mutation testing measures the actual quality and strictness of the tests.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'The Practical Test Pyramid', url: 'https://martinfowler.com/articles/practical-test-pyramid.html', type: 'ARTICLE', priority: 'S', source: 'Martin Fowler', isOfficial: true }
    ]
  }
};
