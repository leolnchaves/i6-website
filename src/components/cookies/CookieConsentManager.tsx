
import { useCookieConsent } from '@/hooks/useCookieConsent';
import CookieBanner from './CookieBanner';
import CookieSettingsButton from './CookieSettingsButton';

/**
 * Main cookie consent manager component
 * Handles the display of cookie banner and settings button
 */
const CookieConsentManager = () => {
  const { consent } = useCookieConsent();

  // Apply consent settings to actual cookie/tracking implementations
  // This is where you would integrate with your analytics, marketing tools, etc.
  // For example:
  // - Google Analytics: gtag('consent', 'update', { analytics_storage: consent.analytics ? 'granted' : 'denied' })
  // - Facebook Pixel: consent.marketing ? fbq('init', 'YOUR_PIXEL_ID') : null
  // - Other tracking scripts based on consent.preferences, etc.

  return (
    <>
      <CookieBanner />
      <CookieSettingsButton />
    </>
  );
};

export default CookieConsentManager;
