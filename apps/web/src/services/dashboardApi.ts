import { fetchApi } from './api';
import { DailyPlan } from './plannerApi';

export interface DashboardData {
  profile: any;
  todayPlan: DailyPlan;
  progress: any;
  topicsProgress: any;
  mentorRecommendations: any[];
  careerReadiness: any;
  streak: number;
  qAndA: number;
}

export const dashboardApi = {
  getDashboard: () => fetchApi<DashboardData>('/dashboard'),
};
