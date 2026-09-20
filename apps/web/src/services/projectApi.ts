import { fetchApi } from './api';

export const projectApi = {
  getProjects: () => fetchApi<Record<string, unknown>[]>('/projects'),
  getProjectBySlug: (slug: string) => fetchApi<Record<string, unknown>>(`/projects/${slug}`),
  updateProjectState: (projectId: string, data: Record<string, unknown>) => fetchApi<Record<string, unknown>>(`/projects/${projectId}/state`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),
  updateTaskState: (taskId: string, data: Record<string, unknown>) => fetchApi<Record<string, unknown>>(`/projects/tasks/${taskId}/state`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),
  submitProject: (projectId: string, data: Record<string, unknown>) => fetchApi<Record<string, unknown>>(`/projects/${projectId}/submit`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  createReview: (submissionId: string, data: Record<string, unknown>) => fetchApi<Record<string, unknown>>(`/projects/submissions/${submissionId}/review`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  startDefense: (submissionId: string, data: Record<string, unknown>) => fetchApi<Record<string, unknown>>(`/projects/submissions/${submissionId}/defense`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  verifyDefense: (defenseId: string, data: Record<string, unknown>) => fetchApi<Record<string, unknown>>(`/projects/defenses/${defenseId}/verify`, {
    method: 'POST',
    body: JSON.stringify(data)
  })
};
