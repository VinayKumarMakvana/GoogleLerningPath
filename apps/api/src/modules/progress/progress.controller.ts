import * as util from 'util';
import { Request, Response } from 'express';
import { ProgressService } from './progress.service';

const progressService = new ProgressService();

export class ProgressController {
  async getIntelligence(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const data = await progressService.getIntelligence(userId);
      res.json(data);
    } catch (error: unknown) {
      process.stderr.write(util.format(error) + "\n");
      if ((error as Error & { code?: string }).code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to fetch progress intelligence' });
    }
  }

  async getRevisionQueue(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const queue = await progressService.getRevisionQueue(userId);
      res.json(queue);
    } catch (error: unknown) {
      process.stderr.write(util.format(error) + "\n");
      if ((error as Error & { code?: string }).code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to fetch revision queue' });
    }
  }
}
