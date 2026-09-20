import { Router } from 'express';
import { ContributionController } from './contribution.controller';

const router = Router();
const controller = new ContributionController();

router.get('/', controller.getContributions);
router.post('/', controller.createContribution);
router.get('/:id', controller.getContribution);
router.patch('/:id', controller.updateContribution);
router.patch('/:id/tasks/:taskId', controller.updateTaskStatus);

export default router;
