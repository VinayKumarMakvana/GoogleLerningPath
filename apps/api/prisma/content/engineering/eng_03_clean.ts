export const eng_03_clean = {
  CLEAN_ARCHITECTURE: {
    title: 'Clean Architecture & Maintainable Systems',
    description: 'Learn Ports and Adapters, Hexagonal Architecture, and how to build systems that survive for a decade.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 60,
    prerequisites: ['Advanced OOP & Design Patterns'],
    learningContent: `
# Clean Architecture

A framework (like NestJS, Spring Boot, or Django) is a detail. A database (like Postgres or MongoDB) is a detail. If your core business logic is tightly intertwined with these details, your application has an expiration date.

**Clean Architecture** (also known as Hexagonal Architecture or Ports & Adapters) is a methodology for decoupling your business rules from external technologies.

## The Dependency Rule
*Source code dependencies must point only inward, toward the core business logic.*

### 1. The Core (Entities & Use Cases)
- **Entities (Domain):** Pure business objects. If you are building a banking app, this is the \`Account\` class and the \`transferFunds()\` logic. *This layer knows nothing about the web, the database, or JSON.*
- **Use Cases (Application Logic):** The orchestrator. It fetches an \`Account\` from a database interface, calls \`transferFunds()\`, and saves it back. 

### 2. The Boundaries (Ports)
The Core defines **Interfaces (Ports)** for everything it needs from the outside world. 
- It defines an \`IUserRepository\` (an outward-facing port).
- It does NOT implement it.

### 3. The Outer Layers (Adapters & Infrastructure)
The outer layers contain the dirty details.
- **Adapters:** A \`PostgresUserRepository\` implements the \`IUserRepository\` port. It translates SQL data into the pure \`Entity\` required by the Core.
- **Controllers (Inward Adapters):** An Express.js or Nest.js controller receives an HTTP JSON request, translates it, and calls the pure Use Case.

## The Result
By adhering to this, you can:
1. Run all your core business logic tests in milliseconds without spinning up a database or a web server (by injecting in-memory mock adapters).
2. Swap out Express.js for a gRPC server, or Postgres for MongoDB, without touching a single line of your Core business logic.
`,
    fullNotes: `
# Detailed Notes: Clean Architecture

- **Screaming Architecture:** Uncle Bob argues that when you look at the root directory of a project, it should "scream" what the application does, not what framework it uses. If you see folders named \`controllers/\`, \`models/\`, \`views/\`, the architecture screams "Ruby on Rails" or "Express". If you see folders named \`billing/\`, \`inventory/\`, \`shipping/\`, the architecture screams "E-Commerce System".
- **The Cost of Abstraction:** Clean architecture requires writing significantly more boilerplate (Interfaces, DTOs, Mappers). For a quick MVP or a 2-month prototype, it is massive overkill. It is designed for enterprise systems that must be maintained and extended by dozens of developers over 5 to 10 years.
`,
    shortNotes: `
- Clean Architecture separates business logic (Core) from implementation details (DB, Web Framework).
- Dependencies must always point inward toward the Core.
- The Core defines Interfaces (Ports).
- The Infrastructure layer implements those Interfaces (Adapters).
- Enables blazing fast, completely isolated Unit Tests for business rules.
- "Screaming Architecture": Folder structures should reflect the business domain, not the framework.
`,
    cheatSheet: `
### Clean Architecture Layers (Outer to Inner)
4. **Frameworks & Drivers:** UI, Web Framework, DB, External APIs.
3. **Interface Adapters:** Controllers, Presenters, Gateways.
2. **Application Business Rules:** Use Cases (Interactors).
1. **Enterprise Business Rules:** Entities (Core Domain).
`,
    interviewQuestions: [
      { question: 'Explain the "Dependency Rule" in Clean Architecture.', answerHint: 'The Dependency Rule states that source code dependencies can only point inward. Inner circles containing business rules and entities must know absolutely nothing about outer circles containing frameworks, databases, or UI. Outer layers interact with inner layers by passing data through strictly defined boundaries (interfaces/ports) defined by the inner layer.', type: 'CONCEPTUAL' },
      { question: 'What is the primary benefit of the Ports and Adapters (Hexagonal) architecture when it comes to testing?', answerHint: 'It allows the core application logic to be tested in complete isolation from external dependencies. Because the core logic relies entirely on interface "Ports" (like an IDatabase interface) rather than concrete implementations, you can easily inject an in-memory "Mock Adapter" during unit testing. This makes tests incredibly fast and deterministic, as they don\'t require spinning up actual databases or web servers.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'The Clean Architecture', url: 'https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html', type: 'ARTICLE', priority: 'S', source: 'Robert C. Martin', isOfficial: true }
    ]
  }
};
