import { PrismaClient } from '@prisma/client';
import { aiml_01_foundations } from '../prisma/content/aiml/aiml_01_foundations';
import { aiml_02_data_prep } from '../prisma/content/aiml/aiml_02_data_prep';
import { aiml_03_supervised } from '../prisma/content/aiml/aiml_03_supervised';
import { aiml_04_unsupervised } from '../prisma/content/aiml/aiml_04_unsupervised';
import { aiml_05_evaluation } from '../prisma/content/aiml/aiml_05_evaluation';
import { aiml_06_ensemble } from '../prisma/content/aiml/aiml_06_ensemble';
import { aiml_07_pipelines } from '../prisma/content/aiml/aiml_07_pipelines';
import { aiml_08_deep_learning } from '../prisma/content/aiml/aiml_08_deep_learning';
import { aiml_09_pytorch } from '../prisma/content/aiml/aiml_09_pytorch';
import { aiml_10_computer_vision } from '../prisma/content/aiml/aiml_10_computer_vision';
import { aiml_11_nlp } from '../prisma/content/aiml/aiml_11_nlp';
import { aiml_12_transformers } from '../prisma/content/aiml/aiml_12_transformers';
import { aiml_13_llm_foundations } from '../prisma/content/aiml/aiml_13_llm_foundations';
import { aiml_14_embeddings } from '../prisma/content/aiml/aiml_14_embeddings';
import { aiml_15_rag } from '../prisma/content/aiml/aiml_15_rag';
import { aiml_16_agents } from '../prisma/content/aiml/aiml_16_agents';
import { aiml_17_finetuning } from '../prisma/content/aiml/aiml_17_finetuning';
import { aiml_18_evaluation_safety } from '../prisma/content/aiml/aiml_18_evaluation_safety';
import { aiml_19_serving } from '../prisma/content/aiml/aiml_19_serving';
import { aiml_20_interview } from '../prisma/content/aiml/aiml_20_interview';

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
  console.log('Upgrading AI/ML Engineering Curriculum...');

  const track = await getOrCreateTrack(
    'AI/ML Engineering',
    'Master machine learning from foundations through deep learning, transformers, LLMs, RAG, agents, and production model serving.'
  );

  const modulesData = [
    { title: 'Machine Learning Foundations', order: 1, content: aiml_01_foundations },
    { title: 'Data Preparation & Feature Engineering', order: 2, content: aiml_02_data_prep },
    { title: 'Supervised Learning', order: 3, content: aiml_03_supervised },
    { title: 'Unsupervised Learning', order: 4, content: aiml_04_unsupervised },
    { title: 'Model Evaluation & Experimentation', order: 5, content: aiml_05_evaluation },
    { title: 'Ensemble Methods & Advanced Classical ML', order: 6, content: aiml_06_ensemble },
    { title: 'ML Pipelines & Reproducibility', order: 7, content: aiml_07_pipelines },
    { title: 'Deep Learning Foundations', order: 8, content: aiml_08_deep_learning },
    { title: 'PyTorch', order: 9, content: aiml_09_pytorch },
    { title: 'Computer Vision', order: 10, content: aiml_10_computer_vision },
    { title: 'NLP Foundations', order: 11, content: aiml_11_nlp },
    { title: 'Transformers', order: 12, content: aiml_12_transformers },
    { title: 'Large Language Model Foundations', order: 13, content: aiml_13_llm_foundations },
    { title: 'Embeddings & Vector Databases', order: 14, content: aiml_14_embeddings },
    { title: 'RAG & Retrieval Systems', order: 15, content: aiml_15_rag },
    { title: 'AI Agents & Tool Use', order: 16, content: aiml_16_agents },
    { title: 'Fine-Tuning & Adaptation', order: 17, content: aiml_17_finetuning },
    { title: 'AI Evaluation & Safety', order: 18, content: aiml_18_evaluation_safety },
    { title: 'Model Serving & Inference Fundamentals', order: 19, content: aiml_19_serving },
    { title: 'AI/ML Engineering Interview Preparation', order: 20, content: aiml_20_interview },
  ];

  const topicIdMap: Record<string, string> = {};

  for (const mod of modulesData) {
    let skillEntity = await prisma.skill.findFirst({ where: { title: mod.title } });
    if (!skillEntity) {
      let roadmap = await prisma.roadmap.findFirst({ where: { title: 'AI/ML Engineering' } });
      if (!roadmap) roadmap = await prisma.roadmap.create({ data: { title: 'AI/ML Engineering' } });
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
          data: { title: td.title, description: td.description || td.title, difficulty: td.difficulty || 'INTERMEDIATE', estimatedLearnTime: td.estimatedLearnTime || 75, order: i + 1, skillId: skillEntity.id, trackId: track.id }
        });
        console.log('Created Topic: ' + td.title);
      } else {
        await prisma.topic.update({ where: { id: topic.id }, data: { trackId: track.id } });
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

  console.log('AI/ML Engineering Curriculum Upsert Complete!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
