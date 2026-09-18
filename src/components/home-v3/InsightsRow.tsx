import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useFeaturedInsights, type Insight } from '@/hooks/useInsights';
import { useFeaturedIntelligence } from '@/hooks/useIntelligence';

type HomeInsight = Pick<
  Insight,
  'title' | 'slug' | 'type' | 'date' | 'language' | 'excerpt' | 'external_url' | 'gated'
>;

type FeaturedColumn = {
  insight: HomeInsight;
  destination: '/insights' | '/i6-blog' | '/i6-intelligence';
  moreLabel: string;
};

const InsightCard = ({ insight, destination }: Pick<FeaturedColumn, 'insight' | 'destination'>) => {
  const localized = useLocalizedPath();
  const internalPath = `${destination}/${insight.slug}`;
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
  const featuredInsights = useFeaturedInsights();
  const featuredIntelligence = useFeaturedIntelligence();

  const labels =
    language === 'pt'
      ? {
          eyebrow: 'Inteligência aplicada',
          title: 'Últimos insights',
          media: 'Mais no i6 On Media',
          blog: 'Mais no i6 Blog',
          intelligence: 'Mais no i6 Deep Research',
        }
      : language === 'es'
        ? {
            eyebrow: 'Inteligencia aplicada',
            title: 'Últimos insights',
            media: 'Más en i6 On Media',
            blog: 'Más en i6 Blog',
            intelligence: 'Más en i6 Deep Research',
          }
        : {
            eyebrow: 'Applied intelligence',
            title: 'Latest insights',
            media: 'More on i6 On Media',
            blog: 'More on i6 Blog',
            intelligence: 'More on i6 Deep Research',
          };

  const media = featuredInsights.find((item) =>
    item.type === 'i6 on Media' || item.type === 'i6 Social'
  );
  const blog = featuredInsights.find((item) =>
    item.type === 'i6 Article' || item.type === 'i6 Blog'
  );
  const intelligenceCandidates: HomeInsight[] = [
    ...featuredIntelligence,
    ...featuredInsights.filter((item) => item.type === 'i6 eBook'),
  ].sort((a, b) => (a.date < b.date ? 1 : -1));
  const intelligence = intelligenceCandidates[0];

  const columns: FeaturedColumn[] = [];
  if (media) columns.push({ insight: media, destination: '/insights', moreLabel: labels.media });
  if (blog) columns.push({ insight: blog, destination: '/i6-blog', moreLabel: labels.blog });
  if (intelligence) {
    columns.push({
      insight: intelligence,
      destination: '/i6-intelligence',
      moreLabel: labels.intelligence,
    });
  }

  if (columns.length === 0) return null;

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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {columns.map(({ insight, destination, moreLabel }) => (
          <div key={`${destination}-${insight.slug}-${insight.language}`} className="flex flex-col gap-4">
            <InsightCard insight={insight} destination={destination} />
            <Link
              to={localized(destination)}
              className="group inline-flex items-center gap-2 self-start text-sm font-semibold text-primary"
            >
              {moreLabel}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InsightsRow;
