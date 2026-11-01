const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const allTopics = await prisma.topic.findMany({
    include: { resources: true }
  });
  console.log('Total topics in DB:', allTopics.length);
  
  let withVideo = 0;
  let withoutVideo = 0;

  for (const t of allTopics) {
    const hasVid = t.resources.some(r => r.type === 'VIDEO' || (r.url && r.url.includes('youtube')));
    if (hasVid) withVideo++;
    else withoutVideo++;
  }

  console.log(`Topics WITH Video/YouTube link: ${withVideo}`);
  console.log(`Topics WITHOUT Video link: ${withoutVideo}`);
  await prisma.$disconnect();
}

check().catch(console.error);
