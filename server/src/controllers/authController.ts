// Authentication controller
import { Request, Response } from 'express';

/**
 * Get current user information
 */
export function getCurrentUser(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated',
    });
  }

  res.json({
    success: true,
    user: req.user,
  });
}

/**
 * Handle Google OAuth callback
 */
export function googleCallback(req: Request, res: Response) {
  // Redirect to client after successful authentication
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  res.redirect(`${clientUrl}/auth/success`);
}

/**
 * Logout user
 */
export function logout(req: Request, res: Response) {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error logging out',
      });
    }

    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  });
}
