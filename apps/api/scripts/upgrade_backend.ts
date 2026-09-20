import { PrismaClient } from '@prisma/client';
import { be_01_ts } from '../prisma/content/backend/be_01_ts';
import { be_02_node } from '../prisma/content/backend/be_02_node';
import { be_03_express } from '../prisma/content/backend/be_03_express';
import { be_04_rest } from '../prisma/content/backend/be_04_rest';
import { be_05_auth } from '../prisma/content/backend/be_05_auth';
import { be_06_postgres } from '../prisma/content/backend/be_06_postgres';
import { be_07_mongo } from '../prisma/content/backend/be_07_mongo';
import { be_08_redis } from '../prisma/content/backend/be_08_redis';
import { be_09_queues } from '../prisma/content/backend/be_09_queues';
import { be_10_testing } from '../prisma/content/backend/be_10_testing';
import { be_11_architecture } from '../prisma/content/backend/be_11_architecture';
import { be_12_nestjs } from '../prisma/content/backend/be_12_nestjs';

const prisma = new PrismaClient();

async function getOrCreateTrack(title: string, description: string) {
  let track = await prisma.track.findFirst({ where: { title } });
  if (!track) {
    track = await prisma.track.create({ data: { title, description } });
    console.log('Created Track: ' + title);
  }
  return track;
}

