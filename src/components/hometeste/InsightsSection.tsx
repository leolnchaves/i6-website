import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useFeaturedInsights, type Insight } from '@/hooks/useInsights';

const InsightMiniCard = ({ insight }: { insight: Insight }) => {
  const localized = useLocalizedPath();

  // Route by type: eBook -> intelligence, Article -> blog, Media/Social -> insights (or external).
  let internalPath: string;
  if (insight.type === 'i6 eBook') {
    internalPath = `/i6-intelligence/${insight.slug}`;
  } else if (insight.type === 'i6 Article') {
    internalPath = `/i6-blog/${insight.slug}`;
  } else {
    internalPath = `/insights/${insight.slug}`;
  }
  const isMedia = insight.type === 'i6 on Media' || insight.type === 'i6 Social';
  const isExternal = isMedia && !insight.gated && !!insight.external_url;

  const inner = (
    <div className="group h-full p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-[#F4845F]/40 transition-all">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded bg-[#F4845F]/15 text-[#F4845F]">
          {insight.type}
        </span>
        {isExternal && <ExternalLink size={14} className="text-white/40" />}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#F4845F] transition-colors">{insight.title}</h3>
      <p className="text-sm text-white/60 line-clamp-3">{insight.excerpt}</p>
    </div>
  );

  return isExternal ? (
    <a href={insight.external_url!} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <Link to={localized(internalPath)}>{inner}</Link>
  );
};

const InsightsSection = () => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const insights = useFeaturedInsights(3);

  if (insights.length === 0) return null;

  const title = language === 'pt' ? 'Últimos Insights' : 'Latest Insights';
  const cta = language === 'pt' ? 'Ver todos os insights' : 'See all insights';

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
        <Link to={localized('/insights')} className="inline-flex items-center gap-2 text-sm font-semibold text-[#F4845F] hover:gap-3 transition-all">
          {cta} <ArrowRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((i) => <InsightMiniCard key={`${i.slug}-${i.language}`} insight={i} />)}
      </div>
    </section>
  );
};

export default InsightsSection;
