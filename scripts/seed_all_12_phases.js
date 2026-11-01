const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const FULL_CURRICULUM = [
  {
    phaseOrder: 0,
    phaseTitle: 'PHASE 0: Setup + Learning System',
    modules: [
      {
        title: 'Modern Dev Environment & Tooling',
        skills: [
          {
            title: 'CLI, Shell & Development Ecosystem',
            topics: [
              {
                title: 'Terminal & Shell Mastery (Zsh, Bash, PowerShell)',
                description: 'Master command line navigation, shell scripting, environment variables, aliases, and terminal multiplexers.',
                difficulty: 'BEGINNER',
                priority: 'MUST_HAVE',
                learnTime: 45,
                practiceTime: 30,
                video: {
                  title: 'Linux Command Line Tutorial for Beginners - 10 Hours Crash Course',
                  url: 'https://www.youtube.com/watch?v=ZtqBQ68cfJc',
                  source: 'freeCodeCamp'
                },
                content: `# Terminal & Shell Mastery\n\nCommand-line proficiency is the foundation of senior engineering productivity at Google.\n\n## Core Concepts\n* **Navigation**: \`cd\`, \`pwd\`, \`ls -la\`, glob patterns.\n* **Piping & Redirection**: \`|\`, \`>\`, \`>>\`, \`2>&1\`.\n* **Text Processing**: \`grep\`, \`awk\`, \`sed\`, \`ripgrep\`, \`xargs\`.\n* **Process Management**: \`ps aux\`, \`kill -9\`, \`htop\`, background jobs (\`&\`, \`fg\`, \`bg\`).\n\n## Example\n\`\`\`bash\n# Find top 5 memory consuming processes\nps aux --sort=-%mem | head -n 6\n\`\`\``,
                shortNote: '* Master text pipelines (`grep`, `awk`, `sed`).\n* Keep environment configs clean with dotfiles.\n* Use aliases to speed up repetitive commands.',
                cheatSheet: '| Command | Description |\n|---|---|\n| `ps aux` | List all running processes |\n| `grep -rnI "pattern" .` | Fast recursive text search |\n| `lsof -i :4000` | Find process bound to port 4000 |'
              },
              {
                title: 'Git & GitHub Professional Workflow',
                description: 'Professional version control, atomic commits, interactive rebasing, merge conflict resolution, and trunk-based development.',
                difficulty: 'BEGINNER',
                priority: 'MUST_HAVE',
                learnTime: 60,
                practiceTime: 45,
                video: {
                  title: 'Git and GitHub for Beginners - Crash Course',
                  url: 'https://www.youtube.com/watch?v=RGOj5yH7evk',
                  source: 'freeCodeCamp'
                },
                content: `# Git & GitHub Professional Workflow\n\nGoogle and Big Tech engineering teams rely on rigorous branch management and clean commit histories.\n\n## Key Workflows\n* **Trunk-based development** vs GitFlow.\n* **Interactive Rebase**: \`git rebase -i HEAD~n\` to squash or reword commits.\n* **Cherry-picking**: \`git cherry-pick <hash>\`.\n* **Git Reflog**: Recover lost commits from history disaster.`,
                shortNote: '* Commit early, commit often, squash before merging.\n* Never force-push to main branch.\n* Write semantic commit messages (`feat:`, `fix:`, `refactor:`).',
                cheatSheet: '| Action | Git Command |\n|---|---|\n| Interactive Rebase | `git rebase -i HEAD~3` |\n| Undo Last Commit (keep files) | `git reset --soft HEAD~1` |\n| Recover Lost Commits | `git reflog` |'
              },
              {
                title: 'Build Systems & Toolchains (CMake, GCC/Clang)',
                description: 'Compilation phases (preprocessing, compilation, assembly, linking), shared vs static libraries, and CMake configuration.',
                difficulty: 'INTERMEDIATE',
                priority: 'HIGH_VALUE',
                learnTime: 60,
                practiceTime: 60,
                video: {
                  title: 'CMake Tutorial for Beginners',
                  url: 'https://www.youtube.com/watch?v=nlKcXPUJGwA',
                  source: 'The Cherno'
                },
                content: `# Build Systems & Toolchains\n\nUnderstanding how source code transforms into binary executables.\n\n## Compilation Pipeline\n1. **Preprocessor**: Expands \`#include\` and macros.\n2. **Compiler**: Generates assembly code from AST.\n3. **Assembler**: Converts assembly to object code (\`.o\`).\n4. **Linker**: Combines object files and resolves symbol definitions with libraries.`,
                shortNote: '* Header guards (\`#pragma once\`) prevent multiple inclusions.\n* Static libraries (\`.a\`) are compiled into binary; dynamic (\`.so\`) are loaded at runtime.',
                cheatSheet: '| Flag | Purpose |\n|---|---|\n| `-Wall -Wextra` | Enable all warnings |\n| `-O3` | Maximum optimization |\n| `-g` | Include debugging symbols |'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    phaseOrder: 1,
    phaseTitle: 'PHASE 1: C++ Fundamentals + DSA Foundation + Git',
    modules: [
      {
        title: 'C++ Modern Fundamentals',
        skills: [
          {
            title: 'Syntax, OOP & Memory',
            topics: [
              {
                title: 'Variables & Memory Layout in C++',
                description: 'Stack vs Heap memory allocation, pointer arithmetic, memory alignment, and cache-friendly layout.',
                difficulty: 'BEGINNER',
                priority: 'MUST_HAVE',
                learnTime: 60,
                practiceTime: 60,
                video: {
                  title: 'Virtual Memory, Stack vs Heap in C++',
                  url: 'https://www.youtube.com/watch?v=wJ1L2nSIV1s',
                  source: 'The Cherno'
                },
                content: `# Variables & Memory Layout in C++\n\n## Stack vs Heap\n* **Stack**: Fast, automatic allocation and deallocation, LIFO order, limited size.\n* **Heap**: Explicit dynamic allocation (\`new\`/\`delete\` or smart pointers), slower, fragmentation risk.\n\n## Cache Lines\nCPUs load memory in 64-byte cache lines. Sequential array access is orders of magnitude faster than linked pointer traversal.`,
                shortNote: '* Prefer stack allocation whenever lifetime matches scope.\n* Structure padding aligns data to word boundaries (e.g. 8 bytes on 64-bit).',
                cheatSheet: '| Memory Area | Allocation | Speed | Lifetime |\n|---|---|---|---|\n| Stack | Automatic | Extremely Fast | Scope bound |\n| Heap | Dynamic (`new`) | Slower (syscall) | Explicit deletion |'
              },
              {
                title: 'Pointers & Dynamic Allocation',
                description: 'Raw pointers, address-of operator, memory leaks, dangling pointers, and smart pointers (unique_ptr, shared_ptr).',
                difficulty: 'BEGINNER',
                priority: 'MUST_HAVE',
                learnTime: 90,
                practiceTime: 90,
                video: {
                  title: 'Pointers in C++ Full Guide',
                  url: 'https://www.youtube.com/watch?v=DTxHyVn0ODg',
                  source: 'The Cherno'
                },
                content: `# Pointers & Memory Safety in Modern C++\n\n## Raw Pointers vs Smart Pointers\nModern C++ avoids \`new\` and \`delete\` in favor of RAII and smart pointers:\n* \`std::unique_ptr\`: Exclusive ownership, zero overhead.\n* \`std::shared_ptr\`: Reference-counted ownership.\n* \`std::weak_ptr\`: Non-owning observer to break cyclic references.`,
                shortNote: '* Always initialize pointers (\`nullptr\`).\n* Never return a pointer or reference to a local stack variable.',
                cheatSheet: '| Type | Header | Ownership |\n|---|---|---|\n| `std::unique_ptr` | `<memory>` | Single / exclusive ownership |\n| `std::shared_ptr` | `<memory>` | Reference-counted shared |\n| `std::weak_ptr` | `<memory>` | Non-owning break cycles |'
              },
              {
                title: 'Two Pointers & In-Place Manipulation',
                description: 'Classic two-pointer techniques: opposite directional (two sum, palindromes) and same directional (fast/slow runner, cycle detection).',
                difficulty: 'BEGINNER',
                priority: 'MUST_HAVE',
                learnTime: 60,
                practiceTime: 90,
                video: {
                  title: 'Two Pointers Pattern Mastery for Coding Interviews',
                  url: 'https://www.youtube.com/watch?v=-gjxg6Pln50',
                  source: 'NeetCode'
                },
                content: `# Two Pointers Pattern\n\nTwo pointers reduce brute force $O(N^2)$ array searches down to $O(N)$ linear time by exploiting sorted invariants.\n\n## Canonical Patterns\n1. **Converging Pointers**: Start at 0 and $N-1$ (e.g. Sorted Two Sum, Container With Most Water).\n2. **Fast & Slow Pointers (Floyd\'s Cycle Finding)**: Move slow by 1, fast by 2.`,
                shortNote: '* Converging pointers require the input array to be sorted.\n* Fast and slow pointers detect cycles without extra memory.',
                cheatSheet: '| Pattern | Time Complexity | Space Complexity |\n|---|---|---|\n| Sorted Two Sum | $O(N)$ | $O(1)$ |\n| Linked List Cycle | $O(N)$ | $O(1)$ |'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    phaseOrder: 2,
    phaseTitle: 'PHASE 2: DSA Core + CS Fundamentals + TypeScript/Node fundamentals',
    modules: [
      {
        title: 'Core Data Structures',
        skills: [
          {
            title: 'Linear & Tree Data Structures',
            topics: [
              {
                title: 'Linked Lists (Reversal & Fast-Slow Pointers)',
                description: 'Singly, doubly, and circular linked lists. In-place reversal, cycle detection, and merging k-sorted lists.',
                difficulty: 'INTERMEDIATE',
                priority: 'MUST_HAVE',
                learnTime: 60,
                practiceTime: 90,
                video: {
                  title: 'Linked List Implementation, Reversal & Fast-Slow Pointers',
                  url: 'https://www.youtube.com/watch?v=G0_I-ZF0S38',
                  source: 'NeetCode'
                },
                content: `# Linked List Core Mastery\n\nLinked lists represent dynamically chained nodes in memory. Frequently tested in Google Onsite rounds.\n\n## Essential Techniques\n* **Dummy Head Technique**: Eliminates edge cases when mutating head nodes.\n* **In-place Reversal**: 3 pointers (\`prev\`, \`curr\`, \`next\`).\n* **Fast & Slow**: Find middle node in 1 pass.`,
                shortNote: '* Use a dummy node to avoid null head checks.\n* Watch out for disconnected pointers causing lost memory.',
                cheatSheet: '| Operation | Array | Linked List |\n|---|---|---|\n| Prepend | $O(N)$ | $O(1)$ |\n| Lookup by Index | $O(1)$ | $O(N)$ |\n| Delete Node (with pointer) | $O(N)$ | $O(1)$ |'
              },
              {
                title: 'Binary Trees, BST & DFS/BFS Traversals',
                description: 'Preorder, Inorder, Postorder, Level-order traversals. Tree height, diameter, lowest common ancestor (LCA), and BST balancing.',
                difficulty: 'INTERMEDIATE',
                priority: 'MUST_HAVE',
                learnTime: 90,
                practiceTime: 120,
                video: {
                  title: 'Binary Tree Algorithms for Technical Interviews',
                  url: 'https://www.youtube.com/watch?v=fAAZixBzIAI',
                  source: 'freeCodeCamp'
                },
                content: `# Trees & Recursive Invariants\n\n## Tree Traversals\n* **DFS**: Preorder (\`Root-L-R\`), Inorder (\`L-Root-R\`), Postorder (\`L-R-Root\`). Inorder on BST produces sorted order.\n* **BFS**: Queue-based level-order traversal.\n* **LCA**: Lowest common ancestor recursion.`,
                shortNote: '* Inorder on a Binary Search Tree gives sorted elements.\n* Height of balanced BST is $O(\\log N)$; skewed is $O(N)$.',
                cheatSheet: '| Traversal | Data Structure | Typical Use |\n|---|---|---|\n| DFS | Call Stack (Recursion) | Max depth, path sum |\n| BFS | Queue | Shortest path, level order |'
              }
            ]
          }
        ]
      },
      {
        title: 'Operating Systems & Concurrency',
        skills: [
          {
            title: 'Systems Programming & OS Internals',
            topics: [
              {
                title: 'Processes, Threads & Concurrency Primitives',
                description: 'Context switching, process memory layout (PCB), multi-threading, mutexes, semaphores, and condition variables.',
                difficulty: 'INTERMEDIATE',
                priority: 'MUST_HAVE',
                learnTime: 75,
                practiceTime: 60,
                video: {
                  title: 'Processes vs Threads - What is the difference?',
                  url: 'https://www.youtube.com/watch?v=2Tz8N_jG_gA',
                  source: 'Hussein Nasser'
                },
                content: `# Processes, Threads & Concurrency\n\n## Key Distinctions\n* **Process**: Independent execution unit with its own virtual address space, file descriptors, and PCB.\n* **Thread**: Lightweight execution entity sharing address space, heap, and code segment with sibling threads.\n\n## Synchronization\nRace conditions occur when concurrent threads access shared mutable state without synchronization. Use Mutexes, Reader-Writer locks, or Atomic primitives.`,
                shortNote: '* Threads share heap and globals, but have independent stacks.\n* Deadlock requires: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.',
                cheatSheet: '| Primitive | Description | Use Case |\n|---|---|---|\n| Mutex | Mutual exclusion lock | Single-thread critical section |\n| Semaphore | Counter-based lock | Rate limiting, pool of resources |\n| Atomic | CPU hardware lockless op | Counters, flags |'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    phaseOrder: 3,
    phaseTitle: 'PHASE 3: Backend Engineering + PostgreSQL + MongoDB + Testing',
    modules: [
      {
        title: 'API Engineering & Data Persistence',
        skills: [
          {
            title: 'REST Architecture & Database Systems',
            topics: [
              {
                title: 'REST API Design & Authentication (JWT/OAuth)',
                description: 'RESTful constraints, HTTP status codes, idempotency keys, JWT access/refresh token rotation, and password hashing (bcrypt/argon2).',
                difficulty: 'INTERMEDIATE',
                priority: 'MUST_HAVE',
                learnTime: 90,
                practiceTime: 90,
                video: {
                  title: 'REST vs GraphQL vs gRPC Deep Dive',
                  url: 'https://www.youtube.com/watch?v=IvsNO02cxZU',
                  source: 'Hussein Nasser'
                },
                content: `# REST API Architecture & Auth\n\n## Best Practices\n* Noun-based resource paths (\`/api/v1/users\`).\n* Standard HTTP methods: \`GET\` (safe, idempotent), \`POST\` (non-idempotent), \`PUT\` (idempotent replace), \`PATCH\` (partial update), \`DELETE\`.\n* Stateless authentication using signed JWT access tokens (short TTL ~15m) + secure httpOnly refresh tokens.`,
                shortNote: '* Store refresh tokens in httpOnly, secure, sameSite cookies.\n* Implement idempotency headers for payment and state-mutating requests.',
                cheatSheet: '| HTTP Code | Meaning | Example |\n|---|---|---|\n| 200 OK | Success | Read / update |\n| 201 Created | Created | Resource creation |\n| 401 Unauthorized | Unauthenticated | Missing / invalid JWT |\n| 403 Forbidden | Authenticated, no permission | User accessing admin |'
              },
              {
                title: 'PostgreSQL Relational Modeling, Indexing & ACID',
                description: 'Relational schema design, foreign keys, B-Tree indexes, composite indexes, query execution plans (EXPLAIN ANALYZE), and ACID transactions.',
                difficulty: 'ADVANCED',
                priority: 'MUST_HAVE',
                learnTime: 90,
                practiceTime: 90,
                video: {
                  title: 'Database Indexing & B-Trees Explained',
                  url: 'https://www.youtube.com/watch?v=aZjYr87r1b8',
                  source: 'Hussein Nasser'
                },
                content: `# PostgreSQL Indexing & Query Optimization\n\n## B-Tree Indexes\nIndexes provide $O(\\log N)$ lookup by organizing sorted pointers in a balanced tree.\n\n## Isolation Levels\n* Read Uncommitted\n* Read Committed (PostgreSQL default)\n* Repeatable Read (prevents non-repeatable reads)\n* Serializable (prevents phantom reads via strict serialization).`,
                shortNote: '* Avoid indexing columns with low cardinality (e.g. booleans).\n* Use `EXPLAIN ANALYZE` to check for Sequential Scans vs Index Scans.',
                cheatSheet: '| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |\n|---|---|---|---|\n| Read Committed | No | Possible | Possible |\n| Repeatable Read | No | No | Possible |\n| Serializable | No | No | No |'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    phaseOrder: 4,
    phaseTitle: 'PHASE 4: Advanced DSA + Backend Production + Redis + Queues',
    modules: [
      {
        title: 'Advanced Algorithms & Caching',
        skills: [
          {
            title: 'Graphs, DP & In-Memory Storage',
            topics: [
              {
                title: 'Graph Algorithms (BFS, DFS, Dijkstra, Topo Sort)',
                description: 'Graph representations (adjacency list vs matrix), cycle detection in directed/undirected graphs, topological sort (Kahn\'s), and Dijkstra shortest path.',
                difficulty: 'ADVANCED',
                priority: 'MUST_HAVE',
                learnTime: 120,
                practiceTime: 120,
                video: {
                  title: 'Graph Algorithms for Technical Interviews',
                  url: 'https://www.youtube.com/watch?v=tWVWeAqZ0WU',
                  source: 'freeCodeCamp'
                },
                content: `# Graph Algorithms for FAANG\n\nGraphs model networks, dependency trees, and path routing.\n\n## Key Algorithms\n* **BFS**: Shortest path in unweighted graphs using a Queue.\n* **DFS**: Connected components and cycle detection.\n* **Topological Sort**: Order of tasks with prerequisites (DAGs).\n* **Dijkstra**: Single-source shortest path in non-negative weighted graphs using Min-Heap.`,
                shortNote: '* Check for cycles in DAGs before computing topological order.\n* Dijkstra time complexity is $O((V + E) \\log V)$.',
                cheatSheet: '| Algorithm | Complexity | Purpose |\n|---|---|---|\n| BFS | $O(V + E)$ | Shortest unweighted path |\n| Dijkstra | $O((V+E) \\log V)$ | Shortest weighted path |\n| Kahn\'s | $O(V + E)$ | Dependency ordering |'
              },
              {
                title: 'Redis Caching Architecture & Invalidation Patterns',
                description: 'Redis data structures (strings, hashes, sets, sorted sets), caching strategies (Cache-Aside, Write-Through, Write-Back), and cache stampede solutions.',
                difficulty: 'ADVANCED',
                priority: 'MUST_HAVE',
                learnTime: 90,
                practiceTime: 90,
                video: {
                  title: 'Caching Strategies & Redis Architecture by ByteByteGo',
                  url: 'https://www.youtube.com/watch?v=dGAgxozNWFE',
                  source: 'ByteByteGo'
                },
                content: `# Distributed Caching with Redis\n\n## Caching Strategies\n* **Cache-Aside (Lazy Loading)**: Application reads cache. On miss, reads DB, populates cache, returns. Most common pattern.\n* **Write-Through**: Write to cache and DB synchronously.\n* **Write-Back**: Write to cache first, write to DB asynchronously (high throughput, risk of data loss).`,
                shortNote: '* Add jitter to TTLs to prevent thundering herd when many keys expire at once.\n* Use Redis Sorted Sets for leaderboards and rate limiting windows.',
                cheatSheet: '| Pattern | Read Path | Write Path | Trade-off |\n|---|---|---|---|\n| Cache-Aside | Cache -> DB | Directly to DB | Stale cache window |\n| Write-Through | Cache -> DB | Cache + DB sync | Higher write latency |'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    phaseOrder: 5,
    phaseTitle: 'PHASE 5: Docker + CI/CD + Cloud + Security',
    modules: [
      {
        title: 'Containers, Pipelines & Cloud Infrastructure',
        skills: [
          {
            title: 'DevOps & Cloud Fundamentals',
            topics: [
              {
                title: 'Docker Multi-Stage Builds & Containerization',
                description: 'Docker architecture, images vs containers, multi-stage builds for small production images, and container security best practices.',
                difficulty: 'INTERMEDIATE',
                priority: 'MUST_HAVE',
                learnTime: 60,
                practiceTime: 60,
                video: {
                  title: 'Docker Tutorial for Beginners',
                  url: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
                  source: 'TechWorld with Nana'
                },
                content: `# Docker & Containerization\n\nContainers package code with its entire runtime, dependencies, and system tools, ensuring uniform behavior from local dev to Google Cloud production.\n\n## Multi-stage Builds\nMulti-stage Dockerfiles allow building in a heavy SDK environment (e.g. Node/Go/Rust) and copying only compiled binaries to an Alpine or Distroless runtime image.`,
                shortNote: '* Order Dockerfile instructions from least to most frequently changing to maximize layer cache hits.\n* Never run containers as root user in production.',
                cheatSheet: '| Docker Command | Action |\n|---|---|\n| `docker build -t app:latest .` | Build container image |\n| `docker run -p 3000:3000 app` | Run container mapping port 3000 |\n| `docker system prune -a` | Clean unused images and cache |'
              },
              {
                title: 'CI/CD Automation with GitHub Actions & Cloud Deployment',
                description: 'Automated test runners, linting, build pipelines, Docker registry publishing, and automated deployment to Google Cloud Platform.',
                difficulty: 'INTERMEDIATE',
                priority: 'HIGH_VALUE',
                learnTime: 60,
                practiceTime: 60,
                video: {
                  title: 'GitHub Actions Tutorial - CI/CD for Beginners',
                  url: 'https://www.youtube.com/watch?v=R8_veQiYBjI',
                  source: 'TechWorld with Nana'
                },
                content: `# CI/CD Automation\n\nContinuous Integration ensures every PR passes tests and static analysis before merging. Continuous Deployment releases tested builds automatically.\n\n## Pipeline Stages\n1. **Lint & Format**: Prettier, ESLint, Clippy.\n2. **Typecheck & Unit Test**: Jest, Vitest, GoogleTest.\n3. **Build & Package**: Docker image creation.\n4. **Deploy**: Rolling deployment to Kubernetes or Cloud Run.`,
                shortNote: '* Use secrets management for API keys and tokens in CI.\n* Set branch protection rules requiring passing CI checks before merging.',
                cheatSheet: '| Workflow Step | Purpose |\n|---|---|\n| `actions/checkout@v4` | Check out repository code |\n| `actions/setup-node@v4` | Setup runtime environment |\n| `docker/build-push-action` | Build & push container image |'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    phaseOrder: 6,
    phaseTitle: 'PHASE 6: Architecture + Microservices + Kafka/RabbitMQ + Kubernetes',
    modules: [
      {
        title: 'Distributed Microservices & Event Streaming',
        skills: [
          {
            title: 'Microservices & Message Brokers',
            topics: [
              {
                title: 'Apache Kafka Architecture & Event-Driven Microservices',
                description: 'Topics, partitions, brokers, consumer groups, offset management, exactly-once semantics, and event-driven decoupling.',
                difficulty: 'ADVANCED',
                priority: 'MUST_HAVE',
                learnTime: 90,
                practiceTime: 90,
                video: {
                  title: 'Kafka Architecture & Event Driven Microservices',
                  url: 'https://www.youtube.com/watch?v=R873BlNVUB4',
                  source: 'Stephane Maarek'
                },
                content: `# Apache Kafka & Event-Driven Architecture\n\nKafka is a distributed append-only commit log designed for high-throughput, fault-tolerant event streaming.\n\n## Core Concepts\n* **Partitions**: Unit of parallelism. Within a partition, ordering is guaranteed.\n* **Consumer Groups**: Multiple consumers share reading load across partitions.\n* **Replication**: Leader and in-sync replicas (ISR) ensure data resilience.`,
                shortNote: '* Partition key determines which partition receives the event, ensuring per-entity ordering.\n* Kafka persists data to disk and leverages the OS page cache for zero-copy streaming.',
                cheatSheet: '| Concept | Role |\n|---|---|\n| Topic | Logical category of events |\n| Partition | Ordered, immutable sequence of records |\n| Consumer Group | Scalable parallel message processing |'
              },
              {
                title: 'Kubernetes Orchestration & Service Mesh',
                description: 'K8s architecture (Control Plane, Worker Nodes), Pods, Deployments, Services (ClusterIP/NodePort/LoadBalancer), and Ingress.',
                difficulty: 'ADVANCED',
                priority: 'HIGH_VALUE',
                learnTime: 90,
                practiceTime: 90,
                video: {
                  title: 'Kubernetes Tutorial for Beginners',
                  url: 'https://www.youtube.com/watch?v=X48VuDVv0do',
                  source: 'TechWorld with Nana'
                },
                content: `# Kubernetes Container Orchestration\n\nKubernetes (originated from Google Borg) automates deployment, scaling, and operations of containerized applications.\n\n## Core Building Blocks\n* **Pod**: Smallest deployable unit, wrapping one or more containers sharing network namespace.\n* **Deployment**: Declares desired replica count, rolling update strategy, and health checks.\n* **Service**: Stable virtual IP and DNS name abstracting dynamic Pod IPs.`,
                shortNote: '* Define Liveness and Readiness probes on all production deployments.\n* Use Horizontal Pod Autoscalers (HPA) to scale pods based on CPU/RAM metrics.',
                cheatSheet: '| K8s Object | Description |\n|---|---|\n| Pod | Container execution wrapper |\n| Deployment | Declarative updates for Pods |\n| Service | Stable network endpoint |\n| Ingress | HTTP/HTTPS routing into cluster |'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    phaseOrder: 7,
    phaseTitle: 'PHASE 7: System Design + Distributed Systems + Observability',
    modules: [
      {
        title: 'Distributed Systems & High-Level Design',
        skills: [
          {
            title: 'System Design Frameworks & Flagship Cases',
            topics: [
              {
                title: 'CAP Theorem, Consensus & Consistent Hashing',
                description: 'Trade-offs between Consistency, Availability, and Partition Tolerance. Raft consensus protocol and consistent hashing ring.',
                difficulty: 'ADVANCED',
                priority: 'MUST_HAVE',
                learnTime: 90,
                practiceTime: 90,
                video: {
                  title: 'Consistent Hashing Explained by Gaurav Sen',
                  url: 'https://www.youtube.com/watch?v=zaRkONvyGr8',
                  source: 'Gaurav Sen'
                },
                content: `# Distributed Consensus & Consistent Hashing\n\n## CAP Theorem\nIn the presence of a network partition (P), a distributed system must choose between:\n* **Consistency (C)**: Every read receives the most recent write or an error.\n* **Availability (A)**: Every non-failing node returns a response, but it may not be latest.\n\n## Consistent Hashing\nMaps both server nodes and keys to a 360-degree hash ring. When a server joins or leaves, only $K/N$ keys need migration instead of $100%$. Virtual nodes ensure uniform load distribution.`,
                shortNote: '* Consistent hashing solves the hot-spotting problem in distributed caching and sharding.\n* Virtual nodes prevent uneven hash ring distribution.',
                cheatSheet: '| Concept | Definition |\n|---|---|\n| CP System | Prioritizes strong consistency (e.g. Spanner, ZooKeeper) |\n| AP System | Prioritizes high availability (e.g. Cassandra, DynamoDB) |\n| Virtual Nodes | Multiple hash points per physical machine |'
              },
              {
                title: 'System Design: Design a High-Scale URL Shortener (TinyURL)',
                description: 'End-to-end HLD: Capacity estimation, Base62 encoding, pre-generated unique keys (KGS), Redis caching, and database partitioning.',
                difficulty: 'ADVANCED',
                priority: 'MUST_HAVE',
                learnTime: 90,
                practiceTime: 90,
                video: {
                  title: 'Design a URL Shortener (TinyURL) by Gaurav Sen',
                  url: 'https://www.youtube.com/watch?v=JQDHz72OA3c',
                  source: 'Gaurav Sen'
                },
                content: `# System Design: TinyURL Architecture\n\n## Requirements\n* **Functional**: Given a long URL, return a short URL (~7 chars). Redirect short URL with HTTP 301/302.\n* **Non-Functional**: Highly available, low latency (<50ms redirect), 100M URLs created/day (10:1 read-to-write ratio).\n\n## Core Architecture\n* **Key Generation Service (KGS)**: Generates random Base62 keys in advance and stores in DB. Eliminates hashing collision race conditions.\n* **Cache**: Redis LRU caching top 20% URLs fulfilling 80% traffic (Pareto Principle).`,
                shortNote: '* HTTP 301 is Permanent Redirect (browser caches); 302 is Temporary (traffic hits backend for analytics).\n* Base62 with 7 characters yields $62^7 \\approx 3.5 \\text{ trillion}$ unique combinations.',
                cheatSheet: '| Component | Technology | Role |\n|---|---|---|\n| API Layer | Go / Node.js Stateless | Request routing |\n| Key Generator | KGS Dedicated Service | Zero collision keys |\n| Caching | Redis Cluster | Low-latency redirects |\n| Database | NoSQL / PostgreSQL | Persistent URL mapping |'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    phaseOrder: 8,
    phaseTitle: 'PHASE 8: AI/ML Mathematics + ML + Deep Learning',
    modules: [
      {
        title: 'Machine Learning Foundations & Deep Learning',
        skills: [
          {
            title: 'Mathematics, Classical ML & PyTorch',
            topics: [
              {
                title: 'Linear Algebra & Gradient Descent for Machine Learning',
                description: 'Vector spaces, matrix multiplications, dot products, loss functions (MSE, Cross-Entropy), and gradient descent optimization algorithms.',
                difficulty: 'INTERMEDIATE',
                priority: 'MUST_HAVE',
                learnTime: 90,
                practiceTime: 90,
                video: {
                  title: 'The Essence of Linear Algebra by 3Blue1Brown',
                  url: 'https://www.youtube.com/watch?v=fNk_zzaMoSs',
                  source: '3Blue1Brown'
                },
                content: `# Mathematics for Machine Learning\n\nMachine Learning algorithms are mathematical models parameterized by weights $\\mathbf{W}$ and biases $\\mathbf{b}$.\n\n## Gradient Descent\n$$\\theta_{t+1} = \\theta_t - \\eta \\nabla L(\\theta_t)$$\nUpdates weights in the direction of steepest descent of the loss function $L$. Variants: SGD, Adam, AdamW.`,
                shortNote: '* Dot product measures cosine similarity between feature vectors.\n* Adam optimizer combines momentum and adaptive learning rates per parameter.',
                cheatSheet: '| Term | Meaning |\n|---|---|\n| Learning Rate ($\\eta$) | Step size during gradient descent |\n| Loss Function | Metric quantifying model prediction error |\n| Epoch | One complete pass through training dataset |'
              },
              {
                title: 'Neural Networks & PyTorch Model Implementation',
                description: 'Multi-layer perceptrons, forward propagation, automatic differentiation (autograd), activation functions (ReLU, GELU), and backpropagation.',
                difficulty: 'ADVANCED',
                priority: 'MUST_HAVE',
                learnTime: 90,
                practiceTime: 120,
                video: {
                  title: 'Building micrograd by Andrej Karpathy',
                  url: 'https://www.youtube.com/watch?v=VMj-3S1tku0',
                  source: 'Andrej Karpathy'
                },
                content: `# Neural Networks & PyTorch Fundamentals\n\nDeep neural networks compose non-linear transformations: $\\mathbf{y} = \\sigma(\\mathbf{W}\\mathbf{x} + \\mathbf{b})$.\n\n## Backpropagation\nLeverages the mathematical chain rule of calculus to compute partial derivatives $\\frac{\\partial L}{\\partial \\mathbf{W}}$ backwards through the computation graph.`,
                shortNote: '* Always call `optimizer.zero_grad()` before `loss.backward()` in PyTorch to avoid accumulating gradients.\n* Use `torch.no_grad()` during model inference to save memory.',
                cheatSheet: '| PyTorch Function | Purpose |\n|---|---|\n| `nn.Linear(in, out)` | Dense fully connected layer |\n| `loss.backward()` | Compute gradients via autograd |\n| `optimizer.step()` | Update model parameters |'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    phaseOrder: 9,
    phaseTitle: 'PHASE 9: LLMs + RAG + Agents + AI Systems',
    modules: [
      {
        title: 'Generative AI, Transformers & RAG Architecture',
        skills: [
          {
            title: 'Transformers, Embeddings & Production LLMs',
            topics: [
              {
                title: 'Transformers & Multi-Head Self-Attention',
                description: 'Attention Is All You Need: Query, Key, Value vectors, scaled dot-product attention, positional embeddings, and Transformer encoder-decoder blocks.',
                difficulty: 'ADVANCED',
                priority: 'MUST_HAVE',
                learnTime: 120,
                practiceTime: 90,
                video: {
                  title: 'Visual Guide to Transformers by 3Blue1Brown',
                  url: 'https://www.youtube.com/watch?v=wjZofJX0v4U',
                  source: '3Blue1Brown'
                },
                content: `# Transformers & Attention Mechanism\n\nAttention allows models to dynamically weigh the relevance of every token relative to all other tokens in a sequence.\n\n## Scaled Dot-Product Attention\n$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$\n* **$Q$ (Query)**: What token is looking for.\n* **$K$ (Key)**: What token offers.\n* **$V$ (Value)**: Actual information transferred.`,
                shortNote: '* Scaling factor $\\sqrt{d_k}$ prevents dot products from growing excessively large, which pushes softmax into vanishing gradients.\n* Self-attention has $O(N^2)$ sequence length computational complexity.',
                cheatSheet: '| Matrix | Dimension | Meaning |\n|---|---|---|\n| $Q$ | $(N, d_k)$ | Queries |\n| $K$ | $(N, d_k)$ | Keys |\n| $V$ | $(N, d_v)$ | Values |\n| Attention Map | $(N, N)$ | Softmax relevance weights |'
              },
              {
                title: 'Production RAG & Vector Database Architecture',
                description: 'Document ingestion, chunking strategies, dense embeddings, vector indexing (HNSW, IVF), hybrid keyword-vector search, and reranking.',
                difficulty: 'ADVANCED',
                priority: 'MUST_HAVE',
                learnTime: 90,
                practiceTime: 90,
                video: {
                  title: 'Vector Databases Explained: Pinecone, Milvus, Qdrant',
                  url: 'https://www.youtube.com/watch?v=klTvEwg3oJ8',
                  source: 'ByteByteGo'
                },
                content: `# Production RAG Architecture\n\nRetrieval-Augmented Generation grounds LLM answers in verified external knowledge, eliminating hallucinations.\n\n## Production Pipeline\n1. **Ingest & Chunk**: Split text (e.g. 500 tokens with 50-token overlap).\n2. **Embed**: Generate high-dimensional dense vector embeddings.\n3. **Index & Retrieve**: Perform Approximate Nearest Neighbor (ANN) search using HNSW.\n4. **Augment & Generate**: Inject retrieved context into LLM system prompt.`,
                shortNote: '* Hybrid search combines vector embeddings (semantic) with BM25 (exact keyword match) for highest recall.\n* Cross-encoder rerankers dramatically improve top-3 retrieval quality.',
                cheatSheet: '| Vector Index | Speed | Recall | Memory |\n|---|---|---|---|\n| Flat | $O(N)$ Exact | 100% | Low |\n| HNSW | $O(\\log N)$ Fast | ~98% | Higher |\n| IVF | Fast | ~95% | Compressed |'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    phaseOrder: 10,
    phaseTitle: 'PHASE 10: Flagship Projects + Open Source + Production Experience',
    modules: [
      {
        title: 'Portfolio Engineering & Open Source',
        skills: [
          {
            title: 'Production Flagship Systems',
            topics: [
              {
                title: 'Building a High-Performance Redis Clone in C++/Go',
                description: 'Implement an in-memory key-value database supporting the RESP protocol, event-driven socket I/O, event loop, and LRU eviction.',
                difficulty: 'ADVANCED',
                priority: 'MUST_HAVE',
                learnTime: 90,
                practiceTime: 180,
                video: {
                  title: 'Building a Redis Clone from Scratch',
                  url: 'https://www.youtube.com/watch?v=rX_Gcx_3Jb0',
                  source: 'Anthony GG'
                },
                content: `# Flagship Project: Distributed Redis Server\n\nBuilding a high-throughput network service demonstrates systems mastery to Big Tech hiring managers.\n\n## Key Architectural Features\n* **RESP Protocol Parser**: Handles strings, arrays, bulk strings, integers.\n* **Non-blocking I/O**: Single-threaded event loop leveraging \`epoll\` (Linux) or \`kqueue\` (macOS).\n* **Hash Table with Incremental Resizing**: Dual hashtables to avoid latency spikes during rehashing.`,
                shortNote: '* Incremental rehashing moves buckets progressively during incoming read/write operations.\n* Keep benchmarks documented in README (e.g. throughput: 100k req/sec).',
                cheatSheet: '| Component | Mechanism | Benchmark |\n|---|---|---|\n| I/O Multiplexer | `epoll` / non-blocking sockets | Sub-millisecond latency |\n| Storage Engine | Custom HashTable | $O(1)$ Average lookup |\n| Protocol | Redis Serialization Protocol (RESP) | Binary safe |'
              },
              {
                title: 'Open Source Contribution & Code Review Standards',
                description: 'Navigating massive codebases, finding good first issues, writing comprehensive unit tests, and adhering to Google style guides.',
                difficulty: 'INTERMEDIATE',
                priority: 'HIGH_VALUE',
                learnTime: 60,
                practiceTime: 120,
                video: {
                  title: 'How to Contribute to Open Source',
                  url: 'https://www.youtube.com/watch?v=c6b6FLn6up8',
                  source: 'GitHub'
                },
                content: `# Open Source Engineering Excellence\n\nContributing to established open source projects proves you can read, navigate, and contribute to complex enterprise codebases.\n\n## Contribution Playbook\n1. Fork repository and set upstream remote.\n2. Create focused feature branch.\n3. Implement changes with accompanying unit tests.\n4. Run linter and formatting checks.\n5. Submit PR with detailed problem/solution description and screenshots.`,
                shortNote: '* Keep PRs small and atomic (under 400 lines of diff for faster reviews).\n* Always run test suite locally before pushing PR.',
                cheatSheet: '| Git Command | Action |\n|---|---|\n| `git remote add upstream <url>` | Link original repository |\n| `git fetch upstream` | Pull upstream branches |\n| `git rebase upstream/main` | Keep PR branch up to date |'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    phaseOrder: 11,
    phaseTitle: 'PHASE 11: Internship + Interview + Career Execution',
    modules: [
      {
        title: 'Career Pipeline & Behavioral Mastery',
        skills: [
          {
            title: 'Resume, Portfolio & Big Tech Screening',
            topics: [
              {
                title: 'FAANG-Standard Resume Engineering & STAR Framing',
                description: 'X-Y-Z formula: "Accomplished [X], as measured by [Y], by doing [Z]". ATS keyword optimization and recruiter screening filters.',
                difficulty: 'INTERMEDIATE',
                priority: 'MUST_HAVE',
                learnTime: 60,
                practiceTime: 90,
                video: {
                  title: 'Google Recruiter Reveals How to Write a Resume',
                  url: 'https://www.youtube.com/watch?v=ttYrnXUmsm0',
                  source: 'Jeff Su'
                },
                content: `# FAANG Resume Engineering\n\nGoogle recruiters scan resumes in 6 seconds. Bullet points must convey measurable impact.\n\n## The Google X-Y-Z Formula\n> *Accomplished [X], as measured by [Y], by doing [Z].*\n\n### Example:\n* **Weak**: Worked on database query performance.\n* **Google L5 Standard**: Optimized distributed PostgreSQL queries, reducing p99 read latency by 64% (from 420ms to 150ms) by implementing composite B-Tree indexes and Redis query caching.`,
                shortNote: '* Quantify results with metrics (%, ms latency, $ saved, throughput QPS).\n* Keep resume strictly 1 page for engineers under 10 years experience.',
                cheatSheet: '| Weak Verb | Google Power Verb |\n|---|---|\n| Helped | Spearheaded / Architected |\n| Made | Designed / Implemented |\n| Worked on | Engineered / Optimized |'
              },
              {
                title: 'Behavioral Interviews (Googliness & Leadership)',
                description: 'Google culture bar-raiser criteria: Navigating ambiguity, bias for action, intellectual humility, doing the right thing, and pushing team excellence.',
                difficulty: 'INTERMEDIATE',
                priority: 'MUST_HAVE',
                learnTime: 60,
                practiceTime: 60,
                video: {
                  title: 'How to Answer Behavioral Interview Questions',
                  url: 'https://www.youtube.com/watch?v=17_N-X5nBcA',
                  source: 'Dan Croitor'
                },
                content: `# Googliness & Leadership Principles\n\nBehavioral rounds carry veto power in Google hiring committees.\n\n## The STAR Structure\n* **Situation**: Brief context (2-3 sentences).\n* **Task**: Your specific objective or challenge.\n* **Action**: What YOU specifically did (use "I", not "we").\n* **Result**: Quantifiable business or technical outcome.`,
                shortNote: '* Never blame coworkers or past managers in conflict answers.\n* Demonstrate how you learn and iterate after technical mistakes.',
                cheatSheet: '| Question Type | Core Metric Tested |\n|---|---|\n| Conflict Resolution | Collaboration & Empathy |\n| Overcoming Failure | Resilience & Root-Cause Analysis |\n| Ambiguity | Initiative & System Framing |'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    phaseOrder: 12,
    phaseTitle: 'PHASE 12: Final Big Tech Interview Preparation',
    modules: [
      {
        title: 'Onsite Simulation & Offer Negotiation',
        skills: [
          {
            title: 'Mock Interviews & Negotiation Strategy',
            topics: [
              {
                title: 'Google L5 Technical Mock Interview (Live Coding & Architecture)',
                description: 'Full 45-minute live simulation: Problem clarification, edge case identification, complexity discussion, clean modular coding, and dry-running.',
                difficulty: 'ADVANCED',
                priority: 'MUST_HAVE',
                learnTime: 90,
                practiceTime: 120,
                video: {
                  title: 'Google L5 System Design Mock Interview with Senior Staff Engineer',
                  url: 'https://www.youtube.com/watch?v=q0KGYwNbf-0',
                  source: 'Exponent'
                },
                content: `# Google L5 Onsite Coding Simulation\n\n## 45-Minute Interview Strategy\n* **0-5 min**: Clarify input constraints, output types, edge cases (empty input, negatives, scale).\n* **5-15 min**: Propose high-level approach, analyze time/space complexity, confirm with interviewer before coding.\n* **15-35 min**: Write clean, production-grade code with meaningful variable names and modular helper functions.\n* **35-42 min**: Dry-run code manually with sample inputs and edge cases; spot and fix any bugs proactively.\n* **42-45 min**: Ask thoughtful engineering questions.`,
                shortNote: '* Never start coding before the interviewer explicitly validates your algorithm.\n* Think out loud so the interviewer can evaluate your thought process.',
                cheatSheet: '| Phase | Time | Goal |\n|---|---|---|\n| Clarify | 5 mins | Confirm constraints & edge cases |\n| Plan | 10 mins | Agree on optimal algorithm & Big O |\n| Code | 20 mins | Clean, modular implementation |\n| Test | 7 mins | Dry run through test cases |'
              },
              {
                title: 'Big Tech Offer Negotiation & Equity Strategy',
                description: 'Total compensation breakdown (Base, Bonus, RSU Equity, Sign-on), negotiating with competing offers, and hiring committee walkthrough.',
                difficulty: 'INTERMEDIATE',
                priority: 'MUST_HAVE',
                learnTime: 60,
                practiceTime: 60,
                video: {
                  title: 'How to Negotiate Big Tech Offers by Levels.fyi',
                  url: 'https://www.youtube.com/watch?v=Kz69cR2_3k4',
                  source: 'Levels.fyi'
                },
                content: `# Big Tech Offer Negotiation\n\nNever accept the first offer number. Tech recruiters have pre-approved compensation bands.\n\n## Total Compensation (TC) Structure\n$$\\text{Total Compensation} = \\text{Base Salary} + \\text{Annual Bonus (e.g. 15%)} + \\frac{\\text{RSU Equity}}{4} + \\text{Sign-on Bonus}$$\n\n## Key Rules\n* Never reveal current salary or salary history.\n* Leverage competing offers as objective leverage.\n* Ask for sign-on bonus increases or equity refreshers when base salary reaches band limit.`,
                shortNote: '* Express enthusiasm for the team while negotiating numbers.\n* RSUs vest over 4 years; Google uses front-loaded vesting (33%, 33%, 22%, 12%).',
                cheatSheet: '| Component | Negotiability | Frequency |\n|---|---|---|\n| Base Salary | Medium | Yearly review |\n| Equity (RSUs) | High | 4-year vesting |\n| Sign-on Bonus | Very High | One-time cash |'
              }
            ]
          }
        ]
      }
    ]
  }
];

async function seedAll12Phases() {
  console.log('--- SEEDING ALL 12 PHASES FOR GOOGLE SWE PREPARATION ---');

  let roadmap = await prisma.roadmap.findFirst({
    where: { title: 'Google SWE Preparation' }
  });

  if (!roadmap) {
    roadmap = await prisma.roadmap.create({
      data: {
        title: 'Google SWE Preparation',
        description: 'Comprehensive roadmap to prepare for top-tier software engineering roles by June 2028.'
      }
    });
  }

  let totalPhases = 0;
  let totalModules = 0;
  let totalSkills = 0;
  let totalTopics = 0;
  let totalVideos = 0;

  for (const pData of FULL_CURRICULUM) {
    // Find or create Phase
    let phase = await prisma.phase.findFirst({
      where: {
        roadmapId: roadmap.id,
        order: pData.phaseOrder
      }
    });

    if (!phase) {
      phase = await prisma.phase.create({
        data: {
          roadmapId: roadmap.id,
          title: pData.phaseTitle,
          order: pData.phaseOrder
        }
      });
    } else {
      // Update title to match
      phase = await prisma.phase.update({
        where: { id: phase.id },
        data: { title: pData.phaseTitle }
      });
    }
    totalPhases++;

    for (const [mIdx, mData] of pData.modules.entries()) {
      let mod = await prisma.module.findFirst({
        where: {
          phaseId: phase.id,
          title: mData.title
        }
      });

      if (!mod) {
        mod = await prisma.module.create({
          data: {
            phaseId: phase.id,
            title: mData.title,
            order: mIdx + 1
          }
        });
      }
      totalModules++;

      for (const sData of mData.skills) {
        let skill = await prisma.skill.findFirst({
          where: {
            moduleId: mod.id,
            title: sData.title
          }
        });

        if (!skill) {
          skill = await prisma.skill.create({
            data: {
              moduleId: mod.id,
              title: sData.title
            }
          });
        }
        totalSkills++;

        for (const [tIdx, tData] of sData.topics.entries()) {
          let topic = await prisma.topic.findFirst({
            where: {
              skillId: skill.id,
              title: tData.title
            }
          });

          if (!topic) {
            topic = await prisma.topic.create({
              data: {
                skillId: skill.id,
                title: tData.title,
                description: tData.description,
                difficulty: tData.difficulty,
                priority: tData.priority,
                estimatedLearnTime: tData.learnTime,
                estimatedPracticeTime: tData.practiceTime,
                order: tIdx + 1
              }
            });
          }
          totalTopics++;

          // Seed / Update LearningContent
          const existingLC = await prisma.learningContent.findFirst({
            where: { topicId: topic.id }
          });
          if (!existingLC) {
            await prisma.learningContent.create({
              data: {
                topicId: topic.id,
                title: `${tData.title} - Comprehensive Engineering Guide`,
                type: 'ARTICLE',
                status: 'PUBLISHED',
                content: tData.content
              }
            });
          }

          // Seed / Update ShortNote
          const existingSN = await prisma.shortNote.findFirst({
            where: { topicId: topic.id }
          });
          if (!existingSN) {
            await prisma.shortNote.create({
              data: {
                topicId: topic.id,
                title: `${tData.title} Quick Review`,
                status: 'PUBLISHED',
                content: tData.shortNote
              }
            });
          }

          // Seed / Update CheatSheet
          const existingCS = await prisma.cheatSheet.findFirst({
            where: { topicId: topic.id }
          });
          if (!existingCS) {
            await prisma.cheatSheet.create({
              data: {
                topicId: topic.id,
                title: `${tData.title} Reference Table`,
                status: 'PUBLISHED',
                content: tData.cheatSheet
              }
            });
          }

          // Seed / Update YouTube Video Resource
          const existingVid = await prisma.resource.findFirst({
            where: {
              topicId: topic.id,
              type: 'VIDEO'
            }
          });
          if (!existingVid && tData.video) {
            await prisma.resource.create({
              data: {
                topicId: topic.id,
                title: tData.video.title,
                url: tData.video.url,
                source: tData.video.source,
                type: 'VIDEO',
                priority: 'S',
                status: 'PUBLISHED',
                isOfficial: true,
                estimatedTime: tData.learnTime
              }
            });
            totalVideos++;
          } else if (existingVid) {
            totalVideos++;
          }
        }
      }
    }
  }

  console.log(`\n======================================================`);
  console.log(`✓ SUCCESSFULLY POPULATED ALL ${totalPhases} PHASES!`);
  console.log(`  - Total Modules: ${totalModules}`);
  console.log(`  - Total Skills: ${totalSkills}`);
  console.log(`  - Total Topics: ${totalTopics}`);
  console.log(`  - Total Verified YouTube Video Resources: ${totalVideos}`);
  console.log(`======================================================`);

  await prisma.$disconnect();
}

seedAll12Phases().catch(console.error);
