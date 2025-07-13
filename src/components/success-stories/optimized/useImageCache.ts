import { useEffect } from 'react';

interface ImageCacheOptions {
  maxAge?: number; // em ms, default 24 horas
  maxSize?: number; // máximo de imagens no cache
}

export const useImageCache = (options: ImageCacheOptions = {}) => {
  const { maxAge = 24 * 60 * 60 * 1000, maxSize = 50 } = options;

  useEffect(() => {
    // Verificar se o browser suporta service workers
    if (!('serviceWorker' in navigator)) {
      return;
    }

    // Cache manual para imagens usando localStorage/IndexedDB
    const cacheImages = async (imageUrls: string[]) => {
      const cacheKey = 'success-stories-images';
      const cache = await caches.open(cacheKey);
      
      const cachePromises = imageUrls.map(async (url) => {
        try {
          // Verificar se já está no cache
          const cachedResponse = await cache.match(url);
          if (cachedResponse) {
            return;
          }

          // Fazer fetch e adicionar ao cache
          const response = await fetch(url);
          if (response.ok) {
            await cache.put(url, response.clone());
          }
        } catch (error) {
          console.warn('Failed to cache image:', url, error);
        }
      });

      await Promise.allSettled(cachePromises);
    };

    // Limpar cache antigo
    const cleanOldCache = async () => {
      const cacheKey = 'success-stories-images';
      const cache = await caches.open(cacheKey);
      const requests = await cache.keys();
      
      const now = Date.now();
      const deletePromises = requests.map(async (request) => {
        const response = await cache.match(request);
        if (response) {
          const cachedTime = response.headers.get('cached-time');
          if (cachedTime && (now - parseInt(cachedTime)) > maxAge) {
            await cache.delete(request);
          }
        }
      });

      await Promise.allSettled(deletePromises);
    };

    // Pré-cache das imagens mais comuns
    const commonImages = [
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop&auto=format',
      // Adicionar outras imagens comuns aqui
    ];

    // Executar cache
    cacheImages(commonImages);
    cleanOldCache();

    // Cleanup no unmount
    return () => {
      // Opcional: limpar cache se necessário
    };
  }, [maxAge, maxSize]);

  // Função para pré-carregar imagem específica
  const preloadImage = async (url: string) => {
    try {
      const cacheKey = 'success-stories-images';
      const cache = await caches.open(cacheKey);
      
      const cachedResponse = await cache.match(url);
      if (!cachedResponse) {
        const response = await fetch(url);
        if (response.ok) {
          await cache.put(url, response.clone());
        }
      }
    } catch (error) {
      console.warn('Failed to preload image:', url, error);
    }
  };

  return { preloadImage };
};