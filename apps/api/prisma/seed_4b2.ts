import { PrismaClient } from '@prisma/client';
import { topic10 } from './content/topic_10';
import { topic11 } from './content/topic_11';
import { topic12 } from './content/topic_12';
import { topic13 } from './content/topic_13';
import { topic14 } from './content/topic_14';
import { topic15 } from './content/topic_15';
import { topic16 } from './content/topic_16';
import { topic17 } from './content/topic_17';
import { topic18 } from './content/topic_18';
import { topic19 } from './content/topic_19';

const prisma = new PrismaClient();

const topicsData = [topic10, topic11, topic12, topic13, topic14, topic15, topic16, topic17, topic18, topic19];

async function main() {
  console.log('Seeding Phase 4B-2 Content (C++ Memory + Core: Topics 10-19)...');

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
        // userId is explicitly omitted, utilizing the String? schema update
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

  console.log('Phase 4B-2 Seed Complete!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
