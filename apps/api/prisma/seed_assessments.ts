import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedAssessments() {
  console.log('Starting Phase 5D Assessment Seed...');

  await prisma.assessmentResult.deleteMany({});
  await prisma.assessmentAttempt.deleteMany({});
  await prisma.assessmentProblem.deleteMany({});
  await prisma.assessment.deleteMany({});
  console.log('Cleared existing assessments.');

  const allProblems = await prisma.practiceProblem.findMany();
  if (allProblems.length === 0) {
    console.error('No practice problems found in the database. Please run Phase 5B seeds first.');
    return;
  }

  const findProblemsByKeywords = (keywords: string[], difficulty?: string, limit: number = 3) => {
    const matched = allProblems.filter(p => {
      const matchKey = keywords.some(k => p.title.toLowerCase().includes(k.toLowerCase()) || p.slug.toLowerCase().includes(k.toLowerCase()));
      const matchDiff = difficulty ? p.difficulty === difficulty : true;
      return matchKey && matchDiff;
    });
    // If not enough matched by keyword, just pad with difficulty match
    if (matched.length < limit) {
       const backups = allProblems.filter(p => !matched.find(m => m.id === p.id) && (difficulty ? p.difficulty === difficulty : true));
       matched.push(...backups.slice(0, limit - matched.length));
    }
    return matched.slice(0, limit);
  };

  const assessmentsData = [
    {
      title: 'A1 — Arrays & Hashing Fundamentals',
      description: 'Test your understanding of core Array manipulation and Hash Map/Set basics.',
      type: 'TOPIC',
      difficulty: 'EASY',
      duration: 30, // 30 minutes
      problems: findProblemsByKeywords(['duplicate', 'anagram', 'sum', 'array'], 'EASY', 3)
    },
    {
      title: 'A2 — Two Pointers & Prefix Sum',
      description: 'Evaluate your ability to solve problems using multiple pointers and running sums.',
      type: 'PATTERN',
      difficulty: 'EASY', // Progresses to medium
      duration: 45,
      problems: findProblemsByKeywords(['palindrome', 'two sum', 'sum', 'pivot'], 'EASY', 3)
    },
    {
      title: 'A3 — Binary Search & Stack',
      description: 'Assess logarithmic searching and LIFO data structures.',
      type: 'PATTERN',
      difficulty: 'MEDIUM',
      duration: 45,
      problems: findProblemsByKeywords(['search', 'parentheses', 'stack', 'binary'], 'EASY', 4) // Some might be easy
    },
    {
      title: 'A4 — Linked List Fundamentals',
      description: 'Pointer manipulation and linked list traversal evaluation.',
      type: 'TOPIC',
      difficulty: 'MEDIUM',
      duration: 45,
      problems: findProblemsByKeywords(['linked', 'list', 'reverse', 'middle'], 'EASY', 3)
    },
    {
      title: 'A5 — Trees, Graphs & Heap Foundations',
      description: 'Test your foundations in hierarchical and graph-based data structures.',
      type: 'TOPIC',
      difficulty: 'MEDIUM',
      duration: 60,
      problems: findProblemsByKeywords(['tree', 'graph', 'island', 'depth'], 'EASY', 4)
    },
    {
      title: 'A6 — Mixed DSA Interview Assessment',
      description: 'A mixed bag of patterns simulating a real coding interview.',
      type: 'INTERVIEW',
      difficulty: 'MEDIUM',
      duration: 60,
      problems: allProblems.slice(0, 4) // Just pick 4 distinct problems
    }
  ];

  for (const data of assessmentsData) {
    // Upsert assessment
    const assessment = await prisma.assessment.create({
      data: {
        title: data.title,
        description: data.description,
        type: data.type,
        difficulty: data.difficulty,
        duration: data.duration,
        status: 'PUBLISHED',
      }
    });

    // Create assessment problems
    for (let i = 0; i < data.problems.length; i++) {
      await prisma.assessmentProblem.create({
        data: {
          assessmentId: assessment.id,
          practiceProblemId: data.problems[i].id,
          order: i + 1
        }
      });
    }
    console.log(`Created Assessment: ${data.title} with ${data.problems.length} problems.`);
  }

  console.log('Assessment seeding complete.');
}

seedAssessments()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
