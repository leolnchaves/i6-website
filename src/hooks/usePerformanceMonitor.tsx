/**
 * Performance monitoring hook - Optimized version
 * Only active in development mode for better production performance
 */

import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  renderCount: number;
  averageRenderTime: number;
  lastRenderTime: number;
  slowRenders: number;
}

export const usePerformanceMonitor = (componentName: string, threshold: number = 16) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderCount: 0,
    averageRenderTime: 0,
    lastRenderTime: 0,
    slowRenders: 0,
  });

  const renderStartTime = useRef<number>(0);
  const renderTimes = useRef<number[]>([]);
  const isEnabled = process.env.NODE_ENV === 'development';

  useEffect(() => {
    if (!isEnabled) return;
    renderStartTime.current = performance.now();
  });

  useEffect(() => {
    if (!isEnabled) return;
    
    const endTime = performance.now();
    const renderTime = endTime - renderStartTime.current;
    
    if (renderTime > 0) {
      renderTimes.current.push(renderTime);
      
      // Keep only last 50 render times for better memory usage
      if (renderTimes.current.length > 50) {
        renderTimes.current.shift();
      }

      const newMetrics: PerformanceMetrics = {
        renderCount: metrics.renderCount + 1,
        averageRenderTime: renderTimes.current.reduce((a, b) => a + b, 0) / renderTimes.current.length,
        lastRenderTime: renderTime,
        slowRenders: renderTime > threshold ? metrics.slowRenders + 1 : metrics.slowRenders,
      };

      setMetrics(newMetrics);

      // Only log critical slow renders
      if (renderTime > threshold * 2) {
        console.warn(`Critical slow render: ${componentName} - ${renderTime.toFixed(2)}ms`);
      }
    }
  });

  return isEnabled ? metrics : {
    renderCount: 0,
    averageRenderTime: 0,
    lastRenderTime: 0,
    slowRenders: 0,
  };
};
