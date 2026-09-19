import { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/common/SEOHead';
import { ourAIContent } from '@/data/staticData/ourAIContent';

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

const OurAI = memo(() => {
  const { language } = useLanguage();
  const c = ourAIContent[language];

  return (
    <>
      <SEOHead page="our-ai" />
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
