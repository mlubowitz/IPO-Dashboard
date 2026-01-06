// Database abstraction layer - supports both Prisma and JSON storage
import type { User, Favorite } from '../types/index.js';
import { userStorage, favoriteStorage } from './jsonStorage.js';

const USE_JSON_STORAGE = process.env.USE_JSON_STORAGE === 'true';

// Conditional Prisma import (only if not using JSON storage)
let prisma: any = null;
if (!USE_JSON_STORAGE) {
  try {
    const { PrismaClient } = await import('@prisma/client');
    prisma = new PrismaClient();
  } catch (error) {
    console.warn('Prisma not available, falling back to JSON storage');
  }
}

// Database operations interface
export const db = {
  user: {
    async findByGoogleId(googleId: string): Promise<User | null> {
      if (USE_JSON_STORAGE || !prisma) {
        return userStorage.findByGoogleId(googleId);
      }
      return prisma.user.findUnique({ where: { googleId } });
    },

    async findById(id: string): Promise<User | null> {
      if (USE_JSON_STORAGE || !prisma) {
        return userStorage.findById(id);
      }
      return prisma.user.findUnique({ where: { id } });
    },

    async create(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
      if (USE_JSON_STORAGE || !prisma) {
        return userStorage.create(userData);
      }
      return prisma.user.create({ data: userData });
    },

    async findOrCreate(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
      if (USE_JSON_STORAGE || !prisma) {
        return userStorage.findOrCreate(userData);
      }

      const existingUser = await prisma.user.findUnique({
        where: { googleId: userData.googleId },
      });

      if (existingUser) {
        return existingUser;
      }

      return prisma.user.create({ data: userData });
    },
  },

  favorite: {
    async findByUserId(userId: string): Promise<Favorite[]> {
      if (USE_JSON_STORAGE || !prisma) {
        return favoriteStorage.findByUserId(userId);
      }
      return prisma.favorite.findMany({ where: { userId } });
    },

    async findByUserAndSymbol(userId: string, symbol: string): Promise<Favorite | null> {
      if (USE_JSON_STORAGE || !prisma) {
        return favoriteStorage.findByUserAndSymbol(userId, symbol);
      }
      return prisma.favorite.findUnique({
        where: { userId_companySymbol: { userId, companySymbol: symbol } },
      });
    },

    async create(favoriteData: Omit<Favorite, 'id' | 'addedAt'>): Promise<Favorite> {
      if (USE_JSON_STORAGE || !prisma) {
        return favoriteStorage.create(favoriteData);
      }
      return prisma.favorite.create({ data: favoriteData });
    },

    async delete(userId: string, symbol: string): Promise<boolean> {
      if (USE_JSON_STORAGE || !prisma) {
        return favoriteStorage.delete(userId, symbol);
      }

      try {
        await prisma.favorite.delete({
          where: { userId_companySymbol: { userId, companySymbol: symbol } },
        });
        return true;
      } catch (error) {
        return false;
      }
    },

    async deleteById(id: string): Promise<boolean> {
      if (USE_JSON_STORAGE || !prisma) {
        return favoriteStorage.deleteById(id);
      }

      try {
        await prisma.favorite.delete({ where: { id } });
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};

export default db;
