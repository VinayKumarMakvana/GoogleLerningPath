export const obs_11_perf = {
  PERFORMANCE_PROFILING: {
    title: 'Performance Engineering & Profiling',
    description: 'Go beyond basic metrics. Learn CPU profiling, flame graphs, and memory leak detection.',
    difficulty: 'EXPERT',
    estimatedLearnTime: 60,
    prerequisites: ['Metrics & Instrumentation'],
    learningContent: `
# Performance Engineering & Profiling

Metrics tell you that CPU is at 100%. They do not tell you *which exact line of code* is consuming the CPU. For that, you need Profiling.

## 1. What is a Profiler?
A profiler is a tool that analyzes the execution of a program, measuring the frequency and duration of function calls, memory usage, and thread blocking.
- **Instrumentation Profiler:** Injects code into every function to track exactly when it starts and ends. (High overhead, bad for production).
- **Sampling Profiler:** Pauses the program 100 times a second, looks at the Call Stack (what function is currently running), records it, and resumes. By aggregating these samples, it statistically determines where the program spends most of its time. (Low overhead, excellent for continuous production profiling).

## 2. Flame Graphs
The industry standard for visualizing profiling data, created by Brendan Gregg.
- The **x-axis** represents the population of the profile (alphabetical, NOT chronological time). The wider the box, the more CPU time that function consumed.
- The **y-axis** represents the call stack depth (Function A called Function B called Function C).
- You look for the widest boxes at the top of the "flames". That is your CPU bottleneck.

## 3. Continuous Profiling
Modern SRE practice involves running sampling profilers in production 24/7 (using tools like Pyroscope or Datadog Continuous Profiler). 
If CPU spikes at 3 AM on a Sunday, you don't have to try to reproduce it on Monday morning. You simply look at the flame graph recorded at 3 AM to instantly see the buggy function.

## 4. Memory Profiling (Heap Dumps)
If memory usage steadily increases over a week and the server crashes (Out of Memory - OOM), you have a Memory Leak.
- You capture a **Heap Dump** (a snapshot of all objects in RAM).
- You capture a second Heap Dump an hour later.
- You diff the two dumps. The objects that increased in number and size (and were not garbage collected) are the source of your leak.
`,
    fullNotes: `
# Detailed Notes: Profiling

- **eBPF (Extended Berkeley Packet Filter):** A revolutionary Linux kernel technology. It allows you to run sandboxed programs directly inside the OS kernel without changing kernel source code. eBPF is used by modern profilers and security tools to observe network packets, file I/O, and CPU scheduling with near-zero overhead.
- **Garbage Collection (GC) Pauses:** In languages like Java, Node, or Go, the runtime must periodically pause the application to clean up unused memory. If your application creates millions of short-lived objects, the GC will have to work constantly, causing massive p99 latency spikes (Stop-the-World pauses). Memory profiling helps you find and eliminate these object allocations.
`,
    shortNotes: `
- Metrics show the symptom (High CPU). Profiling shows the cause (Line 42).
- Sampling Profilers: Low overhead, safe for production.
- Flame Graphs: Visualize CPU usage. Look for the widest boxes at the top.
- Continuous Profiling: Record profiles 24/7 to catch intermittent issues.
- Memory Leaks: Debugged by diffing two Heap Dumps over time.
- eBPF: High-performance Linux kernel observability technology.
`,
    cheatSheet: `
### Reading a Flame Graph
- **Top Edge:** Shows the functions actually executing on the CPU.
- **Width:** Shows the total time spent in that function and its children.
- **Colors:** Usually meaningless (randomized to differentiate boxes).
`,
    interviewQuestions: [
      { question: 'What is a Flame Graph and how do you read one to find a CPU bottleneck?', answerHint: 'A Flame Graph is a visualization of hierarchical profiling data. The y-axis shows the call stack depth (who called whom), and the x-axis shows the total percentage of CPU time consumed (it is not chronological time). To find a bottleneck, you look at the top edge of the graph for the widest boxes; these represent the specific functions that are actively occupying the most CPU time.', type: 'TECHNICAL' },
      { question: 'What is the difference between an Instrumentation Profiler and a Sampling Profiler, and which is safe for Production?', answerHint: 'An instrumentation profiler modifies the code to record exact start and stop times for every function call. It is 100% accurate but introduces massive overhead, making it unsafe for production. A sampling profiler interrupts the CPU (e.g., 100 times a second), takes a snapshot of the current call stack, and resumes. It has extremely low overhead (usually < 2%) and is therefore safe for continuous production profiling.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'The Flame Graph', url: 'https://www.brendangregg.com/flamegraphs.html', type: 'ARTICLE', priority: 'S', source: 'Brendan Gregg', isOfficial: true }
    ]
  }
};
