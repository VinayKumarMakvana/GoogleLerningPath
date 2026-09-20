export const py_08_async = {
  ASYNC_PYTHON_CONCURRENCY: {
    title: 'Async Python & Concurrency',
    description: 'Master asyncio, async/await, the GIL, and the difference between threading and multiprocessing.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 75,
    prerequisites: ['Functions, Iterators & Generators'],
    learningContent: `
# Async Python & Concurrency

## 1. The Global Interpreter Lock (GIL)
The GIL is a mutex inside CPython that ensures only one thread executes Python bytecode at a time. This is the most important Python concurrency fact:

- **Threading in Python is Concurrent but NOT Parallel** (for CPU-bound tasks).
- If Thread A and Thread B both try to increment a counter, the GIL ensures they take turns on a single core.
- **Exception: I/O operations release the GIL.** When a thread makes an HTTP request or reads a file, it releases the GIL, allowing other threads to run. This is why threading helps with I/O-bound code.

## 2. When to Use What
| Workload | Solution | Why |
|---|---|---|
| I/O-bound (HTTP, DB) | \`asyncio\` or \`threading\` | GIL is released during I/O |
| CPU-bound (math, ML) | \`multiprocessing\` | Each process has its own GIL |
| Mixed workloads | \`concurrent.futures\` | Thread/Process pool abstraction |

## 3. asyncio — Cooperative Concurrency (Event Loop)
asyncio achieves concurrency with a single thread by using an Event Loop.
- A coroutine yields control when it hits an \`await\` (e.g., waiting for a DB query).
- The Event Loop immediately switches to another coroutine.
- When the DB query returns, the original coroutine is resumed.

\`\`\`python
import asyncio
import aiohttp

async def fetch(session, url):
    async with session.get(url) as response:
        return await response.json()

async def main():
    async with aiohttp.ClientSession() as session:
        # Fetch all 3 URLs CONCURRENTLY (not sequentially)
        results = await asyncio.gather(
            fetch(session, "https://api1.example.com"),
            fetch(session, "https://api2.example.com"),
            fetch(session, "https://api3.example.com"),
        )
    print(results)

asyncio.run(main())
\`\`\`

## 4. multiprocessing — True Parallelism
\`\`\`python
from multiprocessing import Pool

def compute(n):
    return sum(range(n))

if __name__ == "__main__":
    with Pool(processes=4) as pool:   # 4 separate OS processes
        results = pool.map(compute, [1_000_000, 2_000_000, 3_000_000, 4_000_000])
    print(results)
\`\`\`
Each process has its own Python interpreter and GIL — true parallelism on multi-core CPUs.
`,
    fullNotes: `
# Detailed Notes: Async Python

- **\`asyncio.gather()\` vs \`asyncio.wait()\`:** \`gather()\` runs coroutines concurrently and returns results in the same order as the inputs. If one raises an exception, it propagates. \`wait()\` gives you more fine-grained control, returning done/pending sets.
- **Blocking in async code:** The most common asyncio anti-pattern is calling a blocking function inside a coroutine (e.g., using \`requests.get()\` instead of \`aiohttp\`). This blocks the entire event loop and kills all concurrency benefits. Use \`loop.run_in_executor()\` to offload blocking calls to a thread pool.
- **GIL Removal (PEP 703 / Python 3.13+):** Python 3.13 introduced a build option (No-GIL / free-threaded) to disable the GIL. This will eventually make true multi-core threading in Python possible.
`,
    shortNotes: `
- GIL: Only one thread executes Python bytecode at a time in CPython.
- I/O-bound: use asyncio (best) or threading (GIL is released during I/O waits).
- CPU-bound: use multiprocessing (each process has its own GIL).
- asyncio uses a single-threaded event loop with cooperative coroutines.
- 'await' yields control back to the event loop while waiting for I/O.
- NEVER call a blocking function inside an async coroutine without run_in_executor.
`,
    cheatSheet: `
### asyncio Essential Patterns
\`\`\`python
# Run a coroutine
asyncio.run(main())

# Concurrent execution (best for many I/O tasks)
results = await asyncio.gather(task1(), task2(), task3())

# With timeout
async with asyncio.timeout(5.0):  # Python 3.11+
    await slow_operation()

# Run blocking code in thread pool
result = await loop.run_in_executor(None, blocking_function, arg)
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is the Python GIL, and how does it affect threading for CPU-bound vs I/O-bound tasks?', answerHint: 'The GIL (Global Interpreter Lock) is a mutex in CPython that prevents multiple threads from executing Python bytecode simultaneously. For CPU-bound tasks (heavy computation), threading provides NO speedup because only one thread runs at a time. For I/O-bound tasks (network requests, file reads), threading is effective because the GIL is released while a thread waits for I/O, allowing other threads to run Python code. For CPU-bound parallelism, use multiprocessing, which spawns separate OS processes each with their own GIL.', type: 'TECHNICAL' },
      { question: 'What is the asyncio event loop, and how does it achieve concurrency without multiple threads?', answerHint: 'The asyncio event loop is a single-threaded scheduler that manages coroutines. When a coroutine hits an "await" expression for an I/O operation, it suspends itself and yields control back to the event loop. The event loop then runs another ready coroutine. When the I/O completes (signaled by the OS via select/epoll/kqueue), the event loop resumes the original coroutine. This cooperative concurrency is extremely efficient for I/O-heavy workloads.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'asyncio Documentation', url: 'https://docs.python.org/3/library/asyncio.html', type: 'ARTICLE', priority: 'S', source: 'Python.org', isOfficial: true, description: 'Official asyncio library documentation.' },
      { title: 'Python Asyncio Full Tutorial', url: 'https://www.youtube.com/watch?v=t5Bo1Je9EmE', type: 'VIDEO', priority: 'S', source: 'Tech With Tim', isOfficial: false, description: 'Comprehensive asyncio tutorial covering event loops, tasks, and gather.' }
    ]
  }
};
