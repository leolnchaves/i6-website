import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useInsights, resolveCoverImage, type Insight } from '@/hooks/useInsights';
import SEOHead from '@/components/common/SEOHead';
import { getPublicAssetUrl } from '@/utils/assetUtils';

const i6SymbolFallback = getPublicAssetUrl('content/logos/infinity6_CMYK_color_symbol_72dpi.png');

/**
 * Cartão compacto de clipping. O logo do veículo/rede social vem de
 * `cover_image` — não existe campo de nome de veículo no frontmatter, então
 * nenhum texto de veículo é inventado aqui.
 */
const InsightCard = ({ insight }: { insight: Insight }) => {
  const { t, language } = useLanguage();
  const localized = useLocalizedPath();
  // Regra de navegação preservada exatamente como estava.
  const isExternal = !insight.gated && insight.type !== 'i6 Article' && !!insight.external_url;
  const resolved = resolveCoverImage(insight.cover_image);
  const hasLogo = !!resolved;
  const logoSrc = resolved || i6SymbolFallback;
  const featured = insight.featured === true;
  const locale = language === 'pt' ? 'pt-BR' : language === 'es' ? 'es-ES' : 'en-US';

  const cardContent = (
    <article
      className={`group sand-card sand-card-hover flex h-full flex-col overflow-hidden ${
        featured ? 'md:flex-row' : ''
      }`}
    >
      {/* Área do logo — espaço próprio e proeminente, respirando sobre bege claro */}
      <div
        className={`flex shrink-0 items-center justify-center bg-secondary px-6 ${
          featured ? 'h-28 md:h-auto md:w-2/5 md:py-10' : 'h-24'
        }`}
      >
        <img
          src={logoSrc}
          alt={hasLogo ? insight.title : 'infinity6'}
          loading="lazy"
          className={`max-h-12 w-auto max-w-[70%] object-contain transition-opacity duration-500 ${
            hasLogo ? 'opacity-90 group-hover:opacity-100' : 'opacity-40 group-hover:opacity-60'
          }`}
        />
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
          <span className="uppercase tracking-[0.16em] text-primary">{insight.type}</span>
          {insight.date && (
            <time dateTime={insight.date} className="text-muted-foreground">
              {new Date(insight.date).toLocaleDateString(locale, {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </time>
          )}
          {featured && (
            <span className="rounded-full border border-primary/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-primary">
              {t('insights.featured')}
            </span>
          )}
        </div>

        <h2
          className={`mt-3 font-display leading-snug text-foreground transition-colors group-hover:text-primary ${
            featured ? 'text-lg md:text-xl' : 'text-[15px]'
          } line-clamp-3`}
        >
          {insight.title}
        </h2>

        {insight.excerpt && (
          <p
            className={`mt-2 text-[13px] leading-relaxed text-muted-foreground ${
              featured ? 'line-clamp-3' : 'line-clamp-2'
            }`}
          >
            {insight.excerpt}
          </p>
        )}

        {/* Saída do site sempre explicitada em texto visível, não só por ícone */}
        <span className="mt-auto flex items-center gap-1.5 pt-5 text-[13px] font-medium text-primary">
          {isExternal ? (
            <>
              {t('insights.viewOriginal')}
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </>
          ) : (
            <>
              {t('insights.readOnSite')}
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </>
          )}
        </span>
      </div>
    </article>
  );

  const spanClass = featured ? 'sm:col-span-2' : '';

  return isExternal ? (
    <a
      href={insight.external_url!}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${insight.title} — ${t('insights.viewOriginalAria')}`}
      className={`block h-full ${spanClass}`}
    >
      {cardContent}
    </a>
  ) : (
    <Link to={localized(`/insights/${insight.slug}`)} className={`block h-full ${spanClass}`}>
      {cardContent}
    </Link>
  );
};

const Insights = () => {
  const { t, language } = useLanguage();
  const insights = useInsights();

  const heading = t('insights.pageTitle');
  const subheading = t('insights.pageSubtitle');

  return (
    <>
      <SEOHead page="insights" />
      <Helmet>
        <html lang={language === 'pt' ? 'pt-BR' : language === 'es' ? 'es' : 'en'} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: heading,
          description: subheading,
        })}</script>
      </Helmet>

      <div className="theme-sand">
        {/* Abertura tipográfica compacta — mesma linguagem do blog, mais enxuta */}
        <section className="mx-auto max-w-7xl px-6 pt-32 pb-8 md:pt-36 md:pb-10">
          <div className="grid grid-cols-1 items-end gap-y-6 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
                {t('insights.badge')}
              </p>
              <h1 className="mt-4 font-display text-[2.2rem] leading-[1.05] tracking-tight text-foreground sm:text-[2.8rem] lg:text-[3.4rem]">
                {heading}
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
                {subheading}
              </p>
              {insights.length > 0 && (
                <p className="mt-4 flex items-baseline gap-2 border-t border-border pt-4">
                  <span className="font-display text-xl text-foreground">{insights.length}</span>
                  <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {t('insights.itemsLabel')}
                  </span>
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24">
          {insights.length === 0 ? (
            <p className="py-16 text-center font-display text-lg text-foreground">
              {t('insights.empty')}
            </p>
          ) : (
            /* `grid-auto-flow: dense` evita coluna órfã quando um featured
               ocupa duas colunas e o total não fecha múltiplo da grade. */
            <div className="grid grid-flow-row-dense grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {insights.map((i) => (
                <InsightCard key={`${i.slug}-${i.language}`} insight={i} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Insights;
