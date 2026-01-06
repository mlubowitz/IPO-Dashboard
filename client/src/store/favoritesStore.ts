// Zustand store for favorites
import { create } from 'zustand';
import type { Favorite } from '../types';

interface FavoritesState {
  favorites: Favorite[];
  setFavorites: (favorites: Favorite[]) => void;
  addFavorite: (favorite: Favorite) => void;
  removeFavorite: (symbol: string) => void;
  isFavorite: (symbol: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  setFavorites: (favorites) => set({ favorites }),

  addFavorite: (favorite) =>
    set((state) => ({
      favorites: [...state.favorites, favorite],
    })),

  removeFavorite: (symbol) =>
    set((state) => ({
      favorites: state.favorites.filter((f) => f.companySymbol !== symbol),
    })),

  isFavorite: (symbol) => {
    const { favorites } = get();
    return favorites.some((f) => f.companySymbol === symbol);
  },
}));
