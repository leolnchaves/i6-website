import { useEffect, useState, type ReactNode, type ComponentType, type SVGProps } from 'react';
import { Sparkles, X } from 'lucide-react';
import { kioskBtn } from '@/components/kiosk/ui/kioskButtonClass';

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
  onSimulationClosed?: () => void;
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
  onSimulationClosed,
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
    onSimulationClosed?.();
  };

  return (
    <>
      <div className="rounded-3xl bg-gradient-to-br from-white/8 to-[#F4845F]/8 border border-[#F4845F]/30 p-[4vmin]">
        <div className="flex items-center gap-[2vmin] mb-[2.5vmin]">
          <span className="w-[6vmin] h-[6vmin] rounded-xl bg-[#F4845F]/15 border border-[#F4845F]/40 flex items-center justify-center">
            <Icon className="w-[3vmin] h-[3vmin] text-[#F4845F]" />
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
          className={kioskBtn('w-full min-h-[10vmin] text-[2.4vmin] gap-[1.5vmin]')}
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



          <div className="w-[90vw] h-[90vh] max-w-[90vw] rounded-3xl bg-[#0B1224] border border-white/10 flex flex-col overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <div key={instanceKey} className="flex-1 overflow-y-auto p-[3vmin]">
              {children}
            </div>

            <div className="flex-shrink-0 border-t border-white/10 bg-[#0B1224] p-[2vmin] flex justify-center">
              <button
                type="button"
                onClick={close}
                className={kioskBtn('min-h-[8vmin] px-[4vmin] py-[1.8vmin] text-[2vmin] gap-[1.5vmin]')}
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

const SummaryRow = ({ label, value }: { label: string; value: string; highlight?: boolean }) => (
  <div className="py-[1vmin]">
    <span className="block text-[1.6vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] mb-[0.6vmin]">
      {label}
    </span>
    <span className="block text-[2.4vmin] leading-snug text-white/90 whitespace-pre-line">{value}</span>
  </div>
);

export default SimulationLauncher;
