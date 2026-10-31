import * as util from 'util';
import { Request, Response } from 'express';
import { AssessmentService } from './assessment.service';

const assessmentService = new AssessmentService();

export class AssessmentController {
  
  async getAssessments(req: Request, res: Response) {
    try {
      const assessments = await assessmentService.getAssessments();
      res.json(assessments);
    } catch (e: unknown) {
      process.stderr.write(util.format(e) + "\n");
      if ((e as Error & { code?: string }).code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to fetch assessments' });
    }
  }

  async getAssessment(req: Request, res: Response) {
    try {
      const assessment = await assessmentService.getAssessment(req.params.id);
      res.json(assessment);
    } catch (e: unknown) {
      process.stderr.write(util.format(e) + "\n");
      if ((e as Error & { code?: string }).code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to fetch assessment' });
    }
  }

  async startAttempt(req: Request, res: Response) {
    try {

      const userId = req.user!.id; 
      const attempt = await assessmentService.startAttempt(req.params.id, userId);
      res.json(attempt);
    } catch (e: unknown) {
      process.stderr.write(util.format(e) + "\n");
      if ((e as Error & { code?: string }).code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to start attempt' });
    }
  }

  async getActiveAttempt(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      // The startAttempt logic acts as get or create active attempt.
      const attempt = await assessmentService.startAttempt(req.params.id, userId);
      res.json(attempt);
    } catch (e: unknown) {
      process.stderr.write(util.format(e) + "\n");
      if ((e as Error & { code?: string }).code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to get active attempt' });
    }
  }

  async getAttempt(req: Request, res: Response) {
    try {
      const userId = req.user!.id; 
      const attempt = await assessmentService.getAttempt(req.params.attemptId, userId);
      res.json(attempt);
    } catch (e: unknown) {
      process.stderr.write(util.format(e) + "\n");
      if ((e as Error & { code?: string }).code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to get attempt' });
    }
  }

  async recordProblemResult(req: Request, res: Response) {
    try {
      const userId = req.user!.id; 
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
    } catch (e: unknown) {
      process.stderr.write(util.format(e) + "\n");
      if ((e as Error & { code?: string }).code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to record problem result' });
    }
  }

  async submitAttempt(req: Request, res: Response) {
    try {
      const userId = req.user!.id; 
      const attempt = await assessmentService.submitAttempt(req.params.attemptId, userId);
      res.json(attempt);
    } catch (e: unknown) {
      process.stderr.write(util.format(e) + "\n");
      if ((e as Error & { code?: string }).code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to submit attempt' });
    }
  }

  async getUserHistory(req: Request, res: Response) {
    try {
      const userId = req.user!.id; 
      const history = await assessmentService.getUserHistory(userId);
      res.json(history);
    } catch (e: unknown) {
      process.stderr.write(util.format(e) + "\n");
      if ((e as Error & { code?: string }).code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to get user history' });
    }
  }
}
