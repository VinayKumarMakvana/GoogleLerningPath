import { Request, Response } from 'express';
import { PracticeService } from './practice.service';

const practiceService = new PracticeService();

export class PracticeController {
  async getProblems(req: Request, res: Response) {
    try {
      const result = await practiceService.getProblems(req.query);
      res.json(result);
    } catch (error: any) {
      console.error('[PracticeController.getProblems]', error);
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getPatterns(req: Request, res: Response) {
    try {
      const patterns = await practiceService.getPatterns();
      res.json(patterns);
    } catch (error: any) {
      console.error('[PracticeController.getPatterns]', error);
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getProblemBySlug(req: Request, res: Response) {
    try {
      const problem = await practiceService.getProblemBySlug(req.params.slug);
      res.json(problem);
    } catch (error: any) {
      if (error.message === 'Problem not found') {
        return res.status(404).json({ error: error.message });
      }
      console.error('[PracticeController.getProblemBySlug]', error);
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createAttempt(req: Request, res: Response) {
    try {
      // In a real app with auth, userId would come from req.user
      // For this prototype, we'll extract it from body or mock it if missing
      const userId = req.user!.id;
      
      const attempt = await practiceService.createOrUpdateAttempt({
        ...req.body,
        userId,
      });
      res.json(attempt);
    } catch (error: any) {
      console.error('[PracticeController.createAttempt]', error);
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUserAttempts(req: Request, res: Response) {
    try {
      // In a real app with auth, userId would come from req.user
      const userId = req.user!.id;
      const attempts = await practiceService.getUserAttempts(userId as string);
      res.json(attempts);
    } catch (error: any) {
      console.error('[PracticeController.getUserAttempts]', error);
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getDashboard(req: Request, res: Response) {
    try {
      // In a real app with auth, userId would come from req.user
      const userId = req.user!.id;
      const dashboard = await practiceService.getDashboard(userId as string);
      res.json(dashboard);
    } catch (error: any) {
      console.error('[PracticeController.getDashboard]', error);
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
