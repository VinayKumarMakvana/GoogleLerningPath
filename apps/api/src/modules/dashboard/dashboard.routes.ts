import { Router } from 'express';
import { DashboardController } from './dashboard.controller';

const router = Router();
const dashboardController = new DashboardController();

router.get('/', dashboardController.getDashboard.bind(dashboardController));

export default router;
