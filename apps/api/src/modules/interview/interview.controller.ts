import { Request, Response } from 'express';
import { InterviewService } from './interview.service';

const interviewService = new InterviewService();

export class InterviewController {
  async getReadiness(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const readiness = await interviewService.getReadiness(userId);
      res.json(readiness);
    } catch (error: any) {
      console.error(error);
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to fetch interview readiness' });
    }
  }

  async getAdaptiveQueue(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const queue = await interviewService.getAdaptiveQueue(userId);
      res.json(queue);
    } catch (error: any) {
      console.error(error);
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to fetch adaptive queue' });
    }
  }

  async generateMockSession(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const session = await interviewService.generateMockSession(userId, req.body);
      res.json(session);
    } catch (error: any) {
      console.error(error);
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to generate mock session' });
    }
  }

  async evaluateMockSession(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user!.id;
      const result = await interviewService.evaluateMockSession(id, userId);
      res.json(result);
    } catch (error: any) {
      console.error(error);
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to evaluate mock session' });
    }
  }
}
