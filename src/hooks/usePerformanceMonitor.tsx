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
  slowRenderPercentage: string;
}

export const usePerformanceMonitor = (componentName: string, threshold: number = 16) => {
  const renderCountRef = useRef(0);
  const renderTimesRef = useRef<number[]>([]);
  const lastLogTimeRef = useRef(0);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderCount: 0,
    averageRenderTime: 0,
    lastRenderTime: 0,
    slowRenders: 0,
    slowRenderPercentage: '0.0%'
  });

  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      renderCountRef.current += 1;
      renderTimesRef.current.push(renderTime);
      
      // Keep only last 100 render times to prevent memory issues
      if (renderTimesRef.current.length > 100) {
        renderTimesRef.current = renderTimesRef.current.slice(-100);
      }
      
      const now = Date.now();
      // Only log every 5 seconds to prevent spam
      if (now - lastLogTimeRef.current > 5000) {
        lastLogTimeRef.current = now;
        
        const totalTime = renderTimesRef.current.reduce((sum, time) => sum + time, 0);
        const averageTime = totalTime / renderTimesRef.current.length;
        const slowRenders = renderTimesRef.current.filter(time => time > threshold).length;
        const slowRenderPercentage = ((slowRenders / renderTimesRef.current.length) * 100).toFixed(1);
        
        const newMetrics = {
          renderCount: renderCountRef.current,
          averageRenderTime: Number(averageTime.toFixed(2)),
          lastRenderTime: Number(renderTime.toFixed(2)),
          slowRenders,
          slowRenderPercentage: `${slowRenderPercentage}%`
        };
        
        // Only update state if metrics have actually changed significantly
        setMetrics(prevMetrics => {
          if (
            Math.abs(prevMetrics.averageRenderTime - newMetrics.averageRenderTime) > 0.1 ||
            prevMetrics.renderCount !== newMetrics.renderCount
          ) {
            return newMetrics;
          }
          return prevMetrics;
        });
        
        // Log performance summary only if there are performance issues
        if (slowRenders > 0 || renderCountRef.current % 1000 === 0) {
          logger.info(`Performance summary for ${componentName}`, newMetrics, componentName);
        }
      }
    };
  }); // Remove dependency array to prevent infinite loop

  return metrics;
};
