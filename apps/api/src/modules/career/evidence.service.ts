import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface NormalizedEvidence {
  type: string;
  sourceEntity: string;
  sourceId: string;
  subject: string;
  competency: string;
  description: string;
  verifiedAt: Date;
  relatedProjectId?: string;
  supportingUrl?: string;
  measurableResult?: string;
}

export interface ProjectPortfolio {
  projectId: string;
  title: string;
  role: string;
  technologiesUsed: string[];
  architecture: string;
  githubUrl: string | null;
  deploymentUrl: string | null;
  status: string;
  verifiedFindings: Array<{ category: string, severity: string, explanation: string, resolutionTask: string }>;
  defensesPassed: Array<{ type: string, score: number | null }>;
  evidence: NormalizedEvidence[];
}

export class EvidenceService {
  /**
   * 1 & 2. Aggregate and Normalize Verified Evidence
   */
  async getVerifiedEvidence(userId: string): Promise<NormalizedEvidence[]> {
    const evidence: NormalizedEvidence[] = [];

    // A. Completed Flagship Projects (Base project evidence)
    const projects = await prisma.userProjectState.findMany({
      where: { userId, status: 'COMPLETED' },
      include: { project: true }
    });
    for (const ps of projects) {
      evidence.push({
        type: 'PROJECT_COMPLETION',
        sourceEntity: 'UserProjectState',
        sourceId: ps.id,
        subject: ps.project.title,
        competency: 'Software Engineering',
        description: `Successfully built and delivered ${ps.project.title}, a ${ps.project.projectType} project.`,
        verifiedAt: ps.updatedAt,
        relatedProjectId: ps.projectId,
        supportingUrl: ps.deploymentUrl || ps.githubUrl || undefined,
        measurableResult: `Targeted ${ps.project.targetSkills.join(', ')}`
      });
    }

    // B. Verified Project Submissions (Defenses & Reviews)
    const submissions = await prisma.projectSubmission.findMany({
      where: { userProjectState: { userId } },
      include: {
        userProjectState: { include: { project: true } },
        defenses: true,
        reviews: { include: { findings: true } }
      }
    });

    for (const sub of submissions) {
      // Defenses
      const passedDefenses = sub.defenses.filter(d => d.status === 'PASSED');
      for (const d of passedDefenses) {
        evidence.push({
          type: 'PROJECT_DEFENSE',
          sourceEntity: 'ProjectDefense',
          sourceId: d.id,
          subject: sub.userProjectState.project.title,
          competency: this.mapDefenseTypeToCompetency(d.type),
          description: `Passed rigorous ${d.type} defense for ${sub.userProjectState.project.title}.`,
          verifiedAt: d.updatedAt,
          relatedProjectId: sub.userProjectState.projectId,
          measurableResult: 'Defense PASSED'
        });
      }
      
      // Reviews (Resolved Findings)
      for (const r of sub.reviews) {
        const resolvedFindings = r.findings.filter(f => f.status === 'RESOLVED');
        for (const f of resolvedFindings) {
          evidence.push({
            type: 'CODE_REVIEW_RESOLUTION',
            sourceEntity: 'ReviewFinding',
            sourceId: f.id,
            subject: f.category,
            competency: this.mapFindingCategoryToCompetency(f.category),
            description: `Resolved ${f.severity} severity finding in ${f.affectedArea}: ${f.explanation}`,
            verifiedAt: f.updatedAt,
            relatedProjectId: sub.userProjectState.projectId
          });
        }
      }
    }

    // C. Mastered DSA Patterns
    const patterns = await prisma.userPatternMastery.findMany({
      where: { userId, state: 'MASTERED' },
      include: { pattern: true }
    });
    for (const p of patterns) {
      evidence.push({
        type: 'DSA_MASTERY',
        sourceEntity: 'UserPatternMastery',
        sourceId: p.id,
        subject: p.pattern.name,
        competency: 'DSA',
        description: `Demonstrated mastery of the ${p.pattern.name} algorithmic pattern.`,
        verifiedAt: p.updatedAt
      });
    }

    // D. Mock Interviews
    const interviews = await prisma.interviewSession.findMany({
      where: { userId, status: 'COMPLETED', type: 'MOCK' }
    });
    for (const i of interviews) {
      if (i.score && i.score >= 70) {
        evidence.push({
          type: 'MOCK_INTERVIEW',
          sourceEntity: 'InterviewSession',
          sourceId: i.id,
          subject: 'Technical Interview',
          competency: 'Communication/Interview',
          description: `Successfully passed a mock technical interview.`,
          verifiedAt: i.updatedAt,
          measurableResult: `Score: ${i.score}%`
        });
      }
    }

    // E. Completed Topics (Technical Skills)
    const topics = await prisma.progress.findMany({
      where: { userId, status: 'COMPLETED', entityType: 'TOPIC' }
    });
    // We fetch the actual topic titles to map them to competencies if needed
    // For performance, we can bulk fetch topics
    const topicIds = topics.map(t => t.entityId);
    const actualTopics = await prisma.topic.findMany({ where: { id: { in: topicIds } } });
    
    for (const t of actualTopics) {
      evidence.push({
        type: 'CURRICULUM_COMPLETION',
        sourceEntity: 'Topic',
        sourceId: t.id,
        subject: t.title,
        competency: 'CS Fundamentals', // Basic mapping, can be improved
        description: `Completed comprehensive curriculum for ${t.title}.`,
        verifiedAt: topics.find(p => p.entityId === t.id)?.updatedAt || new Date()
      });
    }

    // F. Open Source Contributions
    const contributions = await prisma.contribution.findMany({
      where: { userId, status: 'MERGED' },
      include: { project: true }
    });
    for (const c of contributions) {
      evidence.push({
        type: 'OPEN_SOURCE',
        sourceEntity: 'Contribution',
        sourceId: c.id,
        subject: c.repoName,
        competency: 'Software Engineering',
        description: `Contributed ${c.type.toLowerCase()} to ${c.repoName} (${c.organization || 'independent'}).`,
        verifiedAt: c.completionDate || c.updatedAt,
        supportingUrl: c.prUrl || c.repoUrl,
        relatedProjectId: c.projectId || undefined,
        measurableResult: 'PR MERGED'
      });
    }

    // G. Assessment Results
    const assessments = await prisma.assessmentAttempt.findMany({
      where: { userId, status: 'SUBMITTED', score: { gte: 80 } },
      include: { assessment: true }
    });
    for (const a of assessments) {
      evidence.push({
        type: 'ASSESSMENT_PASSED',
        sourceEntity: 'AssessmentAttempt',
        sourceId: a.id,
        subject: a.assessment.title,
        competency: 'CS Fundamentals',
        description: `Passed assessment: ${a.assessment.title}`,
        verifiedAt: a.updatedAt,
        measurableResult: `Score: ${a.score}%`
      });
    }

    // Deduplicate: If we have multiple evidence of the same type and subject (e.g. same topic completed twice, take latest)
    // For now, we trust the database uniqueness on progress/mastery.
    
    return evidence.sort((a, b) => b.verifiedAt.getTime() - a.verifiedAt.getTime());
  }

