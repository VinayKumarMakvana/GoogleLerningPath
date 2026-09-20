import { PrismaClient } from '@prisma/client';
import { ds_01_fund } from '../prisma/content/distributed_systems/ds_01_fund';
import { ds_02_time } from '../prisma/content/distributed_systems/ds_02_time';
import { ds_03_fault } from '../prisma/content/distributed_systems/ds_03_fault';
import { ds_04_repl } from '../prisma/content/distributed_systems/ds_04_repl';
import { ds_05_consensus } from '../prisma/content/distributed_systems/ds_05_consensus';
import { ds_06_partition } from '../prisma/content/distributed_systems/ds_06_partition';
import { ds_07_txn } from '../prisma/content/distributed_systems/ds_07_txn';
import { ds_08_msg } from '../prisma/content/distributed_systems/ds_08_msg';
import { ds_09_rabbitmq } from '../prisma/content/distributed_systems/ds_09_rabbitmq';
import { ds_10_kafka } from '../prisma/content/distributed_systems/ds_10_kafka';
import { ds_11_stream } from '../prisma/content/distributed_systems/ds_11_stream';
import { ds_12_patterns } from '../prisma/content/distributed_systems/ds_12_patterns';
import { ds_13_case } from '../prisma/content/distributed_systems/ds_13_case';
import { ds_14_interview } from '../prisma/content/distributed_systems/ds_14_interview';

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
  console.log('Upgrading Distributed Systems Engineering Curriculum with Deep Content...');

  const dsTrack = await getOrCreateTrack(
    'Distributed Systems Engineering',
    'Master advanced distributed architecture, consensus, replication, message brokers, and failure models.'
  );

  const modulesData = [
    { title: 'Distributed Systems Fundamentals', order: 1, content: ds_01_fund },
    { title: 'Communication, Time & Ordering', order: 2, content: ds_02_time },
    { title: 'Failure Models & Fault Tolerance', order: 3, content: ds_03_fault },
    { title: 'Replication & Consistency', order: 4, content: ds_04_repl },
    { title: 'Consensus & Coordination', order: 5, content: ds_05_consensus },
    { title: 'Partitioning & Distributed Storage', order: 6, content: ds_06_partition },
    { title: 'Distributed Transactions', order: 7, content: ds_07_txn },
    { title: 'Messaging & Event-Driven Systems', order: 8, content: ds_08_msg },
    { title: 'RabbitMQ', order: 9, content: ds_09_rabbitmq },
    { title: 'Apache Kafka', order: 10, content: ds_10_kafka },
    { title: 'Stream Processing & Backpressure', order: 11, content: ds_11_stream },
    { title: 'Distributed Architecture Patterns', order: 12, content: ds_12_patterns },
    { title: 'Distributed Systems Case Studies', order: 13, content: ds_13_case },
    { title: 'Distributed Systems Interview Preparation', order: 14, content: ds_14_interview },
  ];

  const topicIdMap: Record<string, string> = {};

  for (const mod of modulesData) {
    let skillEntity = await prisma.skill.findFirst({
      where: { title: mod.title }
    });

    if (!skillEntity) {
      let phase = await prisma.phase.findFirst({ where: { title: mod.title } });
      if (!phase) {
         let roadmap = await prisma.roadmap.findFirst({ where: { title: 'Distributed Systems Engineering' }});
         if (!roadmap) roadmap = await prisma.roadmap.create({ data: { title: 'Distributed Systems Engineering' } });
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
            difficulty: topicData.difficulty || 'EXPERT',
            estimatedLearnTime: topicData.estimatedLearnTime || 60,
            order: i + 1,
            skillId: skillEntity.id,
            trackId: dsTrack.id,
          }
        });
        console.log('Created Topic: ' + topicData.title);
      } else {
        await prisma.topic.update({
          where: { id: topic.id },
          data: {
            trackId: dsTrack.id,
            description: topicData.description || topic.description,
            difficulty: topicData.difficulty || topic.difficulty,
            estimatedLearnTime: topicData.estimatedLearnTime || topic.estimatedLearnTime
          }
        });
        console.log('Updated Topic: ' + topicData.title);
      }
      
      topicIdMap[topicData.title] = topic.id;

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

  console.log('Distributed Systems Upsert Complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
