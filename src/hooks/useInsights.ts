import { useEffect, useState } from 'react';
import matter from 'gray-matter';
import { Buffer } from 'buffer';
import { useLanguage } from '@/contexts/LanguageContext';
import { getPublicAssetUrl } from '@/utils/assetUtils';

// gray-matter depends on Buffer; polyfill for browser
if (typeof window !== 'undefined' && !(window as unknown as { Buffer?: unknown }).Buffer) {
  (window as unknown as { Buffer: typeof Buffer }).Buffer = Buffer;
}

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
}

export interface Insight extends InsightFrontmatter {
  content: string;
}

// Eagerly import all markdown files at build time
const modules = import.meta.glob('/public/content/insights/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const ALL: Insight[] = Object.entries(modules).map(([path, raw]) => {
  const parsed = matter(raw);
  const fm = parsed.data as InsightFrontmatter;
  return {
    ...fm,
    slug: fm.slug || path.split('/').pop()!.replace(/\.md$/, '').replace(/-(pt|en)$/, ''),
    content: parsed.content,
  };
});

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

export const useInsight = (slug: string) => {
  const { language } = useLanguage();
  return ALL.find((i) => i.slug === slug && i.language === language) || null;
};

export const resolveCoverImage = (cover?: string | null) =>
  cover ? (cover.startsWith('http') ? cover : getPublicAssetUrl(cover.replace(/^\//, ''))) : null;
