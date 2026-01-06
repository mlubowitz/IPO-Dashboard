// News controller
import { Request, Response } from 'express';
import { getMarketNews, getBusinessHeadlines } from '../services/news.js';

/**
 * Get general market and IPO news
 */
export async function getMarketNewsController(req: Request, res: Response) {
  try {
    const { query, limit } = req.query;
    const pageSize = limit ? parseInt(limit as string, 10) : 10;

    const news = await getMarketNews(query as string | undefined, pageSize);

    res.json({
      success: true,
      data: news,
      count: news.length,
    });
  } catch (error) {
    console.error('Error in getMarketNews:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch market news',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Get business headlines
 */
export async function getHeadlines(req: Request, res: Response) {
  try {
    const { limit } = req.query;
    const pageSize = limit ? parseInt(limit as string, 10) : 10;

    const news = await getBusinessHeadlines(pageSize);

    res.json({
      success: true,
      data: news,
      count: news.length,
    });
  } catch (error) {
    console.error('Error in getHeadlines:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch headlines',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
