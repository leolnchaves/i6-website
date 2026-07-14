import type { LeanSolution, SolutionsV2Content } from '@/data/solutionsV2/content';

interface Props {
  solutions: LeanSolution[];
  labels: SolutionsV2Content['labels'];
  activeId: string | null;
  onSelect: (id: string) => void;
}

const SolutionsGrid = ({ solutions, labels, activeId, onSelect }: Props) => {
  return (
    <div className="flex flex-nowrap gap-[2vmin]">
      {solutions.map((s) => {
        const isActive = activeId === s.id;
        return (
          <button
            type="button"
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`flex-1 min-w-0 basis-0 text-left rounded-2xl border-2 p-[2.2vmin] transition-all min-h-[16vmin] ${
              isActive
                ? 'bg-[#F4845F]/12 border-[#F4845F] shadow-[0_0_30px_rgba(244,132,95,0.25)]'
                : 'bg-white/5 border-white/10'
            }`}
          >
            <h4
              className={`text-[2.2vmin] font-bold leading-tight mb-[1vmin] ${
                isActive ? 'text-[#F4845F]' : 'text-white'
              }`}
            >
              {s.title}
            </h4>
            <p className="text-[1.7vmin] text-white/70 leading-snug mb-[1.5vmin]">{s.tagline}</p>
            <div className="flex flex-col gap-[0.8vmin]">
              <Row label={labels.resolve} value={s.resolve} />
              <Row label={labels.entrega} value={s.entrega} />
              <Row label={labels.impacto} value={s.impacto} />
            </div>
          </button>
        );
      })}
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="border-t border-white/5 first:border-t-0 pt-[0.6vmin]">
    <span className="block text-[1.2vmin] font-semibold tracking-[0.2em] uppercase text-[#F4845F]/80">
      {label}
    </span>
    <span className="block text-[1.6vmin] text-white/75 leading-snug">{value}</span>
  </div>
);

export default SolutionsGrid;
