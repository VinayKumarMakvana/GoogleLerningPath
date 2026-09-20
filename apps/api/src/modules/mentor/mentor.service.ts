import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface MentorContext {
  currentFocus: { topicsInProgress: number };
  weakAreas: { patterns: string[] };
  reviewQueue: { count: number };
  mastery: { patternsMastered: number, totalPracticed: number };
  assessments: { completed: number };
  recentActivity: number;
}

export class MentorService {
  async getContext(userId: string): Promise<MentorContext> {
    const [states, patternMasteries, assessments, attempts, topicProgress] = await Promise.all([
      prisma.userProblemState.findMany({
        where: { userId },
        include: { practiceProblem: { include: { patterns: true } } }
      }),
      prisma.userPatternMastery.findMany({
        where: { userId },
        include: { pattern: true }
      }),
      prisma.assessmentAttempt.findMany({ where: { userId } }),
      prisma.practiceAttempt.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
        take: 10
      }),
      prisma.progress.findMany({
        where: { userId, entityType: 'TOPIC' }
      })
    ]);

    const now = new Date();
    const reviewQueueCount = states.filter(s => 
      (s.nextReviewDate && s.nextReviewDate <= now) || s.status === 'NEEDS_REVIEW' || s.status === 'FAILED'
    ).length;

    const weakPatterns = patternMasteries
      .filter(m => m.state === 'REVIEW')
      .map(m => m.pattern.name);

    const patternsMastered = patternMasteries.filter(m => m.state === 'MASTERED').length;
    const totalPracticed = patternMasteries.filter(m => m.state !== 'NOT_STARTED').length;

    const topicsInProgress = topicProgress.filter(p => p.status === 'IN_PROGRESS').length;

    const completedAssessments = assessments.filter(a => a.status === 'SUBMITTED' || a.status === 'TIMED_OUT').length;

    return {
      currentFocus: { topicsInProgress },
      weakAreas: { patterns: weakPatterns },
      reviewQueue: { count: reviewQueueCount },
      mastery: { patternsMastered, totalPracticed },
      assessments: { completed: completedAssessments },
      recentActivity: attempts.length
    };
  }

  async chat(userId: string, message: string) {
    const context = await this.getContext(userId);
    const msg = message.toLowerCase().trim();

    const { PriorityEngineService } = await import('./priority-engine.service');
    const priorityEngine = new PriorityEngineService();
    const rankedActions = await priorityEngine.getRankedActions(userId);

    // Deterministic rules engine
    if (msg.includes('study next') || msg.includes('what should i do') || msg.includes('what\'s next')) {
      const topAction = rankedActions[0];
      if (topAction) {
        return {
          fact: `Based on your unified learner context, your highest priority task is: ${topAction.title}.`,
          recommendation: `Reason: ${topAction.reason}`,
          actions: [{ label: 'Start Task', type: 'NEXT_STEP', url: topAction.entitySlug }]
        };
      }
      return {
        fact: "You have no pending tasks, reviews, or active roadmap topics.",
        recommendation: "It's a great time to start a new DSA concept in the Curriculum.",
        actions: [{ label: 'View Roadmap', type: 'NEXT_STEP', url: '/roadmap' }]
      };
    }

    if (msg.includes('revise now') || msg.includes('revise today') || msg.includes('review')) {
      const reviewAction = rankedActions.find(a => a.type === 'REVIEW_TOPIC');
      if (reviewAction) {
        return {
          fact: `You have overdue items in your revision queue. The top priority is: ${reviewAction.title}.`,
          recommendation: `Reason: ${reviewAction.reason} I strongly recommend clearing this before practicing new concepts.`,
          actions: [{ label: 'Start Review', type: 'REVIEW', url: reviewAction.entitySlug }]
        };
      }
      return {
        fact: "Your revision queue is currently empty.",
        recommendation: "Great job! You have cleared all pending spaced-repetition tasks. You can safely practice new problems.",
        actions: [{ label: 'Continue Practice', type: 'PRACTICE', url: '/practice' }]
      };
    }

    if (msg.includes('weak') || msg.includes('improve my weak') || msg.includes('pattern') || msg.includes('need work')) {
      const weakAction = rankedActions.find(a => a.type === 'PRACTICE' && a.id.includes('WEAK'));
      if (weakAction) {
        return {
          fact: `You currently have weak spots in patterns. Example: ${weakAction.title}.`,
          recommendation: weakAction.reason,
          actions: [{ label: 'Practice Weak Patterns', type: 'PRACTICE', url: '/practice' }]
        };
      }
      return {
        fact: "You do not have any patterns flagged as weak right now.",
        recommendation: "Your recent revisions successfully improved your weak areas. Keep expanding your breadth.",
        actions: [{ label: 'Explore New Patterns', type: 'PRACTICE', url: '/practice' }]
      };
    }

    if (msg.includes('interview ready') || msg.includes('prepare for interview') || msg.includes('interview gap') || msg.includes('start mock')) {
      const interviewAction = rankedActions.find(a => a.type === 'INTERVIEW_PRACTICE' || a.id.includes('MOCK'));
      if (interviewAction) {
        return {
          fact: "You have an interview readiness gap or pending task.",
          recommendation: `I recommend: ${interviewAction.title}. Reason: ${interviewAction.reason}`,
          actions: [{ label: 'Go to Interview Hub', type: 'INTERVIEW_PREP', url: interviewAction.entitySlug }]
        };
      }
      
      return {
        fact: "You have no outstanding evidence gaps in your interview profile.",
        recommendation: "You are highly ready! Dive straight into a mock session to keep your skills sharp.",
        actions: [{ label: 'Start Mock', type: 'INTERVIEW_PREP', url: '/interview' }]
      };
    }

    if (msg.includes('project') || msg.includes('portfolio') || msg.includes('evidence')) {
      const projectAction = rankedActions.find(a => a.type === 'COMPLETE_PROJECT_TASK' || a.type === 'REVISE_PROJECT' || a.type === 'CAREER_EVIDENCE');
      
      if (projectAction) {
        return {
          fact: "You have pending actions for your flagship projects or portfolio.",
          recommendation: `Next step: ${projectAction.title}. Reason: ${projectAction.reason}`,
          actions: [{ label: 'Take Action', type: 'NEXT_STEP', url: projectAction.entitySlug }]
        };
      }

      return {
        fact: "You don't have any urgent project or portfolio tasks pending.",
        recommendation: "If you have completed your active projects, you can browse new ones.",
        actions: [{ label: 'View Projects', type: 'NEXT_STEP', url: '/projects' }]
      };
    }

    if (msg.includes('career status') || msg.includes('profile') || msg.includes('career today') || msg.includes('resume')) {
      const careerAction = rankedActions.find(a => a.type === 'CAREER_EVIDENCE');
      
      if (careerAction) {
        return {
          fact: `You have missing career evidence.`,
          recommendation: `Top priority: ${careerAction.title}. Reason: ${careerAction.reason}`,
          actions: [{ label: 'Go to Action', type: 'NEXT_STEP', url: careerAction.entitySlug }]
        };
      }

      return {
        fact: "Your professional profile has verified evidence in every major category.",
        recommendation: "Your profile looks excellent. You are highly ready to apply for roles.",
        actions: [{ label: 'View Career Dashboard', type: 'NEXT_STEP', url: '/career' }]
      };
    }
    if (msg.includes('plan')) {
      const { PlannerService } = await import('../planner/planner.service');
      const planner = new PlannerService();
      const plan = await planner.getTodayPlan(userId);
      
      if (!plan || plan.tasks.length === 0) {
        return {
          fact: "You do not have any active tasks in today's plan.",
          recommendation: "You can generate a new plan from the Study Plan page.",
          actions: [{ label: 'Go to Study Plan', type: 'NEXT_STEP', url: '/study-plan' }]
        };
      }
      
      const firstTask = plan.tasks.find((t: any) => t.status === 'PENDING');
      if (firstTask) {
        return {
          fact: `Your top priority task today is: ${firstTask.title}.`,
          recommendation: `Reason: ${firstTask.reason}. I recommend starting with this.`,
          actions: [{ label: 'View Full Plan', type: 'NEXT_STEP', url: '/study-plan' }]
        };
      } else {
        return {
          fact: "You have completed all tasks in today's plan!",
          recommendation: "Great job! You can rest or generate a new plan.",
          actions: [{ label: 'View Progress', type: 'NEXT_STEP', url: '/progress' }]
        };
      }
    }

    if (msg.includes('practice session')) {
      return {
        fact: "A solid practice session usually takes 30-45 minutes.",
        recommendation: context.reviewQueue.count > 0 
          ? "Start with 15 minutes of review, then tackle one new problem." 
          : "Pick a medium problem from a pattern you are currently learning.",
        actions: [{ label: 'Go to Arena', type: 'PRACTICE', url: '/practice' }]
      };
    }

    if (msg.includes('progressing') || msg.includes('progress')) {
      const { ProgressService } = await import('../progress/progress.service');
      const progress = new ProgressService();
      const stats = await progress.getIntelligence(userId);
      
      const completionRate = stats.curriculum.totalTopics > 0 
        ? Math.round((stats.curriculum.completedTopics / stats.curriculum.totalTopics) * 100) 
        : 0;

      return {
        fact: `You have completed ${completionRate}% of the curriculum, solved ${stats.practice.solvedProblems} problems, and mastered ${stats.patternMastery.MASTERED} patterns.`,
        recommendation: "Review your detailed progress breakdown on the Progress page.",
        actions: [{ label: 'View Progress Dashboard', type: 'NEXT_STEP', url: '/progress' }]
      };
    }

    if (msg.includes('ready') || msg.includes('move forward')) {
      if (context.reviewQueue.count > 0) {
        return {
          fact: `You have ${context.reviewQueue.count} items in your review queue.`,
          recommendation: "You are not quite ready to move forward. Clear your spaced-repetition review queue first.",
          actions: [{ label: 'Clear Reviews', type: 'NEXT_STEP', url: '/practice' }]
        };
      }
      return {
        fact: "Your review queue is clean.",
        recommendation: "Yes, you are ready to move forward. You can safely tackle new topics or practice problems.",
        actions: [{ label: 'Continue Roadmap', type: 'NEXT_STEP', url: '/roadmap' }]
      };
    }

    // Default fallback
    return {
      fact: "I track your actual progress across learning, practice, and assessments.",
      recommendation: "Ask me what to study next, what to revise, or how your progress looks.",
      actions: []
    };
  }
}
