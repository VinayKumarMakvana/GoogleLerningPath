import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProjectService {
  async getProjects(userId: string) {
    const projects = await prisma.project.findMany({
      include: {
        milestones: { include: { tasks: true } }
      }
    });

    const userStates = await prisma.userProjectState.findMany({ where: { userId } });
    const userTaskStates = await prisma.userTaskState.findMany({ where: { userId } });

    return projects.map(p => {
      const state = userStates.find(s => s.projectId === p.id) || { status: 'NOT_STARTED', githubUrl: null, deploymentUrl: null };
      
      const allTasks = p.milestones.flatMap(m => m.tasks);
      const completedTasks = userTaskStates.filter(t => allTasks.some(at => at.id === t.taskId) && t.status === 'COMPLETED').length;
      const progress = allTasks.length > 0 ? Math.round((completedTasks / allTasks.length) * 100) : 0;

      return {
        ...p,
        status: state.status,
        githubUrl: state.githubUrl,
        deploymentUrl: state.deploymentUrl,
        progress,
        completedTasks,
        totalTasks: allTasks.length
      };
    });
  }

  async getProjectBySlug(slug: string, userId: string) {
    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        milestones: {
          include: { 
            tasks: { 
              orderBy: { order: 'asc' },
              where: { OR: [{ userId: null }, { userId }] }
            } 
          },
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!project) throw new Error("Project not found");

    const state = await prisma.userProjectState.findUnique({
      where: { userId_projectId: { userId, projectId: project.id } },
      include: {
        submissions: {
          include: {
            reviews: { include: { findings: true } },
            defenses: true,
            evidence: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    const taskIds = project.milestones.flatMap(m => m.tasks.map(t => t.id));
    const taskStates = await prisma.userTaskState.findMany({
      where: { userId, taskId: { in: taskIds } }
    });

    return {
      ...project,
      status: state?.status || 'NOT_STARTED',
      githubUrl: state?.githubUrl || null,
      deploymentUrl: state?.deploymentUrl || null,
      userTaskStates: taskStates,
      submissions: state?.submissions || []
    };
  }

  async updateProjectState(userId: string, projectId: string, data: any) {
    return prisma.userProjectState.upsert({
      where: { userId_projectId: { userId, projectId } },
      update: {
        status: data.status,
        githubUrl: data.githubUrl,
        deploymentUrl: data.deploymentUrl
      },
      create: {
        userId,
        projectId,
        status: data.status || 'ACTIVE',
        githubUrl: data.githubUrl,
        deploymentUrl: data.deploymentUrl
      }
    });
  }

  async updateTaskState(userId: string, taskId: string, data: any) {
    return prisma.userTaskState.upsert({
      where: { userId_taskId: { userId, taskId } },
      update: {
        status: data.status,
        notes: data.notes,
        evidenceUrl: data.evidenceUrl
      },
      create: {
        userId,
        taskId,
        status: data.status || 'COMPLETED',
        notes: data.notes,
        evidenceUrl: data.evidenceUrl
      }
    });
  }
}
