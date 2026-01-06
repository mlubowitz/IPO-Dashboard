// Type definitions for the IPO Dashboard client

export interface User {
  id: string;
  googleId: string;
  email: string;
  name: string | null;
}

export interface IPO {
  symbol: string;
  name: string;
  ipoDate: string;
  priceRangeLow?: number;
  priceRangeHigh?: number;
  currency?: string;
  exchange?: string;
  status?: string;
  shares?: number;
  totalSharesValue?: number;
}

export interface CompanyProfile {
  symbol: string;
  name: string;
  country?: string;
  currency?: string;
  exchange?: string;
  ipo?: string;
  marketCapitalization?: number;
  phone?: string;
  shareOutstanding?: number;
  ticker?: string;
  weburl?: string;
  logo?: string;
  finnhubIndustry?: string;
}

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface Favorite {
  id: string;
  userId: string;
  companySymbol: string;
  companyName: string;
  ipoDate: string;
  addedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}
