
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { logger } from '@/utils/logger';
import Header from './Header';
import Footer from './Footer';
import ErrorBoundary from './common/ErrorBoundary';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Main layout component that wraps all pages
 * Provides consistent header, footer, and error handling
 * Includes navigation logging and performance monitoring
 */
const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  // Performance monitoring for layout renders
  const metrics = usePerformanceMonitor('Layout', 20);
  
  // Log route changes
  useEffect(() => {
    logger.info('Route changed', { 
      pathname: location.pathname,
      search: location.search,
      timestamp: new Date().toISOString()
    }, 'Layout');
  }, [location]);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with navigation */}
      <ErrorBoundary fallback={<div className="h-16 bg-white border-b" />}>
        <Header />
      </ErrorBoundary>
      
      {/* Main content area */}
      <main className="flex-1 pt-16" role="main">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      
      {/* Footer */}
      <ErrorBoundary fallback={<div className="h-32 bg-gray-900" />}>
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default Layout;
