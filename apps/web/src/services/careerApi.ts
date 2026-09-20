import { fetchApi } from './api';

export const careerApi = {
  getDashboard: () => fetchApi<Record<string, unknown>>('/career/dashboard'),
  updateProfile: (data: Record<string, unknown>) => fetchApi<Record<string, unknown>>('/career/profile', {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),
  getApplications: () => fetchApi<Record<string, unknown>[]>('/career/applications'),
  getApplication: (id: string) => fetchApi<Record<string, unknown>>(`/career/applications/${id}`),
  createApplication: (data: Record<string, unknown>) => fetchApi<Record<string, unknown>>('/career/applications', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateApplication: (id: string, data: Record<string, unknown>) => fetchApi<Record<string, unknown>>(`/career/applications/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  })
};
