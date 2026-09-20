import { Router } from 'express';
import { MentorController } from './mentor.controller';

const router = Router();
const controller = new MentorController();

router.get('/context', controller.getContext);
router.post('/chat', controller.chat);

export default router;
