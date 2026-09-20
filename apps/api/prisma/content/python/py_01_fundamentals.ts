export const py_01_fundamentals = {
  PYTHON_FUNDAMENTALS: {
    title: 'Python Fundamentals',
    description: 'Master the Python execution model, data types, mutability, and core control flow.',
    difficulty: 'BEGINNER',
    estimatedLearnTime: 60,
    prerequisites: [],
    learningContent: `
# Python Fundamentals

Python is an interpreted, dynamically typed, garbage-collected language. Understanding how Python works at the execution level prevents a huge class of bugs.

## 1. Python Execution Model
When you run \`python app.py\`, the interpreter:
1. Reads source text (\`.py\`).
2. Compiles it to bytecode (\`.pyc\` files cached in \`__pycache__\`).
3. Executes bytecode in the Python Virtual Machine (CPython PVM).

This is why Python is slower than C/C++ (no native compilation to machine code by default), but it means the same \`.py\` file runs identically on Windows, macOS, or Linux.

## 2. Variables and Objects — Everything is an Object
In Python, variables are **labels** (references) pointing to objects in memory. They do not hold values directly.

\`\`\`python
x = [1, 2, 3]
y = x         # y points to the SAME list object
y.append(4)
print(x)      # [1, 2, 3, 4] — x is affected because y was an alias!
\`\`\`

## 3. Mutability
Understanding what is mutable and immutable prevents the most common Python bugs.

| Immutable (cannot change in-place) | Mutable (can change in-place)    |
|------------------------------------|----------------------------------|
| int, float, bool, str              | list, dict, set                  |
| tuple                              | custom class instances           |
| frozenset, bytes                   | bytearray                        |

\`\`\`python
# Strings are immutable
s = "hello"
s[0] = "H"  # TypeError! You cannot change a string in-place.

# Lists are mutable
lst = [1, 2, 3]
lst[0] = 99  # Works fine. lst is now [99, 2, 3]
\`\`\`

## 4. Core Collections
- **list:** Ordered, mutable, allows duplicates. \`O(1)\` append, \`O(N)\` search.
- **tuple:** Ordered, immutable. Use for fixed records (e.g., a database row).
- **dict:** Key-value map. \`O(1)\` average lookup. Keys must be hashable (immutable).
- **set:** Unordered, unique elements. \`O(1)\` average lookup and membership test.

## 5. Comprehensions (Pythonic Loops)
\`\`\`python
# List comprehension
squares = [x**2 for x in range(10)]

# Dict comprehension
word_lengths = {word: len(word) for word in ["apple", "banana"]}

# Set comprehension
unique_lengths = {len(word) for word in ["apple", "banana", "avocado"]}

# Generator expression (lazy — does not build the full list in memory)
total = sum(x**2 for x in range(10_000_000))
\`\`\`
`,
    fullNotes: `
# Detailed Notes: Python Fundamentals

- **Reference Counting & GC:** CPython manages memory primarily via reference counting. Every object has an internal counter. When a variable is reassigned, the old object's count decreases. When it hits 0, the memory is freed. Python also has a cyclic garbage collector to handle reference cycles (e.g., A points to B, B points back to A).
- **\`is\` vs \`==\`:** \`==\` checks value equality. \`is\` checks object identity (are they the same object in memory?). Never use \`is\` to compare integers or strings (CPython caches small integers -5 to 256, making \`is\` seem to work, but this is an implementation detail you cannot rely on).
- **Mutable Default Arguments (The Trap):** \`def append_to(item, lst=[]):\` — the default \`[]\` is created once when the function is defined, not each time it's called. Mutating it persists across calls. Always use \`None\` as default and initialize inside the function.
`,
    shortNotes: `
- Python variables are labels/references, not boxes holding values.
- Mutation of a list through an alias affects all references to the same list.
- Immutable: int, str, tuple, frozenset. Mutable: list, dict, set.
- Prefer comprehensions (list, dict, set, generator) over manual loops.
- Generator expressions are lazy — they compute values one at a time, not all at once.
- Never use mutable default arguments in function signatures.
`,
    cheatSheet: `
### Python Data Structure Cheat Sheet
| Type    | Literal      | Ordered | Mutable | Unique  | Lookup |
|---------|-------------|---------|---------|---------|--------|
| list    | [1, 2, 3]   | Yes     | Yes     | No      | O(N)   |
| tuple   | (1, 2, 3)   | Yes     | No      | No      | O(N)   |
| dict    | {"a": 1}    | Yes*    | Yes     | Keys    | O(1)   |
| set     | {1, 2, 3}   | No      | Yes     | Yes     | O(1)   |
*Dicts are insertion-ordered since Python 3.7+
`,
    interviewQuestions: [
      { question: 'What is the difference between mutable and immutable types in Python, and why does it matter?', answerHint: 'Mutable types (list, dict, set) can be changed in-place after creation. Immutable types (int, str, tuple) cannot. This matters because mutable objects passed to functions can be modified by the function (side effects), while immutable objects cannot. It also affects hashability — only immutable objects can be used as dictionary keys or set members.', type: 'TECHNICAL' },
      { question: 'Explain the mutable default argument trap in Python.', answerHint: 'If you write def f(items=[]): items.append(1), the default list [] is created once when the function is defined, not each invocation. The same list object is reused on every call, causing unexpected state accumulation. The fix is to use None as the default and initialize inside the function body with if items is None: items = [].', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Python Official Docs: An Informal Introduction', url: 'https://docs.python.org/3/tutorial/introduction.html', type: 'ARTICLE', priority: 'S', source: 'Python.org', isOfficial: true, description: 'The official Python tutorial covering syntax, types, and control flow.' },
      { title: 'Python Tutorial Full Course for Beginners', url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc', type: 'VIDEO', priority: 'S', source: 'Programming with Mosh', isOfficial: false, description: 'Comprehensive 6-hour Python fundamentals course.' }
    ]
  }
};
