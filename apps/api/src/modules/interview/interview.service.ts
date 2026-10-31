import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class InterviewService {
  async getReadiness(userId: string) {
    const [patternMasteries, assessments, attempts, progress] = await Promise.all([
      prisma.userPatternMastery.findMany({ where: { userId }, include: { pattern: true } }),
      prisma.assessmentAttempt.findMany({ where: { userId } }),
      prisma.practiceAttempt.findMany({ 
        where: { userId, status: { in: ['SOLVED', 'FAILED'] } },
        orderBy: { updatedAt: 'desc' },
        take: 20 
      }),
      prisma.progress.findMany({ where: { userId, entityType: 'TOPIC' } })
    ]);

    // DSA Mastery
    const masteredPatterns = patternMasteries.filter(m => m.state === 'MASTERED');
    const weakPatterns = patternMasteries.filter(m => m.state === 'REVIEW');
    const totalPatterns = await prisma.dsaPattern.count();
    const dsaScore = Math.round((masteredPatterns.length / totalPatterns) * 100);

    // Problem Solving
    const recentSolved = attempts.filter(a => a.status === 'SOLVED').length;
    const recentAccuracy = attempts.length > 0 ? Math.round((recentSolved / attempts.length) * 100) : 0;
    const avgAssessment = assessments.length > 0 ? assessments.reduce((a, b) => a + (b.score || 0), 0) / assessments.length : 0;

    // Fundamentals
    const completedTopics = progress.filter(p => p.status === 'COMPLETED').length;
    const totalTopics = await prisma.topic.count();
    const csScore = Math.round((completedTopics / totalTopics) * 100);

    return {
      dsa: {
        score: dsaScore,
        strengths: masteredPatterns.length > 0 ? `${masteredPatterns.length} patterns mastered` : 'None yet',
        gaps: weakPatterns.length > 0 ? `${weakPatterns.length} patterns need review` : 'Expanding breadth',
        recommendedAction: weakPatterns.length > 0 ? 'Practice weak patterns' : 'Master new patterns'
      },
      fundamentals: {
        score: csScore,
        strengths: completedTopics > 0 ? `${completedTopics} core topics completed` : 'None yet',
        gaps: totalTopics - completedTopics > 0 ? `${totalTopics - completedTopics} topics remaining` : 'None',
        recommendedAction: 'Continue curriculum'
      },
      problemSolving: {
        score: Math.round((recentAccuracy + avgAssessment) / 2),
        strengths: `Recent accuracy: ${recentAccuracy}%`,
        gaps: avgAssessment < 70 ? 'Assessment performance needs work' : 'None',
        recommendedAction: 'Take a timed assessment'
      },
      interviewPractice: {
        score: 0, // Mock interviews not yet fully tracked with a score
        strengths: 'N/A',
        gaps: 'No mock interview history',
        recommendedAction: masteredPatterns.length > 3 ? 'Start Mock Interviews' : 'Master 3+ patterns first'
      }
    };
  }

  async getAdaptiveQueue(userId: string) {
    const queue: { title: string; reason: string; estimatedMinutes: number; priority: number; url: string; }[] = [];
    
    // 1. Check for overdue reviews (Top Priority)
    const { ProgressService } = await import('../progress/progress.service');
    const progressService = new ProgressService();
    const revisionQueue = await progressService.getRevisionQueue(userId);

    if (revisionQueue.length > 0) {
      queue.push(...revisionQueue.map(r => ({
        title: r.title,
        reason: r.reason,
        estimatedMinutes: r.estimatedMinutes,
        priority: r.priority,
        url: r.url
      })));
    }

    // 2. Mock Interview Suggestion if ready
    const readiness = await this.getReadiness(userId);
    if (readiness.dsa.score > 10 && queue.length < 3) {
      queue.push({
        title: 'Mock Interview Session',
        reason: 'You have enough mastered patterns to simulate an interview.',
        estimatedMinutes: 45,
        priority: 4,
        url: '/interview'
      });
    }

    return queue.sort((a, b) => a.priority - b.priority);
  }

  async generateMockSession(userId: string, data: { difficulty?: string, patterns?: string[] }) {
    const { difficulty, patterns } = data; 
    const problemQuery: Prisma.PracticeProblemWhereInput = { status: 'PUBLISHED' };
    
    if (difficulty) {
      problemQuery.difficulty = difficulty.toUpperCase();
    }
    if (patterns && patterns.length > 0) {
      problemQuery.patterns = { some: { slug: { in: patterns } } };
    }

    const matchingProblems = await prisma.practiceProblem.findMany({
      where: problemQuery,
      include: { patterns: true, topics: true },
      take: 20
    });

    const shuffled = matchingProblems.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);

    const session = await prisma.interviewSession.create({
      data: {
        userId,
        type: 'MOCK',
        status: 'STARTED',
        problems: selected.map(p => p.slug)
      }
    });

    return {
      sessionId: session.id,
      problems: selected
    };
  }

  async evaluateMockSession(sessionId: string, userId: string) {
    const session = await prisma.interviewSession.findUnique({
      where: { id: sessionId },
      include: { attempts: { include: { practice: { include: { patterns: true } } } } }
    });

    if (!session || session.userId !== userId) throw new Error("Session not found");
    if (session.status === 'COMPLETED') return session;

    const attempts = session.attempts;
    const attemptedCount = attempts.length;
    const solvedCount = attempts.filter(a => a.status === 'SOLVED').length;
    const accuracy = attemptedCount > 0 ? (solvedCount / attemptedCount) * 100 : 0;
    
    const hintsUsed = attempts.reduce((acc, curr) => acc + curr.hintsUsed, 0);
    const weakPatterns = new Set<string>();
    
    attempts.forEach(a => {
      if (a.status !== 'SOLVED' || a.hintsUsed > 1) {
        a.practice.patterns.forEach(p => weakPatterns.add(p.name));
      }
    });

    const strengths = solvedCount > 0 ? `Successfully solved ${solvedCount} problem(s).` : 'Keep practicing basic concepts.';
    const gaps = weakPatterns.size > 0 ? `Struggled with: ${Array.from(weakPatterns).join(', ')}.` : 'No major weaknesses detected.';
    
    const feedback = {
      accuracy,
      hintsUsed,
      strengths,
      gaps,
      weakPatterns: Array.from(weakPatterns)
    };

    const updatedSession = await prisma.interviewSession.update({
      where: { id: sessionId },
      data: {
        status: 'COMPLETED',
        score: accuracy,
        feedback: JSON.stringify(feedback)
      }
    });

    return updatedSession;
  }
}
