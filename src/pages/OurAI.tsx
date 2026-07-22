import { memo, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/common/SEOHead';
import { ourAIContent } from '@/data/staticData/ourAIContent';
import { realResults } from '@/data/staticData/realResults';

import OurAIHero from '@/components/our-ai/OurAIHero';
import ThesisSection from '@/components/our-ai/ThesisSection';
import EnginesGrid from '@/components/our-ai/EnginesGrid';
import DiversityBalanceSection from '@/components/our-ai/DiversityBalanceSection';
import ExplainabilitySection from '@/components/our-ai/ExplainabilitySection';

import SecuritySection from '@/components/our-ai/SecuritySection';
import ChallengesAccordion from '@/components/our-ai/ChallengesAccordion';
import CommunitySection from '@/components/our-ai/CommunitySection';
import ResearchSection from '@/components/our-ai/ResearchSection';
import GlossarySection from '@/components/our-ai/GlossarySection';
import CTAFinal from '@/components/hometeste/CTAFinal';
import RealResultsStrip from '@/components/common/RealResultsStrip';

const BASE_URL = 'https://infinity6.ai';

const OurAI = memo(() => {
  const { language } = useLanguage();
  const c = ourAIContent[language];

  const jsonLd = useMemo(() => {
    const url = `${BASE_URL}/${language}/our-ai`;
    const techArticle = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: c.hero.title,
      description: c.hero.lead,
      url,
      image: `${BASE_URL}/favicon.ico`,
      inLanguage: language === 'pt' ? 'pt-BR' : 'en',
      author: { '@type': 'Organization', name: 'infinity6', url: BASE_URL },
      publisher: { '@type': 'Organization', name: 'infinity6', url: BASE_URL },
      about: c.engines.items.map((e) => e.name),
      keywords: [
        'proprietary AI', 'predictive intelligence', 'recommendation engine',
        'demand forecasting', 'dynamic pricing', 'i6-RecSys-Base.g1',
        'MAML', 'Active Learning', 'Topological Loss',
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
      inLanguage: language === 'pt' ? 'pt-BR' : 'en',
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
        name: r.label[language],
        observationAbout: { '@type': 'Organization', name: 'infinity6', url: BASE_URL },
        variableMeasured: {
          '@type': 'PropertyValue',
          name: r.label[language],
          ...(r.unitText ? { unitText: r.unitText } : {}),
        },
        measuredValue: r.numericValue,
        ...(r.unitText ? { unitText: r.unitText } : {}),
        description: `${language === 'pt' ? 'Setor' : 'Sector'}: ${r.source[language]}`,
      }));

    return {
      '@context': 'https://schema.org',
      '@graph': [techArticle, ...applications, definedTermSet, ...statistics],
    };
  }, [c, language]);

  return (
    <>
      <SEOHead page="our-ai" jsonLd={jsonLd} />
      <OurAIHero content={c.hero} />
      <EnginesGrid content={c.engines} foundation={c.thesis.foundation} />
      <DiversityBalanceSection content={c.diversity} />
      <ExplainabilitySection content={c.explainability} />
      <ThesisSection content={c.thesis} />
      
      <SecuritySection content={c.security} />
      <ChallengesAccordion content={c.challenges} />
      <CommunitySection content={c.community} />
      <ResearchSection content={c.research} />
      <RealResultsStrip />
      <GlossarySection content={c.glossary} />
      <CTAFinal />
    </>
  );
});

OurAI.displayName = 'OurAI';
export default OurAI;
