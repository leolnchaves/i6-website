import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useIntelligence, resolveIntelligenceCover, type IntelligencePiece } from '@/hooks/useIntelligence';

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

const IntelligenceCard = ({ piece }: { piece: IntelligencePiece }) => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const cover = resolveIntelligenceCover(piece.cover_image);
  const sectorLabels = language === 'pt' ? SECTOR_LABELS_PT : SECTOR_LABELS_EN;
  const themeLabels = language === 'pt' ? THEME_LABELS_PT : THEME_LABELS_EN;

  return (
    <Link to={localized(`/i6-intelligence/${piece.slug}`)} className="block h-full">
      <article className="group h-full flex flex-col rounded-xl border border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-[#F4845F]/40 transition-all overflow-hidden">
        <div className="h-40 overflow-hidden bg-white/5 relative">
          {cover ? (
            <img src={cover} alt={piece.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
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
                i6 Intelligence
              </span>
            </div>
          )}
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {piece.sector && (
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded bg-[#F4845F]/15 text-[#F4845F]">
                {sectorLabels[piece.sector] || piece.sector}
              </span>
            )}
            {piece.theme && (
              <span className="text-xs font-medium uppercase tracking-wider px-2 py-1 rounded bg-white/10 text-white/70">
                {themeLabels[piece.theme] || piece.theme}
              </span>
            )}
            <time className="text-xs text-white/40 ml-auto">
              {new Date(piece.date).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
            </time>
          </div>
          <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-[#F4845F] transition-colors">
            {piece.title}
          </h2>
          <p className="text-sm text-white/60 flex-1">{piece.excerpt}</p>
          {piece.read_time && (
            <p className="text-xs text-white/40 mt-4">{piece.read_time} min</p>
          )}
        </div>
      </article>
    </Link>
  );
};

const Intelligence = () => {
  const { language } = useLanguage();
  const pieces = useIntelligence();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sector, setSectorState] = useState<string | null>(searchParams.get('sector'));
  const [theme, setThemeState] = useState<string | null>(searchParams.get('theme'));

  // Sync state from URL changes (e.g., back/forward, links)
  useEffect(() => {
    setSectorState(searchParams.get('sector'));
    setThemeState(searchParams.get('theme'));
  }, [searchParams]);

  const updateParam = (key: 'sector' | 'theme', value: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  };
  const setSector = (v: string | null) => { setSectorState(v); updateParam('sector', v); };
  const setTheme = (v: string | null) => { setThemeState(v); updateParam('theme', v); };

  const sectors = useMemo(() => Array.from(new Set(pieces.map((p) => p.sector).filter(Boolean))) as string[], [pieces]);
  const themes = useMemo(() => Array.from(new Set(pieces.map((p) => p.theme).filter(Boolean))) as string[], [pieces]);

  const filtered = pieces.filter((p) =>
    (!sector || p.sector === sector) && (!theme || p.theme === theme)
  );

  const heading = 'i6 Research';
  const subheading = language === 'pt'
    ? 'Inteligência aplicada para decisões de demanda, margem, estoque, mix e propensão para os setores de varejo, indústria, financeiro e farma.'
    : 'Applied intelligence for decisions on demand, margin, inventory, mix and propensity across retail, industry, financial services and pharma.';

  const sectorLabels = language === 'pt' ? SECTOR_LABELS_PT : SECTOR_LABELS_EN;
  const themeLabels = language === 'pt' ? THEME_LABELS_PT : THEME_LABELS_EN;

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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{heading}</h1>
          <p className="text-lg text-white/70">{subheading}</p>
        </header>

        {(sectors.length > 0 || themes.length > 0) && (
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
            {filtered.map((p) => <IntelligenceCard key={`${p.slug}-${p.language}`} piece={p} />)}
          </div>
        )}
      </section>
    </>
  );
};

export default Intelligence;
