import { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/types/language';

export type DocContentType = 'article' | 'video' | 'download';

export interface DocPage {
  title: string;
  slug: string;
  language: Language;
  section: string;
  section_label: string;
  order: number;
  description: string | null;
  updated_at: string | null;

  /** Defaults to 'article' when absent or unrecognised, so existing pages
   *  keep rendering exactly as before. */
  content_type: DocContentType;
  video_provider: 'youtube' | null;
  video_id: string | null;
  /** Resolved URL of the attached file (from a `.asset.json` pointer). */
  file_url: string | null;
  file_label: string | null;

  /** Set only on the placeholder files shipped with the repo. The i6 HUB never
   *  writes this field, so the notice disappears as soon as the real page lands. */
  sample: boolean;
  hidden: boolean;
  content: string;
}


export interface DocSection {
  key: string;
  label: string;
  pages: DocPage[];
}

/** Browser-safe frontmatter parser (same shape used by useInsights). */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const [, block, content] = match;
  const data: Record<string, unknown> = {};

  for (const line of block.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (value === '' || value === 'null' || value === '~') data[key] = null;
    else if (value === 'true') data[key] = true;
    else if (value === 'false') data[key] = false;
    else if (/^-?\d+(\.\d+)?$/.test(value)) data[key] = Number(value);
    else data[key] = value;
  }

  return { data, content: content.trim() };
}

const modules = import.meta.glob('/src/content/docs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const isLanguage = (v: unknown): v is Language => v === 'pt' || v === 'en' || v === 'es';

const ALL: DocPage[] = Object.entries(modules)
  .map(([path, raw]) => {
    if (/\/README\.md$/i.test(path)) return null;
    const { data, content } = parseFrontmatter(raw);

    const title = typeof data.title === 'string' ? data.title : '';
    const language = data.language;
    if (!title || !isLanguage(language)) return null;

    const slug =
      (typeof data.slug === 'string' && data.slug) ||
      path.split('/').pop()!.replace(/\.md$/, '').replace(/-(pt|en|es)$/, '');

    const section = typeof data.section === 'string' ? data.section : 'general';

    return {
      title,
      slug,
      language,
      section,
      section_label: typeof data.section_label === 'string' ? data.section_label : section,
      order: typeof data.order === 'number' ? data.order : 999,
      description: typeof data.description === 'string' ? data.description : null,
      updated_at: typeof data.updated_at === 'string' ? data.updated_at : null,
      sample: data.sample === true,
      hidden: data.hidden === true,
      content,
    } satisfies DocPage;
  })
  .filter((p): p is DocPage => p !== null);

/** es -> pt -> en fallback, so a missing translation never yields an empty area. */
const resolveLanguage = (language: Language): Language => {
  const chain: Language[] = language === 'es' ? ['es', 'pt', 'en'] : language === 'pt' ? ['pt', 'en'] : ['en', 'pt'];
  return chain.find((l) => ALL.some((p) => p.language === l && !p.hidden)) ?? language;
};

const pagesFor = (language: Language): DocPage[] => {
  const lang = resolveLanguage(language);
  return ALL.filter((p) => p.language === lang && !p.hidden).sort(
    (a, b) => a.order - b.order || a.title.localeCompare(b.title),
  );
};

const sectionsFor = (pages: DocPage[]): DocSection[] => {
  const map = new Map<string, DocSection>();
  for (const page of pages) {
    const existing = map.get(page.section);
    if (existing) existing.pages.push(page);
    else map.set(page.section, { key: page.section, label: page.section_label, pages: [page] });
  }
  return [...map.values()];
};

/**
 * Documentation pages for the active language, in menu order, plus the section
 * grouping and prev/next neighbours of the requested slug.
 */
export const useDocs = (slug?: string) => {
  const { language } = useLanguage();

  return useMemo(() => {
    const pages = pagesFor(language);
    const sections = sectionsFor(pages);
    const index = slug ? pages.findIndex((p) => p.slug === slug) : 0;
    const current = index >= 0 ? pages[index] ?? null : null;

    return {
      pages,
      sections,
      current,
      first: pages[0] ?? null,
      prev: current && index > 0 ? pages[index - 1] : null,
      next: current && index < pages.length - 1 ? pages[index + 1] : null,
      notFound: Boolean(slug) && current === null,
    };
  }, [language, slug]);
};
