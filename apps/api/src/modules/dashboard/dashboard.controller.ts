import { Request, Response } from 'express';
import { DashboardService } from './dashboard.service';
import * as util from 'util';

const dashboardService = new DashboardService();

export class DashboardController {
  async getDashboard(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const data = await dashboardService.getDashboard(userId);
      res.json(data);
    } catch (error: unknown) {
      process.stderr.write(util.format(error) + '\n');
      res.status(500).json({ error: 'Failed to fetch dashboard aggregation' });
    }
  }
}
