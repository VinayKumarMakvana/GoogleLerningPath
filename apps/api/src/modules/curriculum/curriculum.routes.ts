import { Router } from 'express';
import { getRoadmap, getTopicDetails, updateProgress, getAllTopics, getAllResources } from './curriculum.controller';

const router = Router();

router.get('/topics', getAllTopics);
router.get('/resources', getAllResources);
router.get('/roadmap', getRoadmap);
router.get('/topics/:id', getTopicDetails);
router.put('/progress/:entityType/:entityId', updateProgress);

export default router;
