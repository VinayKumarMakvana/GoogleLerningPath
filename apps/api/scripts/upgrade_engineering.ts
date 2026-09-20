import { PrismaClient } from '@prisma/client';
import { eng_01_arch } from '../prisma/content/engineering/eng_01_arch';
import { eng_02_oop } from '../prisma/content/engineering/eng_02_oop';
import { eng_03_clean } from '../prisma/content/engineering/eng_03_clean';
import { eng_04_testing } from '../prisma/content/engineering/eng_04_testing';
import { eng_05_quality } from '../prisma/content/engineering/eng_05_quality';
import { eng_06_review } from '../prisma/content/engineering/eng_06_review';
import { eng_07_concurrency } from '../prisma/content/engineering/eng_07_concurrency';
import { eng_08_perf } from '../prisma/content/engineering/eng_08_perf';
import { eng_09_linux } from '../prisma/content/engineering/eng_09_linux';
import { eng_10_git } from '../prisma/content/engineering/eng_10_git';
import { eng_11_release } from '../prisma/content/engineering/eng_11_release';
import { eng_12_docs } from '../prisma/content/engineering/eng_12_docs';
import { eng_13_production } from '../prisma/content/engineering/eng_13_production';
import { eng_14_interview } from '../prisma/content/engineering/eng_14_interview';

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
  console.log('Upgrading Advanced Software Engineering & Engineering Excellence Curriculum...');

  const engTrack = await getOrCreateTrack(
    'Advanced Software Engineering',
    'Master software architecture, testing, concurrency, code quality, and engineering excellence.'
  );

  const modulesData = [
    { title: 'Software Architecture & Design Principles', order: 1, content: eng_01_arch },
    { title: 'Advanced OOP & Design Patterns', order: 2, content: eng_02_oop },
    { title: 'Clean Architecture & Maintainable Systems', order: 3, content: eng_03_clean },
    { title: 'Advanced Testing Engineering', order: 4, content: eng_04_testing },
    { title: 'Code Quality & Static Analysis', order: 5, content: eng_05_quality },
    { title: 'Code Review & Engineering Standards', order: 6, content: eng_06_review },
    { title: 'Concurrency & Parallel Programming', order: 7, content: eng_07_concurrency },
    { title: 'Performance Engineering', order: 8, content: eng_08_perf },
    { title: 'Linux & Runtime Internals', order: 9, content: eng_09_linux },
    { title: 'Git & Engineering Workflow', order: 10, content: eng_10_git },
    { title: 'CI Quality Gates & Release Engineering', order: 11, content: eng_11_release },
    { title: 'Technical Documentation & Engineering Communication', order: 12, content: eng_12_docs },
    { title: 'Production Engineering Practices', order: 13, content: eng_13_production },
    { title: 'Software Engineering Interview Preparation', order: 14, content: eng_14_interview },
  ];

  const topicIdMap: Record<string, string> = {};

  for (const mod of modulesData) {
    let skillEntity = await prisma.skill.findFirst({
      where: { title: mod.title }
    });

    if (!skillEntity) {
      let phase = await prisma.phase.findFirst({ where: { title: mod.title } });
      if (!phase) {
         let roadmap = await prisma.roadmap.findFirst({ where: { title: 'Advanced Software Engineering' }});
         if (!roadmap) roadmap = await prisma.roadmap.create({ data: { title: 'Advanced Software Engineering' } });
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
            difficulty: topicData.difficulty || 'ADVANCED',
            estimatedLearnTime: topicData.estimatedLearnTime || 60,
            order: i + 1,
            skillId: skillEntity.id,
            trackId: engTrack.id,
          }
        });
        console.log('Created Topic: ' + topicData.title);
      } else {
        await prisma.topic.update({
          where: { id: topic.id },
          data: {
            trackId: engTrack.id,
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

  console.log('Advanced Software Engineering Upsert Complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
