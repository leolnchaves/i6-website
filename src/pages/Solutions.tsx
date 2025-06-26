
import SolutionsHero from '@/components/solutions/SolutionsHero';
import SolutionsGrid from '@/components/solutions/SolutionsGrid';
import ImplementationProcess from '@/components/solutions/ImplementationProcess';
import SolutionsCTA from '@/components/solutions/SolutionsCTA';

const Solutions = () => {
  console.log('Solutions page is rendering');

  return (
    <div className="min-h-screen">
      <SolutionsHero />
      <SolutionsGrid />
      <ImplementationProcess />
      <SolutionsCTA />
    </div>
  );
};

export default Solutions;
