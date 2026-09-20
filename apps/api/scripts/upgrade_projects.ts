import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const STANDARD_MILESTONES = [
  { title: 'Requirements', description: 'Define functional and non-functional requirements.' },
  { title: 'Architecture', description: 'High-level system design and component interactions.' },
  { title: 'Design', description: 'Low-level design, database schema, and API contracts.' },
  { title: 'Implementation', description: 'Core feature development and coding.' },
  { title: 'Testing', description: 'Unit, integration, and E2E testing.' },
  { title: 'Security', description: 'Authentication, authorization, and threat mitigation.' },
  { title: 'Observability', description: 'Logging, metrics, and tracing instrumentation.' },
  { title: 'Deployment', description: 'CI/CD pipelines and infrastructure provisioning.' },
  { title: 'Performance', description: 'Load testing, profiling, and optimization.' },
  { title: 'Failure & Resilience Testing', description: 'Chaos engineering and fault tolerance verification.' },
  { title: 'Documentation', description: 'Runbooks, ADRs, and README completion.' },
  { title: 'Code Review', description: 'Peer review and static analysis remediation.' },
  { title: 'Interview Defense', description: 'Final project defense and architectural justification.' }
];

// Define standard tasks to inject for each project based on milestone
function getTasksForMilestone(milestoneTitle: string, projectId: string, topicMap: Record<string, string>) {
  const getTopicIds = (titles: string[]) => titles.map(t => topicMap[t]).filter(Boolean);
  
  if (milestoneTitle === 'Requirements') {
    return [
      { title: 'Functional Requirements', description: 'List core features.', estimatedMinutes: 60, prerequisiteIds: getTopicIds(['Requirements & Estimation']) },
      { title: 'Non-Functional Requirements', description: 'Define SLA, latency, and throughput goals.', estimatedMinutes: 60, prerequisiteIds: getTopicIds(['Requirements & Estimation']) }
    ];
  }
  if (milestoneTitle === 'Architecture') {
    return [
      { title: 'System Context Diagram', description: 'Draw high-level architecture.', estimatedMinutes: 90, prerequisiteIds: getTopicIds(['System Design Fundamentals', 'Software Architecture & Design Principles']) },
      { title: 'Technology Stack Selection', description: 'Choose languages and DBs.', estimatedMinutes: 60, prerequisiteIds: [] }
    ];
  }
  if (milestoneTitle === 'Design') {
    return [
      { title: 'API Contract Design', description: 'Define REST/gRPC interfaces.', estimatedMinutes: 90, prerequisiteIds: getTopicIds(['API & Service Design']) },
      { title: 'Database Schema', description: 'Design data models.', estimatedMinutes: 90, prerequisiteIds: getTopicIds(['Databases & Data Modeling']) }
    ];
  }
  if (milestoneTitle === 'Testing') {
    return [
      { title: 'Unit Test Suite', description: 'Achieve >80% coverage.', estimatedMinutes: 180, prerequisiteIds: getTopicIds(['Advanced Testing Engineering']) },
      { title: 'Integration Tests', description: 'Test DB and external API boundaries.', estimatedMinutes: 120, prerequisiteIds: getTopicIds(['Advanced Testing Engineering']) }
    ];
  }
  if (milestoneTitle === 'Security') {
    return [
      { title: 'Implement Auth', description: 'Secure endpoints with JWT/OAuth.', estimatedMinutes: 120, prerequisiteIds: getTopicIds(['Authentication & Authorization']) },
      { title: 'Security Audit', description: 'Scan for OWASP top 10 vulnerabilities.', estimatedMinutes: 90, prerequisiteIds: getTopicIds(['Web & Application Security']) }
    ];
  }
  if (milestoneTitle === 'Observability') {
    return [
      { title: 'Structured Logging', description: 'Implement JSON structured logs.', estimatedMinutes: 60, prerequisiteIds: getTopicIds(['Structured Logging']) },
      { title: 'Distributed Tracing', description: 'Add OpenTelemetry spans.', estimatedMinutes: 120, prerequisiteIds: getTopicIds(['OpenTelemetry', 'Distributed Tracing']) }
    ];
  }
  if (milestoneTitle === 'Deployment') {
    return [
      { title: 'Dockerization', description: 'Write optimized Dockerfiles.', estimatedMinutes: 90, prerequisiteIds: getTopicIds(['Docker', 'Linux & Runtime Internals']) },
      { title: 'CI Pipeline', description: 'Setup GitHub Actions for test and build.', estimatedMinutes: 120, prerequisiteIds: getTopicIds(['CI Quality Gates & Release Engineering']) }
    ];
  }
  if (milestoneTitle === 'Performance') {
    return [
      { title: 'Load Testing', description: 'Run k6 or JMeter tests.', estimatedMinutes: 90, prerequisiteIds: getTopicIds(['Performance Engineering & Profiling', 'Performance Engineering']) },
      { title: 'Bottleneck Optimization', description: 'Profile and optimize hot paths.', estimatedMinutes: 120, prerequisiteIds: getTopicIds(['Performance Engineering']) }
    ];
  }
  if (milestoneTitle === 'Failure & Resilience Testing') {
    return [
      { title: 'Chaos Testing', description: 'Kill nodes and verify recovery.', estimatedMinutes: 120, prerequisiteIds: getTopicIds(['Reliability Engineering & Fault Tolerance']) }
    ];
  }
  if (milestoneTitle === 'Documentation') {
    return [
      { title: 'Write ADRs', description: 'Document key architecture decisions.', estimatedMinutes: 60, prerequisiteIds: getTopicIds(['Technical Documentation & Engineering Communication']) },
      { title: 'Complete README', description: 'Include setup and run instructions.', estimatedMinutes: 60, prerequisiteIds: getTopicIds(['Technical Documentation & Engineering Communication']) }
    ];
  }
  if (milestoneTitle === 'Code Review') {
    return [
      { title: 'Self-Review & Static Analysis', description: 'Run linters and resolve code smells.', estimatedMinutes: 60, prerequisiteIds: getTopicIds(['Code Quality & Static Analysis']) },
      { title: 'Peer Review', description: 'Have a mentor or peer review the code.', estimatedMinutes: 90, prerequisiteIds: getTopicIds(['Code Review & Engineering Standards']) }
    ];
  }
  if (milestoneTitle === 'Interview Defense') {
    return [
      { title: 'Architecture Presentation', description: 'Present the project design.', estimatedMinutes: 60, prerequisiteIds: getTopicIds(['Software Engineering Interview Preparation']) },
      { title: 'System Design Q&A', description: 'Answer questions about scaling.', estimatedMinutes: 60, prerequisiteIds: getTopicIds(['System Design Interview Framework']) }
    ];
  }
  return []; // Implementation is left empty because existing tasks go here
}

