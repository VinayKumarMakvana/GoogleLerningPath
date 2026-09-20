import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const cppFoundation = [
  'Program structure', 'Variables', 'Data types', 'Operators', 'Input/output',
  'Conditions', 'Loops', 'Functions', 'Scope', 'Arrays', 'Strings', 'References',
  'Pointers', 'Structs', 'Classes', 'Constructors', 'Destructors', 'Basic OOP',
  'Memory fundamentals'
];

const cppEngineering = [
  'vector', 'string', 'array', 'deque', 'list', 'stack', 'queue', 'priority_queue',
  'set', 'multiset', 'map', 'unordered_map', 'unordered_set', 'iterators',
  'algorithms', 'lambdas', 'complexity fundamentals'
];

const dsaFoundation = [
  'Time complexity', 'Space complexity', 'Array traversal', 'Array manipulation',
  'String manipulation', 'Basic hashing', 'Sorting fundamentals', 'Two pointers introduction',
  'Sliding window introduction', 'Prefix sum introduction', 'Binary search introduction',
  'Linked list fundamentals', 'Stack fundamentals', 'Queue fundamentals'
];

async function main() {
  console.log('Seeding Database...');

  // Check if data already exists to prevent accidental seed regeneration
  const existingRoadmap = await prisma.roadmap.findFirst({ where: { title: 'Google SWE Preparation' } });
  if (existingRoadmap) {
    console.log('Database already seeded. Skipping to prevent destructive regeneration.');
    return;
  }

  // Tracks
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

  // Master Roadmap
  const masterRoadmap = await prisma.roadmap.create({
    data: {
      title: 'Google SWE Preparation',
      description: 'Comprehensive roadmap to prepare for top-tier software engineering roles by June 2028.'
    }
  });

  // Phases
  const phase1 = await prisma.phase.create({
    data: {
      title: 'PHASE 1: C++ Fundamentals + DSA Foundation',
      order: 1,
      roadmapId: masterRoadmap.id
    }
  });

  // Modules
  const cppModule = await prisma.module.create({
    data: { title: 'C++ Fundamentals', order: 1, phaseId: phase1.id }
  });
  const dsaModule = await prisma.module.create({
    data: { title: 'DSA Foundation', order: 2, phaseId: phase1.id }
  });

  // Skills
  const cppSkill = await prisma.skill.create({
    data: { title: 'Core C++', moduleId: cppModule.id }
  });
  const dsaSkill = await prisma.skill.create({
    data: { title: 'Core DSA', moduleId: dsaModule.id }
  });

  const allTopics = [
    ...cppFoundation.map(t => ({ title: t, skillId: cppSkill.id, trackId: trackRecords['track_1'].id })),
    ...cppEngineering.map(t => ({ title: t, skillId: cppSkill.id, trackId: trackRecords['track_1'].id })),
    ...dsaFoundation.map(t => ({ title: t, skillId: dsaSkill.id, trackId: trackRecords['track_1'].id }))
  ];

  let order = 1;
  for (const tData of allTopics) {
    const topic = await prisma.topic.create({
      data: {
        title: tData.title,
        order: order++,
        skillId: tData.skillId,
        trackId: tData.trackId,
        difficulty: 'BEGINNER',
        priority: 'MUST_HAVE'
      }
    });

    // Populate Proof-of-concept Deep Content
    if (tData.title === 'Pointers') {
      await prisma.learningContent.create({
        data: {
          topicId: topic.id,
          title: 'Understanding Pointers in C++',
          type: 'ARTICLE',
          content: `# What is a Pointer?\nA pointer is a variable that stores the memory address of another variable.\n\n## Why does it matter?\nPointers are critical in C++ for dynamic memory allocation, efficient array manipulation, and building complex data structures like trees and graphs.\n\n## Core Concept\nWhen you declare a variable \`int x = 10;\`, it's stored in memory. A pointer \`int* ptr = &x;\` holds that exact memory address.\n\n## Example\n\`\`\`cpp\nint x = 10;\nint* ptr = &x; // ptr holds address of x\ncout << *ptr; // Dereferencing: outputs 10\n\`\`\`\n\n## Common Mistakes\n* **Dangling Pointers**: Pointing to memory that has been deallocated.\n* **Uninitialized Pointers**: Dereferencing a pointer that hasn't been assigned an address (causes segfaults).`
        }
      });
      await prisma.shortNote.create({
        data: {
          topicId: topic.id,
          title: 'Pointers Quick Review',
          content: `* **Definition**: Stores a memory address.\n* **Syntax**: \`int* p = &x;\`\n* **Dereference**: \`*p\` gets the value at the address.\n* **Memory Leak**: Forgetting to \`delete\` dynamically allocated memory.`
        }
      });
      await prisma.cheatSheet.create({
        data: {
          topicId: topic.id,
          title: 'Pointers Cheat Sheet',
          content: `| Operation | Syntax | Description |\n|---|---|---|\n| Address-of | \`&x\` | Gets memory address |\n| Dereference | \`*p\` | Gets value at address |\n| Null Pointer | \`nullptr\` | Safe empty pointer |`
        }
      });
      await prisma.resource.create({
        data: {
          topicId: topic.id,
          title: 'C++ Pointers Documentation',
          url: 'https://en.cppreference.com/w/cpp/language/pointer',
          type: 'ARTICLE',
          priority: 'S',
          status: 'PUBLISHED'
        }
      });
    } else {
      await prisma.shortNote.create({
        data: {
          topicId: topic.id,
          title: `${tData.title} Notes`,
          content: 'Content pending curation.',
          status: 'DRAFT'
        }
      });
      await prisma.resource.create({
        data: {
          topicId: topic.id,
          title: 'Pending Official Resource',
          type: 'ARTICLE',
          priority: 'A',
          status: 'PENDING'
        }
      });
    }
  }

  console.log('Database seeded successfully with 50 Foundation topics and Content Skeletons!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
