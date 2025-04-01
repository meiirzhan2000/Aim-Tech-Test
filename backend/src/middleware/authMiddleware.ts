import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// Protect routes middleware
export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    
    // Get token from Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    // Check if token exists
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Not authorized, no token provided'
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { id: string };
    
    // Attach user ID to request
    req.userId = decoded.id;
    
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Not authorized, invalid token'
    });
  }
};