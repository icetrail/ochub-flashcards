const STORAGE_PREFIX = 'flashcards_';

export const StorageKeys = {
  DECKS: `${STORAGE_PREFIX}decks`,
  CARDS: `${STORAGE_PREFIX}cards`,
  SETTINGS: `${STORAGE_PREFIX}settings`,
} as const;

export function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item) as T;
  } catch {
    console.error(`Error reading from localStorage key "${key}"`);
    return defaultValue;
  }
}

export function setItem<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    console.error(`Error writing to localStorage key "${key}"`);
    return false;
  }
}

export function removeItem(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    console.error(`Error removing localStorage key "${key}"`);
    return false;
  }
}
