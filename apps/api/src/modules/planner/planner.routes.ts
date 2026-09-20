import { Router } from 'express';
import { PlannerController } from './planner.controller';

const router = Router();
const controller = new PlannerController();

router.get('/today', controller.getTodayPlan);
router.post('/', controller.generatePlan);
router.post('/task/:taskId/complete', controller.completeTask);
router.get('/history', controller.getHistory);

export default router;
