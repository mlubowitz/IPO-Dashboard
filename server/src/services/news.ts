// NewsAPI service for market news
import axios from 'axios';
import type { NewsArticle } from '../types/index.js';

const NEWS_API_KEY = process.env.NEWS_API_KEY || '';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

const newsClient = axios.create({
  baseURL: NEWS_API_BASE_URL,
  headers: {
    'X-Api-Key': NEWS_API_KEY,
  },
});

/**
 * Fetch general IPO and market news
 * @param query Search query (defaults to IPO-related terms)
 * @param pageSize Number of articles to fetch (max 100)
 */
export async function getMarketNews(
  query: string = 'IPO OR "initial public offering" OR stock market',
  pageSize: number = 10
): Promise<NewsArticle[]> {
  try {
    const response = await newsClient.get('/everything', {
      params: {
        q: query,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize,
      },
    });

    return response.data?.articles || [];
  } catch (error) {
    console.error('Error fetching market news:', error);
    return [];
  }
}

/**
 * Fetch company-specific news
 * @param companyName Name of the company
 * @param pageSize Number of articles to fetch
 */
export async function getCompanySpecificNews(
  companyName: string,
  pageSize: number = 5
): Promise<NewsArticle[]> {
  try {
    const response = await newsClient.get('/everything', {
      params: {
        q: companyName,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize,
      },
    });

    return response.data?.articles || [];
  } catch (error) {
    console.error(`Error fetching news for ${companyName}:`, error);
    return [];
  }
}

/**
 * Fetch top business headlines
 * @param pageSize Number of articles to fetch
 */
export async function getBusinessHeadlines(pageSize: number = 10): Promise<NewsArticle[]> {
  try {
    const response = await newsClient.get('/top-headlines', {
      params: {
        category: 'business',
        language: 'en',
        country: 'us',
        pageSize,
      },
    });

    return response.data?.articles || [];
  } catch (error) {
    console.error('Error fetching business headlines:', error);
    return [];
  }
}
