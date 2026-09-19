import { memo, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/common/SEOHead';
import { pickLang, toContentLang } from '@/utils/localizedPath';
import { ourAIContent } from '@/data/staticData/ourAIContent';
import { realResults } from '@/data/staticData/realResults';

import IntelligenceHero from '@/components/our-ai/IntelligenceHero';
import EnginesTrio from '@/components/our-ai/EnginesTrio';
import BuilderBridge from '@/components/our-ai/BuilderBridge';
import FoundationModel from '@/components/our-ai/FoundationModel';
import ReasoningSection from '@/components/our-ai/ReasoningSection';
import SecuritySection from '@/components/our-ai/SecuritySection';
import ProductionResults from '@/components/our-ai/ProductionResults';
import ScienceHighlights from '@/components/our-ai/ScienceHighlights';
import GlossaryCondensed from '@/components/our-ai/GlossaryCondensed';
import OurAIClosing from '@/components/our-ai/OurAIClosing';

const BASE_URL = 'https://infinity6.ai';

// Descrição canônica da página para dados estruturados (alinhada aos 3 motores atuais).
const TECH_ARTICLE_DESCRIPTION: Record<string, string> = {
  pt: 'Três motores proprietários (i6 Previsio, i6 RecSys, i6 ElasticPrice) sobre um modelo fundacional, com incerteza medida e explicação rastreável.',
  en: 'Three proprietary engines (i6 Previsio, i6 RecSys, i6 ElasticPrice) on a shared foundation model, with measured uncertainty and traceable explanations.',
  es: 'Tres motores propietarios (i6 Previsio, i6 RecSys, i6 ElasticPrice) sobre un modelo fundacional compartido, con incertidumbre medida y explicación trazable.',
};

const OurAI = memo(() => {
  const { language } = useLanguage();
  const c = ourAIContent[language];

  const jsonLd = useMemo(() => {
    const url = `${BASE_URL}/${language}/our-ai`;
    const cl = toContentLang(language);
    const inLanguage = language === 'pt' ? 'pt-BR' : language === 'es' ? 'es' : 'en';

    const techArticle = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: c.hero.title,
      description: TECH_ARTICLE_DESCRIPTION[language] ?? TECH_ARTICLE_DESCRIPTION.pt,
      url,
      image: `${BASE_URL}/favicon.ico`,
      inLanguage,
      author: [
        { '@type': 'Organization', name: 'infinity6', url: BASE_URL },
        { '@id': `${BASE_URL}/#everton-gago` },
        { '@id': `${BASE_URL}/#leonardo-chaves` },
      ],
      publisher: { '@type': 'Organization', name: 'infinity6', url: BASE_URL },
      about: c.engines.items.map((e) => e.name),
      keywords: [
        'proprietary AI', 'intelligence layer', 'predictive engines',
        'demand forecasting', 'recommendation engine', 'dynamic pricing',
        'i6-RecSys-Base.g1', 'MAML', 'Active Learning', 'Topological Loss',
        'explainable AI',
      ],
    };

    const applications = c.engines.items.map((e) => ({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: e.name,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Cloud',
      description: e.description,
      url: `${url}#${e.id}`,
      creator: { '@type': 'Organization', name: 'infinity6', url: BASE_URL },
      provider: { '@type': 'Organization', name: 'infinity6', url: BASE_URL },
    }));

    const definedTermSet = {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      '@id': `${url}#glossario`,
      name: c.glossary.title,
      description: c.glossary.lead,
      inLanguage,
      hasDefinedTerm: c.glossary.terms.map((t) => ({
        '@type': 'DefinedTerm',
        '@id': `${url}#glossario-${t.slug}`,
        name: t.term,
        description: t.definition,
        inDefinedTermSet: `${url}#glossario`,
        url: `${url}#glossario-${t.slug}`,
      })),
    };

    const statistics = realResults
      .filter((r) => typeof r.numericValue === 'number')
      .map((r) => ({
        '@context': 'https://schema.org',
        '@type': 'Observation',
        name: pickLang(language, r.label),
        observationAbout: { '@type': 'Organization', name: 'infinity6', url: BASE_URL },
        variableMeasured: {
          '@type': 'PropertyValue',
          name: pickLang(language, r.label),
          ...(r.unitText ? { unitText: r.unitText } : {}),
        },
        measuredValue: r.numericValue,
        ...(r.unitText ? { unitText: r.unitText } : {}),
        description: `${c.results.sourceLabel}: ${pickLang(language, r.source)}`,
      }));

    return {
      '@context': 'https://schema.org',
      '@graph': [techArticle, ...applications, definedTermSet, ...statistics],
    };
  }, [c, language]);

  return (
    <>
      <SEOHead page="our-ai" jsonLd={jsonLd} />
      <div className="theme-sand">
        <IntelligenceHero content={c.hero} />
        <div id="motores" className="scroll-mt-24">
          <EnginesTrio content={c.engines} />
        </div>
        <div id="modelo-fundacional" className="scroll-mt-24">
          <FoundationModel content={c.foundation} />
        </div>
        <div id="metodo" className="scroll-mt-24">
          <ReasoningSection content={c.reasoning} />
        </div>
        <div id="base-cientifica" className="scroll-mt-24">
          <ScienceHighlights content={c.science} />
        </div>
        <div id="camada-abstracao" className="scroll-mt-24">
          <BuilderBridge content={c.builder} />
        </div>
        <div id="governanca" className="scroll-mt-24">
          <SecuritySection content={c.security} />
        </div>
        <ProductionResults content={c.results} />
        <GlossaryCondensed content={c.glossary} />
        <OurAIClosing content={c.closing} />

      </div>
    </>
  );
});

OurAI.displayName = 'OurAI';
export default OurAI;
