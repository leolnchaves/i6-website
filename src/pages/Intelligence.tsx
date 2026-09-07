import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useIntelligence, resolveIntelligenceCover, type IntelligencePiece } from '@/hooks/useIntelligence';
import { useIntelligenceInsights, resolveCoverImage, type Insight } from '@/hooks/useInsights';

/* -------------------------------------------------------------------------- */
/* Rótulos                                                                     */
/* -------------------------------------------------------------------------- */

type Lang = 'pt' | 'en' | 'es';

const THEME_LABELS: Record<Lang, Record<string, string>> = {
  pt: {
    demanda: 'Demanda',
    margem: 'Margem',
    estoque: 'Estoque',
    mix: 'Mix & Sortimento',
    propensao: 'Propensão',
    cac: 'CAC',
  },
  en: {
    demanda: 'Demand',
    margem: 'Margin',
    estoque: 'Inventory',
    mix: 'Mix & Assortment',
    propensao: 'Propensity',
    cac: 'CAC',
    demand: 'Demand',
    margin: 'Margin',
    inventory: 'Inventory',
    assortment: 'Mix & Assortment',
    propensity: 'Propensity',
  },
  es: {
    demanda: 'Demanda',
    margem: 'Margen',
    estoque: 'Inventario',
    mix: 'Mix y Surtido',
    propensao: 'Propensión',
    cac: 'CAC',
    demand: 'Demanda',
    margin: 'Margen',
    inventory: 'Inventario',
    assortment: 'Mix y Surtido',
    propensity: 'Propensión',
  },
};

interface Copy {
  badge: string;
  title: string;
  subtitle: string;
  type: string;
  theme: string;
  all: string;
  results: (n: number) => string;
  readTime: (n: number) => string;
  featured: string;
  read: string;
  empty: string;
  clear: string;
  seoDescription: string;
}

const COPY: Record<Lang, Copy> = {
  pt: {
    badge: 'infinity6 · i6 Deep Research',
    title: 'i6 Deep Research',
    subtitle:
      'Inteligência aplicada para decisões de demanda, margem, estoque, mix e propensão — research e eBooks da infinity6 para varejo, indústria, serviços financeiros e farma.',
    type: 'Tipo',
    theme: 'Tema',
    all: 'Todos',
    results: (n) => (n === 1 ? '1 resultado' : `${n} resultados`),
    readTime: (n) => `${n} min de leitura`,
    featured: 'Destaque',
    read: 'Ler',
    empty: 'Nenhuma peça corresponde aos filtros selecionados',
    clear: 'Limpar filtros',
    seoDescription:
      'Research e eBooks da infinity6 sobre demanda, margem, estoque, mix e propensão para varejo, indústria, serviços financeiros e farma.',
  },
  en: {
    badge: 'infinity6 · i6 Deep Research',
    title: 'i6 Deep Research',
    subtitle:
      'Applied intelligence for decisions on demand, margin, inventory, mix and propensity — research and eBooks by infinity6 across retail, industry, financial services and pharma.',
    type: 'Type',
    theme: 'Theme',
    all: 'All',
    results: (n) => (n === 1 ? '1 result' : `${n} results`),
    readTime: (n) => `${n} min read`,
    featured: 'Featured',
    read: 'Read',
    empty: 'No pieces match the selected filters',
    clear: 'Clear filters',
    seoDescription:
      'Research and eBooks by infinity6 on demand, margin, inventory, mix and propensity for retail, industry, financial services and pharma.',
  },
  es: {
    badge: 'infinity6 · i6 Deep Research',
    title: 'i6 Deep Research',
    subtitle:
      'Inteligencia aplicada para decisiones de demanda, margen, inventario, mix y propensión — research y eBooks de infinity6 para retail, industria, servicios financieros y farma.',
    type: 'Tipo',
    theme: 'Tema',
    all: 'Todos',
    results: (n) => (n === 1 ? '1 resultado' : `${n} resultados`),
    readTime: (n) => `${n} min de lectura`,
    featured: 'Destacado',
    read: 'Leer',
    empty: 'Ninguna pieza coincide con los filtros seleccionados',
    clear: 'Limpiar filtros',
    seoDescription:
      'Research y eBooks de infinity6 sobre demanda, margen, inventario, mix y propensión para retail, industria, servicios financieros y farma.',
  },
};

/* -------------------------------------------------------------------------- */
/* Feed                                                                        */
/* -------------------------------------------------------------------------- */

type FeedKind = 'i6 Research' | 'i6 eBook';

