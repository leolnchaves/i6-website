import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useIntelligence, resolveIntelligenceCover, type IntelligencePiece } from '@/hooks/useIntelligence';
import { useIntelligenceInsights, resolveCoverImage, type Insight } from '@/hooks/useInsights';

const SECTOR_LABELS_PT: Record<string, string> = {
  varejo: 'Varejo',
  farma: 'Farma',
  industria: 'Indústria',
  ecommerce: 'E-commerce',
  multissetor: 'Multissetor',
};
const SECTOR_LABELS_EN: Record<string, string> = {
  varejo: 'Retail',
  farma: 'Pharma',
  industria: 'Industry',
  ecommerce: 'E-commerce',
  multissetor: 'Cross-sector',
  retail: 'Retail',
  pharma: 'Pharma',
  industry: 'Industry',
};

const THEME_LABELS_PT: Record<string, string> = {
  demanda: 'Demanda',
  margem: 'Margem',
  estoque: 'Estoque',
  mix: 'Mix & Sortimento',
  propensao: 'Propensão',
  cac: 'CAC',
};
const THEME_LABELS_EN: Record<string, string> = {
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
};

type FeedKind = 'i6 Research' | 'i6 eBook';

interface FeedItem {
  kind: FeedKind;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  cover: string | null;
  sector?: string;
  theme?: string;
  language: 'pt' | 'en';
  readTime?: number;
}

function fromIntelligence(p: IntelligencePiece): FeedItem {
  return {
    kind: 'i6 Research',
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    cover: resolveIntelligenceCover(p.cover_image),
    sector: p.sector,
    theme: p.theme,
    language: p.language,
    readTime: p.read_time,
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
    language: i.language,
    readTime: i.read_time,
  };
}

const KIND_BADGE_LABEL: Record<FeedKind, string> = {
  'i6 Research': 'i6 Research',
  'i6 eBook': 'i6 eBook',
};

