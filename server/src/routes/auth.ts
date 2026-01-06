// Authentication routes
import { Router } from 'express';
import passport from 'passport';
import { getCurrentUser, googleCallback, logout } from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = Router();

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  googleCallback
);

// Get current user
router.get('/me', isAuthenticated, getCurrentUser);

// Logout
router.post('/logout', isAuthenticated, logout);

export default router;
