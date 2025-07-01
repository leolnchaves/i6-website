
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { logger } from '@/utils/logger';
import Header from './Header';
import Footer from './Footer';
import ErrorBoundary from './common/ErrorBoundary';
import CookieConsentManager from './cookies/CookieConsentManager';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Main layout component that wraps all pages
 * Provides consistent header, footer, error handling, and cookie consent
 * Includes navigation logging and performance monitoring
 */
const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  // Performance monitoring for layout renders
  const metrics = usePerformanceMonitor('Layout', 20);
  
  // Auto-scroll to top on route changes
  useScrollToTop();
  
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

      {/* Cookie Consent Manager */}
      <CookieConsentManager />
    </div>
  );
};

export default Layout;
