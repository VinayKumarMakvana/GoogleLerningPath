import * as util from 'util';
import { Request, Response } from 'express';
import { PracticeService } from './practice.service';

const practiceService = new PracticeService();

export class PracticeController {
  async getProblems(req: Request, res: Response) {
    try {
      const result = await practiceService.getProblems(req.query);
      res.json(result);
    } catch (error: unknown) {
      process.stderr.write(util.format('[PracticeController.getProblems]', error) + "\n");
      if ((error as Error & { code?: string }).code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getPatterns(req: Request, res: Response) {
    try {
      const patterns = await practiceService.getPatterns();
      res.json(patterns);
    } catch (error: unknown) {
      process.stderr.write(util.format('[PracticeController.getPatterns]', error) + "\n");
      if ((error as Error & { code?: string }).code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getProblemBySlug(req: Request, res: Response) {
    try {
      const problem = await practiceService.getProblemBySlug(req.params.slug);
      res.json(problem);
    } catch (error: unknown) {
      if (((error as Error).message || String(error)) === 'Problem not found') {
        return res.status(404).json({ error: ((error as Error).message || String(error)) });
      }
      process.stderr.write(util.format('[PracticeController.getProblemBySlug]', error) + "\n");
      if ((error as Error & { code?: string }).code === 'P2023') {
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
    } catch (error: unknown) {
      process.stderr.write(util.format('[PracticeController.createAttempt]', error) + "\n");
      if ((error as Error & { code?: string }).code === 'P2023') {
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
    } catch (error: unknown) {
      process.stderr.write(util.format('[PracticeController.getUserAttempts]', error) + "\n");
      if ((error as Error & { code?: string }).code === 'P2023') {
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
    } catch (error: unknown) {
      process.stderr.write(util.format('[PracticeController.getDashboard]', error) + "\n");
      if ((error as Error & { code?: string }).code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
