import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

type Option = { value: string; label: string };

interface TouchSelectProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
}

const TouchSelect = ({ label, value, onChange, options }: TouchSelectProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const current = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full rounded-xl border px-[1.6vmin] py-[1.2vmin] flex flex-col gap-[0.35vmin] text-left transition min-h-[6.5vmin] ${
          open
            ? 'border-[#F4845F] bg-[#F4845F]/10'
            : 'border-white/10 bg-white/[0.04] hover:border-[#F4845F]/40'
        }`}
      >
        <span className="text-[1.05vmin] tracking-[0.2em] uppercase font-semibold text-white/55">
          {label}
        </span>
        <span className="flex items-center justify-between gap-[1vmin]">
          <span className="text-white text-[1.7vmin] font-semibold truncate">
            {current?.label ?? '—'}
          </span>
          <ChevronDown
            className={`w-[1.8vmin] h-[1.8vmin] text-[#F4845F] transition-transform flex-shrink-0 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </span>
      </button>

      {open && (
        <div
          className="absolute left-0 right-0 top-[calc(100%+0.6vmin)] z-50 rounded-xl border border-[#F4845F]/40 bg-[#0B1224] shadow-[0_1.6vmin_3vmin_rgba(0,0,0,0.55)] overflow-hidden"
          style={{ minWidth: '28vmin' }}
        >
          <div className="max-h-[42vmin] overflow-y-auto py-[0.5vmin]">
            {options.map((o) => {
              const selected = o.value === value;
              return (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`w-full min-h-[6vmin] px-[1.6vmin] py-[1.2vmin] flex items-center gap-[1vmin] text-left transition ${
                    selected
                      ? 'bg-[#F4845F]/15 text-white'
                      : 'text-white/85 hover:bg-white/[0.06] active:bg-[#F4845F]/10'
                  }`}
                >
                  <span
                    className={`w-[0.4vmin] self-stretch rounded-full ${
                      selected ? 'bg-[#F4845F]' : 'bg-transparent'
                    }`}
                  />
                  <span className="text-[1.6vmin] font-semibold flex-1 truncate">
                    {o.label}
                  </span>
                  {selected && (
                    <Check className="w-[1.8vmin] h-[1.8vmin] text-[#F4845F] flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TouchSelect;
