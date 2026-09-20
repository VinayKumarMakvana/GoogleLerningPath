export const sd_11_hld = {
  HIGH_LEVEL_DESIGN: {
    title: 'High-Level Design Case Studies',
    description: 'Learn to design complex, real-world systems: URL Shortener, Twitter/News Feed, Chat, and Rate Limiters.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 180,
    prerequisites: ['Architecture Patterns', 'Consistency, Availability & Reliability', 'Caching & Performance'],
    learningContent: `
# High-Level Design (HLD) Case Studies

In system design interviews, you are asked to design a massive, real-world application.

## 1. Design a URL Shortener (TinyURL)
- **Core Requirement:** Given a long URL, return a short URL. When hitting the short URL, redirect to the long one.
- **Scale:** Write-heavy or Read-heavy? Heavily Read (100:1).
- **Data Model:** Simple Key-Value mapping. NoSQL (DynamoDB/Cassandra) or RDBMS with sharding.
- **Logic:** Take an auto-incrementing ID from the DB, convert it to Base62 (A-Z, a-z, 0-9) to get the short string (e.g., ID 125 -> \`cb\`).
- **Optimization:** Caching is critical here since identical short URLs will be requested millions of times.

## 2. Design a News Feed (Twitter/Facebook)
- **Core Requirement:** User opens app and sees a chronological feed of posts from friends.
- **Challenge:** Generating the feed on-the-fly via SQL JOINs (User -> Follows -> Posts) is too slow for millions of users.
- **Solution (Fan-out on Write):** When a user posts, a background worker pushes that post directly into a pre-computed "Feed Cache" (Redis) for every single one of their followers. 
- **The Justin Bieber Problem:** If someone has 100M followers, fanning out on write will crash the system. Hybrid approach: Fan-out on write for normal users, Fan-out on read (pull) for celebrities.

## 3. Design a Rate Limiter
- **Algorithms:**
  - *Token Bucket:* A bucket has N tokens. Requests take a token. Tokens refill at a constant rate.
  - *Sliding Window Log:* Track timestamps of requests in Redis. Accurate but memory heavy.
  - *Sliding Window Counter:* Optimizes memory by bucketing timestamps.
- **Storage:** Redis (in-memory, fast, supports TTL).
`,
    fullNotes: `
# Detailed Notes: HLD Case Studies

- **Design a Chat System (WhatsApp/Discord):**
  - **Protocol:** HTTP is bad for chat (client has to poll). Use **WebSockets** for a persistent, bidirectional connection.
  - **Architecture:** Client connects to a Chat Server via WebSocket. The Chat Server holds the connection open.
  - **Routing:** If User A sends a message to User B, but they are connected to different Chat Servers, we need a mechanism to route it. The Chat Server pushes the message to a Pub/Sub system (Kafka/Redis PubSub). A Presence/Routing Service knows which Chat Server User B is connected to, and forwards the message.
`,
    shortNotes: `
- URL Shortener: Base62 conversion, Key-Value DB, heavy Caching.
- News Feed: Pre-compute feeds using "Fan-out on Write" into Redis.
- Hybrid Feed: Pull for celebrities, Push for normal users.
- Chat System: WebSockets for persistent connections, Pub/Sub for cross-server routing.
- Rate Limiter: Token Bucket or Sliding Window stored in Redis.
`,
    cheatSheet: `
### The 5-Step System Design Interview Framework
1. **Requirements Gathering (5 mins):** Clarify FRs and NFRs. Ask questions.
2. **Back-of-the-envelope (5 mins):** Calculate RPS, storage, bandwidth.
3. **High-Level Design (10 mins):** Draw the core components (Client -> LB -> Web -> DB).
4. **Deep Dive (15 mins):** Address the bottlenecks. Add Caching, Sharding, Message Queues based on your math.
5. **Wrap Up (5 mins):** Discuss tradeoffs, monitoring, and failure scenarios.
`,
    interviewQuestions: [
      { question: 'How does "Fan-out on Write" work in a News Feed design, and what is its main drawback?', answerHint: 'Fan-out on write means pre-computing timelines. When User A posts, the system pushes the post ID into the cached timelines of all followers. This makes reads blazing fast (O(1)). The drawback is the "Celebrity Problem": if User A has 50 million followers, computing and pushing to 50 million caches on every post will bottleneck the system.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'System Design Interview - Alex Xu (Book)', url: 'https://bytebytego.com/', type: 'BOOK', priority: 'S', source: 'ByteByteGo', isOfficial: false },
      { title: 'Design a URL Shortener', url: 'https://www.youtube.com/watch?v=JQDHz72OA3c', type: 'VIDEO', priority: 'A', source: 'Gaurav Sen', isOfficial: false }
    ]
  }
};