async function main() {
  console.log('Upgrading Backend Engineering Curriculum with Deep Content...');

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
    { title: 'NestJS', order: 12, content: be_12_nestjs },
  ];

  // Map to store topic title -> ID for prerequisites
  const topicIdMap: Record<string, string> = {};

  for (const mod of modulesData) {
    // We are skipping phase and module structures here because the UI relies heavily on Track filtering 
    // Wait, the UI relies on Track -> Topics or Skill -> Topics?
    // Let's ensure Skill exists for grouping.
    let skillEntity = await prisma.skill.findFirst({
      where: { title: mod.title }
    });

    if (!skillEntity) {
      // Create a dummy module/phase if needed, or just link to a generic one
      // The current schema requires Skill -> Module -> Phase -> Roadmap
      // For this upgrade script, we assume seed_backend.ts already created them, or we create them:
      let phase = await prisma.phase.findFirst({ where: { title: mod.title } });
      if (!phase) {
         let roadmap = await prisma.roadmap.findFirst({ where: { title: 'Backend Engineering' }});
         if (!roadmap) roadmap = await prisma.roadmap.create({ data: { title: 'Backend Engineering' } });
         phase = await prisma.phase.create({ data: { title: mod.title, order: mod.order, roadmapId: roadmap.id } });
      }
      let moduleEntity = await prisma.module.findFirst({ where: { title: mod.title, phaseId: phase.id } });
      if (!moduleEntity) moduleEntity = await prisma.module.create({ data: { title: mod.title, order: 1, phaseId: phase.id } });
      
      skillEntity = await prisma.skill.create({
        data: { title: mod.title, moduleId: moduleEntity.id }
      });
      console.log('Created Skill structure for: ' + mod.title);
    }

    const topicsData = Object.values(mod.content);
    
    for (let i = 0; i < topicsData.length; i++) {
      const topicData: any = topicsData[i];
      
      let topic = await prisma.topic.findFirst({
        where: { title: topicData.title }
      });

      if (!topic) {
        topic = await prisma.topic.create({
          data: {
            title: topicData.title,
            description: topicData.description || 'Learn ' + topicData.title,
            difficulty: topicData.difficulty || 'INTERMEDIATE',
            estimatedLearnTime: topicData.estimatedLearnTime || 60,
            order: i + 1,
            skillId: skillEntity.id,
            trackId: backendTrack.id,
          }
        });
        console.log('Created Topic: ' + topicData.title);
      } else {
        await prisma.topic.update({
          where: { id: topic.id },
          data: {
            trackId: backendTrack.id,
            description: topicData.description || topic.description,
            difficulty: topicData.difficulty || topic.difficulty,
            estimatedLearnTime: topicData.estimatedLearnTime || topic.estimatedLearnTime
          }
        });
        console.log('Updated Topic: ' + topicData.title);
      }
      
      topicIdMap[topicData.title] = topic.id;

      // Upsert Content
      if (topicData.learningContent) {
        const lc = await prisma.learningContent.findFirst({ where: { topicId: topic.id } });
        if (lc) await prisma.learningContent.update({ where: { id: lc.id }, data: { content: topicData.learningContent } });
        else await prisma.learningContent.create({ data: { topicId: topic.id, title: topicData.title, content: topicData.learningContent, type: 'ARTICLE', status: 'PUBLISHED' } });
      }
      
      if (topicData.fullNotes) {
        const n = await prisma.note.findFirst({ where: { topicId: topic.id } });
        if (n) await prisma.note.update({ where: { id: n.id }, data: { content: topicData.fullNotes } });
        else await prisma.note.create({ data: { topicId: topic.id, title: topicData.title, content: topicData.fullNotes, status: 'PUBLISHED' } });
      }

      if (topicData.shortNotes) {
        const sn = await prisma.shortNote.findFirst({ where: { topicId: topic.id } });
        if (sn) await prisma.shortNote.update({ where: { id: sn.id }, data: { content: topicData.shortNotes } });
        else await prisma.shortNote.create({ data: { topicId: topic.id, title: topicData.title, content: topicData.shortNotes, status: 'PUBLISHED' } });
      }

      if (topicData.cheatSheet) {
        const cs = await prisma.cheatSheet.findFirst({ where: { topicId: topic.id } });
        if (cs) await prisma.cheatSheet.update({ where: { id: cs.id }, data: { content: topicData.cheatSheet } });
        else await prisma.cheatSheet.create({ data: { topicId: topic.id, title: topicData.title, content: topicData.cheatSheet, status: 'PUBLISHED' } });
      }

      // Upsert Interview Questions
      if (topicData.interviewQuestions && Array.isArray(topicData.interviewQuestions)) {
        for (const q of topicData.interviewQuestions) {
          const eq = await prisma.interviewQuestion.findFirst({ where: { topicId: topic.id, question: q.question } });
          if (!eq) {
            await prisma.interviewQuestion.create({
              data: { topicId: topic.id, question: q.question, answerHint: q.answerHint, type: q.type || 'TECHNICAL' }
            });
          }
        }
      }

      // Upsert Resources
      if (topicData.resources && Array.isArray(topicData.resources)) {
        for (const r of topicData.resources) {
          const er = await prisma.resource.findFirst({ where: { topicId: topic.id, url: r.url } });
          if (!er) {
            await prisma.resource.create({
              data: {
                topicId: topic.id,
                title: r.title,
                url: r.url,
                type: r.type,
                priority: r.priority,
                status: r.status || 'PUBLISHED',
                source: r.source,
                description: r.description,
                isOfficial: r.isOfficial || false
              }
            });
          } else {
             await prisma.resource.update({
               where: { id: er.id },
               data: {
                 source: r.source || er.source,
                 description: r.description || er.description,
                 isOfficial: r.isOfficial !== undefined ? r.isOfficial : er.isOfficial
               }
             });
          }
        }
      }
    }
  }

  // Pass 2: Connect prerequisites
  console.log('Connecting prerequisites...');
  for (const mod of modulesData) {
    const topicsData = Object.values(mod.content);
    for (const topicData of topicsData as any[]) {
      if (topicData.prerequisites && Array.isArray(topicData.prerequisites)) {
        const topicId = topicIdMap[topicData.title];
        if (!topicId) continue;
        
        for (const preReqTitle of topicData.prerequisites) {
          const preReqId = topicIdMap[preReqTitle];
          if (preReqId) {
            await prisma.topic.update({
              where: { id: topicId },
              data: {
                prerequisites: {
                  connect: { id: preReqId }
                }
              }
            });
          }
        }
      }
    }
  }

  console.log('Backend Engineering Upsert Complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
