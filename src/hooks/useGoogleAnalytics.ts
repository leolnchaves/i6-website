
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

/**
 * Hook to manage Google Analytics 4 integration with cookie consent.
 * Updates consent mode and sends pageviews on route changes.
 */
export const useGoogleAnalytics = (analyticsConsent: boolean) => {
  const location = useLocation();

  // Replace placeholder ID in gtag scripts on mount
  useEffect(() => {
    if (!GA_ID) return;
    
    // Update script src
    const scripts = document.querySelectorAll('script');
    scripts.forEach((script) => {
      if (script.src.includes('GA_MEASUREMENT_ID_PLACEHOLDER')) {
        script.src = script.src.replace('GA_MEASUREMENT_ID_PLACEHOLDER', GA_ID);
      }
      if (script.textContent?.includes('GA_MEASUREMENT_ID_PLACEHOLDER')) {
        script.textContent = script.textContent.replace(/GA_MEASUREMENT_ID_PLACEHOLDER/g, GA_ID);
      }
    });
  }, []);

  // Update consent when user changes preference
  useEffect(() => {
    if (!window.gtag) return;

    window.gtag('consent', 'update', {
      analytics_storage: analyticsConsent ? 'granted' : 'denied',
    });
  }, [analyticsConsent]);

  // Track page views on route change
  useEffect(() => {
    if (!analyticsConsent || !GA_ID || !window.gtag) return;

    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location.pathname, location.search, analyticsConsent]);
};
