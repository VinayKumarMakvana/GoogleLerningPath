export const ds_04_repl = {
  REPLICATION_CONSISTENCY: {
    title: 'Replication & Consistency',
    description: 'Master Leader-based, Multi-leader, and Leaderless replication, along with strict consistency models like Linearizability.',
    difficulty: 'EXPERT',
    estimatedLearnTime: 120,
    prerequisites: ['Communication, Time & Ordering', 'Failure Models & Fault Tolerance'],
    learningContent: `
# Replication & Consistency

Replication means keeping a copy of the same data on multiple machines connected via a network.

## Replication Algorithms
1. **Single-Leader (Master-Slave):** One node is designated the Leader. All writes go to the Leader. The Leader streams the data changes to the Followers (read replicas). 
   - *Synchronous:* Leader waits for followers to confirm before telling the user "success". (Slow, but safe).
   - *Asynchronous:* Leader tells user "success" immediately, streams to followers later. (Fast, but if leader dies, data is lost).
2. **Multi-Leader (Master-Master):** Multiple nodes accept writes. Great for multi-datacenter setups (e.g., one leader in US, one in EU). Major downside: **Write Conflicts**. If two users edit the same doc simultaneously in different data centers, how do you merge it?
3. **Leaderless (Dynamo-style):** Any node can accept writes. Used by Cassandra and DynamoDB. Uses Quorums (\`W + R > N\`) to ensure you read from enough nodes to get the latest write.

## Consistency Models
- **Linearizability (Strong Consistency):** The system behaves as if there is only one copy of the data, and all operations are atomic. If Read B starts after Write A completes, Read B MUST see Write A. (Extremely hard to achieve, high latency).
- **Sequential Consistency:** Operations from different clients can be interleaved, but all nodes must see the operations in the exact same order.
- **Eventual Consistency:** If you stop writing, eventually all nodes will converge to the same state. (No ordering guarantees in the meantime).
`,
    fullNotes: `
# Detailed Notes: Replication

- **Read-After-Write Consistency:** A common requirement. If I post a tweet (Write) and immediately refresh my page (Read), I MUST see my tweet. In an asynchronous single-leader setup, my read might hit a slow follower that hasn't gotten the tweet yet. *Fix:* Route reads for the user's *own* profile strictly to the Leader, or track timestamps.
- **Conflict Resolution in Multi-Leader:** 
  - *Last Write Wins (LWW):* Look at the timestamp, discard the older one. (Warning: relies on physical clocks, which we know drift! Causes data loss).
  - *Custom Application Logic:* Git merge style resolution.
`,
    shortNotes: `
- Single-Leader: Simple, easy to reason about, prone to replication lag.
- Multi-Leader: Great for Multi-Region, requires complex conflict resolution.
- Leaderless: High availability, uses Quorums (W + R > N) for consistency.
- Linearizability: Behaves like a single, atomic variable. (Strongest consistency).
- Eventual Consistency: Fast, highly available, reads might be stale.
- Read-After-Write consistency ensures a user sees their own updates immediately.
`,
    cheatSheet: `
### Quorum Math (Leaderless)
Let N = Total Replicas, W = Write Quorum, R = Read Quorum.
- To guarantee reading the latest write: **W + R > N**
- Example (N=3): W=2, R=2. (If you write to 2 nodes, and read from 2 nodes, at least 1 node in your read will contain the latest write due to the overlap).
`,
    interviewQuestions: [
      { question: 'What is Linearizability?', answerHint: 'It is the strongest consistency model. It guarantees that the system behaves as if there is only one copy of the data. If a write completes at time T1, any read that starts at time T2 (where T2 > T1) must return the new value. It makes a distributed system look like a single machine.', type: 'TECHNICAL' },
      { question: 'What is the "Last Write Wins" (LWW) conflict resolution strategy, and what is its main flaw?', answerHint: 'LWW resolves multi-leader or leaderless write conflicts by keeping the write with the highest physical timestamp and silently discarding the other. Its main flaw is that it relies on synchronized physical clocks, which are impossible in distributed systems (clock drift), leading to unintentional data loss of valid writes.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Linearizability vs Serializability', url: 'http://www.bailis.org/blog/linearizability-versus-serializability/', type: 'ARTICLE', priority: 'S', source: 'Peter Bailis', isOfficial: false }
    ]
  }
};
