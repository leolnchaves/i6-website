import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useFeaturedInsights, type Insight } from '@/hooks/useInsights';

const InsightCard = ({ insight }: { insight: Insight }) => {
  const localized = useLocalizedPath();

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
    <article className="sand-card sand-card-hover h-full p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full bg-accent text-accent-foreground">
          {insight.type}
        </span>
        {isExternal && <ExternalLink size={14} className="text-muted-foreground" />}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2 leading-snug">{insight.title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{insight.excerpt}</p>
    </article>
  );

  return isExternal ? (
    <a href={insight.external_url!} target="_blank" rel="noopener noreferrer" className="h-full block">
      {inner}
    </a>
  ) : (
    <Link to={localized(internalPath)} className="h-full block">
      {inner}
    </Link>
  );
};

const InsightsRow = () => {
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const insights = useFeaturedInsights(3);

  if (insights.length === 0) return null;

  const labels =
    language === 'pt'
      ? { eyebrow: 'Inteligência aplicada', title: 'Últimos insights', all: 'Ver todos os insights' }
      : language === 'es'
        ? { eyebrow: 'Inteligencia aplicada', title: 'Últimos insights', all: 'Ver todos los insights' }
        : { eyebrow: 'Applied intelligence', title: 'Latest insights', all: 'See all insights' };

  return (
    <section className="container mx-auto px-6 py-20 md:py-24">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-3">
            {labels.eyebrow}
          </p>
          <h2 className="text-3xl md:text-[2.4rem] font-bold text-foreground">
            {labels.title}
          </h2>
        </div>
        <Link
          to={localized('/insights')}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          {labels.all}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {insights.map((i) => (
          <InsightCard key={`${i.slug}-${i.language}`} insight={i} />
        ))}
      </div>
    </section>
  );
};

export default InsightsRow;
