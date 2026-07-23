import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getPublicAssetUrl } from '@/utils/assetUtils';

export interface SuccessStoryItem {
  id: string;
  slug: string;
  title: string;
  image: string;
  logo: string;
  segment: string;
  client: string;
  description: string;
  challenge: string;
  whatToAnticipate: string;
  prediction: string;
  solution: string;
  metric1: string;
  metric2: string;
  metric3: string;
  solutions: string[];
  quote: string;
  customerName: string;
  customerTitle: string;
  showHome: boolean;
  published: boolean;
  sortOrder: number;
  language: 'pt' | 'en';
  clientAnon: boolean;
}

interface UseSuccessStoriesMarkdownReturn {
  stories: SuccessStoryItem[];
  loading: boolean;
  error: string | null;
}

/**
 * Minimal YAML frontmatter parser — supports quoted strings, bools, numbers,
 * null, and inline arrays like `solutions: ["a", "b"]`.
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

    // Inline array
    if (value.startsWith('[') && value.endsWith(']')) {
      const inner = value.slice(1, -1).trim();
      if (!inner) { data[key] = []; continue; }
      const items = inner.match(/("([^"\\]|\\.)*"|'([^'\\]|\\.)*'|[^,]+)/g) || [];
      data[key] = items
        .map(it => {
          let s = it.trim();
          if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
            s = s.slice(1, -1).replace(/\\"/g, '"');
          }
          return s;
        })
        .filter(Boolean);
      continue;
    }

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1).replace(/\\"/g, '"');
    }
    if (value === '' || value === 'null' || value === '~') data[key] = '';
    else if (value === 'true') data[key] = true;
    else if (value === 'false') data[key] = false;
    else if (/^-?\d+(\.\d+)?$/.test(value)) data[key] = Number(value);
    else data[key] = value;
  }
  return { data, content: content.trim() };
}

const modules = import.meta.glob('/src/content/stories/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const asStr = (v: unknown): string => (v == null ? '' : String(v));

const ALL: SuccessStoryItem[] = Object.entries(modules)
  .map(([, raw]) => {
    const { data } = parseFrontmatter(raw);
    const fm = data as Record<string, unknown>;
    if (!fm.slug || !fm.language) return null;
    const slug = String(fm.slug);
    return {
      id: slug,
      slug,
      title: asStr(fm.title),
      image: asStr(fm.cover_image),
      logo: asStr(fm.logo),
      segment: asStr(fm.segment),
      client: asStr(fm.client),
      description: asStr(fm.description),
      challenge: asStr(fm.challenge),
      whatToAnticipate: asStr(fm.what_to_anticipate),
      prediction: asStr(fm.prediction),
      solution: asStr(fm.solution),
      metric1: asStr(fm.metric1),
      metric2: asStr(fm.metric2),
      metric3: asStr(fm.metric3),
      solutions: Array.isArray(fm.solutions) ? (fm.solutions as string[]) : [],
      quote: asStr(fm.quote),
      customerName: asStr(fm.customer_name),
      customerTitle: asStr(fm.customer_title),
      showHome: fm.show_home === true,
      published: fm.published !== false,
      sortOrder: typeof fm.sort_order === 'number' ? (fm.sort_order as number) : 999,
      language: (fm.language === 'en' ? 'en' : 'pt') as 'pt' | 'en',
      clientAnon: fm.client_anon === true,
    } as SuccessStoryItem;
  })
  .filter((x): x is SuccessStoryItem => x !== null)
  .filter(s => s.published);

export const getStoryBySlug = (slug: string, language: 'pt' | 'en'): SuccessStoryItem | null => {
  const story = ALL.find(s => s.slug === slug && s.language === language);
  if (!story) return null;
  return {
    ...story,
    image: getPublicAssetUrl(story.image),
    logo: getPublicAssetUrl(story.logo),
  };
};

export const useSuccessStoriesMarkdown = (): UseSuccessStoriesMarkdownReturn => {
  const [stories, setStories] = useState<SuccessStoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);
      const filtered = ALL
        .filter(s => s.language === language)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(s => ({
          ...s,
          image: getPublicAssetUrl(s.image),
          logo: getPublicAssetUrl(s.logo),
        }));
      setStories(filtered);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [language]);

  return { stories, loading, error };
};
