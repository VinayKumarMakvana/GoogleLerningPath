import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProgressService {
  async getIntelligence(userId: string) {
    const [
      totalTopics,
      completedTopics,
      totalProblems,
      solvedProblems,
      assessments,
      plans,
      mastery,
      recentPractice
    ] = await Promise.all([
      prisma.topic.count(),
      prisma.progress.count({ where: { userId, entityType: 'TOPIC', status: 'COMPLETED' } }),
      prisma.practiceProblem.count(),
      prisma.userProblemState.count({ where: { userId, status: 'SOLVED' } }),
      prisma.assessmentAttempt.findMany({ where: { userId, status: { in: ['SUBMITTED', 'TIMED_OUT'] } } }),
      prisma.dailyPlan.findMany({ where: { userId } }),
      prisma.userPatternMastery.findMany({ where: { userId }, include: { pattern: true } }),
      prisma.practiceAttempt.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
        take: 10,
        include: { practice: true }
      })
    ]);

    // Assessment Stats
    const totalAssessments = assessments.length;
    const avgAssessmentScore = totalAssessments > 0 
      ? assessments.reduce((acc, a) => acc + (a.score || 0), 0) / totalAssessments 
      : 0;

    // Plan Stats
    const totalPlans = plans.length;
    const completedPlans = plans.filter(p => p.status === 'COMPLETED').length;
    const missedPlans = plans.filter(p => p.status === 'MISSED').length;

    // Pattern Mastery
    const patternStats = {
      MASTERED: 0,
      REVIEW: 0,
      PRACTICING: 0,
      LEARNING: 0,
      NOT_STARTED: 0
    };
    mastery.forEach(m => {
      patternStats[m.state as keyof typeof patternStats]++;
    });

    // Recent Accuracy (last 10 practice attempts)
    const recentAccuracy = recentPractice.length > 0
      ? (recentPractice.filter(a => a.status === 'SOLVED').length / recentPractice.length) * 100
      : 0;

    return {
      curriculum: { completedTopics, totalTopics },
      practice: { solvedProblems, totalProblems },
      assessment: { completed: totalAssessments, averageScore: avgAssessmentScore },
      studyPlans: { total: totalPlans, completed: completedPlans, missed: missedPlans },
      patternMastery: patternStats,
      recentAccuracy,
      recentActivity: recentPractice.map(a => ({
        id: a.id,
        title: a.practice.title,
        status: a.status,
        date: a.updatedAt
      }))
    };
  }

  async getRevisionQueue(userId: string) {
    const now = new Date();

    const [states, masteries] = await Promise.all([
      prisma.userProblemState.findMany({
        where: { userId },
        include: { practiceProblem: { include: { patterns: true } } }
      }),
      prisma.userPatternMastery.findMany({
        where: { userId },
        include: { pattern: true }
      })
    ]);

    const queue: any[] = [];

    // Priority 1: Overdue reviews
    states.forEach(state => {
      if (state.nextReviewDate && state.nextReviewDate <= now) {
        queue.push({
          id: `rev-${state.id}`,
          title: state.practiceProblem.title,
          reason: 'Spaced repetition interval expired. Due for review.',
          type: 'PRACTICE_PROBLEM',
          priority: 1,
          estimatedMinutes: 15,
          url: `/practice/${state.practiceProblem.slug}`
        });
      }
    });

    // Priority 2: Repeatedly failed problems (or currently NEEDS_REVIEW manually)
    states.forEach(state => {
      if (state.status === 'FAILED' || state.status === 'NEEDS_REVIEW') {
        // Avoid duplicates if already in P1
        if (!queue.find(q => q.title === state.practiceProblem.title)) {
          queue.push({
            id: `fail-${state.id}`,
            title: state.practiceProblem.title,
            reason: state.status === 'FAILED' ? 'Recent attempt failed.' : 'Manually marked for review.',
            type: 'PRACTICE_PROBLEM',
            priority: 2,
            estimatedMinutes: 20,
            url: `/practice/${state.practiceProblem.slug}`
          });
        }
      }
    });

    // Priority 3: Weak Patterns
    masteries.filter(m => m.state === 'REVIEW').forEach(m => {
      queue.push({
        id: `pat-${m.id}`,
        title: `${m.pattern.name} Pattern`,
        reason: 'High struggle rate across multiple problems in this pattern.',
        type: 'PATTERN_REVIEW',
        priority: 3,
        estimatedMinutes: 30,
        url: `/practice?pattern=${m.pattern.slug}`
      });
    });

    // Sort by priority
    queue.sort((a, b) => a.priority - b.priority);

    return queue;
  }
}
