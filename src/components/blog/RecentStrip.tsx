import { useLanguage } from '@/contexts/LanguageContext';
import BlogCard from './BlogCard';
import type { Insight } from '@/hooks/useInsights';

interface Props {
  articles: Insight[];
  layout?: 'row' | 'side';
}

const RecentStrip = ({ articles, layout = 'row' }: Props) => {
  const { t } = useLanguage();
  if (articles.length === 0) return null;

  if (layout === 'side') {
    const list = articles.slice(0, 3);
    return (
      <section className="flex flex-col h-full max-h-full overflow-hidden">
        <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-white/60 mb-2 shrink-0">
          {t('blog.recentTitle')}
        </h2>
        <div className="flex flex-col gap-2.5 flex-1 min-h-0">
          {list.map((a) => (
            <div key={a.slug} className="h-1/3 min-h-0">
              <BlogCard article={a} variant="horizontal" dense />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16">
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-white/60 mb-4">
        {t('blog.recentTitle')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {articles.slice(0, 5).map((a) => (
          <BlogCard key={a.slug} article={a} size="sm" />
        ))}
      </div>
    </section>
  );
};

export default RecentStrip;
