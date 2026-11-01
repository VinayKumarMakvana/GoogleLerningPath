const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const t = await prisma.topic.findUnique({
    where: { id: '6ae6b34e7fa225987ebd1c9d' },
    include: {
      learningContents: true,
      notes: true,
      shortNotes: true,
      cheatSheets: true,
      resources: true
    }
  });

  console.log(JSON.stringify({
    id: t?.id,
    title: t?.title,
    notesCount: t?.notes?.length,
    shortNotesCount: t?.shortNotes?.length,
    cheatSheetsCount: t?.cheatSheets?.length,
    learningCount: t?.learningContents?.length,
    resourcesCount: t?.resources?.length
  }, null, 2));

  // Also check how many topics in DB are missing notes, shortNotes, cheatSheets, learningContents, or resources
  const allTopics = await prisma.topic.findMany({
    include: {
      notes: true,
      shortNotes: true,
      cheatSheets: true,
      learningContents: true,
      resources: true
    }
  });

  const missingNotes = allTopics.filter(x => x.notes.length === 0).length;
  const missingShortNotes = allTopics.filter(x => x.shortNotes.length === 0).length;
  const missingCheatSheets = allTopics.filter(x => x.cheatSheets.length === 0).length;
  const missingLearning = allTopics.filter(x => x.learningContents.length === 0).length;
  const missingResources = allTopics.filter(x => x.resources.length === 0).length;

  console.log('\n--- TOPICS CONTENT AUDIT (Total: ' + allTopics.length + ') ---');
  console.log('Missing Notes: ' + missingNotes);
  console.log('Missing Short Notes: ' + missingShortNotes);
  console.log('Missing Cheat Sheets: ' + missingCheatSheets);
  console.log('Missing Learning Content: ' + missingLearning);
  console.log('Missing Resources: ' + missingResources);

  await prisma.$disconnect();
}

check().catch(console.error);
