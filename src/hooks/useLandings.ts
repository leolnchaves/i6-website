import { useLanguage } from '@/contexts/LanguageContext';

export const LANDING_SLUGS = [
  'demand-supply-efficiency',
  'data-monetization',
  'predictive-operations',
  'behavior-conversion',
] as const;

export type LandingSlug = (typeof LANDING_SLUGS)[number];

export interface LandingFrontmatter {
  title: string;
  description: string;
  slug: LandingSlug;
  language: 'pt' | 'en';
  hero_kicker?: string;
  hero_headline?: string;
  hero_sub?: string;
  sectors?: string;          // csv
  hub_theme?: string;        // demand | margin | inventory | mix | propensity
  related_engines?: string;  // csv: i6recsys,i6previsio,...
  related_stories?: string;  // csv of story slugs
  cover_image?: string | null;
}

export interface LandingSection {
  id: string;     // pain | problem | solution | application | results | faq | (other)
  title: string;
  body: string;   // raw markdown
}

export interface LandingPiece extends LandingFrontmatter {
  sections: LandingSection[];
  faq: { q: string; a: string }[];
  stats: { value: string; label: string; source?: string }[];
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
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (value === '' || value === 'null' || value === '~') data[key] = null;
    else if (value === 'true') data[key] = true;
    else if (value === 'false') data[key] = false;
    else data[key] = value;
  }
  return { data, content: content.trim() };
}

const SECTION_ID_MAP: Record<string, string> = {
  pain: 'pain', dor: 'pain', dores: 'pain',
  problem: 'problem', problema: 'problem',
  solution: 'solution', solucao: 'solution', 'solução': 'solution',
  application: 'application', aplicacao: 'application', 'aplicação': 'application',
  results: 'results', resultados: 'results',
  faq: 'faq', 'perguntas frequentes': 'faq',
};

function normalizeId(heading: string): string {
  const k = heading.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  return SECTION_ID_MAP[k] || k.replace(/\s+/g, '-');
}

function splitSections(content: string): LandingSection[] {
  const lines = content.split(/\r?\n/);
  const sections: LandingSection[] = [];
  let current: LandingSection | null = null;
  for (const line of lines) {
    const m = line.match(/^##\s+(.+?)\s*$/);
    if (m) {
      if (current) sections.push(current);
      current = { id: normalizeId(m[1]), title: m[1].trim(), body: '' };
    } else if (current) {
      current.body += line + '\n';
    }
  }
  if (current) sections.push(current);
  return sections.map((s) => ({ ...s, body: s.body.trim() }));
}

function extractFAQ(faqBody: string): { q: string; a: string }[] {
  if (!faqBody) return [];
  const re = /\*\*([^*]+\?)\*\*\s*\n+([^\n][^\n]*(?:\n[^\n*][^\n]*)*)/g;
  const out: { q: string; a: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(faqBody)) !== null) out.push({ q: m[1].trim(), a: m[2].trim() });
  return out;
}

function extractStats(resultsBody: string): { value: string; label: string; source?: string }[] {
  if (!resultsBody) return [];
  // Bullets like:  - **−38%** ruptura | varejo farma
  const out: { value: string; label: string; source?: string }[] = [];
  for (const line of resultsBody.split(/\r?\n/)) {
    const m = line.match(/^\s*-\s+\*\*([^*]+)\*\*\s*(.+)$/);
    if (m) {
      const rest = m[2].split('|').map((s) => s.trim());
      out.push({ value: m[1].trim(), label: rest[0] || '', source: rest[1] });
    }
  }
  return out;
}

const modules = import.meta.glob('/src/content/landings/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const ALL: LandingPiece[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    const fm = data as Partial<LandingFrontmatter>;
    if (!fm.title || !fm.language || !fm.slug) return null;
    const sections = splitSections(content);
    const faqSec = sections.find((s) => s.id === 'faq');
    const resSec = sections.find((s) => s.id === 'results');
    return {
      ...(fm as LandingFrontmatter),
      sections,
      faq: faqSec ? extractFAQ(faqSec.body) : [],
      stats: resSec ? extractStats(resSec.body) : [],
    } as LandingPiece;
  })
  .filter((x): x is LandingPiece => x !== null);

export const isLandingSlug = (s: string): s is LandingSlug =>
  (LANDING_SLUGS as readonly string[]).includes(s);

export const useLanding = (slug: string): LandingPiece | null => {
  const { language } = useLanguage();
  return ALL.find((l) => l.slug === slug && l.language === language) || null;
};

export const getAllLandings = () => ALL;
