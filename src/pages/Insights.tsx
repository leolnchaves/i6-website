import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useInsights, resolveCoverImage, type Insight } from '@/hooks/useInsights';
import SEOHead from '@/components/common/SEOHead';

const TYPE_LABELS_PT: Record<string, string> = {
  article: 'Artigo',
  linkedin: 'LinkedIn',
  press: 'Imprensa',
  podcast: 'Podcast',
  video: 'Vídeo',
};
const TYPE_LABELS_EN: Record<string, string> = {
  article: 'Article',
  linkedin: 'LinkedIn',
  press: 'Press',
  podcast: 'Podcast',
  video: 'Video',
};

const InsightCard = ({ insight }: { insight: Insight }) => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const labels = language === 'pt' ? TYPE_LABELS_PT : TYPE_LABELS_EN;
  const isExternal = !insight.gated && insight.type !== 'article' && !!insight.external_url;
  const cover = resolveCoverImage(insight.cover_image);

  const cardContent = (
    <article className="group h-full flex flex-col rounded-xl border border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-[#F4845F]/40 transition-all overflow-hidden">
      {cover && (
        <div className="aspect-video overflow-hidden bg-white/5">
          <img src={cover} alt={insight.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded bg-[#F4845F]/15 text-[#F4845F]">
            {labels[insight.type] || insight.type}
          </span>
          {isExternal && <ExternalLink size={14} className="text-white/40" />}
          <time className="text-xs text-white/40 ml-auto">
            {new Date(insight.date).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
          </time>
        </div>
        <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-[#F4845F] transition-colors">
          {insight.title}
        </h2>
        <p className="text-sm text-white/60 flex-1">{insight.excerpt}</p>
        {insight.read_time && insight.type === 'article' && (
          <p className="text-xs text-white/40 mt-4">{insight.read_time} min</p>
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{heading}</h1>
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
