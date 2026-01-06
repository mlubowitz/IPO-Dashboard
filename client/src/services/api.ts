// API service for making HTTP requests to the backend
import axios from 'axios';
import type { User, IPO, CompanyProfile, NewsArticle, Favorite, ApiResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || '/api';

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const authApi = {
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const response = await api.get<ApiResponse<User>>('/auth/me');
      return response.data.data || null;
    } catch (error) {
      return null;
    }
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  loginWithGoogle: (): void => {
    window.location.href = `${API_URL}/auth/google`;
  },
};

// IPO API
export const ipoApi = {
  getIPOs: async (from: string, to: string): Promise<IPO[]> => {
    const response = await api.get<ApiResponse<IPO[]>>('/ipos', {
      params: { from, to },
    });
    return response.data.data || [];
  },

  getCompanyDetails: async (symbol: string): Promise<CompanyProfile | null> => {
    try {
      const response = await api.get<ApiResponse<CompanyProfile>>(`/ipos/company/${symbol}`);
      return response.data.data || null;
    } catch (error) {
      console.error('Error fetching company details:', error);
      return null;
    }
  },

  getCompanyNews: async (companyName: string): Promise<NewsArticle[]> => {
    try {
      const response = await api.get<ApiResponse<NewsArticle[]>>('/ipos/company-news', {
        params: { companyName },
      });
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching company news:', error);
      return [];
    }
  },
};

// News API
export const newsApi = {
  getMarketNews: async (query?: string, limit: number = 10): Promise<NewsArticle[]> => {
    try {
      const response = await api.get<ApiResponse<NewsArticle[]>>('/news/market', {
        params: { query, limit },
      });
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching market news:', error);
      return [];
    }
  },

  getHeadlines: async (limit: number = 10): Promise<NewsArticle[]> => {
    try {
      const response = await api.get<ApiResponse<NewsArticle[]>>('/news/headlines', {
        params: { limit },
      });
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching headlines:', error);
      return [];
    }
  },
};

// Favorites API
export const favoritesApi = {
  getFavorites: async (): Promise<Favorite[]> => {
    try {
      const response = await api.get<ApiResponse<Favorite[]>>('/favorites');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }
  },

  addFavorite: async (
    companySymbol: string,
    companyName: string,
    ipoDate: string
  ): Promise<Favorite | null> => {
    try {
      const response = await api.post<ApiResponse<Favorite>>('/favorites', {
        companySymbol,
        companyName,
        ipoDate,
      });
      return response.data.data || null;
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  },

  removeFavorite: async (symbol: string): Promise<boolean> => {
    try {
      await api.delete(`/favorites/${symbol}`);
      return true;
    } catch (error) {
      console.error('Error removing favorite:', error);
      return false;
    }
  },
};

export default api;
