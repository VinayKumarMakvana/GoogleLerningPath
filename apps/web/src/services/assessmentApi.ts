import { PracticeProblem } from './practiceApi';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export interface Assessment {
  id: string;
  title: string;
  description: string | null;
  type: string;
  difficulty: string;
  duration: number; // minutes
  status: string;
  version: number;
  _count?: { problems: number };
  problems?: AssessmentProblem[];
}

export interface AssessmentProblem {
  id: string;
  assessmentId: string;
  practiceProblemId: string;
  order: number;
  practiceProblem: PracticeProblem;
}

export interface AssessmentResult {
  id: string;
  attemptId: string;
  practiceProblemId: string;
  status: string;
  timeSpent: number | null;
  hintsUsed: number;
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  userId: string;
  status: string;
  startedAt: string;
  submittedAt: string | null;
  score: number | null;
  timeUsed: number | null;
  assessment?: Assessment;
  results?: AssessmentResult[];
}

export const assessmentApi = {
  getAssessments: async (): Promise<Assessment[]> => {
    const res = await fetch(`${API_URL}/assessments`);
    if (!res.ok) throw new Error('Failed to fetch assessments');
    return res.json();
  },

  getAssessment: async (id: string): Promise<Assessment> => {
    const res = await fetch(`${API_URL}/assessments/${id}`);
    if (!res.ok) throw new Error('Failed to fetch assessment details');
    return res.json();
  },

  startAttempt: async (id: string): Promise<AssessmentAttempt> => {
    const res = await fetch(`${API_URL}/assessments/${id}/attempt`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to start attempt');
    return res.json();
  },

  getActiveAttempt: async (id: string): Promise<AssessmentAttempt> => {
    const res = await fetch(`${API_URL}/assessments/${id}/attempt`);
    if (!res.ok) throw new Error('Failed to fetch active attempt');
    return res.json();
  },

  getAttempt: async (attemptId: string): Promise<AssessmentAttempt> => {
    const res = await fetch(`${API_URL}/assessments/attempts/${attemptId}`);
    if (!res.ok) throw new Error('Failed to fetch attempt');
    return res.json();
  },

  recordProblemResult: async (
    attemptId: string, 
    problemId: string, 
    status: string, 
    hintsUsed: number, 
    timeSpent: number
  ): Promise<AssessmentResult> => {
    const res = await fetch(`${API_URL}/assessments/attempts/${attemptId}/problem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ problemId, status, hintsUsed, timeSpent })
    });
    if (!res.ok) throw new Error('Failed to record result');
    return res.json();
  },

  submitAttempt: async (attemptId: string): Promise<AssessmentAttempt> => {
    const res = await fetch(`${API_URL}/assessments/attempts/${attemptId}/submit`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to submit attempt');
    return res.json();
  },

  getHistory: async (): Promise<AssessmentAttempt[]> => {
    const res = await fetch(`${API_URL}/assessments/history`);
    if (!res.ok) throw new Error('Failed to fetch history');
    return res.json();
  }
};
