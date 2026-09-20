export const ds_01_fund = {
  DS_FUNDAMENTALS: {
    title: 'Distributed Systems Fundamentals',
    description: 'Introduction to nodes, networks, partial failures, and why distributed systems are fundamentally different from single-node systems.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: [],
    learningContent: `
# Distributed Systems Fundamentals

A distributed system is a collection of independent computers that appears to its users as a single coherent system. 

## Why build a distributed system?
1. **Scalability:** To handle loads exceeding the capacity of a single machine.
2. **Reliability/Fault Tolerance:** To ensure the system stays up even if some machines fail.
3. **Low Latency:** To place data closer to users geographically.

## The Fallacies of Distributed Computing
Peter Deutsch and others at Sun Microsystems identified 8 false assumptions programmers make when moving from a single machine to a distributed system:
1. The network is reliable.
2. Latency is zero.
3. Bandwidth is infinite.
4. The network is secure.
5. Topology doesn't change.
6. There is one administrator.
7. Transport cost is zero.
8. The network is homogeneous.

## Partial Failure
In a single machine, software usually either works or crashes completely. In a distributed system, *partial failure* is the norm. A network packet might be dropped, a single node might freeze for 30 seconds doing Garbage Collection, or a switch might break. The system must be designed to tolerate and recover from partial failures.
`,
    fullNotes: `
# Detailed Notes: Fundamentals

- **Nodes and Networks:** The core building blocks. A node is a running process (usually on its own machine/container). They communicate exclusively by sending messages over an unreliable network.
- **Asynchrony:** Most distributed systems are asynchronous. This means there is no guaranteed upper bound on how long a message takes to deliver, or how long a node takes to process it. Because of this, it is impossible to distinguish between a *crashed* node and a *very slow* network.
- **Two Generals' Problem:** A famous thought experiment proving that over an unreliable link, it is impossible for two parties to guarantee that they have achieved a synchronized, coordinated state.
`,
    shortNotes: `
- A distributed system is multiple independent nodes acting as one.
- Built for Scalability, Fault Tolerance, and Geographic low latency.
- The Network is NEVER reliable. Latency is NEVER zero.
- Partial failures are inevitable and must be handled in software.
- In async networks, you cannot tell if a node is dead or just slow.
`,
    cheatSheet: `
### The 8 Fallacies
1. Network is reliable (False: Networks partition).
2. Latency is zero (False: Speed of light is a hard limit).
3. Bandwidth is infinite (False: Packets get dropped under load).
4. Network is secure (False: Zero-trust architecture is required).
5. Topology is static (False: Servers scale up and down constantly).
6. 1 Administrator (False: Multi-team ownership).
7. Transport is free (False: AWS charges for network egress).
8. Network is homogeneous (False: Mix of hardware, OS, runtimes).
`,
    interviewQuestions: [
      { question: 'What is a partial failure in a distributed system?', answerHint: 'Unlike a single computer which usually fails completely (e.g. power loss), a distributed system can have one component fail while others continue running. For example, the database might be slow, or a network link between two specific microservices might drop packets, while the rest of the system is healthy.', type: 'CONCEPTUAL' },
      { question: 'Why is it impossible to know for certain if a remote node has crashed in an asynchronous network?', answerHint: 'Because there is no upper bound on message delivery time. If you do not receive a heartbeat from a node, it could be dead, or it could simply be paused (e.g. GC pause), or the network switch connecting you could be temporarily congested. You can only guess using timeouts.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'The Fallacies of Distributed Computing', url: 'https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing', type: 'ARTICLE', priority: 'S', source: 'Wikipedia', isOfficial: false },
      { title: 'Designing Data-Intensive Applications (Book)', url: 'https://dataintensive.net/', type: 'BOOK', priority: 'S', source: 'Martin Kleppmann', isOfficial: true }
    ]
  }
};
