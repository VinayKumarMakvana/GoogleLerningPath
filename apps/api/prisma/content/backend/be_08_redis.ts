export const be_08_redis = {
  REDIS_FUNDAMENTALS: {
    title: 'Redis Fundamentals',
    description: 'Learn in-memory caching to drastically speed up your backend applications.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['PostgreSQL Backend Integration'],
    learningContent: `
# Redis Fundamentals

Redis (Remote Dictionary Server) is an open-source, in-memory data structure store, used as a database, cache, and message broker.

## Why use Redis?
Because it stores data in RAM, Redis is incredibly fast (sub-millisecond latency). It is primarily used to cache frequent, expensive database queries or API calls.

## Key Concepts
- **Key-Value Store:** Every piece of data is stored against a key.
- **TTL (Time to Live):** Keys can be set to automatically expire after a certain amount of time, making it perfect for caching.
- **Data Structures:** Redis supports Strings, Hashes, Lists, Sets, and Sorted Sets.
`,
    fullNotes: `
# Detailed Notes: Redis

- **Caching Strategy - Cache Aside:** 
  1. App asks cache for data.
  2. If found (Cache Hit), return data.
  3. If not found (Cache Miss), query primary DB.
  4. Write DB result to cache with a TTL.
  5. Return data.
- **Cache Invalidation:** The hardest part of caching. When primary DB data changes, you must invalidate (delete or update) the cached copy, otherwise users see stale data.
- **Persistence:** Even though Redis is in-memory, it can persist data to disk (RDB snapshots or AOF append-only files) to prevent data loss on crash.
`,
    shortNotes: `
- In-memory data store, extremely fast.
- Commonly used for Caching, Rate Limiting, and Session Storage.
- TTL (Time To Live) automatically deletes old cache.
- Cache Aside is the most common caching pattern.
- Cache Invalidation is notoriously difficult; design TTLs carefully.
`,
    cheatSheet: `
\`\`\`javascript
const redis = require('redis');
const client = redis.createClient({ url: 'redis://localhost:6379' });
await client.connect();

// Set a key with expiration (3600 seconds = 1 hour)
await client.setEx('user:123', 3600, JSON.stringify(userData));

// Get a key
const cachedData = await client.get('user:123');
if (cachedData) {
  return JSON.parse(cachedData);
}
\`\`\`
`,
    interviewQuestions: [
      { question: 'Describe the Cache-Aside pattern.', answerHint: 'The application first checks the cache. If it hits, it returns the data. If it misses, it queries the database, stores the result in the cache, and then returns the data.', type: 'TECHNICAL' },
      { question: 'What happens in Redis when memory is full?', answerHint: 'It depends on the configured eviction policy (e.g., volatile-lru, allkeys-lru, noeviction). Usually, it evicts the least recently used keys with an expiration set.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Redis Official Documentation', url: 'https://redis.io/docs/', type: 'ARTICLE', priority: 'S', source: 'Redis', isOfficial: true },
      { title: 'Redis Crash Course', url: 'https://www.youtube.com/watch?v=jgpVdJB2sKQ', type: 'VIDEO', priority: 'A', source: 'YouTube', isOfficial: false }
    ]
  }
};
