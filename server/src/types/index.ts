// Type definitions for the IPO Dashboard server

export interface User {
  id: string;
  googleId: string;
  email: string;
  name: string | null;
  createdAt: Date;
}

export interface Favorite {
  id: string;
  userId: string;
  companySymbol: string;
  companyName: string;
  ipoDate: Date;
  addedAt: Date;
}

export interface IPOData {
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

export interface SessionUser {
  id: string;
  googleId: string;
  email: string;
  name: string | null;
}

// Extend Express Request type
declare global {
  namespace Express {
    interface User extends SessionUser {}
  }
}
