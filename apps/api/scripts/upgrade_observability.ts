import { PrismaClient } from '@prisma/client';
import { obs_01_fund } from '../prisma/content/observability/obs_01_fund';
import { obs_02_logging } from '../prisma/content/observability/obs_02_logging';
import { obs_03_metrics } from '../prisma/content/observability/obs_03_metrics';
import { obs_04_tracing } from '../prisma/content/observability/obs_04_tracing';
import { obs_05_otel } from '../prisma/content/observability/obs_05_otel';
import { obs_06_prom } from '../prisma/content/observability/obs_06_prom';
import { obs_07_grafana } from '../prisma/content/observability/obs_07_grafana';
import { obs_08_alerting } from '../prisma/content/observability/obs_08_alerting';
import { obs_09_slo } from '../prisma/content/observability/obs_09_slo';
import { obs_10_reliability } from '../prisma/content/observability/obs_10_reliability';
import { obs_11_perf } from '../prisma/content/observability/obs_11_perf';
import { obs_12_incident } from '../prisma/content/observability/obs_12_incident';
import { obs_13_capacity } from '../prisma/content/observability/obs_13_capacity';
import { obs_14_interview } from '../prisma/content/observability/obs_14_interview';

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
  console.log('Upgrading Observability & Reliability Engineering Curriculum with Deep Content...');

  const obsTrack = await getOrCreateTrack(
    'Observability & Reliability Engineering',
    'Master logs, metrics, traces, SRE practices, and incident management.'
  );

  const modulesData = [
    { title: 'Observability Fundamentals', order: 1, content: obs_01_fund },
    { title: 'Structured Logging', order: 2, content: obs_02_logging },
    { title: 'Metrics & Instrumentation', order: 3, content: obs_03_metrics },
    { title: 'Distributed Tracing', order: 4, content: obs_04_tracing },
    { title: 'OpenTelemetry', order: 5, content: obs_05_otel },
    { title: 'Prometheus', order: 6, content: obs_06_prom },
    { title: 'Grafana & Dashboards', order: 7, content: obs_07_grafana },
    { title: 'Alerting & Incident Detection', order: 8, content: obs_08_alerting },
    { title: 'SLI, SLO & SLA', order: 9, content: obs_09_slo },
    { title: 'Reliability Engineering & Fault Tolerance', order: 10, content: obs_10_reliability },
    { title: 'Performance Engineering & Profiling', order: 11, content: obs_11_perf },
    { title: 'Incident Response & Postmortems', order: 12, content: obs_12_incident },
    { title: 'Capacity Planning & Resilience', order: 13, content: obs_13_capacity },
    { title: 'Production Reliability Case Studies & Interviews', order: 14, content: obs_14_interview },
  ];

  const topicIdMap: Record<string, string> = {};

  for (const mod of modulesData) {
    let skillEntity = await prisma.skill.findFirst({
      where: { title: mod.title }
    });

    if (!skillEntity) {
      let phase = await prisma.phase.findFirst({ where: { title: mod.title } });
      if (!phase) {
         let roadmap = await prisma.roadmap.findFirst({ where: { title: 'Observability & Reliability Engineering' }});
         if (!roadmap) roadmap = await prisma.roadmap.create({ data: { title: 'Observability & Reliability Engineering' } });
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
            trackId: obsTrack.id,
          }
        });
        console.log('Created Topic: ' + topicData.title);
      } else {
        await prisma.topic.update({
          where: { id: topic.id },
          data: {
            trackId: obsTrack.id,
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

  console.log('Observability & Reliability Engineering Upsert Complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
