// Finnhub API service for IPO data
import axios from 'axios';
import type { IPOData, CompanyProfile } from '../types/index.js';

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY || '';
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

const finnhubClient = axios.create({
  baseURL: FINNHUB_BASE_URL,
  params: {
    token: FINNHUB_API_KEY,
  },
});

/**
 * Fetch IPO calendar data from Finnhub
 * @param from Start date (YYYY-MM-DD)
 * @param to End date (YYYY-MM-DD)
 */
export async function getIPOCalendar(from: string, to: string): Promise<IPOData[]> {
  try {
    console.log(`[Finnhub] Fetching IPO calendar from ${from} to ${to}`);

    const response = await finnhubClient.get('/calendar/ipo', {
      params: { from, to },
    });

    console.log('[Finnhub] Raw response data:', JSON.stringify(response.data).substring(0, 200));

    // Finnhub returns { ipoCalendar: [...] }
    const ipoCalendar = response.data?.ipoCalendar || [];

    console.log(`[Finnhub] Found ${ipoCalendar.length} IPOs in calendar`);

    // Transform to our IPOData format
    const ipos: IPOData[] = ipoCalendar.map((ipo: any) => ({
      symbol: ipo.symbol || '',
      name: ipo.name || '',
      ipoDate: ipo.date || '',
      priceRangeLow: ipo.priceRangeLow || undefined,
      priceRangeHigh: ipo.priceRangeHigh || undefined,
      currency: ipo.currency || 'USD',
      exchange: ipo.exchange || '',
      status: ipo.status || '',
      shares: ipo.numberOfShares || undefined,
      totalSharesValue: ipo.totalSharesValue || undefined,
    }));

    console.log(`[Finnhub] Returning ${ipos.length} transformed IPOs`);
    return ipos;
  } catch (error) {
    console.error('Error fetching IPO calendar:', error);
    throw new Error('Failed to fetch IPO data from Finnhub');
  }
}

/**
 * Fetch company profile from Finnhub
 * @param symbol Company stock symbol
 */
export async function getCompanyProfile(symbol: string): Promise<CompanyProfile | null> {
  try {
    const response = await finnhubClient.get('/stock/profile2', {
      params: { symbol },
    });

    if (!response.data || Object.keys(response.data).length === 0) {
      return null;
    }

    const profile: CompanyProfile = {
      symbol: response.data.ticker || symbol,
      name: response.data.name || '',
      country: response.data.country || undefined,
      currency: response.data.currency || undefined,
      exchange: response.data.exchange || undefined,
      ipo: response.data.ipo || undefined,
      marketCapitalization: response.data.marketCapitalization || undefined,
      phone: response.data.phone || undefined,
      shareOutstanding: response.data.shareOutstanding || undefined,
      ticker: response.data.ticker || undefined,
      weburl: response.data.weburl || undefined,
      logo: response.data.logo || undefined,
      finnhubIndustry: response.data.finnhubIndustry || undefined,
    };

    return profile;
  } catch (error) {
    console.error(`Error fetching company profile for ${symbol}:`, error);
    return null;
  }
}

/**
 * Fetch company news from Finnhub
 * @param symbol Company stock symbol
 * @param from Start date (YYYY-MM-DD)
 * @param to End date (YYYY-MM-DD)
 */
export async function getCompanyNews(symbol: string, from: string, to: string) {
  try {
    const response = await finnhubClient.get('/company-news', {
      params: { symbol, from, to },
    });

    return response.data || [];
  } catch (error) {
    console.error(`Error fetching company news for ${symbol}:`, error);
    return [];
  }
}
