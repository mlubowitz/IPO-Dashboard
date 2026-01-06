// Favorites routes
import { Router } from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoritesController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = Router();

// All favorite routes require authentication
router.use(isAuthenticated);

// Get all favorites
router.get('/', getFavorites);

// Add to favorites
router.post('/', addFavorite);

// Remove from favorites
router.delete('/:symbol', removeFavorite);

export default router;
