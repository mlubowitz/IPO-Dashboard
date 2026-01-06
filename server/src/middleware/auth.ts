// Authentication middleware
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to check if user is authenticated
 * Protects routes that require login
 */
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).json({
    success: false,
    message: 'Unauthorized. Please log in.',
  });
}

/**
 * Middleware to check if user is NOT authenticated
 * For routes that should only be accessible to non-logged-in users
 */
export function isNotAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    return next();
  }

  res.status(403).json({
    success: false,
    message: 'Already authenticated.',
  });
}
