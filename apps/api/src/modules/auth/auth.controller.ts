import * as util from 'util';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName, target } = req.body;
      const result = await authService.register(email, password, firstName, lastName, target);
      res.status(201).json(result);
    } catch (error: unknown) {
      process.stderr.write(util.format('[AuthController.register]', error) + "\n");
      if (((error as Error).message || String(error)) === 'Email and password are required' || ((error as Error).message || String(error)) === 'User already exists') {
        return res.status(400).json({ error: ((error as Error).message || String(error)) });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json(result);
    } catch (error: unknown) {
      process.stderr.write(util.format('[AuthController.login]', error) + "\n");
      if (((error as Error).message || String(error)) === 'Invalid credentials' || ((error as Error).message || String(error)) === 'Email and password are required') {
        return res.status(401).json({ error: ((error as Error).message || String(error)) });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getMe(req: Request, res: Response) {
    try {
      const userId = req.user?.id || '66324d081a95e74e6fcf2288';
      const user = await authService.getMe(userId);
      res.json(user);
    } catch (error: unknown) {
      process.stderr.write(util.format('[AuthController.getMe]', error) + "\n");
      res.status(500).json({ error: 'Failed to fetch user profile' });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.id || '66324d081a95e74e6fcf2288';
      const profile = await authService.updateProfile(userId, req.body);
      res.json(profile);
    } catch (error: unknown) {
      process.stderr.write(util.format('[AuthController.updateProfile]', error) + "\n");
      res.status(500).json({ error: 'Failed to update profile' });
    }
  }
}

