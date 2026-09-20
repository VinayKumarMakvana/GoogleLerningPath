export const eng_02_oop = {
  ADVANCED_OOP_PATTERNS: {
    title: 'Advanced OOP & Design Patterns',
    description: 'Master the Gang of Four (GoF) design patterns: Creational, Structural, and Behavioral patterns.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['Software Architecture & Design Principles'],
    learningContent: `
# Advanced OOP & Design Patterns

Design patterns are typical solutions to commonly occurring problems in software design. They are blueprints that you can customize to solve a recurring design problem in your code. The most famous catalog of patterns is from the "Gang of Four" (GoF).

## 1. Creational Patterns
These patterns deal with object creation mechanisms, trying to create objects in a manner suitable to the situation.
- **Singleton:** Ensures a class has only one instance and provides a global point of access to it. *(Note: Often considered an anti-pattern in modern code because it introduces hidden global state, making testing difficult).*
- **Factory Method:** Provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.
- **Builder:** Allows you to construct complex objects step by step. (e.g., \`new PizzaBuilder().addCheese().addPepperoni().build()\`).

## 2. Structural Patterns
These patterns explain how to assemble objects and classes into larger structures while keeping these structures flexible and efficient.
- **Adapter (Wrapper):** Allows objects with incompatible interfaces to collaborate. (e.g., Wrapping an old legacy API XML class in an interface that returns JSON so modern code can use it).
- **Decorator:** Lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors. (e.g., Adding a \`LoggingDecorator\` around a \`DatabaseConnection\` so every query is logged, without modifying the DB class itself).
- **Facade:** Provides a simplified interface to a library, a framework, or any other complex set of classes.

## 3. Behavioral Patterns
These patterns are concerned with algorithms and the assignment of responsibilities between objects.
- **Strategy:** Lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable. (e.g., A \`PaymentProcessor\` class that takes a \`PaymentStrategy\`, which could be \`StripeStrategy\` or \`PayPalStrategy\`).
- **Observer (Pub-Sub):** Lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they're observing. (e.g., React's state management, or DOM event listeners).
`,
    fullNotes: `
# Detailed Notes: Design Patterns

- **Overusing Patterns:** The biggest mistake junior engineers make is reading a book on Design Patterns and trying to use all 23 patterns in a single project. This leads to **Patternitis**—hyper-abstracted, unreadable code. Patterns should only be applied when they solve a *specific, existing* pain point in the codebase.
- **The Singleton Anti-pattern:** Singletons are incredibly hard to unit test because they retain state between tests. If Test A mutates the Singleton, Test B might fail unexpectedly. Modern frameworks use Dependency Injection (DI) containers to manage the lifecycle of objects (treating them as singletons at the application level, but allowing them to be mocked for tests), entirely removing the need for the Singleton pattern in code.
`,
    shortNotes: `
- Creational: How objects are instantiated (Builder, Factory).
- Structural: How objects are composed (Adapter, Decorator, Facade).
- Behavioral: How objects communicate (Strategy, Observer).
- Strategy Pattern: Swap algorithms at runtime (e.g., swapping payment gateways).
- Observer Pattern: The foundation of event-driven programming.
- Beware of "Patternitis" (over-engineering). Only use patterns when necessary.
`,
    cheatSheet: `
### Pattern Quick Match
- Need to construct a complex object with 15 optional parameters? -> **Builder**
- Need to support 3 different shipping calculators? -> **Strategy**
- Need to wrap an ugly legacy 3rd-party library? -> **Adapter**
- Need 5 different UI components to update when data changes? -> **Observer**
`,
    interviewQuestions: [
      { question: 'Explain the Strategy pattern and a scenario where it is highly useful.', answerHint: 'The Strategy pattern defines a family of algorithms, encapsulates each one in a separate class, and makes them interchangeable. It allows the algorithm to vary independently from clients that use it. A common use case is payment processing: A checkout class depends on an IPaymentStrategy interface. At runtime, based on user selection, you inject either a StripeStrategy or a PayPalStrategy. This strictly follows the Open/Closed Principle, as adding a new CryptoStrategy requires zero changes to the core checkout logic.', type: 'TECHNICAL' },
      { question: 'Why is the Singleton pattern frequently considered an anti-pattern in modern software engineering?', answerHint: 'Singletons introduce global state into an application. This creates hidden dependencies—a class might secretly rely on a Singleton, making its API dishonest. Furthermore, Singletons make unit testing extremely difficult because state persists across different test executions, leading to flaky tests. Modern applications solve this by using Dependency Injection (DI) containers to manage object lifecycles, ensuring an object only has one instance during runtime, without hardcoding the Singleton constraint into the class itself.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Refactoring.Guru - Design Patterns', url: 'https://refactoring.guru/design-patterns', type: 'ARTICLE', priority: 'S', source: 'Alexander Shvets', isOfficial: false }
    ]
  }
};
