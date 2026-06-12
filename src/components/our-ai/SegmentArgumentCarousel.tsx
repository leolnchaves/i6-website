import { memo, useEffect, useMemo, useState } from 'react';

interface Segment {
  label: string;
  items: { title: string; subtitle: string }[];
}

interface Props {
  segments: Segment[];
}

const STEP = 76; // card height + gap (px)
const VISIBLE = 3;
const INTERVAL = 2600;

const SegmentArgumentCarousel = memo(({ segments }: Props) => {
  const flat = useMemo(
    () => segments.flatMap((s) => s.items.map((it) => ({ ...it, segment: s.label }))),
    [segments],
  );
  const N = flat.length;

  const [i, setI] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced || N === 0) return;
    const id = setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      setI((prev) => prev + 1);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [reduced, N]);

  // Seamless loop: when we reach N, after transition completes, snap back to 0 without animation.
  useEffect(() => {
    if (i < N || N === 0) return;
    const t = setTimeout(() => {
      setAnimate(false);
      setI(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    }, 700);
    return () => clearTimeout(t);
  }, [i, N]);

  const doubled = useMemo(() => [...flat, ...flat], [flat]);
  const currentSegment = flat[i % Math.max(N, 1)]?.segment ?? '';

  if (N === 0) return null;

  return (
    <div>
      {/* Segment label */}
      <div className="flex items-baseline gap-2 mb-3 h-4">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F4845F]" />
        <span
          key={currentSegment}
          className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#F4845F]/90 animate-fade-in"
        >
          {currentSegment}
        </span>
      </div>

      {/* Carousel viewport */}
      <div
        className="relative overflow-hidden"
        style={{ height: STEP * VISIBLE - 8 }}
        aria-live="polite"
      >
        <div
          className="flex flex-col gap-2"
          style={{
            transform: `translateY(-${(reduced ? 0 : i) * STEP}px)`,
            transition: animate && !reduced ? 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        >
          {doubled.map((it, idx) => (
            <div
              key={idx}
              className="border border-white/10 rounded p-3 bg-[#0B1224] h-[68px] flex flex-col justify-center"
            >
              <p className="text-xs font-semibold text-white uppercase tracking-wide">{it.title}</p>
              <p className="text-[11px] text-white/50 mt-0.5 leading-snug">{it.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Edge fades */}
        <div className="absolute top-0 inset-x-0 h-5 bg-gradient-to-b from-[#0A101F] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-5 bg-gradient-to-t from-[#0A101F] to-transparent pointer-events-none" />
      </div>
    </div>
  );
});

SegmentArgumentCarousel.displayName = 'SegmentArgumentCarousel';
export default SegmentArgumentCarousel;
