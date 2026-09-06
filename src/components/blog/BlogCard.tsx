import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { resolveCoverImage, type Insight } from '@/hooks/useInsights';

interface Props {
  article: Insight;
  /** `feature` ocupa duas colunas com imagem maior; `compact` é o padrão. */
  variant?: 'feature' | 'compact';
}

const BlogCard = ({ article, variant = 'compact' }: Props) => {
  const { t, language } = useLanguage();
  const localized = useLocalizedPath();
  const cover = resolveCoverImage(article.cover_image);
  const locale = language === 'pt' ? 'pt-BR' : language === 'es' ? 'es-ES' : 'en-US';
  const feature = variant === 'feature';

  const meta = (
    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
      {(article.theme_label || article.theme) && (
        <span className="uppercase tracking-[0.16em] text-primary">
          {article.theme_label || article.theme}
        </span>
      )}
      {article.date && (
        <time dateTime={article.date}>
          {new Date(article.date).toLocaleDateString(locale, {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </time>
      )}
      {article.read_time && (
        <span>
          {article.read_time} {t('blog.minRead')}
        </span>
      )}
    </div>
  );

  return (
    <Link
      to={localized(`/i6-blog/${article.slug}`)}
      className="group sand-card sand-card-hover flex h-full flex-col overflow-hidden"
    >
      <div
        className={`w-full overflow-hidden bg-secondary ${feature ? 'h-52 md:h-64' : 'h-40'}`}
      >
        {cover ? (
          <img
            src={cover}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="sand-glow h-full w-full" aria-hidden="true" />
        )}
      </div>

      <div className={`flex flex-1 flex-col ${feature ? 'p-6 md:p-7' : 'p-5'}`}>
        <h3
          className={`font-display leading-snug text-foreground transition-colors group-hover:text-primary ${
            feature ? 'text-xl md:text-2xl' : 'text-base'
          }`}
        >
          {article.title}
        </h3>
        {article.excerpt && (
          <p
            className={`mt-3 flex-1 text-sm leading-relaxed text-muted-foreground ${
              feature ? 'line-clamp-3' : 'line-clamp-2'
            }`}
          >
            {article.excerpt}
          </p>
        )}
        {meta}
      </div>
    </Link>
  );
};

export default BlogCard;
