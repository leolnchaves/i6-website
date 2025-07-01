
import { useState, useEffect, useCallback } from 'react';
import { CookieConsent, defaultCookieConsent } from '@/types/cookies';

const COOKIE_CONSENT_KEY = 'cookie_consent';
const COOKIE_CONSENT_VERSION = '1.0';

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<CookieConsent>(defaultCookieConsent);
  const [showBanner, setShowBanner] = useState(false);

  // Load consent from localStorage on mount
  useEffect(() => {
    console.log('Loading cookie consent from localStorage...');
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        console.log('Found saved consent:', parsed);
        if (parsed.version === COOKIE_CONSENT_VERSION) {
          setConsent(parsed.consent);
          setShowBanner(false);
          console.log('Consent loaded successfully');
        } else {
          // Version mismatch, show banner again
          console.log('Version mismatch, showing banner');
          setShowBanner(true);
        }
      } catch (error) {
        console.error('Error parsing cookie consent:', error);
        setShowBanner(true);
      }
    } else {
      // No consent found, show banner
      console.log('No saved consent found, showing banner');
      setShowBanner(true);
    }
  }, []);

  const saveConsent = useCallback((newConsent: CookieConsent) => {
    console.log('Saving consent:', newConsent);
    const consentData = {
      consent: newConsent,
      version: COOKIE_CONSENT_VERSION,
      timestamp: new Date().toISOString()
    };
    
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
      setConsent(newConsent);
      setShowBanner(false);
      console.log('Consent saved successfully');
    } catch (error) {
      console.error('Error saving consent:', error);
    }
  }, []);

  const acceptAll = useCallback(() => {
    console.log('Accepting all cookies');
    const allAccepted: CookieConsent = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    saveConsent(allAccepted);
  }, [saveConsent]);

  const rejectAll = useCallback(() => {
    console.log('Rejecting all cookies');
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
    
    console.log(`Updating ${category} consent to ${value}`);
    setConsent(prev => ({
      ...prev,
      [category]: value
    }));
  }, []);

  const resetConsent = useCallback(() => {
    console.log('Resetting consent');
    try {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      setConsent(defaultCookieConsent);
      setShowBanner(true);
      console.log('Consent reset successfully');
    } catch (error) {
      console.error('Error resetting consent:', error);
    }
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
