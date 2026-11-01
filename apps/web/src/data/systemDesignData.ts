// Auto-generated real system design curriculum data
export interface SystemDesignTopic {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  estimatedLearnTime: number;
  learningContent: string;
  fullNotes: string;
  shortNotes: string;
  cheatSheet: string;
  interviewQuestions: Array<{ question: string; answerHint: string; type: string }>;
  resources: Array<{ title: string; url: string; type: string }>;
}

export const SYSTEM_DESIGN_TOPICS: SystemDesignTopic[] = [
  {
    "id": "sd_01_fund",
    "slug": "fund",
    "title": "System Design Fundamentals",
    "description": "Introduction to large-scale distributed systems, client-server architecture, and the system design lifecycle.",
    "difficulty": "BEGINNER",
    "estimatedLearnTime": 60,
    "learningContent": "# System Design Fundamentals\n\nSystem Design is the process of defining the architecture, components, modules, interfaces, and data for a system to satisfy specified requirements. It is how you scale a system from 100 users to 100 million users.\n\n## Client-Server Architecture\nThe foundational model of the internet. \n- **Client:** The device/software requesting resources (Web browser, Mobile app).\n- **Server:** The device/software providing resources.\n\n## What happens when you type google.com?\n1. **DNS Resolution:** The browser asks the Domain Name System (DNS) to resolve \"google.com\" to an IP address.\n2. **TCP Connection:** The client opens a TCP connection to the server (Three-way handshake).\n3. **HTTP Request:** The client sends an HTTP GET request.\n4. **Server Processing:** The server processes the request (often hitting a database or cache).\n5. **HTTP Response:** The server returns the HTML/JSON.\n6. **Browser Rendering:** The client parses the HTML and renders the page.\n\n## Core Concepts to Master\n- Scalability (Vertical vs Horizontal)\n- Latency vs Throughput\n- Availability vs Consistency",
    "fullNotes": "# Detailed Notes: Fundamentals\n\n- **Latency:** The time it takes for data to traverse the network from sender to receiver. Measured in milliseconds (ms). High latency = slow response.\n- **Throughput:** The amount of data successfully transferred in a given time period. Often measured in Requests Per Second (RPS) or bandwidth (Mbps).\n- **Latency vs Throughput:** A highway analogy. Latency is the speed limit (how fast a car gets from A to B). Throughput is the number of lanes (how many cars can travel at once). You can have high latency but high throughput (shipping hard drives via FedEx).",
    "shortNotes": "- Client-Server is the standard model.\n- DNS = Phonebook of the internet.\n- Latency = Time to complete a single request.\n- Throughput = Number of requests completed per unit of time (RPS).\n- You scale a system to handle higher throughput while maintaining low latency.",
    "cheatSheet": "### Latency Numbers Every Programmer Should Know\n- L1 cache reference: 0.5 ns\n- Branch mispredict: 5 ns\n- L2 cache reference: 7 ns\n- Mutex lock/unlock: 25 ns\n- Main memory reference: 100 ns\n- Read 1 MB sequentially from memory: 250 us\n- Read 1 MB sequentially from SSD: 1 ms\n- Send packet CA->Netherlands->CA: 150 ms",
    "interviewQuestions": [
      {
        "question": "What is the difference between latency and throughput?",
        "answerHint": "Latency is the time it takes for a single request to complete (delay). Throughput is the number of requests the system can handle over a given time period (capacity).",
        "type": "CONCEPTUAL"
      }
    ],
    "resources": [
      {
        "title": "Client-Server Architecture Explained",
        "url": "https://www.youtube.com/watch?v=4r_2bQ0l1zE",
        "type": "VIDEO"
      },
      {
        "title": "System Design Fundamentals by Gaurav Sen",
        "url": "https://www.youtube.com/watch?v=xpDnVSmNFX0",
        "type": "VIDEO"
      },
      {
        "title": "System Design Primer",
        "url": "https://github.com/donnemartin/system-design-primer",
        "type": "ARTICLE"
      },
      {
        "title": "What happens when you type a URL?",
        "url": "https://github.com/alex/what-happens-when",
        "type": "ARTICLE"
      }
    ]
  },
  {
    "id": "sd_02_req",
    "slug": "req",
    "title": "Requirements & Estimation",
    "description": "Learn how to extract functional/non-functional requirements and perform back-of-the-envelope capacity estimations.",
    "difficulty": "INTERMEDIATE",
    "estimatedLearnTime": 60,
    "learningContent": "# Requirements & Estimation\n\nBefore designing any system, you must understand exactly what you are building and at what scale. This is the most critical part of a system design interview.\n\n## 1. Functional Requirements (FR)\nWhat should the system *do*? These are the core features.\n*Example for Twitter:* Users should be able to post a tweet. Users should see a timeline of tweets from people they follow.\n\n## 2. Non-Functional Requirements (NFR)\nHow should the system *behave*?\n*Example for Twitter:* High availability (must never go down), Low latency (timeline generation under 200ms), High read throughput (more reads than writes).\n\n## 3. Back-of-the-Envelope Estimation\nEstimating scale helps you decide on architecture tradeoffs. If a system has 10,000 DAU (Daily Active Users), a single SQL database is fine. If it has 100 Million DAU, you need sharding and caching.\n- Estimate Traffic (Requests Per Second - RPS).\n- Estimate Storage (Data generated per day/year).\n- Estimate Bandwidth (Inbound vs Outbound).",
    "fullNotes": "# Detailed Notes: Estimation\n\n- **The 80/20 Rule:** 80% of the traffic is generated by 20% of the users.\n- **Read-to-Write Ratio:** Understand if the system is read-heavy (Twitter is 100:1 read:write) or write-heavy (IoT sensor metrics).\n- **RPS Calculation:**\n  - 100 Million DAU. \n  - On average, a user makes 10 requests per day.\n  - Total requests/day = 1 Billion.\n  - 1 Billion / 86400 (seconds in a day) ≈ 11,500 RPS (Average).\n  - Peak RPS = Average RPS * 2 = 23,000 RPS.",
    "shortNotes": "- FR = Features (Post tweet, like tweet).\n- NFR = System constraints (Availability, Latency, Consistency).\n- Always clarify scale before designing (DAU, Read/Write ratio).\n- 1 day = 86,400 seconds (~100,000 for easy math).\n- Calculate: Traffic (RPS), Storage (TB/year), Bandwidth (Gbps).",
    "cheatSheet": "### Estimation Math Shortcuts\n- 1 million requests / day = ~12 RPS\n- 100 million requests / day = ~1200 RPS\n- 1 character = 1 byte\n- 1 image = ~1-2 MB\n- 1 video = ~50-100 MB\n\n### Powers of 2/10\n- 1 KB = 10^3 bytes\n- 1 MB = 10^6 bytes\n- 1 GB = 10^9 bytes\n- 1 TB = 10^12 bytes\n- 1 PB = 10^15 bytes",
    "interviewQuestions": [
      {
        "question": "Why do we perform back-of-the-envelope estimations?",
        "answerHint": "To understand the scale of the system, which directly dictates the architecture. A system expecting 100 RPS uses a vastly different architecture than a system expecting 100,000 RPS (which requires sharding, caching, and heavy horizontal scaling).",
        "type": "CONCEPTUAL"
      }
    ],
    "resources": [
      {
        "title": "Capacity Estimation in System Design Interviews",
        "url": "https://www.youtube.com/watch?v=b4wHwE7xQk0",
        "type": "VIDEO"
      },
      {
        "title": "Back-of-the-envelope Calculation for System Design",
        "url": "https://www.youtube.com/watch?v=s-tEhe0T1QY",
        "type": "VIDEO"
      },
      {
        "title": "Back of the Envelope Estimation",
        "url": "https://igotanoffer.com/blogs/tech/back-of-the-envelope-calculations-system-design-interviews",
        "type": "ARTICLE"
      }
    ]
  },
  {
    "id": "sd_03_api",
    "slug": "api",
    "title": "API & Service Design",
    "description": "Design robust APIs (REST, GraphQL, gRPC) and understand the differences between synchronous and asynchronous communication.",
    "difficulty": "INTERMEDIATE",
    "estimatedLearnTime": 90,
    "learningContent": "# API & Service Design\n\nAfter gathering requirements, you define the system's boundary: The APIs. APIs define how clients interact with your system, and how internal microservices interact with each other.\n\n## API Paradigms\n1. **REST (Representational State Transfer):** Standard HTTP verbs (GET, POST, PUT, DELETE). Resource-oriented. Best for public APIs.\n2. **GraphQL:** Client specifies exactly what data it wants. Great for mobile clients to prevent over-fetching or under-fetching.\n3. **gRPC:** High-performance Remote Procedure Call framework using Protocol Buffers and HTTP/2. Heavily used for internal microservice-to-microservice communication due to low latency and binary format.\n4. **WebSockets:** Bidirectional, persistent connection. Used for real-time applications (Chat, live sports scores, trading).\n\n## API Design Best Practices\n- **Pagination:** Never return 10,000 records. Use Offset/Limit or Cursor-based pagination.\n- **Versioning:** APIs change. Always version them (e.g., \\`/v1/users\\`) to avoid breaking existing clients.\n- **Idempotency:** An API is idempotent if calling it multiple times has the same result as calling it once (e.g., PUT or DELETE). Crucial for handling network retries safely.",
    "fullNotes": "# Detailed Notes: API Design\n\n- **Cursor vs Offset Pagination:** Offset (\\`LIMIT 10 OFFSET 1000\\`) is slow on large datasets because the DB must scan and skip 1000 rows. Cursor-based (\\`WHERE id > last_seen_id LIMIT 10\\`) is fast and handles real-time data insertions gracefully without skipping items.\n- **Synchronous vs Asynchronous APIs:**\n  - *Sync:* Client waits for the response (HTTP request/response).\n  - *Async:* Client submits a job, gets an immediate \"202 Accepted\" status, and polls for the result (or receives a webhook callback later). Used for heavy processing tasks (e.g., video encoding).",
    "shortNotes": "- REST = Public APIs, Resource-based.\n- GraphQL = Flexible querying, prevents over-fetching.\n- gRPC = Internal microservices, binary, very fast.\n- WebSockets = Real-time, bidirectional.\n- Always implement Pagination (Prefer cursor-based for scale).\n- Make critical endpoints (like payments) Idempotent.",
    "cheatSheet": "### Idempotency Key Flow (Payments)\n1. Client generates UUID (Idempotency Key).\n2. Client sends POST /payments with Key.\n3. Server checks DB: Does Key exist?\n4. If YES -> Return saved result (don't charge again).\n5. If NO -> Process payment, save result against Key, return success.",
    "interviewQuestions": [
      {
        "question": "When would you choose GraphQL over REST?",
        "answerHint": "When clients have diverse data requirements (e.g., mobile vs web). GraphQL allows the client to request exactly what it needs, preventing over-fetching (wasting bandwidth) and under-fetching (requiring multiple API calls).",
        "type": "TECHNICAL"
      },
      {
        "question": "What is API Idempotency and why is it important?",
        "answerHint": "Idempotency ensures that making the same request multiple times produces the same result as making it once. It is critical in distributed systems where network timeouts occur; clients can safely retry a POST request (like a payment) without double-charging.",
        "type": "CONCEPTUAL"
      }
    ],
    "resources": [
      {
        "title": "Designing Idempotent APIs at Scale",
        "url": "https://www.youtube.com/watch?v=y889p4v_q2w",
        "type": "VIDEO"
      },
      {
        "title": "REST vs GraphQL vs gRPC Deep Dive",
        "url": "https://www.youtube.com/watch?v=IvsNO02cxZU",
        "type": "VIDEO"
      },
      {
        "title": "REST API Design Best Practices",
        "url": "https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/",
        "type": "ARTICLE"
      }
    ]
  },
  {
    "id": "sd_04_db",
    "slug": "db",
    "title": "Databases & Data Modeling",
    "description": "Learn when to use SQL vs NoSQL, how to model data for scale, and the fundamentals of indexing.",
    "difficulty": "ADVANCED",
    "estimatedLearnTime": 120,
    "learningContent": "# Databases & Data Modeling\n\nChoosing the right database is often the most critical architectural decision.\n\n## SQL (Relational Databases)\n- **Examples:** MySQL, PostgreSQL.\n- **Structure:** Tables, rows, rigid schema.\n- **Strengths:** ACID compliance (Atomicity, Consistency, Isolation, Durability). Great for structured data with complex relationships (joins).\n- **Weaknesses:** Hard to scale horizontally. You usually scale vertically (bigger server), which hits a hardware limit.\n\n## NoSQL (Non-Relational Databases)\n- **Key-Value:** Redis, DynamoDB. Extremely fast, simple data retrieval.\n- **Document:** MongoDB. Flexible JSON-like schema. Good for rapidly changing data.\n- **Column-Family:** Cassandra, HBase. Optimized for writing massive amounts of data and time-series data.\n- **Graph:** Neo4j. Optimized for deeply interconnected data (social networks, recommendation engines).\n- **Strengths:** Designed for horizontal scaling (sharding) out of the box. High availability.\n- **Weaknesses:** No traditional joins, weaker consistency models (Eventual Consistency).\n\n## Indexing\nAn index is a data structure (usually a B-Tree) that improves the speed of data retrieval at the cost of slower writes and more storage space. If a query is slow, the first step is usually to add an index.",
    "fullNotes": "# Detailed Notes: Databases\n\n- **ACID vs BASE:**\n  - *ACID (SQL):* Atomicity (all or nothing), Consistency (valid data only), Isolation (concurrent transactions don't interfere), Durability (saved permanently).\n  - *BASE (NoSQL):* Basically Available, Soft state, Eventual consistency. Prioritizes availability over immediate consistency.\n- **Data Modeling in NoSQL:** In SQL, you normalize data to reduce redundancy. In NoSQL, you **denormalize** data (duplicate it) to optimize for read queries. You model NoSQL databases based on the *queries* you need to run, not the relationships.",
    "shortNotes": "- SQL: ACID compliant, rigid schema, complex JOINs, scales vertically.\n- NoSQL: Flexible schema, scales horizontally, eventual consistency.\n- Use SQL for financial data, strict relationships.\n- Use NoSQL for massive scale, unstructured data, rapid iteration.\n- Indexing speeds up Reads but slows down Writes.\n- Denormalize data in NoSQL to avoid JOINs.",
    "cheatSheet": "### Database Selection Guide\n- Financial Transactions -> Relational (Postgres/MySQL)\n- User Session Data -> Key-Value (Redis)\n- Product Catalog (Flexible attributes) -> Document (MongoDB)\n- Massive Write Heavy / Time Series (IoT) -> Column (Cassandra)\n- Social Graph / Recommendations -> Graph (Neo4j)\n- Full Text Search -> Search Engine (Elasticsearch)",
    "interviewQuestions": [
      {
        "question": "When would you choose NoSQL over SQL?",
        "answerHint": "When the system requires massive horizontal scale (which SQL struggles with), the data schema is highly flexible/changing, or you have a massive volume of unstructured data and can tolerate eventual consistency.",
        "type": "TECHNICAL"
      },
      {
        "question": "What is the tradeoff of adding an Index to a database table?",
        "answerHint": "Indexes drastically speed up Read queries (O(log N) instead of O(N) full table scans). However, they consume extra disk space and slow down Write queries (INSERT/UPDATE/DELETE), because the index must be updated every time data changes.",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "Database Indexing & B-Trees Explained",
        "url": "https://www.youtube.com/watch?v=aZjYr87r1b8",
        "type": "VIDEO"
      },
      {
        "title": "SQL vs NoSQL",
        "url": "https://www.youtube.com/watch?v=ZS_kXvOeQ5Y",
        "type": "VIDEO"
      }
    ]
  },
  {
    "id": "sd_05_cache",
    "slug": "cache",
    "title": "Caching & Performance",
    "description": "Learn caching strategies, CDN architectures, and how to dramatically improve system latency.",
    "difficulty": "INTERMEDIATE",
    "estimatedLearnTime": 90,
    "learningContent": "# Caching & Performance\n\nDatabases are stored on disk (mostly). Disks are slow. Caching involves storing copies of frequently accessed data in memory (RAM), which is orders of magnitude faster.\n\n## Caching Layers\n- **Client Cache:** Browser caching (HTML, CSS, JS).\n- **CDN (Content Delivery Network):** A geographically distributed network of proxy servers that cache static assets (images, videos) closer to the user.\n- **Web Server Cache:** Reverse proxies (like NGINX or Varnish) caching full HTTP responses.\n- **Application/Database Cache:** Memcached or Redis. Stores database query results or computed objects.\n\n## Caching Strategies (Eviction & Updating)\nWhen the cache is full, or data changes, how do we handle it?\n1. **Cache Aside (Lazy Loading):** Application asks the cache. If miss, it asks the DB, then writes to the cache. (Best for read-heavy).\n2. **Write-Through:** Application writes to the cache AND the database synchronously. (Data is always consistent, but writes are slower).\n3. **Write-Behind (Write-Back):** Application writes to the cache. The cache asynchronously writes to the DB later. (Fastest writes, but risk of data loss if cache crashes).\n4. **Eviction Policies:** LRU (Least Recently Used) is the most common. LFU (Least Frequently Used), FIFO (First In First Out).",
    "fullNotes": "# Detailed Notes: Caching\n\n- **Cache Invalidation:** As Phil Karlton said, \"There are only two hard things in Computer Science: cache invalidation and naming things.\" Keeping the cache consistent with the database is notoriously difficult. If the DB changes, the cache must be updated or purged.\n- **The Thundering Herd Problem (Cache Stampede):** If a highly popular cached item expires, thousands of concurrent requests will all get a \"cache miss\" and hit the database simultaneously, potentially crashing it. *Solution:* Use locking/mutex so only the first request queries the DB and repopulates the cache, while others wait.",
    "shortNotes": "- Caching stores data in RAM (Redis/Memcached) for speed.\n- CDN caches static assets geographically close to the user.\n- Cache Aside: App checks cache -> if miss, checks DB -> updates cache.\n- Write-Through: App writes to Cache & DB at the same time.\n- LRU (Least Recently Used) is the standard eviction policy.\n- Cache Invalidation is the hardest part of caching.",
    "cheatSheet": "### When to use a Cache\n- The data changes infrequently but is read frequently.\n- The computation is expensive (e.g., generating a weekly report).\n- You need to reduce load on the primary database.\n\n### Cache vs CDN\n- **Cache:** Application data (JSON, Query results, User sessions).\n- **CDN:** Static files (Images, CSS, JS, Videos).",
    "interviewQuestions": [
      {
        "question": "What is the Cache Aside pattern?",
        "answerHint": "The application first checks the cache for data. If found (Cache Hit), it returns it. If not found (Cache Miss), the application queries the database, writes the result to the cache for future requests, and then returns the data.",
        "type": "TECHNICAL"
      },
      {
        "question": "What is a CDN and why is it used?",
        "answerHint": "A Content Delivery Network is a globally distributed network of servers. It caches static assets (images, videos, JS) close to the physical location of the users, drastically reducing latency and offloading traffic from the origin servers.",
        "type": "CONCEPTUAL"
      }
    ],
    "resources": [
      {
        "title": "Thundering Herd & Cache Invalidation",
        "url": "https://www.youtube.com/watch?v=U3RkxzJd_tY",
        "type": "VIDEO"
      },
      {
        "title": "Caching Strategies & Redis Architecture by ByteByteGo",
        "url": "https://www.youtube.com/watch?v=dGAgxozNWFE",
        "type": "VIDEO"
      },
      {
        "title": "Caching Strategies",
        "url": "https://docs.aws.amazon.com/AmazonElastiCache/latest/mem-ug/Strategies.html",
        "type": "ARTICLE"
      }
    ]
  },
  {
    "id": "sd_06_load",
    "slug": "load",
    "title": "Load Balancing & Scalability",
    "description": "Learn how to distribute traffic across multiple servers using Load Balancers and horizontal scaling.",
    "difficulty": "INTERMEDIATE",
    "estimatedLearnTime": 60,
    "learningContent": "# Load Balancing & Scalability\n\nWhen one server can no longer handle the traffic (reaching vertical scaling limits), you add more servers (horizontal scaling). But how do clients know which server to talk to?\n\n## What is a Load Balancer (LB)?\nA Load Balancer sits between the clients and the servers. It accepts incoming network traffic and distributes it across multiple backend servers to ensure no single server becomes overwhelmed. \n- It prevents single points of failure.\n- It performs Health Checks to ensure traffic isn't sent to dead servers.\n\n## Routing Algorithms\n1. **Round Robin:** Requests are distributed sequentially across the group of servers.\n2. **Least Connections:** Sends the new request to the server with the fewest active connections.\n3. **IP Hash:** The client's IP address is hashed to determine which server receives the request. This ensures a specific user is always routed to the same server (Sticky Sessions).\n\n## L4 vs L7 Load Balancing\n- **Layer 4 (Transport):** Balances based on IP address and TCP port. Fast, but blind to the content of the request.\n- **Layer 7 (Application):** Balances based on the HTTP header, URL, or cookies. Slower, but allows smart routing (e.g., routing \\`/video\\` traffic to specialized video servers).",
    "fullNotes": "# Detailed Notes: Load Balancing\n\n- **Sticky Sessions:** If your application stores session data in local server memory (bad practice for distributed systems), you must use IP Hashing so the user always hits the same server. *Better design:* Store session data in a distributed cache like Redis, making the web servers stateless, allowing Round Robin to work perfectly.\n- **Hardware vs Software LBs:** Historically, companies bought expensive hardware LBs (F5). Today, software LBs (NGINX, HAProxy) or Cloud managed LBs (AWS ALB, ELB) are standard.",
    "shortNotes": "- LB distributes traffic across multiple servers.\n- Essential for Horizontal Scaling and High Availability.\n- Algorithms: Round Robin, Least Connections, IP Hash.\n- Layer 4 (Network level, fast) vs Layer 7 (HTTP level, smart).\n- Always aim for stateless backend servers so any LB algorithm works without sticky sessions.",
    "cheatSheet": "### Horizontal vs Vertical Scaling\n- **Vertical (Scale Up):** Buying a bigger CPU/RAM. Limited by hardware. Requires downtime.\n- **Horizontal (Scale Out):** Adding more commodity servers. Infinite scaling. Requires a Load Balancer.\n\n### Load Balancer Placements\n1. Between User and Web Servers.\n2. Between Web Servers and Internal Application Servers.\n3. Between Application Servers and Databases.",
    "interviewQuestions": [
      {
        "question": "What is the difference between a Layer 4 and Layer 7 Load Balancer?",
        "answerHint": "Layer 4 routes traffic based on network data (IP and Port) without inspecting the payload, making it very fast. Layer 7 inspects the application layer (HTTP headers, URLs, Cookies) allowing for complex routing decisions (like routing /api to one server group and /images to another).",
        "type": "TECHNICAL"
      },
      {
        "question": "Why are Sticky Sessions generally considered an anti-pattern in modern system design?",
        "answerHint": "They break the statelessness of web servers. If a server goes down, the user loses their session. It also makes it harder to evenly distribute load. The better approach is to store sessions in a distributed cache (like Redis).",
        "type": "CONCEPTUAL"
      }
    ],
    "resources": [
      {
        "title": "Consistent Hashing Explained by Gaurav Sen",
        "url": "https://www.youtube.com/watch?v=zaRkONvyGr8",
        "type": "VIDEO"
      },
      {
        "title": "Load Balancing Algorithms & Layer 4 vs Layer 7",
        "url": "https://www.youtube.com/watch?v=2Tz8N_jG_gA",
        "type": "VIDEO"
      },
      {
        "title": "What is Load Balancing?",
        "url": "https://www.nginx.com/resources/glossary/load-balancing/",
        "type": "ARTICLE"
      }
    ]
  },
  {
    "id": "sd_07_shard",
    "slug": "shard",
    "title": "Replication, Partitioning & Sharding",
    "description": "Learn how to scale databases horizontally by replicating data for availability and sharding data for capacity.",
    "difficulty": "ADVANCED",
    "estimatedLearnTime": 120,
    "learningContent": "# Replication, Partitioning & Sharding\n\nA single database server has limits on storage, CPU, and memory. How do we scale the data layer?\n\n## 1. Database Replication (Scaling Reads & Availability)\nReplication keeps copies of the same data across multiple machines.\n- **Master-Slave (Leader-Follower):** Writes go ONLY to the Master. Reads can go to the Master or the Slaves. This scales read-heavy applications and provides a backup if the Master dies.\n- **Master-Master:** Writes can go to any node. Extremely complex due to write conflicts.\n\n## 2. Partitioning / Sharding (Scaling Writes & Storage)\nSharding is the process of splitting a single massive database into smaller, more manageable pieces called shards. Each shard holds a unique subset of the data.\n- **Partition Key (Shard Key):** The logic used to distribute the data. Example: Sharding users based on \\`user_id % number_of_shards\\`.\n- If User 10 goes to Shard 2, and User 11 goes to Shard 3, the database storage and write capacity is now doubled.\n\n## Sharding Strategies\n- **Hash-based Sharding:** Hash the key to determine the shard. Even distribution, but very hard to add new shards later without rehashing everything (Consistent Hashing solves this).\n- **Range-based Sharding:** E.g., Users A-M on Shard 1, N-Z on Shard 2. Easy to query ranges, but prone to hotspots (e.g., if everyone registers with names starting with A).\n- **Directory-based Sharding:** A lookup service keeps a map of which key lives on which shard.",
    "fullNotes": "# Detailed Notes: Sharding\n\n- **The Celebrity Problem (Hotspots):** If you shard a social network by UserID, a celebrity with millions of followers will overwhelm the shard they live on, while other shards remain idle. You must carefully choose a shard key to ensure even data distribution.\n- **Consistent Hashing:** A technique used in distributed hash tables (like Cassandra/DynamoDB) to minimize data movement when shards are added or removed. Instead of a modulo operation, servers and keys are placed on a conceptual \"ring\".\n- **Cross-Shard Joins:** Sharding breaks traditional SQL JOINs. If Table A is on Shard 1 and Table B is on Shard 2, you cannot join them at the database level. The application must fetch both and join them in memory, or data must be denormalized.",
    "shortNotes": "- Replication = Copies of the same data. (Improves Read scaling & Availability).\n- Sharding = Splitting data into pieces. (Improves Write scaling & Storage).\n- Master-Slave: Writes to Master, Reads to Slaves.\n- Shard Key: Critical choice. Bad keys cause uneven loads (Hotspots).\n- Consistent Hashing allows adding/removing servers with minimal data migration.\n- Sharding makes JOINs and ACID transactions across shards extremely difficult.",
    "cheatSheet": "### When to Shard?\nSharding adds massive complexity. You should only shard when:\n1. The dataset is too large to fit on a single node's disk.\n2. The write volume exceeds what a single node can handle.\n3. You have already exhausted Vertical Scaling, Read Replicas, and Caching.",
    "interviewQuestions": [
      {
        "question": "What is the difference between Replication and Sharding?",
        "answerHint": "Replication duplicates the exact same dataset across multiple servers to improve read throughput and provide fault tolerance. Sharding splits the dataset into smaller, unique chunks across multiple servers to increase total storage and write capacity.",
        "type": "CONCEPTUAL"
      },
      {
        "question": "What is Consistent Hashing and what problem does it solve?",
        "answerHint": "In standard hash-based sharding (key % N), changing the number of servers (N) requires moving almost all data. Consistent hashing places data and servers on a ring; adding or removing a server only affects the immediate neighbors on the ring, drastically minimizing data migration.",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "Handling Cross-Shard Transactions",
        "url": "https://www.youtube.com/watch?v=p7N1XpUa_Q0",
        "type": "VIDEO"
      },
      {
        "title": "Database Sharding & Partitioning Strategies",
        "url": "https://www.youtube.com/watch?v=5faMjKuB9bc",
        "type": "VIDEO"
      },
      {
        "title": "Understanding Database Sharding",
        "url": "https://www.digitalocean.com/community/tutorials/understanding-database-sharding",
        "type": "ARTICLE"
      }
    ]
  },
  {
    "id": "sd_08_cap",
    "slug": "cap",
    "title": "Consistency, Availability & Reliability",
    "description": "Master the CAP theorem, PACELC, consistency models, and how distributed systems handle failure.",
    "difficulty": "ADVANCED",
    "estimatedLearnTime": 120,
    "learningContent": "# Consistency, Availability & Reliability\n\nWhen building distributed systems, hardware *will* fail. Networks *will* partition. How your system handles these failures is defined by its consistency and availability targets.\n\n## The CAP Theorem\nIn a distributed system, you can only guarantee two out of the following three traits at the same time:\n1. **Consistency (C):** Every read receives the most recent write or an error. (All nodes see the exact same data at the exact same time).\n2. **Availability (A):** Every request receives a non-error response, without the guarantee that it contains the most recent write.\n3. **Partition Tolerance (P):** The system continues to operate despite an arbitrary number of messages being dropped/delayed between nodes (network failure).\n\n**Reality:** Because networks are unreliable, network partitions (P) are unavoidable. Therefore, when a partition occurs, a distributed system must choose between Consistency (CP) and Availability (AP).\n- **CP Systems:** If nodes can't talk, the system refuses to answer (errors out) rather than return stale data. (e.g., Bank transaction, MongoDB).\n- **AP Systems:** If nodes can't talk, they return the data they have, even if it's stale. (e.g., Social media feed, Cassandra, DynamoDB).\n\n## Consistency Models\n- **Strong Consistency:** After a write completes, any subsequent read will return that updated value. (High latency).\n- **Eventual Consistency:** If no new updates are made, eventually all accesses will return the last updated value. (Low latency, high availability).",
    "fullNotes": "# Detailed Notes: CAP & PACELC\n\n- **PACELC Theorem:** An extension to CAP. It states that in case of a network Partition (P), one must choose between Availability (A) and Consistency (C). **E**lse (E), even when the system is running normally (no partition), one must choose between Latency (L) and Consistency (C). \n- **Quorums in AP/CP Systems:** Distributed databases use quorums (voting) for reads/writes. \\`W + R > N\\` (Write nodes + Read nodes > Total Nodes) guarantees strong consistency, but increases latency.\n- **Fault Tolerance:** Techniques to prevent system failure.\n  - *Retries:* With Exponential Backoff and Jitter (to prevent DDoS'ing your own recovering service).\n  - *Circuit Breaker:* If a downstream service is failing, stop sending requests immediately (open circuit) to let it recover, returning cached/fallback data instead.",
    "shortNotes": "- CAP Theorem: Pick 2 of Consistency, Availability, Partition Tolerance.\n- You must always have P. Therefore, choose CP or AP.\n- CP: Stops responding if there's a network split to avoid bad data (Banking).\n- AP: Keeps responding with potentially stale data (Social Media).\n- Strong Consistency = Slow. Eventual Consistency = Fast.\n- Circuit Breakers prevent cascading failures across microservices.",
    "cheatSheet": "### Database CAP Classifications\n- **CA (Does not scale horizontally):** Single-node PostgreSQL / MySQL.\n- **CP (Consistency/Partition Tolerance):** MongoDB, HBase, Redis (mostly).\n- **AP (Availability/Partition Tolerance):** Cassandra, DynamoDB, CouchDB.",
    "interviewQuestions": [
      {
        "question": "What is Eventual Consistency?",
        "answerHint": "A model where the system guarantees that if no new updates are made to a given piece of data, eventually all accesses to that item will return the last updated value. It sacrifices immediate consistency for high availability and low latency.",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "Raft Distributed Consensus Algorithm",
        "url": "https://www.youtube.com/watch?v=vYp4KVfMXT4",
        "type": "VIDEO"
      },
      {
        "title": "CAP Theorem Simplified with Real World Examples",
        "url": "https://www.youtube.com/watch?v=BHqjEjzAicA",
        "type": "VIDEO"
      },
      {
        "title": "An Illustrated Proof of the CAP Theorem",
        "url": "https://mwhittaker.github.io/consistency_in_distributed_systems/1_cap.html",
        "type": "ARTICLE"
      }
    ]
  },
  {
    "id": "sd_09_msg",
    "slug": "msg",
    "title": "Messaging & Event-Driven Architecture",
    "description": "Learn message queues, pub/sub systems (Kafka/RabbitMQ), and asynchronous processing.",
    "difficulty": "ADVANCED",
    "estimatedLearnTime": 120,
    "learningContent": "# Messaging & Event-Driven Architecture\n\nIn a distributed system, services shouldn't always talk to each other synchronously (via HTTP/REST). If Service A calls Service B, and Service B is down, Service A fails. \n\n## Message Queues (Point-to-Point)\nA Message Queue receives, holds, and delivers messages.\n- **Producer:** Sends the message.\n- **Consumer:** Reads and processes the message.\n- Once a message is consumed, it is deleted from the queue. (Example: RabbitMQ, AWS SQS).\n- *Use Case:* Background jobs (sending emails, video processing).\n\n## Publish-Subscribe (Pub/Sub)\n- **Publisher:** Broadcasts a message to a \"Topic\".\n- **Subscriber:** Multiple services can subscribe to the Topic and receive a copy of the same message.\n- *Use Case:* An order is placed. The \\`OrderService\\` publishes an \\`OrderCreated\\` event. The \\`EmailService\\",
    "fullNotes": "# Detailed Notes: Messaging\n\n- **Kafka vs RabbitMQ:**\n  - *RabbitMQ:* Smart Broker / Dumb Consumer. RabbitMQ tracks which messages have been read. Great for task queues.\n  - *Kafka:* Dumb Broker / Smart Consumer. Kafka is an append-only distributed log. Messages are persisted to disk for a retention period (e.g., 7 days) and are NOT deleted when read. Consumers track their own \"offset\" (which message they read last). Incredible throughput, great for event streaming.\n- **Dead Letter Queue (DLQ):** If a consumer repeatedly fails to process a message (e.g., bug in code), the message is moved to a DLQ so it doesn't block the queue, allowing engineers to inspect the failure later.",
    "shortNotes": "- Message Queue = Async processing, decoupling, point-to-point (RabbitMQ, SQS).\n- Pub/Sub = One-to-many broadcasting (Kafka, SNS).\n- Queues provide buffer/rate-limiting (Consumer pulls at its own pace).\n- Kafka stores messages permanently (logs). RabbitMQ deletes after consumption.\n- Use a Dead Letter Queue (DLQ) for failed messages.",
    "cheatSheet": "### Push vs Pull Consumers\n- **Push:** The broker pushes messages to the consumer. Low latency, but can overwhelm the consumer if traffic spikes.\n- **Pull (Polling):** The consumer asks the broker for messages when it is ready. Standard in Kafka and SQS. Prevents the consumer from crashing under heavy load.",
    "interviewQuestions": [
      {
        "question": "What problem do Message Queues solve in system design?",
        "answerHint": "Decoupling and buffering. They allow the producer to send data without waiting for the consumer to process it. If traffic spikes, the queue buffers the messages, preventing the consumer backend from crashing under the load (smoothing out traffic).",
        "type": "CONCEPTUAL"
      },
      {
        "question": "What is the main architectural difference between RabbitMQ and Apache Kafka?",
        "answerHint": "RabbitMQ is a traditional message broker where messages are deleted after being acknowledged by the consumer. Kafka is a distributed event streaming platform (a distributed append-only log) where messages are persisted to disk and consumers read sequentially using offsets.",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "Message Queues vs Pub/Sub Explained",
        "url": "https://www.youtube.com/watch?v=oUJbuFMyBDk",
        "type": "VIDEO"
      },
      {
        "title": "Kafka Architecture & Event Driven Microservices",
        "url": "https://www.youtube.com/watch?v=R873BlNVUB4",
        "type": "VIDEO"
      },
      {
        "title": "Kafka vs RabbitMQ",
        "url": "https://www.youtube.com/watch?v=HjrGVqmzqjs",
        "type": "VIDEO"
      }
    ]
  },
  {
    "id": "sd_10_arch",
    "slug": "arch",
    "title": "Architecture Patterns",
    "description": "Compare Monoliths, Microservices, API Gateways, and Service Discovery.",
    "difficulty": "ADVANCED",
    "estimatedLearnTime": 90,
    "learningContent": "# Architecture Patterns\n\n## Monolith\nA unified software architecture where all components (UI, business logic, data access) are combined into a single program.\n- *Pros:* Easy to develop, test, and deploy initially.\n- *Cons:* Hard to scale independently (if only the video-processing part needs scaling, you have to scale the whole app). Codebase becomes tangled and hard for large teams to manage.\n\n## Microservices\nAn architectural style that structures an application as a collection of loosely coupled, independently deployable services organized around business capabilities.\n- *Pros:* Independent scaling, technology diversity (Service A in Python, Service B in Go), fault isolation.\n- *Cons:* Massive operational complexity. Distributed transactions, network latency, observability, and debugging become very difficult.\n\n## API Gateway\nIn a microservices architecture, clients shouldn't call 50 different internal services directly. An API Gateway sits in front of the services.\n- Acts as a single entry point.\n- Handles Authentication, Rate Limiting, and SSL Termination.\n- Routes requests to the appropriate internal microservice.\n\n## Service Discovery\nMicroservices are dynamic; they scale up and down, and their IPs change constantly. Service Discovery (like Consul or Zookeeper) acts as an internal phonebook. When Service A needs to call Service B, it asks the Service Discovery registry for Service B's current IP address.",
    "fullNotes": "# Detailed Notes: Architecture Patterns\n\n- **Distributed Transactions:** In a monolith, saving an Order and updating Inventory happens in one ACID transaction. In microservices, they are different databases. We use patterns like **Saga Pattern** (a sequence of local transactions where each updates the DB and publishes a message to trigger the next step. If a step fails, compensating transactions run to undo the previous steps).\n- **Two-Phase Commit (2PC):** A strict distributed transaction model, but highly unscalable because it locks resources across multiple databases until all confirm readiness. Avoid in modern systems.",
    "shortNotes": "- Monolith: Simple, single codebase, scales vertically or by cloning.\n- Microservices: Complex, independent deployment, isolated faults.\n- API Gateway: Single entry point, handles Auth/Rate Limiting.\n- Service Discovery: The dynamic internal phonebook for microservice IPs.\n- Saga Pattern: Handles transactions across multiple microservice databases.",
    "cheatSheet": "### Microservice Migration Rules\n1. Never start with Microservices. Start with a Modular Monolith.\n2. Only split a service when the team size or scaling requirements demand it.\n3. Every microservice must have its own isolated database.",
    "interviewQuestions": [
      {
        "question": "What is the role of an API Gateway in a microservices architecture?",
        "answerHint": "It acts as the single point of entry for all clients. It handles cross-cutting concerns like routing, authentication, SSL termination, rate limiting, and response caching, preventing every individual microservice from having to implement these.",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "Circuit Breakers & Resilience with Envoy",
        "url": "https://www.youtube.com/watch?v=ADHcBxEXvFA",
        "type": "VIDEO"
      },
      {
        "title": "Microservices vs Monolith: Architectural Tradeoffs",
        "url": "https://www.youtube.com/watch?v=GBTdnwkXp2E",
        "type": "VIDEO"
      },
      {
        "title": "Microservices Pattern",
        "url": "https://microservices.io/",
        "type": "ARTICLE"
      }
    ]
  },
  {
    "id": "sd_11_hld",
    "slug": "hld",
    "title": "High-Level Design Case Studies",
    "description": "Learn to design complex, real-world systems: URL Shortener, Twitter/News Feed, Chat, and Rate Limiters.",
    "difficulty": "ADVANCED",
    "estimatedLearnTime": 180,
    "learningContent": "# High-Level Design (HLD) Case Studies\n\nIn system design interviews, you are asked to design a massive, real-world application.\n\n## 1. Design a URL Shortener (TinyURL)\n- **Core Requirement:** Given a long URL, return a short URL. When hitting the short URL, redirect to the long one.\n- **Scale:** Write-heavy or Read-heavy? Heavily Read (100:1).\n- **Data Model:** Simple Key-Value mapping. NoSQL (DynamoDB/Cassandra) or RDBMS with sharding.\n- **Logic:** Take an auto-incrementing ID from the DB, convert it to Base62 (A-Z, a-z, 0-9) to get the short string (e.g., ID 125 -> \\`cb\\`).\n- **Optimization:** Caching is critical here since identical short URLs will be requested millions of times.\n\n## 2. Design a News Feed (Twitter/Facebook)\n- **Core Requirement:** User opens app and sees a chronological feed of posts from friends.\n- **Challenge:** Generating the feed on-the-fly via SQL JOINs (User -> Follows -> Posts) is too slow for millions of users.\n- **Solution (Fan-out on Write):** When a user posts, a background worker pushes that post directly into a pre-computed \"Feed Cache\" (Redis) for every single one of their followers. \n- **The Justin Bieber Problem:** If someone has 100M followers, fanning out on write will crash the system. Hybrid approach: Fan-out on write for normal users, Fan-out on read (pull) for celebrities.\n\n## 3. Design a Rate Limiter\n- **Algorithms:**\n  - *Token Bucket:* A bucket has N tokens. Requests take a token. Tokens refill at a constant rate.\n  - *Sliding Window Log:* Track timestamps of requests in Redis. Accurate but memory heavy.\n  - *Sliding Window Counter:* Optimizes memory by bucketing timestamps.\n- **Storage:** Redis (in-memory, fast, supports TTL).",
    "fullNotes": "# Detailed Notes: HLD Case Studies\n\n- **Design a Chat System (WhatsApp/Discord):**\n  - **Protocol:** HTTP is bad for chat (client has to poll). Use **WebSockets** for a persistent, bidirectional connection.\n  - **Architecture:** Client connects to a Chat Server via WebSocket. The Chat Server holds the connection open.\n  - **Routing:** If User A sends a message to User B, but they are connected to different Chat Servers, we need a mechanism to route it. The Chat Server pushes the message to a Pub/Sub system (Kafka/Redis PubSub). A Presence/Routing Service knows which Chat Server User B is connected to, and forwards the message.",
    "shortNotes": "- URL Shortener: Base62 conversion, Key-Value DB, heavy Caching.\n- News Feed: Pre-compute feeds using \"Fan-out on Write\" into Redis.\n- Hybrid Feed: Pull for celebrities, Push for normal users.\n- Chat System: WebSockets for persistent connections, Pub/Sub for cross-server routing.\n- Rate Limiter: Token Bucket or Sliding Window stored in Redis.",
    "cheatSheet": "### The 5-Step System Design Interview Framework\n1. **Requirements Gathering (5 mins):** Clarify FRs and NFRs. Ask questions.\n2. **Back-of-the-envelope (5 mins):** Calculate RPS, storage, bandwidth.\n3. **High-Level Design (10 mins):** Draw the core components (Client -> LB -> Web -> DB).\n4. **Deep Dive (15 mins):** Address the bottlenecks. Add Caching, Sharding, Message Queues based on your math.\n5. **Wrap Up (5 mins):** Discuss tradeoffs, monitoring, and failure scenarios.",
    "interviewQuestions": [],
    "resources": [
      {
        "title": "Design WhatsApp / Global Chat System",
        "url": "https://www.youtube.com/watch?v=vvhC64hQZMk",
        "type": "VIDEO"
      },
      {
        "title": "Design a High-Throughput Rate Limiter",
        "url": "https://www.youtube.com/watch?v=FU4Wisl4544",
        "type": "VIDEO"
      },
      {
        "title": "Design Twitter / News Feed Architecture",
        "url": "https://www.youtube.com/watch?v=KmAyPUv9gOY",
        "type": "VIDEO"
      },
      {
        "title": "System Design Interview - Alex Xu (Book)",
        "url": "https://bytebytego.com/",
        "type": "BOOK"
      },
      {
        "title": "Design a URL Shortener",
        "url": "https://www.youtube.com/watch?v=JQDHz72OA3c",
        "type": "VIDEO"
      }
    ]
  },
  {
    "id": "sd_12_lld",
    "slug": "lld",
    "title": "Low-Level Design & Object-Oriented Design",
    "description": "Transition from architecture to code. Master SOLID principles, Design Patterns, and class structure.",
    "difficulty": "INTERMEDIATE",
    "estimatedLearnTime": 120,
    "learningContent": "# Low-Level Design (LLD)\n\nWhile HLD focuses on servers and databases, LLD focuses on Classes, Interfaces, and Code Structure. This is often tested in Machine Coding or Object-Oriented Design (OOD) interviews.\n\n## SOLID Principles\n1. **Single Responsibility (SRP):** A class should have one, and only one, reason to change.\n2. **Open/Closed (OCP):** Software entities should be open for extension, but closed for modification. (Use interfaces/polymorphism instead of editing existing \\`if/else\\` chains).\n3. **Liskov Substitution (LSP):** Subtypes must be substitutable for their base types without altering program correctness.\n4. **Interface Segregation (ISP):** Clients should not be forced to depend upon interfaces that they do not use. (Split large, fat interfaces into smaller ones).\n5. **Dependency Inversion (DIP):** High-level modules should not depend on low-level modules. Both should depend on abstractions (Interfaces).\n\n## Common Design Patterns\n- **Creational:** Singleton (only one instance), Factory (creates objects without specifying exact class), Builder (constructs complex objects step by step).\n- **Structural:** Adapter (makes incompatible interfaces work together), Decorator (adds behavior to objects dynamically), Facade (provides a simplified interface to a complex subsystem).\n- **Behavioral:** Strategy (encapsulates a family of algorithms and makes them interchangeable), Observer (Pub/Sub at the object level).",
    "fullNotes": "# Detailed Notes: LLD Case Studies\n\n### Design a Parking Lot\n- **Entities:** \\`ParkingLot\\",
    "shortNotes": "- SOLID principles are the foundation of LLD.\n- Strategy Pattern: Replaces massive switch/if-else statements (e.g., PaymentMethod: CreditCard, PayPal, Crypto).\n- Factory Pattern: Abstracts object creation.\n- Start LLD by defining core Nouns (Classes), then Verbs (Methods), then Relationships (1:1, 1:N).",
    "cheatSheet": "### LLD Interview Framework\n1. **Clarify Requirements:** What features are in scope?\n2. **Define Core Objects/Classes:** Identify the Nouns.\n3. **Define Relationships:** Composition (Has-A) vs Inheritance (Is-A).\n4. **Define Class APIs/Methods:** What do they do?\n5. **Apply Patterns/SOLID:** Refactor to make the code extensible.",
    "interviewQuestions": [
      {
        "question": "What does the Open/Closed Principle state?",
        "answerHint": "Code should be open for extension but closed for modification. You should be able to add new functionality (e.g., a new Payment Gateway) by writing new classes that implement an interface, rather than modifying the existing core payment processing class.",
        "type": "CONCEPTUAL"
      },
      {
        "question": "When would you use the Strategy Design Pattern?",
        "answerHint": "When you have a family of algorithms that accomplish the same task in different ways, and you want to be able to swap them out at runtime. For example, sorting algorithms, or pricing strategies in an e-commerce app.",
        "type": "TECHNICAL"
      }
    ],
    "resources": [
      {
        "title": "Design Patterns: Factory, Strategy, Observer",
        "url": "https://www.youtube.com/watch?v=v9ejT8FO-7I",
        "type": "VIDEO"
      },
      {
        "title": "Low Level Design (LLD) Principles & SOLID",
        "url": "https://www.youtube.com/watch?v=kF7rQmSRlq0",
        "type": "VIDEO"
      },
      {
        "title": "Refactoring Guru - Design Patterns",
        "url": "https://refactoring.guru/design-patterns",
        "type": "ARTICLE"
      }
    ]
  },
  {
    "id": "sd_13_interview",
    "slug": "interview",
    "title": "System Design Interview Framework",
    "description": "The definitive blueprint for succeeding in 45-minute FAANG system design interviews.",
    "difficulty": "ADVANCED",
    "estimatedLearnTime": 60,
    "learningContent": "# System Design Interview Framework\n\nA System Design interview is fundamentally different from a coding interview. There is no single \"correct\" answer. The interviewer is evaluating your ability to navigate ambiguity, ask the right questions, and weigh technical tradeoffs.\n\n## The 45-Minute Blueprint\n\n### 1. Requirements Clarification (5 mins)\nNever start drawing immediately. \n- Ask for Functional Requirements (What are the 2-3 core features?).\n- Ask for Non-Functional Requirements (Is it read-heavy? Global audience? Consistency vs Availability?).\n\n### 2. Back-of-the-Envelope Estimation (5 mins)\nCalculate the scale to justify your architecture.\n- DAU (Daily Active Users).\n- RPS (Reads vs Writes).\n- Storage capacity per year.\n\n### 3. API Design (5 mins)\nDefine the core endpoints.\n- e.g., \\`POST /tweet\\",
    "fullNotes": "# Detailed Notes: Interview Strategy\n\n- **Communication is Key:** You should be talking constantly. \"I am choosing NoSQL here because...\" \"I could use HTTP, but since this is a chat app, WebSockets are better because...\" If you silently draw for 5 minutes, you have failed.\n- **Drive the Interview:** Don't wait for the interviewer to ask \"What happens if this server fails?\" Proactively say, \"This server is a single point of failure, so I will add a secondary replica.\"\n- **Tradeoffs:** Every choice has a downside. If you add a cache, explicitly mention cache invalidation complexity. If you use NoSQL, explicitly mention the loss of ACID transactions. Engineers who understand the downsides are hired.",
    "shortNotes": "- 1. Clarify Requirements (FR & NFR).\n- 2. Estimate Scale (RPS, Storage).\n- 3. Define APIs.\n- 4. Define Data Model (SQL vs NoSQL).\n- 5. Draw High Level Design (Client -> LB -> Web -> DB).\n- 6. Deep Dive: Identify bottlenecks, add Caching, Queues, Sharding.\n- Always verbalize your tradeoffs. There is no perfect system.",
    "cheatSheet": "### Key Interview Phrases\n- \"To reduce latency and database load, I will introduce a Redis cache...\"\n- \"To decouple these services and handle traffic spikes, I will use a message queue...\"\n- \"Because this system is read-heavy, I will use database read-replicas...\"\n- \"To ensure high availability, we will deploy across multiple Availability Zones...\"",
    "interviewQuestions": [
      {
        "question": "What is the most common mistake candidates make in a system design interview?",
        "answerHint": "Jumping straight into the solution (drawing boxes) without clarifying the requirements or estimating the scale. Designing a system for 100 users is entirely different from designing one for 100 million users.",
        "type": "CONCEPTUAL"
      }
    ],
    "resources": [
      {
        "title": "Google L5 System Design Mock Interview with Senior Staff Engineer",
        "url": "https://www.youtube.com/watch?v=q0KGYwNbf-0",
        "type": "VIDEO"
      },
      {
        "title": "System Design Interview: Step by Step Guide by ByteByteGo",
        "url": "https://www.youtube.com/watch?v=i7twT3x5yv8",
        "type": "VIDEO"
      },
      {
        "title": "Grokking the System Design Interview",
        "url": "https://www.designgurus.io/course/grokking-the-system-design-interview",
        "type": "ARTICLE"
      }
    ]
  }
];
