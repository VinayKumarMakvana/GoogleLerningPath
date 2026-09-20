export const eng_08_perf = {
  PERFORMANCE_ENGINEERING: {
    title: 'Performance Engineering',
    description: 'Understand the physical limits of hardware: CPU cache lines, Memory alignment, and I/O bottlenecks.',
    difficulty: 'EXPERT',
    estimatedLearnTime: 60,
    prerequisites: ['Concurrency & Parallel Programming'],
    learningContent: `
# Performance Engineering

Writing fast code requires understanding exactly how the hardware executes your instructions. The speed of light and physical distance dictate latency.

## 1. The Memory Hierarchy (Numbers every programmer should know)
Accessing data takes time depending on where it lives:
- L1 Cache (CPU): ~1 ns (Instant)
- L2 Cache (CPU): ~4 ns
- Main Memory (RAM): ~100 ns (100x slower than L1)
- SSD (Disk): ~16,000 ns
- HDD (Disk): ~2,000,000 ns
- Network (Round trip within same datacenter): ~500,000 ns
- Network (California to Europe): ~150,000,000 ns

**Conclusion:** If your algorithm reads from Disk in a loop, no amount of algorithmic Big-O optimization will make it fast. You are I/O bound.

## 2. CPU Cache and Data Locality
CPUs do not read 1 byte from RAM. They read a 64-byte "Cache Line". 
If you iterate over an Array (where items are physically next to each other in RAM), the CPU pulls the first item, and gets the next 63 bytes for free, storing them in the lightning-fast L1 cache. This is a **Cache Hit**.
If you iterate over a Linked List (where items are scattered randomly across RAM via pointers), the CPU pulls the first item, goes to get the second item, realizes it isn't in the L1 cache (**Cache Miss**), and has to wait 100ns to fetch it from RAM again.
*Data structures with contiguous memory (Arrays/Vectors) are exponentially faster on modern CPUs than node-based structures (Linked Lists/Trees).*

## 3. I/O Bound vs CPU Bound
- **CPU Bound:** The application is doing heavy math (Video encoding, cryptography, image processing). The CPUs are at 100%. *Fix: Write better algorithms, use C++/Rust, add more cores (Parallelism).*
- **I/O Bound:** The application is waiting for a Database, a Disk read, or a Network call. The CPUs are at 5% because they are sleeping, waiting for data. *Fix: Use Caching (Redis), Connection Pooling, or Async/Await non-blocking I/O.*
`,
    fullNotes: `
# Detailed Notes: Performance

- **Branch Prediction:** Modern CPUs try to guess the outcome of an \`if\` statement and execute the code *before* the condition is actually evaluated to save time. If they guess wrong, they have to flush the pipeline and start over (Branch Misprediction penalty). Sorting an array *before* iterating over it with an \`if\` statement can make the loop run 5x faster because the CPU's branch predictor easily learns the pattern (all false, then all true).
- **False Sharing:** When two different threads on two different CPU cores modify two independent variables that happen to sit on the same 64-byte cache line in memory. CPU 1 invalidates the cache line for CPU 2, causing massive performance degradation, even though the threads share no logical data.
`,
    shortNotes: `
- Latency Numbers: L1 Cache (1ns) -> RAM (100ns) -> SSD (16us) -> Network (150ms).
- Contiguous memory (Arrays) is vastly faster than pointer-based memory (Linked Lists) due to CPU Cache Hits.
- I/O Bound: App is slow because it's waiting on disks or networks. (Use Async/Redis).
- CPU Bound: App is slow because of heavy math. (Use Parallelism/C++).
- Branch Prediction: CPUs guess the result of 'if' statements to save time. Unpredictable branches are slow.
`,
    cheatSheet: `
### Optimization Hierarchy
Before writing assembly code, ensure you aren't doing something fundamentally slow:
1. **Network Layer:** Batch API calls (don't make 100 HTTP requests in a loop).
2. **Database Layer:** Add missing indexes, avoid N+1 queries.
3. **Application Layer:** Cache heavy computations in Redis.
4. **Algorithmic Layer:** Change O(N^2) to O(N log N).
5. **Hardware Layer:** Optimize CPU cache lines (Data-Oriented Design).
`,
    interviewQuestions: [
      { question: 'What is the difference between an I/O bound application and a CPU bound application?', answerHint: 'An I/O bound application is constrained by the speed of external systems—disk reads, database queries, or network calls. Its CPU utilization is typically very low because the CPU is constantly idle, waiting for data to arrive. A CPU bound application is constrained by the processor speed because it is performing heavy computations (like cryptography or rendering). Optimizing an I/O bound app requires caching or async non-blocking I/O, while optimizing a CPU bound app requires better algorithms or parallelism.', type: 'TECHNICAL' },
      { question: 'Why is iterating over an Array often significantly faster than iterating over a Linked List on modern hardware, even though both are O(N) operations?', answerHint: 'The speed difference is due to CPU Caching and Data Locality. An array stores data in contiguous memory. When the CPU fetches the first element from RAM, it pulls the surrounding 64 bytes into the ultra-fast L1 cache. Subsequent array elements result in "Cache Hits" and resolve in ~1ns. A Linked List stores nodes scattered randomly across RAM. Fetching the next node almost always results in a "Cache Miss," forcing the CPU to fetch from main RAM, which takes ~100ns (100x slower).', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Latency Numbers Every Programmer Should Know', url: 'https://gist.github.com/jboner/2841832', type: 'ARTICLE', priority: 'S', source: 'Jonas Bonér', isOfficial: false }
    ]
  }
};
