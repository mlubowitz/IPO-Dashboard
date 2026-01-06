// IPO data controller
import { Request, Response } from 'express';
import { getIPOCalendar, getCompanyProfile } from '../services/finnhub.js';
import { getCompanySpecificNews } from '../services/news.js';

/**
 * Get IPO calendar data
 * Query params: from (YYYY-MM-DD), to (YYYY-MM-DD)
 */
export async function getIPOs(req: Request, res: Response) {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: 'Please provide from and to dates (YYYY-MM-DD)',
      });
    }

    const ipos = await getIPOCalendar(from as string, to as string);

    res.json({
      success: true,
      data: ipos,
      count: ipos.length,
    });
  } catch (error) {
    console.error('Error in getIPOs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch IPO data',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Get company details by symbol
 * Params: symbol
 */
export async function getCompanyDetails(req: Request, res: Response) {
  try {
    const { symbol } = req.params;

    if (!symbol) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a company symbol',
      });
    }

    const profile = await getCompanyProfile(symbol);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Company not found',
      });
    }

    res.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error('Error in getCompanyDetails:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch company details',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Get company-specific news
 * Params: symbol or companyName
 */
export async function getCompanyNews(req: Request, res: Response) {
  try {
    const { companyName } = req.query;

    if (!companyName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a company name',
      });
    }

    const news = await getCompanySpecificNews(companyName as string);

    res.json({
      success: true,
      data: news,
      count: news.length,
    });
  } catch (error) {
    console.error('Error in getCompanyNews:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch company news',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
