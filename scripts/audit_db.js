const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const models = [
    'user',
    'profile',
    'track',
    'roadmap',
    'phase',
    'module',
    'skill',
    'topic',
    'subtopic',
    'learningContent',
    'note',
    'shortNote',
    'cheatSheet',
    'resource',
    'practiceProblem',
    'dsaPattern',
    'practiceAttempt',
    'assessment',
    'assessmentProblem',
    'project',
    'projectMilestone',
    'projectTask',
    'careerProfile',
    'jobApplication',
    'contribution',
    'interviewQuestion',
    'interviewSession',
    'progress',
    'dailyPlan'
  ];

  console.log('=== EXACT PRISMA MODEL AUDIT REPORT ===');
  for (const m of models) {
    try {
      if (prisma[m]) {
        const count = await prisma[m].count();
        console.log(`${m.padEnd(22)}: ${count} documents`);
      } else {
        console.log(`${m.padEnd(22)}: [Not found on prisma]`);
      }
    } catch (err) {
      console.log(`${m.padEnd(22)}: ERROR: ${err.message}`);
    }
  }

  await prisma.$disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
