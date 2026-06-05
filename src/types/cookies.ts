
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

// Soft opt-in: analytics anônimos ativos por padrão (base legítimo interesse).
// Visitante pode desativar em /cookie-settings.
export const defaultCookieConsent: CookieConsent = {
  essential: true,
  analytics: true,
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
    description: 'Cookies anônimos que nos ajudam a entender como os visitantes interagem com o site. Você pode desativar em "Preferências de cookies".',
    required: false,
    cookies: ['google_analytics', 'anonymous_id', 'performance_metrics']
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
