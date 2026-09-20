import { PrismaClient } from '@prisma/client';
import { math_01_foundations } from '../prisma/content/math/math_01_foundations';
import { math_02_linear_algebra } from '../prisma/content/math/math_02_linear_algebra';
import { math_03_vectors } from '../prisma/content/math/math_03_vectors';
import { math_04_matrices } from '../prisma/content/math/math_04_matrices';
import { math_05_eigen } from '../prisma/content/math/math_05_eigen';
import { math_06_probability } from '../prisma/content/math/math_06_probability';
import { math_07_distributions } from '../prisma/content/math/math_07_distributions';
import { math_08_bayes } from '../prisma/content/math/math_08_bayes';
import { math_09_statistics } from '../prisma/content/math/math_09_statistics';
import { math_10_calculus } from '../prisma/content/math/math_10_calculus';
import { math_11_gradients } from '../prisma/content/math/math_11_gradients';
import { math_12_optimization } from '../prisma/content/math/math_12_optimization';
import { math_13_numerical } from '../prisma/content/math/math_13_numerical';
import { math_14_information } from '../prisma/content/math/math_14_information';
import { math_15_ml_foundations } from '../prisma/content/math/math_15_ml_foundations';

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
  console.log('Upgrading Mathematics for Machine Learning Curriculum...');

  const mathTrack = await getOrCreateTrack(
    'Mathematics for Machine Learning',
    'Master the mathematical foundations — linear algebra, probability, calculus, and optimization — required to deeply understand ML algorithms.'
  );

  const modulesData = [
    { title: 'Mathematical Foundations', order: 1, content: math_01_foundations },
    { title: 'Linear Algebra Fundamentals', order: 2, content: math_02_linear_algebra },
    { title: 'Vectors & Vector Spaces', order: 3, content: math_03_vectors },
    { title: 'Matrices & Linear Transformations', order: 4, content: math_04_matrices },
    { title: 'Eigenvalues, Eigenvectors & Decompositions', order: 5, content: math_05_eigen },
    { title: 'Probability Fundamentals', order: 6, content: math_06_probability },
    { title: 'Random Variables & Distributions', order: 7, content: math_07_distributions },
    { title: 'Conditional Probability & Bayes', order: 8, content: math_08_bayes },
    { title: 'Statistics & Estimation', order: 9, content: math_09_statistics },
    { title: 'Multivariable Calculus', order: 10, content: math_10_calculus },
    { title: 'Gradients, Jacobians & Hessians', order: 11, content: math_11_gradients },
    { title: 'Optimization', order: 12, content: math_12_optimization },
    { title: 'Numerical Methods & Computational Mathematics', order: 13, content: math_13_numerical },
    { title: 'Information Theory & ML Mathematics', order: 14, content: math_14_information },
    { title: 'Mathematical Foundations for Machine Learning', order: 15, content: math_15_ml_foundations },
  ];

  const topicIdMap: Record<string, string> = {};

  for (const mod of modulesData) {
    let skillEntity = await prisma.skill.findFirst({ where: { title: mod.title } });

    if (!skillEntity) {
      let roadmap = await prisma.roadmap.findFirst({ where: { title: 'Mathematics for Machine Learning' } });
      if (!roadmap) roadmap = await prisma.roadmap.create({ data: { title: 'Mathematics for Machine Learning' } });

      let phase = await prisma.phase.findFirst({ where: { title: mod.title, roadmapId: roadmap.id } });
      if (!phase) phase = await prisma.phase.create({ data: { title: mod.title, order: mod.order, roadmapId: roadmap.id } });

      let moduleEntity = await prisma.module.findFirst({ where: { title: mod.title, phaseId: phase.id } });
      if (!moduleEntity) moduleEntity = await prisma.module.create({ data: { title: mod.title, order: 1, phaseId: phase.id } });

      skillEntity = await prisma.skill.create({ data: { title: mod.title, moduleId: moduleEntity.id } });
      console.log('Created Skill: ' + mod.title);
    }

    const topicsData = Object.values(mod.content);

    for (let i = 0; i < topicsData.length; i++) {
      const td: any = topicsData[i];
      let topic = await prisma.topic.findFirst({ where: { title: td.title } });

      if (!topic) {
        topic = await prisma.topic.create({
          data: {
            title: td.title,
            description: td.description || td.title,
            difficulty: td.difficulty || 'INTERMEDIATE',
            estimatedLearnTime: td.estimatedLearnTime || 75,
            order: i + 1,
            skillId: skillEntity.id,
            trackId: mathTrack.id,
          }
        });
        console.log('Created Topic: ' + td.title);
      } else {
        await prisma.topic.update({ where: { id: topic.id }, data: { trackId: mathTrack.id } });
      }

      topicIdMap[td.title] = topic.id;

      if (td.learningContent) {
        const lc = await prisma.learningContent.findFirst({ where: { topicId: topic.id } });
        if (lc) await prisma.learningContent.update({ where: { id: lc.id }, data: { content: td.learningContent } });
        else await prisma.learningContent.create({ data: { topicId: topic.id, title: td.title, content: td.learningContent, type: 'ARTICLE', status: 'PUBLISHED' } });
      }
      if (td.fullNotes) {
        const n = await prisma.note.findFirst({ where: { topicId: topic.id } });
        if (n) await prisma.note.update({ where: { id: n.id }, data: { content: td.fullNotes } });
        else await prisma.note.create({ data: { topicId: topic.id, title: td.title, content: td.fullNotes, status: 'PUBLISHED' } });
      }
      if (td.shortNotes) {
        const sn = await prisma.shortNote.findFirst({ where: { topicId: topic.id } });
        if (sn) await prisma.shortNote.update({ where: { id: sn.id }, data: { content: td.shortNotes } });
        else await prisma.shortNote.create({ data: { topicId: topic.id, title: td.title, content: td.shortNotes, status: 'PUBLISHED' } });
      }
      if (td.cheatSheet) {
        const cs = await prisma.cheatSheet.findFirst({ where: { topicId: topic.id } });
        if (cs) await prisma.cheatSheet.update({ where: { id: cs.id }, data: { content: td.cheatSheet } });
        else await prisma.cheatSheet.create({ data: { topicId: topic.id, title: td.title, content: td.cheatSheet, status: 'PUBLISHED' } });
      }
      if (td.interviewQuestions) {
        for (const q of td.interviewQuestions) {
          const eq = await prisma.interviewQuestion.findFirst({ where: { topicId: topic.id, question: q.question } });
          if (!eq) await prisma.interviewQuestion.create({ data: { topicId: topic.id, question: q.question, answerHint: q.answerHint, type: q.type || 'TECHNICAL' } });
        }
      }
      if (td.resources) {
        for (const r of td.resources) {
          const er = await prisma.resource.findFirst({ where: { topicId: topic.id, url: r.url } });
          if (!er) await prisma.resource.create({ data: { topicId: topic.id, title: r.title, url: r.url, type: r.type, priority: r.priority, status: 'PUBLISHED', source: r.source, description: r.description, isOfficial: r.isOfficial || false } });
        }
      }
    }
  }

  console.log('Connecting prerequisites...');
  for (const mod of modulesData) {
    for (const td of Object.values(mod.content) as any[]) {
      if (td.prerequisites?.length) {
        const topicId = topicIdMap[td.title];
        if (!topicId) continue;
        for (const pre of td.prerequisites) {
          const preId = topicIdMap[pre];
          if (preId) await prisma.topic.update({ where: { id: topicId }, data: { prerequisites: { connect: { id: preId } } } });
        }
      }
    }
  }

  console.log('Mathematics for Machine Learning Curriculum Upsert Complete!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
