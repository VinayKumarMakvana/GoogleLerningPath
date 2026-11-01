const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAllTopics() {
  const topics = await prisma.topic.findMany({
    include: {
      skill: {
        include: {
          module: {
            include: {
              phase: {
                include: {
                  roadmap: true
                }
              }
            }
          }
        }
      },
      track: true,
      resources: true
    }
  });

  console.log(`Total topics in DB: ${topics.length}`);
  const topicsByRoadmap = {};
  topics.forEach(t => {
    const roadmapTitle = t.skill?.module?.phase?.roadmap?.title || 'No Roadmap';
    const phaseTitle = t.skill?.module?.phase?.title || 'No Phase';
    const key = `${roadmapTitle} -> ${phaseTitle}`;
    topicsByRoadmap[key] = (topicsByRoadmap[key] || 0) + 1;
  });

  console.log('Topics grouped by Roadmap & Phase:');
  console.log(JSON.stringify(topicsByRoadmap, null, 2));

  await prisma.$disconnect();
}

checkAllTopics().catch(console.error);
