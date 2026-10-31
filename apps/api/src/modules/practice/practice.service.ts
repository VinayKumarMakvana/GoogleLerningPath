import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PracticeService {
  async getProblems(filters: { page?: number; limit?: number; difficulty?: string; platform?: string; pattern?: string; topic?: string; tag?: string }) {
    const { page = 1, limit = 20, difficulty, platform, pattern, topic, tag } = filters;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { status: 'PUBLISHED' };

    if (difficulty) where.difficulty = difficulty.toUpperCase();
    if (platform) where.platform = platform.toUpperCase();
    if (tag) where.tags = { has: tag.toLowerCase() };
    if (topic) where.topics = { some: { id: topic } };
    if (pattern) where.patterns = { some: { slug: pattern } };

    const [problems, total] = await Promise.all([
      prisma.practiceProblem.findMany({
        where,
        skip,
        take: Number(limit),
        select: {
          id: true,
          title: true,
          slug: true,
          difficulty: true,
          platform: true,
          tags: true,
          expectedTime: true,
          expectedSpace: true,
          topics: { select: { id: true, title: true } },
          patterns: { select: { id: true, name: true, slug: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.practiceProblem.count({ where }),
    ]);

    return {
      data: problems,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getProblemBySlug(slug: string) {
    const problem = await prisma.practiceProblem.findUnique({
      where: { slug },
      include: {
        topics: { select: { id: true, title: true } },
        patterns: { select: { id: true, name: true, slug: true } },
      },
    });

    if (!problem || problem.status !== 'PUBLISHED') {
      throw new Error('Problem not found');
    }
    
    // Do not leak the correctAnswer to the client side
    const { correctAnswer, ...safeProblem } = problem;
    return safeProblem as any;
  }

  async getPatterns() {
    return prisma.dsaPattern.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async createOrUpdateAttempt(data: any) {
    const { practiceProblemId, userId, status, result, language, timeSpent, hintsUsed, highestHintLevel, hintDetails, reviewState, mistakeCategories, interviewSessionId } = data;

    const problem = await prisma.practiceProblem.findUnique({ where: { id: practiceProblemId } });
    if (!problem) throw new Error("Problem not found");

    let finalStatus = status;
    let finalReviewState = reviewState;
    let finalMistakeCategories = mistakeCategories;

    // Auto-grade MCQs on submission
    if (problem.problemType === 'MCQ' && result && (status === 'SOLVED' || status === 'FAILED' || status === 'SUBMITTED')) {
      if (result === problem.correctAnswer) {
        finalStatus = 'SOLVED';
        finalReviewState = 'SOLVED_CONFIDENTLY';
      } else {
        finalStatus = 'FAILED';
        finalReviewState = 'STRUGGLED';
        finalMistakeCategories = mistakeCategories?.length ? mistakeCategories : ['Concept Gap'];
      }
    }

    // Get the LATEST attempt
    const latestAttempt = await prisma.practiceAttempt.findFirst({
      where: { practiceProblemId, userId },
      orderBy: { startedAt: 'desc' },
    });

    let attempt;

    if (latestAttempt && latestAttempt.status === 'STARTED') {
      let newHintDetails = latestAttempt.hintDetails as any[];
      if (hintDetails) {
        newHintDetails = Array.isArray(newHintDetails) ? [...newHintDetails, ...hintDetails] : [...hintDetails];
      }

      attempt = await prisma.practiceAttempt.update({
        where: { id: latestAttempt.id },
        data: {
          status: finalStatus,
          result: result || latestAttempt.result,
          language: language || latestAttempt.language,
          timeSpent: timeSpent || latestAttempt.timeSpent,
          hintsUsed: hintsUsed !== undefined ? hintsUsed : latestAttempt.hintsUsed,
          highestHintLevel: highestHintLevel !== undefined ? Math.max(highestHintLevel, latestAttempt.highestHintLevel) : latestAttempt.highestHintLevel,
          hintDetails: newHintDetails,
          reviewState: finalReviewState || latestAttempt.reviewState,
          mistakeCategories: finalMistakeCategories || latestAttempt.mistakeCategories,
          submittedAt: (finalStatus === 'SOLVED' || finalStatus === 'FAILED') && !latestAttempt.submittedAt ? new Date() : latestAttempt.submittedAt,
          interviewSessionId: interviewSessionId || latestAttempt.interviewSessionId
        },
      });
    } else {
      // Create new attempt (preserves historical attempts)
      attempt = await prisma.practiceAttempt.create({
        data: {
          practiceProblemId,
          userId,
          status: finalStatus,
          result,
          language,
          timeSpent,
          hintsUsed: hintsUsed || 0,
          highestHintLevel: highestHintLevel !== undefined ? highestHintLevel : -1,
          hintDetails: hintDetails || [],
          reviewState: finalReviewState,
          mistakeCategories: finalMistakeCategories || [],
          startedAt: new Date(),
          submittedAt: finalStatus === 'SOLVED' || finalStatus === 'FAILED' ? new Date() : null,
          interviewSessionId
        },
      });
    }

    // Process Revision & Mastery logic only if submitted
    if (finalStatus === 'SOLVED' || finalStatus === 'FAILED') {
      await this.processSpacedRepetition(userId, practiceProblemId, attempt);
      await this.processPatternMastery(userId, practiceProblemId);
    }

    // Return the attempt (and attach correctAnswer if it was submitted so UI can show explanation)
    if (finalStatus === 'SOLVED' || finalStatus === 'FAILED') {
      return { ...attempt, correctAnswer: problem.correctAnswer, explanation: problem.explanation };
    }

    return attempt;
  }

  private async processSpacedRepetition(userId: string, problemId: string, attempt: any) {
    // Determine interval logic
    const state = await prisma.userProblemState.findFirst({
      where: { userId, practiceProblemId: problemId }
    });

    let newInterval = 1; // default 1 day
    
    if ((attempt as any).status === 'SOLVED' && attempt.reviewState === 'SOLVED_CONFIDENTLY') {
      newInterval = state?.reviewInterval ? state.reviewInterval * 2 : 2;
    } else if ((attempt as any).status === 'FAILED' || attempt.reviewState === 'STRUGGLED') {
      newInterval = 1;
    } else if ((attempt as any).status === 'SOLVED' && attempt.hintsUsed > 0) {
      newInterval = Math.max(1, (state?.reviewInterval || 2) - 1);
    }

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + newInterval);

    let problemStatus = (attempt as any).status;
    if (attempt.reviewState === 'NEEDS_REVIEW' || attempt.reviewState === 'STRUGGLED' || (attempt as any).status === 'FAILED') {
      problemStatus = 'NEEDS_REVIEW';
    }

    if (state) {
      await prisma.userProblemState.update({
        where: { id: state.id },
        data: { nextReviewDate: nextReview, reviewInterval: newInterval, status: problemStatus }
      });
    } else {
      await prisma.userProblemState.create({
        data: { userId, practiceProblemId: problemId, nextReviewDate: nextReview, reviewInterval: newInterval, status: problemStatus }
      });
    }
  }

  private async processPatternMastery(userId: string, problemId: string) {
    const problem = await prisma.practiceProblem.findUnique({
      where: { id: problemId },
      include: { patterns: true }
    });
    if (!problem) return;

    for (const pattern of problem.patterns) {
      // Evaluate mastery for this pattern
      const allPatternProblems = await prisma.practiceProblem.findMany({
        where: { patterns: { some: { id: pattern.id } } }
      });
      const problemIds = allPatternProblems.map(p => p.id);

      const states = await prisma.userProblemState.findMany({
        where: { userId, practiceProblemId: { in: problemIds } }
      });

      let solved = 0;
      let needsReview = 0;

      states.forEach(s => {
        if (s.status === 'SOLVED') solved++;
        if (s.status === 'NEEDS_REVIEW' || s.status === 'FAILED') needsReview++;
      });

      let newState = 'NOT_STARTED';
      if (states.length > 0) newState = 'LEARNING';
      if (solved > 0) newState = 'PRACTICING';
      if (needsReview > 0) newState = 'REVIEW';
      
      // Threshold: Solved >= 3 (or all if < 3 total), and 0 needs review
      const requiredToMaster = Math.min(3, allPatternProblems.length);
      if (solved >= requiredToMaster && needsReview === 0) {
        newState = 'MASTERED';
      }

      // Upsert
      const mastery = await prisma.userPatternMastery.findFirst({
        where: { userId, patternId: pattern.id }
      });

      if (mastery) {
        await prisma.userPatternMastery.update({
          where: { id: mastery.id },
          data: { state: newState }
        });
      } else {
        await prisma.userPatternMastery.create({
          data: { userId, patternId: pattern.id, state: newState }
        });
      }
    }
  }

  async getUserAttempts(userId: string) {
    return prisma.practiceAttempt.findMany({
      where: { userId },
      include: {
        practice: {
          select: { id: true, title: true, slug: true, difficulty: true },
        },
      },
      orderBy: { startedAt: 'desc' },
    });
  }

  async getDashboard(userId: string) {
    const [states, patternMasteries, continueAttempt] = await Promise.all([
      prisma.userProblemState.findMany({
        where: { userId },
        include: { practiceProblem: true }
      }),
      prisma.userPatternMastery.findMany({
        where: { userId },
        include: { pattern: true }
      }),
      prisma.practiceAttempt.findFirst({
        where: { userId, status: 'STARTED' },
        include: { practice: true },
        orderBy: { updatedAt: 'desc' }
      })
    ]);

    const attemptedIds = new Set(states.map(s => s.practiceProblemId));
    
    // Revision Queue: Problems needing review today
    const now = new Date();
    const needsReview = states
      .filter(s => (s.nextReviewDate && s.nextReviewDate <= now) || s.status === 'NEEDS_REVIEW' || s.status === 'FAILED')
      .map(s => s.practiceProblem);

    // Continue Practice
    const continuePractice = continueAttempt?.practice || null;

    // Pattern Progress mapped from UserPatternMastery
    const allPatterns = await prisma.dsaPattern.findMany({ include: { problems: true } });
    
    const patternStats = allPatterns.map(p => {
      const mastery = patternMasteries.find(m => m.patternId === p.id);
      const state = mastery?.state || 'NOT_STARTED';
      const total = p.problems.length;
      
      const patternProblemIds = p.problems.map(prob => prob.id);
      const patternStates = states.filter(s => patternProblemIds.includes(s.practiceProblemId));
      
      const solved = patternStates.filter(s => s.status === 'SOLVED').length;
      const struggled = patternStates.filter(s => s.status === 'NEEDS_REVIEW' || s.status === 'FAILED').length;
      
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        total,
        solved,
        struggled,
        state,
        isWeak: state === 'REVIEW'
      };
    }).sort((a, b) => b.total - a.total);

    // Recommendation Logic
    let recommendedNext = null;
    const learningPattern = patternStats.find(p => p.state === 'LEARNING' || p.state === 'REVIEW');
    if (learningPattern) {
      const pProblems = await prisma.practiceProblem.findMany({
        where: {
          patterns: { some: { id: learningPattern.id } },
          id: { notIn: Array.from(attemptedIds) }
        },
        orderBy: { difficulty: 'asc' },
        take: 1
      });
      if (pProblems.length > 0) recommendedNext = pProblems[0];
    }

    if (!recommendedNext) {
      recommendedNext = await prisma.practiceProblem.findFirst({
        where: {
          id: { notIn: Array.from(attemptedIds) },
          status: 'PUBLISHED'
        },
        orderBy: { difficulty: 'asc' }
      });
    }

    return {
      continuePractice,
      recommendedNext,
      needsReview,
      patternStats
    };
  }
}
