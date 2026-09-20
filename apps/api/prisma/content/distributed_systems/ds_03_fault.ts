export const ds_03_fault = {
  FAILURE_MODELS: {
    title: 'Failure Models & Fault Tolerance',
    description: 'Understand Crash-Stop, Crash-Recovery, and Byzantine failures, and how to design fault-tolerant systems.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['Distributed Systems Fundamentals'],
    learningContent: `
# Failure Models & Fault Tolerance

To build a reliable system out of unreliable components, we must first categorize exactly how things can fail.

## Node Failure Models
1. **Crash-Stop (Fail-Stop):** A node executes correctly, and then simply stops working permanently. (The easiest to handle).
2. **Crash-Recovery:** A node crashes, loses its volatile memory (RAM), but later restarts with its persistent storage (Disk) intact. (Most common in the real world).
3. **Byzantine Failures:** A node continues to run, but acts arbitrarily. It might send corrupt data, send conflicting data to different nodes, or actively act maliciously. (Extremely hard to handle. Crucial in blockchains, less relevant in secure internal corporate networks).

## Network Failure Models
- **Reliable Link:** Messages are always delivered exactly once. (Does not exist in reality).
- **Fair-Loss Link:** Messages may be dropped, but if you retry infinitely, it will eventually be delivered.
- **Arbitrary (Byzantine) Link:** Messages can be corrupted, duplicated, or created out of thin air. (Solved by TLS/TCP checksums).

## Fault Tolerance Techniques
- **Redundancy:** Having multiple copies of data (Replication) or multiple stateless servers (Load Balancing).
- **Timeouts & Heartbeats:** If Node A doesn't hear a heartbeat from Node B in 5 seconds, Node A assumes Node B is dead.
- **Idempotency:** Because networks are Fair-Loss, we must retry failed messages. Because of retries, we might process the same message twice. Therefore, operations must be Idempotent (safe to run multiple times).
`,
    fullNotes: `
# Detailed Notes: Failures

- **The Byzantine Generals Problem:** A logical dilemma where generals surrounding a city must agree to attack or retreat. Some generals are traitors sending false messages. To achieve consensus, more than 2/3 of the generals must be loyal. (Requires \`3f + 1\` nodes to tolerate \`f\` Byzantine failures).
- **Crash-Fault Tolerance (CFT):** Most internal distributed databases (Raft/Paxos) only assume Crash-Recovery failures, not Byzantine. They require \`2f + 1\` nodes to tolerate \`f\` failures (e.g., 5 nodes can tolerate 2 crashing).
`,
    shortNotes: `
- Crash-Stop: Dies and never comes back.
- Crash-Recovery: Dies, loses RAM, reboots from Disk (most common).
- Byzantine: Lies, sends corrupt data, malicious.
- Internal databases (Raft/Paxos) assume Crash-Recovery (CFT).
- Blockchains (Bitcoin) assume Byzantine failures (BFT).
- Retries + Idempotency are the standard way to handle dropped network packets.
`,
    cheatSheet: `
### Fault Tolerance Thresholds
- **Crash Fault Tolerance (CFT):** Needs \`2f + 1\` nodes. 
  - To survive 1 failure, you need 3 nodes.
  - To survive 2 failures, you need 5 nodes.
- **Byzantine Fault Tolerance (BFT):** Needs \`3f + 1\` nodes.
  - To survive 1 malicious node, you need 4 nodes.
`,
    interviewQuestions: [
      { question: 'What is a Byzantine failure?', answerHint: 'A failure mode where a node does not simply crash, but instead acts arbitrarily or maliciously. It might send incorrect data, or send different versions of the truth to different nodes in the system to cause confusion.', type: 'CONCEPTUAL' },
      { question: 'Why is idempotency critical in a network with Fair-Loss links?', answerHint: 'Because messages can be dropped, the sender must implement timeouts and retries. However, a timeout might occur because the *acknowledgement* was dropped, not the original request. The sender retries, resulting in duplicate processing. Idempotency ensures the duplicate request does not cause unintended side effects (like double charging a credit card).', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'The Byzantine Generals Problem', url: 'https://lamport.azurewebsites.net/pubs/byz.pdf', type: 'ARTICLE', priority: 'S', source: 'Leslie Lamport (1982)', isOfficial: true }
    ]
  }
};
