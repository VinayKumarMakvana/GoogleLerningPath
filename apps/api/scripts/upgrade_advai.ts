import { PrismaClient } from '@prisma/client';
import { adv_01_mlops_foundations } from '../prisma/content/advai/adv_01_mlops_foundations';
import { adv_02_data_pipelines } from '../prisma/content/advai/adv_02_data_pipelines';
import { adv_03_experiment_tracking } from '../prisma/content/advai/adv_03_experiment_tracking';
import { adv_04_ml_cicd } from '../prisma/content/advai/adv_04_ml_cicd';
import { adv_05_model_registry } from '../prisma/content/advai/adv_05_model_registry';
import { adv_06_training_infra } from '../prisma/content/advai/adv_06_training_infra';
import { adv_07_distributed_ml } from '../prisma/content/advai/adv_07_distributed_ml';
import { adv_08_gpu_cuda } from '../prisma/content/advai/adv_08_gpu_cuda';
import { adv_09_model_optimization } from '../prisma/content/advai/adv_09_model_optimization';
import { adv_10_hpc_inference } from '../prisma/content/advai/adv_10_hpc_inference';
import { adv_11_llm_inference } from '../prisma/content/advai/adv_11_llm_inference';
import { adv_12_vllm_serving } from '../prisma/content/advai/adv_12_vllm_serving';
import { adv_13_caching_routing } from '../prisma/content/advai/adv_13_caching_routing';
import { adv_14_ai_observability } from '../prisma/content/advai/adv_14_ai_observability';
import { adv_15_ml_security } from '../prisma/content/advai/adv_15_ml_security';
import { adv_16_k8s_ai } from '../prisma/content/advai/adv_16_k8s_ai';
import { adv_17_ml_platforms } from '../prisma/content/advai/adv_17_ml_platforms';
import { adv_18_feature_infra } from '../prisma/content/advai/adv_18_feature_infra';
import { adv_19_case_studies } from '../prisma/content/advai/adv_19_case_studies';
import { adv_20_interview } from '../prisma/content/advai/adv_20_interview';

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
  console.log('Upgrading Advanced AI Systems + MLOps + AI Infrastructure Curriculum...');

  const track = await getOrCreateTrack(
    'Advanced AI Systems + MLOps',
    'Master production ML lifecycle, distributed training, GPU computing, LLM inference infrastructure, and enterprise AI platform engineering.'
  );

  const modulesData = [
    { title: 'MLOps Foundations & ML Lifecycle', order: 1, content: adv_01_mlops_foundations },
    { title: 'Data & ML Pipelines', order: 2, content: adv_02_data_pipelines },
    { title: 'Experiment Tracking & Model Management', order: 3, content: adv_03_experiment_tracking },
    { title: 'ML CI/CD & Automation', order: 4, content: adv_04_ml_cicd },
    { title: 'Model Registry & Reproducibility', order: 5, content: adv_05_model_registry },
    { title: 'Training Infrastructure', order: 6, content: adv_06_training_infra },
    { title: 'Distributed ML Training', order: 7, content: adv_07_distributed_ml },
    { title: 'GPU Computing & CUDA Fundamentals', order: 8, content: adv_08_gpu_cuda },
    { title: 'Model Optimization & Quantization', order: 9, content: adv_09_model_optimization },
    { title: 'High-Performance Model Serving', order: 10, content: adv_10_hpc_inference },
    { title: 'LLM Inference Systems', order: 11, content: adv_11_llm_inference },
    { title: 'vLLM & Modern Inference Serving', order: 12, content: adv_12_vllm_serving },
    { title: 'AI Caching, Batching & Routing', order: 13, content: adv_13_caching_routing },
    { title: 'AI Observability & Evaluation in Production', order: 14, content: adv_14_ai_observability },
    { title: 'ML Security & AI Supply Chain', order: 15, content: adv_15_ml_security },
    { title: 'Kubernetes for AI Workloads', order: 16, content: adv_16_k8s_ai },
    { title: 'ML Platforms & Infrastructure Architecture', order: 17, content: adv_17_ml_platforms },
    { title: 'AI Data & Feature Infrastructure', order: 18, content: adv_18_feature_infra },
    { title: 'Production AI System Case Studies', order: 19, content: adv_19_case_studies },
    { title: 'Advanced AI Systems & MLOps Interview Preparation', order: 20, content: adv_20_interview },
  ];

  const topicIdMap: Record<string, string> = {};

  for (const mod of modulesData) {
    let skillEntity = await prisma.skill.findFirst({ where: { title: mod.title } });
    if (!skillEntity) {
      let roadmap = await prisma.roadmap.findFirst({ where: { title: 'Advanced AI Systems + MLOps' } });
      if (!roadmap) roadmap = await prisma.roadmap.create({ data: { title: 'Advanced AI Systems + MLOps' } });
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
          data: { title: td.title, description: td.description || td.title, difficulty: td.difficulty || 'ADVANCED', estimatedLearnTime: td.estimatedLearnTime || 75, order: i + 1, skillId: skillEntity.id, trackId: track.id }
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

  console.log('Advanced AI Systems + MLOps Curriculum Upsert Complete!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
