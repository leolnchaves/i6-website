
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

/**
 * Hook to manage Google Analytics 4 integration with cookie consent.
 * Updates consent mode and sends pageviews on route changes.
 */
export const useGoogleAnalytics = (analyticsConsent: boolean) => {
  const location = useLocation();

  // Update consent when user changes preference
  useEffect(() => {
    if (!window.gtag) return;

    window.gtag('consent', 'update', {
      analytics_storage: analyticsConsent ? 'granted' : 'denied',
    });
  }, [analyticsConsent]);

  // Track page views on route change
  useEffect(() => {
    if (!analyticsConsent || !window.gtag) return;

    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location.pathname, location.search, analyticsConsent]);
};
