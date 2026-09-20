import { fetchApi } from './api';

export interface DailyPlanTask {
  id: string;
  type: string;
  title: string;
  reason: string;
  entityId?: string;
  entitySlug?: string;
  estimatedMinutes: number;
  priority: number;
  status: string;
}

export interface DailyPlan {
  id: string;
  date: string;
  targetTime: number;
  plannedTime: number;
  completedTime: number;
  status: string;
  tasks: DailyPlanTask[];
}

export const plannerApi = {
  getTodayPlan: () => fetchApi<DailyPlan>('/study-plan/today'),
  generatePlan: (targetMinutes: number) => fetchApi<DailyPlan>('/study-plan', {
    method: 'POST',
    body: JSON.stringify({ targetMinutes })
  }),
  completeTask: (taskId: string) => fetchApi<DailyPlanTask>(`/study-plan/task/${taskId}/complete`, { method: 'POST' }),
  getHistory: () => fetchApi<DailyPlan[]>('/study-plan/history'),
};
