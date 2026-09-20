export const py_04_oop = {
  OOP_ADVANCED_PYTHON: {
    title: 'Object-Oriented & Advanced Python',
    description: 'Master Python classes, inheritance, composition, dataclasses, descriptors, and metaclasses.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 75,
    prerequisites: ['Python Data Model & Language Internals'],
    learningContent: `
# Object-Oriented & Advanced Python

## 1. Classes, Inheritance, and MRO
Python supports multiple inheritance. The **Method Resolution Order (MRO)** (using the C3 linearization algorithm) determines which class's method is called when there's ambiguity.

\`\`\`python
class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "Woof"

class Cat(Animal):
    def speak(self):
        return "Meow"

print(Dog.__mro__)  # Dog -> Animal -> object
\`\`\`

## 2. Composition over Inheritance
Inheritance creates tight coupling. Prefer composition where possible:
\`\`\`python
# Inheritance (tight coupling)
class FlyingDog(Dog):  # A dog that flies? Fragile hierarchy.
    pass

# Composition (loose coupling)
class FlyingAbility:
    def fly(self):
        return "I can fly!"

class Dog:
    def __init__(self):
        self.flying = FlyingAbility()  # Has-A relationship

    def fly(self):
        return self.flying.fly()
\`\`\`

## 3. Dataclasses (@dataclass)
For data-holding classes, \`@dataclass\` auto-generates \`__init__\`, \`__repr__\`, and \`__eq__\` — eliminating boilerplate.
\`\`\`python
from dataclasses import dataclass, field

@dataclass
class User:
    name: str
    email: str
    tags: list = field(default_factory=list)  # Avoids mutable default arg trap
    active: bool = True

u = User(name="Alice", email="alice@example.com")
print(u)  # User(name='Alice', email='alice@example.com', tags=[], active=True)
\`\`\`

## 4. Properties and Descriptors
\`@property\` lets you use method-style validation while exposing a clean attribute interface:
\`\`\`python
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value

    @property
    def fahrenheit(self):  # Computed property — no storage
        return self._celsius * 9/5 + 32

t = Temperature(100)
print(t.fahrenheit)  # 212.0
t.celsius = -300     # ValueError!
\`\`\`
`,
    fullNotes: `
# Detailed Notes: Advanced OOP

- **Abstract Base Classes (ABCs):** Use \`from abc import ABC, abstractmethod\` to define interfaces in Python. If a subclass fails to implement all \`@abstractmethod\` methods, Python raises a \`TypeError\` at instantiation time (not at method call time), giving you early, clear failure messages.
- **Class Methods vs Static Methods:** \`@classmethod\` receives the class itself as the first argument (\`cls\`), making it useful as an alternative constructor. \`@staticmethod\` receives neither \`self\` nor \`cls\` — it's just a regular function namespaced inside the class.
`,
    shortNotes: `
- Python supports multiple inheritance. The MRO (C3 linearization) determines method lookup order.
- Prefer Composition (Has-A) over deep Inheritance hierarchies.
- @dataclass auto-generates __init__, __repr__, __eq__ from type annotations.
- Use field(default_factory=list) instead of = [] in dataclasses.
- @property converts a method to an attribute-style getter/setter with validation.
- Abstract Base Classes (ABCs) enforce interface contracts at instantiation time.
`,
    cheatSheet: `
### @dataclass vs namedtuple vs dict
| Feature         | dict           | namedtuple     | @dataclass     |
|-----------------|---------------|---------------|---------------|
| Type hints      | No            | No            | Yes           |
| Mutable         | Yes           | No            | Yes (default) |
| Default values  | N/A           | Limited       | Yes           |
| Methods         | No            | No            | Yes           |
| Auto __repr__   | No            | Yes           | Yes           |

Use \`@dataclass\` for most data-holding class needs.
`,
    interviewQuestions: [
      { question: 'What is the Python Method Resolution Order (MRO) and why does it matter?', answerHint: 'MRO defines the order in which Python searches classes for a method when using multiple inheritance. Python uses the C3 linearization algorithm to compute a consistent, predictable order. It matters because without a defined MRO, multiple inheritance would be ambiguous. You can inspect it with MyClass.__mro__ or MyClass.mro().', type: 'TECHNICAL' },
      { question: 'When would you use a @dataclass over a regular class?', answerHint: 'A @dataclass is ideal for simple classes that primarily hold data and require __init__, __repr__, and __eq__ implementations. It eliminates boilerplate. Use it for DTOs (Data Transfer Objects), configuration classes, and value objects. For classes requiring complex initialization logic, custom __hash__ behavior, or significant method-heavy behavior, a regular class is more appropriate.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Python dataclasses docs', url: 'https://docs.python.org/3/library/dataclasses.html', type: 'ARTICLE', priority: 'S', source: 'Python.org', isOfficial: true, description: 'Official documentation for Python dataclasses.' },
      { title: 'Python OOP Tutorials', url: 'https://www.youtube.com/watch?v=ZDa-Z5JzLYM', type: 'VIDEO', priority: 'S', source: 'Corey Schafer', isOfficial: false, description: 'Complete Python OOP series by Corey Schafer.' }
    ]
  }
};
