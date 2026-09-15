import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Database...');

  // Clean up existing data to prevent duplicates on re-run
  await prisma.topic.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.module.deleteMany();
  await prisma.phase.deleteMany();
  await prisma.roadmap.deleteMany();
  await prisma.track.deleteMany();

  // 1. Create Tracks
  const tracks = [
    { title: 'TRACK 1 — C++ + DSA + COMPETITIVE PROGRAMMING' },
    { title: 'TRACK 2 — COMPUTER SCIENCE FUNDAMENTALS' },
    { title: 'TRACK 3 — SOFTWARE ENGINEERING + BACKEND' },
    { title: 'TRACK 4 — DATABASES' },
    { title: 'TRACK 5 — CLOUD + DEVOPS' },
    { title: 'TRACK 6 — SOFTWARE ARCHITECTURE' },
    { title: 'TRACK 7 — SYSTEM DESIGN + DISTRIBUTED SYSTEMS' },
    { title: 'TRACK 8 — OBSERVABILITY + RELIABILITY' },
    { title: 'TRACK 9 — APPLICATION + CLOUD SECURITY' },
    { title: 'TRACK 10 — AI / ML + AI SYSTEMS' },
    { title: 'TRACK 11 — PROJECTS' },
    { title: 'TRACK 12 — OPEN SOURCE + ENGINEERING EXPERIENCE' },
    { title: 'TRACK 13 — COMMUNICATION + INTERVIEW' },
    { title: 'TRACK 14 — CAREER + INTERNSHIP PREPARATION' }
  ];

  const trackRecords: Record<string, any> = {};
  for (const [i, t] of tracks.entries()) {
    trackRecords[`track_${i + 1}`] = await prisma.track.create({
      data: { title: t.title, description: 'Core curriculum track' }
    });
  }

  // 2. Create Master Roadmap
  const masterRoadmap = await prisma.roadmap.create({
    data: {
      title: 'Google SWE Preparation',
      description: 'Comprehensive roadmap to prepare for top-tier software engineering roles by June 2028.'
    }
  });

  // 3. Create Phases
  const phasesData = [
    { order: 0, title: 'PHASE 0: Setup + Learning System' },
    { order: 1, title: 'PHASE 1: C++ Fundamentals + DSA Foundation + Git' },
    { order: 2, title: 'PHASE 2: DSA Core + CS Fundamentals + TypeScript/Node fundamentals' },
    { order: 3, title: 'PHASE 3: Backend Engineering + PostgreSQL + MongoDB + Testing' },
    { order: 4, title: 'PHASE 4: Advanced DSA + Backend Production + Redis + Queues' },
    { order: 5, title: 'PHASE 5: Docker + CI/CD + Cloud + Security' },
    { order: 6, title: 'PHASE 6: Architecture + Microservices + Kafka/RabbitMQ + Kubernetes' },
    { order: 7, title: 'PHASE 7: System Design + Distributed Systems + Observability' },
    { order: 8, title: 'PHASE 8: AI/ML Mathematics + ML + Deep Learning' },
    { order: 9, title: 'PHASE 9: LLMs + RAG + Agents + AI Systems' },
    { order: 10, title: 'PHASE 10: Flagship Projects + Open Source + Production Experience' },
    { order: 11, title: 'PHASE 11: Internship + Interview + Career Execution' },
    { order: 12, title: 'PHASE 12: Final Big Tech Interview Preparation' }
  ];

  const phases = [];
  for (const p of phasesData) {
    const phase = await prisma.phase.create({
      data: {
        title: p.title,
        order: p.order,
        roadmapId: masterRoadmap.id
      }
    });
    phases.push(phase);
  }

  // 4. Create Modules & Skills (Example for Phase 1)
  const cppModule = await prisma.module.create({
    data: {
      title: 'C++ Fundamentals',
      order: 1,
      phaseId: phases[1].id
    }
  });

  const cppBasicsSkill = await prisma.skill.create({
    data: {
      title: 'Syntax & Core Concepts',
      moduleId: cppModule.id
    }
  });

  const dsaModule = await prisma.module.create({
    data: {
      title: 'DSA Foundation',
      order: 2,
      phaseId: phases[1].id
    }
  });

  const dsaBasicsSkill = await prisma.skill.create({
    data: {
      title: 'Arrays & Strings',
      moduleId: dsaModule.id
    }
  });

  // 5. Create Topics and Prerequisites
  const cppVars = await prisma.topic.create({
    data: {
      title: 'Variables & Data Types',
      description: 'Understanding primitive types in C++',
      order: 1,
      skillId: cppBasicsSkill.id,
      trackId: trackRecords['track_1'].id,
      difficulty: 'BEGINNER',
      priority: 'MUST_HAVE',
      estimatedLearnTime: 60,
      estimatedPracticeTime: 30
    }
  });

  const cppPointers = await prisma.topic.create({
    data: {
      title: 'Pointers & References',
      description: 'Memory addresses and reference semantics',
      order: 2,
      skillId: cppBasicsSkill.id,
      trackId: trackRecords['track_1'].id,
      difficulty: 'INTERMEDIATE',
      priority: 'MUST_HAVE',
      estimatedLearnTime: 90,
      estimatedPracticeTime: 60,
      prerequisites: {
        connect: [{ id: cppVars.id }]
      }
    }
  });

  const dsaArrays = await prisma.topic.create({
    data: {
      title: 'Array Traversal & Manipulation',
      description: 'Basic array algorithms',
      order: 1,
      skillId: dsaBasicsSkill.id,
      trackId: trackRecords['track_1'].id,
      difficulty: 'BEGINNER',
      priority: 'MUST_HAVE',
      estimatedLearnTime: 45,
      estimatedPracticeTime: 120,
      prerequisites: {
        connect: [{ id: cppPointers.id }] // Example cross-skill prereq
      }
    }
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
