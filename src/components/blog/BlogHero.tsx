import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { resolveCoverImage, type Insight } from '@/hooks/useInsights';

interface Props {
  article: Insight;
}

const BlogHero = ({ article }: Props) => {
  const { t, language } = useLanguage();
  const localized = useLocalizedPath();
  const cover = resolveCoverImage(article.cover_image);

  return (
    <Link
      to={localized(`/i6-blog/${article.slug}`)}
      className="group block relative rounded-3xl overflow-hidden isolate"
    >
      {/* Background image, feathered on all sides */}
      <div className="relative aspect-[21/9] w-full">
        {cover ? (
          <img
            src={cover}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="eager"
            style={{
              WebkitMaskImage:
                'radial-gradient(ellipse 90% 85% at center, #000 55%, transparent 100%)',
              maskImage:
                'radial-gradient(ellipse 90% 85% at center, #000 55%, transparent 100%)',
            }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 80% at 30% 20%, rgba(244,132,95,0.25) 0%, rgba(244,132,95,0) 60%), linear-gradient(135deg, #0B1224 0%, #131a2f 100%)',
            }}
            aria-hidden="true"
          />
        )}

        {/* Dark scrim for text legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0B1224] via-[#0B1224]/70 to-transparent"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-14 max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-[#F4845F]/20 text-[#F4845F] border border-[#F4845F]/40 backdrop-blur-sm">
              {t('blog.badge')}
            </span>
            <time className="text-xs text-white/60">
              {new Date(article.date).toLocaleDateString(
                language === 'pt' ? 'pt-BR' : 'en-US',
                { day: '2-digit', month: 'long', year: 'numeric' },
              )}
            </time>
            {article.read_time && (
              <span className="text-xs text-white/50">
                · {article.read_time} {t('blog.minRead')}
              </span>
            )}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4 max-w-3xl leading-tight group-hover:text-[#F4845F] transition-colors">
            {article.title}
          </h2>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mb-6 line-clamp-3">
            {article.excerpt}
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-[#F4845F]">
            {t('blog.readArticle')}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogHero;
