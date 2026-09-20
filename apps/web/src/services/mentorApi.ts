import { fetchApi } from './api';

export interface MentorContext {
  currentFocus: { topicsInProgress: number };
  weakAreas: { patterns: string[] };
  reviewQueue: { count: number };
  mastery: { patternsMastered: number, totalPracticed: number };
  assessments: { completed: number };
  recentActivity: number;
}

export interface MentorAction {
  label: string;
  type: string;
  url: string;
}

export interface MentorResponse {
  fact: string;
  recommendation: string;
  actions: MentorAction[];
}

export const mentorApi = {
  getContext: () => fetchApi<MentorContext>('/mentor/context'),
  chat: (message: string) => fetchApi<MentorResponse>('/mentor/chat', {
    method: 'POST',
    body: JSON.stringify({ message })
  })
};
