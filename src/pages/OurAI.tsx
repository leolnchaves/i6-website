import { memo, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/common/SEOHead';
import { ourAIContent } from '@/data/staticData/ourAIContent';

import OurAIHero from '@/components/our-ai/OurAIHero';
import ThesisSection from '@/components/our-ai/ThesisSection';
import EnginesGrid from '@/components/our-ai/EnginesGrid';
import DualValueSection from '@/components/our-ai/DualValueSection';
import LearnInfluenceFlow from '@/components/our-ai/LearnInfluenceFlow';
import DiversityBalanceSection from '@/components/our-ai/DiversityBalanceSection';
import ExplainabilitySection from '@/components/our-ai/ExplainabilitySection';
import SecuritySection from '@/components/our-ai/SecuritySection';
import ChallengesAccordion from '@/components/our-ai/ChallengesAccordion';
import CommunitySection from '@/components/our-ai/CommunitySection';
import OurAICTA from '@/components/our-ai/OurAICTA';

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
      offers: { '@type': 'Offer', priceCurrency: 'BRL', price: '0', availability: 'https://schema.org/InStock' },
    }));

    return { '@context': 'https://schema.org', '@graph': [techArticle, ...applications] };
  }, [c, language]);

  return (
    <>
      <SEOHead page="our-ai" jsonLd={jsonLd} />
      <OurAIHero content={c.hero} />
      <ThesisSection content={c.thesis} />
      <EnginesGrid content={c.engines} />
      <DualValueSection content={c.dualValue} />
      <LearnInfluenceFlow content={c.learnInfluence} />
      <DiversityBalanceSection content={c.diversity} />
      <ExplainabilitySection content={c.explainability} />
      <SecuritySection content={c.security} />
      <ChallengesAccordion content={c.challenges} />
      <CommunitySection content={c.community} />
      <OurAICTA content={c.cta} />
    </>
  );
});

OurAI.displayName = 'OurAI';
export default OurAI;