  /**
   * 3. Competency Mapping
   */
  async getCompetencies(userId: string) {
    const evidence = await this.getVerifiedEvidence(userId);
    const competencies: Record<string, NormalizedEvidence[]> = {};
    
    for (const e of evidence) {
      if (!competencies[e.competency]) {
        competencies[e.competency] = [];
      }
      competencies[e.competency].push(e);
    }
    
    return competencies;
  }

  /**
   * 4. Project Portfolio Generation
   */
  async getProjectPortfolio(userId: string, projectId: string): Promise<ProjectPortfolio | null> {
    const userState = await prisma.userProjectState.findUnique({
      where: { userId_projectId: { userId, projectId } },
      include: { 
        project: true,
        submissions: {
          include: {
            reviews: { include: { findings: true } },
            defenses: true
          }
        }
      }
    });

    if (!userState) return null;

    const allEvidence = await this.getVerifiedEvidence(userId);
    const projectEvidence = allEvidence.filter(e => e.relatedProjectId === projectId);

    const verifiedFindings: { category: string; severity: string; explanation: string; resolutionTask: string }[] = [];
    const defensesPassed: { type: string; score: number | null }[] = [];

    for (const sub of userState.submissions) {
      for (const r of sub.reviews) {
        for (const f of r.findings.filter(f => f.status === 'RESOLVED')) {
          verifiedFindings.push({
            category: f.category,
            severity: f.severity,
            explanation: f.explanation,
            resolutionTask: f.recommendation || ''
          });
        }
      }
      for (const d of sub.defenses.filter(d => d.status === 'PASSED')) {
        defensesPassed.push({
          type: d.type,
          score: null
        });
      }
    }

    return {
      projectId: userState.projectId,
      title: userState.project.title,
      role: 'Software Engineer', // Simplification
      technologiesUsed: userState.project.technologies,
      architecture: userState.project.architectureSummary,
      githubUrl: userState.githubUrl,
      deploymentUrl: userState.deploymentUrl,
      status: userState.status,
      verifiedFindings,
      defensesPassed,
      evidence: projectEvidence
    };
  }

