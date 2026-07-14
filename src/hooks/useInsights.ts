import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getPublicAssetUrl } from '@/utils/assetUtils';

export type InsightType = 'i6 on Media' | 'i6 Article' | 'i6 eBook' | 'i6 Social';

export interface InsightFrontmatter {
  id?: string;
  title: string;
  slug: string;
  type: InsightType;
  date: string;
  cluster?: string;
  language: 'pt' | 'en';
  excerpt: string;
  cover_image?: string | null;
  external_url?: string | null;
  read_time?: number;
  featured?: boolean;
  gated?: boolean;
  asset_url?: string | null;
  cta_form?: boolean;
  cta_form_text?: string | null;
  /** i6 Blog: marks the hero article. If several are true, the most recent wins. */
  is_default?: boolean;
  /** i6 Blog: groups articles into a horizontal rail. */
  theme?: string;
  /** i6 Blog: secondary filter tags. Accepts YAML inline list `tags: [a, b]`. */
  tags?: string[];
}

export interface Insight extends InsightFrontmatter {
  content: string;
}

/**
 * Browser-safe frontmatter parser. Handles simple YAML:
 *   key: value
 *   key: "value with: colons"
 *   key: 123
 *   key: null
 */
function decodeYamlEscapes(v: string): string {
  return v
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');
}

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const [, fmBlock, content] = match;
  const data: Record<string, unknown> = {};

  for (const line of fmBlock.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value: string = line.slice(idx + 1).trim();

    // strip wrapping quotes; JSON-style escapes only decoded for double-quoted strings
    let wasDoubleQuoted = false;
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
      wasDoubleQuoted = true;
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }
    if (wasDoubleQuoted) value = decodeYamlEscapes(value);

    if (value === '' || value === 'null' || value === '~') {
      data[key] = null;
    } else if (value === 'true') {
      data[key] = true;
    } else if (value === 'false') {
      data[key] = false;
    } else if (/^-?\d+(\.\d+)?$/.test(value)) {
      data[key] = Number(value);
    } else {
      data[key] = value;
    }
  }

  return { data, content: content.trim() };
}

/**
 * Strip common markdown syntax from a string so it can be shown as plain text
 * (card excerpts, meta descriptions). Does NOT truncate — visual clamping is
 * the caller's job.
 */
function plainTextExcerpt(raw: string): string {
  if (!raw) return '';
  return raw
    // fenced code blocks
    .replace(/```[\s\S]*?```/g, ' ')
    // inline code
    .replace(/`([^`]*)`/g, '$1')
    // images ![alt](url) -> alt
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    // links [label](url) -> label
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    // headings, blockquotes at line start
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s{0,3}>\s?/gm, '')
    // bold/italic/strike markers
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/~~(.*?)~~/g, '$1')
    // collapse whitespace
    .replace(/\s+/g, ' ')
    .trim();
}


// Eagerly import all markdown files at build time
const modules = import.meta.glob('/src/content/insights/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const VALID_TYPES: InsightType[] = ['i6 on Media', 'i6 Article', 'i6 eBook', 'i6 Social'];
const MEDIA_TYPES: InsightType[] = ['i6 on Media', 'i6 Social'];
const INTELLIGENCE_INSIGHT_TYPES: InsightType[] = ['i6 Article', 'i6 eBook'];

const ALL: Insight[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    const fm = data as Partial<InsightFrontmatter>;
    if (!fm.title || !fm.language || !fm.type || !fm.date) return null;
    if (!VALID_TYPES.includes(fm.type as InsightType)) return null;
    return {
      id: fm.id,
      title: fm.title,
      type: fm.type,
      date: fm.date,
      language: fm.language,
      excerpt: plainTextExcerpt(fm.excerpt || ''),

      cluster: fm.cluster,
      cover_image: fm.cover_image ?? null,
      external_url: fm.external_url ?? null,
      read_time: fm.read_time,
      featured: fm.featured === true,
      gated: fm.gated === true,
      asset_url: fm.asset_url ?? null,
      cta_form: fm.cta_form === true,
      cta_form_text: fm.cta_form_text ?? null,
      slug:
        fm.slug ||
        path.split('/').pop()!.replace(/\.md$/, '').replace(/-(pt|en)$/, ''),
      content,
    } as Insight;
  })
  .filter((x): x is Insight => x !== null);

ALL.sort((a, b) => (a.date < b.date ? 1 : -1));

/**
 * Insights page (`/insights`) is media-focused.
 * Only `i6 on Media` and `i6 Social` items are listed here.
 * `i6 Article` and `i6 eBook` items live under `/i6-intelligence`.
 */
export const useInsights = (limit?: number) => {
  const { language } = useLanguage();
  const [items, setItems] = useState<Insight[]>([]);

  useEffect(() => {
    const filtered = ALL.filter(
      (i) => i.language === language && MEDIA_TYPES.includes(i.type),
    );
    setItems(limit ? filtered.slice(0, limit) : filtered);
  }, [language, limit]);

  return items;
};

/**
 * Returns `i6 Article` + `i6 eBook` items used by the
 * `/i6-intelligence` listing alongside Research pieces.
 */
export const useIntelligenceInsights = () => {
  const { language } = useLanguage();
  const [items, setItems] = useState<Insight[]>([]);

  useEffect(() => {
    const filtered = ALL.filter(
      (i) => i.language === language && INTELLIGENCE_INSIGHT_TYPES.includes(i.type),
    );
    setItems(filtered);
  }, [language]);

  return items;
};


export const useFeaturedInsights = (limit?: number) => {
  const { language } = useLanguage();
  const [items, setItems] = useState<Insight[]>([]);

  useEffect(() => {
    const filtered = ALL.filter((i) => i.language === language && i.featured === true);
    setItems(limit ? filtered.slice(0, limit) : filtered);
  }, [language, limit]);

  return items;
};

export const useInsight = (slug: string) => {
  const { language } = useLanguage();
  return ALL.find((i) => i.slug === slug && i.language === language) || null;
};

export const resolveCoverImage = (cover?: string | null) =>
  cover ? (cover.startsWith('http') ? cover : getPublicAssetUrl(cover.replace(/^\//, ''))) : null;
