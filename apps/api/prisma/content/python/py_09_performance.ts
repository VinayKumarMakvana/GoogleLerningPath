export const py_09_performance = {
  PYTHON_PERFORMANCE: {
    title: 'Performance & Profiling',
    description: 'Profile Python code, identify bottlenecks, and use Cython/Numba/efficient data structures for optimization.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 60,
    prerequisites: ['Async Python & Concurrency'],
    learningContent: `
# Python Performance & Profiling

## 1. Measure Before Optimizing
The cardinal rule of performance: **Never optimize without profiling first.** Intuition is almost always wrong about where the bottleneck actually is.

\`\`\`python
import cProfile
import pstats

# Profile a function
with cProfile.Profile() as pr:
    run_my_algorithm()

stats = pstats.Stats(pr)
stats.sort_stats("cumulative")
stats.print_stats(20)  # Print top 20 slowest functions
\`\`\`

Or use **line_profiler** for line-by-line analysis:
\`\`\`bash
pip install line_profiler
kernprof -l -v my_script.py
\`\`\`

## 2. timeit for Micro-benchmarking
\`\`\`python
import timeit

# Compare list vs set for membership test
list_time = timeit.timeit('x in data', setup='data = list(range(100_000)); x = 99_999', number=1000)
set_time  = timeit.timeit('x in data', setup='data = set(range(100_000)); x = 99_999', number=1000)

print(f"List: {list_time:.3f}s")  # ~0.500s
print(f"Set:  {set_time:.3f}s")   # ~0.000s
\`\`\`

## 3. Memory Profiling
\`\`\`bash
pip install memory_profiler
python -m memory_profiler my_script.py
\`\`\`

## 4. Common Python Performance Pitfalls
- **String concatenation in a loop:** \`s += "text"\` creates a new string object on every iteration (\`O(N^2)\`). Use \`"".join(list_of_strings)\` (\`O(N)\`).
- **Repeated dict/list lookups in a loop:** Cache the result in a local variable before the loop.
- **Using a list where you need a set:** \`x in my_list\` is \`O(N)\`. \`x in my_set\` is \`O(1)\`.
- **Not using local variables in tight loops:** Python resolves local variables faster than global ones.

## 5. NumPy for Vectorization (Preview)
For numerical operations, avoid Python loops entirely. NumPy uses C/Fortran loops internally.
\`\`\`python
import numpy as np

# Slow Python loop (1 million iterations)
result = [x**2 for x in range(1_000_000)]     # ~200ms

# Fast NumPy vectorized operation (no Python loop)
arr = np.arange(1_000_000)
result = arr**2                                 # ~1ms (200x faster)
\`\`\`
`,
    fullNotes: `
# Detailed Notes: Python Performance

- **Cython:** A superset of Python that compiles to C. Add type declarations to hot paths (\`cdef int x\`) and get near C-speed performance. Used heavily in NumPy, pandas, and scikit-learn internally.
- **Numba:** JIT (Just-In-Time) compiler for Python numerical code. Decorate your function with \`@numba.jit(nopython=True)\` and Numba compiles it to optimized machine code on the first call. Best for numerical loops that are hard to vectorize with NumPy.
- **PyPy:** An alternative Python interpreter (not CPython) with a JIT compiler. Runs standard Python code 4-10x faster without any code changes, but has compatibility issues with C extension modules (like NumPy).
`,
    shortNotes: `
- Profile before optimizing. Use cProfile or line_profiler.
- String concatenation in loops is O(N^2). Use ''.join(parts).
- 'in' check: list is O(N), set is O(1). Use sets for membership tests.
- NumPy vectorization replaces Python loops with C loops (100x+ faster).
- Numba JIT compiles numerical functions to native machine code.
- Use memory_profiler to identify memory leaks and excessive allocations.
`,
    cheatSheet: `
### Python Performance Anti-Patterns
| Anti-Pattern          | Fix                          |
|-----------------------|------------------------------|
| s += "x" in a loop   | ''.join(parts)               |
| x in my_list          | x in my_set (if order doesn't matter) |
| loop over range N for math | np.vectorize / np.arange |
| Building list then converting | Use generator expressions |
`,
    interviewQuestions: [
      { question: 'Why is string concatenation in a loop inefficient in Python, and what is the idiomatic fix?', answerHint: 'Strings in Python are immutable. Every concatenation (s += "x") creates an entirely new string object, copies all existing characters, and adds the new character. In a loop of N iterations, this results in O(N^2) total work. The idiomatic solution is to collect the string parts in a list and join them once at the end with "".join(parts), which is O(N).', type: 'TECHNICAL' },
      { question: 'What tools would you use to diagnose a Python performance problem in production?', answerHint: 'First, I would use cProfile to identify the top functions consuming the most CPU time. For line-level detail within a specific hot function, I would use line_profiler. For memory issues (leaks or excessive allocations), I would use memory_profiler or tracemalloc (built-in). In production, I would instrument the application with a profiling tool like py-spy, which can profile a running process without stopping it or modifying the code.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Python Performance Tips', url: 'https://wiki.python.org/moin/PythonSpeed/PerformanceTips', type: 'ARTICLE', priority: 'S', source: 'Python Wiki', isOfficial: true, description: 'Official Python wiki on performance tips.' },
      { title: 'Profiling Python Code', url: 'https://www.youtube.com/watch?v=8qEnExGLZfY', type: 'VIDEO', priority: 'A', source: 'ArjanCodes', isOfficial: false, description: 'Practical guide to profiling and optimizing Python code.' }
    ]
  }
};
