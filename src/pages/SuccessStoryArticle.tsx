import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Building2, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useSuccessStoriesMarkdown } from '@/hooks/useSuccessStoriesMarkdown';
import CTAFinal from '@/components/hometeste/CTAFinal';

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

  const t = {
    back: language === 'pt' ? 'Voltar para Histórias' : 'Back to Stories',
    pain: language === 'pt' ? 'A DOR REAL' : 'THE REAL PAIN',
    anticipate: language === 'pt' ? 'O QUE PRECISAVA SER ANTECIPADO' : 'WHAT NEEDED TO BE ANTICIPATED',
    prediction: language === 'pt' ? 'A PREDIÇÃO' : 'THE PREDICTION',
    solution: language === 'pt' ? 'A SOLUÇÃO' : 'THE SOLUTION',
    appliedSolutions: language === 'pt' ? 'ALAVANCAS DE VALOR' : 'VALUE LEVERS',
    results: language === 'pt' ? 'IMPACTO COMPROVADO' : 'PROVEN IMPACT',
    about: language === 'pt' ? 'Sobre o Cliente' : 'About the Client',
    related: language === 'pt' ? 'Outras Histórias' : 'Other Stories',
  };

  const others = stories.filter((s) => s.slug !== story.slug).slice(0, 3);

  return (
    <>
      <Helmet>
        <html lang={language === 'pt' ? 'pt-BR' : 'en'} />
        <title>{`${story.title} | infinity6`}</title>
        {story.description && <meta name="description" content={story.description} />}
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="en" href={`${BASE_URL}/en/success-stories/${story.slug}`} />
        <link rel="alternate" hrefLang="pt-BR" href={`${BASE_URL}/pt/success-stories/${story.slug}`} />
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
            { '@type': 'ListItem', position: 2, name: language === 'pt' ? 'Histórias de Sucesso' : 'Success Stories', item: `${BASE_URL}/${language}/success-stories` },
            { '@type': 'ListItem', position: 3, name: story.title, item: url },
          ],
        })}</script>
      </Helmet>

      <article className="container mx-auto px-6 pt-32 pb-12 max-w-4xl">
        <Link
          to={localized('/success-stories')}
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#F4845F] mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> {t.back}
        </Link>

        <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden mb-12">
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

        {metrics.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-[0.25em] text-[#F4845F] mb-6 font-semibold">{t.results}</h2>
            <div className={`grid gap-4 ${metrics.length === 1 ? 'grid-cols-1' : metrics.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
              {metrics.map((m, i) => (
                <div key={i} className="p-6 bg-white/5 rounded-xl border border-white/10 text-center">
                  <div className="text-2xl md:text-3xl font-semibold text-[#F4845F] mb-2">{m.value}</div>
                  <div className="text-sm text-white/60">{m.label}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="space-y-10 mb-12">
          {story.challenge && (
            <section>
              <p className="text-xs uppercase tracking-[0.25em] text-[#F4845F] mb-3 font-semibold">{t.pain}</p>
              <p className="text-white/70 leading-relaxed">{story.challenge}</p>
            </section>
          )}
          {story.whatToAnticipate && (
            <section>
              <p className="text-xs uppercase tracking-[0.25em] text-[#F4845F] mb-3 font-semibold">{t.anticipate}</p>
              <p className="text-white/70 leading-relaxed">{story.whatToAnticipate}</p>
            </section>
          )}
          {story.prediction && (
            <section>
              <p className="text-xs uppercase tracking-[0.25em] text-[#F4845F] mb-3 font-semibold">{t.prediction}</p>
              <p className="text-white/70 leading-relaxed">{story.prediction}</p>
            </section>
          )}
          {story.solution && (
            <section>
              <p className="text-xs uppercase tracking-[0.25em] text-[#F4845F] mb-3 font-semibold">{t.solution}</p>
              <p className="text-white/70 leading-relaxed">{story.solution}</p>
            </section>
          )}
        </div>

        {story.solutions && story.solutions.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-[0.25em] text-[#F4845F] mb-4 font-semibold">{t.appliedSolutions}</h2>
            <div className="flex flex-wrap gap-2">
              {story.solutions.map((s, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-[#F4845F]/10 border border-[#F4845F]/30 text-sm text-white/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {story.quote && (
          <section className="mb-12 p-8 rounded-xl bg-white/5 border border-white/10">
            <Quote className="w-8 h-8 text-[#F4845F] mb-4" />
            <p className="text-lg md:text-xl text-white/85 italic mb-4">{story.quote}</p>
            {(story.customerName && story.customerName !== '-') && (
              <div className="text-sm text-white/60">
                <span className="font-semibold text-white">{story.customerName}</span>
                {story.customerTitle && story.customerTitle !== '-' && <> · {story.customerTitle}</>}
              </div>
            )}
          </section>
        )}

        {others.length > 0 && (
          <section className="mt-16 pt-10 border-t border-white/10">
            <h2 className="text-xl font-semibold text-white mb-6">{t.related}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  to={localized(`/success-stories/${o.slug}`)}
                  className="group p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <div className="text-xs uppercase tracking-wider text-white/40 mb-2">{o.segment}</div>
                  <div className="text-base font-semibold text-white group-hover:text-[#F4845F] transition-colors">{o.title}</div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <CTAFinal />
    </>
  );
};

export default SuccessStoryArticle;
