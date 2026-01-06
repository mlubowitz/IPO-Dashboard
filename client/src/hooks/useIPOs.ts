// Custom hook for fetching IPO data with React Query
import { useQuery } from '@tanstack/react-query';
import { ipoApi } from '../services/api';
import { getDateRange } from '../utils/date';

export function useIPOs(months: number = 24) {
  const { from, to } = getDateRange(months);

  return useQuery({
    queryKey: ['ipos', from, to],
    queryFn: () => ipoApi.getIPOs(from, to),
    staleTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
  });
}

export function useCompanyDetails(symbol: string) {
  return useQuery({
    queryKey: ['company', symbol],
    queryFn: () => ipoApi.getCompanyDetails(symbol),
    enabled: !!symbol,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useCompanyNews(companyName: string) {
  return useQuery({
    queryKey: ['company-news', companyName],
    queryFn: () => ipoApi.getCompanyNews(companyName),
    enabled: !!companyName,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}
