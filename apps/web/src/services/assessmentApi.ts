import { fetchApi } from './api';
import { PracticeProblem } from './practiceApi';

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
  hintsUsed: number;
  timeSpent: number | null;
  practiceProblem?: PracticeProblem;
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
  getAssessments: (): Promise<Assessment[]> => 
    fetchApi<Assessment[]>('/assessments'),

  getAssessment: (id: string): Promise<Assessment> => 
    fetchApi<Assessment>(`/assessments/${id}`),

  startAttempt: (id: string): Promise<AssessmentAttempt> => 
    fetchApi<AssessmentAttempt>(`/assessments/${id}/attempt`, { method: 'POST' }),

  getActiveAttempt: (id: string): Promise<AssessmentAttempt> => 
    fetchApi<AssessmentAttempt>(`/assessments/${id}/attempt`),

  getAttempt: (attemptId: string): Promise<AssessmentAttempt> => 
    fetchApi<AssessmentAttempt>(`/assessments/attempts/${attemptId}`),

  recordProblemResult: (
    attemptId: string, 
    problemId: string, 
    status: string, 
    hintsUsed: number, 
    timeSpent: number
  ): Promise<AssessmentResult> => 
    fetchApi<AssessmentResult>(`/assessments/attempts/${attemptId}/problem`, {
      method: 'POST',
      body: JSON.stringify({ problemId, status, hintsUsed, timeSpent })
    }),

  submitAttempt: (attemptId: string): Promise<AssessmentAttempt> => 
    fetchApi<AssessmentAttempt>(`/assessments/attempts/${attemptId}/submit`, {
      method: 'POST'
    }),

  getHistory: (): Promise<AssessmentAttempt[]> => 
    fetchApi<AssessmentAttempt[]>('/assessments/history')
};
