import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { resolveCoverImage, type Insight } from '@/hooks/useInsights';

interface Props {
  title: string;
  articles: Insight[];
}

interface RowProps {
  article: Insight;
}

const EditorialRow = ({ article }: RowProps) => {
  const { t, language } = useLanguage();
  const localized = useLocalizedPath();
  const cover = resolveCoverImage(article.cover_image);

  return (
    <Link
      to={localized(`/i6-blog/${article.slug}`)}
      className="group flex gap-4 items-center py-4 border-b border-white/5"
    >
      <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-xl overflow-hidden bg-white/5 relative">
        {cover ? (
          <img
            src={cover}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
            style={{
              background:
                'radial-gradient(80% 80% at 30% 30%, rgba(244,132,95,0.25), transparent 70%), linear-gradient(135deg,#0B1224,#131a2f)',
            }}
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white group-hover:text-[#F4845F] transition-colors text-sm md:text-base line-clamp-2 mb-1.5">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-xs text-white/50 line-clamp-2 mb-2">{article.excerpt}</p>
        )}
        <div className="flex items-center gap-2 text-[11px] text-white/40">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F4845F]">
            {t('blog.badge')}
          </span>
          <span className="text-white/20">·</span>
          <time>
            {new Date(article.date).toLocaleDateString(
              language === 'pt' ? 'pt-BR' : 'en-US',
              { day: '2-digit', month: 'short', year: 'numeric' },
            )}
          </time>
          {article.read_time && (
            <>
              <span className="text-white/20">·</span>
              <span>
                {article.read_time} {t('blog.minRead')}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

const ThemeRail = ({ title, articles }: Props) => {
  if (articles.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
        <span className="block h-0.5 w-10 bg-[#F4845F] mt-2 rounded-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
        {articles.map((a) => (
          <EditorialRow key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
};

export default ThemeRail;
