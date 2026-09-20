import { PrismaClient } from '@prisma/client';
import { EvidenceService } from './evidence.service';

const prisma = new PrismaClient();
const evidenceService = new EvidenceService();

export class CareerService {
  async getCareerDashboard(userId: string) {
    let profile = await prisma.careerProfile.findUnique({ where: { userId } });
    if (!profile) {
      profile = await prisma.careerProfile.create({
        data: { userId }
      });
    }

    const applications = await prisma.jobApplication.findMany({
      where: { userId },
      orderBy: { applicationDate: 'desc' }
    });

    const dynamicEvidence = await evidenceService.getVerifiedEvidence(userId);
    const resumeReadiness = await evidenceService.getResumeReadiness(userId);
    const portfolioReadiness = await evidenceService.getPortfolioReadiness(userId);

    // Get comprehensive career readiness
    const technicalTopics = await prisma.progress.count({ where: { userId, status: 'COMPLETED', entityType: 'TOPIC' } });
    const mergedPRs = await prisma.contribution.count({ where: { userId, status: 'MERGED' } });
    
    const careerReadiness = {
      technicalSkills: technicalTopics >= 20 ? null : `Complete ${20 - technicalTopics} more technical topics.`,
      projects: portfolioReadiness.length >= 1 ? null : "Complete at least one flagship project.",
      openSource: mergedPRs >= 1 ? null : "Successfully merge at least one open source pull request.",
      dsa: resumeReadiness.hasDsaEvidence ? null : "Master at least 5 DSA patterns.",
      portfolio: portfolioReadiness.some(p => p.missingEvidence.length > 0) ? "Add missing GitHub/Deployment links to your completed projects." : null,
      resume: resumeReadiness.resumeReady ? null : "Mark your resume status as READY."
    };

    // Get Career Action Center tasks using PriorityEngine directly to avoid circular dependency
    const { PriorityEngineService } = await import('../mentor/priority-engine.service');
    const priorityEngine = new PriorityEngineService();
    const ranked = await priorityEngine.getRankedActions(userId);
    const careerActions = ranked
      .filter((a: any) => a.type === 'CAREER_EVIDENCE' || a.type === 'CAREER_TASK' || a.type === 'CONTRIBUTION_TASK' || a.title.includes('Interview'))
      .map(a => ({
        title: a.title,
        reason: a.reason,
        entitySlug: a.entitySlug
      }));

    return {
      profile,
      applications,
      evidence: dynamicEvidence,
      resumeReadiness,
      portfolioReadiness,
      careerReadiness,
      careerActions
    };
  }

  async updateCareerProfile(userId: string, data: any) {
    return await prisma.careerProfile.upsert({
      where: { userId },
      update: {
        targetRole: data.targetRole,
        targetLocations: data.targetLocations,
        education: data.education,
        experience: data.experience,
        resumeStatus: data.resumeStatus
      },
      create: {
        userId,
        targetRole: data.targetRole || "Software Engineer",
        targetLocations: data.targetLocations || [],
        education: data.education,
        experience: data.experience,
        resumeStatus: data.resumeStatus || "NEEDS_UPDATE"
      }
    });
  }

  async getApplications(userId: string) {
    return await prisma.jobApplication.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' }
    });
  }

  async getApplication(id: string, userId: string) {
    const app = await prisma.jobApplication.findUnique({ where: { id } });
    if (!app || app.userId !== userId) throw new Error("Application not found");
    return app;
  }

  async createApplication(userId: string, data: any) {
    return await prisma.jobApplication.create({
      data: {
        userId,
        company: data.company,
        role: data.role,
        location: data.location,
        jobUrl: data.jobUrl,
        applicationDate: data.applicationDate ? new Date(data.applicationDate) : null,
        status: data.status || 'SAVED',
        nextAction: data.nextAction,
        followUpDate: data.followUpDate ? new Date(data.followUpDate) : null,
        notes: data.notes
      }
    });
  }

  async updateApplication(userId: string, id: string, data: any) {
    const app = await prisma.jobApplication.findUnique({ where: { id } });
    if (!app || app.userId !== userId) throw new Error("Application not found");

    return await prisma.jobApplication.update({
      where: { id },
      data: {
        company: data.company,
        role: data.role,
        location: data.location,
        jobUrl: data.jobUrl,
        applicationDate: data.applicationDate ? new Date(data.applicationDate) : undefined,
        status: data.status,
        nextAction: data.nextAction,
        followUpDate: data.followUpDate ? new Date(data.followUpDate) : undefined,
        notes: data.notes
      }
    });
  }

  async exportResumeData(userId: string) {
    const profile = await prisma.profile.findUnique({ where: { userId } });
    const career = await prisma.careerProfile.findUnique({ where: { userId } });
    const competencies = await evidenceService.getCompetencies(userId);
    
    // Fetch project portfolios for completed projects
    const completedProjects = await prisma.userProjectState.findMany({ 
      where: { userId, status: 'COMPLETED' } 
    });
    
    const portfolios = [];
    for (const p of completedProjects) {
      const portfolio = await evidenceService.getProjectPortfolio(userId, p.projectId);
      if (portfolio) {
        portfolios.push(portfolio);
      }
    }

    return {
      contact: {
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        targetRole: career?.targetRole
      },
      background: {
        education: career?.education,
        experience: career?.experience
      },
      competencies,
      projects: portfolios
    };
  }

  async getCareerContextForEngine(userId: string) {
    let profile = await prisma.careerProfile.findUnique({ where: { userId } });
    const resumeReadiness = await evidenceService.getResumeReadiness(userId);
    const portfolioReadiness = await evidenceService.getPortfolioReadiness(userId);
    
    const technicalTopics = await prisma.progress.count({ where: { userId, status: 'COMPLETED', entityType: 'TOPIC' } });
    const mergedPRs = await prisma.contribution.count({ where: { userId, status: 'MERGED' } });
    
    const careerReadiness = {
      technicalSkills: technicalTopics >= 20 ? null : `Complete ${20 - technicalTopics} more technical topics.`,
      projects: portfolioReadiness.length >= 1 ? null : "Complete at least one flagship project.",
      openSource: mergedPRs >= 1 ? null : "Successfully merge at least one open source pull request.",
      dsa: resumeReadiness.hasDsaEvidence ? null : "Master at least 5 DSA patterns.",
      portfolio: portfolioReadiness.some(p => p.missingEvidence.length > 0) ? "Add missing GitHub/Deployment links to your completed projects." : null,
      resume: resumeReadiness.resumeReady ? null : "Mark your resume status as READY."
    };

    return {
      profile,
      resumeReadiness,
      portfolioReadiness,
      careerReadiness
    };
  }
}
