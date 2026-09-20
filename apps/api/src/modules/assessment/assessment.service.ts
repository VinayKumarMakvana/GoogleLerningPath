import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AssessmentService {
  
  async getAssessments() {
    return prisma.assessment.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        _count: {
          select: { problems: true }
        }
      },
      orderBy: { createdAt: 'asc' }
    });
  }

  async getAssessment(id: string) {
    const assessment = await prisma.assessment.findUnique({
      where: { id },
      include: {
        problems: {
          orderBy: { order: 'asc' },
          include: {
            practiceProblem: {
              select: {
                id: true,
                title: true,
                difficulty: true,
                slug: true,
                expectedTime: true,
                expectedSpace: true,
                statement: true,
                hints: true, // Need hints so they can use them during assessment
                patterns: { select: { id: true, name: true } }
              }
            }
          }
        }
      }
    });

    if (!assessment) throw new Error('Assessment not found');
    return assessment;
  }

  async startAttempt(assessmentId: string, userId: string) {
    const attempt = await prisma.assessmentAttempt.findFirst({
      where: { assessmentId, userId, status: 'IN_PROGRESS' },
      include: { results: true }
    });

    if (attempt) {
      // Check timeout
      const assessment = await prisma.assessment.findUnique({ where: { id: assessmentId } });
      if (assessment) {
        const elapsedMinutes = (new Date().getTime() - attempt.startedAt.getTime()) / 60000;
        if (elapsedMinutes >= assessment.duration) {
          return this.submitAttempt(attempt.id, userId);
        }
      }
      return attempt;
    }

    return prisma.assessmentAttempt.create({
      data: {
        assessmentId,
        userId,
        status: 'IN_PROGRESS',
        startedAt: new Date()
      },
      include: { results: true }
    });
  }

  async getAttempt(attemptId: string, userId: string) {
    const attempt = await prisma.assessmentAttempt.findUnique({
      where: { id: attemptId },
      include: { results: true, assessment: true }
    });

    if (!attempt || attempt.userId !== userId) {
      throw new Error('Attempt not found or unauthorized');
    }

    // Check timeout
    if (attempt.status === 'IN_PROGRESS') {
      const elapsedMinutes = (new Date().getTime() - attempt.startedAt.getTime()) / 60000;
      if (elapsedMinutes >= attempt.assessment.duration) {
        return this.submitAttempt(attempt.id, userId);
      }
    }

    return attempt;
  }

  async recordProblemResult(attemptId: string, userId: string, problemId: string, status: string, hintsUsed: number, timeSpent: number) {
    const attempt = await prisma.assessmentAttempt.findUnique({
      where: { id: attemptId },
      include: { assessment: true }
    });

    if (!attempt || attempt.userId !== userId) throw new Error('Attempt not found or unauthorized');
    if (attempt.status !== 'IN_PROGRESS') throw new Error('Cannot modify a submitted or timed out attempt');

    const existingResult = await prisma.assessmentResult.findFirst({
      where: { attemptId, practiceProblemId: problemId }
    });

    if (existingResult) {
      return prisma.assessmentResult.update({
        where: { id: existingResult.id },
        data: { status, hintsUsed, timeSpent }
      });
    }

    return prisma.assessmentResult.create({
      data: {
        attemptId,
        practiceProblemId: problemId,
        status,
        hintsUsed,
        timeSpent
      }
    });
  }

  async submitAttempt(attemptId: string, userId: string) {
    const attempt = await prisma.assessmentAttempt.findUnique({
      where: { id: attemptId },
      include: { 
        results: true,
        assessment: {
          include: {
            problems: true
          }
        }
      }
    });

    if (!attempt || attempt.userId !== userId) throw new Error('Attempt not found or unauthorized');
    if (attempt.status !== 'IN_PROGRESS') return attempt;

    const assessment = attempt.assessment;
    const now = new Date();
    const elapsedSeconds = Math.floor((now.getTime() - attempt.startedAt.getTime()) / 1000);
    const durationSeconds = assessment.duration * 60;
    
    let finalStatus = 'SUBMITTED';
    if (elapsedSeconds > durationSeconds + 10) { // 10s grace period
      finalStatus = 'TIMED_OUT';
    }

    let problemsSolved = 0;
    const problemsAttempted = attempt.results.length;

    attempt.results.forEach(result => {
      if (result.status === 'SOLVED') {
        problemsSolved++;
      }
    });

    const score = problemsAttempted > 0 ? (problemsSolved / assessment.problems.length) * 100 : 0;

    const updatedAttempt = await prisma.assessmentAttempt.update({
      where: { id: attemptId },
      data: {
        status: finalStatus,
        submittedAt: now,
        score: score,
        timeUsed: Math.min(elapsedSeconds, durationSeconds)
      },
      include: { results: true, assessment: true }
    });

    // Fire Weakness/Review engine sync in background (fire-and-forget for now, or synchronous)
    await this.syncWithReviewEngine(updatedAttempt);

    return updatedAttempt;
  }

  private async syncWithReviewEngine(attempt: any) {
    // For every failed/struggled problem in the assessment, add it to PracticeAttempt with NEEDS_REVIEW
    for (const result of attempt.results) {
      if (result.status === 'FAILED' || result.status === 'SKIPPED') {
        // Upsert into PracticeAttempt
        const existingPractice = await prisma.practiceAttempt.findFirst({
          where: { userId: attempt.userId, practiceProblemId: result.practiceProblemId }
        });

        if (existingPractice) {
          await prisma.practiceAttempt.update({
            where: { id: existingPractice.id },
            data: { 
              reviewState: 'NEEDS_REVIEW',
              updatedAt: new Date()
            }
          });
        } else {
          await prisma.practiceAttempt.create({
            data: {
              userId: attempt.userId,
              practiceProblemId: result.practiceProblemId,
              status: 'FAILED',
              reviewState: 'NEEDS_REVIEW'
            }
          });
        }
      }
    }
  }

  async getUserHistory(userId: string) {
    return prisma.assessmentAttempt.findMany({
      where: { userId },
      include: {
        assessment: {
          select: { title: true, difficulty: true, type: true, duration: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
