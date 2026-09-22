import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  setThirdPartyAnalyticsConsent,
  recordPageView,
  trackEvent,
  getLeadContext,
} from '@/lib/tracker';
import { sendLandingBeacon } from '@/lib/campaignBeacon';

/**
 * Wires the visitor tracker to React Router.
 *
 * Primeira parte (anonymous_id, sessão, UTMs, journey, eventos) é SEMPRE
 * ativa sob base legal de legítimo interesse. O parâmetro `analyticsConsent`
 * gateia apenas o envio para GA4 (terceira parte).
 */
export const useTracker = (analyticsConsent: boolean) => {
  const location = useLocation();
  const lastBeaconKey = useRef<string | null>(null);

  useEffect(() => {
    setThirdPartyAnalyticsConsent(analyticsConsent);
  }, [analyticsConsent]);

  useEffect(() => {
    recordPageView(location.pathname + location.search, document.title);
    // Beacon ao i6 HUB: só com "Análise" aceita; dispara de novo se os
    // UTMs (search) mudarem na mesma página.
    const beaconKey = location.pathname + location.search;
    if (analyticsConsent && lastBeaconKey.current !== beaconKey) {
      lastBeaconKey.current = beaconKey;
      void sendLandingBeacon(location.pathname, location.search);
    }
  }, [location.pathname, location.search, analyticsConsent]);

  return { trackEvent, getLeadContext };
};
