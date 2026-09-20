export const sd_13_interview = {
  SYSTEM_DESIGN_INTERVIEW: {
    title: 'System Design Interview Framework',
    description: 'The definitive blueprint for succeeding in 45-minute FAANG system design interviews.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 60,
    prerequisites: ['High-Level Design Case Studies'],
    learningContent: `
# System Design Interview Framework

A System Design interview is fundamentally different from a coding interview. There is no single "correct" answer. The interviewer is evaluating your ability to navigate ambiguity, ask the right questions, and weigh technical tradeoffs.

## The 45-Minute Blueprint

### 1. Requirements Clarification (5 mins)
Never start drawing immediately. 
- Ask for Functional Requirements (What are the 2-3 core features?).
- Ask for Non-Functional Requirements (Is it read-heavy? Global audience? Consistency vs Availability?).

### 2. Back-of-the-Envelope Estimation (5 mins)
Calculate the scale to justify your architecture.
- DAU (Daily Active Users).
- RPS (Reads vs Writes).
- Storage capacity per year.

### 3. API Design (5 mins)
Define the core endpoints.
- e.g., \`POST /tweet\`, \`GET /feed?user_id=123\`
- Define the JSON request/response payloads.

### 4. Data Model (5 mins)
Define the database schema and choose SQL vs NoSQL.
- Identify primary keys, relationships, and exactly why you chose Postgres or DynamoDB based on the earlier scale estimations.

### 5. High-Level Design (10 mins)
Draw the core boxes and arrows.
- Client -> Load Balancer -> API Servers -> Database.
- Walk the interviewer through the happy path (e.g., "When a user posts a tweet, the request flows here...").

### 6. Deep Dive & Bottlenecks (10-15 mins)
This is where you pass or fail. Look at your HLD and identify the bottlenecks based on the scale.
- "Because we have 100k reads per second, the DB will crash. I will add a Redis Cache here."
- "Because video processing is slow, we cannot do it synchronously. I will introduce a RabbitMQ queue and background workers here."
- Discuss Sharding strategies.
- Discuss Single Points of Failure.
`,
    fullNotes: `
# Detailed Notes: Interview Strategy

- **Communication is Key:** You should be talking constantly. "I am choosing NoSQL here because..." "I could use HTTP, but since this is a chat app, WebSockets are better because..." If you silently draw for 5 minutes, you have failed.
- **Drive the Interview:** Don't wait for the interviewer to ask "What happens if this server fails?" Proactively say, "This server is a single point of failure, so I will add a secondary replica."
- **Tradeoffs:** Every choice has a downside. If you add a cache, explicitly mention cache invalidation complexity. If you use NoSQL, explicitly mention the loss of ACID transactions. Engineers who understand the downsides are hired.
`,
    shortNotes: `
- 1. Clarify Requirements (FR & NFR).
- 2. Estimate Scale (RPS, Storage).
- 3. Define APIs.
- 4. Define Data Model (SQL vs NoSQL).
- 5. Draw High Level Design (Client -> LB -> Web -> DB).
- 6. Deep Dive: Identify bottlenecks, add Caching, Queues, Sharding.
- Always verbalize your tradeoffs. There is no perfect system.
`,
    cheatSheet: `
### Key Interview Phrases
- "To reduce latency and database load, I will introduce a Redis cache..."
- "To decouple these services and handle traffic spikes, I will use a message queue..."
- "Because this system is read-heavy, I will use database read-replicas..."
- "To ensure high availability, we will deploy across multiple Availability Zones..."
`,
    interviewQuestions: [
      { question: 'What is the most common mistake candidates make in a system design interview?', answerHint: 'Jumping straight into the solution (drawing boxes) without clarifying the requirements or estimating the scale. Designing a system for 100 users is entirely different from designing one for 100 million users.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Grokking the System Design Interview', url: 'https://www.designgurus.io/course/grokking-the-system-design-interview', type: 'ARTICLE', priority: 'S', source: 'DesignGurus', isOfficial: false }
    ]
  }
};
