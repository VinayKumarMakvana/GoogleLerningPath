export const py_05_exceptions = {
  EXCEPTIONS_FILES_CONTEXT: {
    title: 'Exceptions, Files & Context Managers',
    description: 'Master Python exception hierarchy, context managers, file I/O, and serialization.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['Python Fundamentals'],
    learningContent: `
# Exceptions, Files & Context Managers

## 1. Exception Hierarchy
All Python exceptions inherit from \`BaseException\`. User-facing exceptions inherit from \`Exception\`.

\`\`\`
BaseException
├── SystemExit
├── KeyboardInterrupt
└── Exception
    ├── ValueError
    ├── TypeError
    ├── OSError (includes FileNotFoundError, PermissionError)
    ├── RuntimeError
    └── ... (many more)
\`\`\`

\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
except (TypeError, ValueError) as e:
    print(f"Type or value error: {e}")
else:
    print("No exception occurred!")  # Only runs if no exception
finally:
    print("Always runs — use for cleanup")
\`\`\`

## 2. Creating Custom Exceptions
\`\`\`python
class DatabaseConnectionError(RuntimeError):
    """Raised when the database cannot be reached."""
    def __init__(self, host: str, port: int):
        super().__init__(f"Cannot connect to {host}:{port}")
        self.host = host
        self.port = port

try:
    raise DatabaseConnectionError("db.prod.com", 5432)
except DatabaseConnectionError as e:
    print(f"DB error at {e.host}: {e}")
\`\`\`

## 3. Context Managers (The \`with\` Statement)
Context managers ensure resources (files, DB connections, locks) are always cleaned up, even when exceptions occur.
\`\`\`python
# Pattern: acquire resource -> use resource -> release resource

# File handling (built-in context manager)
with open("data.txt", "r") as f:
    content = f.read()
# f.close() is called automatically, even if an exception occurs

# Custom context manager using contextlib
from contextlib import contextmanager

@contextmanager
def managed_connection(host):
    conn = create_connection(host)
    try:
        yield conn       # Control is given to the 'with' body here
    finally:
        conn.close()     # Always executed

with managed_connection("db.host") as conn:
    conn.query("SELECT 1")
\`\`\`

## 4. Serialization
\`\`\`python
import json

data = {"user": "Alice", "score": 99.5}

# Serialize to JSON string
json_str = json.dumps(data, indent=2)

# Write JSON to file
with open("data.json", "w") as f:
    json.dump(data, f)

# Read JSON from file
with open("data.json", "r") as f:
    loaded = json.load(f)
\`\`\`
`,
    fullNotes: `
# Detailed Notes: Exceptions & Context Managers

- **Exception Chaining:** When catching one exception and raising another, use \`raise NewError() from original_error\` to chain them. This preserves the full traceback context. Plain \`raise NewError()\` inside an \`except\` block also implicitly chains, but explicit is better.
- **Implementing __enter__ and __exit__:** You can make any class a context manager by implementing these two dunder methods. \`__exit__\` receives three arguments representing the exception type, value, and traceback. If it returns \`True\`, the exception is suppressed; if it returns \`None\` or \`False\`, the exception propagates.
`,
    shortNotes: `
- Use specific exception types in except clauses (not bare 'except:').
- 'else' block runs only when no exception was raised in 'try'.
- 'finally' block always runs — ideal for cleanup (closing connections).
- Custom exceptions should inherit from Exception with meaningful names.
- Context managers (__enter__/__exit__) guarantee cleanup even on exceptions.
- Use @contextmanager from contextlib for simple context manager creation.
`,
    cheatSheet: `
### File Opening Modes
| Mode | Action                                      |
|------|---------------------------------------------|
| 'r'  | Read (default)                              |
| 'w'  | Write (truncate/create)                     |
| 'a'  | Append                                      |
| 'r+' | Read and write (must exist)                 |
| 'b'  | Binary mode (combine: 'rb', 'wb')           |

Always use \`with open(...) as f:\` — never call \`f.close()\` manually.
`,
    interviewQuestions: [
      { question: 'What is the purpose of the "finally" clause in a try/except block?', answerHint: 'The finally clause always executes, regardless of whether an exception was raised or caught. It is used for cleanup operations that must always happen, such as closing a file, releasing a database connection, or releasing a lock. This guarantees that resources are freed even in exceptional paths.', type: 'TECHNICAL' },
      { question: 'How do context managers work in Python, and how can you implement a custom one?', answerHint: 'A context manager is any object implementing __enter__ and __exit__ methods. When a "with" statement executes, it calls __enter__ and binds the return value to the "as" variable. When the block exits (normally or via exception), it calls __exit__ with exception information. If __exit__ returns True, the exception is suppressed. A simpler alternative for creating custom context managers is using the @contextmanager decorator from contextlib, which turns a generator function with a yield into a context manager.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Python Error Handling (Official)', url: 'https://docs.python.org/3/tutorial/errors.html', type: 'ARTICLE', priority: 'S', source: 'Python.org', isOfficial: true, description: 'Official Python tutorial on exceptions and error handling.' },
      { title: 'Python Context Managers', url: 'https://www.youtube.com/watch?v=-aKFBoZpiqA', type: 'VIDEO', priority: 'S', source: 'Corey Schafer', isOfficial: false, description: 'Context managers and the with statement explained clearly.' }
    ]
  }
};
