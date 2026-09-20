import { Request, Response } from 'express';
import { CareerService } from './career.service';

const careerService = new CareerService();

export class CareerController {
  async getDashboard(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const data = await careerService.getCareerDashboard(userId);
      res.json(data);
    } catch (error: any) {
      console.error(error);
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to fetch career dashboard' });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const result = await careerService.updateCareerProfile(userId, req.body);
      res.json(result);
    } catch (error: any) {
      console.error(error);
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to update career profile' });
    }
  }

  async getApplications(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const apps = await careerService.getApplications(userId);
      res.json(apps);
    } catch (error: any) {
      console.error(error);
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to fetch applications' });
    }
  }

  async getApplication(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user!.id;
      const app = await careerService.getApplication(id, userId);
      res.json(app);
    } catch (error: any) {
      console.error(error);
      if (error.message === 'Application not found') return res.status(404).json({ error: error.message });
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to fetch application' });
    }
  }

  async createApplication(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const result = await careerService.createApplication(userId, req.body);
      res.json(result);
    } catch (error: any) {
      console.error(error);
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to create application' });
    }
  }

  async updateApplication(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user!.id;
      const result = await careerService.updateApplication(userId, id, req.body);
      res.json(result);
    } catch (error: any) {
      console.error(error);
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to update application' });
    }
  }
}
