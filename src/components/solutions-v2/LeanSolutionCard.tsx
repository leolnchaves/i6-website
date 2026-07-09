import { memo } from 'react';
import type { LeanSolution } from '@/data/solutionsV2/content';

interface Props {
  solution: LeanSolution;
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-0.5 py-2 border-t border-white/5 first:border-t-0">
    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#F4845F]/80">
      {label}
    </span>
    <span className="text-sm text-white/75 leading-snug">{value}</span>
  </div>
);

const LeanSolutionCard = memo(({ solution }: Props) => {
  return (
    <article
      id={solution.id}
      className="group relative rounded-2xl bg-white/5 border border-white/10 hover:border-[#F4845F]/50 backdrop-blur-sm transition-all duration-500 p-5"
    >
      <div className="absolute top-0 left-0 w-0 h-1 bg-[#F4845F] group-hover:w-full transition-all duration-700 ease-out rounded-t-2xl" />
      <h4 className="text-base font-bold text-white mb-1.5 group-hover:text-[#F4845F] transition-colors">
        {solution.title}
      </h4>
      <p className="text-sm text-white/70 leading-snug mb-4">
        {solution.tagline}
      </p>
      <div className="rounded-lg bg-white/5 border border-white/10 px-3">
        <Row label="Resolve" value={solution.resolve} />
        <Row label="Entrega" value={solution.entrega} />
        <Row label="Impacto" value={solution.impacto} />
      </div>
    </article>
  );
});

LeanSolutionCard.displayName = 'LeanSolutionCard';
export default LeanSolutionCard;