  /**
   * 5 & 6. Resume Readiness (Strict factual checks)
   */
  async getResumeReadiness(userId: string) {
    const profile = await prisma.profile.findUnique({ where: { userId } });
    const career = await prisma.careerProfile.findUnique({ where: { userId } });
    const projects = await prisma.userProjectState.findMany({ where: { userId, status: 'COMPLETED' } });
    
    const evidence = await this.getVerifiedEvidence(userId);
    
    const hasDsaEvidence = evidence.some(e => e.type === 'DSA_MASTERY');
    const hasProjectEvidence = evidence.some(e => e.type === 'PROJECT_COMPLETION' || e.type === 'PROJECT_DEFENSE');
    const hasInterviewEvidence = evidence.some(e => e.type === 'MOCK_INTERVIEW');

    return {
      hasContactInfo: !!(profile?.firstName && profile?.lastName),
      hasEducation: !!career?.education,
      hasExperience: !!career?.experience,
      hasCompletedProjects: projects.length > 0,
      hasProjectLinks: projects.some(p => p.githubUrl || p.deploymentUrl),
      hasDsaEvidence,
      hasProjectEvidence,
      hasInterviewEvidence,
      resumeReady: career?.resumeStatus === 'READY'
    };
  }

  async getPortfolioReadiness(userId: string) {
    const projects = await prisma.userProjectState.findMany({
      where: { userId },
      include: { 
        project: true,
        submissions: { include: { defenses: true, reviews: { include: { findings: true } } } }
      }
    });

    return projects.map(p => {
      const hasReview = p.submissions.some(s => s.reviews.length > 0);
      const hasDefense = p.submissions.some(s => s.defenses.length > 0);
      const hasTesting = p.submissions.some(s => s.reviews.some(r => r.findings.some(f => f.category === 'Testing' && f.status === 'RESOLVED')));

      return {
        projectId: p.projectId,
        title: p.project.title,
        status: p.status,
        githubUrl: p.githubUrl,
        deploymentUrl: p.deploymentUrl,
        missingEvidence: [
          !p.githubUrl && p.status === 'COMPLETED' ? 'Missing GitHub Repository Link' : null,
          !p.deploymentUrl && p.status === 'COMPLETED' ? 'Missing Live Deployment Link' : null,
          !hasReview && p.status === 'COMPLETED' ? 'Missing Code Review Evidence' : null,
          !hasDefense && p.status === 'COMPLETED' ? 'Missing Project Defense Evidence' : null,
          !hasTesting && p.status === 'COMPLETED' ? 'Missing Testing Evidence' : null
        ].filter(Boolean) as string[]
      };
    });
  }

  private mapDefenseTypeToCompetency(type: string): string {
    switch(type) {
      case 'Architecture': return 'System Design';
      case 'System Design': return 'System Design';
      case 'Security': return 'Security';
      case 'Reliability/Observability': return 'Observability';
      case 'Performance': return 'Software Engineering';
      default: return 'Software Engineering';
    }
  }

  private mapFindingCategoryToCompetency(category: string): string {
    switch(category) {
      case 'Code Quality': return 'Software Engineering';
      case 'Architecture': return 'System Design';
      case 'Security': return 'Security';
      case 'Testing': return 'Testing/QA';
      case 'Performance': return 'Software Engineering';
      case 'Observability': return 'Observability';
      default: return 'Software Engineering';
    }
  }
}

