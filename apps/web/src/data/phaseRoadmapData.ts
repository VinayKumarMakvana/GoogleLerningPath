export interface PhaseRoadmapGuide {
  phaseOrder: number;
  phaseTitle: string;
  category: string;
  durationWeeks: string;
  objective: string;
  studyStrategy: string[];
  architectureDiagram: string;
  milestone: string;
  keySkills: string[];
}

export const PHASE_ROADMAP_GUIDES: Record<number, PhaseRoadmapGuide> = {
  0: {
    phaseOrder: 0,
    phaseTitle: 'PHASE 0: Setup + Learning System',
    category: 'Engineering Tooling & Foundation',
    durationWeeks: '1 - 2 Weeks',
    objective: 'Establish a production-grade terminal, shell, and git workflow matching Google software engineering velocity.',
    studyStrategy: [
      'Master command-line text processing (grep, awk, sed, ripgrep) until keyboard navigation becomes second nature.',
      'Configure dotfiles, SSH keys, GPG signing, and understand Git rebase vs merge.',
      'Learn GCC/Clang compilation stages (preprocessing, compilation, assembly, linking) and CMake build configurations.'
    ],
    architectureDiagram: `[Source Code (.cpp)] 
       │
       ▼ (Preprocessor: expand #include / macros)
[Translation Unit (.i)] 
       │
       ▼ (Compiler: AST -> Assembly)
[Assembly (.s)] 
       │
       ▼ (Assembler: Machine code)
[Object File (.o)] ──────┐
                         ▼ (Linker: resolve symbols & libc)
                   [Binary Executable]`,
    milestone: 'Able to navigate, build, debug, and submit PRs with interactive rebasing entirely from the command line.',
    keySkills: ['Zsh / Bash', 'Git Rebase & Reflog', 'CMake', 'Clang / GCC', 'Linux System Tools']
  },
  1: {
    phaseOrder: 1,
    phaseTitle: 'PHASE 1: C++ Fundamentals + DSA Foundation + Git',
    category: 'Language Mastery & Low-Level Mechanics',
    durationWeeks: '4 - 6 Weeks',
    objective: 'Master memory allocation, pointers, references, RAII, and introductory linear data structures with zero undefined behavior.',
    studyStrategy: [
      'Understand Stack vs Heap memory layout and cache line contiguity (64-byte L1 cache line loading).',
      'Replace raw new/delete with modern smart pointers (unique_ptr, shared_ptr, weak_ptr).',
      'Solve 25+ classic Two-Pointer and Sliding Window problems to build muscle memory for in-place array manipulation.'
    ],
    architectureDiagram: `┌─────────────────────────────────────────────────────┐
│                   PROCESS MEMORY                    │
├─────────────────┬───────────────────────────────────┤
│ Text Segment    │ Compiled machine instructions     │
│ Data Segment    │ Initialized globals & statics     │
│ Heap Segment    │ Dynamic allocations (malloc/new)  │ ──► Grows Downward
│                 │                                   │
│ Stack Segment   │ Local vars, stack frames, LIFO    │ ◄── Grows Upward
└─────────────────┴───────────────────────────────────┘`,
    milestone: 'Solve Two Sum, 3Sum, and Container With Most Water in optimal O(N) time with zero extra space allocations.',
    keySkills: ['Modern C++20', 'Smart Pointers', 'RAII', 'Cache Contiguity', 'Two Pointers Pattern']
  },
  2: {
    phaseOrder: 2,
    phaseTitle: 'PHASE 2: DSA Core + CS Fundamentals + TypeScript/Node fundamentals',
    category: 'Core Computer Science & Runtime Engines',
    durationWeeks: '6 - 8 Weeks',
    objective: 'Internalize linear and hierarchical data structures alongside Operating System internals (processes, threads, virtual memory).',
    studyStrategy: [
      'Implement Linked Lists, Stacks, Queues, and Binary Search Trees completely from scratch.',
      'Study OS scheduling algorithms, context switching overhead, virtual memory paging, and deadlock conditions.',
      'Deep dive into the Node.js event loop (Timers, Poll, Check phases) and Libuv thread pool.'
    ],
    architectureDiagram: `┌──────────────────────────────────────────────────────────────────────────┐
│                           NODE.JS EVENT LOOP                             │
├─────────────────┬───────────────────────────┬────────────────────────────┤
│ 1. Timers       │ setTimeout, setInterval   │ Min-heap timer expiry      │
│ 2. Pending I/O  │ OS system calls, TCP errors│ System callback execution │
│ 3. Idle, Prep   │ Internal Libuv housekeeping│ Next tick preparation     │
│ 4. Poll Phase   │ Incoming HTTP, Socket I/O │ Blocks waiting for events  │
│ 5. Check Phase  │ setImmediate callbacks    │ Runs right after poll      │
│ 6. Close Phase  │ socket.on('close')        │ Resource cleanup           │
└─────────────────┴───────────────────────────┴────────────────────────────┘`,
    milestone: 'Explain the 4 Coffman deadlock conditions and write asynchronous concurrent programs without race conditions.',
    keySkills: ['Binary Trees', 'BST Balancing', 'Virtual Memory', 'OS Concurrency', 'Event Loop & Libuv']
  },
  3: {
    phaseOrder: 3,
    phaseTitle: 'PHASE 3: Backend Engineering + PostgreSQL + MongoDB + Testing',
    category: 'API Engineering & Relational Systems',
    durationWeeks: '4 - 6 Weeks',
    objective: 'Engineer production-grade REST APIs, relational schemas with B-Tree indexes, and automated test pipelines.',
    studyStrategy: [
      'Design clean RESTful APIs with strict status codes, input schema validation (Zod), and token rotation.',
      'Master PostgreSQL B-Tree indexing, composite indexes, and run EXPLAIN ANALYZE to identify sequential scans.',
      'Implement automated integration testing with Jest and Supertest achieving >85% code coverage.'
    ],
    architectureDiagram: `[Client Browser/Mobile]
       │
       ▼ (HTTPS / Bearer JWT)
[API Gateway / Express.js] ── (Zod Schema Validation)
       │
       ├──► [PostgreSQL] (ACID Transactions, Relational Foreign Keys, B-Tree Index)
       │
       └──► [MongoDB] (Document Store, User Activity Logs, Flexible Schemas)`,
    milestone: 'Pass 100% automated integration tests for authenticated CRUD endpoints with sub-50ms p95 response latency.',
    keySkills: ['RESTful Design', 'JWT Authentication', 'PostgreSQL B-Trees', 'EXPLAIN ANALYZE', 'Jest Testing']
  },
  4: {
    phaseOrder: 4,
    phaseTitle: 'PHASE 4: Advanced DSA + Backend Production + Redis + Queues',
    category: 'Advanced Algorithms & Distributed Caching',
    durationWeeks: '6 - 8 Weeks',
    objective: 'Master Graphs, Dynamic Programming, Redis in-memory storage patterns, and asynchronous task queues.',
    studyStrategy: [
      'Master BFS, DFS, Dijkstra, and Topological Sort on directed acyclic graphs (DAGs).',
      'Solve 30+ 1D/2D Dynamic Programming problems using memoization and tabulation.',
      'Deploy Redis for Cache-Aside architectures, write-through caching, and implement BullMQ background workers.'
    ],
    architectureDiagram: `Client Request ──► [API Server] ──► Read [Redis Cache]
                                             │
                          (Cache Miss)       ▼ (Cache Hit: Return in <2ms)
                                  ┌─── [PostgreSQL DB]
                                  │
                                  ▼
                         Write to [Redis Cache] + Return Client`,
    milestone: 'Solve LeetCode Hard graph and DP problems under 30 minutes; implement rate-limiting middleware using Redis.',
    keySkills: ['Graph Algorithms', 'Dijkstra', 'Dynamic Programming', 'Redis Cache-Aside', 'BullMQ Queues']
  },
  5: {
    phaseOrder: 5,
    phaseTitle: 'PHASE 5: Docker + CI/CD + Cloud + Security',
    category: 'Containerization, DevOps & Web Security',
    durationWeeks: '3 - 4 Weeks',
    objective: 'Containerize multi-tier applications with multi-stage Docker builds, automate CI/CD with GitHub Actions, and harden security.',
    studyStrategy: [
      'Write production multi-stage Dockerfiles that reduce image sizes from 1GB to <100MB using Alpine/Distroless.',
      'Construct GitHub Actions CI/CD pipelines with automated linting, unit testing, and Docker Hub image pushing.',
      'Audit applications against OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, SSRF, CORS misconfigurations).'
    ],
    architectureDiagram: `[Developer Git Push] 
       │
       ▼
[GitHub Actions CI] ──► Run Linters & Tests ──► Multi-Stage Docker Build
                                                       │
                                                       ▼
[Google Artifact Registry] ──────────────────► [GCP Cloud Run / K8s Cluster]`,
    milestone: 'Zero-downtime deployment pipeline where every merged pull request triggers automated tests and container deployment.',
    keySkills: ['Docker Multi-Stage', 'GitHub Actions', 'GCP / Cloud Run', 'OWASP Top 10', 'HTTPS & TLS']
  },
  6: {
    phaseOrder: 6,
    phaseTitle: 'PHASE 6: Architecture + Microservices + Kafka/RabbitMQ + Kubernetes',
    category: 'Event-Driven Systems & Microservices',
    durationWeeks: '5 - 6 Weeks',
    objective: 'Architect distributed microservices communicating asynchronously via Apache Kafka and orchestrated by Kubernetes.',
    studyStrategy: [
      'Deconstruct monolithic architectures into loosely coupled domain-driven services communicating over gRPC.',
      'Deploy Apache Kafka, configuring topic partitions, replication factors, and consumer group rebalancing.',
      'Write Kubernetes manifests (Deployments, ClusterIP Services, Ingress, ConfigMaps, Secrets) with health probes.'
    ],
    architectureDiagram: `[Order Service] ──► Publishes "OrderCreated" Event
       │
       ▼
┌────────────────────────────────────────────────────────┐
│              APACHE KAFKA TOPIC (3 Partitions)         │
│  [Partition 0]   │   [Partition 1]   │   [Partition 2] │
└────────┬───────────────────┬───────────────────┬───────┘
         │                   │                   │
         ▼                   ▼                   ▼
[Payment Consumer]   [Inventory Consumer]  [Notification Service]`,
    milestone: 'Deploy a multi-service event-driven architecture handling 10,000 asynchronous events/sec with zero message loss.',
    keySkills: ['Microservices', 'gRPC & Protobuf', 'Apache Kafka', 'Kubernetes Pods & Services', 'Event Sourcing']
  },
  7: {
    phaseOrder: 7,
    phaseTitle: 'PHASE 7: System Design + Distributed Systems + Observability',
    category: 'High-Level Design & Scalability',
    durationWeeks: '6 - 8 Weeks',
    objective: 'Master FAANG-standard High-Level System Design (HLD), CAP theorem trade-offs, and Prometheus/OpenTelemetry monitoring.',
    studyStrategy: [
      'Practice back-of-the-envelope calculations for storage, throughput (QPS), and bandwidth estimation.',
      'Design flagship case studies: TinyURL, Distributed Rate Limiter, Twitter/Feed System, and Real-Time Chat.',
      'Configure Prometheus metric scraping, Grafana dashboards, and distributed tracing across microservices.'
    ],
    architectureDiagram: `[Global Clients] ──► [DNS / Anycast Routing] ──► [CDN Edge Cache]
                                                          │
                                                          ▼ (Cache Miss)
                                                 [Layer 7 Load Balancer]
                                                          │
                                     ┌────────────────────┴────────────────────┐
                                     ▼                                         ▼
                             [API Gateway Node 1]                     [API Gateway Node 2]
                                     │                                         │
                   ┌─────────────────┴─────────────────┐                       │
                   ▼                                   ▼                       ▼
            [Redis Cluster]                   [Consistent Hash Ring]    [Kafka Event Log]
                   │                                   │                       │
                   ▼                                   ▼                       ▼
            [Primary DB] ── (Replication) ──► [Read Replicas]           [Analytics Warehouse]`,
    milestone: 'Deliver structured 45-minute Google L5 System Design mock interviews covering requirements, API, HLD, and deep dives.',
    keySkills: ['CAP & PACELC', 'Consistent Hashing', 'Database Sharding', 'HLD Case Studies', 'OpenTelemetry']
  },
  8: {
    phaseOrder: 8,
    phaseTitle: 'PHASE 8: AI/ML Mathematics + ML + Deep Learning',
    category: 'Machine Learning & Mathematical Foundations',
    durationWeeks: '4 - 6 Weeks',
    objective: 'Build intuitive mathematical foundations (Linear Algebra, Calculus, Probability) and implement neural networks in PyTorch.',
    studyStrategy: [
      'Review vector projections, matrix transformations, eigenvalues, and multivariate gradient descent.',
      'Implement classical supervised algorithms (Logistic Regression, Decision Trees, Random Forests) from scratch.',
      'Build feedforward and convolutional neural networks in PyTorch, debugging autograd gradient flows.'
    ],
    architectureDiagram: `Input Vector (X) ──► [W1 · X + b1] ──► [ReLU Activation] ──► [W2 · H + b2] ──► [Softmax] ──► Output (Y_hat)
                                                                                                    │
                                                                                                    ▼
                                             Loss Function L(Y_hat, Y) ◄────────────────────────────┘
                                                     │
                                                     ▼ (Backpropagation: Chain Rule)
                                   Update Weights: W = W - η · (∂L / ∂W)`,
    milestone: 'Train and evaluate a custom PyTorch model achieving >95% accuracy; explain backpropagation chain rule mathematically.',
    keySkills: ['Linear Algebra', 'Gradient Descent', 'PyTorch Autograd', 'Loss Functions', 'Supervised Learning']
  },
  9: {
    phaseOrder: 9,
    phaseTitle: 'PHASE 9: LLMs + RAG + Agents + AI Systems',
    category: 'Generative AI & Transformer Systems',
    durationWeeks: '5 - 6 Weeks',
    objective: 'Master Transformer architectures, Self-Attention mechanisms, vector databases, and production RAG pipelines.',
    studyStrategy: [
      'Understand Scaled Dot-Product Attention: Query, Key, Value matrix multiplications and causal masking.',
      'Build a production RAG system with document chunking, dense vector embeddings, and hybrid search (BM25 + HNSW).',
      'Deploy autonomous AI agents with function calling and optimize inference latency using vLLM.'
    ],
    architectureDiagram: `User Query ──► [Embedding Model] ──► Query Vector (1536-dim)
                                            │
                                            ▼ (HNSW Vector Search)
[Enterprise Docs] ──► [Vector DB (Pinecone/Milvus)] ──► Top-3 Relevant Context Chunks
                                                                 │
                                                                 ▼
Prompt = [System Instructions] + [Retrieved Context] + [User Query]
                                │
                                ▼
                  [LLM (vLLM High-Throughput Engine)] ──► Verified Grounded Response`,
    milestone: 'Deploy an end-to-end RAG system with citation grounding and latency <500ms; implement multi-turn tool-calling agents.',
    keySkills: ['Transformer Attention', 'Vector Databases', 'RAG Pipelines', 'AI Tool Calling', 'vLLM Serving']
  },
  10: {
    phaseOrder: 10,
    phaseTitle: 'PHASE 10: Flagship Projects + Open Source + Production Experience',
    category: 'Real-World Systems Engineering',
    durationWeeks: '6 - 8 Weeks',
    objective: 'Build, benchmark, and deploy 2 flagship engineering projects demonstrating systems mastery, and contribute to open source.',
    studyStrategy: [
      'Build a distributed in-memory cache server in C++/Go supporting RESP protocol, non-blocking I/O, and LRU eviction.',
      'Benchmark throughput and p99 latency with automated load testing tools (wrk, k6).',
      'Submit meaningful pull requests with unit tests to major open-source repositories.'
    ],
    architectureDiagram: `┌────────────────────────────────────────────────────────┐
│         FLAGSHIP PROJECT: HIGH-THROUGHPUT ENGINE       │
├────────────────────┬───────────────────────────────────┤
│ Network Layer      │ epoll / kqueue non-blocking I/O   │
│ Protocol Parser    │ Zero-copy binary parser (RESP)    │
│ Concurrency Model  │ Event loop + Worker threadpool    │
│ Storage Engine     │ Cache-aligned hashtable with LRU  │
│ Performance Bar    │ 150,000+ QPS @ p99 < 1.2ms        │
└────────────────────┴───────────────────────────────────┘`,
    milestone: 'Publish production-ready GitHub repository with comprehensive README, architectural diagrams, benchmarks, and CI/CD badge.',
    keySkills: ['Systems Programming', 'Non-blocking I/O', 'Benchmarking (k6)', 'Open Source PRs', 'Code Quality']
  },
  11: {
    phaseOrder: 11,
    phaseTitle: 'PHASE 11: Internship + Interview + Career Execution',
    category: 'Career Pipeline & Behavioral Mastery',
    durationWeeks: '3 - 4 Weeks',
    objective: 'Engineer a FAANG-standard resume with Google X-Y-Z framing and master behavioral interviews with the STAR method.',
    studyStrategy: [
      'Rewrite resume bullets strictly adhering to "Accomplished [X], as measured by [Y], by doing [Z]".',
      'Prepare 10+ structured behavioral stories covering conflict resolution, technical failure, leadership, and ambiguity.',
      'Establish a disciplined application cadence: target 5 referral-backed applications per week.'
    ],
    architectureDiagram: `[Candidate Profile]
       │
       ▼
[The Google X-Y-Z Formula]
"Accomplished [X: Measurable Outcome], as measured by [Y: Concrete Metric], by doing [Z: Engineering Action]"
       │
       ▼
Example: "Reduced p99 database query latency by 64% (from 420ms to 150ms) by architecting composite B-Tree indexes and Redis caching."`,
    milestone: 'Complete 1-page ATS-optimized resume passing senior recruiter screens; deliver fluent STAR behavioral responses.',
    keySkills: ['Google X-Y-Z Formula', 'STAR Behavioral Method', 'Googliness Bar', 'Portfolio Presentation']
  },
  12: {
    phaseOrder: 12,
    phaseTitle: 'PHASE 12: Final Big Tech Interview Preparation',
    category: 'Onsite Simulation & Offer Negotiation',
    durationWeeks: '4 - 6 Weeks',
    objective: 'Simulate full 5-round Google onsite interview loops under pressure and master total compensation negotiation.',
    studyStrategy: [
      'Conduct 10+ timed 45-minute live coding mock interviews with peer engineers or mentors.',
      'Run full 45-minute System Design mock interviews on whiteboard tools (Excalidraw).',
      'Study Levels.fyi compensation bands and formulate negotiation scripts leveraging competing offers.'
    ],
    architectureDiagram: `┌────────────────────────────────────────────────────────┐
│           GOOGLE L5 ONSITE 5-ROUND INTERVIEW LOOP      │
├─────────┬──────────────────────────────────────────────┤
│ Round 1 │ Algorithmic Coding (Hard Graphs / DP)        │
│ Round 2 │ Algorithmic Coding (Data Structures & Trees) │
│ Round 3 │ High-Level Distributed System Design (HLD)   │
│ Round 4 │ Low-Level Design / Systems Architecture      │
│ Round 5 │ Googliness & Behavioral Leadership (L5 Bar)  │
└─────────┴──────────────────────────────────────────────┘`,
    milestone: 'Pass Google L5 mock interview loops with consistent "Strong Hire" ratings in problem solving, code quality, and communication.',
    keySkills: ['Live Whiteboard Coding', 'System Design Under Pressure', 'Offer Negotiation', 'Google L5 Bar']
  }
};
