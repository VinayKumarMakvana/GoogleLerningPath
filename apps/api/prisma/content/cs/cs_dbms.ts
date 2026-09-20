import { TopicContent } from '../types';

export const cs_dbms: Record<string, TopicContent> = {
  dbms_12: {
    title: 'DBMS Fundamentals',
    learningContent: `
# Database Management Systems (DBMS)
A DBMS is software designed to store, retrieve, define, and manage data in a database. It provides an interface between users/applications and the data.

## Why use a DBMS over File Systems?
Before DBMS, data was stored in plain files. This caused massive issues:
1.  **Data Redundancy & Inconsistency:** Duplicate data in multiple files.
2.  **Difficulty in Access:** Writing a new program for every new type of query.
3.  **Data Isolation:** Data scattered in different formats.
4.  **Integrity Problems:** Hard to enforce constraints (e.g., account balance > 0).
5.  **Atomicity Problems:** Crashes leave data in partial states.
6.  **Concurrent Access Anomalies:** Two users modifying data simultaneously causes corruption.
7.  **Security Problems:** Hard to grant partial access.

## Abstraction Levels
DBMS hides the complexity of data storage through three levels of abstraction:
1.  **Physical/Internal Level:** How data is actually stored on disk (B-trees, hash tables).
2.  **Logical/Conceptual Level:** What data is stored and the relationships among them (Tables, schemas).
3.  **View/External Level:** Only parts of the database seen by a specific user (Hides passwords from a frontend view).
`,
    fullNotes: `
# DBMS Architecture

## Data Independence
The ability to modify a schema definition in one level without affecting a schema definition in the next higher level.
*   **Logical Data Independence:** Modifying the logical schema without altering the external views/application programs. (e.g., splitting a table into two).
*   **Physical Data Independence:** Modifying the physical schema without altering the logical schema. (e.g., adding an index or changing storage from HDD to SSD). Physical data independence is easier to achieve.

## Types of DBMS
*   **Relational (RDBMS):** MySQL, PostgreSQL, Oracle. Data stored in tables with rows and columns.
*   **NoSQL:**
    *   **Document:** MongoDB, CouchDB (JSON-like documents).
    *   **Key-Value:** Redis, DynamoDB (Fast, simple lookups).
    *   **Wide-Column:** Cassandra, HBase (Highly scalable, optimized for huge datasets).
    *   **Graph:** Neo4j (Optimized for relationships/edges).
`,
    shortNotes: `
*   **DBMS:** Software to manage databases safely and efficiently.
*   **Solves:** Redundancy, integrity, concurrency, atomicity, security.
*   **Levels:** Physical (Disk) -> Logical (Schema) -> View (User UI).
*   **Data Independence:** Changing lower level doesn't break upper level.
*   **Types:** SQL (Relational) vs NoSQL (Document, KV, Column, Graph).
`,
    cheatSheet: `
| Level | Description |
|---|---|
| Physical | B-Trees, file allocation, bytes |
| Logical | Tables, Columns, Foreign Keys |
| View | Filtered subsets of data for specific roles |
`,
    resources: [
      {
        title: 'Database System Concepts (Silberschatz, Korth)',
        type: 'BOOK',
        priority: 'S',
        description: 'The standard academic textbook for Databases.',
        status: 'PUBLISHED'
      }
    ]
  },

  dbms_13: {
    title: 'Relational Databases',
    learningContent: `
# Relational Databases (RDBMS)
A Relational Database is a type of database that stores and provides access to data points that are related to one another. It is based on the relational model proposed by E.F. Codd.

## Core Concepts
*   **Relation (Table):** A collection of rows and columns.
*   **Tuple (Row / Record):** A single entry in a table.
*   **Attribute (Column / Field):** A specific characteristic of the data.
*   **Domain:** The set of allowable values for one or more attributes.

## Keys
Keys are critical for uniquely identifying rows and establishing relationships between tables.
*   **Super Key:** A set of attributes that can uniquely identify a tuple.
*   **Candidate Key:** A minimal super key (no redundant attributes).
*   **Primary Key:** The chosen candidate key used to identify tuples. Cannot be null.
*   **Foreign Key:** An attribute in one table that refers to the primary key of another table. Enforces referential integrity.
`,
    fullNotes: `
# Relational Algebra
The theoretical foundation of SQL. It provides a set of operations to manipulate relations.
*   **Select (σ):** Filters rows based on a condition (SQL \`WHERE\`).
*   **Project (π):** Filters columns, removing duplicates (SQL \`SELECT\`).
*   **Cartesian Product (⨯):** Combines every row of one table with every row of another.
*   **Join (⋈):** A Cartesian product followed by a Selection based on a common attribute.
*   **Set Operations:** Union (∪), Intersection (∩), Set Difference (-).

## Integrity Constraints
Rules enforced by the DBMS to ensure data accuracy.
1.  **Domain Integrity:** Column values must be of the correct type/format.
2.  **Entity Integrity:** Primary keys must be unique and not null.
3.  **Referential Integrity:** Foreign keys must either be null or point to a valid existing primary key.
`,
    shortNotes: `
*   **Relation:** Table.
*   **Tuple:** Row.
*   **Attribute:** Column.
*   **Primary Key (PK):** Uniquely identifies a row.
*   **Foreign Key (FK):** Links to a PK in another table.
*   **Referential Integrity:** You can't have an FK pointing to a non-existent PK.
*   **Relational Algebra:** The math behind SQL (Select, Project, Join).
`,
    cheatSheet: `
| Key Type | Description |
|---|---|
| Candidate Key | Any minimal set of columns that uniquely identifies a row |
| Primary Key | The specific candidate key chosen by the DB designer |
| Foreign Key | Column mapping to another table's Primary Key |
`,
    resources: []
  },

  dbms_14: {
    title: 'SQL',
    learningContent: `
# SQL (Structured Query Language)
SQL is the standard language for interacting with RDBMS. It is declarative (you state *what* you want, not *how* to get it).

## Sublanguages
1.  **DDL (Data Definition Language):** Defines schemas. \`CREATE\`, \`ALTER\`, \`DROP\`, \`TRUNCATE\`.
2.  **DML (Data Manipulation Language):** Manipulates data. \`INSERT\`, \`UPDATE\`, \`DELETE\`.
3.  **DQL (Data Query Language):** Retrieves data. \`SELECT\`.
4.  **DCL (Data Control Language):** Permissions. \`GRANT\`, \`REVOKE\`.
5.  **TCL (Transaction Control Language):** Transactions. \`COMMIT\`, \`ROLLBACK\`.

## The SELECT Statement Execution Order
When you write a query, the DBMS engine processes it in a specific order, which is different from how you read it:
1.  \`FROM\` & \`JOIN\`
2.  \`WHERE\`
3.  \`GROUP BY\`
4.  \`HAVING\`
5.  \`SELECT\`
6.  \`ORDER BY\`
7.  \`LIMIT\` / \`OFFSET\`
`,
    fullNotes: `
# Joins
Joins combine rows from two or more tables based on a related column.
*   **INNER JOIN:** Returns records that have matching values in both tables.
*   **LEFT (OUTER) JOIN:** Returns all records from the left table, and matched records from the right (or NULLs).
*   **RIGHT (OUTER) JOIN:** Returns all records from the right table, and matched records from the left.
*   **FULL (OUTER) JOIN:** Returns all records when there is a match in either left or right table.
*   **CROSS JOIN:** Returns the Cartesian product (every combination).

## Aggregations and Window Functions
*   **Aggregations (\`COUNT\`, \`SUM\`, \`AVG\`):** Collapse multiple rows into a single row. Handled via \`GROUP BY\`.
*   **Window Functions (\`OVER()\`, \`RANK()\`, \`ROW_NUMBER()\`):** Perform calculations across a set of table rows related to the current row, *without* collapsing them into a single output row. Highly tested in interviews.
`,
    shortNotes: `
*   **DDL:** Schema (Create, Drop).
*   **DML:** Data (Insert, Update, Delete).
*   **DQL:** Query (Select).
*   **Execution Order:** FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY.
*   **WHERE vs HAVING:** WHERE filters rows *before* grouping; HAVING filters *after* grouping.
*   **INNER JOIN:** Only matches.
*   **LEFT JOIN:** All left rows + matches.
*   **Window Functions:** Analytics across rows without collapsing them.
`,
    cheatSheet: `
| Command | Type | Action |
|---|---|---|
| CREATE | DDL | Make a table/index |
| INSERT | DML | Add rows |
| COMMIT | TCL | Save transaction |
| GRANT | DCL | Give user permissions |
`,
    resources: [
      {
        title: 'Mode Analytics: SQL Tutorial',
        url: 'https://mode.com/sql-tutorial/',
        type: 'ARTICLE',
        priority: 'A',
        status: 'PUBLISHED'
      }
    ]
  },

  dbms_15: {
    title: 'Transactions & ACID',
    learningContent: `
# Database Transactions & ACID
A transaction is a single logical unit of work that accesses and possibly modifies the contents of a database. It consists of multiple operations (e.g., transferring money involves subtracting from Account A and adding to Account B).

## ACID Properties
To ensure data integrity, transactions must possess four properties:
1.  **Atomicity ("All or Nothing"):** The entire transaction succeeds completely, or fails completely. If it crashes halfway, it rolls back.
2.  **Consistency:** The transaction must take the database from one valid state to another valid state, respecting all constraints and rules.
3.  **Isolation:** Concurrent transactions should execute as if they were running serially (one after another). The intermediate state of a transaction is invisible to others.
4.  **Durability:** Once a transaction is committed, its changes are permanent and will survive system crashes (usually achieved by writing to a Write-Ahead Log on disk).
`,
    fullNotes: `
# Isolation Levels and Anomalies
Complete isolation is slow. Databases allow developers to lower the isolation level to increase concurrency, at the risk of exposing anomalies.

## Read Anomalies
1.  **Dirty Read:** Reading uncommitted data from another transaction.
2.  **Non-Repeatable Read:** Reading the same row twice gets different data because another transaction updated it in between.
3.  **Phantom Read:** A query looking for a range of rows gets different results the second time because another transaction inserted/deleted rows matching the criteria.

## Standard Isolation Levels
1.  **Read Uncommitted:** Highest performance, susceptible to all anomalies.
2.  **Read Committed:** Prevents Dirty Reads. (Default in Postgres, SQL Server).
3.  **Repeatable Read:** Prevents Dirty and Non-Repeatable reads. (Default in MySQL/InnoDB).
4.  **Serializable:** Prevents all anomalies. Slowest. Emulates purely sequential execution.
`,
    shortNotes: `
*   **Transaction:** Unit of work (e.g., transferring money).
*   **Atomicity:** All or nothing (Rollback on failure).
*   **Consistency:** DB rules/constraints are always valid.
*   **Isolation:** Transactions don't interfere with each other.
*   **Durability:** Committed data survives crashes.
*   **Dirty Read:** Reading uncommitted changes.
*   **Read Committed:** Standard default isolation level for many DBs.
`,
    cheatSheet: `
| Isolation Level | Prevents Dirty Read | Prevents Non-Repeatable Read | Prevents Phantom |
|---|---|---|---|
| Read Uncommitted | No | No | No |
| Read Committed | Yes | No | No |
| Repeatable Read | Yes | Yes | No (usually) |
| Serializable | Yes | Yes | Yes |
`,
    resources: []
  },

  dbms_16: {
    title: 'Indexing',
    learningContent: `
# Database Indexing
An index is a data structure that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage space.

Imagine looking for a word in a textbook. Without an index, you must scan every page (Full Table Scan). With an index, you look up the word alphabetically at the back, find the page number, and jump directly there.

## B-Trees & B+Trees
The most common data structure for indexes is the B+Tree.
*   **Balanced:** All leaf nodes are at the same depth, guaranteeing O(log N) search time.
*   **Fat Nodes:** Each node contains many keys, perfectly matching the size of a disk block (e.g., 4KB or 8KB). This minimizes the number of disk I/O operations required to traverse the tree.
*   **Linked Leaves:** In a B+Tree, all data pointers are stored only in the leaf nodes, and the leaves are linked together in a linked list. This makes range queries (e.g., \`WHERE age BETWEEN 20 AND 30\`) extremely fast.
`,
    fullNotes: `
# Clustered vs. Non-Clustered Indexes

## Clustered Index
*   Determines the actual physical sorting order of the data on the disk.
*   Because data can only be sorted one way, a table can have **only one** clustered index.
*   Usually, the Primary Key automatically creates a clustered index.
*   The leaf nodes of a clustered index contain the actual row data.

## Non-Clustered Index
*   A separate structure from the data rows.
*   The leaf nodes contain the index key and a pointer (e.g., the Primary Key value or a row ID) to the actual data row.
*   A table can have multiple non-clustered indexes.
*   Requires a "Bookmark Lookup" to fetch the rest of the row data, which adds a small overhead unless the query is "Covered".

## Covering Index
An index that contains all the columns required by a specific query. The DBMS can fulfill the query entirely from the index without doing a lookup to the actual table data.
`,
    shortNotes: `
*   **Index:** Data structure to speed up reads, slows down writes.
*   **B+Tree:** Standard structure. Shallow, fat nodes reduce disk I/O. Leaf nodes linked for fast range queries.
*   **Clustered Index:** Physically sorts the table data. Max 1 per table.
*   **Non-Clustered Index:** Separate lookup table pointing to data. Multiple allowed.
*   **Covering Index:** Index contains all selected columns, avoiding table lookup.
`,
    cheatSheet: `
| Feature | Clustered | Non-Clustered |
|---|---|---|
| Limit | 1 per table | Multiple per table |
| Leaf Nodes | Actual row data | Pointer to row data |
| Best For | Primary Keys, Range queries | Lookups on foreign keys, frequent filters |
`,
    resources: [
      {
        title: 'Use the Index, Luke',
        url: 'https://use-the-index-luke.com/',
        type: 'ARTICLE',
        priority: 'S',
        description: 'The definitive guide to database performance for developers.',
        status: 'PUBLISHED'
      }
    ]
  },

  dbms_17: {
    title: 'Query Optimization',
    learningContent: `
# Query Optimization
When you submit a SQL query, the DBMS doesn't just execute it blindly. It passes through a Query Optimizer, which determines the most efficient way to execute the query (the Execution Plan).

## The Optimizer
The optimizer is cost-based. It analyzes statistics maintained by the DB (table sizes, data distribution, index presence) and calculates the "cost" (CPU + Disk I/O) of various execution strategies, choosing the cheapest one.

## EXPLAIN Plan
The \`EXPLAIN\` keyword shows you the execution plan the database intends to use. It is the single most important tool for debugging slow queries.
It reveals:
*   **Full Table Scans (Seq Scan):** The DB is reading every row. Usually bad for large tables.
*   **Index Scans:** The DB is using an index.
*   **Join Types:** Nested Loop Join, Hash Join, Merge Join.
`,
    fullNotes: `
# Join Algorithms

How does the database physically join two tables?
1.  **Nested Loop Join:** For each row in Table A, scan Table B. Very slow (O(N*M)) unless Table B is indexed on the join column, making it an Index Nested Loop Join (very fast for small datasets).
2.  **Hash Join:** The DB builds an in-memory Hash Table of the smaller table, then scans the larger table, probing the hash table for matches. Excellent for large, unsorted datasets.
3.  **Merge Join:** If both tables are already sorted by the join key (e.g., via clustered indexes), the DB can zip them together in O(N+M) time. Extremely fast.

## Optimizing Queries (Best Practices)
*   Avoid \`SELECT *\`. Only fetch columns you need to increase the chance of a Covering Index.
*   Avoid using functions on indexed columns in the \`WHERE\` clause (e.g., \`WHERE YEAR(date) = 2023\`). This disables the index (creates non-sargable conditions).
*   Ensure statistics are up to date (\`ANALYZE\` in Postgres).
`,
    shortNotes: `
*   **Query Optimizer:** Generates the cheapest Execution Plan.
*   **EXPLAIN:** Command to view the execution plan.
*   **Full Table Scan:** Reading every row. Bad for large tables.
*   **Nested Loop Join:** O(N*M), good only if inner table is indexed.
*   **Hash Join:** Builds hash map of small table. Good for large unindexed joins.
*   **Merge Join:** Zips two sorted tables. Extremely efficient.
*   **Sargable:** A query condition that can utilize an index (don't wrap indexed columns in functions).
`,
    cheatSheet: `
| Join Algorithm | When DB Uses It |
|---|---|
| Nested Loop | Small datasets, or joining via a highly selective index |
| Hash Join | Large, unsorted data (equality joins only) |
| Merge Join | Both inputs are already sorted |
`,
    resources: []
  },

  dbms_18: {
    title: 'Normalization',
    learningContent: `
# Database Normalization
Normalization is the process of organizing data in a database to reduce data redundancy and eliminate insertion, update, and deletion anomalies.

## Anomalies
If a table is unnormalized (e.g., storing student data and course data in the same row):
*   **Update Anomaly:** Changing a course name requires updating every student row taking that course.
*   **Insertion Anomaly:** You cannot add a new course until a student enrolls in it (if student ID is the primary key).
*   **Deletion Anomaly:** Deleting the last student enrolled in a course deletes the course information entirely.

## The Normal Forms
Normalization involves decomposing tables to satisfy progressive rules.
1.  **1NF (First Normal Form):** All columns must hold atomic (indivisible) values. No lists or arrays in a single column.
2.  **2NF (Second Normal Form):** Must be in 1NF. All non-key attributes must be fully functionally dependent on the *entire* primary key (eliminates partial dependency in composite keys).
3.  **3NF (Third Normal Form):** Must be in 2NF. No transitive dependencies. (Non-key attributes cannot depend on other non-key attributes). "Every non-key attribute must provide a fact about the key, the whole key, and nothing but the key."
`,
    fullNotes: `
# Advanced Normalization & Denormalization

## BCNF (Boyce-Codd Normal Form)
A slightly stronger version of 3NF. It states that for every non-trivial functional dependency X -> Y, X must be a superkey. It handles edge cases where overlapping candidate keys exist.

## Denormalization
Normalization optimizes for writes and data integrity. However, highly normalized databases require many \`JOIN\` operations for reads, which can be slow.
Denormalization is the deliberate process of adding redundant data back into tables to speed up read performance (often used in Data Warehouses and OLAP systems).
*   Example: Storing a \`total_orders\` count on the User table instead of dynamically querying \`SELECT COUNT(*) FROM Orders WHERE user_id = X\` every time.
`,
    shortNotes: `
*   **Goal:** Reduce redundancy, prevent anomalies (Update, Insert, Delete).
*   **1NF:** Atomic values only. No arrays.
*   **2NF:** No partial dependencies (only matters for composite primary keys).
*   **3NF:** No transitive dependencies (Column A -> Column B -> PK).
*   **Denormalization:** Intentionally breaking normal forms to speed up read queries at the cost of slower/complex writes.
`,
    cheatSheet: `
| Normal Form | Rule |
|---|---|
| 1NF | Atomic values |
| 2NF | Fully dependent on the whole primary key |
| 3NF | Dependent on nothing but the primary key |
`,
    resources: []
  },

  dbms_19: {
    title: 'Database Concurrency',
    learningContent: `
# Database Concurrency Control
Concurrency control ensures that multiple transactions executing simultaneously do not destroy data integrity (ensuring the Isolation property of ACID).

## Two-Phase Locking (2PL)
The most common protocol to guarantee serializability. A transaction must acquire locks on objects before accessing them.
*   **Phase 1 (Growing Phase):** Transaction may obtain locks but may not release any.
*   **Phase 2 (Shrinking Phase):** Transaction may release locks but may not obtain any new ones.
If all transactions follow 2PL, their interleaved execution is guaranteed to be mathematically equivalent to some serial execution.
*   **Strict 2PL:** Holds all exclusive (write) locks until the transaction commits/aborts to prevent cascading aborts.

## Lock Types
*   **Shared Lock (S):** Allows reading. Multiple transactions can hold S-locks on the same item.
*   **Exclusive Lock (X):** Required for writing. Only one transaction can hold an X-lock.
`,
    fullNotes: `
# Multi-Version Concurrency Control (MVCC)
Modern databases (PostgreSQL, MySQL InnoDB) use MVCC instead of pure locking for better performance.
"Readers don't block writers, and writers don't block readers."

Instead of updating a row in place, MVCC creates a **new version** of the row. 
*   Each transaction is given a unique Transaction ID (Timestamp).
*   When a transaction reads data, it sees the version of the data that was committed *before* the transaction started (creating a consistent snapshot).
*   When it writes, it creates a new version.
*   A background process (Garbage Collection / Vacuuming) cleans up old, dead versions of rows that are no longer visible to any active transaction.

## Deadlocks in DB
Even with 2PL, deadlocks can occur (Tx A holds lock X, wants Y; Tx B holds lock Y, wants X). Databases typically use deadlock detection: they periodically build a wait-for graph, find cycles, and randomly kill (abort) one transaction to break the cycle. The application is expected to retry the aborted transaction.
`,
    shortNotes: `
*   **Concurrency Control:** Enforcing Isolation.
*   **2PL:** Growing phase (get locks), Shrinking phase (release locks). Guarantees serializability.
*   **Shared Lock:** Read-only, concurrent.
*   **Exclusive Lock:** Write, mutually exclusive.
*   **MVCC:** Readers read old snapshots; writers create new versions. Fast, read/write don't block each other.
*   **Deadlocks:** DB detects cycles and aborts a victim transaction.
`,
    cheatSheet: `
| Mechanism | Concept |
|---|---|
| 2PL | Locking protocol guaranteeing correctness |
| MVCC | Snapshot isolation using versions |
| Vacuum | Postgres process cleaning up dead MVCC versions |
`,
    resources: []
  },

  dbms_20: {
    title: 'Database Recovery',
    learningContent: `
# Database Recovery (Durability & Atomicity)
How does a database survive power outages and crashes without corrupting data?

## The Write-Ahead Log (WAL)
Also known as the Redo Log.
Before any changes are made to the actual database files on disk, the DBMS writes a record of the intended change to a sequential log file (the WAL) and forces it to disk.
*   Writing sequentially to a log is incredibly fast (disk spinning/SSD sequential writes).
*   Writing random pages to the main DB files is slow.
*   **Rule:** The log record must be safely on disk *before* the transaction is considered committed.

## Steal / No-Force Policy
Databases use a buffer pool in RAM to hold active pages.
*   **Steal:** The DB can write uncommitted data from RAM to the main disk file (to free up RAM). If it crashes, it must **Undo** these changes.
*   **No-Force:** The DB does not immediately force committed data to the main disk file (it relies on the WAL). If it crashes, it must **Redo** these changes from the log.
`,
    fullNotes: `
# ARIES Recovery Algorithm
Algorithms for Recovery and Isolation Exploiting Semantics (ARIES) is the standard algorithm for DB recovery.

When a crashed database reboots, ARIES runs in three passes:
1.  **Analysis Pass:** Reads the WAL forward to figure out what transactions were active at the time of the crash, and determines the state of dirty pages in memory.
2.  **Redo Pass:** Reads the WAL forward from a checkpoint, reapplying *all* changes (even those of uncommitted transactions) to bring the database exactly back to the state it was in at the moment of the crash.
3.  **Undo Pass:** Reads the WAL backward, undoing the operations of any transactions that were active (uncommitted) at the time of the crash.

## Checkpoints
To prevent the Redo pass from taking hours (scanning the log from the beginning of time), the DB periodically flushes all dirty RAM pages to disk and writes a "Checkpoint" record to the log. Recovery only needs to redo from the last checkpoint.
`,
    shortNotes: `
*   **WAL (Write-Ahead Log):** Sequential log of all changes. Must be on disk before commit.
*   **Durability:** Achieved by the WAL.
*   **Redo:** Reapplying committed changes from the log that didn't make it to the main DB files.
*   **Undo:** Reverting uncommitted changes that were written to the main DB files.
*   **ARIES:** 3-pass recovery protocol (Analysis, Redo, Undo).
*   **Checkpoint:** Periodic flush to disk to shorten recovery time.
`,
    cheatSheet: `
| Concept | Description |
|---|---|
| WAL | Sequential log of all writes |
| Steal | Uncommitted data written to disk |
| No-Force | Committed data NOT immediately written to data file |
| Undo | Revert uncommitted transactions |
| Redo | Reapply committed transactions |
`,
    resources: []
  }
};
