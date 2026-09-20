import { Request, Response } from 'express';
import { ContributionService } from './contribution.service';

const contributionService = new ContributionService();

export class ContributionController {
  async getContributions(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const contributions = await contributionService.getContributions(userId);
      res.json(contributions);
    } catch (error: any) {
      console.error(error);
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to fetch contributions' });
    }
  }

  async getContribution(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user!.id;
      const contribution = await contributionService.getContribution(userId, id);
      res.json(contribution);
    } catch (error: any) {
      console.error(error);
      if (error.message === 'Contribution not found') return res.status(404).json({ error: error.message });
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to fetch contribution' });
    }
  }

  async createContribution(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const contribution = await contributionService.createContribution(userId, req.body);
      res.json(contribution);
    } catch (error: any) {
      console.error(error);
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to create contribution' });
    }
  }

  async updateContribution(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user!.id;
      const contribution = await contributionService.updateContribution(userId, id, req.body);
      res.json(contribution);
    } catch (error: any) {
      console.error(error);
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to update contribution' });
    }
  }

  async updateTaskStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { taskId } = req.params;
      const userId = req.user!.id;
      const { status } = req.body;
      const task = await contributionService.updateTaskStatus(userId, taskId, status);
      res.json(task);
    } catch (error: any) {
      console.error(error);
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to update task status' });
    }
  }
}
