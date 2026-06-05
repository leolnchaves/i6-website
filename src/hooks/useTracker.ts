import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  setTrackerConsent,
  recordPageView,
  trackEvent,
  getLeadContext,
} from '@/lib/tracker';

/**
 * Wires the visitor tracker to React Router + cookie consent.
 * Mount once near the consent manager. Returns helpers for components.
 */
export const useTracker = (analyticsConsent: boolean) => {
  const location = useLocation();

  // Sync consent → tracker. Granted: persist; revoked: wipe.
  useEffect(() => {
    setTrackerConsent(analyticsConsent);
  }, [analyticsConsent]);

  // Record SPA pageviews.
  useEffect(() => {
    if (!analyticsConsent) return;
    recordPageView(location.pathname + location.search, document.title);
  }, [location.pathname, location.search, analyticsConsent]);

  return { trackEvent, getLeadContext };
};
