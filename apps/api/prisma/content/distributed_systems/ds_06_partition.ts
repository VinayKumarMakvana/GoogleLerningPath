export const ds_06_partition = {
  PARTITIONING_STORAGE: {
    title: 'Partitioning & Distributed Storage',
    description: 'Advanced partitioning strategies, consistent hashing in practice, and resolving hotspots.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 120,
    prerequisites: ['Replication & Consistency'],
    learningContent: `
# Partitioning & Distributed Storage

While replication copies data, partitioning (sharding) splits data. In massive distributed systems, you combine them: each partition is replicated across multiple nodes.

## Partitioning Strategies
1. **Key Range Partitioning:** Assigns a continuous range of keys to each partition (e.g., A-M to Node 1, N-Z to Node 2). 
   - *Pro:* Range queries are extremely fast.
   - *Con:* Highly prone to hotspots. If a timestamp is the key, today's partition gets all the writes, while historical partitions do nothing.
2. **Hash Partitioning:** Passes the key through a hash function and assigns it to a partition.
   - *Pro:* Evenly distributes load and data, destroying hotspots.
   - *Con:* Range queries are terrible. You must query all partitions and merge the results.

## Rebalancing Partitions
When a node crashes or you add a new node to handle load, data must be moved (rebalanced).
- **Hash Modulo (\`hash(key) % N\`):** DO NOT USE. If N (number of nodes) changes from 4 to 5, the modulo changes for almost every key, requiring massive data movement.
- **Consistent Hashing:** Places nodes and data keys on a virtual ring. A key is assigned to the next node found moving clockwise. Adding a node only takes data from its immediate neighbor.
`,
    fullNotes: `
# Detailed Notes: Partitioning

- **Secondary Indexes in Distributed DBs:**
  - *Document-partitioned (Local Index):* Each partition maintains an index only for the documents it holds. If you query by a secondary index, you must send the query to ALL partitions (Scatter-Gather). Slow for reads, fast for writes.
  - *Term-partitioned (Global Index):* The secondary index itself is partitioned by the indexed term. If you query by a secondary index, it only hits the node holding that term's index. Fast for reads, but writing a single document might require updating indexes on multiple different nodes (slow for writes).
- **Hotspots & Salting:** If you use Hash Partitioning, you might still get a hotspot if one specific key is incredibly popular (e.g., a Justin Bieber tweet). To fix this, you "salt" the key by appending a random two-digit number (e.g., \`tweet_123_01\`, \`tweet_123_02\`). This splits the popular key across 100 partitions, but reading requires querying all 100 and merging.
`,
    shortNotes: `
- Partitioning = Sharding (Splitting data to scale writes/storage).
- Range Partitioning: Good for range queries, bad for hotspots.
- Hash Partitioning: Even distribution, bad for range queries.
- Hash Modulo (\`% N\`) is terrible for rebalancing.
- Consistent Hashing minimizes data movement when scaling.
- Secondary indexes must be local (scatter-gather reads) or global (complex writes).
- Fix extreme single-key hotspots by salting the key.
`,
    cheatSheet: `
### Consistent Hashing vs Modulo
- **Modulo 10 to 11 nodes:** ~90% of data moves.
- **Consistent Hashing 10 to 11 nodes:** ~9% of data moves.
`,
    interviewQuestions: [
      { question: 'Why is `hash(key) % N` a bad strategy for partitioning data in a growing distributed system?', answerHint: 'If N is the number of nodes, adding a new node changes N. When N changes, the modulo result for almost every existing key changes, meaning nearly all data in the database must be moved to new nodes to rebalance, causing massive network and disk thrashing.', type: 'TECHNICAL' },
      { question: 'How do you handle an extreme hotspot on a single key in a hash-partitioned database?', answerHint: 'By salting the key. You append a random number (e.g., 1 to 10) to the end of the key before hashing. This splits the single logical record into 10 physical records spread across different partitions. To read it, the application must fetch all 10 keys and merge them.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Consistent Hashing Explained', url: 'https://www.toptal.com/big-data/consistent-hashing', type: 'ARTICLE', priority: 'S', source: 'Toptal', isOfficial: false }
    ]
  }
};
