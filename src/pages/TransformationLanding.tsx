import { Navigate, useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowRight, Layers, TrendingUp, DollarSign, MessageSquare, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import { useLanding, isLandingSlug, type LandingPiece } from '@/hooks/useLandings';
import { getStoryBySlug } from '@/hooks/useSuccessStoriesMarkdown';
import RelatedStoryMiniCard from '@/components/landings/RelatedStoryMiniCard';
import CTAFinal from '@/components/hometeste/CTAFinal';

const BASE_URL = 'https://infinity6.ai';

const ENGINE_META: Record<string, { name: string; icon: LucideIcon; anchor: string }> = {
  i6recsys: { name: 'i6 RecSys', icon: Layers, anchor: 'i6recsys' },
  i6previsio: { name: 'i6 Previsio', icon: TrendingUp, anchor: 'i6previsio' },
  i6elasticprice: { name: 'i6 ElasticPrice', icon: DollarSign, anchor: 'i6elasticprice' },
  i6signal: { name: 'i6 Signal', icon: MessageSquare, anchor: 'i6signal' },
};

const csv = (s?: string) => (s ? s.split(',').map((x) => x.trim()).filter(Boolean) : []);

const SectionShell = ({ title, eyebrow, children }: { title: string; eyebrow?: string; children: React.ReactNode }) => (
  <section className="py-16 md:py-20 border-t border-white/5">
    <div className="container mx-auto px-6 max-w-5xl">
      {eyebrow && (
        <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#F4845F] mb-3">{eyebrow}</p>
      )}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">{title}</h2>
      {children}
    </div>
  </section>
);

const MarkdownBody = ({ md }: { md: string }) => (
  <div className="prose prose-invert prose-headings:text-white prose-h3:text-lg prose-h3:mt-8 prose-p:text-white/75 prose-li:text-white/75 prose-strong:text-white prose-a:text-[#F4845F] hover:prose-a:underline max-w-none text-[15px] leading-relaxed">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
  </div>
);

const HeroSection = ({ piece, lang }: { piece: LandingPiece; lang: 'pt' | 'en' }) => {
  const localized = useLocalizedPath();
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-[#0B1224] to-[#0A101F]">
      <div className="container mx-auto px-6 max-w-5xl">
        {piece.hero_kicker && (
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#F4845F] mb-5">
            {piece.hero_kicker}
          </p>
        )}
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          {piece.hero_headline || piece.title}
        </h1>
        {piece.hero_sub && (
          <div className="prose prose-invert max-w-none text-base md:text-lg leading-relaxed mb-10 prose-p:text-white/65 prose-strong:text-white prose-li:text-white/65 prose-a:text-[#F4845F] hover:prose-a:underline">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{piece.hero_sub}</ReactMarkdown>
          </div>
        )}
        <Link
          to={localized('/contact')}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F4845F] hover:bg-[#F4845F]/90 text-white text-sm font-semibold transition-all shadow-[0_0_20px_rgba(244,132,95,0.3)]"
        >
          {lang === 'pt' ? 'Falar com a infinity6' : 'Talk to infinity6'}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};

const SolutionEngines = ({ piece, lang }: { piece: LandingPiece; lang: 'pt' | 'en' }) => {
  const ids = csv(piece.related_engines);
  const engines = ids.filter((id) => id !== 'i6signal').map((id) => ENGINE_META[id]).filter(Boolean);
  const hasSignal = ids.includes('i6signal');
  const localized = useLocalizedPath();
  if (engines.length === 0 && !hasSignal) return null;
  const SignalIcon = ENGINE_META.i6signal.icon;
  return (
    <div className="mt-8 space-y-4">
      {engines.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {engines.map((e) => {
            const Icon = e.icon;
            return (
              <Link
                key={e.anchor}
                to={localized(`/our-ai#${e.anchor}`)}
                className="group flex items-start gap-4 border border-white/10 rounded-lg p-5 bg-white/[0.02] hover:border-[#F4845F]/40 hover:bg-white/[0.04] transition-all"
              >
                <div className="shrink-0 w-10 h-10 rounded-md border border-white/10 flex items-center justify-center text-[#F4845F] group-hover:border-[#F4845F]/50 transition-colors">
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#F4845F] transition-colors">{e.name}</h4>
                  <p className="text-xs text-white/50 mt-1">
                    {lang === 'pt' ? 'Ver o motor →' : 'See the engine →'}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      {hasSignal && (
        <Link
          to={localized(`/our-ai#${ENGINE_META.i6signal.anchor}`)}
          className="group flex items-start gap-4 border border-[#F4845F]/30 rounded-lg p-5 bg-[#F4845F]/[0.04] hover:border-[#F4845F]/60 hover:bg-[#F4845F]/[0.07] transition-all"
        >
          <div className="shrink-0 w-10 h-10 rounded-md border border-[#F4845F]/40 flex items-center justify-center text-[#F4845F] group-hover:border-[#F4845F] transition-colors">
            <SignalIcon size={18} strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#F4845F]/80 mb-1">
              {lang === 'pt' ? 'Interface preditiva conversacional' : 'Conversational predictive interface'}
            </p>
            <h4 className="text-sm font-semibold text-white group-hover:text-[#F4845F] transition-colors">{ENGINE_META.i6signal.name}</h4>
            <p className="text-xs text-white/50 mt-1">
              {lang === 'pt' ? 'Conhecer o i6 Signal →' : 'Discover i6 Signal →'}
            </p>
          </div>
        </Link>
      )}
    </div>
  );
};

const ApplicationFlow = ({ lang }: { lang: 'pt' | 'en' }) => {
  const steps = lang === 'pt'
    ? ['Dado de negócio', 'Motor preditivo', 'Decisão prescritiva', 'Ativação i6 Signal']
    : ['Business data', 'Predictive engine', 'Prescriptive decision', 'i6 Signal activation'];
  return (
    <div className="mt-8 flex flex-col md:flex-row items-stretch gap-3">
      {steps.map((s, i) => (
        <div key={s} className="flex items-stretch gap-3 flex-1">
          <div className="flex-1 border border-white/10 rounded-lg p-5 bg-white/[0.02] text-center">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#F4845F] mb-2">
              {String(i + 1).padStart(2, '0')}
            </p>
            <p className="text-sm text-white/80 font-medium">{s}</p>
          </div>
          {i < steps.length - 1 && (
            <div className="hidden md:flex items-center text-white/30">
              <ArrowRight size={16} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const ResultsStrip = ({ piece }: { piece: LandingPiece }) => {
  if (piece.stats.length === 0) return null;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {piece.stats.map((s, i) => (
        <div key={i} className="border border-white/10 rounded-lg p-5 bg-white/[0.02]">
          <p className="text-2xl md:text-3xl font-bold text-[#F4845F] mb-1">{s.value}</p>
          <p className="text-xs text-white/70 leading-snug">{s.label}</p>
          {s.source && <p className="text-[10px] text-white/40 mt-2 uppercase tracking-wider">{s.source}</p>}
        </div>
      ))}
    </div>
  );
};

const RelatedStories = ({ piece, lang }: { piece: LandingPiece; lang: 'pt' | 'en' }) => {
  const slugs = csv(piece.related_stories).slice(0, 3);
  if (slugs.length === 0) return null;

  const stories = slugs
    .map((slug) => getStoryBySlug(slug, lang))
    .filter(Boolean) as NonNullable<ReturnType<typeof getStoryBySlug>>[];

  if (stories.length === 0) return null;

  return (
    <SectionShell
      eyebrow={lang === 'pt' ? 'Provas reais' : 'Real proof'}
      title={lang === 'pt' ? 'Cases relacionados' : 'Related cases'}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stories.map((story) => (
          <RelatedStoryMiniCard key={story.slug} story={story} language={lang} />
        ))}
      </div>
    </SectionShell>
  );
};

const FAQList = ({ piece, lang }: { piece: LandingPiece; lang: 'pt' | 'en' }) => {
  if (piece.faq.length === 0) return null;
  return (
    <SectionShell
      eyebrow={lang === 'pt' ? 'Dúvidas frequentes' : 'Frequent questions'}
      title={lang === 'pt' ? 'Perguntas frequentes' : 'FAQ'}
    >
      <dl className="space-y-6">
        {piece.faq.map((f, i) => (
          <div key={i} className="border-l-2 border-[#F4845F]/40 pl-5">
            <dt className="text-sm font-semibold text-white mb-2">{f.q}</dt>
            <dd className="text-sm text-white/65 leading-relaxed">{f.a}</dd>
          </div>
        ))}
      </dl>
    </SectionShell>
  );
};

const TransformationLanding = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const localized = useLocalizedPath();
  const piece = useLanding(slug);

  if (!isLandingSlug(slug)) return <Navigate to={localized('/solutions')} replace />;
  if (!piece) return <Navigate to={localized('/solutions')} replace />;

  const url = `${BASE_URL}/${language}/solutions/${piece.slug}`;
  const pain = piece.sections.find((s) => s.id === 'pain');
  const problem = piece.sections.find((s) => s.id === 'problem');
  const solution = piece.sections.find((s) => s.id === 'solution');
  const application = piece.sections.find((s) => s.id === 'application');
  const results = piece.sections.find((s) => s.id === 'results');

  const sectorsLabel = language === 'pt' ? 'Setores' : 'Sectors';

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: piece.title,
    description: piece.description,
    url,
    serviceType: piece.hero_kicker || piece.title,
    provider: { '@type': 'Organization', name: 'infinity6', url: BASE_URL },
    areaServed: ['BR', 'LatAm'],
    ...(piece.stats.length > 0 ? {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: language === 'pt' ? 'Resultados mensuráveis' : 'Measurable results',
        itemListElement: piece.stats.map((s) => ({
          '@type': 'QuantitativeValue',
          value: s.value, unitText: s.label,
        })),
      },
    } : {}),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/${language}` },
      { '@type': 'ListItem', position: 2, name: language === 'pt' ? 'Soluções' : 'Solutions', item: `${BASE_URL}/${language}/solutions` },
      { '@type': 'ListItem', position: 3, name: piece.title, item: url },
    ],
  };

  // FAQPage JSON-LD is injected by scripts/prerender-seo-stubs.mjs
  // (static stub) to avoid duplicate FAQPage blocks in <head> after hydration.

  return (
    <>
      <Helmet>
        <html lang={language === 'pt' ? 'pt-BR' : 'en'} />
        <title>{`${piece.title} | infinity6`}</title>
        <meta name="description" content={piece.description} />
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="en" href={`${BASE_URL}/en/solutions/${piece.slug}`} />
        <link rel="alternate" hrefLang="pt-BR" href={`${BASE_URL}/pt/solutions/${piece.slug}`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/en/solutions/${piece.slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={piece.title} />
        <meta property="og:description" content={piece.description} />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      {/* sr-only crawler block with sectors + long-tail keywords */}
      <div className="sr-only" aria-hidden="true">
        <h2>{piece.title}</h2>
        <p>{piece.description}</p>
        {piece.sectors && <p>{sectorsLabel}: {piece.sectors}</p>}
        {piece.faq.map((f, i) => <div key={i}><strong>{f.q}</strong><p>{f.a}</p></div>)}
      </div>

      <HeroSection piece={piece} lang={language} />

      {pain && (
        <SectionShell eyebrow={language === 'pt' ? 'A dor real' : 'The real pain'} title={language === 'pt' ? 'Dor' : 'Pain'}>
          <MarkdownBody md={pain.body} />
        </SectionShell>
      )}

      {problem && (
        <SectionShell eyebrow={language === 'pt' ? 'Onde as soluções tradicionais falham' : 'Where traditional solutions fail'} title={language === 'pt' ? 'Problema' : 'Problem'}>
          <MarkdownBody md={problem.body} />
        </SectionShell>
      )}

      {solution && (
        <SectionShell eyebrow={language === 'pt' ? 'Motores aplicados' : 'Applied engines'} title={language === 'pt' ? 'Solução' : 'Solution'}>
          <MarkdownBody md={solution.body} />
          <SolutionEngines piece={piece} lang={language} />
        </SectionShell>
      )}

      {application && (
        <SectionShell eyebrow={language === 'pt' ? 'Como roda em produção' : 'How it runs in production'} title={language === 'pt' ? 'Aplicação' : 'Application'}>
          <MarkdownBody md={application.body} />
          <ApplicationFlow lang={language} />
        </SectionShell>
      )}

      {results && (
        <SectionShell eyebrow={language === 'pt' ? 'Resultados em números' : 'Results in numbers'} title={language === 'pt' ? 'Resultados' : 'Results'}>
          <ResultsStrip piece={piece} />
        </SectionShell>
      )}

      <RelatedStories piece={piece} lang={language} />
      <FAQList piece={piece} lang={language} />
      <CTAFinal />
    </>
  );
};

export default TransformationLanding;
