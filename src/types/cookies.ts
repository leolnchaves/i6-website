
export type CookieCategory = 'essential' | 'analytics' | 'marketing' | 'preferences';

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface CookieCategoryInfo {
  id: CookieCategory;
  name: string;
  description: string;
  required: boolean;
  cookies: string[];
}

export const defaultCookieConsent: CookieConsent = {
  essential: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

export const cookieCategories: CookieCategoryInfo[] = [
  {
    id: 'essential',
    name: 'Essenciais',
    description: 'Cookies necessários para o funcionamento básico do site. Não podem ser desabilitados.',
    required: true,
    cookies: ['session_id', 'csrf_token', 'language_preference']
  },
  {
    id: 'analytics',
    name: 'Análise',
    description: 'Cookies que nos ajudam a entender como os visitantes interagem com o site.',
    required: false,
    cookies: ['google_analytics', 'hotjar', 'performance_metrics']
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Cookies usados para entregar anúncios relevantes e campanhas de marketing.',
    required: false,
    cookies: ['facebook_pixel', 'google_ads', 'remarketing']
  },
  {
    id: 'preferences',
    name: 'Preferências',
    description: 'Cookies que lembram suas escolhas e personalizam sua experiência.',
    required: false,
    cookies: ['theme_preference', 'layout_settings', 'user_preferences']
  }
];
