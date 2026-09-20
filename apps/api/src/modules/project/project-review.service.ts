import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProjectReviewService {
  
  async submitProject(userId: string, projectId: string, payload: { githubUrl?: string, deploymentUrl?: string, architectureUrl?: string }) {
    // Ensure UserProjectState exists
    let state = await prisma.userProjectState.findUnique({
      where: { userId_projectId: { userId, projectId } }
    });
    
    if (!state) {
      state = await prisma.userProjectState.create({
        data: { userId, projectId, status: 'COMPLETED' }
      });
    }

    // Create Submission
    const submission = await prisma.projectSubmission.create({
      data: {
        userProjectStateId: state.id,
        githubUrl: payload.githubUrl,
        deploymentUrl: payload.deploymentUrl,
        architectureUrl: payload.architectureUrl,
        status: 'PENDING_REVIEW'
      }
    });

    return submission;
  }

  async createReview(submissionId: string, status: string, findingsPayload: any[]) {
    // Creates a review and attached findings
    const review = await prisma.projectReview.create({
      data: {
        submissionId,
        status,
        findings: {
          create: findingsPayload.map(f => ({
            category: f.category,
            severity: f.severity,
            explanation: f.explanation,
            affectedArea: f.affectedArea,
            recommendation: f.recommendation,
            relatedTopicId: f.relatedTopicId
          }))
        }
      },
      include: { findings: true }
    });

    // Update Submission Status
    await prisma.projectSubmission.update({
      where: { id: submissionId },
      data: { status: status === 'PASSED' ? 'VERIFIED' : 'NEEDS_REVISION' }
    });

    // Generate Custom Tasks for REVISION findings
    if (status === 'REVISION_REQUIRED' || status === 'RESUBMISSION_REQUIRED') {
      const submission = await prisma.projectSubmission.findUnique({ where: { id: submissionId }, include: { userProjectState: true } });
      const projectId = submission?.userProjectState.projectId;
      
      // Get the first milestone to attach tasks to
      const milestone = await prisma.projectMilestone.findFirst({ where: { projectId } });

      if (milestone && submission) {
        for (const finding of review.findings) {
          if (finding.severity === 'HIGH' || finding.severity === 'CRITICAL') {
            const task = await prisma.projectTask.create({
              data: {
                milestoneId: milestone.id,
                title: `Fix ${finding.category} Issue: ${finding.affectedArea || 'Global'}`,
                description: finding.recommendation,
                userId: submission.userProjectState.userId,
                order: 999
              }
            });
            await prisma.reviewFinding.update({
              where: { id: finding.id },
              data: { generatedTaskId: task.id }
            });
          }
        }
      }
    }

    return review;
  }

  async startDefense(submissionId: string, userId: string, type: string) {
    // Create an InterviewSession acting as a defense
    const session = await prisma.interviewSession.create({
      data: {
        userId,
        type: 'REAL',
        status: 'STARTED',
      }
    });

    const defense = await prisma.projectDefense.create({
      data: {
        submissionId,
        type,
        status: 'PENDING',
        interviewSessionId: session.id
      }
    });

    return defense;
  }

  async verifyDefense(defenseId: string, passed: boolean) {
    const defense = await prisma.projectDefense.update({
      where: { id: defenseId },
      data: { status: passed ? 'PASSED' : 'FAILED' },
      include: { submission: { include: { userProjectState: true } } }
    });

    if (passed) {
      // Check if all defenses for this submission are passed (mocking full verification)
      const allDefenses = await prisma.projectDefense.findMany({
        where: { submissionId: defense.submissionId }
      });

      const allPassed = allDefenses.every(d => d.status === 'PASSED');
      if (allPassed) {
        await prisma.verifiedEvidence.upsert({
          where: { submissionId: defense.submissionId },
          create: {
            submissionId: defense.submissionId,
            userId: defense.submission.userProjectState.userId,
            projectId: defense.submission.userProjectState.projectId,
            githubUrl: defense.submission.githubUrl,
            deploymentUrl: defense.submission.deploymentUrl
          },
          update: {
            githubUrl: defense.submission.githubUrl,
            deploymentUrl: defense.submission.deploymentUrl
          }
        });

        await prisma.projectSubmission.update({
          where: { id: defense.submissionId },
          data: { status: 'VERIFIED' }
        });
      }
    }

    return defense;
  }
}
