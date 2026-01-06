// Favorites controller
import { Request, Response } from 'express';
import db from '../models/db.js';

/**
 * Get all favorites for the current user
 */
export async function getFavorites(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const favorites = await db.favorite.findByUserId(req.user.id);

    res.json({
      success: true,
      data: favorites,
      count: favorites.length,
    });
  } catch (error) {
    console.error('Error in getFavorites:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch favorites',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Add a company to favorites
 * Body: { companySymbol, companyName, ipoDate }
 */
export async function addFavorite(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const { companySymbol, companyName, ipoDate } = req.body;

    if (!companySymbol || !companyName || !ipoDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide companySymbol, companyName, and ipoDate',
      });
    }

    // Check if already favorited
    const existing = await db.favorite.findByUserAndSymbol(req.user.id, companySymbol);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Company already in favorites',
      });
    }

    const favorite = await db.favorite.create({
      userId: req.user.id,
      companySymbol,
      companyName,
      ipoDate: new Date(ipoDate),
    });

    res.status(201).json({
      success: true,
      data: favorite,
      message: 'Added to favorites',
    });
  } catch (error) {
    console.error('Error in addFavorite:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add favorite',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Remove a company from favorites
 * Params: symbol
 */
export async function removeFavorite(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const { symbol } = req.params;

    if (!symbol) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a symbol',
      });
    }

    const deleted = await db.favorite.delete(req.user.id, symbol);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found',
      });
    }

    res.json({
      success: true,
      message: 'Removed from favorites',
    });
  } catch (error) {
    console.error('Error in removeFavorite:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove favorite',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
