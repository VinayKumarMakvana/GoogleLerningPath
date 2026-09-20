export const py_14_interview = {
  PYTHON_PRODUCTION_INTERVIEW: {
    title: 'Production Python & Interview Preparation',
    description: 'Production patterns, packaging, deployment, and senior Python engineering interview preparation.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 60,
    prerequisites: ['Python for AI/ML Engineering'],
    learningContent: `
# Production Python & Interview Preparation

## 1. Python Packaging & Modules
Understanding the import system prevents a huge class of bugs.
\`\`\`python
# Regular package: directory with __init__.py
# mypackage/
#   __init__.py   ← Makes it a package
#   utils.py
#   models.py

# Namespace package (Python 3.3+): directory WITHOUT __init__.py
# Allows splitting a package across multiple directories
\`\`\`

**Relative vs Absolute imports:**
\`\`\`python
# Absolute import (recommended)
from mypackage.utils import parse_date

# Relative import (within the same package)
from .utils import parse_date     # same level
from ..models import User          # one level up
\`\`\`

## 2. Production Python Patterns
\`\`\`python
# Use __all__ to define the public API of a module
# mypackage/utils.py
__all__ = ["parse_date", "format_currency"]  # Only these are exported

def parse_date(s): ...         # Public
def format_currency(v): ...    # Public
def _internal_helper(): ...    # Private (convention: underscore prefix)
\`\`\`

## 3. Defensive Python Practices
\`\`\`python
# Use assertions for invariants during development (not for user input validation)
def calculate_discount(price: float, rate: float) -> float:
    assert 0 <= rate <= 1, f"Rate {rate} must be between 0 and 1"
    return price * (1 - rate)

# Use dataclasses/Pydantic for all data boundaries
# Use logging, not print() in production code
import logging
logger = logging.getLogger(__name__)  # Module-scoped logger
\`\`\`

## 4. Key Python Interview Topics
1. **GIL and concurrency** (see Module 8)
2. **Memory management** — reference counting, cyclic GC, \`__del__\`
3. **Generators vs lists** — trade-offs, memory, lazy evaluation
4. **Decorators** — implementation, \`functools.wraps\`, stacking
5. **MRO** — C3 linearization, diamond inheritance
6. **Dunder methods** — when to implement each
7. **Dataclasses vs namedtuple vs TypedDict**
8. **Context managers** — \`__enter__\`/\`__exit__\`, \`@contextmanager\`
9. **Metaclasses** — basic concept (class of a class)
10. **NumPy vectorization vs Python loops**
`,
    fullNotes: `
# Detailed Notes: Production Python

- **sys.path and Import Order:** Python resolves imports by searching \`sys.path\`. The first match wins. Understanding this order (current directory, PYTHONPATH, virtual env site-packages, standard library) prevents mysterious import errors.
- **The if __name__ == "__main__" Guard:** When Python imports a module, it executes all top-level code. The guard \`if __name__ == "__main__":\` wraps code that should only run when the file is executed directly (not when imported). Always use it for script entry points.
- **Dependency Injection in Python:** Unlike Java/C#, Python does not need a DI framework for most cases. Passing dependencies as constructor arguments (or function parameters) is idiomatic and sufficient. Reserve frameworks like \`python-dependency-injector\` for very large applications.
`,
    shortNotes: `
- Use absolute imports. Relative imports only within a package.
- __all__ defines the public API of a module.
- Use underscore prefix (_helper) to signal private/internal names.
- Always use the if __name__ == "__main__": guard for script entry points.
- Use module-level loggers (logging.getLogger(__name__)) not print() in production.
- Key interview topics: GIL, generators, closures, decorators, MRO, data model.
`,
    cheatSheet: `
### Python Interview Quick Reference
| Topic            | Key Point                                        |
|-----------------|--------------------------------------------------|
| GIL             | One thread runs Python code at a time            |
| Threading       | Good for I/O-bound (GIL released during I/O)    |
| Multiprocessing | Good for CPU-bound (separate GIL per process)   |
| Generator       | Lazy, uses yield, memory efficient               |
| Decorator       | Wraps function, use @functools.wraps             |
| Context Manager | __enter__ / __exit__ or @contextmanager          |
| Dataclass       | Auto __init__, __repr__, __eq__ from annotations |
| MRO             | C3 linearization, inspect with __mro__           |
`,
    interviewQuestions: [
      { question: 'Explain how Python\'s memory management works.', answerHint: 'CPython uses two mechanisms. First, reference counting: every object tracks how many variables point to it. When the count drops to 0, memory is freed immediately. Second, a cyclic garbage collector handles reference cycles (A→B→A), where reference counts never reach 0 despite the objects being unreachable. The GC runs periodically to detect and collect these cycles. Python also uses memory pools (pymalloc) to efficiently manage small allocations under 512 bytes, reducing overhead from OS malloc calls.', type: 'TECHNICAL' },
      { question: 'What is a metaclass in Python?', answerHint: 'A metaclass is the class of a class. Just as a regular class defines the behavior of its instances, a metaclass defines the behavior of classes themselves. The default metaclass is "type". When Python creates a class with the class keyword, it calls the metaclass to build it. Metaclasses are used for advanced patterns like ORMs (SQLAlchemy uses them to generate column descriptors from class attributes), API frameworks, and enforcing coding standards. In practice, most tasks that seem to need metaclasses can be solved more cleanly with class decorators or __init_subclass__.', type: 'TECHNICAL' },
      { question: 'What is the difference between a list comprehension and a generator expression?', answerHint: 'Both use similar syntax but differ in evaluation and memory. A list comprehension (square brackets) evaluates immediately, building the entire list in memory at once. A generator expression (parentheses) evaluates lazily — it produces values one at a time only when requested via next() or in a for loop. For large or infinite sequences, generator expressions are dramatically more memory-efficient. Use list comprehensions when you need to access elements multiple times or by index; use generators for single-pass pipelines.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Fluent Python (Book)', url: 'https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/', type: 'BOOK', priority: 'S', source: "O'Reilly", isOfficial: false, description: 'The definitive deep-dive into Python internals and idiomatic Python.' },
      { title: 'Python Interview Questions', url: 'https://www.youtube.com/watch?v=DEwgZNC-KyE', type: 'VIDEO', priority: 'A', source: 'NeetCode', isOfficial: false, description: 'Top Python interview questions and answers for senior engineers.' }
    ]
  }
};
