import Dexie, { Table } from "dexie";

export interface Favorite {
  id?: number;
  itemId: string;
  itemType: "tool" | "agent" | "mcp" | "prompt" | "workflow";
  name: string;
  description: string;
  image?: string;
  url?: string;
  addedAt: Date;
}

export interface HistoryItem {
  id?: number;
  itemId: string;
  itemType: "tool" | "agent" | "mcp" | "prompt" | "workflow";
  name: string;
  description: string;
  image?: string;
  visitedAt: Date;
}

export interface Collection {
  id?: number;
  name: string;
  description: string;
  createdAt: Date;
  items: { itemId: string; itemType: string }[];
}

class AINavigatorDB extends Dexie {
  favorites!: Table<Favorite>;
  history!: Table<HistoryItem>;
  collections!: Table<Collection>;

  constructor() {
    super("ai-navigator-pro");
    this.version(1).stores({
      favorites: "++id, itemId, itemType, addedAt",
      history: "++id, itemId, itemType, visitedAt",
      collections: "++id, name, createdAt",
    });
  }
}

export const db = typeof window !== "undefined" ? new AINavigatorDB() : null;

export async function addFavorite(item: Omit<Favorite, "id" | "addedAt">) {
  if (!db) return;
  const existing = await db.favorites
    .where({ itemId: item.itemId, itemType: item.itemType })
    .first();
  if (!existing) {
    await db.favorites.add({ ...item, addedAt: new Date() });
  }
}

export async function removeFavorite(itemId: string, itemType: string) {
  if (!db) return;
  await db.favorites
    .where({ itemId, itemType })
    .delete();
}

export async function isFavorite(itemId: string, itemType: string): Promise<boolean> {
  if (!db) return false;
  const item = await db.favorites
    .where({ itemId, itemType })
    .first();
  return !!item;
}

export async function getFavorites(itemType?: string): Promise<Favorite[]> {
  if (!db) return [];
  if (itemType) {
    return db.favorites.where({ itemType }).reverse().sortBy("addedAt");
  }
  return db.favorites.reverse().sortBy("addedAt");
}

export async function addHistory(item: Omit<HistoryItem, "id" | "visitedAt">) {
  if (!db) return;
  await db.history
    .where({ itemId: item.itemId, itemType: item.itemType })
    .delete();
  await db.history.add({ ...item, visitedAt: new Date() });
}

export async function getHistory(limit = 50): Promise<HistoryItem[]> {
  if (!db) return [];
  return db.history.reverse().limit(limit).toArray();
}

export async function clearHistory() {
  if (!db) return;
  await db.history.clear();
}
