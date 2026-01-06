// IPO routes
import { Router } from 'express';
import { getIPOs, getCompanyDetails, getCompanyNews } from '../controllers/ipoController.js';

const router = Router();

// Get IPO calendar
router.get('/', getIPOs);

// Get company details
router.get('/company/:symbol', getCompanyDetails);

// Get company-specific news
router.get('/company-news', getCompanyNews);

export default router;
