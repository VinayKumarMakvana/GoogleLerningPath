import { Router } from 'express';
import { getRoadmap, getTopicDetails, updateProgress } from './curriculum.controller';

const router = Router();

router.get('/roadmap', getRoadmap);
router.get('/topics/:id', getTopicDetails);
router.put('/progress/:entityType/:entityId', updateProgress);

export default router;
