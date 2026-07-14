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
      <section className="flex flex-col h-full">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
          {t('blog.recentTitle')}
        </h2>
        <div className="flex-1 grid gap-3" style={{ gridTemplateRows: `repeat(${list.length}, minmax(0, 1fr))` }}>
          {list.map((a) => (
            <BlogCard key={a.slug} article={a} variant="horizontal" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
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
