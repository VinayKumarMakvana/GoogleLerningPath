import { PrismaClient } from '@prisma/client';
import { ProjectReviewService } from '../src/modules/project/project-review.service';

const prisma = new PrismaClient();
const reviewService = new ProjectReviewService();

async function main() {
  console.log('Testing Project Lifecycle...');

  // 1. Get a user
  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: { email: 'tester@test.com', password: 'hash' }
    });
  }

  // 2. Get a project
  const project = await prisma.project.findFirst({
    include: { milestones: true }
  });
  if (!project) throw new Error('No project found to test.');

  // Ensure user is enrolled
  await prisma.userProjectState.upsert({
    where: { userId_projectId: { userId: user.id, projectId: project.id } },
    update: { status: 'COMPLETED' },
    create: { userId: user.id, projectId: project.id, status: 'COMPLETED' }
  });

  // 3. Submit Project
  console.log('1. Submitting Project');
  const submission = await reviewService.submitProject(user.id, project.id, {
    githubUrl: 'https://github.com/tester/repo',
    deploymentUrl: 'https://tester-repo.vercel.app'
  });
  console.log(`Submission Created: ${submission.id} with status ${submission.status}`);

  // 4. Create Review with Findings
  console.log('2. Reviewing Project');
  const review = await reviewService.createReview(submission.id, 'REVISION_REQUIRED', [
    {
      category: 'Security',
      severity: 'CRITICAL',
      explanation: 'Exposed JWT Secret in frontend code.',
      affectedArea: 'frontend/auth.ts',
      recommendation: 'Move secrets to .env and only sign tokens on the backend.',
    }
  ]);
  console.log(`Review Created: ${review.id} with status ${review.status}`);

  // Check if a custom ProjectTask was generated for the user
  const finding = await prisma.reviewFinding.findUnique({ where: { id: review.findings[0].id } });
  if (finding?.generatedTaskId) {
    const task = await prisma.projectTask.findUnique({ where: { id: finding.generatedTaskId } });
    console.log(`Custom Revision Task generated: ${task?.title} (Assigned to: ${task?.userId})`);
  } else {
    throw new Error('Failed to generate revision task for critical finding');
  }

  // 5. Mock user fixing and resubmitting
  console.log('3. Resubmitting Project (Mocked)');
  await reviewService.createReview(submission.id, 'PASSED', []);

  // 6. Start Defense
  console.log('4. Starting Defense');
  const defense = await reviewService.startDefense(submission.id, user.id, 'Architecture');
  console.log(`Defense Created: ${defense.id} attached to session ${defense.interviewSessionId}`);

  // 7. Verify Defense
  console.log('5. Verifying Defense (PASSED)');
  await reviewService.verifyDefense(defense.id, true);

  // 8. Check for Verified Evidence
  const evidence = await prisma.verifiedEvidence.findUnique({ where: { submissionId: submission.id } });
  if (evidence) {
    console.log(`Verified Evidence Created! ID: ${evidence.id}`);
  } else {
    throw new Error('Failed to generate Verified Evidence');
  }

  console.log('Lifecycle test completed successfully.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
