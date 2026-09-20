import { Router } from 'express';
import { CareerController } from './career.controller';

const router = Router();
const controller = new CareerController();

router.get('/dashboard', controller.getDashboard);
router.patch('/profile', controller.updateProfile);

router.get('/applications', controller.getApplications);
router.post('/applications', controller.createApplication);
router.get('/applications/:id', controller.getApplication);
router.patch('/applications/:id', controller.updateApplication);

export default router;
