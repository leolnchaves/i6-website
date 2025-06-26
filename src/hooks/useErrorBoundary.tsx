
/**
 * Error boundary hook for better error handling and debugging
 */

import { useCallback } from 'react';
import { logger } from '@/utils/logger';

interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
}

export const useErrorHandler = (componentName: string) => {
  const handleError = useCallback((error: Error, errorInfo?: ErrorInfo) => {
    logger.error(
      `Error in ${componentName}`,
      {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo?.componentStack,
        timestamp: new Date().toISOString(),
      },
      componentName
    );

    // In development, also throw to help with debugging
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 Error in ${componentName}`);
      console.error('Error:', error);
      console.error('Component Stack:', errorInfo?.componentStack);
      console.groupEnd();
    }
  }, [componentName]);

  const wrapAsync = useCallback(<T extends any[], R>(
    fn: (...args: T) => Promise<R>,
    errorMessage?: string
  ) => {
    return async (...args: T): Promise<R | null> => {
      try {
        return await fn(...args);
      } catch (error) {
        handleError(
          error instanceof Error ? error : new Error(String(error)),
          { componentStack: errorMessage || 'Async operation failed' }
        );
        return null;
      }
    };
  }, [handleError]);

  return { handleError, wrapAsync };
};
