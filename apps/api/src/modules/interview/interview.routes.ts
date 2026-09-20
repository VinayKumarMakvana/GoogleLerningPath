import { Router } from 'express';
import { InterviewController } from './interview.controller';

const router = Router();
const controller = new InterviewController();

router.get('/readiness', controller.getReadiness);
router.get('/queue', controller.getAdaptiveQueue);
router.post('/mock', controller.generateMockSession);
router.post('/mock/:id/evaluate', controller.evaluateMockSession);

export default router;
