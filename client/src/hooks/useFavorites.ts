// Custom hook for managing favorites
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { favoritesApi } from '../services/api';
import { useFavoritesStore } from '../store/favoritesStore';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export function useFavorites() {
  const queryClient = useQueryClient();
  const { setFavorites, addFavorite: addToStore, removeFavorite: removeFromStore } = useFavoritesStore();
  const { isAuthenticated } = useAuthStore();

  const query = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const favorites = await favoritesApi.getFavorites();
      setFavorites(favorites);
      return favorites;
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const addMutation = useMutation({
    mutationFn: (data: { companySymbol: string; companyName: string; ipoDate: string }) =>
      favoritesApi.addFavorite(data.companySymbol, data.companyName, data.ipoDate),
    onSuccess: (data) => {
      if (data) {
        addToStore(data);
        queryClient.invalidateQueries({ queryKey: ['favorites'] });
        toast.success('Added to favorites');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to add to favorites');
    },
  });

  const removeMutation = useMutation({
    mutationFn: (symbol: string) => favoritesApi.removeFavorite(symbol),
    onSuccess: (_, symbol) => {
      removeFromStore(symbol);
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast.success('Removed from favorites');
    },
    onError: () => {
      toast.error('Failed to remove from favorites');
    },
  });

  return {
    favorites: query.data || [],
    isLoading: query.isLoading,
    addFavorite: addMutation.mutate,
    removeFavorite: removeMutation.mutate,
    isAddingFavorite: addMutation.isPending,
    isRemovingFavorite: removeMutation.isPending,
  };
}
