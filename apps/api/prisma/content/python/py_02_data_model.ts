export const py_02_data_model = {
  PYTHON_DATA_MODEL: {
    title: 'Python Data Model & Language Internals',
    description: 'Understand dunder methods, the Python object model, memory management, and how Python works under the hood.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['Python Fundamentals'],
    learningContent: `
# Python Data Model & Language Internals

The Python Data Model is the set of interfaces that allow your custom objects to integrate seamlessly with language features. Understanding it lets you write truly Pythonic libraries.

## 1. Dunder (Magic) Methods
Python operators and built-in functions are translated to dunder method calls:
- \`a + b\` → \`a.__add__(b)\`
- \`len(a)\` → \`a.__len__()\`
- \`str(a)\` → \`a.__str__()\`
- \`repr(a)\` → \`a.__repr__()\`
- \`a[i]\` → \`a.__getitem__(i)\`
- \`a == b\` → \`a.__eq__(b)\`
- \`with a as x:\` → \`a.__enter__() / a.__exit__()\`

\`\`\`python
class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __len__(self):
        return 2  # A 2D vector always has 2 dimensions

v1 = Vector(1, 2)
v2 = Vector(3, 4)
print(v1 + v2)   # Vector(4, 6) — calls __add__
print(len(v1))   # 2 — calls __len__
\`\`\`

## 2. __repr__ vs __str__
- \`__str__\`: Human-readable string for end users (e.g., pretty output to the console).
- \`__repr__\`: Unambiguous developer representation for debugging. Goal: if possible, \`eval(repr(obj)) == obj\`.
If you only define one, always define \`__repr__\`. Python falls back to it when \`__str__\` is missing.

## 3. Memory Management in CPython
CPython uses a combination of:
- **Reference Counting:** Every object has a \`ob_refcnt\`. When it drops to 0, memory is freed immediately.
- **Cyclic Garbage Collector:** Handles reference cycles (A→B→A). Runs periodically. Can be triggered with \`gc.collect()\`.
- **Memory Pools (pymalloc):** Python pre-allocates large blocks of memory and manages small allocations (<512 bytes) internally to avoid expensive OS \`malloc()\` calls.

## 4. id() and Object Identity
\`id(obj)\` returns the memory address of an object (in CPython). This is the value that \`is\` compares.
\`\`\`python
a = 256
b = 256
print(a is b)   # True — CPython caches small integers (-5 to 256)

a = 1000
b = 1000
print(a is b)   # False — NOT cached, different objects despite equal values
\`\`\`
`,
    fullNotes: `
# Detailed Notes: Python Data Model

- **Hashability:** An object is hashable if it has a \`__hash__()\` method that returns a consistent integer over its lifetime. Hashable objects can be used as dictionary keys or set members. Mutable objects (list, dict) are NOT hashable because changing them would change their hash, corrupting the dictionary's internal state.
- **Slots (\`__slots__\`):** By default, Python stores instance attributes in a per-object \`__dict__\` dictionary. This is flexible but wastes memory when you have millions of small objects. Declaring \`__slots__ = ['x', 'y']\` on a class tells Python to use fixed-size arrays instead of dicts for attribute storage, drastically reducing memory overhead.
`,
    shortNotes: `
- Dunder methods make custom objects behave like Python builtins.
- __repr__ is for developers (unambiguous). __str__ is for users (readable).
- CPython uses Reference Counting + a Cyclic GC for memory management.
- Objects with ref_count=0 are freed immediately.
- id(obj) returns the memory address. 'is' compares identity, not value.
- Use __slots__ to drastically reduce memory when creating millions of objects.
`,
    cheatSheet: `
### Key Dunder Methods
| Goal                  | Implement      |
|-----------------------|----------------|
| String representation | __repr__, __str__ |
| Arithmetic ops        | __add__, __sub__, __mul__ |
| Comparison            | __eq__, __lt__, __gt__ |
| Container behavior    | __len__, __getitem__, __setitem__ |
| Callable              | __call__ |
| Context manager       | __enter__, __exit__ |
| Hashing               | __hash__ |
`,
    interviewQuestions: [
      { question: 'What is the difference between __repr__ and __str__ in Python?', answerHint: '__str__ is intended for creating a user-friendly, readable output for end users. __repr__ is intended for an unambiguous, developer-facing representation that ideally could be used to recreate the object (eval(repr(obj)) == obj). Python uses __repr__ as the fallback when __str__ is not defined. If you only define one, always implement __repr__.', type: 'TECHNICAL' },
      { question: 'What does it mean for a Python object to be "hashable"?', answerHint: 'An object is hashable if it has a __hash__ method that returns an integer that remains constant throughout the object\'s lifetime, and if it has an __eq__ method. Hashable objects can be used as dictionary keys or set members because hash tables require a consistent hash to store and retrieve items. Mutable objects like lists are not hashable because modifying them would change their hash, corrupting any hash table that stored them.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Python Data Model (Official Docs)', url: 'https://docs.python.org/3/reference/datamodel.html', type: 'ARTICLE', priority: 'S', source: 'Python.org', isOfficial: true, description: 'The definitive reference for all Python data model concepts.' },
      { title: 'Python Internals: The Data Model', url: 'https://www.youtube.com/watch?v=cKPlPJyQrt4', type: 'VIDEO', priority: 'A', source: 'Luciano Ramalho / PyCon', isOfficial: false, description: 'Deep dive into Python data model from the author of Fluent Python.' }
    ]
  }
};
