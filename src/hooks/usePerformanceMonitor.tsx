/**
 * Performance monitoring hook
 * Tracks component render times and provides performance insights
 */

import { useEffect, useRef, useState } from 'react';
import { logger } from '@/utils/logger';

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

  // Start timing on component mount/update
  useEffect(() => {
    renderStartTime.current = performance.now();
  });

  // End timing after render
  useEffect(() => {
    const endTime = performance.now();
    const renderTime = endTime - renderStartTime.current;
    
    renderTimes.current.push(renderTime);
    
    // Keep only last 100 render times for average calculation
    if (renderTimes.current.length > 100) {
      renderTimes.current.shift();
    }

    const newMetrics: PerformanceMetrics = {
      renderCount: metrics.renderCount + 1,
      averageRenderTime: renderTimes.current.reduce((a, b) => a + b, 0) / renderTimes.current.length,
      lastRenderTime: renderTime,
      slowRenders: renderTime > threshold ? metrics.slowRenders + 1 : metrics.slowRenders,
    };

    setMetrics(newMetrics);

    // Log slow renders
    if (renderTime > threshold) {
      logger.warn(
        `Slow render detected: ${renderTime.toFixed(2)}ms (threshold: ${threshold}ms)`,
        newMetrics,
        componentName
      );
    }

    // Log performance summary every 50 renders
    if (newMetrics.renderCount % 50 === 0) {
      logger.info(
        `Performance summary for ${componentName}`,
        {
          ...newMetrics,
          averageRenderTime: `${newMetrics.averageRenderTime.toFixed(2)}ms`,
          lastRenderTime: `${newMetrics.lastRenderTime.toFixed(2)}ms`,
          slowRenderPercentage: `${((newMetrics.slowRenders / newMetrics.renderCount) * 100).toFixed(1)}%`,
        },
        componentName
      );
    }
  });

  return metrics;
};
