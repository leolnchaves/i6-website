
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import { useTracker } from '@/hooks/useTracker';
import CookieBanner from './CookieBanner';

/**
 * Main cookie consent manager component
 * Handles the display of cookie banner and integrates with Google Analytics
 * and the first-party visitor tracker (src/lib/tracker.ts).
 */
const CookieConsentManager = () => {
  const { consent } = useCookieConsent();

  // Integrate GA4 with cookie consent
  useGoogleAnalytics(consent.analytics);

  // First-party tracker (anonymous_id, UTMs, page history, events)
  useTracker(consent.analytics);

  return (
    <>
      <CookieBanner />
    </>
  );
};

export default CookieConsentManager;
