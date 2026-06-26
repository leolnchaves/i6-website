import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useInsights, resolveCoverImage, type Insight } from '@/hooks/useInsights';
import SEOHead from '@/components/common/SEOHead';
import { getPublicAssetUrl } from '@/utils/assetUtils';

const i6SymbolFallback = getPublicAssetUrl('content/logos/infinity6_CMYK_color_symbol_72dpi.png');

const InsightCard = ({ insight }: { insight: Insight }) => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const isExternal = !insight.gated && insight.type !== 'i6 Article' && !!insight.external_url;
  const resolved = resolveCoverImage(insight.cover_image);
  const hasLogo = !!resolved;
  const logoSrc = resolved || i6SymbolFallback;

  const typeLabel = insight.type;

  const cardContent = (
    <article className="group relative h-full flex flex-col rounded-xl border border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-[#F4845F]/40 transition-all p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#F4845F]/15 text-[#F4845F]">
            {typeLabel}
          </span>
          <time className="text-[10px] text-white/40">
            {new Date(insight.date).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
          </time>
        </div>
        <img
          src={logoSrc}
          alt={hasLogo ? `${insight.title} source logo` : 'infinity6'}
          className={`ml-auto h-8 max-w-[96px] object-contain shrink-0 transition-opacity duration-300 ${hasLogo ? 'opacity-80 group-hover:opacity-100' : 'opacity-40 group-hover:opacity-60'}`}
          loading="lazy"
        />
      </div>
      <h2 className="text-sm font-semibold text-white mb-2 group-hover:text-[#F4845F] transition-colors line-clamp-2">
        {insight.title}
      </h2>
      <p className="text-xs text-white/60 flex-1 line-clamp-3">{insight.excerpt}</p>
      <div className="flex items-center gap-2 mt-4 text-[10px] text-white/40">
        {insight.read_time && insight.type === 'i6 Article' && (
          <span>{insight.read_time} min</span>
        )}
        {isExternal && <ExternalLink size={12} className="ml-auto text-white/40" />}
      </div>
    </article>
  );

  return isExternal ? (
    <a href={insight.external_url!} target="_blank" rel="noopener noreferrer" className="block h-full">{cardContent}</a>
  ) : (
    <Link to={localized(`/insights/${insight.slug}`)} className="block h-full">{cardContent}</Link>
  );
};

const Insights = () => {
  const { language } = useLanguage();
  const insights = useInsights();

  const heading = language === 'pt' ? 'Insights' : 'Insights';
  const subheading = language === 'pt'
    ? 'Artigos, análises e conteúdos de mídia sobre IA preditiva, forecast, pricing e crescimento de receita.'
    : 'Articles, analysis and media content on predictive AI, forecasting, pricing and revenue growth.';

  return (
    <>
      <SEOHead page="insights" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: heading,
          description: subheading,
        })}</script>
      </Helmet>

      <section className="container mx-auto px-6 pt-32 pb-20">
        <header className="max-w-3xl mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[#F4845F] mb-3">infinity6 · Insights</p>
          <h1 className="sr-only">{heading}</h1>
          <p className="text-lg text-white/70">{subheading}</p>
        </header>

        {insights.length === 0 ? (
          <p className="text-white/50">{language === 'pt' ? 'Em breve, novos conteúdos' : 'New content coming soon'}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {insights.map((i) => <InsightCard key={`${i.slug}-${i.language}`} insight={i} />)}
          </div>
        )}
      </section>
    </>
  );
};

export default Insights;
