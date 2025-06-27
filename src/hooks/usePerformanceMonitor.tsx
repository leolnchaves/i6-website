/**
 * Performance monitoring hook
 * Tracks component render times and provides performance insights
 */

import { useEffect, useRef, useState, useCallback } from 'react';
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
  const isFirstRender = useRef(true);

  // Memoized update function to prevent infinite loops
  const updateMetrics = useCallback((renderTime: number) => {
    renderTimes.current.push(renderTime);
    
    // Keep only last 20 render times for average calculation (reduced from 100)
    if (renderTimes.current.length > 20) {
      renderTimes.current.shift();
    }

    const newRenderCount = metrics.renderCount + 1;
    const averageRenderTime = renderTimes.current.reduce((a, b) => a + b, 0) / renderTimes.current.length;
    const slowRenders = renderTime > threshold ? metrics.slowRenders + 1 : metrics.slowRenders;

    const newMetrics: PerformanceMetrics = {
      renderCount: newRenderCount,
      averageRenderTime,
      lastRenderTime: renderTime,
      slowRenders,
    };

    // Only update state if there's a significant change
    setMetrics(prevMetrics => {
      if (prevMetrics.renderCount !== newRenderCount) {
        return newMetrics;
      }
      return prevMetrics;
    });

    // Log slow renders (but limit frequency)
    if (renderTime > threshold && newRenderCount % 10 === 0) {
      logger.warn(
        `Slow render detected: ${renderTime.toFixed(2)}ms (threshold: ${threshold}ms)`,
        { renderTime, threshold, component: componentName },
        componentName
      );
    }

    // Log performance summary less frequently (every 100 renders instead of 50)
    if (newRenderCount % 100 === 0) {
      logger.info(
        `Performance summary for ${componentName}`,
        {
          renderCount: newRenderCount,
          averageRenderTime: `${averageRenderTime.toFixed(2)}ms`,
          lastRenderTime: `${renderTime.toFixed(2)}ms`,
          slowRenderPercentage: `${((slowRenders / newRenderCount) * 100).toFixed(1)}%`,
        },
        componentName
      );
    }
  }, [componentName, threshold, metrics.renderCount, metrics.slowRenders]);

  // Start timing before render
  useEffect(() => {
    renderStartTime.current = performance.now();
  });

  // End timing after render (only after first render to avoid initial measurement issues)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const endTime = performance.now();
    const renderTime = endTime - renderStartTime.current;
    
    // Only measure meaningful render times
    if (renderTime > 0 && renderTime < 1000) { // Avoid measuring page loads
      updateMetrics(renderTime);
    }
  }, [updateMetrics]);

  return metrics;
};