interface FeedItem {
  kind: FeedKind;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  cover: string | null;
  theme?: string;
  language: 'pt' | 'en';
  readTime?: number;
  featured?: boolean;
}

function fromIntelligence(p: IntelligencePiece): FeedItem {
  return {
    // O tipo real declarado no frontmatter (o hook só devolve i6 Research/i6 eBook).
    kind: (p.type as FeedKind) || 'i6 Research',
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    cover: resolveIntelligenceCover(p.cover_image),
    theme: p.theme,
    language: p.language,
    readTime: p.read_time,
    featured: p.featured === true,
  };
}

function fromInsight(i: Insight): FeedItem {
  return {
    kind: i.type as FeedKind,
    slug: i.slug,
    title: i.title,
    excerpt: i.excerpt,
    date: i.date,
    cover: resolveCoverImage(i.cover_image),
    theme: i.theme,
    language: i.language,
    readTime: i.read_time,
    featured: i.featured === true,
  };
}

/** Textura discreta usada só quando a peça não tem capa. */
const CornerTexture = () => (
  <svg
    aria-hidden="true"
    className="pointer-events-none absolute right-0 top-0 h-24 w-24 text-border"
    viewBox="0 0 96 96"
    fill="none"
  >
    {[0, 12, 24, 36, 48, 60, 72].map((offset) => (
      <line
        key={offset}
        x1={96 - offset}
        y1="0"
        x2="96"
        y2={offset}
        stroke="currentColor"
        strokeWidth="1"
      />
    ))}
  </svg>
);

