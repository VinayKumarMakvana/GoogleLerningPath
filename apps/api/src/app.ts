import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import curriculumRoutes from './modules/curriculum/curriculum.routes';
import practiceRoutes from './modules/practice/practice.routes';
import assessmentRoutes from './modules/assessment/assessment.routes';
import interviewRoutes from './modules/interview/interview.routes';
import mentorRoutes from './modules/mentor/mentor.routes';
import plannerRoutes from './modules/planner/planner.routes';
import progressRoutes from './modules/progress/progress.routes';
import projectRoutes from './modules/project/project.routes';
import careerRoutes from './modules/career/career.routes';
import contributionRoutes from './modules/contribution/contribution.routes';

// Initialize express app
const app = express();

// Global Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', message: 'API is healthy' });
});

import { requireAuth } from './middleware/auth.middleware';
import authRoutes from './modules/auth/auth.routes';

// Public API Routes
app.use('/api/v1/auth', authRoutes);

// Protected API Routes
app.use('/api/v1', requireAuth);
app.use('/api/v1/curriculum', curriculumRoutes);
app.use('/api/v1/practice', practiceRoutes);
app.use('/api/v1/assessments', assessmentRoutes);
app.use('/api/v1/interview', interviewRoutes);
app.use('/api/v1/mentor', mentorRoutes);
app.use('/api/v1/study-plan', plannerRoutes);
app.use('/api/v1/progress', progressRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/career', careerRoutes);
app.use('/api/v1/contributions', contributionRoutes);

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    error: {
      message: 'Not Found',
      status: 404,
    },
  });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: {
      message: 'Internal Server Error',
      status: 500,
    },
  });
});

export default app;
