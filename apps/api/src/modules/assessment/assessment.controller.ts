import { Request, Response } from 'express';
import { AssessmentService } from './assessment.service';

const assessmentService = new AssessmentService();

export class AssessmentController {
  
  async getAssessments(req: Request, res: Response) {
    try {
      const assessments = await assessmentService.getAssessments();
      res.json(assessments);
    } catch (e: any) {
      console.error(e);
      if (e.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: e.message });
    }
  }

  async getAssessment(req: Request, res: Response) {
    try {
      const assessment = await assessmentService.getAssessment(req.params.id);
      res.json(assessment);
    } catch (e: any) {
      console.error(e);
      if (e.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: e.message });
    }
  }

  async startAttempt(req: Request, res: Response) {
    try {
      // Mock auth for now
      const userId = '66eb4b14d5162a84cc7852a1'; 
      const attempt = await assessmentService.startAttempt(req.params.id, userId);
      res.json(attempt);
    } catch (e: any) {
      console.error(e);
      if (e.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: e.message });
    }
  }

  async getActiveAttempt(req: Request, res: Response) {
    try {
      const userId = '66eb4b14d5162a84cc7852a1';
      // The startAttempt logic acts as get or create active attempt.
      const attempt = await assessmentService.startAttempt(req.params.id, userId);
      res.json(attempt);
    } catch (e: any) {
      console.error(e);
      if (e.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: e.message });
    }
  }

  async getAttempt(req: Request, res: Response) {
    try {
      const userId = '66eb4b14d5162a84cc7852a1'; 
      const attempt = await assessmentService.getAttempt(req.params.attemptId, userId);
      res.json(attempt);
    } catch (e: any) {
      console.error(e);
      if (e.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: e.message });
    }
  }

  async recordProblemResult(req: Request, res: Response) {
    try {
      const userId = '66eb4b14d5162a84cc7852a1'; 
      const { problemId, status, hintsUsed, timeSpent } = req.body;
      const result = await assessmentService.recordProblemResult(
        req.params.attemptId, 
        userId, 
        problemId, 
        status, 
        hintsUsed, 
        timeSpent
      );
      res.json(result);
    } catch (e: any) {
      console.error(e);
      if (e.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: e.message });
    }
  }

  async submitAttempt(req: Request, res: Response) {
    try {
      const userId = '66eb4b14d5162a84cc7852a1'; 
      const attempt = await assessmentService.submitAttempt(req.params.attemptId, userId);
      res.json(attempt);
    } catch (e: any) {
      console.error(e);
      if (e.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: e.message });
    }
  }

  async getUserHistory(req: Request, res: Response) {
    try {
      const userId = '66eb4b14d5162a84cc7852a1'; 
      const history = await assessmentService.getUserHistory(userId);
      res.json(history);
    } catch (e: any) {
      console.error(e);
      if (e.code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: e.message });
    }
  }
}
