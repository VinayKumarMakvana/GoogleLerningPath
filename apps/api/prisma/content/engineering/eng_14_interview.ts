export const eng_14_interview = {
  SOFTWARE_ENGINEERING_INTERVIEWS: {
    title: 'Software Engineering Interview Preparation',
    description: 'Master the behavioral and architectural interview rounds for Senior/Staff Engineering roles.',
    difficulty: 'EXPERT',
    estimatedLearnTime: 60,
    prerequisites: ['Production Engineering Practices'],
    learningContent: `
# Software Engineering Interviews (Senior/Staff Level)

While junior interviews focus heavily on LeetCode (DSA), Senior and Staff engineering interviews focus on **Architecture, Tradeoffs, and Behavioral Leadership**.

## 1. The Behavioral Round (Leadership & Culture)
Companies (especially FAANG) want to know how you handle conflict, ambiguity, and failure.
**The STAR Method:** Always structure your answers using this framework:
- **S - Situation:** Set the context (e.g., "The legacy API was crashing under holiday load").
- **T - Task:** What was your specific responsibility? ("I was tasked with stabilizing it without rewriting it").
- **A - Action:** What exactly did *you* do? ("I profiled the code, found the N+1 query, and implemented Redis caching").
- **R - Result:** Quantify the impact. ("Latency dropped by 80%, saving $100k in server costs").

*Crucial Rule:* Say "I", not "We". The interviewer is hiring *you*, not your team.

## 2. Navigating Conflict Questions
"Tell me about a time you disagreed with a coworker."
- *Red Flag Answer:* "They were wrong, so I complained to my manager."
- *Green Flag Answer:* "We disagreed on using MongoDB vs Postgres. I scheduled a meeting, wrote up an architectural comparison showing that our data was highly relational, and presented the tradeoff matrix. We agreed Postgres was safer, and I documented it in an ADR." (Shows data-driven conflict resolution).

## 3. The Architecture/System Design Round (The Senior Pivot)
In a system design interview, a junior engineer immediately starts drawing boxes (Load Balancer -> API -> Database).
A senior engineer spends the first 10 minutes **Gathering Requirements**:
- "What is the expected read/write ratio?"
- "Do we need strong consistency, or is eventual consistency okay?"
- "What is our latency SLO?"
If you do not ask these questions, you cannot accurately discuss Tradeoffs.

## 4. Discussing Tradeoffs
If you propose Kafka for messaging, the interviewer will ask, "Why Kafka and not RabbitMQ?"
If you answer, "Because Kafka is fast," you fail. 
You must say: "Kafka provides high-throughput log append storage and replayability, which fits our analytics requirement. However, it introduces heavier operational overhead and relies on Zookeeper/KRaft. RabbitMQ would give us easier routing via exchanges, but lacks the replayability we need."
`,
    fullNotes: `
# Detailed Notes: Interview Prep

- **The "Biggest Failure" Question:** "Tell me about a time you failed." 
  - Do not use a fake failure ("I worked too hard"). 
  - Do not use a catastrophic failure where you blamed others.
  - Use a real technical failure, focus on the immediate mitigation, and spend 70% of the answer explaining the systemic preventative measures you put in place (e.g., "I pushed a bug that took down the site. I rolled it back. Then, I added a new CI quality gate and wrote a postmortem so no one could make that mistake again.")
`,
    shortNotes: `
- Behavioral Interviews: Use the STAR method (Situation, Task, Action, Result).
- Focus on Tradeoffs. No technology is perfect.
- In System Design, spend time gathering requirements before designing.
- Conflict resolution should always be data-driven, not emotional.
- When discussing failures, focus heavily on the systemic learnings and preventative action items you created.
`,
    cheatSheet: `
### Top 5 Behavioral Themes to Prepare For:
Have a STAR story ready for each of these:
1. A time you failed / broke production.
2. A time you had a technical disagreement with a peer.
3. A time you had to push back on a Product Manager's deadline.
4. A time you mentored a junior engineer.
5. A time you proactively paid down technical debt.
`,
    interviewQuestions: [
      { question: 'During a behavioral interview, how should you answer: "Tell me about a time you had a technical disagreement with a colleague?"', answerHint: 'Use the STAR method. Focus on resolving the conflict through data and empathy, not ego. Describe the Situation (disagreement over DB choice). The Task (need to reach consensus). The Action (you created a tradeoff matrix, built a small proof of concept to benchmark performance, and held an ego-free discussion focusing on the business requirements). The Result (the team aligned on the data-backed choice, and you documented it in an ADR).', type: 'CONCEPTUAL' },
      { question: 'In a System Design interview, why is it critical to gather requirements before drawing an architecture?', answerHint: 'Architecture is driven entirely by constraints and tradeoffs. If you don\'t ask about the read/write ratio, data volume, or consistency requirements, you might design a massively scalable eventual-consistency NoSQL system for a banking ledger that strictly requires ACID guarantees. Asking clarifying questions proves you understand that technology choices are subservient to business requirements.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'The STAR Method for Behavioral Interviews', url: 'https://www.themuse.com/advice/star-interview-method', type: 'ARTICLE', priority: 'S', source: 'The Muse', isOfficial: false }
    ]
  }
};
