import { PrismaClient } from '@prisma/client';
import { MentorService } from '../mentor/mentor.service';

const prisma = new PrismaClient();
const mentorService = new MentorService();

export class PlannerService {
  async handleRecovery(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find any ACTIVE plans from before today
    const pastPlans = await prisma.dailyPlan.findMany({
      where: {
        userId,
        status: 'ACTIVE',
        date: { lt: today }
      }
    });

    for (const plan of pastPlans) {
      await prisma.dailyPlan.update({
        where: { id: plan.id },
        data: { status: 'MISSED' }
      });
      // We don't blindly carry over tasks. The next generateDailyPlan will automatically
      // pick up overdue reviews or critical roadmap tasks based on MentorContext.
    }
  }

  async generateDailyPlan(userId: string, targetMinutes: number = 180) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { PriorityEngineService } = await import('../mentor/priority-engine.service');
    const priorityEngine = new PriorityEngineService();
    const rankedActions = await priorityEngine.getRankedActions(userId);

    const tasks = [];
    let plannedTime = 0;

    for (const action of rankedActions) {
      if (plannedTime >= targetMinutes) break;
      
      const timeForTask = Math.min(action.estimatedMinutes, targetMinutes - plannedTime);
      
      tasks.push({
        type: action.type,
        title: action.title,
        reason: action.reason,
        entitySlug: action.entitySlug,
        estimatedMinutes: timeForTask,
        priority: action.priority
      });
      plannedTime += timeForTask;
    }

    // Persist the plan
    const plan = await prisma.dailyPlan.create({
      data: {
        userId,
        date: today,
        targetTime: targetMinutes,
        plannedTime,
        status: 'ACTIVE',
        tasks: {
          create: tasks
        }
      },
      include: { tasks: true }
    });

    return plan;
  }

  async getTodayPlan(userId: string) {
    await this.handleRecovery(userId);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingPlan = await prisma.dailyPlan.findFirst({
      where: {
        userId,
        date: today,
        status: 'ACTIVE'
      },
      include: { tasks: { orderBy: { priority: 'asc' } } }
    });

    if (existingPlan) {
      return existingPlan;
    }

    // If no plan exists, return null so frontend can prompt user to generate one
    // or we can auto-generate one with 180 min default
    return await this.generateDailyPlan(userId, 180);
  }

  async generateCustomPlan(userId: string, targetMinutes: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Archive any existing plan for today
    await prisma.dailyPlan.updateMany({
      where: { userId, date: today, status: 'ACTIVE' },
      data: { status: 'MISSED' }
    });

    return await this.generateDailyPlan(userId, targetMinutes);
  }

  async completeTask(userId: string, taskId: string) {
    const task = await prisma.dailyPlanTask.findUnique({
      where: { id: taskId },
      include: { plan: true }
    });

    if (!task || task.plan.userId !== userId) {
      throw new Error('Task not found');
    }

    if (task.status === 'COMPLETED') {
      return task;
    }

    // Mark task complete
    const updatedTask = await prisma.dailyPlanTask.update({
      where: { id: taskId },
      data: { status: 'COMPLETED' }
    });

    // Add time to plan
    const updatedPlan = await prisma.dailyPlan.update({
      where: { id: task.planId },
      data: { completedTime: { increment: task.estimatedMinutes } },
      include: { tasks: true }
    });

    // Check if entire plan is completed
    const allCompleted = updatedPlan.tasks.every(t => t.status === 'COMPLETED');
    if (allCompleted) {
      await prisma.dailyPlan.update({
        where: { id: task.planId },
        data: { status: 'COMPLETED' }
      });
    }

    return updatedTask;
  }

  async getHistory(userId: string) {
    return await prisma.dailyPlan.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: 30,
      include: { tasks: true }
    });
  }
}
