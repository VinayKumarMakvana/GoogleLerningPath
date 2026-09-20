import { Router } from 'express';
import { ProjectController } from './project.controller';

const router = Router();
const controller = new ProjectController();

router.get('/', controller.getProjects);
router.get('/:slug', controller.getProjectBySlug);
router.patch('/:projectId/state', controller.updateProjectState);
router.patch('/tasks/:taskId/state', controller.updateTaskState);

// Review & Defense
router.post('/:projectId/submit', controller.submitProject);
router.post('/submissions/:submissionId/review', controller.createReview);
router.post('/submissions/:submissionId/defense', controller.startDefense);
router.post('/defenses/:defenseId/verify', controller.verifyDefense);

export default router;
