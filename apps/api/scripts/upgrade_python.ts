import { PrismaClient } from '@prisma/client';
import { py_01_fundamentals } from '../prisma/content/python/py_01_fundamentals';
import { py_02_data_model } from '../prisma/content/python/py_02_data_model';
import { py_03_functions } from '../prisma/content/python/py_03_functions';
import { py_04_oop } from '../prisma/content/python/py_04_oop';
import { py_05_exceptions } from '../prisma/content/python/py_05_exceptions';
import { py_06_typing } from '../prisma/content/python/py_06_typing';
import { py_07_testing } from '../prisma/content/python/py_07_testing';
import { py_08_async } from '../prisma/content/python/py_08_async';
import { py_09_performance } from '../prisma/content/python/py_09_performance';
import { py_10_numpy } from '../prisma/content/python/py_10_numpy';
import { py_11_pandas } from '../prisma/content/python/py_11_pandas';
import { py_12_apis } from '../prisma/content/python/py_12_apis';
import { py_13_aiml_tooling } from '../prisma/content/python/py_13_aiml_tooling';
import { py_14_interview } from '../prisma/content/python/py_14_interview';

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
  console.log('Upgrading Python for Software & AI Engineering Curriculum...');

  const pyTrack = await getOrCreateTrack(
    'Python for Software & AI Engineering',
    'Master Python from fundamentals through async concurrency, NumPy/Pandas, and production tooling — the foundation for AI/ML engineering.'
  );

  const modulesData = [
    { title: 'Python Fundamentals', order: 1, content: py_01_fundamentals },
    { title: 'Python Data Model & Language Internals', order: 2, content: py_02_data_model },
    { title: 'Functions, Iterators & Generators', order: 3, content: py_03_functions },
    { title: 'Object-Oriented & Advanced Python', order: 4, content: py_04_oop },
    { title: 'Exceptions, Files & Context Managers', order: 5, content: py_05_exceptions },
    { title: 'Type Hints & Static Typing', order: 6, content: py_06_typing },
    { title: 'Testing & Code Quality', order: 7, content: py_07_testing },
    { title: 'Async Python & Concurrency', order: 8, content: py_08_async },
    { title: 'Performance & Profiling', order: 9, content: py_09_performance },
    { title: 'NumPy & Scientific Computing', order: 10, content: py_10_numpy },
    { title: 'Pandas & Data Processing', order: 11, content: py_11_pandas },
    { title: 'Python APIs & Backend Integration', order: 12, content: py_12_apis },
    { title: 'Python for AI/ML Engineering', order: 13, content: py_13_aiml_tooling },
    { title: 'Production Python & Interview Preparation', order: 14, content: py_14_interview },
  ];

  const topicIdMap: Record<string, string> = {};

  for (const mod of modulesData) {
    let skillEntity = await prisma.skill.findFirst({ where: { title: mod.title } });

    if (!skillEntity) {
      let roadmap = await prisma.roadmap.findFirst({ where: { title: 'Python for Software & AI Engineering' } });
      if (!roadmap) roadmap = await prisma.roadmap.create({ data: { title: 'Python for Software & AI Engineering' } });

      let phase = await prisma.phase.findFirst({ where: { title: mod.title, roadmapId: roadmap.id } });
      if (!phase) phase = await prisma.phase.create({ data: { title: mod.title, order: mod.order, roadmapId: roadmap.id } });

      let moduleEntity = await prisma.module.findFirst({ where: { title: mod.title, phaseId: phase.id } });
      if (!moduleEntity) moduleEntity = await prisma.module.create({ data: { title: mod.title, order: 1, phaseId: phase.id } });

      skillEntity = await prisma.skill.create({ data: { title: mod.title, moduleId: moduleEntity.id } });
      console.log('Created Skill structure for: ' + mod.title);
    }

    const topicsData = Object.values(mod.content);

    for (let i = 0; i < topicsData.length; i++) {
      const topicData: any = topicsData[i];

      let topic = await prisma.topic.findFirst({ where: { title: topicData.title } });

      if (!topic) {
        topic = await prisma.topic.create({
          data: {
            title: topicData.title,
            description: topicData.description || 'Learn ' + topicData.title,
            difficulty: topicData.difficulty || 'INTERMEDIATE',
            estimatedLearnTime: topicData.estimatedLearnTime || 60,
            order: i + 1,
            skillId: skillEntity.id,
            trackId: pyTrack.id,
          }
        });
        console.log('Created Topic: ' + topicData.title);
      } else {
        await prisma.topic.update({
          where: { id: topic.id },
          data: { trackId: pyTrack.id, description: topicData.description || topic.description }
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
          if (!eq) await prisma.interviewQuestion.create({ data: { topicId: topic.id, question: q.question, answerHint: q.answerHint, type: q.type || 'TECHNICAL' } });
        }
      }

      if (topicData.resources && Array.isArray(topicData.resources)) {
        for (const r of topicData.resources) {
          const er = await prisma.resource.findFirst({ where: { topicId: topic.id, url: r.url } });
          if (!er) {
            await prisma.resource.create({
              data: { topicId: topic.id, title: r.title, url: r.url, type: r.type, priority: r.priority, status: r.status || 'PUBLISHED', source: r.source, description: r.description, isOfficial: r.isOfficial || false }
            });
          }
        }
      }
    }
  }

  console.log('Connecting prerequisites...');
  for (const mod of modulesData) {
    for (const topicData of Object.values(mod.content) as any[]) {
      if (topicData.prerequisites && Array.isArray(topicData.prerequisites)) {
        const topicId = topicIdMap[topicData.title];
        if (!topicId) continue;
        for (const preReqTitle of topicData.prerequisites) {
          const preReqId = topicIdMap[preReqTitle];
          if (preReqId) {
            await prisma.topic.update({ where: { id: topicId }, data: { prerequisites: { connect: { id: preReqId } } } });
          }
        }
      }
    }
  }

  console.log('Python for Software & AI Engineering Curriculum Upsert Complete!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
