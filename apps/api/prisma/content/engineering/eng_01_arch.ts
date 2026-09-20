export const eng_01_arch = {
  SOFTWARE_ARCHITECTURE_PRINCIPLES: {
    title: 'Software Architecture & Design Principles',
    description: 'Master the fundamental principles of software design: SOLID, Coupling, Cohesion, and Abstraction Boundaries.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: [],
    learningContent: `
# Software Architecture & Design Principles

Software architecture is not about drawing diagrams; it is about managing complexity and making code resilient to change. The core of this discipline revolves around how components are coupled together.

## 1. Coupling and Cohesion
- **Coupling:** The degree of interdependence between software modules. If changing Module A requires changing Module B, they are tightly coupled. **Goal: Low Coupling.**
- **Cohesion:** The degree to which the elements inside a module belong together. If a \`UserService\` handles password hashing, sending emails, and connecting to the database, it has low cohesion (it's doing too many unrelated things). **Goal: High Cohesion.**

## 2. Abstraction Boundaries
An abstraction boundary hides the complex implementation details of a subsystem behind a simple interface.
If your business logic directly imports \`import { connect } from 'pg'\` (PostgreSQL), your business logic is bleeding across the database boundary. If you ever switch to MongoDB, you must rewrite your business logic. Instead, create an interface \`IUserRepository\` and inject it.

## 3. The SOLID Principles
Coined by Robert C. Martin (Uncle Bob), SOLID is the foundation of Object-Oriented design.
1. **S - Single Responsibility Principle (SRP):** A class should have one, and only one, reason to change. (High Cohesion).
2. **O - Open/Closed Principle (OCP):** Software entities should be open for extension, but closed for modification. (You should be able to add new features by writing *new* code, not by altering *existing* core code).
3. **L - Liskov Substitution Principle (LSP):** Objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program. (If a Duck swims, a RubberDuck subclass that throws an error when \`swim()\` is called violates LSP).
4. **I - Interface Segregation Principle (ISP):** Many client-specific interfaces are better than one general-purpose interface. Do not force classes to implement methods they do not use.
5. **D - Dependency Inversion Principle (DIP):** High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces).
`,
    fullNotes: `
# Detailed Notes: Design Principles

- **Composition over Inheritance:** A deeply nested inheritance tree (\`Animal\` -> \`Mammal\` -> \`Dog\` -> \`Poodle\`) creates tight coupling. If you change \`Animal\`, you break \`Poodle\`. Composition achieves reuse by composing objects together (A \`Car\` *has an* \`Engine\`, rather than a \`Car\` *is a* \`Vehicle\`). It is vastly more flexible and is the preferred pattern in modern software engineering (especially in languages like Go and Rust which heavily favor composition).
- **YAGNI (You Aren't Gonna Need It):** Do not build complex, highly abstracted, hyper-extensible architectures for features you *think* you might need in the future. Build the simplest thing that solves today's problem, but build it cleanly so it can be refactored easily later.
`,
    shortNotes: `
- Low Coupling: Modules should not rely heavily on each other's internal details.
- High Cohesion: Everything inside a module should be closely related to a single purpose.
- SOLID principles are the bedrock of maintainable OOP code.
- Prefer Composition (Has-A) over Inheritance (Is-A) to prevent fragile base classes.
- YAGNI: Don't over-engineer for the future.
- Dependency Inversion (DIP) protects high-level business rules from low-level database/UI changes.
`,
    cheatSheet: `
### SOLID Quick Reference
- **SRP:** One reason to change.
- **OCP:** Extend via plugins/subclasses, don't modify existing core code.
- **LSP:** Subclasses must behave exactly like their parents.
- **ISP:** Don't force clients to depend on fat interfaces. Split them up.
- **DIP:** Depend on Interfaces, not concrete classes.
`,
    interviewQuestions: [
      { question: 'Explain the Dependency Inversion Principle (DIP) and provide a practical example.', answerHint: 'DIP states that high-level policy code should not depend on low-level detail code; both should depend on abstractions. For example, a UserAuthService (high-level) should not directly instantiate a PostgresDatabase (low-level). Instead, it should depend on an IDatabase interface. At runtime, a dependency injection container passes the PostgresDatabase instance into the UserAuthService. This allows you to swap out Postgres for a mock database during unit testing without touching the UserAuthService code.', type: 'TECHNICAL' },
      { question: 'Why is "Composition over Inheritance" considered a best practice in modern software design?', answerHint: 'Inheritance creates the tightest form of coupling available in OOP. A subclass is intimately tied to the implementation of its parent. This leads to the Fragile Base Class problem, where a change in a parent class inadvertently breaks subclasses. Composition (where a class is composed of one or more instances of other classes to gain their behavior) provides much looser coupling, making it easier to change behaviors at runtime and test components in isolation.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Clean Architecture (Book) - SOLID Principles', url: 'https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html', type: 'ARTICLE', priority: 'S', source: 'Robert C. Martin', isOfficial: false }
    ]
  }
};
