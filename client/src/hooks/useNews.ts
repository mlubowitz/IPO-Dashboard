// Custom hook for fetching news with React Query
import { useQuery } from '@tanstack/react-query';
import { newsApi } from '../services/api';

export function useMarketNews(query?: string, limit: number = 10) {
  return useQuery({
    queryKey: ['market-news', query, limit],
    queryFn: () => newsApi.getMarketNews(query, limit),
    staleTime: 1000 * 60 * 15, // 15 minutes
    refetchOnWindowFocus: false,
  });
}

export function useHeadlines(limit: number = 10) {
  return useQuery({
    queryKey: ['headlines', limit],
    queryFn: () => newsApi.getHeadlines(limit),
    staleTime: 1000 * 60 * 15, // 15 minutes
    refetchOnWindowFocus: false,
  });
}
