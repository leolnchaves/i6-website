import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const SITE_LANGS = ['en', 'pt', 'es'];

export const DOCS_ROOT_ROUTE = 'docs';

const DOCS_CONTENT_DIR = resolve('src/content/docs');
export const SAMPLE_DOC_ROUTES = existsSync(DOCS_CONTENT_DIR)
  ? [...new Set(readdirSync(DOCS_CONTENT_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => readFileSync(resolve(DOCS_CONTENT_DIR, file), 'utf8'))
    .filter((content) => /^sample:\s*true\s*$/im.test(content))
    .map((content) => content.match(/^slug:\s*["']?([^"'\r\n]+)["']?\s*$/im)?.[1]?.trim())
    .filter(Boolean)
    .map((slug) => `docs/${slug}`))]
  : [];

// Páginas de documentação gerenciadas pelo site que podem ser indexadas.
export const INDEXABLE_DOC_SLUGS = ['pesquisa'];

export const NON_INDEXABLE_DOC_ROUTES = [DOCS_ROOT_ROUTE, ...SAMPLE_DOC_ROUTES];

// Política única para conteúdos editoriais de demonstração e acessos desativados.
export const NON_INDEXABLE_SLUG_PATTERNS = [/^demo-/];
export const DISABLED_PUBLIC_ROUTE_PATTERNS = [/^demo$/, /^demo-metrics(?:\/|$)/];

export const isNonIndexableSlug = (slug = '') =>
  NON_INDEXABLE_SLUG_PATTERNS.some((pattern) => pattern.test(String(slug)));

export const isNonIndexableRoute = (route = '') => {
  const cleanRoute = String(route)
    .replace(/^\/+|\/+$/g, '')
    .replace(/^(?:pt|en|es)\//, '');
  return DISABLED_PUBLIC_ROUTE_PATTERNS.some((pattern) => pattern.test(cleanRoute))
    || cleanRoute.split('/').some(isNonIndexableSlug);
};

// Rotas cujo conteúdo foi confirmado como traduzido de verdade para espanhol.
// Use '' para a home localizada (/{lang}).
export const ES_TRANSLATED_ROUTES = [
  '',
  'our-ai',
  'i6-builders',
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