async function main() {
  console.log('Upgrading Projects to Production Engineering Lifecycle...');

  // 1. Fetch all curriculum topics to map IDs by title
  const topics = await prisma.topic.findMany({ select: { id: true, title: true } });
  const topicMap: Record<string, string> = {};
  for (const t of topics) {
    topicMap[t.title] = t.id;
  }
  console.log(`Loaded ${topics.length} curriculum topics for mapping.`);

  // 2. Fetch the 5 flagship projects
  const projects = await prisma.project.findMany({ where: { category: 'FLAGSHIP' } });

  for (const project of projects) {
    console.log(`\nProcessing Project: ${project.title}`);

    // Create or find the 13 standard milestones
    const milestoneEntities = [];
    for (let i = 0; i < STANDARD_MILESTONES.length; i++) {
      const sm = STANDARD_MILESTONES[i];
      let milestone = await prisma.projectMilestone.findFirst({
        where: { projectId: project.id, title: sm.title }
      });
      if (!milestone) {
        milestone = await prisma.projectMilestone.create({
          data: {
            projectId: project.id,
            title: sm.title,
            description: sm.description,
            order: i + 1
          }
        });
      } else {
        milestone = await prisma.projectMilestone.update({
          where: { id: milestone.id },
          data: { order: i + 1 }
        });
      }
      milestoneEntities.push(milestone);
    }

    const implementationMilestone = milestoneEntities.find(m => m.title === 'Implementation');

    // Find all existing tasks in this project
    const existingMilestones = await prisma.projectMilestone.findMany({
      where: { projectId: project.id },
      include: { tasks: true }
    });

    for (const em of existingMilestones) {
      const isStandard = STANDARD_MILESTONES.some(s => s.title === em.title);
      if (!isStandard && implementationMilestone) {
        // Move all tasks to Implementation milestone to preserve them
        for (const task of em.tasks) {
          await prisma.projectTask.update({
            where: { id: task.id },
            data: { milestoneId: implementationMilestone.id }
          });
          console.log(`Moved legacy task "${task.title}" to Implementation milestone.`);
        }
        // Safely delete the old milestone now that tasks are moved
        await prisma.projectMilestone.delete({ where: { id: em.id } });
        console.log(`Deleted legacy milestone: ${em.title}`);
      }
    }

    // Now populate new standard tasks for all milestones
    for (const milestone of milestoneEntities) {
      if (milestone.title === 'Implementation') continue; // Skip, it holds the legacy custom tasks

      const standardTasks = getTasksForMilestone(milestone.title, project.id, topicMap);
      for (let i = 0; i < standardTasks.length; i++) {
        const st = standardTasks[i];
        
        let existingTask = await prisma.projectTask.findFirst({
          where: { milestoneId: milestone.id, title: st.title }
        });

        if (!existingTask) {
          await prisma.projectTask.create({
            data: {
              milestoneId: milestone.id,
              title: st.title,
              description: st.description,
              estimatedMinutes: st.estimatedMinutes,
              order: i + 1,
              prerequisiteIds: st.prerequisiteIds
            }
          });
          console.log(`Created new task: ${st.title} in ${milestone.title}`);
        } else {
           await prisma.projectTask.update({
              where: { id: existingTask.id },
              data: { prerequisiteIds: st.prerequisiteIds } // Ensure prerequisites are linked
           });
        }
      }
    }
  }

  console.log('\\nProject Engineering Lifecycle Upgrade Complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
