import { PrismaClient } from '@prisma/client';
import { DashboardService } from '../src/modules/dashboard/dashboard.service';
import { PlannerService } from '../src/modules/planner/planner.service';
import { CareerService } from '../src/modules/career/career.service';
import { PriorityEngineService } from '../src/modules/mentor/priority-engine.service';
import { ProgressService } from '../src/modules/progress/progress.service';

const prisma = new PrismaClient();

async function runAudit() {
  console.log('--- STARTING INTEGRATION AUDIT ---');
  let issues = 0;
  
  try {
    const user = await prisma.user.findFirst({ include: { profile: true } });
    if (!user) throw new Error('No user found to test with.');
    
    // 1. Dashboard
    console.log('\n[1] DASHBOARD AUDIT');
    const dashboardService = new DashboardService();
    const dashData = await dashboardService.getDashboard(user.id);
    if (!dashData.profile) { console.error('Dashboard missing profile'); issues++; }
    if (!dashData.todayPlan) { console.error('Dashboard missing todayPlan'); issues++; }
    if (!dashData.progress) { console.error('Dashboard missing progress'); issues++; }
    if (dashData.mentorRecommendations.length === 0) { console.warn('Dashboard missing mentorRecommendations (might be normal if none needed)'); }
    else { console.log('Dashboard OK'); }
    
    // 2. Curriculum
    console.log('\n[2] CURRICULUM AUDIT');
    const topics = await prisma.topic.findMany();
    const modules = await prisma.module.findMany({ include: { skills: { include: { topics: true } } } });
    const problems = await prisma.practiceProblem.findMany();
    
    const dsaProblems = problems.filter(p => p.problemType === 'CODING');
    console.log(`DSA Problems Count: ${dsaProblems.length} (Expected: 90)`);
    if (dsaProblems.length !== 90) { console.error(`DSA inventory is ${dsaProblems.length}, expected 90`); issues++; }
    
    // Check topics without skills
    const topicSkills = await prisma.topic.findMany({ select: { id: true, skillId: true } });
    const orphanTopics = topicSkills.filter(t => !t.skillId);
    if (orphanTopics.length > 0) { console.error(`Found ${orphanTopics.length} orphan topics.`); issues++; }
    else { console.log('Curriculum Hierarchy OK'); }
    
    // 3. Learning / Practice
    console.log('\n[3] LEARNING / PRACTICE AUDIT');
    const attempts = await prisma.practiceAttempt.findMany({ take: 1 });
    console.log(`Practice Attempts exist: ${attempts.length > 0}`);
    
    // 4. Projects / Career
    console.log('\n[4] PROJECTS / CAREER AUDIT');
    const careerService = new CareerService();
    const careerDash = await careerService.getCareerDashboard(user.id);
    if (!careerDash.careerReadiness) { console.error('Career readiness missing'); issues++; }
    else { console.log('Projects / Career OK'); }
    
    // 5. Mentor / Planner
    console.log('\n[5] MENTOR / PLANNER AUDIT');
    const plannerService = new PlannerService();
    const plan = await plannerService.getTodayPlan(user.id);
    console.log(`Today Plan generated with ${plan.tasks.length} tasks.`);
    
    console.log('\n--- AUDIT COMPLETE ---');
    console.log(`Issues found: ${issues}`);
    process.exit(issues > 0 ? 1 : 0);
  } catch (error) {
    console.error('Audit failed critically:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}
runAudit();
