import { PrismaClient } from '@prisma/client';
import { EvidenceService } from '../src/modules/career/evidence.service';
import { PriorityEngineService } from '../src/modules/mentor/priority-engine.service';

const prisma = new PrismaClient();

async function run() {
  console.log('--- VERIFIABLE CAREER PORTFOLIO TEST ---');
  
  const userId = '64f8d9b2e4b01a2c3d4e5f6e'; // Unique ID for portfolio testing

  // Clean up previous
  await prisma.reviewFinding.deleteMany();
  await prisma.projectReview.deleteMany();
  await prisma.projectDefense.deleteMany();
  await prisma.projectSubmission.deleteMany();
  await prisma.userProjectState.deleteMany({ where: { userId } });
  await prisma.userPatternMastery.deleteMany({ where: { userId } });
  await prisma.progress.deleteMany({ where: { userId } });
  await prisma.careerProfile.deleteMany({ where: { userId } });
  await prisma.profile.deleteMany({ where: { userId } });
  await prisma.dailyPlanTask.deleteMany();
  await prisma.dailyPlan.deleteMany();
  await prisma.contribution.deleteMany({ where: { userId } });

  console.log('Seeding baseline verified evidence...');
  
  // Create profile & career
  await prisma.profile.create({ data: { userId, firstName: 'Test', lastName: 'User' } });
  await prisma.careerProfile.create({ data: { userId, targetRole: 'Backend Engineer' } });

  // Add 1 mastered DSA pattern
  const pattern = await prisma.dsaPattern.findFirst();
  if (pattern) {
    await prisma.userPatternMastery.create({
      data: { userId, patternId: pattern.id, state: 'MASTERED' }
    });
  }

  // Add 1 completed topic
  const topic = await prisma.topic.findFirst();
  if (topic) {
    await prisma.progress.create({
      data: { userId, entityId: topic.id, entityType: 'TOPIC', status: 'COMPLETED' }
    });
  }

  // Add 1 completed project, but MISSING GitHub link and Code Review
  const project = await prisma.project.findFirst();
  if (project) {
    const userState = await prisma.userProjectState.create({
      data: {
        userId,
        projectId: project.id,
        status: 'COMPLETED',
        // Intentional missing links!
      }
    });

    const sub = await prisma.projectSubmission.create({
      data: {
        userProjectStateId: userState.id,
        status: 'VERIFIED'
      }
    });

    // We intentionally leave out reviews and defenses
  }

  const evidenceService = new EvidenceService();
  const engine = new PriorityEngineService();

  console.log('\n--- 1. Testing Evidence Extraction ---');
  const evidence = await evidenceService.getVerifiedEvidence(userId);
  console.log(`Extracted ${evidence.length} pieces of verified evidence.`);
  
  const hasFakeDefense = evidence.some(e => e.type === 'PROJECT_DEFENSE');
  if (hasFakeDefense) {
    console.error('ERROR: Fake evidence detected! A defense was claimed without existence.');
    process.exit(1);
  }
  if (!evidence.some(e => e.type === 'DSA_MASTERY')) {
    console.error('ERROR: Failed to extract DSA mastery evidence.');
    process.exit(1);
  }

  console.log('\n--- 2. Testing Competency Mapping ---');
  const competencies = await evidenceService.getCompetencies(userId);
  console.log('Mapped Competencies: ', Object.keys(competencies));
  if (!competencies['DSA']) {
    console.error('ERROR: DSA competency bucket missing.');
    process.exit(1);
  }

  console.log('\n--- 3. Testing Portfolio Readiness ---');
  const readiness = await evidenceService.getPortfolioReadiness(userId);
  const myProj = readiness[0];
  console.log(`Project: ${myProj.title}`);
  console.log(`Missing Evidence: ${myProj.missingEvidence.join(', ')}`);
  
  if (!myProj.missingEvidence.includes('Missing GitHub Repository Link')) {
    console.error('ERROR: Missing GitHub link was not flagged.');
    process.exit(1);
  }
  if (!myProj.missingEvidence.includes('Missing Code Review Evidence')) {
    console.error('ERROR: Missing Code Review was not flagged.');
    process.exit(1);
  }
  
  console.log('\n--- 4. Testing Mentor/Planner Gap Integration ---');
  const ranked = await engine.getRankedActions(userId);
  const gapTasks = ranked.filter(t => t.type === 'CAREER_EVIDENCE' || t.type === 'CONTRIBUTION_TASK');
  
  console.log('Priority Engine flagged the following gaps:');
  for (const t of gapTasks) {
    console.log(`- ${t.title}: ${t.reason}`);
  }
  
  if (!gapTasks.some(t => t.title.includes('Missing GitHub'))) {
    console.error('ERROR: Priority Engine failed to prescribe an action for the missing GitHub link.');
    process.exit(1);
  }
  if (!gapTasks.some(t => t.title.includes('Open Source'))) {
    console.error('ERROR: Priority Engine failed to prescribe an action for missing Open Source evidence.');
    process.exit(1);
  }

  console.log('\n✅ All Verified Portfolio tests PASSED!');
  process.exit(0);
}

run().catch(console.error);
