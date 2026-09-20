import { Request, Response } from 'express';
import { MentorService } from './mentor.service';

const mentorService = new MentorService();

export class MentorController {
  async getContext(req: Request, res: Response) {
    try {
      // Mock user for now
      const userId = req.user!.id;
      const context = await mentorService.getContext(userId);
      res.json(context);
    } catch (error: any) {
      console.error(error);
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to fetch mentor context' });
    }
  }

  async chat(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const response = await mentorService.chat(userId, message);
      res.json(response);
    } catch (error: any) {
      console.error(error);
      if (error.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to process chat message' });
    }
  }
}
