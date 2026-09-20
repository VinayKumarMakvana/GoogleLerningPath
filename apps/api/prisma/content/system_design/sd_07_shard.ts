export const sd_07_shard = {
  DB_SHARDING: {
    title: 'Replication, Partitioning & Sharding',
    description: 'Learn how to scale databases horizontally by replicating data for availability and sharding data for capacity.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 120,
    prerequisites: ['Databases & Data Modeling'],
    learningContent: `
# Replication, Partitioning & Sharding

A single database server has limits on storage, CPU, and memory. How do we scale the data layer?

## 1. Database Replication (Scaling Reads & Availability)
Replication keeps copies of the same data across multiple machines.
- **Master-Slave (Leader-Follower):** Writes go ONLY to the Master. Reads can go to the Master or the Slaves. This scales read-heavy applications and provides a backup if the Master dies.
- **Master-Master:** Writes can go to any node. Extremely complex due to write conflicts.

## 2. Partitioning / Sharding (Scaling Writes & Storage)
Sharding is the process of splitting a single massive database into smaller, more manageable pieces called shards. Each shard holds a unique subset of the data.
- **Partition Key (Shard Key):** The logic used to distribute the data. Example: Sharding users based on \`user_id % number_of_shards\`.
- If User 10 goes to Shard 2, and User 11 goes to Shard 3, the database storage and write capacity is now doubled.

## Sharding Strategies
- **Hash-based Sharding:** Hash the key to determine the shard. Even distribution, but very hard to add new shards later without rehashing everything (Consistent Hashing solves this).
- **Range-based Sharding:** E.g., Users A-M on Shard 1, N-Z on Shard 2. Easy to query ranges, but prone to hotspots (e.g., if everyone registers with names starting with A).
- **Directory-based Sharding:** A lookup service keeps a map of which key lives on which shard.
`,
    fullNotes: `
# Detailed Notes: Sharding

- **The Celebrity Problem (Hotspots):** If you shard a social network by UserID, a celebrity with millions of followers will overwhelm the shard they live on, while other shards remain idle. You must carefully choose a shard key to ensure even data distribution.
- **Consistent Hashing:** A technique used in distributed hash tables (like Cassandra/DynamoDB) to minimize data movement when shards are added or removed. Instead of a modulo operation, servers and keys are placed on a conceptual "ring".
- **Cross-Shard Joins:** Sharding breaks traditional SQL JOINs. If Table A is on Shard 1 and Table B is on Shard 2, you cannot join them at the database level. The application must fetch both and join them in memory, or data must be denormalized.
`,
    shortNotes: `
- Replication = Copies of the same data. (Improves Read scaling & Availability).
- Sharding = Splitting data into pieces. (Improves Write scaling & Storage).
- Master-Slave: Writes to Master, Reads to Slaves.
- Shard Key: Critical choice. Bad keys cause uneven loads (Hotspots).
- Consistent Hashing allows adding/removing servers with minimal data migration.
- Sharding makes JOINs and ACID transactions across shards extremely difficult.
`,
    cheatSheet: `
### When to Shard?
Sharding adds massive complexity. You should only shard when:
1. The dataset is too large to fit on a single node's disk.
2. The write volume exceeds what a single node can handle.
3. You have already exhausted Vertical Scaling, Read Replicas, and Caching.
`,
    interviewQuestions: [
      { question: 'What is the difference between Replication and Sharding?', answerHint: 'Replication duplicates the exact same dataset across multiple servers to improve read throughput and provide fault tolerance. Sharding splits the dataset into smaller, unique chunks across multiple servers to increase total storage and write capacity.', type: 'CONCEPTUAL' },
      { question: 'What is Consistent Hashing and what problem does it solve?', answerHint: 'In standard hash-based sharding (key % N), changing the number of servers (N) requires moving almost all data. Consistent hashing places data and servers on a ring; adding or removing a server only affects the immediate neighbors on the ring, drastically minimizing data migration.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Understanding Database Sharding', url: 'https://www.digitalocean.com/community/tutorials/understanding-database-sharding', type: 'ARTICLE', priority: 'S', source: 'DigitalOcean', isOfficial: false }
    ]
  }
};
