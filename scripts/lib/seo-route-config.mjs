export const SITE_LANGS = ['en', 'pt', 'es'];

// Rotas cujo conteúdo foi confirmado como traduzido de verdade para espanhol.
// Use '' para a home localizada (/{lang}).
export const ES_TRANSLATED_ROUTES = [
  '',
  'our-ai',
  'i6-builders',
  'docs',
  'docs/pesquisa',
  'contact',
];

export const isEsTranslatedRoute = (route) =>
  ES_TRANSLATED_ROUTES.includes(route.replace(/^\/+|\/+$/g, ''));

export const languagesForRoute = (route) =>
  isEsTranslatedRoute(route) ? SITE_LANGS : ['en', 'pt'];

export const localizedRoutePath = (lang, route) => {
  const cleanRoute = route.replace(/^\/+|\/+$/g, '');
  return cleanRoute ? `/${lang}/${cleanRoute}` : `/${lang}`;
};