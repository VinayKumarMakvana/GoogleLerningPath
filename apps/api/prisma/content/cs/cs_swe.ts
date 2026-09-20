import { TopicContent } from '../types';

export const cs_swe: Record<string, TopicContent> = {
  swe_29: {
    title: 'Object-Oriented Programming (OOP)',
    learningContent: `
# Object-Oriented Programming
OOP is a programming paradigm based on the concept of "objects", which can contain data (attributes/properties) and code (methods/functions).

## The Four Pillars of OOP
1.  **Encapsulation:** Bundling data and methods that work on that data within a single unit (class). Restricting direct access to some of the object's components (using access modifiers like \`private\`, \`protected\`, \`public\`).
2.  **Abstraction:** Hiding complex implementation details and showing only the essential features of the object. Interfaces and Abstract classes achieve this.
3.  **Inheritance:** A mechanism where a new class derives properties and characteristics from an existing class. Promotes code reusability.
4.  **Polymorphism:** The ability of different objects to respond in their own way to the same method call. (e.g., \`shape.draw()\` does something different for a Circle vs a Square).

## Types of Polymorphism
*   **Compile-time (Static):** Method Overloading (same method name, different parameters). Operator Overloading.
*   **Run-time (Dynamic):** Method Overriding (subclass provides a specific implementation of a method defined in its superclass, resolved via virtual tables).
`,
    fullNotes: `
# Advanced OOP Concepts

## Composition vs Inheritance
"Favor composition over inheritance."
*   **Inheritance (IS-A relationship):** A Car *is a* Vehicle. Tightly couples the child to the parent. Fragile base class problem.
*   **Composition (HAS-A relationship):** A Car *has an* Engine. More flexible. You can change the engine at runtime. It flattens deep class hierarchies.

## Abstract Classes vs Interfaces
*   **Abstract Class:** Can have state (instance variables) and default implementations. A class can only inherit from *one* abstract class (in languages without multiple inheritance like Java/C#).
*   **Interface:** A pure contract. Cannot hold state (only constants). A class can implement *multiple* interfaces. (Note: Modern Java/C# allow default methods in interfaces, blurring the line, but state remains the key difference).
`,
    shortNotes: `
*   **Encapsulation:** Hide data, expose safe methods (getters/setters).
*   **Abstraction:** Hide complexity, expose simple interface.
*   **Inheritance:** IS-A relationship. Reusing base class code.
*   **Polymorphism:** Many forms (Overloading vs Overriding).
*   **Composition:** HAS-A relationship. Usually preferred over inheritance.
`,
    cheatSheet: `
| Pillar | What it does | Example |
|---|---|---|
| Encapsulation | Data hiding | \`private int age;\` |
| Abstraction | Complexity hiding | \`interface Drawable { void draw(); }\` |
| Inheritance | Code reuse | \`class Dog extends Animal\` |
| Polymorphism | Dynamic behavior | \`animal.makeSound()\` -> Bark/Meow |
`,
    resources: []
  },

  swe_30: {
    title: 'SOLID Principles',
    learningContent: `
# SOLID Principles
Five design principles intended to make software designs more understandable, flexible, and maintainable. Coined by Robert C. Martin (Uncle Bob).

## 1. Single Responsibility Principle (SRP)
"A class should have one, and only one, reason to change."
A class should only have one job. If a class handles UI, Database logic, and Business rules, it violates SRP.

## 2. Open/Closed Principle (OCP)
"Software entities should be open for extension, but closed for modification."
You should be able to add new functionality without touching existing code. Achieved via Polymorphism (Interfaces/Abstract classes).

## 3. Liskov Substitution Principle (LSP)
"Objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program."
If a function takes a \`Bird\`, and you pass an \`Ostrich\` (which inherits from \`Bird\`), the function shouldn't break if it calls \`bird.fly()\`. If an Ostrich throws an exception on \`fly()\`, it violates LSP.

## 4. Interface Segregation Principle (ISP)
"Many client-specific interfaces are better than one general-purpose interface."
Don't force a class to implement methods it doesn't use. Split fat interfaces into smaller, specific ones.

## 5. Dependency Inversion Principle (DIP)
"Depend upon abstractions, not concretions."
High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces). This makes mocking and unit testing much easier.
`,
    fullNotes: `
# Applying SOLID in Engineering
SOLID is not a strict rulebook, but a set of guidelines. Over-applying SOLID can lead to over-engineering (too many tiny classes and interfaces).
*   **SRP Violation Sign:** The file is 2000 lines long and imports everything.
*   **OCP Violation Sign:** You have a massive \`switch\` or \`if/else\` block checking the type of an object to decide what to do.
*   **DIP Violation Sign:** You instantiate a concrete database class (\`new MySQLDatabase()\`) directly inside your Business Logic class, making it impossible to test without a real database. (Use Dependency Injection instead).
`,
    shortNotes: `
*   **S:** Single Responsibility (One job).
*   **O:** Open/Closed (Extend via inheritance/interfaces, don't modify source).
*   **L:** Liskov Substitution (Subclasses must behave like parents).
*   **I:** Interface Segregation (Small, focused interfaces).
*   **D:** Dependency Inversion (Depend on interfaces, inject dependencies).
`,
    cheatSheet: `
| Principle | Quick Summary |
|---|---|
| SRP | Just do one thing. |
| OCP | Add features by adding code, not editing code. |
| LSP | Don't break the parent's contract in the child. |
| ISP | Don't force implementation of unused methods. |
| DIP | Inject interfaces, don't \`new\` up concrete classes. |
`,
    resources: [
      {
        title: 'Clean Architecture (Robert C. Martin)',
        type: 'BOOK',
        priority: 'S',
        description: 'Deep dive into SOLID and architectural boundaries.',
        status: 'PUBLISHED'
      }
    ]
  },

  swe_31: {
    title: 'Design Patterns',
    learningContent: `
# Software Design Patterns
Typical solutions to common problems in software design. They are templates, not specific code.

## Creational Patterns (Object Creation)
*   **Singleton:** Ensures a class has only one instance, and provides a global point of access to it. (Often considered an anti-pattern due to hidden dependencies and testing difficulty).
*   **Factory Method:** Defines an interface for creating an object, but lets subclasses alter the type of objects that will be created.
*   **Builder:** Separates the construction of a complex object from its representation. Allows step-by-step creation (e.g., \`new CarBuilder().setEngine("V8").setSeats(4).build()\`).

## Structural Patterns (Object Assembly)
*   **Adapter:** Allows objects with incompatible interfaces to collaborate. (Wraps the legacy class to match a new interface).
*   **Decorator:** Lets you attach new behaviors to objects by placing these objects inside special wrapper objects. (Alternative to massive subclassing).
*   **Facade:** Provides a simplified interface to a library, a framework, or any other complex set of classes.

## Behavioral Patterns (Algorithms and Communication)
*   **Observer:** Defines a subscription mechanism to notify multiple objects about any events that happen to the object they're observing (Pub/Sub).
*   **Strategy:** Lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable. (Fixes massive \`switch\` statements).
`,
    fullNotes: `
# Interview Focus: Singleton & Observer

## Singleton Implementation (Thread Safe)
In Java/C++, a naive Singleton is not thread-safe. If two threads call \`getInstance()\` at the same exact time, two instances might be created.
Solutions:
*   Eager initialization (create it when the class loads).
*   Double-Checked Locking (check if null, lock, check if null again, instantiate).

## Observer Pattern in UI
The Observer pattern is the foundation of modern reactive UIs (React, Vue) and event listeners (DOM events).
*   **Subject (Publisher):** Holds state. Maintains a list of observers.
*   **Observer (Subscriber):** Implements an \`update()\` method. Registers itself with the subject.
`,
    shortNotes: `
*   **Creational:** Singleton (1 instance), Factory (subclass decides), Builder (step-by-step).
*   **Structural:** Adapter (incompatible interfaces), Decorator (wrap with new behavior), Facade (simplified UI).
*   **Behavioral:** Observer (pub/sub events), Strategy (swap algorithms at runtime).
`,
    cheatSheet: `
| Pattern | Problem it solves |
|---|---|
| Builder | Constructor has 15 optional parameters |
| Adapter | Using a 3rd party library that doesn't fit your interface |
| Strategy | Huge if/else block deciding which algorithm to use |
| Observer | Need to update 5 different UI components when data changes |
`,
    resources: [
      {
        title: 'Refactoring.Guru: Design Patterns',
        url: 'https://refactoring.guru/design-patterns',
        type: 'ARTICLE',
        priority: 'S',
        description: 'The best modern resource for learning design patterns.',
        status: 'PUBLISHED'
      }
    ]
  },

  swe_32: {
    title: 'Compiler Fundamentals',
    learningContent: `
# Compiler Fundamentals
A compiler translates code written in a high-level programming language into a lower-level language (like assembly or machine code).

## The Phases of a Compiler
1.  **Lexical Analysis (Scanner):** Reads the source code character by character and groups them into meaningful sequences called **Tokens** (e.g., keywords, identifiers, operators). Removes whitespace and comments.
2.  **Syntax Analysis (Parser):** Takes the tokens and builds an **Abstract Syntax Tree (AST)** based on the grammatical rules of the language. Detects syntax errors (e.g., missing semicolon).
3.  **Semantic Analysis:** Checks the AST for semantic errors. Enforces type checking (e.g., trying to add a string and an integer).
4.  **Intermediate Code Generation:** Converts the AST into a machine-independent intermediate representation (IR), like Three-Address Code.
5.  **Code Optimization:** Improves the IR to make it faster or consume less memory (e.g., removing dead code, loop unrolling).
6.  **Target Code Generation:** Translates the optimized IR into the specific machine code or assembly for the target CPU architecture.
`,
    fullNotes: `
# Compilers vs Interpreters vs JIT

*   **Compiler (C, C++, Rust, Go):** Translates the entire program upfront before execution. Produces a fast, standalone executable. Slower development cycle (compile times).
*   **Interpreter (Python, Ruby, PHP):** Translates and executes the code line-by-line at runtime. Fast development cycle, but execution is slower.
*   **JIT (Just-In-Time) Compiler (Java, C#, JavaScript/V8):** A hybrid approach. 
    1. The source code is compiled Ahead-Of-Time into bytecode (an intermediate format).
    2. At runtime, the virtual machine (JVM, CLR, V8) interprets the bytecode.
    3. If the VM detects "hot code" (e.g., a loop running thousands of times), the JIT compiler compiles that specific bytecode down to native machine code on the fly for maximum performance.
`,
    shortNotes: `
*   **Lexer:** Characters -> Tokens.
*   **Parser:** Tokens -> AST (Syntax checking).
*   **Semantic Analyzer:** Type checking.
*   **Optimizer:** Makes code faster/smaller.
*   **Compiler:** Upfront translation to machine code.
*   **Interpreter:** Line-by-line runtime execution.
*   **JIT:** Compiles hot bytecode to machine code at runtime.
`,
    cheatSheet: `
| Phase | Input | Output | Error Handled |
|---|---|---|---|
| Lexical | Raw String | Tokens | Illegal characters |
| Syntax | Tokens | AST | Missing parenthesis |
| Semantic | AST | Validated AST | Type mismatch |
`,
    resources: []
  },

  swe_33: {
    title: 'Git & Version Control',
    learningContent: `
# Version Control with Git
Git is a distributed version control system that tracks changes in any set of computer files, usually used for coordinating work among programmers.

## Core Concepts
*   **Repository (Repo):** A directory where Git has been initialized to start version controlling your files.
*   **Commit:** A snapshot of your repository at a specific point in time. Identified by a SHA-1 hash.
*   **Branch:** A lightweight movable pointer to a commit. Allows you to work on features isolated from the main codebase.
*   **Merge:** Integrating changes from one branch into another.
*   **HEAD:** A pointer indicating your current checked-out commit/branch.

## The Three States of Git
Files in a Git repo reside in one of three areas:
1.  **Working Directory:** The actual files you are editing on your disk.
2.  **Staging Area (Index):** A file that stores information about what will go into your next commit. (Populated via \`git add\`).
3.  **Git Directory (Repository):** Where Git stores the metadata and object database for your project (The \`.git\` folder). (Populated via \`git commit\`).
`,
    fullNotes: `
# Advanced Git Workflows

## Merge vs Rebase
When pulling changes from \`main\` into your feature branch:
*   **Merge (\`git merge main\`):** Creates a new "merge commit" that ties the two histories together. Non-destructive, preserves exact history, but can create a messy graph.
*   **Rebase (\`git rebase main\`):** Takes your branch's commits, temporarily saves them, updates your branch to point to the tip of \`main\`, and then reapplies your commits on top. Creates a perfectly linear history. **Warning:** Never rebase commits that you have already pushed to a shared public branch.

## Resolving Conflicts
When two branches modify the same line of the same file, Git cannot automatically merge them. It pauses and asks the developer to manually resolve the conflict. You must edit the file, choose the correct code, remove the conflict markers (\`<<<<<<\`, \`======\`, \`>>>>>>\`), and then \`git add\` and \`git commit\`.
`,
    shortNotes: `
*   **Distributed:** Every developer has a full copy of the repo history.
*   **3 States:** Working Dir -> (add) -> Staging -> (commit) -> Repo.
*   **Branching:** Cheap and fast pointers to commits.
*   **Merge:** Ties branches together via a merge commit.
*   **Rebase:** Rewrites history to make it linear. Do not rebase public branches.
*   **Conflict:** Requires manual resolution when same lines are edited.
`,
    cheatSheet: `
| Command | Action |
|---|---|
| \`git add .\` | Stage all modified files |
| \`git commit -m "Msg"\` | Create a snapshot |
| \`git push origin main\` | Upload commits to remote |
| \`git pull\` | Fetch and merge from remote |
| \`git checkout -b fix\` | Create and switch to new branch |
`,
    resources: []
  },

  swe_34: {
    title: 'Software Engineering Fundamentals',
    learningContent: `
# Software Engineering
Software engineering is the systematic application of engineering approaches to the development of software. It goes beyond just writing code; it encompasses the entire lifecycle of a software product.

## SDLC (Software Development Life Cycle)
1.  **Requirement Analysis:** Gathering what the software needs to do.
2.  **Design:** Architecture, UI/UX, database schema.
3.  **Implementation (Coding):** Writing the actual code.
4.  **Testing:** Finding bugs and verifying requirements.
5.  **Deployment:** Releasing to users.
6.  **Maintenance:** Fixing bugs, adding features over time.

## Methodologies
*   **Waterfall:** Linear, sequential phases. You finish design before you start coding. Very rigid, high risk of failure if requirements change. (Used in aerospace/medical).
*   **Agile:** Iterative and incremental. Software is built in small sprints (1-4 weeks). Requirements are expected to change. High collaboration with the customer.
    *   **Scrum:** A specific Agile framework using Roles (Scrum Master, Product Owner), Artifacts (Backlog), and Events (Daily Standup, Sprint Planning, Retrospective).
`,
    fullNotes: `
# CI/CD and DevOps

## Continuous Integration (CI)
The practice of merging all developers' working copies to a shared mainline several times a day.
*   Every commit triggers an automated build and runs the automated test suite.
*   Goal: Detect integration errors as quickly as possible.

## Continuous Delivery/Deployment (CD)
*   **Continuous Delivery:** Ensures the software is *always* in a releasable state. The deployment to production requires a manual click of a button.
*   **Continuous Deployment:** Every change that passes all stages of the production pipeline is released to customers *automatically*, with no human intervention.

## Code Reviews
A systematic examination of computer source code. It is intended to find bugs, improve code quality, and share knowledge among the team. Usually done via Pull Requests (PRs) or Merge Requests (MRs).
`,
    shortNotes: `
*   **SDLC:** Requirements -> Design -> Code -> Test -> Deploy -> Maintain.
*   **Waterfall:** Rigid, sequential, slow to adapt.
*   **Agile/Scrum:** Iterative, flexible, frequent small releases.
*   **CI:** Automatically building and testing every commit.
*   **CD (Delivery):** Code is always ready to deploy.
*   **CD (Deployment):** Code deploys automatically to production.
*   **Code Review:** Peers read your code before merging (Pull Requests).
`,
    cheatSheet: `
| Term | Meaning |
|---|---|
| Standup | Daily 15-minute team meeting in Scrum |
| Sprint | A timeboxed iteration (e.g., 2 weeks) |
| Pipeline | Automated script that runs CI/CD tasks |
| PR | Pull Request (asking to merge your code) |
`,
    resources: []
  },

  swe_35: {
    title: 'Testing Fundamentals',
    learningContent: `
# Software Testing
Testing is the process of evaluating a system to verify that it satisfies specified requirements and to identify defects.

## The Testing Pyramid
A concept grouping software tests into buckets of different granularity.
1.  **Unit Tests (Base):** Test individual functions/classes in isolation. Fast to write, fast to run. Highly deterministic. Should make up the vast majority of your tests.
2.  **Integration Tests (Middle):** Test how multiple units/modules work together (e.g., testing a function that queries a real database). Slower and more complex.
3.  **End-to-End (E2E) Tests (Top):** Test the entire application from the user's perspective (e.g., using a headless browser to click through a UI). Very slow, brittle, and hard to maintain. Keep these to a minimum (core flows only).

## Mocking and Stubbing
In unit tests, you must isolate the unit being tested from its dependencies (network, database, file system).
*   **Mock:** A fake object that records how it was called, allowing you to assert that the unit interacted with the dependency correctly.
*   **Stub:** A fake object that simply returns hardcoded data to the unit.
`,
    fullNotes: `
# Test-Driven Development (TDD)
A software development process relying on a very short iterative cycle:
1.  **Red:** Write a failing unit test for the desired feature.
2.  **Green:** Write the absolute minimum code required to make the test pass.
3.  **Refactor:** Clean up the code while keeping the tests green.

TDD forces you to think about the interface and requirements *before* implementation, and naturally produces highly testable, decoupled code.

## Types of Testing
*   **Black-Box Testing:** Testing functionality without knowing the internal code structure.
*   **White-Box Testing:** Testing with full knowledge of the internal source code (e.g., writing unit tests to cover all execution branches).
*   **Regression Testing:** Re-running old tests to ensure a new code change hasn't broken existing functionality.
`,
    shortNotes: `
*   **Unit Test:** Isolates and tests one function. Fast.
*   **Integration Test:** Tests components working together (e.g., with DB).
*   **E2E Test:** Simulates real user behavior in a browser. Slow, brittle.
*   **Mock:** Fake object to verify interactions.
*   **TDD:** Write test first (Red), pass it (Green), Refactor.
*   **Regression:** Making sure new code doesn't break old features.
`,
    cheatSheet: `
| Test Type | Scope | Speed | Cost |
|---|---|---|---|
| Unit | Single Function | Milliseconds | Low |
| Integration | Module + DB | Seconds | Medium |
| E2E | Entire App + UI | Minutes | High |
`,
    resources: []
  },

  swe_36: {
    title: 'Concurrency Fundamentals',
    learningContent: `
# Concurrency Fundamentals
Concurrency is the composition of independently executing processes. It's about dealing with lots of things at once (structuring a program).
Parallelism is the simultaneous execution of (possibly related) computations. It's about doing lots of things at once (requires multi-core hardware).

## Shared State Concurrency
The traditional model (C++, Java). Multiple threads share access to the same memory.
*   **Pros:** Very fast.
*   **Cons:** Extremely hard to get right. Requires manual synchronization (Mutexes, Semaphores) to prevent race conditions and deadlocks. Data races are notoriously difficult to debug.

## Message Passing Concurrency
An alternative model (Erlang, Go's Channels, the Actor Model). Threads/Actors do not share memory. Instead, they communicate by sending messages to each other.
*   *"Do not communicate by sharing memory; instead, share memory by communicating."* - Go Proverb.
*   **Pros:** Easier to reason about, prevents data races by design, scales well to distributed systems.
*   **Cons:** Slight overhead in copying/passing messages.
`,
    fullNotes: `
# Asynchronous Programming & Event Loops

## I/O Bound vs CPU Bound
*   **CPU Bound:** The program spends most of its time doing math (e.g., video rendering). Needs multi-threading/parallelism to run faster.
*   **I/O Bound:** The program spends most of its time waiting for the network, disk, or database. (Most web applications are I/O bound).

## Asynchronous I/O (Node.js, Python Asyncio)
Instead of blocking a thread while waiting for a database query to return, async programming uses an **Event Loop**.
1.  The program initiates an I/O request.
2.  The program registers a callback (or Promise) and immediately moves on to execute other code.
3.  When the OS signals that the I/O is complete, the Event Loop puts the callback into a queue.
4.  The Event Loop executes the callback.

This allows a *single thread* (like in Node.js) to handle tens of thousands of concurrent connections without the massive memory overhead of spawning a new thread for every connection.
`,
    shortNotes: `
*   **Concurrency:** Structuring a program into independent tasks.
*   **Parallelism:** Executing tasks simultaneously (needs multiple cores).
*   **Shared State:** Threads access same RAM. Needs locks. Hard to debug.
*   **Message Passing:** Threads send data to each other. Safer.
*   **CPU Bound:** Needs more CPU power.
*   **I/O Bound:** Needs faster disk/network. Benefit hugely from Async.
*   **Event Loop:** Single-threaded async model. Never block the event loop!
`,
    cheatSheet: `
| Model | Mechanism | Languages |
|---|---|---|
| Shared State | Mutexes, Locks | C++, Java, C# |
| Message Passing | Channels, Actors | Go, Erlang, Rust |
| Event Loop | Promises, Callbacks | JavaScript, Node.js, Python |
`,
    resources: []
  },

  swe_37: {
    title: 'Distributed Systems Fundamentals',
    learningContent: `
# Distributed Systems
A distributed system is a computing environment in which various components are spread across multiple computers on a network, coordinating their actions by passing messages to achieve a common goal.

## Why Distributed?
1.  **Scalability:** When a single machine (Vertical Scaling) hits its hardware limits, you must add more machines (Horizontal Scaling).
2.  **Reliability & Fault Tolerance:** If one machine goes down, the system stays online.
3.  **Low Latency:** Placing servers geographically closer to users (CDNs, edge computing).

## The Fallacies of Distributed Computing
Developers often falsely assume:
1.  The network is reliable.
2.  Latency is zero.
3.  Bandwidth is infinite.
4.  The network is secure.
5.  Topology doesn't change.
*In reality, networks partition, packets drop, servers crash, and clocks drift.*
`,
    fullNotes: `
# CAP Theorem
In a distributed data store, you can only guarantee two out of the following three properties simultaneously in the event of a network failure:
*   **Consistency (C):** Every read receives the most recent write or an error. (All nodes see the same data at the same time).
*   **Availability (A):** Every request receives a (non-error) response, without the guarantee that it contains the most recent write.
*   **Partition Tolerance (P):** The system continues to operate despite an arbitrary number of messages being dropped by the network between nodes.

Because Network Partitions (P) are unavoidable in the real world, a distributed database must choose between Consistency (CP) or Availability (AP).
*   **CP (e.g., MongoDB, HBase):** If a network partition isolates the primary node, the system will refuse writes (or reads) to prevent stale data until the partition heals.
*   **AP (e.g., Cassandra, DynamoDB):** The system will accept writes on both sides of the partition. Data will be temporarily inconsistent, but the system remains highly available. Uses "Eventual Consistency" to merge data later.

## Microservices vs Monoliths
*   **Monolith:** Entire application is one deployable unit. Simple to develop/test initially, but becomes a nightmare to scale and coordinate across large teams.
*   **Microservices:** Application is split into small, independent services communicating over HTTP/gRPC. Highly scalable, decoupled teams, polyglot (use different languages). But introduces immense operational complexity (tracing, networking, distributed transactions).
`,
    shortNotes: `
*   **Vertical Scaling (Scale Up):** Buy a bigger server.
*   **Horizontal Scaling (Scale Out):** Buy more servers.
*   **CAP Theorem:** Choose two: Consistency, Availability, Partition Tolerance.
*   **CP Database:** Prevents stale reads, but might go down during network issues.
*   **AP Database:** Always up, but might serve slightly stale data (Eventual Consistency).
*   **Monolith:** One big codebase.
*   **Microservices:** Many small services. Harder to run, easier to scale.
`,
    cheatSheet: `
| Concept | Description |
|---|---|
| Load Balancer | Distributes incoming traffic across multiple servers |
| Stateless | Server holds no session data; makes horizontal scaling easy |
| Single Point of Failure | A component whose failure crashes the whole system |
| Eventual Consistency | Data will *eventually* propagate to all nodes (AP systems) |
`,
    resources: []
  }
};
