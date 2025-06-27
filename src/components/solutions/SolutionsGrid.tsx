
import { useLanguage } from '@/contexts/LanguageContext';
import { getSolutionsData } from '@/data/solutions/solutionsData';
import SolutionCard from './SolutionCard';

const SolutionsGrid = () => {
  const { t } = useLanguage();
  const solutions = getSolutionsData(t);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              icon={solution.icon}
              title={solution.title}
              focus={solution.focus}
              description={solution.description}
              features={solution.features}
              outcome={solution.outcome}
              gradient={solution.gradient}
              bgColor={solution.bgColor}
              borderColor={solution.borderColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsGrid;
