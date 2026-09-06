import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarDays, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { resolveCoverImage, type Insight } from '@/hooks/useInsights';

interface Props {
  article: Insight;
}

/**
 * Destaque editorial. A imagem chega à borda direita da tela através de um grid
 * de duas colunas de largura 100% — sem `100vw` e sem margem negativa, para não
 * criar rolagem horizontal quando existe barra de rolagem vertical.
 */
const BlogHero = ({ article }: Props) => {
  const { t, language } = useLanguage();
  const localized = useLocalizedPath();
  const cover = resolveCoverImage(article.cover_image);
  const locale = language === 'pt' ? 'pt-BR' : language === 'es' ? 'es-ES' : 'en-US';
  const href = localized(`/i6-blog/${article.slug}`);

  const dateLabel = article.date
    ? new Date(article.date).toLocaleDateString(locale, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : null;

  return (
    <section className="relative w-full pb-12 md:pb-16">
      <div className="grid grid-cols-1 items-center gap-y-8 lg:grid-cols-2 lg:gap-y-0">
        {/* Coluna de texto: alinhada ao container do site, sem depender de vw */}
        <div className="flex px-6 lg:justify-end lg:pr-12">
          <div className="w-full lg:max-w-[34rem]">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary" aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
                {t('blog.featured')}
              </span>
            </div>

            <h2 className="mt-5 font-display text-[1.9rem] leading-[1.08] tracking-tight text-foreground sm:text-[2.4rem] lg:text-[2.9rem]">
              <Link to={href} className="transition-colors hover:text-primary">
                {article.title}
              </Link>
            </h2>

            {article.excerpt && (
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                {article.excerpt}
              </p>
            )}

            <Link
              to={href}
              className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-primary"
            >
              {t('blog.readArticle')}
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>

        {/* Coluna da imagem: 100% da própria coluna, encostando na borda */}
        <div className="relative">
          <Link to={href} className="group block overflow-hidden rounded-l-[2rem]">
            <div className="relative h-[260px] w-full bg-secondary sm:h-[340px] lg:h-[520px]">
              {cover ? (
                <img
                  src={cover}
                  alt={article.title}
                  loading="eager"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="absolute inset-0 sand-glow" aria-hidden="true" />
              )}
            </div>
          </Link>

          {/* Cartão flutuante com metadados reais do post */}
          <div className="relative z-10 mx-6 -mt-10 rounded-2xl border border-border bg-card p-5 shadow-[var(--sand-shadow-soft)] lg:absolute lg:bottom-10 lg:-left-12 lg:mx-0 lg:mt-0 lg:w-[19rem]">
            {article.theme && (
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary">
                {article.theme_label || article.theme}
              </p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              {dateLabel && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={13} className="text-primary/70" />
                  <time dateTime={article.date}>{dateLabel}</time>
                </span>
              )}
              {article.read_time && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={13} className="text-primary/70" />
                  {article.read_time} {t('blog.minRead')}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
