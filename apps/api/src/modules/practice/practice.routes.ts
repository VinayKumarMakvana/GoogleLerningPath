import { Router } from 'express';
import { PracticeController } from './practice.controller';

const router = Router();
const practiceController = new PracticeController();

// GET /api/v1/practice/patterns
router.get('/patterns', practiceController.getPatterns.bind(practiceController));

// GET /api/v1/practice/attempts/me
router.get('/attempts/me', practiceController.getUserAttempts.bind(practiceController));

// GET /api/v1/practice/dashboard
router.get('/dashboard', practiceController.getDashboard.bind(practiceController));

// GET /api/v1/practice
router.get('/', practiceController.getProblems.bind(practiceController));
router.get('/problems', practiceController.getProblems.bind(practiceController));

// GET /api/v1/practice/:slug
router.get('/:slug', practiceController.getProblemBySlug.bind(practiceController));


// POST /api/v1/practice/:id/attempts
router.post('/:id/attempts', practiceController.createAttempt.bind(practiceController));

export default router;
