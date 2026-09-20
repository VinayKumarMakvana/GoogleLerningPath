import { fetchApi } from './api';

export const contributionApi = {
  getContributions: () => fetchApi<Record<string, unknown>[]>('/contributions'),
  getContribution: (id: string) => fetchApi<Record<string, unknown>>(`/contributions/${id}`),
  createContribution: (data: Record<string, unknown>) => fetchApi<Record<string, unknown>>('/contributions', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateContribution: (id: string, data: Record<string, unknown>) => fetchApi<Record<string, unknown>>(`/contributions/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),
  updateTaskStatus: (contributionId: string, taskId: string, status: string) => fetchApi<Record<string, unknown>>(`/contributions/${contributionId}/tasks/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  })
};
