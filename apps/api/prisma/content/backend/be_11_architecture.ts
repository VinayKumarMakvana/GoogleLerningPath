export const be_11_architecture = {
  CLEAN_ARCHITECTURE: {
    title: 'Clean Backend Architecture',
    description: 'Learn how to structure enterprise Node.js applications using layered architecture.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 120,
    prerequisites: ['REST API Principles'],
    learningContent: `
# Clean Backend Architecture

When building small apps, putting database queries inside your Express routes is fine. For large enterprise applications, this creates a tangled, unmaintainable mess.

## Separation of Concerns (Layered Architecture)
The goal is to separate the code into layers, where each layer has a specific responsibility and only depends on the layers below it.

1. **Controllers (Presentation Layer):** Deals only with HTTP. Parses req, calls a Service, formats res. Knows nothing about the database.
2. **Services (Business Logic Layer):** Contains the core business rules. Doesn't know about HTTP (req/res) or specific database SQL.
3. **Data Access / Repository Layer:** Deals strictly with the database. Executes SQL/Prisma queries.
`,
    fullNotes: `
# Detailed Notes: Clean Architecture

- **Dependency Rule:** Source code dependencies must point only inward, toward higher-level policies (business logic). The Service layer should not import Express.
- **Dependency Injection (DI):** Instead of a Service instantiating its own Repository (tight coupling), the Repository is passed (injected) into the Service. This makes the Service easily testable by passing a Mock Repository.
- **DTOs (Data Transfer Objects):** Objects used to encapsulate data and send it from one layer to another, ensuring that internal DB models aren't leaked directly to the client.
`,
    shortNotes: `
- Never put business logic in Controllers.
- Controllers handle HTTP (req, res).
- Services handle business rules.
- Repositories handle Database queries.
- Keep the Service layer framework-agnostic.
- Use Dependency Injection to make testing easier.
`,
    cheatSheet: `
\`\`\`javascript
// Controller
class UserController {
  constructor(userService) { this.userService = userService; }
  async createUser(req, res) {
    const user = await this.userService.createUser(req.body);
    res.json(user);
  }
}

// Service
class UserService {
  constructor(userRepository) { this.userRepository = userRepository; }
  async createUser(data) {
    if (!data.email) throw new Error('Email required');
    return this.userRepository.save(data);
  }
}
\`\`\`
`,
    interviewQuestions: [
      { question: 'Why shouldn\'t you put database queries in your route controllers?', answerHint: 'It tightly couples HTTP logic with data access logic, making it impossible to reuse the logic (e.g., in a CLI or cron job) and extremely difficult to unit test.', type: 'CONCEPTUAL' },
      { question: 'What is Dependency Injection?', answerHint: 'A design pattern where an object receives its dependencies from the outside rather than creating them itself. It promotes loose coupling and vastly improves testability.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Node.js Best Practices', url: 'https://github.com/goldbergyoni/nodebestpractices', type: 'ARTICLE', priority: 'S', source: 'GitHub', isOfficial: false },
      { title: 'Clean Architecture in Node.js', url: 'https://www.youtube.com/watch?v=CnailTcJV_U', type: 'VIDEO', priority: 'A', source: 'YouTube', isOfficial: false }
    ]
  }
};
