export const sd_12_lld = {
  LOW_LEVEL_DESIGN: {
    title: 'Low-Level Design & Object-Oriented Design',
    description: 'Transition from architecture to code. Master SOLID principles, Design Patterns, and class structure.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 120,
    prerequisites: [],
    learningContent: `
# Low-Level Design (LLD)

While HLD focuses on servers and databases, LLD focuses on Classes, Interfaces, and Code Structure. This is often tested in Machine Coding or Object-Oriented Design (OOD) interviews.

## SOLID Principles
1. **Single Responsibility (SRP):** A class should have one, and only one, reason to change.
2. **Open/Closed (OCP):** Software entities should be open for extension, but closed for modification. (Use interfaces/polymorphism instead of editing existing \`if/else\` chains).
3. **Liskov Substitution (LSP):** Subtypes must be substitutable for their base types without altering program correctness.
4. **Interface Segregation (ISP):** Clients should not be forced to depend upon interfaces that they do not use. (Split large, fat interfaces into smaller ones).
5. **Dependency Inversion (DIP):** High-level modules should not depend on low-level modules. Both should depend on abstractions (Interfaces).

## Common Design Patterns
- **Creational:** Singleton (only one instance), Factory (creates objects without specifying exact class), Builder (constructs complex objects step by step).
- **Structural:** Adapter (makes incompatible interfaces work together), Decorator (adds behavior to objects dynamically), Facade (provides a simplified interface to a complex subsystem).
- **Behavioral:** Strategy (encapsulates a family of algorithms and makes them interchangeable), Observer (Pub/Sub at the object level).
`,
    fullNotes: `
# Detailed Notes: LLD Case Studies

### Design a Parking Lot
- **Entities:** \`ParkingLot\`, \`ParkingLevel\`, \`ParkingSpot\`, \`Vehicle\` (Car, Truck, Motorcycle), \`Ticket\`.
- **Enums:** \`SpotType\`, \`VehicleType\`, \`PaymentStatus\`.
- **Core Logic:** \`Vehicle\` has a size. \`ParkingSpot\` has a size. When a vehicle enters, find the nearest available spot of the matching type. Use a Strategy Pattern for calculating the parking fee (e.g., Hourly vs Daily rates).

### Design an Elevator System
- **Entities:** \`ElevatorSystem\`, \`ElevatorCar\`, \`Floor\`, \`Button\`, \`Display\`.
- **Algorithm:** Look algorithm (SCAN). The elevator continues in its current direction serving requests until there are no more requests in that direction, then it reverses.
`,
    shortNotes: `
- SOLID principles are the foundation of LLD.
- Strategy Pattern: Replaces massive switch/if-else statements (e.g., PaymentMethod: CreditCard, PayPal, Crypto).
- Factory Pattern: Abstracts object creation.
- Start LLD by defining core Nouns (Classes), then Verbs (Methods), then Relationships (1:1, 1:N).
`,
    cheatSheet: `
### LLD Interview Framework
1. **Clarify Requirements:** What features are in scope?
2. **Define Core Objects/Classes:** Identify the Nouns.
3. **Define Relationships:** Composition (Has-A) vs Inheritance (Is-A).
4. **Define Class APIs/Methods:** What do they do?
5. **Apply Patterns/SOLID:** Refactor to make the code extensible.
`,
    interviewQuestions: [
      { question: 'What does the Open/Closed Principle state?', answerHint: 'Code should be open for extension but closed for modification. You should be able to add new functionality (e.g., a new Payment Gateway) by writing new classes that implement an interface, rather than modifying the existing core payment processing class.', type: 'CONCEPTUAL' },
      { question: 'When would you use the Strategy Design Pattern?', answerHint: 'When you have a family of algorithms that accomplish the same task in different ways, and you want to be able to swap them out at runtime. For example, sorting algorithms, or pricing strategies in an e-commerce app.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Refactoring Guru - Design Patterns', url: 'https://refactoring.guru/design-patterns', type: 'ARTICLE', priority: 'S', source: 'Refactoring.guru', isOfficial: true }
    ]
  }
};
