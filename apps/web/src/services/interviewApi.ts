import { fetchApi } from './api';

export interface ReadinessArea {
  score: number;
  strengths: string;
  gaps: string;
  recommendedAction: string;
}

export interface InterviewReadiness {
  dsa: ReadinessArea;
  fundamentals: ReadinessArea;
  problemSolving: ReadinessArea;
  interviewPractice: ReadinessArea;
}

export interface AdaptiveTask {
  title: string;
  reason: string;
  estimatedMinutes: number;
  priority: number;
  url: string;
}

export const interviewApi = {
  getReadiness: () => fetchApi<InterviewReadiness>('/interview/readiness'),
  getAdaptiveQueue: () => fetchApi<AdaptiveTask[]>('/interview/queue'),
  generateMockSession: (data: Record<string, unknown>) => fetchApi<Record<string, unknown>>('/interview/mock', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  evaluateMockSession: (sessionId: string) => fetchApi<Record<string, unknown>>(`/interview/mock/${sessionId}/evaluate`, {
    method: 'POST'
  })
};
