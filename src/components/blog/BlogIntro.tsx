import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  /** Total de artigos publicados — metadado real, não decorativo. */
  total: number;
}

/**
 * Abertura tipográfica assimétrica: título em escala grande à esquerda e bloco
 * de apoio deslocado à direita, mais abaixo.
 */
const BlogIntro = ({ total }: Props) => {
  const { t } = useLanguage();

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-10 md:pt-40 md:pb-14">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
              {t('blog.badge')}
            </p>
            <h1 className="mt-5 font-display text-[2.6rem] leading-[1.02] tracking-tight text-foreground sm:text-[3.4rem] lg:text-[4.4rem]">
              {t('blog.pageTitle')}
            </h1>
          </div>

          <div className="lg:col-span-4 lg:pt-24">
            <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              {t('blog.pageSubtitle')}
            </p>
            {total > 0 && (
              <p className="mt-5 flex items-baseline gap-2 border-t border-border pt-5">
                <span className="font-display text-2xl text-foreground">{total}</span>
                <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {t('blog.articlesLabel')}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogIntro;
