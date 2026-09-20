import { PrismaClient } from '@prisma/client';
import { do_01_linux } from '../prisma/content/devops/do_01_linux';
import { do_02_git } from '../prisma/content/devops/do_02_git';
import { do_03_docker } from '../prisma/content/devops/do_03_docker';
import { do_04_compose } from '../prisma/content/devops/do_04_compose';
import { do_05_cicd } from '../prisma/content/devops/do_05_cicd';
import { do_06_aws_fund } from '../prisma/content/devops/do_06_aws_fund';
import { do_07_aws_compute } from '../prisma/content/devops/do_07_aws_compute';
import { do_08_aws_data } from '../prisma/content/devops/do_08_aws_data';
import { do_09_gcp } from '../prisma/content/devops/do_09_gcp';
import { do_10_k8s } from '../prisma/content/devops/do_10_k8s';
import { do_11_k8s_ops } from '../prisma/content/devops/do_11_k8s_ops';
import { do_12_infra } from '../prisma/content/devops/do_12_infra';

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
  console.log('Upgrading Cloud & DevOps Engineering Curriculum with Deep Content...');

  const devopsTrack = await getOrCreateTrack(
    'Cloud & DevOps Engineering',
    'Master Linux, Containers, CI/CD, AWS, GCP, Kubernetes, and Infrastructure as Code.'
  );

  const modulesData = [
    { title: 'Linux & Production Environment', order: 1, content: do_01_linux },
    { title: 'Git & GitHub Engineering Workflow', order: 2, content: do_02_git },
    { title: 'Docker', order: 3, content: do_03_docker },
    { title: 'Docker Compose', order: 4, content: do_04_compose },
    { title: 'CI/CD & GitHub Actions', order: 5, content: do_05_cicd },
    { title: 'AWS Fundamentals', order: 6, content: do_06_aws_fund },
    { title: 'AWS Compute, Storage & Networking', order: 7, content: do_07_aws_compute },
    { title: 'AWS Databases, IAM & Application Services', order: 8, content: do_08_aws_data },
    { title: 'GCP Fundamentals', order: 9, content: do_09_gcp },
    { title: 'Kubernetes', order: 10, content: do_10_k8s },
    { title: 'Kubernetes Production Operations', order: 11, content: do_11_k8s_ops },
    { title: 'Infrastructure, Deployment & Reliability', order: 12, content: do_12_infra },
  ];

  const topicIdMap: Record<string, string> = {};

  for (const mod of modulesData) {
    let skillEntity = await prisma.skill.findFirst({
      where: { title: mod.title }
    });

    if (!skillEntity) {
      let phase = await prisma.phase.findFirst({ where: { title: mod.title } });
      if (!phase) {
         let roadmap = await prisma.roadmap.findFirst({ where: { title: 'Cloud & DevOps Engineering' }});
         if (!roadmap) roadmap = await prisma.roadmap.create({ data: { title: 'Cloud & DevOps Engineering' } });
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
            trackId: devopsTrack.id,
          }
        });
        console.log('Created Topic: ' + topicData.title);
      } else {
        await prisma.topic.update({
          where: { id: topic.id },
          data: {
            trackId: devopsTrack.id,
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

  console.log('Cloud & DevOps Upsert Complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
