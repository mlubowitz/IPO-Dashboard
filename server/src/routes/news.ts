// News routes
import { Router } from 'express';
import { getMarketNewsController, getHeadlines } from '../controllers/newsController.js';

const router = Router();

// Get market news
router.get('/market', getMarketNewsController);

// Get business headlines
router.get('/headlines', getHeadlines);

export default router;
