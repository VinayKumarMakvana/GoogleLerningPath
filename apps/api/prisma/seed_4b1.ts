import { PrismaClient } from '@prisma/client';
import { topic1 } from './content/topic_1';
import { topic2 } from './content/topic_2';
import { topic3 } from './content/topic_3';
import { topic4 } from './content/topic_4';
import { topic5 } from './content/topic_5';
import { topic6 } from './content/topic_6';
import { topic7 } from './content/topic_7';
import { topic8 } from './content/topic_8';
import { topic9 } from './content/topic_9';
import { TopicContent } from './content/types';

const prisma = new PrismaClient();

const topicsData = [topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9];

async function main() {
  console.log('Seeding Phase 4B-1 Content (C++ Basics: Topics 1-9)...');

  for (const tData of topicsData) {
    // 1. Find the existing topic in the database by exact title
    const topic = await prisma.topic.findFirst({
      where: { title: tData.title }
    });

    if (!topic) {
      console.warn(`WARNING: Topic "${tData.title}" not found in DB. Skipping.`);
      continue;
    }

    console.log(`Processing Topic: ${topic.title} (ID: ${topic.id})`);

    // 2. Safe Wipe: Delete ONLY the content attached to THIS specific topic.
    // This allows us to re-run the script without duplicating content, while leaving all other topics alone.
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
    
    console.log(` -> Injected content for ${tData.title}`);
  }

  console.log('Phase 4B-1 Seed Complete!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
