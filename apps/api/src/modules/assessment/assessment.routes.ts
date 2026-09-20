import { Router } from 'express';
import { AssessmentController } from './assessment.controller';

const router = Router();
const controller = new AssessmentController();

router.get('/history', controller.getUserHistory.bind(controller));
router.get('/', controller.getAssessments.bind(controller));
router.get('/:id', controller.getAssessment.bind(controller));

router.post('/:id/attempt', controller.startAttempt.bind(controller));
router.get('/:id/attempt', controller.getActiveAttempt.bind(controller));
router.get('/attempts/:attemptId', controller.getAttempt.bind(controller));
router.post('/attempts/:attemptId/problem', controller.recordProblemResult.bind(controller));
router.post('/attempts/:attemptId/submit', controller.submitAttempt.bind(controller));

export default router;