const FeedCard = ({ item, span }: { item: FeedItem; span: boolean }) => {
  const { language } = useLanguage();
  const lang = (language as Lang) in COPY ? (language as Lang) : 'pt';
  const copy = COPY[lang];
  const localized = useLocalizedPath();
  const themeLabels = THEME_LABELS[lang];
  const locale = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US';

  return (
    <Link
      to={localized(`/i6-intelligence/${item.slug}`)}
      className={`block h-full ${span ? 'md:col-span-2' : ''}`}
    >
      <article className="group sand-card sand-card-hover relative flex h-full flex-col overflow-hidden">
        {item.cover ? (
          <div className={`overflow-hidden bg-secondary ${span ? 'h-44 md:h-52' : 'h-36'}`}>
            <img
              src={item.cover}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <CornerTexture />
        )}

        <div className={`flex flex-1 flex-col ${span ? 'p-6 md:p-8' : 'p-5 md:p-6'}`}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
            <span className="uppercase tracking-[0.16em] text-primary">{item.kind}</span>
            {item.featured && (
              <span className="rounded-full border border-primary/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-primary">
                {copy.featured}
              </span>
            )}
          </div>

          <h2
            className={`mt-3 font-display leading-snug text-foreground transition-colors group-hover:text-primary ${
              span ? 'text-xl md:text-2xl' : 'text-[17px]'
            }`}
          >
            {item.title}
          </h2>

          {item.excerpt && (
            <p
              className={`mt-3 text-[13px] leading-relaxed text-muted-foreground ${
                span ? 'line-clamp-4 max-w-3xl' : 'line-clamp-3'
              }`}
            >
              {item.excerpt}
            </p>
          )}

          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-4 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {item.theme && <span>{themeLabels[item.theme] || item.theme}</span>}
            {item.date && (
              <time dateTime={item.date}>
                {new Date(item.date).toLocaleDateString(locale, {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </time>
            )}
            {item.readTime && <span>{copy.readTime(item.readTime)}</span>}
            <span className="ml-auto flex items-center gap-1.5 normal-case tracking-normal text-primary">
              {copy.read}
              <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

/* -------------------------------------------------------------------------- */
/* Página                                                                      */
/* -------------------------------------------------------------------------- */

const chipClass = (active: boolean) =>
  `rounded-full px-3 py-1 text-xs font-medium transition-all ${
    active
      ? 'bg-primary text-primary-foreground'
      : 'border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
  }`;

const Intelligence = () => {
  const { language } = useLanguage();
  const lang = (language as Lang) in COPY ? (language as Lang) : 'pt';
  const copy = COPY[lang];
  const themeLabels = THEME_LABELS[lang];

  const pieces = useIntelligence();
  const intelInsights = useIntelligenceInsights();
  const [searchParams, setSearchParams] = useSearchParams();
  const [kind, setKindState] = useState<FeedKind | null>(
    (searchParams.get('kind') as FeedKind) || null,
  );
  const [theme, setThemeState] = useState<string | null>(searchParams.get('theme'));

  useEffect(() => {
    setKindState((searchParams.get('kind') as FeedKind) || null);
    setThemeState(searchParams.get('theme'));
  }, [searchParams]);

  const updateParam = (key: 'kind' | 'theme', value: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  };
  const setKind = (v: FeedKind | null) => {
    setKindState(v);
    updateParam('kind', v);
  };
  const setTheme = (v: string | null) => {
    setThemeState(v);
    updateParam('theme', v);
  };
  const clearFilters = () => {
    setKindState(null);
    setThemeState(null);
    const next = new URLSearchParams(searchParams);
    next.delete('kind');
    next.delete('theme');
    setSearchParams(next, { replace: true });
  };

  const feed: FeedItem[] = useMemo(() => {
    // Um `i6 eBook` gravado na pasta de research chega pelas duas fontes.
    // A peça da pasta de research tem precedência (é a que traz corpo de artigo).
    const byKey = new Map<string, FeedItem>();
    for (const item of [...pieces.map(fromIntelligence), ...intelInsights.map(fromInsight)]) {
      const key = `${item.slug}-${item.language}`;
      if (!byKey.has(key)) byKey.set(key, item);
    }
    const combined = Array.from(byKey.values());
    // Desempate estável por slug quando duas peças têm a mesma data.
    combined.sort((a, b) => (a.date === b.date ? a.slug.localeCompare(b.slug) : a.date < b.date ? 1 : -1));
    return combined;
  }, [pieces, intelInsights]);

  const themes = useMemo(
    () => Array.from(new Set(feed.map((p) => p.theme).filter(Boolean))) as string[],
    [feed],
  );

  const filtered = useMemo(
    () =>
      feed.filter((p) => {
        if (kind && p.kind !== kind) return false;
        if (theme && p.theme !== theme) return false;
        return true;
      }),
    [feed, kind, theme],
  );

  // Apenas o featured mais recente ganha a linha inteira (feed já ordenado por data).
  const heroSlug = filtered.find((p) => p.featured)?.slug ?? null;

  // O destaque abre a lista mesmo quando existem peças mais recentes.
  const ordered = useMemo(() => {
    if (!heroSlug) return filtered;
    const idx = filtered.findIndex((p) => p.slug === heroSlug);
    if (idx <= 0) return filtered;
    return [filtered[idx], ...filtered.slice(0, idx), ...filtered.slice(idx + 1)];
  }, [filtered, heroSlug]);

  const kinds: FeedKind[] = ['i6 Research', 'i6 eBook'];
  const hasFilters = kind !== null || theme !== null;

  return (
    <>
      <Helmet>
        <html lang={lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es' : 'en'} />
        <title>{`${copy.title} | infinity6`}</title>
        <meta name="description" content={copy.seoDescription} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: copy.title,
            description: copy.seoDescription,
          })}
        </script>
      </Helmet>

      <div className="theme-sand">
        {/* Abertura tipográfica */}
        <section className="mx-auto max-w-7xl px-6 pt-32 pb-8 md:pt-36 md:pb-10">
          <div className="grid grid-cols-1 items-end gap-y-6 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
                {copy.badge}
              </p>
              <h1 className="mt-4 font-display text-[2.2rem] leading-[1.05] tracking-tight text-foreground sm:text-[2.8rem] lg:text-[3.4rem]">
                {copy.title}
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
                {copy.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Filtros */}
        <section className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-4 border-y border-border py-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {copy.type}
              </span>
              <button type="button" onClick={() => setKind(null)} className={chipClass(kind === null)}>
                {copy.all}
              </button>
              {kinds.map((k) => (
                <button key={k} type="button" onClick={() => setKind(k)} className={chipClass(kind === k)}>
                  {k}
                </button>
              ))}
              <span className="ml-auto text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {copy.results(filtered.length)}
              </span>
            </div>

            {themes.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {copy.theme}
                </span>
                <button type="button" onClick={() => setTheme(null)} className={chipClass(theme === null)}>
                  {copy.all}
                </button>
                {themes.map((tm) => (
                  <button key={tm} type="button" onClick={() => setTheme(tm)} className={chipClass(theme === tm)}>
                    {themeLabels[tm] || tm}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Grade */}
        <section className="mx-auto max-w-7xl px-6 pb-24 pt-10">
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-lg text-foreground">{copy.empty}</p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  {copy.clear}
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-flow-row-dense grid-cols-1 gap-5 md:grid-cols-2">
              {filtered.map((p) => (
                <FeedCard
                  key={`${p.kind}-${p.slug}-${p.language}`}
                  item={p}
                  span={p.slug === heroSlug}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Intelligence;