const FeedCard = ({ item }: { item: FeedItem }) => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const sectorLabels = language === 'pt' ? SECTOR_LABELS_PT : SECTOR_LABELS_EN;
  const themeLabels = language === 'pt' ? THEME_LABELS_PT : THEME_LABELS_EN;

  return (
    <Link to={localized(`/i6-intelligence/${item.slug}`)} className="block h-full">
      <article className="group h-full flex flex-col rounded-xl border border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-[#F4845F]/40 transition-all overflow-hidden">
        <div className="h-40 overflow-hidden bg-white/5 relative">
          {item.cover ? (
            <img src={item.cover} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center relative overflow-hidden"
              style={{
                background:
                  'radial-gradient(120% 80% at 30% 20%, rgba(244,132,95,0.12) 0%, rgba(244,132,95,0) 60%), linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
              }}
              aria-hidden="true"
            >
              <span className="text-2xl md:text-3xl font-bold uppercase tracking-[0.25em] text-white/10 select-none">
                {item.kind}
              </span>
            </div>
          )}
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded bg-[#F4845F]/15 text-[#F4845F]">
              {KIND_BADGE_LABEL[item.kind]}
            </span>
            {item.sector && (
              <span className="text-xs font-medium uppercase tracking-wider px-2 py-1 rounded bg-white/10 text-white/70">
                {sectorLabels[item.sector] || item.sector}
              </span>
            )}
            {item.theme && (
              <span className="text-xs font-medium uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-white/60">
                {themeLabels[item.theme] || item.theme}
              </span>
            )}
            <time className="text-xs text-white/40 ml-auto">
              {new Date(item.date).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
            </time>
          </div>
          <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-[#F4845F] transition-colors">
            {item.title}
          </h2>
          <p className="text-sm text-white/60 flex-1">{item.excerpt}</p>
          {item.readTime && (
            <p className="text-xs text-white/40 mt-4">{item.readTime} min</p>
          )}
        </div>
      </article>
    </Link>
  );
};

const Intelligence = () => {
  const { language } = useLanguage();
  const pieces = useIntelligence();
  const intelInsights = useIntelligenceInsights();
  const [searchParams, setSearchParams] = useSearchParams();
  const [kind, setKindState] = useState<FeedKind | null>(
    (searchParams.get('kind') as FeedKind) || null,
  );
  const [sector, setSectorState] = useState<string | null>(searchParams.get('sector'));
  const [theme, setThemeState] = useState<string | null>(searchParams.get('theme'));

  useEffect(() => {
    setKindState((searchParams.get('kind') as FeedKind) || null);
    setSectorState(searchParams.get('sector'));
    setThemeState(searchParams.get('theme'));
  }, [searchParams]);

  const updateParam = (key: 'kind' | 'sector' | 'theme', value: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  };
  const setKind = (v: FeedKind | null) => { setKindState(v); updateParam('kind', v); };
  const setSector = (v: string | null) => { setSectorState(v); updateParam('sector', v); };
  const setTheme = (v: string | null) => { setThemeState(v); updateParam('theme', v); };

  const feed: FeedItem[] = useMemo(() => {
    const combined = [
      ...pieces.map(fromIntelligence),
      ...intelInsights.map(fromInsight),
    ];
    combined.sort((a, b) => (a.date < b.date ? 1 : -1));
    return combined;
  }, [pieces, intelInsights]);

  const sectors = useMemo(
    () => Array.from(new Set(feed.map((p) => p.sector).filter(Boolean))) as string[],
    [feed],
  );
  const themes = useMemo(
    () => Array.from(new Set(feed.map((p) => p.theme).filter(Boolean))) as string[],
    [feed],
  );

  // Sector/theme filters only apply to Research; when a non-Research kind is
  // selected we ignore them visually & functionally.
  const showSectorTheme = kind === null || kind === 'i6 Research';

  const filtered = feed.filter((p) => {
    if (kind && p.kind !== kind) return false;
    if (showSectorTheme) {
      if (sector && p.sector !== sector) return false;
      if (theme && p.theme !== theme) return false;
    }
    return true;
  });

  const heading = 'i6 Research';
  const subheading = language === 'pt'
    ? 'Inteligência aplicada para decisões de demanda, margem, estoque, mix e propensão. Research, artigos e eBooks da infinity6 para varejo, indústria, financeiro e farma.'
    : 'Applied intelligence for decisions on demand, margin, inventory, mix and propensity. Research, articles and eBooks by infinity6 across retail, industry, financial services and pharma.';

  const sectorLabels = language === 'pt' ? SECTOR_LABELS_PT : SECTOR_LABELS_EN;
  const themeLabels = language === 'pt' ? THEME_LABELS_PT : THEME_LABELS_EN;

  const kinds: FeedKind[] = ['i6 Research', 'i6 eBook'];

  return (
    <>
      <Helmet>
        <html lang={language === 'pt' ? 'pt-BR' : 'en'} />
        <title>{`i6 Research | infinity6`}</title>
        <meta name="description" content={subheading} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: heading,
          description: subheading,
        })}</script>
      </Helmet>

      <section className="container mx-auto px-6 pt-32 pb-20">
        <header className="max-w-3xl mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#F4845F] mb-3">infinity6 · Research</p>
          <h1 className="sr-only">{heading}</h1>
          <p className="text-lg text-white/70">{subheading}</p>
        </header>

        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs uppercase tracking-wider text-white/40 mr-2">{language === 'pt' ? 'Tipo' : 'Type'}</span>
          <button
            onClick={() => setKind(null)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${kind === null ? 'bg-[#F4845F] text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
          >
            {language === 'pt' ? 'Todos' : 'All'}
          </button>
          {kinds.map((k) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${kind === k ? 'bg-[#F4845F] text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
            >
              {KIND_BADGE_LABEL[k]}
            </button>
          ))}
        </div>

        {showSectorTheme && (sectors.length > 0 || themes.length > 0) && (
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {sectors.length > 0 && (
              <>
                <span className="text-xs uppercase tracking-wider text-white/40 mr-2">{language === 'pt' ? 'Setor' : 'Sector'}</span>
                <button
                  onClick={() => setSector(null)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${sector === null ? 'bg-[#F4845F] text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                >
                  {language === 'pt' ? 'Todos' : 'All'}
                </button>
                {sectors.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSector(s)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${sector === s ? 'bg-[#F4845F] text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                  >
                    {sectorLabels[s] || s}
                  </button>
                ))}
                <span className="w-px h-4 bg-white/10 mx-2" />
              </>
            )}
            {themes.length > 0 && (
              <>
                <span className="text-xs uppercase tracking-wider text-white/40 mr-2">{language === 'pt' ? 'Tema' : 'Theme'}</span>
                <button
                  onClick={() => setTheme(null)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${theme === null ? 'bg-[#F4845F] text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                >
                  {language === 'pt' ? 'Todos' : 'All'}
                </button>
                {themes.map((tm) => (
                  <button
                    key={tm}
                    onClick={() => setTheme(tm)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${theme === tm ? 'bg-[#F4845F] text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                  >
                    {themeLabels[tm] || tm}
                  </button>
                ))}
              </>
            )}
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="text-white/50">{language === 'pt' ? 'Em breve, novas peças' : 'New pieces coming soon'}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => <FeedCard key={`${p.kind}-${p.slug}-${p.language}`} item={p} />)}
          </div>
        )}
      </section>
    </>
  );
};

export default Intelligence;
