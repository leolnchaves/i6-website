
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import CookieBanner from './CookieBanner';

/**
 * Main cookie consent manager component
 * Handles the display of cookie banner and integrates with Google Analytics
 */
const CookieConsentManager = () => {
  const { consent } = useCookieConsent();

  // Integrate GA4 with cookie consent
  useGoogleAnalytics(consent.analytics);

  return (
    <>
      <CookieBanner />
    </>
  );
};

export default CookieConsentManager;
