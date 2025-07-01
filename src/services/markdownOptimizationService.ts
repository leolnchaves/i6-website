
import { MarkdownCacheService } from './markdownCacheService';
import { MarkdownAPI } from './markdownAPI';

export interface OptimizationConfig {
  enableCache: boolean;
  cacheTTL: number;
  enablePrefetch: boolean;
  maxConcurrentRequests: number;
  retryAttempts: number;
}

export class MarkdownOptimizationService {
  private static config: OptimizationConfig = {
    enableCache: true,
    cacheTTL: 5 * 60 * 1000, // 5 minutes
    enablePrefetch: true,
    maxConcurrentRequests: 3,
    retryAttempts: 2,
  };

  private static requestQueue: Array<() => Promise<any>> = [];
  private static activeRequests = 0;

  static configure(newConfig: Partial<OptimizationConfig>): void {
    this.config = { ...this.config, ...newConfig };
    console.log('MarkdownOptimizationService - Configuration updated:', this.config);
  }

  static async optimizedFetch<T>(
    cacheKey: string,
    fetchFunction: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    // Verificar cache primeiro se habilitado
    if (this.config.enableCache) {
      const cached = MarkdownCacheService.get<T>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    // Executar fetch com controle de concorrência
    const result = await this.executeWithConcurrencyControl(fetchFunction);

    // Cachear resultado se habilitado
    if (this.config.enableCache) {
      MarkdownCacheService.set(cacheKey, result, ttl || this.config.cacheTTL);
    }

    return result;
  }

  private static async executeWithConcurrencyControl<T>(
    fetchFunction: () => Promise<T>
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const executeRequest = async () => {
        this.activeRequests++;
        
        try {
          const result = await this.executeWithRetry(fetchFunction);
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          this.activeRequests--;
          this.processQueue();
        }
      };

      if (this.activeRequests < this.config.maxConcurrentRequests) {
        executeRequest();
      } else {
        this.requestQueue.push(executeRequest);
      }
    });
  }

  private static async executeWithRetry<T>(
    fetchFunction: () => Promise<T>
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= this.config.retryAttempts; attempt++) {
      try {
        return await fetchFunction();
      } catch (error) {
        lastError = error as Error;
        console.warn(`MarkdownOptimizationService - Attempt ${attempt + 1} failed:`, error);
        
        if (attempt < this.config.retryAttempts) {
          // Backoff exponencial
          const delay = Math.pow(2, attempt) * 100;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError!;
  }

  private static processQueue(): void {
    while (this.requestQueue.length > 0 && this.activeRequests < this.config.maxConcurrentRequests) {
      const nextRequest = this.requestQueue.shift();
      if (nextRequest) {
        nextRequest();
      }
    }
  }

  // Prefetch comum de conteúdos
  static async prefetchCommonContent(language: string = 'en'): Promise<void> {
    if (!this.config.enablePrefetch) {
      return;
    }

    console.log('MarkdownOptimizationService - Starting prefetch for language:', language);

    const prefetchTasks = [
      // Páginas principais
      () => MarkdownAPI.getFile(`home.${language}.md`, 'content/pages'),
      () => MarkdownAPI.getFile(`solutions.${language}.md`, 'content/pages'),
      () => MarkdownAPI.getFile(`success-stories.${language}.md`, 'content/pages'),
      () => MarkdownAPI.getFile(`contact.${language}.md`, 'content/pages'),
      
      // Cards principais
      () => MarkdownAPI.getFile(`results-cards.${language}.md`, 'content/cards'),
      () => MarkdownAPI.getFile(`solutions-cards.${language}.md`, 'content/cards'),
      () => MarkdownAPI.getFile(`success-stories-cards.${language}.md`, 'content/cards'),
    ];

    // Executar prefetch com controle de concorrência
    const prefetchPromises = prefetchTasks.map(task => 
      this.executeWithConcurrencyControl(task).catch(error => {
        console.warn('MarkdownOptimizationService - Prefetch failed:', error);
        return null;
      })
    );

    await Promise.allSettled(prefetchPromises);
    console.log('MarkdownOptimizationService - Prefetch completed');
  }

  // Performance metrics
  static getPerformanceMetrics() {
    return {
      activeRequests: this.activeRequests,
      queueLength: this.requestQueue.length,
      cacheStats: MarkdownCacheService.getStats(),
      config: this.config,
    };
  }

  // Limpeza de recursos
  static cleanup(): void {
    this.requestQueue.length = 0;
    this.activeRequests = 0;
    MarkdownCacheService.clear();
    console.log('MarkdownOptimizationService - Cleanup completed');
  }
}
