
export interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  enabled: boolean;
}

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: number;
}

export interface CookieConsentState {
  hasConsented: boolean;
  preferences: CookiePreferences;
  showBanner: boolean;
  showDetails: boolean;
}
