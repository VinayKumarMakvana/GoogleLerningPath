import { PrismaClient } from '@prisma/client';
import { topic20 } from './content/topic_20';
import { topic21 } from './content/topic_21';
import { topic22 } from './content/topic_22';
import { topic23 } from './content/topic_23';
import { topic24 } from './content/topic_24';
import { topic25 } from './content/topic_25';
import { topic26 } from './content/topic_26';
import { topic27 } from './content/topic_27';
import { topic28 } from './content/topic_28';
import { topic29 } from './content/topic_29';
import { topic30 } from './content/topic_30';
import { topic31 } from './content/topic_31';
import { topic32 } from './content/topic_32';
import { topic33 } from './content/topic_33';
import { topic34 } from './content/topic_34';
import { topic35 } from './content/topic_35';
import { topic36 } from './content/topic_36';

const prisma = new PrismaClient();

const topicsData = [
  topic20, topic21, topic22, topic23, topic24, topic25, topic26, topic27, 
  topic28, topic29, topic30, topic31, topic32, topic33, topic34, topic35, topic36
];

async function main() {
  console.log('Seeding Phase 4B-3 Content (C++ STL & Algorithms: Topics 20-36)...');

  for (const tData of topicsData) {
    // 1. Find the existing topic in the database by exact title (case-insensitive for safety)
    const topic = await prisma.topic.findFirst({
      where: { 
        title: {
          equals: tData.title,
          mode: 'insensitive' // Ensure we match "vector" even if DB says "Vector"
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

  console.log('Phase 4B-3 Seed Complete!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
