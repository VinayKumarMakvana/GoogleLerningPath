export const sd_10_arch = {
  ARCHITECTURE_PATTERNS: {
    title: 'Architecture Patterns',
    description: 'Compare Monoliths, Microservices, API Gateways, and Service Discovery.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['Load Balancing & Scalability', 'Messaging & Event-Driven Architecture'],
    learningContent: `
# Architecture Patterns

## Monolith
A unified software architecture where all components (UI, business logic, data access) are combined into a single program.
- *Pros:* Easy to develop, test, and deploy initially.
- *Cons:* Hard to scale independently (if only the video-processing part needs scaling, you have to scale the whole app). Codebase becomes tangled and hard for large teams to manage.

## Microservices
An architectural style that structures an application as a collection of loosely coupled, independently deployable services organized around business capabilities.
- *Pros:* Independent scaling, technology diversity (Service A in Python, Service B in Go), fault isolation.
- *Cons:* Massive operational complexity. Distributed transactions, network latency, observability, and debugging become very difficult.

## API Gateway
In a microservices architecture, clients shouldn't call 50 different internal services directly. An API Gateway sits in front of the services.
- Acts as a single entry point.
- Handles Authentication, Rate Limiting, and SSL Termination.
- Routes requests to the appropriate internal microservice.

## Service Discovery
Microservices are dynamic; they scale up and down, and their IPs change constantly. Service Discovery (like Consul or Zookeeper) acts as an internal phonebook. When Service A needs to call Service B, it asks the Service Discovery registry for Service B's current IP address.
`,
    fullNotes: `
# Detailed Notes: Architecture Patterns

- **Distributed Transactions:** In a monolith, saving an Order and updating Inventory happens in one ACID transaction. In microservices, they are different databases. We use patterns like **Saga Pattern** (a sequence of local transactions where each updates the DB and publishes a message to trigger the next step. If a step fails, compensating transactions run to undo the previous steps).
- **Two-Phase Commit (2PC):** A strict distributed transaction model, but highly unscalable because it locks resources across multiple databases until all confirm readiness. Avoid in modern systems.
`,
    shortNotes: `
- Monolith: Simple, single codebase, scales vertically or by cloning.
- Microservices: Complex, independent deployment, isolated faults.
- API Gateway: Single entry point, handles Auth/Rate Limiting.
- Service Discovery: The dynamic internal phonebook for microservice IPs.
- Saga Pattern: Handles transactions across multiple microservice databases.
`,
    cheatSheet: `
### Microservice Migration Rules
1. Never start with Microservices. Start with a Modular Monolith.
2. Only split a service when the team size or scaling requirements demand it.
3. Every microservice must have its own isolated database.
`,
    interviewQuestions: [
      { question: 'What is the role of an API Gateway in a microservices architecture?', answerHint: 'It acts as the single point of entry for all clients. It handles cross-cutting concerns like routing, authentication, SSL termination, rate limiting, and response caching, preventing every individual microservice from having to implement these.', type: 'TECHNICAL' },
      { question: 'How do you handle transactions across multiple databases in a microservices architecture?', answerHint: 'Using the Saga Pattern. Instead of a distributed ACID transaction (which doesn\'t scale), you execute a sequence of local transactions. If one step fails, the system executes compensating transactions to undo the previous steps (e.g., refunding the user).', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Microservices Pattern', url: 'https://microservices.io/', type: 'ARTICLE', priority: 'S', source: 'Microservices.io', isOfficial: true }
    ]
  }
};
