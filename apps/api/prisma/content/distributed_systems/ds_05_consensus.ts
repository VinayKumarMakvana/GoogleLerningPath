export const ds_05_consensus = {
  CONSENSUS_COORDINATION: {
    title: 'Consensus & Coordination',
    description: 'Deep dive into distributed consensus, the Raft algorithm, Paxos, and Zookeeper/etcd.',
    difficulty: 'EXPERT',
    estimatedLearnTime: 180,
    prerequisites: ['Replication & Consistency'],
    learningContent: `
# Consensus & Coordination

**Consensus** is the problem of getting multiple independent nodes to agree on something (a value, an action, or who the Leader is), even if some nodes crash or the network partitions.

## The Importance of Consensus
In a single-leader database, if the leader crashes, how do the followers decide who becomes the new leader? If two followers both think they are the leader (Split Brain), they will both accept writes, corrupting the database. Consensus algorithms prevent Split Brain.

## The Raft Consensus Algorithm
Designed to be more understandable than Paxos (the older standard). Used in etcd (Kubernetes backing store) and HashiCorp Consul.
Raft operates via **Leader Election** and **Log Replication**.

### Leader Election in Raft
1. Nodes start as **Followers**.
2. If a follower doesn't hear a heartbeat from a Leader within a randomized timeout, it becomes a **Candidate** and starts a new Term.
3. It votes for itself and asks others for votes.
4. If it receives votes from a *majority* of nodes, it becomes the **Leader**.
5. *Randomized timeouts* are critical: they prevent multiple nodes from starting an election at the exact same millisecond and splitting the votes endlessly.

### Log Replication in Raft
1. Client sends a write to the Leader.
2. Leader appends the write to its local log (uncommitted).
3. Leader sends \`AppendEntries\` to all followers.
4. Once a *majority* of followers write it to their logs and acknowledge, the Leader *commits* the entry and applies it to its state machine.
5. Leader tells client "success".
`,
    fullNotes: `
# Detailed Notes: Consensus

- **Split Brain & Fencing Tokens:** If a network partitions, a former leader might not know it was deposed, and might try to write to a storage system while the *new* leader is also writing. To solve this, consensus systems issue **Fencing Tokens** (monotonically increasing IDs). The storage system is configured to reject any writes from a token older than the highest it has seen.
- **Zookeeper / etcd:** These are CP (Consistent & Partition Tolerant) key-value stores built on consensus algorithms (ZAB and Raft). They are not used to store massive application data. They are used to store *coordination metadata* (e.g., which node is the leader, where are the database shards located).
`,
    shortNotes: `
- Consensus = Getting nodes to agree on a single state/leader.
- Solves the "Split Brain" problem (two nodes thinking they are leader).
- Raft uses randomized timeouts to ensure successful leader elections.
- Commits require a majority (Quorum) to acknowledge the log entry.
- Fencing Tokens prevent zombie leaders from corrupting data.
- etcd and Zookeeper are coordination services built on Raft/ZAB.
`,
    cheatSheet: `
### Raft Node States
1. **Follower:** Passive, receives logs and heartbeats.
2. **Candidate:** Active, requesting votes to become leader.
3. **Leader:** Active, receives client writes, replicates logs, sends heartbeats.

*All consensus requires 2f+1 nodes to survive f failures (e.g., 5 nodes can survive 2 crashes).*
`,
    interviewQuestions: [
      { question: 'What is the "Split Brain" problem and how does a consensus algorithm like Raft prevent it?', answerHint: 'Split brain occurs when a network partitions, and two nodes both think they are the leader, accepting conflicting writes. Raft prevents this by requiring a strict majority (quorum) of votes to become a leader. In a network partition, only the side with the majority of nodes can elect a leader; the minority side will never get enough votes, preventing two leaders from existing in the same term.', type: 'TECHNICAL' },
      { question: 'Why does Raft use randomized election timeouts?', answerHint: 'If all followers had the exact same timeout, they would all realize the leader is dead at the exact same time, all become candidates, and all vote for themselves, resulting in a 1-1-1-1 tie. By randomizing the timeout (e.g., 150ms to 300ms), one node will timeout first, request votes, and win the election before others even start.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'The Secret Lives of Data (Raft Visualization)', url: 'http://thesecretlivesofdata.com/raft/', type: 'ARTICLE', priority: 'S', source: 'Ben Johnson', isOfficial: false },
      { title: 'In Search of an Understandable Consensus Algorithm (Raft Paper)', url: 'https://raft.github.io/raft.pdf', type: 'ARTICLE', priority: 'A', source: 'Diego Ongaro', isOfficial: true }
    ]
  }
};
