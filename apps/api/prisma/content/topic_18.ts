import { TopicContent } from './types';

export const topic18: TopicContent = {
  title: 'Basic OOP',
  learningContent: `
# Object-Oriented Programming (OOP)
OOP is a programming paradigm that organizes software design around data, or objects, rather than just functions and logic.

## The Pillars of OOP

### 1. Encapsulation
Bundling data (variables) and the methods that operate on them into a single unit (a class), and restricting direct access to the inner workings.
*   **How:** Using \`private\` variables and \`public\` getters/setters.
*   **Why:** Prevents external code from putting the object into an invalid state.

### 2. Abstraction
Hiding the complex reality while exposing only the necessary parts. 
*   **How:** When you use \`std::string\`, you don't know (or care) how it manages memory or reallocates arrays. You just use \`s.length()\`. The complexity is abstracted away.

### 3. Inheritance (Introduction)
Creating new classes based on existing ones to promote code reuse. 
\`\`\`cpp
class Animal {
public:
    void eat() { cout << "Eating"; }
};

// Dog "is-an" Animal. It inherits eat().
class Dog : public Animal {
public:
    void bark() { cout << "Woof"; }
};
\`\`\`

### 4. Polymorphism (Introduction)
The ability of different objects to respond to the same method call in their own unique way. 
*   Usually implemented via **virtual functions**. If \`Animal\` has a \`virtual void speak()\`, \`Dog\` can override it to print "Woof", and \`Cat\` can override it to print "Meow". A pointer to an \`Animal\` will automatically call the correct function based on the actual object it points to.

## Composition vs Inheritance
*   **Inheritance (IS-A):** A Car *is a* Vehicle.
*   **Composition (HAS-A):** A Car *has an* Engine.
**Best Practice:** Prefer Composition over Inheritance. Building classes by assembling smaller, independent components is usually much more flexible than creating deep, rigid inheritance hierarchies.

## When NOT to use OOP
C++ is a multi-paradigm language. You do not need to force everything into a class!
*   If you just need a function to calculate a math formula, write a free function. Don't create a \`MathCalculatorFactory\` class.
*   If you just need to group an X and Y coordinate, use a simple \`struct Point { int x; int y; };\`. Don't make them private and add getters/setters unless there is a strict validation rule needed.

## DSA CONNECTION
While deep inheritance hierarchies are rare in competitive programming, basic OOP is everywhere.
*   **Encapsulation:** Wrapping a Segment Tree or a Trie inside a \`class\` with a clean \`update()\` and \`query()\` interface makes your code vastly easier to debug than keeping raw arrays in global scope.
`,
  fullNotes: `
# Basic OOP Reference

## 1. Encapsulation
*   Hides implementation details.
*   Enforces class invariants (rules that must always be true).
*   Allows the internal implementation to change without breaking code that relies on the public interface.

## 2. Inheritance Syntax
\`class Derived : public Base { ... };\`
*   \`public\` inheritance models "IS-A".
*   Derived classes inherit all public and protected members of the Base class. (They do not inherit private members).
*   Derived classes do not inherit the Base class's constructors, destructors, or overloaded assignment operators.

## 3. Polymorphism and \`virtual\`
\`\`\`cpp
class Base {
public:
    virtual void show() { cout << "Base"; }
    virtual ~Base() = default; // ALWAYS make base destructors virtual!
};

class Derived : public Base {
public:
    void show() override { cout << "Derived"; }
};
\`\`\`
If you have \`Base* b = new Derived();\`, calling \`b->show()\` will print "Derived" thanks to the \`virtual\` keyword allowing dynamic dispatch.

## 4. Composition
Including objects of other classes as members.
\`\`\`cpp
class Engine { ... };
class Car {
private:
    Engine eng; // Car HAS-A Engine
};
\`\`\`

## 5. Interview Relevance
*   **Q:** What are the four pillars of OOP?
    *   **A:** Encapsulation, Abstraction, Inheritance, Polymorphism.
*   **Q:** Why prefer composition over inheritance?
    *   **A:** Inheritance creates tight coupling between the base and derived classes, making changes difficult. Composition is loosely coupled; you can swap out components easily at runtime without deep hierarchy redesigns.
`,
  shortNotes: `
*   **Encapsulation:** Hiding data (\`private\`), exposing interfaces (\`public\`).
*   **Abstraction:** Hiding complexity (e.g., using \`vector\` without knowing its internal pointer math).
*   **Inheritance:** "IS-A" relationship. Code reuse. \`class Dog : public Animal\`.
*   **Polymorphism:** "Many forms". Using \`virtual\` functions so derived classes can override base class behavior.
*   **Composition:** "HAS-A" relationship. A class contains another class. Usually better than inheritance.
`,
  cheatSheet: `
| Pillar | Meaning | Code Example |
|---|---|---|
| Encapsulation | Hide state | \`private: int data;\` |
| Abstraction | Hide complexity| \`string.length()\` |
| Inheritance | "IS-A" | \`class Cat : public Pet\` |
| Polymorphism | Override methods| \`virtual void speak()\` |
| Composition | "HAS-A" | \`struct Car { Engine e; };\`|
`,
  resources: [
    {
      title: 'LearnCpp: Object-oriented programming',
      url: 'https://www.learncpp.com/cpp-tutorial/welcome-to-object-oriented-programming/',
      type: 'ARTICLE',
      priority: 'S',
      description: 'Introduction to OOP concepts.'
    }
  ]
};
