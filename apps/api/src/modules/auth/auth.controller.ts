import * as util from 'util';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.register(email, password);
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
}
