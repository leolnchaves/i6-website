
import { parseMarkdownFrontMatter } from './markdownParser';

interface MarkdownCacheEntry {
  data: any;
  timestamp: number;
  etag?: string;
}

class MarkdownCache {
  private cache = new Map<string, MarkdownCacheEntry>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

  async get(filePath: string): Promise<any | null> {
    const entry = this.cache.get(filePath);
    
    if (entry && Date.now() - entry.timestamp < this.CACHE_DURATION) {
      console.log('MarkdownCache - Cache hit for:', filePath);
      return entry.data;
    }

    try {
      console.log('MarkdownCache - Fetching:', filePath);
      const response = await fetch(filePath);
      
      if (!response.ok) {
        console.log('MarkdownCache - File not found:', filePath);
        return null;
      }

      const content = await response.text();
      const parsed = parseMarkdownFrontMatter(content);
      
      this.cache.set(filePath, {
        data: parsed,
        timestamp: Date.now(),
        etag: response.headers.get('etag') || undefined
      });

      console.log('MarkdownCache - Cached:', filePath);
      return parsed;
    } catch (error) {
      console.error('MarkdownCache - Error fetching:', filePath, error);
      return null;
    }
  }

  clear() {
    this.cache.clear();
    console.log('MarkdownCache - Cache cleared');
  }

  clearExpired() {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp >= this.CACHE_DURATION) {
        this.cache.delete(key);
      }
    }
  }
}

export const markdownCache = new MarkdownCache();
