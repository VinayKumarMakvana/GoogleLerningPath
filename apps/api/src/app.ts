import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import curriculumRoutes from './modules/curriculum/curriculum.routes';

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

// API Routes will be mounted here
app.use('/api/v1/curriculum', curriculumRoutes);
// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/auth', authRoutes);
// etc.

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
