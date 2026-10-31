import * as util from 'util';
import { Request, Response } from 'express';
import { ProjectService } from './project.service';

const projectService = new ProjectService();

export class ProjectController {
  async getProjects(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const projects = await projectService.getProjects(userId);
      res.json(projects);
    } catch (error: unknown) {
      process.stderr.write(util.format(error) + "\n");
      if ((error as Error & { code?: string }).code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  }

  async getProjectBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const userId = req.user!.id;
      const project = await projectService.getProjectBySlug(slug, userId);
      res.json(project);
    } catch (error: unknown) {
      process.stderr.write(util.format(error) + "\n");
      if (((error as Error).message || String(error)) === 'Project not found') return res.status(404).json({ error: ((error as Error).message || String(error)) });
      if ((error as Error & { code?: string }).code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to fetch project' });
    }
  }

  async updateProjectState(req: Request, res: Response) {
    try {
      const { projectId } = req.params;
      const userId = req.user!.id;
      const result = await projectService.updateProjectState(userId, projectId, req.body);
      res.json(result);
    } catch (error: unknown) {
      process.stderr.write(util.format(error) + "\n");
      if ((error as Error & { code?: string }).code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to update project state' });
    }
  }

  async updateTaskState(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const userId = req.user!.id;
      const result = await projectService.updateTaskState(userId, taskId, req.body);
      res.json(result);
    } catch (error: unknown) {
      process.stderr.write(util.format(error) + "\n");
      if ((error as Error & { code?: string }).code === 'P2023') {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Failed to update task state' });
    }
  }

  // REVIEW AND DEFENSE ENDPOINTS
  async submitProject(req: Request, res: Response) {
    try {
      const { projectId } = req.params;
      const userId = req.user!.id;
      const { ProjectReviewService } = await import('./project-review.service');
      const reviewService = new ProjectReviewService();
      const submission = await reviewService.submitProject(userId, projectId, req.body);
      res.json(submission);
    } catch (error: unknown) {
      process.stderr.write(util.format(error) + "\n");
      res.status(500).json({ error: 'Failed to submit project' });
    }
  }

  async createReview(req: Request, res: Response) {
    try {
      const { submissionId } = req.params;
      const { status, findings } = req.body;
      const { ProjectReviewService } = await import('./project-review.service');
      const reviewService = new ProjectReviewService();
      const review = await reviewService.createReview(submissionId, status, findings);
      res.json(review);
    } catch (error: unknown) {
      process.stderr.write(util.format(error) + "\n");
      res.status(500).json({ error: 'Failed to create review' });
    }
  }

  async startDefense(req: Request, res: Response) {
    try {
      const { submissionId } = req.params;
      const userId = req.user!.id;
      const { type } = req.body;
      const { ProjectReviewService } = await import('./project-review.service');
      const reviewService = new ProjectReviewService();
      const defense = await reviewService.startDefense(submissionId, userId, type);
      res.json(defense);
    } catch (error: unknown) {
      process.stderr.write(util.format(error) + "\n");
      res.status(500).json({ error: 'Failed to start defense' });
    }
  }

  async verifyDefense(req: Request, res: Response) {
    try {
      const { defenseId } = req.params;
      const { passed } = req.body;
      const { ProjectReviewService } = await import('./project-review.service');
      const reviewService = new ProjectReviewService();
      const defense = await reviewService.verifyDefense(defenseId, passed);
      res.json(defense);
    } catch (error: unknown) {
      process.stderr.write(util.format(error) + "\n");
      res.status(500).json({ error: 'Failed to verify defense' });
    }
  }
}
