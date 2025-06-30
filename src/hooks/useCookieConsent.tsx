
import { useState, useEffect, useCallback } from 'react';
import { CookiePreferences, CookieConsentState, CookieCategory } from '@/types/cookieConsent';
import { logger } from '@/utils/logger';

const COOKIE_CONSENT_KEY = 'infinity6_cookie_consent';
const CONSENT_EXPIRY_DAYS = 365;

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always required
  analytics: false,
  marketing: false,
  preferences: false,
  timestamp: Date.now(),
};

const cookieCategories: CookieCategory[] = [
  {
    id: 'necessary',
    name: 'Cookies Necessários',
    description: 'Essenciais para o funcionamento básico do site. Não podem ser desabilitados.',
    required: true,
    enabled: true,
  },
  {
    id: 'analytics',
    name: 'Cookies de Análise',
    description: 'Nos ajudam a entender como os visitantes interagem com o site.',
    required: false,
    enabled: false,
  },
  {
    id: 'marketing',
    name: 'Cookies de Marketing',
    description: 'Utilizados para personalização de anúncios e conteúdo.',
    required: false,
    enabled: false,
  },
  {
    id: 'preferences',
    name: 'Cookies de Preferências',
    description: 'Armazenam suas preferências e configurações do site.',
    required: false,
    enabled: false,
  },
];

export const useCookieConsent = () => {
  const [state, setState] = useState<CookieConsentState>({
    hasConsented: false,
    preferences: defaultPreferences,
    showBanner: false,
    showDetails: false,
  });

  // Check for existing consent on mount
  useEffect(() => {
    const checkExistingConsent = () => {
      try {
        const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          const consentAge = Date.now() - parsed.timestamp;
          const isExpired = consentAge > CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

          if (!isExpired) {
            setState(prev => ({
              ...prev,
              hasConsented: true,
              preferences: parsed,
              showBanner: false,
            }));
            logger.info('Cookie consent loaded from storage', { preferences: parsed });
            return;
          } else {
            // Remove expired consent
            localStorage.removeItem(COOKIE_CONSENT_KEY);
            logger.info('Expired cookie consent removed');
          }
        }

        // Show banner if no valid consent
        setState(prev => ({
          ...prev,
          showBanner: true,
        }));
      } catch (error) {
        logger.error('Error checking cookie consent', { error });
        setState(prev => ({
          ...prev,
          showBanner: true,
        }));
      }
    };

    checkExistingConsent();
  }, []);

  const savePreferences = useCallback((preferences: CookiePreferences) => {
    try {
      const consentData = {
        ...preferences,
        timestamp: Date.now(),
      };

      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
      
      setState(prev => ({
        ...prev,
        hasConsented: true,
        preferences: consentData,
        showBanner: false,
        showDetails: false,
      }));

      logger.info('Cookie preferences saved', { preferences: consentData });

      // Trigger analytics/marketing scripts based on consent
      if (preferences.analytics) {
        // Initialize analytics
        console.log('Analytics enabled');
      }
      
      if (preferences.marketing) {
        // Initialize marketing tools
        console.log('Marketing enabled');
      }

    } catch (error) {
      logger.error('Error saving cookie preferences', { error });
    }
  }, []);

  const acceptAll = useCallback(() => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      timestamp: Date.now(),
    };
    savePreferences(allAccepted);
  }, [savePreferences]);

  const acceptNecessary = useCallback(() => {
    savePreferences(defaultPreferences);
  }, [savePreferences]);

  const openDetails = useCallback(() => {
    setState(prev => ({
      ...prev,
      showDetails: true,
    }));
  }, []);

  const hideDetails = useCallback(() => {
    setState(prev => ({
      ...prev,
      showDetails: false,
    }));
  }, []);

  const resetConsent = useCallback(() => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    setState({
      hasConsented: false,
      preferences: defaultPreferences,
      showBanner: true,
      showDetails: false,
    });
    logger.info('Cookie consent reset');
  }, []);

  return {
    ...state,
    cookieCategories,
    acceptAll,
    acceptNecessary,
    savePreferences,
    showDetails: openDetails,
    hideDetails,
    resetConsent,
  };
};
