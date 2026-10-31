import * as util from 'util';
import { Request, Response } from 'express';
import { PlannerService } from './planner.service';

const plannerService = new PlannerService();

export class PlannerController {
  async getTodayPlan(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const plan = await plannerService.getTodayPlan(userId);
      res.json(plan);
    } catch (error: unknown) {
      process.stderr.write(util.format(error) + "\n");
      if ((error as Error & { code?: string }).code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to fetch today\'s plan' });
    }
  }

  async generatePlan(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { targetMinutes } = req.body;
      const plan = await plannerService.generateCustomPlan(userId, targetMinutes || 180);
      res.json(plan);
    } catch (error: unknown) {
      process.stderr.write(util.format(error) + "\n");
      if ((error as Error & { code?: string }).code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to generate plan' });
    }
  }

  async completeTask(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { taskId } = req.params;
      const updatedTask = await plannerService.completeTask(userId, taskId);
      res.json(updatedTask);
    } catch (error: unknown) {
      process.stderr.write(util.format(error) + "\n");
      if ((error as Error & { code?: string }).code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to complete task' });
    }
  }

  async getHistory(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const history = await plannerService.getHistory(userId);
      res.json(history);
    } catch (error: unknown) {
      process.stderr.write(util.format(error) + "\n");
      if ((error as Error & { code?: string }).code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to fetch history' });
    }
  }
}
