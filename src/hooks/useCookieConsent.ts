
import { useState, useEffect, useCallback } from 'react';
import { CookieConsent, defaultCookieConsent } from '@/types/cookies';

const COOKIE_CONSENT_KEY = 'cookie_consent';
const COOKIE_CONSENT_VERSION = '1.0';

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<CookieConsent>(defaultCookieConsent);
  const [showBanner, setShowBanner] = useState(false);

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
          // Version mismatch, show banner again
          setShowBanner(true);
        }
      } catch (error) {
        console.error('Error parsing cookie consent:', error);
        setShowBanner(true);
      }
    } else {
      // No consent found, show banner
      setShowBanner(true);
    }
  }, []);

  const saveConsent = useCallback((newConsent: CookieConsent) => {
    const consentData = {
      consent: newConsent,
      version: COOKIE_CONSENT_VERSION,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
    setConsent(newConsent);
    setShowBanner(false);
  }, []);

  const acceptAll = useCallback(() => {
    const allAccepted: CookieConsent = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    saveConsent(allAccepted);
  }, [saveConsent]);

  const rejectAll = useCallback(() => {
    const onlyEssential: CookieConsent = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    saveConsent(onlyEssential);
  }, [saveConsent]);

  const updateConsent = useCallback((category: keyof CookieConsent, value: boolean) => {
    if (category === 'essential') return; // Essential cookies cannot be disabled
    
    setConsent(prev => ({
      ...prev,
      [category]: value
    }));
  }, []);

  const resetConsent = useCallback(() => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    setConsent(defaultCookieConsent);
    setShowBanner(true);
  }, []);

  return {
    consent,
    showBanner,
    saveConsent,
    acceptAll,
    rejectAll,
    updateConsent,
    resetConsent,
    setShowBanner
  };
};
