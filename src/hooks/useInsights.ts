import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getPublicAssetUrl } from '@/utils/assetUtils';

export type InsightType = 'article' | 'linkedin' | 'press' | 'podcast' | 'video';

export interface InsightFrontmatter {
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

    // strip wrapping quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

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

// Eagerly import all markdown files at build time
const modules = import.meta.glob('/src/content/insights/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const ALL: Insight[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    const fm = data as Partial<InsightFrontmatter>;
    if (!fm.title || !fm.language || !fm.type || !fm.date) return null;
    return {
      title: fm.title,
      type: fm.type,
      date: fm.date,
      language: fm.language,
      excerpt: fm.excerpt || '',
      cluster: fm.cluster,
      cover_image: fm.cover_image ?? null,
      external_url: fm.external_url ?? null,
      read_time: fm.read_time,
      featured: fm.featured === true,
      gated: fm.gated === true,
      asset_url: fm.asset_url ?? null,
      slug:
        fm.slug ||
        path.split('/').pop()!.replace(/\.md$/, '').replace(/-(pt|en)$/, ''),
      content,
    } as Insight;
  })
  .filter((x): x is Insight => x !== null);

ALL.sort((a, b) => (a.date < b.date ? 1 : -1));

export const useInsights = (limit?: number) => {
  const { language } = useLanguage();
  const [items, setItems] = useState<Insight[]>([]);

  useEffect(() => {
    const filtered = ALL.filter((i) => i.language === language);
    setItems(limit ? filtered.slice(0, limit) : filtered);
  }, [language, limit]);

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
