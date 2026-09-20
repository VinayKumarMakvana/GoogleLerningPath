import { fetchApi } from './api';

export interface DsaPattern {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface PracticeProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  platform: string | null;
  tags: string[];
  expectedTime: string | null;
  expectedSpace: string | null;
  topics: { id: string; title: string }[];
  patterns: DsaPattern[];
  // Detail fields
  statement?: string;
  problemType?: string;
  options?: any;
  explanation?: string;
  constraints?: string[];
  inputFormat?: string;
  outputFormat?: string;
  examples?: Record<string, string>[];
  hints?: string[];
  sourceUrl?: string | null;
}

export interface PracticeAttempt {
  id: string;
  status: string;
  result: string | null;
  timeSpent: number | null;
  hintsUsed: number;
  highestHintLevel?: number;
  reviewState?: string;
  mistakeCategories?: string[];
  practice: { id: string; title: string; slug: string; difficulty: string; sourceUrl?: string; platform?: string };
  updatedAt: string;
}

export interface PatternProgress {
  id: string;
  name: string;
  slug: string;
  total: number;
  solved: number;
  struggled: number;
  isWeak: boolean;
  state: string; // "NOT_STARTED", "LEARNING", "PRACTICING", "REVIEW", "MASTERED"
}

export interface PracticeDashboardData {
  continuePractice: PracticeProblem | null;
  recommendedNext: PracticeProblem | null;
  needsReview: PracticeProblem[];
  patternStats: PatternProgress[];
}

export const practiceApi = {
  getPatterns: () => fetchApi<DsaPattern[]>('/practice/patterns'),
  
  getProblems: (params?: Record<string, string | number>) => {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) query.append(key, String(value));
      });
    }
    return fetchApi<{ data: PracticeProblem[]; meta: unknown }>(`/practice?${query.toString()}`);
  },

  getProblem: (slug: string) => fetchApi<PracticeProblem>(`/practice/${slug}`),

  createAttempt: (id: string, payload: Record<string, unknown>) => 
    fetchApi<PracticeAttempt>(`/practice/${id}/attempts`, {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  getMyAttempts: (userId?: string) => {
    const query = userId ? `?userId=${userId}` : '';
    return fetchApi<PracticeAttempt[]>(`/practice/attempts/me${query}`);
  },

  getDashboard: (userId?: string) => {
    const query = userId ? `?userId=${userId}` : '';
    return fetchApi<PracticeDashboardData>(`/practice/dashboard${query}`);
  }
};
