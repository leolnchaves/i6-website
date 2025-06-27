
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ErrorBoundary from './common/ErrorBoundary';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Main layout component that wraps all pages
 * Provides consistent header, footer, and error handling
 */
const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  // Simple route change tracking without excessive logging
  useEffect(() => {
    // Only log in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('Route changed to:', location.pathname);
    }
  }, [location.pathname]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <ErrorBoundary fallback={<div className="h-16 bg-white border-b" />}>
        <Header />
      </ErrorBoundary>
      
      <main className="flex-1 pt-16" role="main">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      
      <ErrorBoundary fallback={<div className="h-32 bg-gray-900" />}>
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default Layout;
