import { PrismaClient } from '@prisma/client';
import { be_01_ts } from './content/backend/be_01_ts';
import { be_02_node } from './content/backend/be_02_node';
import { be_03_express } from './content/backend/be_03_express';
import { be_04_rest } from './content/backend/be_04_rest';
import { be_05_auth } from './content/backend/be_05_auth';
import { be_06_postgres } from './content/backend/be_06_postgres';
import { be_07_mongo } from './content/backend/be_07_mongo';
import { be_08_redis } from './content/backend/be_08_redis';
import { be_09_queues } from './content/backend/be_09_queues';
import { be_10_testing } from './content/backend/be_10_testing';
import { be_11_architecture } from './content/backend/be_11_architecture';

const prisma = new PrismaClient();

async function getOrCreateTrack(title: string, description: string) {
  let track = await prisma.roadmap.findFirst({ where: { title } });
  if (!track) {
    track = await prisma.roadmap.create({ data: { title, description } });
    console.log('Created Track: ' + title);
  }
  return track;
}

async function main() {
  console.log('Seeding Backend Engineering Curriculum...');

  const backendTrack = await getOrCreateTrack(
    'Backend Engineering',
    'Master server-side development, databases, caching, and scalable architecture.'
  );

  const modulesData = [
    { title: 'TypeScript for Backend', order: 1, content: be_01_ts },
    { title: 'Node.js', order: 2, content: be_02_node },
    { title: 'Express.js', order: 3, content: be_03_express },
    { title: 'REST API Engineering', order: 4, content: be_04_rest },
    { title: 'Backend Authentication & Authorization', order: 5, content: be_05_auth },
    { title: 'PostgreSQL Backend Engineering', order: 6, content: be_06_postgres },
    { title: 'MongoDB Backend Engineering', order: 7, content: be_07_mongo },
    { title: 'Redis', order: 8, content: be_08_redis },
    { title: 'Queues & Background Jobs', order: 9, content: be_09_queues },
    { title: 'Backend Testing', order: 10, content: be_10_testing },
    { title: 'Backend Architecture', order: 11, content: be_11_architecture },
  ];

  for (const mod of modulesData) {
    let phase = await prisma.phase.findFirst({
      where: { title: mod.title, roadmapId: backendTrack.id }
    });

    if (!phase) {
      phase = await prisma.phase.create({
        data: {
          title: mod.title,
          order: mod.order,
          roadmapId: backendTrack.id
        }
      });
      console.log('Created Phase: ' + mod.title);
    }

    let moduleEntity = await prisma.module.findFirst({
      where: { title: mod.title, phaseId: phase.id }
    });

    if (!moduleEntity) {
      moduleEntity = await prisma.module.create({
        data: {
          title: mod.title,
          order: 1,
          phaseId: phase.id
        }
      });
      console.log('Created Module: ' + mod.title);
    }

    let skillEntity = await prisma.skill.findFirst({
      where: { title: mod.title, moduleId: moduleEntity.id }
    });

    if (!skillEntity) {
      skillEntity = await prisma.skill.create({
        data: {
          title: mod.title,
          moduleId: moduleEntity.id
        }
      });
      console.log('Created Skill: ' + mod.title);
    }

    const topicsData = Object.values(mod.content);
    
    for (let i = 0; i < topicsData.length; i++) {
      const topicData = topicsData[i];
      
      const existing = await prisma.topic.findFirst({
        where: { title: topicData.title, skillId: skillEntity.id }
      });

      if (existing) {
        console.log('Skipping existing topic: ' + topicData.title);
        // Ensure trackId is set if we skipped it previously
        await prisma.topic.update({
          where: { id: existing.id },
          data: { trackId: backendTrack.id }
        });
        continue;
      }

      const topic = await prisma.topic.create({
        data: {
          title: topicData.title,
          description: 'Learn the fundamentals of ' + topicData.title,
          difficulty: 'INTERMEDIATE',
          estimatedLearnTime: 60,
          order: i + 1,
          skillId: skillEntity.id,
          trackId: backendTrack.id,
          learningContents: {
            create: {
              title: topicData.title,
              content: topicData.learningContent,
              type: 'ARTICLE',
              status: 'PUBLISHED'
            }
          },
          notes: {
            create: {
              title: topicData.title,
              content: topicData.fullNotes,
              status: 'PUBLISHED'
            }
          },
          shortNotes: {
            create: {
              title: topicData.title,
              content: topicData.shortNotes,
              status: 'PUBLISHED'
            }
          },
          cheatSheets: {
            create: {
              title: topicData.title,
              content: topicData.cheatSheet,
              status: 'PUBLISHED'
            }
          }
        }
      });

      if (topicData.resources && topicData.resources.length > 0) {
        for (const res of topicData.resources) {
          await prisma.resource.create({
            data: {
              title: res.title,
              url: res.url || 'https://example.com',
              type: res.type,
              priority: res.priority,
              status: (res as any).status || 'PUBLISHED',
              topicId: topic.id
            }
          });
        }
      }

      console.log('Inserted Topic: ' + topicData.title);
    }
  }

  console.log('Backend Engineering Seeding Complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
