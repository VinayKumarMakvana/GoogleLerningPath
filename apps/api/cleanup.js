const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanup() {
  await prisma.practiceProblem.deleteMany({
    where: {
      slug: {
        in: ['leetcode-1-two-sum', 'leetcode-125-valid-palindrome']
      }
    }
  });
  console.log('Duplicates deleted.');
}

cleanup().catch(console.error).finally(() => prisma.$disconnect());
