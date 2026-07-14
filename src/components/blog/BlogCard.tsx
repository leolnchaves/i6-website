import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { resolveCoverImage, type Insight } from '@/hooks/useInsights';

interface Props {
  article: Insight;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'horizontal';
}

/**
 * Blog card with a soft radial glow that appears on hover — background only,
 * so the card doesn't move. Cover image (if any) sits on top with rounded
 * corners; text lives below.
 */
const BlogCard = ({ article, size = 'md', variant = 'default' }: Props) => {
  const { t, language } = useLanguage();
  const localized = useLocalizedPath();
  const cover = resolveCoverImage(article.cover_image);

  const heightClass =
    size === 'lg' ? 'h-56 md:h-64' : size === 'sm' ? 'h-32 md:h-36' : 'h-40 md:h-48';

  if (variant === 'horizontal') {
    return (
      <Link
        to={localized(`/i6-blog/${article.slug}`)}
        className="group relative block h-full rounded-2xl p-[1px] overflow-hidden"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              'radial-gradient(120% 90% at 20% 0%, rgba(244,132,95,0.35) 0%, rgba(244,132,95,0.08) 35%, transparent 70%)',
          }}
        />
        <article className="relative h-full flex flex-row rounded-2xl border border-white/10 bg-[#0B1224]/80 backdrop-blur-sm group-hover:border-[#F4845F]/40 transition-colors overflow-hidden">
          {cover && (
            <div className="w-2/5 shrink-0 overflow-hidden bg-white/5">
              <img
                src={cover}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          )}
          <div className="p-4 md:p-5 flex-1 flex flex-col min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-[#F4845F]/15 text-[#F4845F]">
                {t('blog.badge')}
              </span>
              {article.theme && (
                <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-white/60">
                  {article.theme}
                </span>
              )}
            </div>
            <h3 className="font-semibold text-white group-hover:text-[#F4845F] transition-colors mb-2 text-sm md:text-base line-clamp-3">
              {article.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-white/40 mt-auto">
              <time>
                {new Date(article.date).toLocaleDateString(
                  language === 'pt' ? 'pt-BR' : 'en-US',
                  { day: '2-digit', month: 'short', year: 'numeric' },
                )}
              </time>
              {article.read_time && (
                <span>· {article.read_time} {t('blog.minRead')}</span>
              )}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link
      to={localized(`/i6-blog/${article.slug}`)}
      className="group relative block h-full rounded-2xl p-[1px] overflow-hidden"
    >
      {/* Soft hover glow (radial, coral) — sits behind the card body */}
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(120% 90% at 20% 0%, rgba(244,132,95,0.35) 0%, rgba(244,132,95,0.08) 35%, transparent 70%)',
        }}
      />

      <article className="relative h-full flex flex-col rounded-2xl border border-white/10 bg-[#0B1224]/80 backdrop-blur-sm group-hover:border-[#F4845F]/40 transition-colors overflow-hidden">
        {cover && (
          <div className={`${heightClass} overflow-hidden bg-white/5`}>
            <img
              src={cover}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-5 md:p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-[#F4845F]/15 text-[#F4845F]">
              {t('blog.badge')}
            </span>
            {article.theme && (
              <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-white/60">
                {article.theme}
              </span>
            )}
          </div>
          <h3
            className={`font-semibold text-white group-hover:text-[#F4845F] transition-colors mb-2 ${
              size === 'lg' ? 'text-xl md:text-2xl' : 'text-base md:text-lg'
            }`}
          >
            {article.title}
          </h3>
          <p className="text-sm text-white/60 line-clamp-3 flex-1">{article.excerpt}</p>
          <div className="flex items-center gap-2 text-xs text-white/40 mt-4">
            <time>
              {new Date(article.date).toLocaleDateString(
                language === 'pt' ? 'pt-BR' : 'en-US',
                { day: '2-digit', month: 'short', year: 'numeric' },
              )}
            </time>
            {article.read_time && (
              <span>· {article.read_time} {t('blog.minRead')}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
