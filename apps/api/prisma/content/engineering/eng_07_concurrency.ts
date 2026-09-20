export const eng_07_concurrency = {
  CONCURRENCY_PARALLELISM: {
    title: 'Concurrency & Parallel Programming',
    description: 'Understand the difference between Concurrency and Parallelism, Race Conditions, Deadlocks, and synchronization primitives.',
    difficulty: 'EXPERT',
    estimatedLearnTime: 90,
    prerequisites: [],
    learningContent: `
# Concurrency & Parallel Programming

As Moore's Law slows down, single-core CPU speeds have peaked. To make software faster today, you must write code that utilizes multiple cores simultaneously. 

## 1. Concurrency vs Parallelism
- **Concurrency:** Dealing with multiple things at once. (e.g., A single bartender taking an order from Customer A, then pausing to pour a beer for Customer B, then returning to Customer A). The OS quickly context-switches a single CPU core between multiple threads.
- **Parallelism:** Doing multiple things at exactly the same time. (e.g., Two bartenders serving two customers simultaneously). Requires multiple physical CPU cores.

## 2. Race Conditions
When two concurrent threads access shared state (memory) at the same time, and at least one of them modifies it.
- *Example:* Thread A reads \`balance = 100\`. Thread B reads \`balance = 100\`. Thread A adds 50 and writes \`150\`. Thread B adds 20 and writes \`120\`. The final balance is 120, and the $50 from Thread A is lost forever.

## 3. Synchronization Primitives
To prevent race conditions, we must synchronize access to shared memory.
- **Mutex (Mutual Exclusion Lock):** A thread must "acquire" the lock before accessing a variable. If Thread B tries to acquire a lock already held by Thread A, Thread B is put to sleep until Thread A releases it.
- **Semaphores:** Like a bouncer at a club. A Mutex allows 1 thread in; a Semaphore allows N threads in (e.g., limiting a DB connection pool to 10 concurrent threads).

## 4. Deadlocks
The nightmare of concurrent programming.
- Thread A acquires Lock 1.
- Thread B acquires Lock 2.
- Thread A tries to acquire Lock 2 (and blocks, waiting for B).
- Thread B tries to acquire Lock 1 (and blocks, waiting for A).
- Both threads wait forever. The application hangs permanently.

## 5. Async / Await (The Event Loop)
Languages like JavaScript and Python use a single-threaded Event Loop. They achieve Concurrency (not Parallelism) using non-blocking I/O. When JS makes a 2-second database call, it doesn't block the CPU thread; it delegates the waiting to the OS and moves on to serve the next HTTP request. When the DB returns, the callback is pushed to the Event Queue.
`,
    fullNotes: `
# Detailed Notes: Concurrency

- **Amdahl's Law:** A formula that finds the maximum improvement to a system when only *part* of the system can be parallelized. If 90% of your program can run in parallel across 100 cores, but 10% is strictly sequential (must run on 1 core), the maximum possible speedup of your program is exactly 10x, no matter how many thousands of cores you add.
- **Message Passing (Actor Model / CSP):** Because shared memory + Mutexes is notoriously difficult for humans to write without causing Deadlocks, modern languages (like Go with Goroutines/Channels, or Erlang with Actors) prefer Message Passing. *“Do not communicate by sharing memory; instead, share memory by communicating.”*
`,
    shortNotes: `
- Concurrency: Juggling multiple tasks on 1 core via context switching.
- Parallelism: Executing tasks simultaneously on multiple cores.
- Race Condition: Two threads modifying shared memory at the exact same time, corrupting data.
- Mutex: A lock that ensures only 1 thread accesses a variable at a time.
- Deadlock: Two threads waiting on each other's locks forever.
- Async/Await (Event Loop): Single-threaded concurrency via non-blocking I/O.
`,
    cheatSheet: `
### Coffman Conditions (Requirements for a Deadlock)
All 4 must be true for a deadlock to occur:
1. Mutual Exclusion (Locks exist)
2. Hold and Wait (A thread holds a lock while waiting for another)
3. No Preemption (Locks cannot be forcefully taken away)
4. Circular Wait (A waits for B, B waits for A)
`,
    interviewQuestions: [
      { question: 'What is the difference between Concurrency and Parallelism?', answerHint: 'Concurrency is a program structure that deals with managing multiple tasks at once, often by rapidly context-switching a single CPU core between threads (like the Node.js Event Loop). Parallelism is the physical execution of multiple tasks at the exact same instant in time, which strictly requires multiple physical CPU cores.', type: 'CONCEPTUAL' },
      { question: 'Explain what a Deadlock is and how you can prevent it architecturally.', answerHint: 'A deadlock occurs when two or more threads are permanently blocked, each waiting for a lock held by the other (e.g., Thread A holds Lock 1 and wants Lock 2; Thread B holds Lock 2 and wants Lock 1). One common architectural way to prevent deadlocks is to enforce a strict lock ordering hierarchy: always require all threads to acquire Lock 1 before they are allowed to request Lock 2. This breaks the "Circular Wait" condition.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Concurrency is not Parallelism', url: 'https://www.youtube.com/watch?v=oV9rvDllKEg', type: 'VIDEO', priority: 'S', source: 'Rob Pike (Co-creator of Go)', isOfficial: false }
    ]
  }
};
