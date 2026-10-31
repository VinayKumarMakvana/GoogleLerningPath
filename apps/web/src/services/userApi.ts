import { API_BASE_URL, fetchApi } from './api';

export interface UserProfile {
  id: string;
  email: string;
  createdAt: string;
  profile: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    target: string | null;
    graduation: string | null;
  } | null;
  careerProfile: {
    targetRole: string;
    targetLocations: string[];
    education: string | null;
    experience: string | null;
    resumeStatus: string;
  } | null;
  goals: Array<{
    id: string;
    title: string;
    type: string;
    targetDate: string | null;
  }>;
}

export const userApi = {
  getMe: (): Promise<UserProfile> =>
    fetchApi<UserProfile>('/auth/me'),

  updateProfile: (data: {
    firstName?: string;
    lastName?: string;
    target?: string;
    graduation?: string;
  }): Promise<UserProfile['profile']> =>
    fetchApi<UserProfile['profile']>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};
