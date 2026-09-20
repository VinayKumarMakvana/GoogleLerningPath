import { Router } from 'express';
import { ProgressController } from './progress.controller';

const router = Router();
const controller = new ProgressController();

router.get('/intelligence', controller.getIntelligence);
router.get('/revision', controller.getRevisionQueue);

export default router;
