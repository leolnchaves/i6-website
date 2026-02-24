import { memo } from 'react';
import SolutionsHero from '@/components/solutions/SolutionsHero';
import StaticSolutionsGrid from '@/components/solutions/StaticSolutionsGrid';
import I6SignalDemo from '@/components/solutions/I6SignalDemo';
import SolutionsCTA from '@/components/solutions/SolutionsCTA';
import SEOHead from '@/components/common/SEOHead';

const Solutions = memo(() => (
  <>
    <SEOHead page="solutions" />
    <SolutionsHero />
    <StaticSolutionsGrid />
    <I6SignalDemo />
    <SolutionsCTA />
  </>
));

Solutions.displayName = 'Solutions';

export default Solutions;
