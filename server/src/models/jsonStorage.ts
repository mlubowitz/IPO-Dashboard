// JSON file storage for development (alternative to Prisma/PostgreSQL)
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import type { User, Favorite } from '../types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const FAVORITES_FILE = path.join(DATA_DIR, 'favorites.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

// Read JSON file
async function readJSONFile<T>(filePath: string): Promise<T[]> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist, return empty array
    return [];
  }
}

// Write JSON file
async function writeJSONFile<T>(filePath: string, data: T[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// User operations
export const userStorage = {
  async findByGoogleId(googleId: string): Promise<User | null> {
    const users = await readJSONFile<User>(USERS_FILE);
    return users.find(u => u.googleId === googleId) || null;
  },

  async findById(id: string): Promise<User | null> {
    const users = await readJSONFile<User>(USERS_FILE);
    return users.find(u => u.id === id) || null;
  },

  async create(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const users = await readJSONFile<User>(USERS_FILE);
    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...userData,
      createdAt: new Date(),
    };
    users.push(newUser);
    await writeJSONFile(USERS_FILE, users);
    return newUser;
  },

  async findOrCreate(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const existingUser = await this.findByGoogleId(userData.googleId);
    if (existingUser) {
      return existingUser;
    }
    return this.create(userData);
  },
};

// Favorite operations
export const favoriteStorage = {
  async findByUserId(userId: string): Promise<Favorite[]> {
    const favorites = await readJSONFile<Favorite>(FAVORITES_FILE);
    return favorites.filter(f => f.userId === userId);
  },

  async findByUserAndSymbol(userId: string, symbol: string): Promise<Favorite | null> {
    const favorites = await readJSONFile<Favorite>(FAVORITES_FILE);
    return favorites.find(f => f.userId === userId && f.companySymbol === symbol) || null;
  },

  async create(favoriteData: Omit<Favorite, 'id' | 'addedAt'>): Promise<Favorite> {
    const favorites = await readJSONFile<Favorite>(FAVORITES_FILE);
    const newFavorite: Favorite = {
      id: `fav_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...favoriteData,
      addedAt: new Date(),
    };
    favorites.push(newFavorite);
    await writeJSONFile(FAVORITES_FILE, favorites);
    return newFavorite;
  },

  async delete(userId: string, symbol: string): Promise<boolean> {
    const favorites = await readJSONFile<Favorite>(FAVORITES_FILE);
    const filteredFavorites = favorites.filter(
      f => !(f.userId === userId && f.companySymbol === symbol)
    );

    if (filteredFavorites.length === favorites.length) {
      return false; // Nothing was deleted
    }

    await writeJSONFile(FAVORITES_FILE, filteredFavorites);
    return true;
  },

  async deleteById(id: string): Promise<boolean> {
    const favorites = await readJSONFile<Favorite>(FAVORITES_FILE);
    const filteredFavorites = favorites.filter(f => f.id !== id);

    if (filteredFavorites.length === favorites.length) {
      return false;
    }

    await writeJSONFile(FAVORITES_FILE, filteredFavorites);
    return true;
  },
};
