import { memo } from 'react';
import { solutionsV2Content, type TerritoryId } from '@/data/solutionsV2/content';
import LeanSolutionCard from './LeanSolutionCard';

interface Props {
  territoryId: TerritoryId;
}

const TerritorySection = memo(({ territoryId }: Props) => {
  const territory = solutionsV2Content.territories.find((t) => t.id === territoryId);
  const solutions = solutionsV2Content.solutions.filter((s) => s.territory === territoryId);
  if (!territory) return null;

  return (
    <section
      id={`territory-${territory.id}`}
      className="py-16 md:py-20 bg-[#0B1224] border-t border-white/5 scroll-mt-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-4xl mb-10">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#F4845F] mb-3">
            {territory.eyebrow}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {territory.title}
          </h2>
          <p className="text-base text-white/80 leading-snug mb-3">
            {territory.tagline}
          </p>
          <p className="text-sm text-white/60 leading-relaxed">
            {territory.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutions.map((s) => (
            <LeanSolutionCard key={s.id} solution={s} />
          ))}
        </div>
      </div>
    </section>
  );
});

TerritorySection.displayName = 'TerritorySection';
export default TerritorySection;
