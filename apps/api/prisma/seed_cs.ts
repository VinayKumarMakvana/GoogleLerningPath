import { PrismaClient } from '@prisma/client';
import { cs_os } from './content/cs/cs_os';
import { cs_dbms } from './content/cs/cs_dbms';
import { cs_networks } from './content/cs/cs_networks';
import { cs_swe } from './content/cs/cs_swe';

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
  console.log('Seeding Phase 9A Refactored Tracks...');

  const csTrack = await getOrCreateTrack('CS Fundamentals', 'Core concepts every software engineer must know.');
  const dbmsTrack = await getOrCreateTrack('DBMS', 'Database Management Systems and SQL.');
  const networkTrack = await getOrCreateTrack('Computer Networks', 'Networking fundamentals, OSI, and TCP/IP.');

  const modulesData = [
    { title: 'Operating Systems & Architecture', order: 1, content: cs_os, track: csTrack },
    { title: 'Databases & System Design', order: 1, content: cs_dbms, track: dbmsTrack },
    { title: 'Computer Networks', order: 1, content: cs_networks, track: networkTrack },
    { title: 'Software Engineering Principles', order: 2, content: cs_swe, track: csTrack },
  ];

  for (const mod of modulesData) {
    let phase = await prisma.phase.findFirst({
      where: { title: mod.title, roadmapId: mod.track.id }
    });

    if (!phase) {
      phase = await prisma.phase.create({
        data: {
          title: mod.title,
          order: mod.order,
          roadmapId: mod.track.id
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
          data: { trackId: mod.track.id }
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
          trackId: mod.track.id,
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

  console.log('CS Fundamentals Seeding Complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
