import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Building2, Quote } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useSuccessStoriesMarkdown } from '@/hooks/useSuccessStoriesMarkdown';
import CTAFinal from '@/components/hometeste/CTAFinal';
import StoryCard from '@/components/success-stories/story-components/StoryCard';
import { successStoriesData } from '@/data/staticData/successStoriesData';

const normalizeMd = (raw?: string) => {
  if (!raw) return '';
  let s = raw;
  // Colapsa múltiplos níveis de escape ("\\\\n" -> "\\n" -> "\n")
  for (let i = 0; i < 3; i++) {
    const next = s.replace(/\\\\/g, '\\');
    if (next === s) break;
    s = next;
  }
  return s.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
};

const MdBlock = ({ children }: { children: string }) => (
  <div className="prose max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground prose-blockquote:border-primary prose-blockquote:text-foreground/80">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node, ...props }) => (
          <a {...props} target="_blank" rel="noopener noreferrer" />
        ),
      }}
    >
      {normalizeMd(children)}
    </ReactMarkdown>
  </div>
);

const BASE_URL = 'https://infinity6.ai';

const splitMetric = (raw: string) => {
  const value = raw.split(' ')[0];
  const label = raw.split(' ').slice(1).join(' ');
  return { value, label };
};

const SuccessStoryArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const { stories, loading } = useSuccessStoriesMarkdown();

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-20 flex justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#F4845F]" />
      </div>
    );
  }

  const story = stories.find((s) => s.slug === slug);
  if (!story) return <Navigate to={localized('/success-stories')} replace />;

  const url = `${BASE_URL}/${language}/success-stories/${story.slug}`;
  const metrics = [story.metric1, story.metric2, story.metric3]
    .filter((m) => m && m.trim() !== '-' && m.trim() !== '')
    .map(splitMetric);

  // Casca da página em PT/EN/ES; o conteúdo do case cai em PT quando não há ES.
  const t = (successStoriesData[language] || successStoriesData.en).detail;

  const others = stories.filter((s) => s.slug !== story.slug).slice(0, 3);

  const sections = [
    { label: t.pain, body: story.challenge, highlight: false },
    { label: t.anticipate, body: story.whatToAnticipate, highlight: false },
    { label: t.prediction, body: story.prediction, highlight: true },
    { label: t.solution, body: story.solution, highlight: false },
  ].filter((s) => !!s.body);

  return (
    <>
      <Helmet>
        <html lang={language === 'pt' ? 'pt-BR' : language === 'es' ? 'es' : 'en'} />
        <title>{`${story.title} | infinity6`}</title>
        {story.description && <meta name="description" content={story.description} />}
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="en" href={`${BASE_URL}/en/success-stories/${story.slug}`} />
        <link rel="alternate" hrefLang="pt-BR" href={`${BASE_URL}/pt/success-stories/${story.slug}`} />
        <link rel="alternate" hrefLang="es" href={`${BASE_URL}/es/success-stories/${story.slug}`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/en/success-stories/${story.slug}`} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={story.title} />
        {story.description && <meta property="og:description" content={story.description} />}
        <meta property="og:url" content={url} />
        {story.image && <meta property="og:image" content={story.image.startsWith('http') ? story.image : `${BASE_URL}${story.image}`} />}
        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: story.title,
          ...(story.description ? { description: story.description } : {}),
          author: { '@type': 'Organization', name: 'infinity6' },
          publisher: {
            '@type': 'Organization',
            name: 'infinity6',
            logo: { '@type': 'ImageObject', url: `${BASE_URL}/lovable-uploads/0fce52e4-a161-4d37-b3e4-f23f093b9b75.png` },
          },
          mainEntityOfPage: url,
          about: story.client,
          articleSection: story.segment,
          ...(story.image ? { image: story.image.startsWith('http') ? story.image : `${BASE_URL}${story.image}` } : {}),
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/${language}` },
            { '@type': 'ListItem', position: 2, name: language === 'pt' ? 'Histórias de Sucesso' : language === 'es' ? 'Casos de Éxito' : 'Success Stories', item: `${BASE_URL}/${language}/success-stories` },
            { '@type': 'ListItem', position: 3, name: story.title, item: url },
          ],
        })}</script>
      </Helmet>

      {/* CAPA EM TELA CHEIA — mecânica preservada exatamente */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden">
        <div className="relative h-[420px] md:h-[560px]">
          {story.image && (
            <img
              src={story.image}
              alt={story.title}
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] saturate-[0.85] contrast-[1.05]"
            />
          )}
          <div className="absolute inset-0 bg-[#0B1224]/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1224]/40 to-[#0B1224]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1224]/50 via-transparent to-[#0B1224]/50" />

          <div className="relative h-full container mx-auto max-w-4xl px-6 flex flex-col justify-end pb-8 md:pb-12">
            {!story.clientAnon && story.logo && (
              <img
                src={story.logo}
                alt={`${story.client} logo`}
                className="self-start h-10 md:h-12 w-auto object-contain object-left mb-4 brightness-0 invert opacity-80"
              />
            )}
            <p className="text-xs uppercase tracking-[0.3em] text-[#F4845F] mb-4 inline-flex items-center gap-2">
              <Building2 className="w-3 h-3" /> infinity6 · {story.segment}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-[1.1] tracking-tight">
              {story.title}
            </h1>
            <p className="text-lg md:text-xl text-white/85 mb-2 leading-relaxed max-w-2xl">
              {story.client}
            </p>
            {story.description && (
              <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-2xl">
                {story.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* CORPO EM AREIA */}
      <div className="theme-sand bg-background">
        <article className="container mx-auto max-w-4xl px-6 pt-10 pb-16">
          <Link
            to={localized('/success-stories')}
            className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft size={16} /> {t.back}
          </Link>

          {metrics.length > 0 && (
            <section className="mb-14">
              <h2 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
                {t.results}
              </h2>
              <div
                className={`grid gap-4 ${
                  metrics.length === 1
                    ? 'grid-cols-1'
                    : metrics.length === 2
                      ? 'grid-cols-1 md:grid-cols-2'
                      : 'grid-cols-1 md:grid-cols-3'
                }`}
              >
                {metrics.map((m, i) => (
                  <div key={i} className="sand-card p-6">
                    <div className="font-display text-3xl md:text-4xl font-bold leading-none text-primary">
                      {m.value}
                    </div>
                    <div className="mt-3 text-sm leading-snug text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* NARRATIVA EM 4 ATOS — cada bloco só renderiza se preenchido */}
          <div className="mb-14 space-y-10">
            {sections.map((s, i) => (
              <section
                key={i}
                className={s.highlight ? 'sand-card border-primary/25 p-6 md:p-8' : ''}
              >
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
                  {s.label}
                </p>
                <MdBlock>{s.body as string}</MdBlock>
              </section>
            ))}
          </div>

          {story.solutions && story.solutions.length > 0 && (
            <section className="mb-14">
              <div className="sand-card p-6 md:p-8">
                <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
                  {t.levers}
                </h2>
                <p className="mb-5 text-sm text-muted-foreground">{t.leversHint}</p>
                {(() => {
                  const count = story.solutions.length;
                  const gridColsFor = (n: number) => {
                    if (n === 1) return 'grid-cols-1';
                    if (n === 2) return 'grid-cols-1 sm:grid-cols-2';
                    if (n === 4) return 'grid-cols-1 sm:grid-cols-2';
                    if (n >= 8) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4';
                    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
                  };
                  const chipBase =
                    'w-full min-h-[44px] px-4 py-2 rounded-full border text-sm flex items-center justify-center text-center transition-colors';
                  return (
                    <div className={`grid gap-3 ${gridColsFor(count)} ${count === 1 ? 'max-w-sm mx-auto' : ''} justify-items-center`}>
                      {story.solutions.map((s, i) => {
                        const productUrl = getDecisionSuiteProductUrl(s.slug);
                        return productUrl ? (
                          <a
                            key={i}
                            href={productUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${chipBase} border-primary/30 bg-primary/10 text-foreground/80 hover:border-primary/60 hover:bg-primary/20 hover:text-foreground`}
                          >
                            {s.label}
                          </a>
                        ) : (
                          <span
                            key={i}
                            className={`${chipBase} border-border bg-muted text-muted-foreground`}
                          >
                            {s.label}
                          </span>
                        )
                      )}
                    </div>
                  );
                })()}
              </div>
            </section>
          )}

          {story.quote && (
            <section className="sand-card mb-14 p-8">
              <Quote className="mb-4 h-7 w-7 text-primary" />
              <div className="text-lg md:text-xl italic text-foreground/85 [&_p]:italic [&_p]:text-foreground/85">
                <MdBlock>{story.quote}</MdBlock>
              </div>
              {story.customerName && story.customerName !== '-' && (
                <div className="mt-4 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{story.customerName}</span>
                  {story.customerTitle && story.customerTitle !== '-' && <> · {story.customerTitle}</>}
                </div>
              )}
            </section>
          )}

          {others.length > 0 && (
            <section className="border-t border-border pt-10">
              <h2 className="mb-6 text-xl font-semibold text-foreground">{t.related}</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {others.map((o) => (
                  <StoryCard
                    key={o.slug}
                    language={language}
                    variant="compact"
                    story={{
                      slug: o.slug,
                      segment: o.segment,
                      title: o.title,
                      metric1: o.metric1,
                      clientAnon: o.clientAnon,
                    }}
                  />
                ))}
              </div>
            </section>
          )}
        </article>
      </div>

      <CTAFinal />
    </>
  );
};

export default SuccessStoryArticle;
