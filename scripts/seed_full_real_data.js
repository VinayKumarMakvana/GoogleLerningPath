const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();
const DEMO_USER_ID = '66324d081a95e74e6fcf2288';

async function main() {
  console.log('--- SEEDING COMPREHENSIVE REAL DATA INTO MONGODB ---');

  // 1. Ensure User & Profile
  const hashedPassword = await bcrypt.hash('Password123!', 10);
  
  await prisma.user.upsert({
    where: { id: DEMO_USER_ID },
    update: {
      email: 'demo@google.com',
      password: hashedPassword,
    },
    create: {
      id: DEMO_USER_ID,
      email: 'demo@google.com',
      password: hashedPassword,
    }
  });
  console.log('✓ User created/verified');

  // 2. Profile
  await prisma.profile.upsert({
    where: { userId: DEMO_USER_ID },
    update: {
      firstName: 'Vinay',
      lastName: 'Makvana',
      target: 'Google SWE L5 / Senior Software Engineer',
    },
    create: {
      userId: DEMO_USER_ID,
      firstName: 'Vinay',
      lastName: 'Makvana',
      target: 'Google SWE L5 / Senior Software Engineer',
    }
  });
  console.log('✓ Profile created/verified');

  // 3. CareerProfile
  await prisma.careerProfile.upsert({
    where: { userId: DEMO_USER_ID },
    update: {
      targetRole: 'Google Senior Software Engineer (L5)',
      targetLocations: ['Mountain View, CA', 'Bengaluru, India', 'Zurich, Switzerland', 'Remote'],
      education: 'B.Tech in Computer Science & Engineering',
      experience: 'High-Performance Distributed Systems & Full-Stack Platform Engineering',
      resumeStatus: 'READY'
    },
    create: {
      userId: DEMO_USER_ID,
      targetRole: 'Google Senior Software Engineer (L5)',
      targetLocations: ['Mountain View, CA', 'Bengaluru, India', 'Zurich, Switzerland', 'Remote'],
      education: 'B.Tech in Computer Science & Engineering',
      experience: 'High-Performance Distributed Systems & Full-Stack Platform Engineering',
      resumeStatus: 'READY'
    }
  });
  console.log('✓ CareerProfile created/verified');

  // 4. Goals
  await prisma.goal.deleteMany({ where: { userId: DEMO_USER_ID } });
  await prisma.goal.createMany({
    data: [
      {
        userId: DEMO_USER_ID,
        title: 'Master Google SWE L5 DSA (250+ Problems & 43 Core Patterns)',
        type: 'ROLE',
        targetDate: new Date('2026-12-31')
      },
      {
        userId: DEMO_USER_ID,
        title: 'Design & Ship Distributed Production Systems Architecture',
        type: 'SKILL',
        targetDate: new Date('2026-11-30')
      },
      {
        userId: DEMO_USER_ID,
        title: 'Pass Google L5 Onsite Bar Raiser Mock Assessment with >90% Score',
        type: 'SKILL',
        targetDate: new Date('2026-11-15')
      }
    ]
  });
  console.log('✓ Goals seeded');

  // 5. Job Applications
  await prisma.jobApplication.deleteMany({ where: { userId: DEMO_USER_ID } });
  await prisma.jobApplication.createMany({
    data: [
      {
        userId: DEMO_USER_ID,
        company: 'Google',
        role: 'Senior Software Engineer (L5) - Core Systems',
        location: 'Mountain View, CA / Bengaluru',
        jobUrl: 'https://careers.google.com/jobs/results/14029192837',
        status: 'INTERVIEW',
        nextAction: 'Google Onsite Round 3: Distributed System Design & Architecture',
        applicationDate: new Date(Date.now() - 14 * 86400000),
        followUpDate: new Date(Date.now() + 3 * 86400000),
        notes: 'Passed initial phone screen and DSA Round 1 (Hard Binary Tree DP) and Round 2 (Concurrency).'
      },
      {
        userId: DEMO_USER_ID,
        company: 'Stripe',
        role: 'Infrastructure & Ledger Engineer',
        location: 'Remote',
        jobUrl: 'https://stripe.com/jobs/infrastructure-engineer',
        status: 'INTERVIEW',
        nextAction: 'Distributed Systems Deep Dive (Idempotency & Consensus)',
        applicationDate: new Date(Date.now() - 20 * 86400000),
        followUpDate: new Date(Date.now() + 5 * 86400000),
        notes: 'Hiring manager interview completed with strong feedback on Redis and distributed transactions.'
      },
      {
        userId: DEMO_USER_ID,
        company: 'Anthropic',
        role: 'Systems & Inference Serving Engineer',
        location: 'San Francisco, CA',
        jobUrl: 'https://anthropic.com/careers/systems',
        status: 'APPLIED',
        nextAction: 'Technical phone screen scheduling',
        applicationDate: new Date(Date.now() - 7 * 86400000),
        followUpDate: new Date(Date.now() + 4 * 86400000),
        notes: 'Submitted portfolio highlighting high-throughput model serving kernels.'
      },
      {
        userId: DEMO_USER_ID,
        company: 'Meta',
        role: 'Production Engineer (E5)',
        location: 'Menlo Park, CA',
        jobUrl: 'https://metacareers.com/jobs/production-engineer',
        status: 'OFFER',
        nextAction: 'Review offer package and equity breakdown',
        applicationDate: new Date(Date.now() - 35 * 86400000),
        followUpDate: new Date(Date.now() + 2 * 86400000),
        notes: 'All 5 onsite rounds completed. Received top rating in Systems Coding and Linux Internals.'
      }
    ]
  });
  console.log('✓ Job Applications seeded');

  // 6. Contributions
  await prisma.contributionTask.deleteMany({});
  await prisma.contribution.deleteMany({ where: { userId: DEMO_USER_ID } });
  
  const c1 = await prisma.contribution.create({
    data: {
      userId: DEMO_USER_ID,
      repoName: 'facebook/react',
      repoUrl: 'https://github.com/facebook/react',
      organization: 'Meta',
      type: 'PR',
      status: 'MERGED',
      prUrl: 'https://github.com/facebook/react/pull/28901',
      notes: 'Optimized hook dependency cycle resolution and memory footprint in concurrent mode renderer.',
      completionDate: new Date(Date.now() - 10 * 86400000),
      tasks: {
        create: [
          { title: 'Profile scheduler memory allocation under synthetic stress', status: 'COMPLETED', order: 1 },
          { title: 'Refactor topological sort for circular dependency checking', status: 'COMPLETED', order: 2 },
          { title: 'Submit PR with automated regression tests', status: 'COMPLETED', order: 3 }
        ]
      }
    }
  });

  const c2 = await prisma.contribution.create({
    data: {
      userId: DEMO_USER_ID,
      repoName: 'redis/redis',
      repoUrl: 'https://github.com/redis/redis',
      organization: 'Redis Ltd',
      type: 'CODE',
      status: 'MERGED',
      prUrl: 'https://github.com/redis/redis/pull/13104',
      notes: 'Reduced tail latency p99 jitter during cluster hashslot migration by batching slot acknowledgements.',
      completionDate: new Date(Date.now() - 5 * 86400000),
      tasks: {
        create: [
          { title: 'Reproduce slot migration jitter on 100-node cluster benchmark', status: 'COMPLETED', order: 1 },
          { title: 'Implement async batching of CLUSTER SETSLOT messages', status: 'COMPLETED', order: 2 }
        ]
      }
    }
  });

  const c3 = await prisma.contribution.create({
    data: {
      userId: DEMO_USER_ID,
      repoName: 'vllm-project/vllm',
      repoUrl: 'https://github.com/vllm-project/vllm',
      organization: 'vLLM',
      type: 'FEATURE',
      status: 'IN_PROGRESS',
      prUrl: 'https://github.com/vllm-project/vllm/pull/4521',
      notes: 'PagedAttention KV cache compression kernel for multi-turn long-context inference.',
      tasks: {
        create: [
          { title: 'Design 4-bit KV block quantization scheme', status: 'COMPLETED', order: 1 },
          { title: 'Write Triton kernel for dequantization on the fly', status: 'COMPLETED', order: 2 },
          { title: 'Benchmark throughput vs baseline on 8x H100 GPU cluster', status: 'PENDING', order: 3 }
        ]
      }
    }
  });
  console.log('✓ Contributions and tasks seeded');

  // 7. Pattern Mastery
  await prisma.userPatternMastery.deleteMany({ where: { userId: DEMO_USER_ID } });
  const patterns = await prisma.dsaPattern.findMany();
  if (patterns.length > 0) {
    const states = ['MASTERED', 'MASTERED', 'MASTERED', 'PRACTICING', 'PRACTICING', 'REVIEW'];
    const patternData = patterns.map((p, idx) => ({
      userId: DEMO_USER_ID,
      patternId: p.id,
      state: states[idx % states.length]
    }));
    await prisma.userPatternMastery.createMany({ data: patternData });
    console.log(`✓ Seeded ${patternData.length} pattern masteries`);
  }

  // 8. Practice Attempts (Spread over last 14 days for real streak & stats)
  await prisma.practiceAttempt.deleteMany({ where: { userId: DEMO_USER_ID } });
  const problems = await prisma.practiceProblem.findMany({ take: 30 });
  
  if (problems.length > 0) {
    const attempts = [];
    for (let day = 0; day < 14; day++) {
      const date = new Date(Date.now() - day * 86400000);
      const dayProblems = [
        problems[(day * 2) % problems.length],
        problems[(day * 2 + 1) % problems.length]
      ];
      
      for (const p of dayProblems) {
        attempts.push({
          userId: DEMO_USER_ID,
          practiceProblemId: p.id,
          status: 'SOLVED',
          result: 'ACCEPTED',
          language: 'cpp',
          timeSpent: Math.floor(Math.random() * 20 + 10) * 60,
          hintsUsed: Math.random() > 0.7 ? 1 : 0,
          reviewState: 'SOLVED_CONFIDENTLY',
          startedAt: date,
          submittedAt: date,
          updatedAt: date
        });
      }
    }
    // Add one failed attempt for realistic metrics
    attempts.push({
      userId: DEMO_USER_ID,
      practiceProblemId: problems[0].id,
      status: 'FAILED',
      result: 'TIME_LIMIT_EXCEEDED',
      language: 'cpp',
      timeSpent: 25 * 60,
      hintsUsed: 2,
      reviewState: 'NEEDS_REVIEW',
      startedAt: new Date(Date.now() - 2 * 86400000),
      submittedAt: new Date(Date.now() - 2 * 86400000),
      updatedAt: new Date(Date.now() - 2 * 86400000)
    });
    await prisma.practiceAttempt.createMany({ data: attempts });

    console.log(`✓ Seeded ${attempts.length} practice attempts spanning 14 days`);
  }

  // 9. Assessment Attempts
  await prisma.assessmentAttempt.deleteMany({ where: { userId: DEMO_USER_ID } });
  const assessments = await prisma.assessment.findMany({ take: 3 });
  for (const a of assessments) {
    await prisma.assessmentAttempt.create({
      data: {
        userId: DEMO_USER_ID,
        assessmentId: a.id,
        status: 'SUBMITTED',
        score: Math.floor(Math.random() * 12 + 88), // 88% - 100%
        timeUsed: Math.floor(Math.random() * 1200 + 2400),
        startedAt: new Date(Date.now() - 7 * 86400000),
        submittedAt: new Date(Date.now() - 7 * 86400000 + 3600000)
      }
    });
  }
  console.log(`✓ Seeded assessment attempts`);

  // 10. Daily Plan
  await prisma.dailyPlanTask.deleteMany({});
  await prisma.dailyPlan.deleteMany({ where: { userId: DEMO_USER_ID } });
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const plan = await prisma.dailyPlan.create({
    data: {
      userId: DEMO_USER_ID,
      date: today,
      targetTime: 180,
      plannedTime: 180,
      completedTime: 75,
      status: 'ACTIVE',
      notes: 'Focus on Distributed Caching & Two-Pointers/Sliding Window Google Hard problems.',
      tasks: {
        create: [
          {
            type: 'PRACTICE_PROBLEM',
            title: 'Solve: LRU Cache (High Frequency Google Question)',
            reason: 'Frequent Google Onsite Round 1 & 2 problem requiring O(1) get & put.',
            estimatedMinutes: 30,
            priority: 1,
            status: 'COMPLETED'
          },
          {
            type: 'LEARN_TOPIC',
            title: 'Deep Dive: Distributed Caching & Invalidation Patterns',
            reason: 'Core requirement for Google L5 System Design interview.',
            estimatedMinutes: 45,
            priority: 2,
            status: 'COMPLETED'
          },
          {
            type: 'PRACTICE_PROBLEM',
            title: 'Solve: Minimum Window Substring',
            reason: 'Strengthen Sliding Window mastery with dual-hashmap validation.',
            estimatedMinutes: 35,
            priority: 3,
            status: 'PENDING'
          },
          {
            type: 'LEARN_TOPIC',
            title: 'System Design: Design a High-Throughput Distributed Rate Limiter',
            reason: 'Understand Token Bucket, Leaky Bucket, Sliding Window Log, Redis RedisCell.',
            estimatedMinutes: 40,
            priority: 4,
            status: 'PENDING'
          },
          {
            type: 'INTERVIEW_PRACTICE',
            title: 'Mock Interview: Explain CAP Theorem & Trade-offs at Scale',
            reason: 'Sharpen articulation and bar-raiser communication structure.',
            estimatedMinutes: 30,
            priority: 5,
            status: 'PENDING'
          }
        ]
      }
    }
  });
  console.log('✓ Daily Plan and tasks seeded');

  // 11. Progress across Topics
  await prisma.progress.deleteMany({ where: { userId: DEMO_USER_ID } });
  const allTopics = await prisma.topic.findMany();
  if (allTopics.length > 0) {
    const progressRecords = [];
    allTopics.forEach((t, index) => {
      let status = 'NOT_STARTED';
      if (index < 28) {
        status = 'COMPLETED';
      } else if (index < 42) {
        status = 'IN_PROGRESS';
      }
      progressRecords.push({
        userId: DEMO_USER_ID,
        entityId: t.id,
        entityType: 'TOPIC',
        status,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
    await prisma.progress.createMany({ data: progressRecords });
    console.log(`✓ Seeded progress for ${progressRecords.length} topics (28 COMPLETED, 14 IN_PROGRESS)`);
  }

  // 12. Interview Questions linked to Topics
  await prisma.interviewQuestion.deleteMany({});
  const sampleTopics = await prisma.topic.findMany({ take: 10 });
  const interviewQuestionsList = [
    {
      q: 'How does virtual memory translation work in modern x86-64 operating systems?',
      hint: 'Multi-level page tables (4-level or 5-level paging), CR3 register, TLB (Translation Lookaside Buffer), Page Fault interrupt handler.',
      type: 'TECHNICAL'
    },
    {
      q: 'Compare TCP vs UDP and explain TCP Slow Start and Congestion Avoidance algorithms.',
      hint: 'TCP 3-way handshake, congestion window (cwnd), slow-start threshold (ssthresh), additive increase multiplicative decrease (AIMD), BBR vs CUBIC.',
      type: 'TECHNICAL'
    },
    {
      q: 'How would you design a distributed cache like Memcached or Redis from scratch?',
      hint: 'Consistent hashing with virtual nodes to minimize rehashing on node failure, LRU eviction via doubly linked list + hash map, read-through vs write-back.',
      type: 'SYSTEM_DESIGN'
    },
    {
      q: 'Describe a situation where you had a disagreement with a senior engineer or architect. How did you resolve it?',
      hint: 'STAR method: Focus on empirical data, benchmarks, trade-offs analysis, customer impact, and committing to the decision once aligned.',
      type: 'BEHAVIORAL'
    },
    {
      q: 'What is the CAP theorem, and why can a distributed system never be both strictly CP and AP during a network partition?',
      hint: 'Brewer theorem: In presence of network partition (P), nodes on partition A cannot know writes on partition B. You either reject writes (Consistency) or accept potentially stale writes (Availability).',
      type: 'SYSTEM_DESIGN'
    },
    {
      q: 'Explain how B+ Trees work and why databases use B+ Trees instead of Binary Search Trees or Hash Indexes for range queries.',
      hint: 'High fanout minimizes disk I/O depth, all data values are stored in linked leaf nodes for rapid sequential scans, internal nodes store only keys and pointers.',
      type: 'TECHNICAL'
    },
    {
      q: 'Tell me about a high-severity production outage you caused or debugged. What was the root cause and mitigation?',
      hint: 'STAR format: Clear timeline, how telemetry/logs helped isolate the issue, immediate roll-forward or rollback, follow-up postmortem and automated guardrails.',
      type: 'BEHAVIORAL'
    },
    {
      q: 'How do LLM Attention mechanisms work, and why does FlashAttention provide such a significant speedup?',
      hint: 'Softmax(Q K^T / sqrt(d_k)) * V. FlashAttention avoids writing the full NxN attention matrix to high-bandwidth memory (HBM) by tiling query/key blocks and fusing softmax computation in fast SRAM.',
      type: 'TECHNICAL'
    }
  ];

  const iqRecords = [];
  sampleTopics.forEach((t, i) => {
    const qData = interviewQuestionsList[i % interviewQuestionsList.length];
    iqRecords.push({
      topicId: t.id,
      question: qData.q,
      answerHint: qData.hint,
      type: qData.type,
      status: 'PUBLISHED',
      version: 1
    });
  });
  await prisma.interviewQuestion.createMany({ data: iqRecords });
  console.log(`✓ Seeded ${iqRecords.length} interview questions`);

  console.log('--- ALL REAL DATA SEEDING COMPLETED SUCCESSFULLY ---');
  await prisma.$disconnect();
}

main().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
