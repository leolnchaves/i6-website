import { memo } from 'react';
import SolutionsV2Hero from '@/components/solutions-v2/SolutionsV2Hero';
import TerritoriesBlock from '@/components/solutions-v2/TerritoriesBlock';
import TerritorySection from '@/components/solutions-v2/TerritorySection';
import SignalLayerBlock from '@/components/solutions-v2/SignalLayerBlock';
import HowWeImplement from '@/components/solutions-v2/HowWeImplement';
import RealResultsStrip from '@/components/common/RealResultsStrip';
import CTAFinal from '@/components/hometeste/CTAFinal';
import SEOHead from '@/components/common/SEOHead';

const Solutions = memo(() => {
  return (
    <>
      <SEOHead page="solutions" />
      <SolutionsV2Hero />
      <TerritoriesBlock />
      <TerritorySection territoryId="growth" />
      <TerritorySection territoryId="planning" />
      <TerritorySection territoryId="pricing" />
      <SignalLayerBlock />
      <HowWeImplement />
      <RealResultsStrip />
      <CTAFinal />
    </>
  );
});

Solutions.displayName = 'Solutions';

export default Solutions;
