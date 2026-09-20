export const py_03_functions = {
  FUNCTIONS_ITERATORS_GENERATORS: {
    title: 'Functions, Iterators & Generators',
    description: 'Master closures, decorators, lazy evaluation with generators, and the iterator protocol.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 75,
    prerequisites: ['Python Data Model & Language Internals'],
    learningContent: `
# Functions, Iterators & Generators

Python functions are first-class objects — they can be stored in variables, passed as arguments, and returned from other functions. This is the basis of functional programming and decorators.

## 1. Functions as First-Class Objects
\`\`\`python
def greet(name):
    return f"Hello, {name}!"

say_hello = greet          # Assign function to variable
print(say_hello("Alice"))  # Hello, Alice!

funcs = [greet, str.upper]  # Store in a list
\`\`\`

## 2. Closures
A closure is a function that retains access to variables from its enclosing scope, even after the outer function has finished executing.
\`\`\`python
def make_multiplier(factor):
    def multiply(x):
        return x * factor  # 'factor' is captured from the outer scope
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)
print(double(5))  # 10
print(triple(5))  # 15
\`\`\`

## 3. Decorators
A decorator is a function that takes another function, wraps it with additional behavior, and returns the modified function.
\`\`\`python
import functools, time

def timer(func):
    @functools.wraps(func)  # Preserves original function metadata (__name__, __doc__)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        end = time.perf_counter()
        print(f"{func.__name__} took {end - start:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(0.1)

slow_function()  # slow_function took 0.1001s
\`\`\`

## 4. The Iterator Protocol
Any object that implements \`__iter__()\` (returns self) and \`__next__()\` (returns the next value or raises \`StopIteration\`) is an iterator.

## 5. Generators — Lazy Sequences
A generator function uses \`yield\` instead of \`return\`. It creates a lazy iterator that computes values on demand, never storing the entire sequence in memory.
\`\`\`python
def fibonacci():
    a, b = 0, 1
    while True:
        yield a          # Pauses execution here and returns 'a'
        a, b = b, a + b  # Resumes from here on the next call

fib = fibonacci()
print([next(fib) for _ in range(10)])  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
\`\`\`
This generates Fibonacci numbers INFINITELY without holding them all in memory.
`,
    fullNotes: `
# Detailed Notes: Functions & Generators

- **\`functools.wraps\`:** When you wrap a function in a decorator, the wrapper replaces the original. Without \`@functools.wraps(func)\`, \`wrapped_func.__name__\` would return \`"wrapper"\` instead of the original name. This breaks documentation tools, logging, and debugging. Always use it.
- **Generator pipelines:** Generators compose beautifully. You can chain them to create memory-efficient data processing pipelines for large datasets: \`numbers = (x for x in range(1_000_000)); evens = (x for x in numbers if x % 2 == 0); total = sum(evens)\`. This processes 1 million numbers without ever building a 1-million element list.
- **\`yield from\`:** Allows a generator to delegate to another iterator/generator cleanly, flattening the logic.
`,
    shortNotes: `
- Functions are first-class objects in Python (storeable, passable, returnable).
- Closures capture variables from their enclosing scope after that scope ends.
- Decorators wrap functions with additional behavior without modifying the original.
- Always use @functools.wraps to preserve metadata when writing decorators.
- Generators use 'yield' to produce values lazily — no full list built in memory.
- Generators are ideal for infinite sequences and large file processing.
`,
    cheatSheet: `
### Generator vs List Comprehension
\`\`\`python
# List — builds entire list in memory immediately
squares_list = [x**2 for x in range(1_000_000)]  # ~8MB RAM

# Generator — lazy, produces one value at a time
squares_gen = (x**2 for x in range(1_000_000))   # ~200 bytes RAM
\`\`\`
Use generators whenever you don't need all values at once.
`,
    interviewQuestions: [
      { question: 'What is a closure in Python, and provide a practical use case.', answerHint: 'A closure is a function that captures and retains a reference to variables from its enclosing lexical scope, even after that scope has finished executing. A practical use case is creating factory functions: a make_adder(n) factory function returns a closure that adds n to its argument. This is useful for creating specialized, pre-configured functions without requiring a class.', type: 'TECHNICAL' },
      { question: 'What is the difference between a generator function and a regular function in Python?', answerHint: 'A regular function uses return and computes/returns its entire result at once. A generator function uses yield. When called, it does not execute at all; it returns a generator object. Execution only proceeds when you call next() on it, running until the next yield statement, which pauses execution and returns the yielded value. This lazy evaluation is crucial for memory efficiency when processing large datasets or implementing infinite sequences.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Python Generators', url: 'https://docs.python.org/3/tutorial/classes.html#generators', type: 'ARTICLE', priority: 'S', source: 'Python.org', isOfficial: true, description: 'Official Python documentation on generators.' },
      { title: 'Python Decorators, Closures and Generators', url: 'https://www.youtube.com/watch?v=9oyr0mocZTg', type: 'VIDEO', priority: 'S', source: 'Corey Schafer', isOfficial: false, description: 'In-depth Corey Schafer series on Python functions and generators.' }
    ]
  }
};
