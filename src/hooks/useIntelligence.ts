import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getPublicAssetUrl } from '@/utils/assetUtils';

export interface IntelligenceFrontmatter {
  id?: string;
  title: string;
  slug: string;
  date: string;
  language: 'pt' | 'en';
  excerpt: string;
  sector?: string;        // varejo | farma | industria | ecommerce | multissetor
  theme?: string;         // demanda | margem | estoque | mix | propensao | cac
  cover_image?: string | null;
  read_time?: number;
  featured?: boolean;
  faq?: string;
  related_product?: string;     // anchor on /solutions (e.g. "i6previsio", "i6recsys")
  related_story_slug?: string;  // success story slug
  gated?: boolean;              // requires lead-gate form before reading
  asset_url?: string | null;    // optional PDF sent by i6Hub after gate submit
  cta_form?: boolean;
  cta_form_text?: string | null;
}

export interface IntelligencePiece extends IntelligenceFrontmatter {
  content: string;
}


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
    let wasDoubleQuoted = false;
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
      wasDoubleQuoted = true;
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }
    if (wasDoubleQuoted) value = decodeYamlEscapes(value);
    if (value === '' || value === 'null' || value === '~') data[key] = null;
    else if (value === 'true') data[key] = true;
    else if (value === 'false') data[key] = false;
    else if (/^-?\d+(\.\d+)?$/.test(value)) data[key] = Number(value);
    else data[key] = value;
  }
  return { data, content: content.trim() };
}

const modules = import.meta.glob('/src/content/intelligence/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const ALL: IntelligencePiece[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    const fm = data as Partial<IntelligenceFrontmatter>;
    if (!fm.title || !fm.language || !fm.date) return null;
    return {
      id: fm.id,
      title: fm.title,
      date: fm.date,
      language: fm.language,
      excerpt: fm.excerpt || '',
      sector: fm.sector,
      theme: fm.theme,
      cover_image: fm.cover_image ?? null,
      read_time: fm.read_time,
      featured: fm.featured === true,
      related_product: fm.related_product,
      related_story_slug: fm.related_story_slug,
      gated: fm.gated === true,
      asset_url: fm.asset_url ?? null,
      cta_form: fm.cta_form === true,
      cta_form_text: fm.cta_form_text ?? null,
      slug: fm.slug || path.split('/').pop()!.replace(/\.md$/, '').replace(/-(pt|en)$/, ''),
      content,
    } as IntelligencePiece;
  })
  .filter((x): x is IntelligencePiece => x !== null);

ALL.sort((a, b) => (a.date < b.date ? 1 : -1));


export const useIntelligence = (limit?: number) => {
  const { language } = useLanguage();
  const [items, setItems] = useState<IntelligencePiece[]>([]);
  useEffect(() => {
    const filtered = ALL.filter((i) => i.language === language);
    setItems(limit ? filtered.slice(0, limit) : filtered);
  }, [language, limit]);
  return items;
};

export const useIntelligencePiece = (slug: string) => {
  const { language } = useLanguage();
  return ALL.find((i) => i.slug === slug && i.language === language) || null;
};

export const resolveIntelligenceCover = (cover?: string | null) =>
  cover ? (cover.startsWith('http') ? cover : getPublicAssetUrl(cover.replace(/^\//, ''))) : null;
