import { useLanguage } from '@/contexts/LanguageContext';
import BlogCard from './BlogCard';
import type { Insight } from '@/hooks/useInsights';

interface Props {
  articles: Insight[];
}

const RecentStrip = ({ articles }: Props) => {
  const { t } = useLanguage();
  if (articles.length === 0) return null;

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
