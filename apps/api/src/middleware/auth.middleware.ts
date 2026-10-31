import * as util from 'util';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request interface to include user
declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
    };
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      process.stderr.write(util.format('JWT_SECRET is missing from environment') + "\n");
      return res.status(500).json({ error: 'Internal server error' });
    }

    const decoded = jwt.verify(token, secret) as { id: string };
    
    // Attach user to request context
    req.user = { id: decoded.id };
    
    next();
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized - Token expired' });
    }
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};
