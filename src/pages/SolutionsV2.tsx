import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import SolutionsV2Hero from '@/components/solutions-v2/SolutionsV2Hero';
import TerritoriesBlock from '@/components/solutions-v2/TerritoriesBlock';
import TerritorySection from '@/components/solutions-v2/TerritorySection';
import SignalLayerBlock from '@/components/solutions-v2/SignalLayerBlock';
import HowWeImplement from '@/components/solutions-v2/HowWeImplement';
import SummaryBullets from '@/components/solutions-v2/SummaryBullets';
import RealResultsStrip from '@/components/common/RealResultsStrip';
import SolutionsCTA from '@/components/solutions/SolutionsCTA';

const SolutionsV2 = memo(() => {
  return (
    <>
      <Helmet>
        <title>Soluções infinity6 — preview</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <SolutionsV2Hero />
      <TerritoriesBlock />
      <TerritorySection territoryId="growth" />
      <TerritorySection territoryId="demand" />
      <TerritorySection territoryId="pricing" />
      <SignalLayerBlock />
      <HowWeImplement />
      <SummaryBullets />
      <RealResultsStrip />
      <SolutionsCTA />
    </>
  );
});

SolutionsV2.displayName = 'SolutionsV2';
export default SolutionsV2;
