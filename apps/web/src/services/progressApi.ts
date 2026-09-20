import { fetchApi } from './api';

export interface ProgressIntelligence {
  curriculum: { completedTopics: number; totalTopics: number };
  practice: { solvedProblems: number; totalProblems: number };
  assessment: { completed: number; averageScore: number };
  studyPlans: { total: number; completed: number; missed: number };
  patternMastery: {
    MASTERED: number;
    REVIEW: number;
    PRACTICING: number;
    LEARNING: number;
    NOT_STARTED: number;
  };
  recentAccuracy: number;
  recentActivity: Array<{ id: string; title: string; status: string; date: string }>;
}

export interface RevisionRecommendation {
  id: string;
  title: string;
  reason: string;
  type: string;
  priority: number;
  estimatedMinutes: number;
  url: string;
}

export const progressApi = {
  getIntelligence: () => fetchApi<ProgressIntelligence>('/progress/intelligence'),
  getRevisionQueue: () => fetchApi<RevisionRecommendation[]>('/progress/revision'),
};
