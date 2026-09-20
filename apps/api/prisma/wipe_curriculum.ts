import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Wiping curriculum data...');
  
  // Due to relations, it's safer to delete bottom-up or just delete the top level if cascading is configured.
  // Assuming cascading is configured for Prisma:
  
  await prisma.resource.deleteMany({});
  await prisma.interviewQuestion.deleteMany({});
  await prisma.assessment.deleteMany({});
  
  await prisma.learningContent.deleteMany({});
  await prisma.note.deleteMany({});
  await prisma.shortNote.deleteMany({});
  await prisma.cheatSheet.deleteMany({});
  
  await prisma.topic.deleteMany({});
  await prisma.skill.deleteMany({});
  await prisma.module.deleteMany({});
  await prisma.phase.deleteMany({});
  await prisma.roadmap.deleteMany({});

  console.log('Wipe complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
