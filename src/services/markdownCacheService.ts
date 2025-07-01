
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

export class MarkdownCacheService {
  private static cache = new Map<string, CacheEntry<any>>();
  private static readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutos

  static set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + ttl
    };
    
    this.cache.set(key, entry);
    console.log('MarkdownCacheService - Cached:', key, 'TTL:', ttl);
  }

  static get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      console.log('MarkdownCacheService - Cache miss:', key);
      return null;
    }
    
    if (Date.now() > entry.expiry) {
      console.log('MarkdownCacheService - Cache expired:', key);
      this.cache.delete(key);
      return null;
    }
    
    console.log('MarkdownCacheService - Cache hit:', key);
    return entry.data as T;
  }

  static invalidate(key: string): void {
    this.cache.delete(key);
    console.log('MarkdownCacheService - Invalidated:', key);
  }

  static invalidateByPattern(pattern: string): void {
    const keysToDelete: string[] = [];
    
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        keysToDelete.push(key);
      }
    }
    
    keysToDelete.forEach(key => {
      this.cache.delete(key);
      console.log('MarkdownCacheService - Pattern invalidated:', key);
    });
  }

  static clear(): void {
    this.cache.clear();
    console.log('MarkdownCacheService - Cache cleared');
  }

  static getStats() {
    const entries = Array.from(this.cache.entries());
    const now = Date.now();
    
    return {
      totalEntries: entries.length,
      validEntries: entries.filter(([, entry]) => now <= entry.expiry).length,
      expiredEntries: entries.filter(([, entry]) => now > entry.expiry).length,
      oldestEntry: entries.length > 0 ? Math.min(...entries.map(([, entry]) => entry.timestamp)) : null,
      newestEntry: entries.length > 0 ? Math.max(...entries.map(([, entry]) => entry.timestamp)) : null,
    };
  }

  static getCacheKey(type: string, identifier: string, language: string = 'en'): string {
    return `${type}:${identifier}:${language}`;
  }
}
