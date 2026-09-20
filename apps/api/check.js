const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const probCount = await prisma.practiceProblem.count();
  const patternCount = await prisma.dsaPattern.count();
  console.log(`Problems: ${probCount}`);
  console.log(`Patterns: ${patternCount}`);
  
  const sample = await prisma.practiceProblem.findFirst({
    where: { slug: 'leetcode-1-two-sum' },
    include: { topics: true, patterns: true }
  });
  console.log('Sample Problem:', sample.title);
  console.log('Topics:', sample.topics.map(t => t.title));
  console.log('Patterns:', sample.patterns.map(p => p.name));
}

check().catch(console.error).finally(() => prisma.$disconnect());
