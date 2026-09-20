import { PrismaClient } from '@prisma/client';
import { PriorityEngineService } from '../src/modules/mentor/priority-engine.service';
import { PlannerService } from '../src/modules/planner/planner.service';
import { MentorService } from '../src/modules/mentor/mentor.service';

const prisma = new PrismaClient();

async function run() {
  console.log('--- DETERMINISTIC PLANNER & MENTOR TEST ---');
  
  // Clean up previous test data
  await prisma.dailyPlanTask.deleteMany();
  await prisma.dailyPlan.deleteMany();
  const userId = '64f8d9b2e4b01a2c3d4e5f6a';
  
  await prisma.userProblemState.deleteMany({ where: { userId } });
  await prisma.userPatternMastery.deleteMany({ where: { userId } });
  await prisma.assessmentAttempt.deleteMany({ where: { userId } });
  await prisma.userTaskState.deleteMany({ where: { userId } });

  // Seed baseline data
  console.log('Seeding baseline deterministic data...');
  
  // Overdue revision (Priority 1)
  const p1 = await prisma.practiceProblem.findFirst();
  if (p1) {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 2);
    await prisma.userProblemState.create({
      data: {
        userId,
        practiceProblem: { connect: { id: p1.id } },
        status: 'NEEDS_REVIEW',
        nextReviewDate: pastDate
      }
    });
  }

  // Weak pattern (Priority 2)
  const pattern = await prisma.dsaPattern.findFirst();
  if (pattern) {
    await prisma.userPatternMastery.create({
      data: {
        userId,
        patternId: pattern.id,
        state: 'REVIEW'
      }
    });
  }

  // Run Priority Engine
  console.log('\n--- 1. Testing Priority Engine ---');
  const engine = new PriorityEngineService();
  const ranked = await engine.getRankedActions(userId);
  console.log(`Priority Engine generated ${ranked.length} actions.`);
  
  if (ranked.length < 2) {
    console.error('ERROR: Priority Engine failed to generate expected actions.');
    process.exit(1);
  }
  
  console.log(`[Top Priority] type=${ranked[0].type}, title=${ranked[0].title}`);
  if (ranked[0].type !== 'REVIEW_TOPIC') {
    console.error('ERROR: Overdue review was not ranked as priority 1.');
    process.exit(1);
  }
  
  console.log(`[Second Priority] type=${ranked[1].type}, title=${ranked[1].title}`);
  if (ranked[1].type !== 'PRACTICE' || !ranked[1].title.includes('Weak')) {
    console.error('ERROR: Weak pattern practice was not ranked as priority 2.');
    process.exit(1);
  }

  // Run Mentor Service
  console.log('\n--- 2. Testing Mentor Chat (Deterministic Delegation) ---');
  const mentor = new MentorService();
  const mentorRes = await mentor.chat(userId, 'what should i do');
  console.log(`Mentor Response to "what should i do":`);
  console.log(`Fact: ${mentorRes.fact}`);
  console.log(`Recommendation: ${mentorRes.recommendation}`);
  
  if (!mentorRes.fact.includes('highest priority')) {
    console.error('ERROR: Mentor did not delegate to the Priority Engine correctly.');
    process.exit(1);
  }

  // Run Planner Service
  console.log('\n--- 3. Testing Planner Service (Budget Allocation) ---');
  const planner = new PlannerService();
  const plan = await planner.generateDailyPlan(userId, 60); // 60 min budget
  
  console.log(`Generated Daily Plan with ${plan.tasks.length} tasks.`);
  let totalTime = 0;
  for (const t of plan.tasks) {
    console.log(`- [${t.priority}] ${t.title} (${t.estimatedMinutes} min): ${t.reason}`);
    totalTime += t.estimatedMinutes;
  }
  
  if (totalTime > 60) {
    console.error(`ERROR: Planner exceeded time budget. Total: ${totalTime}, Budget: 60`);
    process.exit(1);
  }
  if (plan.tasks[0].type !== 'REVIEW_TOPIC') {
    console.error(`ERROR: Planner did not strictly follow priority engine ordering.`);
    process.exit(1);
  }

  console.log('\n✅ All deterministic logic tests PASSED!');
  process.exit(0);
}

run().catch(console.error);
