import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const STANDARD_TASKS = [
  "Understand repository and contributing guidelines",
  "Identify issue or feature scope",
  "Fork and clone repository, prepare branch",
  "Implementation",
  "Local testing and verification",
  "Update documentation (if necessary)",
  "Submit Pull Request",
  "Respond to review feedback and follow-up"
];

export class ContributionService {
  async getContributions(userId: string) {
    return await prisma.contribution.findMany({
      where: { userId },
      include: { tasks: { orderBy: { order: 'asc' } }, project: true },
      orderBy: { updatedAt: 'desc' }
    });
  }

  async getContribution(userId: string, id: string) {
    const contribution = await prisma.contribution.findUnique({
      where: { id },
      include: { tasks: { orderBy: { order: 'asc' } }, project: true }
    });
    if (!contribution || contribution.userId !== userId) throw new Error('Contribution not found');
    return contribution;
  }

  async createContribution(userId: string, data: any) {
    const contribution = await prisma.contribution.create({
      data: {
        userId,
        repoName: data.repoName,
        repoUrl: data.repoUrl,
        organization: data.organization,
        type: data.type,
        status: data.status || 'PLANNED',
        targetDate: data.targetDate ? new Date(data.targetDate) : null,
        notes: data.notes,
        projectId: data.projectId,
        tasks: {
          create: STANDARD_TASKS.map((title, index) => ({
            title,
            order: index
          }))
        }
      },
      include: { tasks: { orderBy: { order: 'asc' } } }
    });
    return contribution;
  }

  async updateContribution(userId: string, id: string, data: any) {
    const contribution = await prisma.contribution.findUnique({ where: { id } });
    if (!contribution || contribution.userId !== userId) throw new Error('Contribution not found');

    const isNowMerged = data.status === 'MERGED' && contribution.status !== 'MERGED';

    return await prisma.contribution.update({
      where: { id },
      data: {
        repoName: data.repoName,
        repoUrl: data.repoUrl,
        organization: data.organization,
        type: data.type,
        status: data.status,
        targetDate: data.targetDate ? new Date(data.targetDate) : undefined,
        completionDate: isNowMerged ? new Date() : undefined,
        prUrl: data.prUrl,
        notes: data.notes,
        projectId: data.projectId
      },
      include: { tasks: { orderBy: { order: 'asc' } } }
    });
  }

  async updateTaskStatus(userId: string, taskId: string, status: string) {
    const task = await prisma.contributionTask.findUnique({
      where: { id: taskId },
      include: { contribution: true }
    });
    if (!task || task.contribution.userId !== userId) throw new Error('Task not found');

    return await prisma.contributionTask.update({
      where: { id: taskId },
      data: { status }
    });
  }
}
