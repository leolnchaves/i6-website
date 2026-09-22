import { useState, useEffect, useCallback } from 'react';
import { CookieConsent, defaultCookieConsent } from '@/types/cookies';

const COOKIE_CONSENT_KEY = 'cookie_consent';
const COOKIE_CONSENT_VERSION = '2.0';
const CONSENT_TTL_MS = 365 * 24 * 60 * 60 * 1000; // 365 dias

interface StoredConsent {
  consent: CookieConsent;
  version: string;
  timestamp: string;
  expiresAt?: string;
}

interface ConsentState {
  consent: CookieConsent;
  showBanner: boolean;
  bannerExpanded: boolean;
}

const readStoredConsent = (): { consent: CookieConsent; valid: boolean } => {
  try {
    const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!saved) return { consent: defaultCookieConsent, valid: false };
    const parsed = JSON.parse(saved) as StoredConsent;
    if (parsed.version !== COOKIE_CONSENT_VERSION) {
      return { consent: defaultCookieConsent, valid: false };
    }
    if (parsed.expiresAt && new Date(parsed.expiresAt).getTime() < Date.now()) {
      return { consent: defaultCookieConsent, valid: false };
    }
    return { consent: parsed.consent, valid: true };
  } catch {
    return { consent: defaultCookieConsent, valid: false };
  }
};

const initial = readStoredConsent();

let state: ConsentState = {
  consent: initial.consent,
  showBanner: !initial.valid,
  bannerExpanded: false,
};

const listeners = new Set<() => void>();

const setState = (partial: Partial<ConsentState>) => {
  state = { ...state, ...partial };
  listeners.forEach((listener) => listener());
};

const persist = (consent: CookieConsent) => {
  const now = Date.now();
  const stored: StoredConsent = {
    consent,
    version: COOKIE_CONSENT_VERSION,
    timestamp: new Date(now).toISOString(),
    expiresAt: new Date(now + CONSENT_TTL_MS).toISOString(),
  };
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(stored));
  } catch (error) {
    console.error('Error saving consent:', error);
  }
};

export const useCookieConsent = () => {
  const [localState, setLocalState] = useState<ConsentState>(state);

  useEffect(() => {
    setLocalState(state);
    const listener = () => setLocalState(state);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('cookies') === 'open') {
        setState({ showBanner: true, bannerExpanded: true });
      }
    } catch {
      /* noop */
    }
  }, []);

  const saveConsent = useCallback((newConsent: CookieConsent) => {
    persist(newConsent);
    setState({ consent: newConsent, showBanner: false, bannerExpanded: false });
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent({ essential: true, analytics: true, marketing: true, preferences: true });
  }, [saveConsent]);

  const rejectAll = useCallback(() => {
    saveConsent({ essential: true, analytics: false, marketing: false, preferences: false });
  }, [saveConsent]);
  const openPreferences = useCallback(() => {
    setState({ showBanner: true, bannerExpanded: true });
  }, []);

  const setBannerExpanded = useCallback((value: boolean) => setState({ bannerExpanded: value }), []);

  return {
    consent: localState.consent,
    showBanner: localState.showBanner,
    bannerExpanded: localState.bannerExpanded,
    saveConsent,
    acceptAll,
    rejectAll,
    setBannerExpanded,
    openPreferences,
  };

};
