export const ds_02_time = {
  COMMUNICATION_TIME: {
    title: 'Communication, Time & Ordering',
    description: 'Understand the impossibility of physical clocks in distributed systems, Lamport timestamps, and Vector clocks.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 120,
    prerequisites: ['Distributed Systems Fundamentals'],
    learningContent: `
# Communication, Time & Ordering

In a single machine, determining the order of events is easy: just look at the system clock. In a distributed system, **you cannot trust physical time.**

## The Problem with Physical Clocks
- **Clock Drift:** Quartz crystals run at slightly different speeds depending on temperature. Clocks on different servers will drift apart.
- **NTP (Network Time Protocol):** Servers sync their clocks with time servers. However, network latency makes this imperfect (often off by milliseconds). Furthermore, NTP can cause clocks to *jump backwards* to correct themselves, completely destroying causality (e.g., Event B happens after Event A, but gets a timestamp that is earlier).

## Logical Clocks
Because physical time is unreliable, distributed systems use *logical time* (counters) to determine the order of events (Causality).

### Lamport Clocks
Invented by Leslie Lamport. 
- Every node keeps a simple integer counter.
- Before a node does anything, it increments its counter.
- When a node sends a message, it includes its counter.
- When a node receives a message, it sets its counter to \`MAX(local_counter, message_counter) + 1\`.
- **Limitation:** If Event A has a smaller Lamport timestamp than Event B, you *cannot* guarantee that A caused B. You only know that if A caused B, A definitely has a smaller timestamp.

### Vector Clocks
Solves the limitation of Lamport Clocks by keeping an array (vector) of counters, one for every node in the system.
- Allows you to detect concurrent events (conflicts) that must be resolved by the application.
- Used heavily in databases like DynamoDB and Riak.
`,
    fullNotes: `
# Detailed Notes: Time & Ordering

- **Causality:** The most important concept in distributed ordering. If Event A leads to Event B (e.g., A is "User adds item to cart", B is "User checks out"), the system MUST preserve this order.
- **Google TrueTime:** Google built atomic clocks and GPS receivers into every data center to solve the clock drift problem in hardware. TrueTime returns a time *range* (earliest and latest possible time). Google Spanner database just waits out this tiny uncertainty window to guarantee global serializability without Vector Clocks.
`,
    shortNotes: `
- Never trust physical clocks (NTP drift, leap seconds, backwards jumps).
- Lamport Clocks: Simple integer counters. Guarantees that if A causes B, L(A) < L(B).
- Vector Clocks: Arrays of counters. Detects concurrent updates and causality perfectly.
- Google TrueTime: Hardware solution using Atomic/GPS clocks to bound time uncertainty.
- Causality: The fundamental reason we care about ordering (A happened before B).
`,
    cheatSheet: `
### Happened-Before Relation (->)
If A -> B (A happened before B), then:
- A and B occurred on the same node, and A executed first.
- A is the event of sending a message, and B is the event of receiving that same message.
- Transitivity: If A -> B and B -> C, then A -> C.
If neither A -> B nor B -> A, the events are **Concurrent**.
`,
    interviewQuestions: [
      { question: 'Why can we not rely on system physical clocks to order events in a distributed system?', answerHint: 'Physical clocks suffer from clock drift and rely on NTP for synchronization. NTP synchronization can be delayed by network latency, and can even cause clocks to step backwards. This means an event that happens strictly after another event could get an earlier timestamp, breaking causality.', type: 'TECHNICAL' },
      { question: 'What problem do Vector Clocks solve that Lamport Clocks do not?', answerHint: 'Lamport Clocks cannot tell you if two events were concurrent. If L(A) < L(B), A might have happened before B, or they might be completely unrelated (concurrent). Vector Clocks allow you to perfectly determine if A happened before B, B happened before A, or if they are concurrent (requiring conflict resolution).', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Time, Clocks, and the Ordering of Events in a Distributed System', url: 'https://lamport.azurewebsites.net/pubs/time-clocks.pdf', type: 'ARTICLE', priority: 'S', source: 'Leslie Lamport (1978)', isOfficial: true }
    ]
  }
};
