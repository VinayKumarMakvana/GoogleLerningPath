export const be_12_nestjs = {
  NESTJS_FUNDAMENTALS: {
    title: 'NestJS Fundamentals',
    description: 'Learn the modern, opinionated framework for building scalable enterprise Node.js applications.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 180,
    prerequisites: ['Clean Backend Architecture', 'TypeScript Fundamentals'],
    learningContent: `
# NestJS Fundamentals

NestJS is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript, and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

Under the hood, Nest makes use of robust HTTP Server frameworks like Express (the default) and optionally can be configured to use Fastify.

## Core Concepts
1. **Modules:** The fundamental building block. Every application has at least one root module. Modules organize code into cohesive blocks.
2. **Controllers:** Responsible for handling incoming requests and returning responses to the client. (Routing).
3. **Providers (Services):** Many basic Nest classes may be treated as a provider – services, repositories, factories, helpers, etc. The main idea of a provider is that it can be injected as a dependency.
4. **Dependency Injection (DI):** Nest has a powerful built-in DI container.
`,
    fullNotes: `
# Detailed Notes: NestJS

- **Decorators:** Nest relies heavily on TS Decorators (e.g., \`@Controller()\`, \`@Injectable()\`, \`@Get()\`). They attach metadata to classes/methods, telling Nest how to wire the application.
- **Pipes:** Used for validation and transformation (e.g., converting a string path parameter to an integer, or validating a request body against a DTO using \`class-validator\`).
- **Guards:** Determine whether a given request will be handled by the route handler or not, depending on certain conditions (like permissions, roles, ACLs) present at run-time. Perfect for Authentication/Authorization.
- **Interceptors:** Bind extra logic before / after method execution, transform the result, or handle errors.
`,
    shortNotes: `
- Highly opinionated, TypeScript-first framework.
- Built on top of Express (or Fastify).
- Enforces Clean Architecture out-of-the-box via Modules, Controllers, and Services.
- Heavily uses Decorators.
- Uses built-in Dependency Injection container.
- Pipes (Validation), Guards (AuthZ), Interceptors (Transform).
`,
    cheatSheet: `
\`\`\`typescript
import { Controller, Get, Post, Body, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string { return 'Hello World!'; }
}

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
\`\`\`
`,
    interviewQuestions: [
      { question: 'What problem does NestJS solve compared to plain Express?', answerHint: 'Express is unopinionated, leading to inconsistent architectures across teams. NestJS provides a highly opinionated, scalable, and structured architecture out-of-the-box using TypeScript, Dependency Injection, and Modules.', type: 'CONCEPTUAL' },
      { question: 'What is a Guard in NestJS?', answerHint: 'A Guard is a class annotated with @Injectable() that implements the CanActivate interface. It is executed before route handlers and is used to determine if a request should proceed, typically for authorization.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'NestJS Official Documentation', url: 'https://docs.nestjs.com/', type: 'ARTICLE', priority: 'S', source: 'NestJS Docs', isOfficial: true },
      { title: 'NestJS Crash Course', url: 'https://www.youtube.com/watch?v=GHTA143_b-s', type: 'VIDEO', priority: 'A', source: 'Traversy Media', isOfficial: false }
    ]
  }
};
