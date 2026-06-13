import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useInsights, resolveCoverImage, type Insight } from '@/hooks/useInsights';
import SEOHead from '@/components/common/SEOHead';

const InsightCard = ({ insight }: { insight: Insight }) => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const isExternal = !insight.gated && insight.type !== 'i6 Article' && !!insight.external_url;
  const cover = resolveCoverImage(insight.cover_image);

  const typeLabel = insight.type;

  const cardContent = (
    <article className="group h-full flex flex-col rounded-xl border border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-[#F4845F]/40 transition-all overflow-hidden">
      <div className="h-28 overflow-hidden bg-white/5 relative">
        {cover ? (
          <img src={cover} alt={insight.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center relative overflow-hidden"
            style={{
              background:
                'radial-gradient(120% 80% at 30% 20%, rgba(244,132,95,0.12) 0%, rgba(244,132,95,0) 60%), linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
            }}
            aria-hidden="true"
          >
            <span className="text-xl md:text-2xl font-bold uppercase tracking-[0.25em] text-white/10 select-none">
              {typeLabel}
            </span>
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_80%_90%,rgba(244,132,95,0.08),transparent_50%)]" />
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#F4845F]/15 text-[#F4845F]">
            {typeLabel}
          </span>
          {isExternal && <ExternalLink size={12} className="text-white/40" />}
          <time className="text-[10px] text-white/40 ml-auto">
            {new Date(insight.date).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
          </time>
        </div>
        <h2 className="text-sm font-semibold text-white mb-2 group-hover:text-[#F4845F] transition-colors line-clamp-2">
          {insight.title}
        </h2>
        <p className="text-xs text-white/60 flex-1 line-clamp-3">{insight.excerpt}</p>
        {insight.read_time && insight.type === 'i6 Article' && (
          <p className="text-[10px] text-white/40 mt-3">{insight.read_time} min</p>
        )}
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
    ? 'Artigos, análises e conteúdos sobre IA preditiva, forecast, pricing e crescimento de receita.'
    : 'Articles, analysis and content on predictive AI, forecasting, pricing and revenue growth.';

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((i) => <InsightCard key={`${i.slug}-${i.language}`} insight={i} />)}
          </div>
        )}
      </section>
    </>
  );
};

export default Insights;
