import { useEffect, useState, type ReactNode, type ComponentType, type SVGProps } from 'react';
import { Sparkles, X } from 'lucide-react';

type IconType = ComponentType<SVGProps<SVGSVGElement>>;
import { kioskContent, type KioskLang } from '@/data/kiosk/config';

interface Labels {
  resolve: string;
  entrega: string;
  impacto: string;
}

interface Props {
  lang: KioskLang;
  solutionTitle: string;
  solutionTagline?: string;
  resolve?: string;
  entrega?: string;
  impacto?: string;
  labels?: Labels;
  secondaryTitle?: string;
  secondaryResolve?: string;
  secondaryEntrega?: string;
  secondaryImpacto?: string;
  icon?: IconType;
  children: ReactNode;
}

const SimulationLauncher = ({
  lang,
  solutionTitle,
  solutionTagline,
  resolve,
  entrega,
  impacto,
  labels,
  secondaryTitle,
  secondaryResolve,
  secondaryEntrega,
  secondaryImpacto,
  icon: Icon = Sparkles,
  children,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [instanceKey, setInstanceKey] = useState(0);
  const t = kioskContent[lang].results;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    // remount children next time so internal demo state resets
    setInstanceKey((k) => k + 1);
  };

  return (
    <>
      <div className="rounded-3xl bg-gradient-to-br from-white/8 to-[#F4845F]/8 border border-[#F4845F]/30 p-[4vmin]">
        <div className="flex items-center gap-[2vmin] mb-[2.5vmin]">
          <span className="w-[6vmin] h-[6vmin] rounded-xl bg-[#F4845F]/15 border border-[#F4845F]/40 flex items-center justify-center">
            <Sparkles className="w-[3vmin] h-[3vmin] text-[#F4845F]" />
          </span>
          <div>
            <h3 className="text-[3.4vmin] font-bold leading-tight text-white">{solutionTitle}</h3>
            {solutionTagline && <p className="text-[2vmin] text-white/70">{solutionTagline}</p>}
          </div>
        </div>

        {labels && (resolve || entrega || impacto) && (
          <div className="grid grid-cols-1 gap-[2vmin] mb-[2.5vmin]">
            {resolve && <SummaryRow label={labels.resolve} value={resolve} />}
            {entrega && <SummaryRow label={labels.entrega} value={entrega} />}
            {impacto && <SummaryRow label={labels.impacto} value={impacto} highlight />}
          </div>
        )}

        {labels && secondaryTitle && (secondaryResolve || secondaryEntrega || secondaryImpacto) && (
          <div className="mt-[1vmin] mb-[2.5vmin] pt-[2.5vmin] border-t border-white/10">
            <h4 className="text-[2.6vmin] font-bold leading-tight text-[#F4845F] mb-[2vmin]">
              {secondaryTitle}
            </h4>
            <div className="grid grid-cols-1 gap-[2vmin]">
              {secondaryResolve && <SummaryRow label={labels.resolve} value={secondaryResolve} />}
              {secondaryEntrega && <SummaryRow label={labels.entrega} value={secondaryEntrega} />}
              {secondaryImpacto && <SummaryRow label={labels.impacto} value={secondaryImpacto} highlight />}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full min-h-[10vmin] rounded-2xl bg-[#F4845F] hover:bg-[#F4845F]/90 active:scale-[0.99] transition text-white font-bold text-[2.4vmin] flex items-center justify-center gap-[1.5vmin] shadow-[0_0_40px_rgba(244,132,95,0.35)]"
        >
          {t.simulateButton}
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0B1224]/95 backdrop-blur-sm flex items-center justify-center p-[2vmin] animate-fade-in"
        >
          <button
            type="button"
            onClick={close}
            aria-label={t.closeSimulation}
            className="absolute top-[3vmin] right-[3vmin] w-[7vmin] h-[7vmin] rounded-full border border-white/25 bg-white/[0.06] flex items-center justify-center text-white/80 hover:text-white hover:border-[#F4845F]/70 hover:bg-[#F4845F]/[0.1] active:scale-95 transition"
          >
            <X className="w-[3vmin] h-[3vmin]" />
          </button>

          <div className="w-[90vw] h-[90vh] max-w-[90vw] rounded-3xl bg-[#0B1224] border border-white/10 flex flex-col overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <div key={instanceKey} className="flex-1 overflow-y-auto p-[3vmin]">
              {children}
            </div>

            <div className="flex-shrink-0 border-t border-white/10 bg-[#0B1224] p-[2vmin] flex justify-center">
              <button
                type="button"
                onClick={close}
                className="min-h-[8vmin] px-[4vmin] py-[1.8vmin] rounded-full border-2 border-[#F4845F]/60 bg-[#F4845F]/[0.08] hover:bg-[#F4845F]/[0.16] hover:border-[#F4845F] active:scale-[0.98] transition text-white font-semibold text-[2vmin] inline-flex items-center gap-[1.5vmin]"
              >
                <X className="w-[2.2vmin] h-[2.2vmin]" />
                {t.closeSimulation}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const SummaryRow = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div
    className={`rounded-2xl p-[2.5vmin] border ${
      highlight ? 'bg-[#F4845F]/10 border-[#F4845F]/40' : 'bg-white/5 border-white/10'
    }`}
  >
    <span className="block text-[1.6vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] mb-[0.6vmin]">
      {label}
    </span>
    <span className="block text-[2.4vmin] leading-snug text-white/90 whitespace-pre-line">{value}</span>
  </div>
);

export default SimulationLauncher;
