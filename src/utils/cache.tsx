const CACHE_DURATION_MS = 60 * 60 * 1000;

interface CachedItem<T> {
  data: T;
  timestamp: number;
}

export function saveToCache<T>(key: string, data: T): void {
  const item: CachedItem<T> = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function loadFromCache<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  try {
    const item: CachedItem<T> = JSON.parse(raw);
    const expired = Date.now() - item.timestamp > CACHE_DURATION_MS;
    if (expired) {
      localStorage.removeItem(key);
      return null;
    }
    return item.data;
  } catch (error) {
    localStorage.removeItem(key); 
    return null;
  }
}

export function clearCache(key: string): void {
  localStorage.removeItem(key);
}
