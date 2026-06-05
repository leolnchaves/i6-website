import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  setThirdPartyAnalyticsConsent,
  recordPageView,
  trackEvent,
  getLeadContext,
} from '@/lib/tracker';

/**
 * Wires the visitor tracker to React Router.
 *
 * Primeira parte (anonymous_id, sessão, UTMs, journey, eventos) é SEMPRE
 * ativa sob base legal de legítimo interesse. O parâmetro `analyticsConsent`
 * gateia apenas o envio para GA4 (terceira parte).
 */
export const useTracker = (analyticsConsent: boolean) => {
  const location = useLocation();

  useEffect(() => {
    setThirdPartyAnalyticsConsent(analyticsConsent);
  }, [analyticsConsent]);

  useEffect(() => {
    recordPageView(location.pathname + location.search, document.title);
  }, [location.pathname, location.search]);

  return { trackEvent, getLeadContext };
};
