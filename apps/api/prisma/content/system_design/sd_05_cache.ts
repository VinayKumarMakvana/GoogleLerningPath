export const sd_05_cache = {
  CACHING_PERFORMANCE: {
    title: 'Caching & Performance',
    description: 'Learn caching strategies, CDN architectures, and how to dramatically improve system latency.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 90,
    prerequisites: ['Databases & Data Modeling'],
    learningContent: `
# Caching & Performance

Databases are stored on disk (mostly). Disks are slow. Caching involves storing copies of frequently accessed data in memory (RAM), which is orders of magnitude faster.

## Caching Layers
- **Client Cache:** Browser caching (HTML, CSS, JS).
- **CDN (Content Delivery Network):** A geographically distributed network of proxy servers that cache static assets (images, videos) closer to the user.
- **Web Server Cache:** Reverse proxies (like NGINX or Varnish) caching full HTTP responses.
- **Application/Database Cache:** Memcached or Redis. Stores database query results or computed objects.

## Caching Strategies (Eviction & Updating)
When the cache is full, or data changes, how do we handle it?
1. **Cache Aside (Lazy Loading):** Application asks the cache. If miss, it asks the DB, then writes to the cache. (Best for read-heavy).
2. **Write-Through:** Application writes to the cache AND the database synchronously. (Data is always consistent, but writes are slower).
3. **Write-Behind (Write-Back):** Application writes to the cache. The cache asynchronously writes to the DB later. (Fastest writes, but risk of data loss if cache crashes).
4. **Eviction Policies:** LRU (Least Recently Used) is the most common. LFU (Least Frequently Used), FIFO (First In First Out).
`,
    fullNotes: `
# Detailed Notes: Caching

- **Cache Invalidation:** As Phil Karlton said, "There are only two hard things in Computer Science: cache invalidation and naming things." Keeping the cache consistent with the database is notoriously difficult. If the DB changes, the cache must be updated or purged.
- **The Thundering Herd Problem (Cache Stampede):** If a highly popular cached item expires, thousands of concurrent requests will all get a "cache miss" and hit the database simultaneously, potentially crashing it. *Solution:* Use locking/mutex so only the first request queries the DB and repopulates the cache, while others wait.
`,
    shortNotes: `
- Caching stores data in RAM (Redis/Memcached) for speed.
- CDN caches static assets geographically close to the user.
- Cache Aside: App checks cache -> if miss, checks DB -> updates cache.
- Write-Through: App writes to Cache & DB at the same time.
- LRU (Least Recently Used) is the standard eviction policy.
- Cache Invalidation is the hardest part of caching.
`,
    cheatSheet: `
### When to use a Cache
- The data changes infrequently but is read frequently.
- The computation is expensive (e.g., generating a weekly report).
- You need to reduce load on the primary database.

### Cache vs CDN
- **Cache:** Application data (JSON, Query results, User sessions).
- **CDN:** Static files (Images, CSS, JS, Videos).
`,
    interviewQuestions: [
      { question: 'What is the Cache Aside pattern?', answerHint: 'The application first checks the cache for data. If found (Cache Hit), it returns it. If not found (Cache Miss), the application queries the database, writes the result to the cache for future requests, and then returns the data.', type: 'TECHNICAL' },
      { question: 'What is a CDN and why is it used?', answerHint: 'A Content Delivery Network is a globally distributed network of servers. It caches static assets (images, videos, JS) close to the physical location of the users, drastically reducing latency and offloading traffic from the origin servers.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Caching Strategies', url: 'https://docs.aws.amazon.com/AmazonElastiCache/latest/mem-ug/Strategies.html', type: 'ARTICLE', priority: 'S', source: 'AWS', isOfficial: true }
    ]
  }
};
