export const sd_04_db = {
  DB_DATA_MODELING: {
    title: 'Databases & Data Modeling',
    description: 'Learn when to use SQL vs NoSQL, how to model data for scale, and the fundamentals of indexing.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 120,
    prerequisites: ['API & Service Design'],
    learningContent: `
# Databases & Data Modeling

Choosing the right database is often the most critical architectural decision.

## SQL (Relational Databases)
- **Examples:** MySQL, PostgreSQL.
- **Structure:** Tables, rows, rigid schema.
- **Strengths:** ACID compliance (Atomicity, Consistency, Isolation, Durability). Great for structured data with complex relationships (joins).
- **Weaknesses:** Hard to scale horizontally. You usually scale vertically (bigger server), which hits a hardware limit.

## NoSQL (Non-Relational Databases)
- **Key-Value:** Redis, DynamoDB. Extremely fast, simple data retrieval.
- **Document:** MongoDB. Flexible JSON-like schema. Good for rapidly changing data.
- **Column-Family:** Cassandra, HBase. Optimized for writing massive amounts of data and time-series data.
- **Graph:** Neo4j. Optimized for deeply interconnected data (social networks, recommendation engines).
- **Strengths:** Designed for horizontal scaling (sharding) out of the box. High availability.
- **Weaknesses:** No traditional joins, weaker consistency models (Eventual Consistency).

## Indexing
An index is a data structure (usually a B-Tree) that improves the speed of data retrieval at the cost of slower writes and more storage space. If a query is slow, the first step is usually to add an index.
`,
    fullNotes: `
# Detailed Notes: Databases

- **ACID vs BASE:**
  - *ACID (SQL):* Atomicity (all or nothing), Consistency (valid data only), Isolation (concurrent transactions don't interfere), Durability (saved permanently).
  - *BASE (NoSQL):* Basically Available, Soft state, Eventual consistency. Prioritizes availability over immediate consistency.
- **Data Modeling in NoSQL:** In SQL, you normalize data to reduce redundancy. In NoSQL, you **denormalize** data (duplicate it) to optimize for read queries. You model NoSQL databases based on the *queries* you need to run, not the relationships.
`,
    shortNotes: `
- SQL: ACID compliant, rigid schema, complex JOINs, scales vertically.
- NoSQL: Flexible schema, scales horizontally, eventual consistency.
- Use SQL for financial data, strict relationships.
- Use NoSQL for massive scale, unstructured data, rapid iteration.
- Indexing speeds up Reads but slows down Writes.
- Denormalize data in NoSQL to avoid JOINs.
`,
    cheatSheet: `
### Database Selection Guide
- Financial Transactions -> Relational (Postgres/MySQL)
- User Session Data -> Key-Value (Redis)
- Product Catalog (Flexible attributes) -> Document (MongoDB)
- Massive Write Heavy / Time Series (IoT) -> Column (Cassandra)
- Social Graph / Recommendations -> Graph (Neo4j)
- Full Text Search -> Search Engine (Elasticsearch)
`,
    interviewQuestions: [
      { question: 'When would you choose NoSQL over SQL?', answerHint: 'When the system requires massive horizontal scale (which SQL struggles with), the data schema is highly flexible/changing, or you have a massive volume of unstructured data and can tolerate eventual consistency.', type: 'TECHNICAL' },
      { question: 'What is the tradeoff of adding an Index to a database table?', answerHint: 'Indexes drastically speed up Read queries (O(log N) instead of O(N) full table scans). However, they consume extra disk space and slow down Write queries (INSERT/UPDATE/DELETE), because the index must be updated every time data changes.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'SQL vs NoSQL', url: 'https://www.youtube.com/watch?v=ZS_kXvOeQ5Y', type: 'VIDEO', priority: 'S', source: 'ByteByteGo', isOfficial: false }
    ]
  }
};
