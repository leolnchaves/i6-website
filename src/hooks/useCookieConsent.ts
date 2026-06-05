import { useState, useEffect, useCallback } from 'react';
import { CookieConsent, defaultCookieConsent } from '@/types/cookies';

const COOKIE_CONSENT_KEY = 'cookie_consent';
const COOKIE_CONSENT_VERSION = '2.0';

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<CookieConsent>(defaultCookieConsent);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerExpanded, setBannerExpanded] = useState(false);

  // Load consent from localStorage on mount
  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        if (parsed.version === COOKIE_CONSENT_VERSION) {
          setConsent(parsed.consent);
          setShowBanner(false);
        } else {
          setShowBanner(true);
        }
      } catch {
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }

    // Open expanded banner if URL has ?cookies=open (deep-link from old route)
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('cookies') === 'open') {
        setShowBanner(true);
        setBannerExpanded(true);
      }
    } catch {
      /* noop */
    }
  }, []);

  const saveConsent = useCallback((newConsent: CookieConsent) => {
    const consentData = {
      consent: newConsent,
      version: COOKIE_CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
      setConsent(newConsent);
      setShowBanner(false);
      setBannerExpanded(false);
    } catch (error) {
      console.error('Error saving consent:', error);
    }
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent({ essential: true, analytics: true, marketing: true, preferences: true });
  }, [saveConsent]);

  // Soft opt-in: aceita os adicionais (marketing + preferências) além do baseline.
  const acceptAdditional = useCallback(() => {
    saveConsent({ essential: true, analytics: true, marketing: true, preferences: true });
  }, [saveConsent]);

  // Rejeita os adicionais: mantém essenciais + analytics anônimos (legítimo interesse).
  const continueEssential = useCallback(() => {
    saveConsent({ essential: true, analytics: true, marketing: false, preferences: false });
  }, [saveConsent]);

  const rejectAll = useCallback(() => {
    saveConsent({ essential: true, analytics: false, marketing: false, preferences: false });
  }, [saveConsent]);

  const updateConsent = useCallback((category: keyof CookieConsent, value: boolean) => {
    if (category === 'essential') return;
    setConsent((prev) => ({ ...prev, [category]: value }));
  }, []);

  const resetConsent = useCallback(() => {
    try {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      setConsent(defaultCookieConsent);
      setShowBanner(true);
    } catch (error) {
      console.error('Error resetting consent:', error);
    }
  }, []);

  const openPreferences = useCallback(() => {
    setShowBanner(true);
    setBannerExpanded(true);
  }, []);

  return {
    consent,
    showBanner,
    bannerExpanded,
    saveConsent,
    acceptAll,
    acceptAdditional,
    continueEssential,
    rejectAll,
    updateConsent,
    resetConsent,
    setShowBanner,
    setBannerExpanded,
    openPreferences,
  };
};
