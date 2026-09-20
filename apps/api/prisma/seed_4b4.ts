import { PrismaClient } from '@prisma/client';
import { topic37 } from './content/topic_37';
import { topic38 } from './content/topic_38';
import { topic39 } from './content/topic_39';
import { topic40 } from './content/topic_40';
import { topic41 } from './content/topic_41';
import { topic42 } from './content/topic_42';
import { topic43 } from './content/topic_43';
import { topic44 } from './content/topic_44';
import { topic45 } from './content/topic_45';
import { topic46 } from './content/topic_46';
import { topic47 } from './content/topic_47';
import { topic48 } from './content/topic_48';
import { topic49 } from './content/topic_49';
import { topic50 } from './content/topic_50';

const prisma = new PrismaClient();

const topicsData = [
  topic37, topic38, topic39, topic40, topic41, topic42, topic43,
  topic44, topic45, topic46, topic47, topic48, topic49, topic50
];

async function main() {
  console.log('Seeding Phase 4B-4 Content (DSA Foundation: Topics 37-50)...');

  for (const tData of topicsData) {
    // 1. Find the existing topic in the database by exact title (case-insensitive for safety)
    const topic = await prisma.topic.findFirst({
      where: { 
        title: {
          equals: tData.title,
          mode: 'insensitive'
        }
      }
    });

    if (!topic) {
      console.warn(`WARNING: Topic "${tData.title}" not found in DB. Skipping.`);
      continue;
    }

    console.log(`Processing Topic: ${topic.title} (ID: ${topic.id})`);

    // 2. Safe Wipe: Delete ONLY the content attached to THIS specific topic.
    await prisma.learningContent.deleteMany({ where: { topicId: topic.id } });
    await prisma.note.deleteMany({ where: { topicId: topic.id } });
    await prisma.shortNote.deleteMany({ where: { topicId: topic.id } });
    await prisma.cheatSheet.deleteMany({ where: { topicId: topic.id } });
    await prisma.resource.deleteMany({ where: { topicId: topic.id } });

    // 3. Insert fresh high-quality content
    
    // Learn Tab
    await prisma.learningContent.create({
      data: {
        topicId: topic.id,
        title: `${tData.title} - Learn`,
        content: tData.learningContent,
        status: 'PUBLISHED',
        type: 'ARTICLE'
      }
    });

    // Notes Tab (Full Notes)
    await prisma.note.create({
      data: {
        topicId: topic.id,
        title: `${tData.title} Reference`,
        content: tData.fullNotes,
        status: 'PUBLISHED'
      }
    });

    // Short Notes Tab
    await prisma.shortNote.create({
      data: {
        topicId: topic.id,
        title: `${tData.title} Quick Review`,
        content: tData.shortNotes,
        status: 'PUBLISHED'
      }
    });

    // Cheat Sheet Tab
    await prisma.cheatSheet.create({
      data: {
        topicId: topic.id,
        title: `${tData.title} Cheat Sheet`,
        content: tData.cheatSheet,
        status: 'PUBLISHED'
      }
    });

    // Resources Tab
    if (tData.resources) {
        for (const res of tData.resources) {
        await prisma.resource.create({
            data: {
            topicId: topic.id,
            title: res.title,
            url: res.url,
            type: res.type,
            priority: res.priority,
            status: 'PUBLISHED'
            }
        });
        }
    }
    
    console.log(` -> Injected content for ${tData.title}`);
  }

  console.log('Phase 4B-4 Seed Complete!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
