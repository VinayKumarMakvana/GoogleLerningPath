import { CareerService } from '../career/career.service';
import { PlannerService } from '../planner/planner.service';
import { ProgressService } from '../progress/progress.service';
import { PriorityEngineService } from '../mentor/priority-engine.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DashboardService {
  private careerService: CareerService;
  private plannerService: PlannerService;
  private progressService: ProgressService;
  private priorityEngine: PriorityEngineService;

  constructor() {
    this.careerService = new CareerService();
    this.plannerService = new PlannerService();
    this.progressService = new ProgressService();
    this.priorityEngine = new PriorityEngineService();
  }

  async getDashboard(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      careerDashboard,
      todayPlan,
      progressIntelligence,
      topicsProgress,
      rankedActions,
      recentPracticeAttempts
    ] = await Promise.all([
      this.careerService.getCareerDashboard(userId),
      this.plannerService.getTodayPlan(userId),
      this.progressService.getIntelligence(userId),
      prisma.progress.findMany({ where: { userId, entityType: 'TOPIC' } }),
      this.priorityEngine.getRankedActions(userId),
      prisma.practiceAttempt.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
        take: 30
      })
    ]);

    let currentStreak = 0;
    if (recentPracticeAttempts.length > 0) {
      const dates = new Set(recentPracticeAttempts.map((a: { updatedAt: Date }) => {
        const d = new Date(a.updatedAt);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
      }));
      
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      
      if (dates.has(d.getTime())) {
        currentStreak++;
        d.setDate(d.getDate() - 1);
        while (dates.has(d.getTime())) {
          currentStreak++;
          d.setDate(d.getDate() - 1);
        }
      } else {
        d.setDate(d.getDate() - 1);
        if (dates.has(d.getTime())) {
          currentStreak++;
          d.setDate(d.getDate() - 1);
          while (dates.has(d.getTime())) {
            currentStreak++;
            d.setDate(d.getDate() - 1);
          }
        }
      }
    }

    const qaCount = 0;

    return {
      profile: careerDashboard.profile,
      todayPlan,
      progress: progressIntelligence,
      topicsProgress,
      mentorRecommendations: rankedActions.slice(0, 3),
      careerReadiness: careerDashboard.careerReadiness,
      streak: currentStreak,
      qAndA: qaCount
    };
  }
}
