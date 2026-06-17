// Option A — Vertical Rain: data streaks falling on the left side
// Positions are relative to the narrow left strip container (0–100% of strip width)
const LINES = [
  { x: 12, dur: 7, delay: 0, op: 0.5 },
  { x: 26, dur: 11, delay: 2, op: 0.35 },
  { x: 40, dur: 9, delay: 4, op: 0.6 },
  { x: 55, dur: 13, delay: 1, op: 0.4 },
  { x: 68, dur: 8, delay: 5, op: 0.55 },
  { x: 80, dur: 12, delay: 3, op: 0.3 },
  { x: 92, dur: 10, delay: 6, op: 0.45 },
];

const MotionVerticalRain = () => (
  <div
    className="absolute top-0 bottom-0 left-0 pointer-events-none overflow-hidden w-[22%] sm:w-[20%] md:w-[18%] lg:w-[16%]"
    aria-hidden
  >
    <style>{`
      @keyframes rain-fall {
        0%   { transform: translateY(-30%); opacity: 0; }
        15%  { opacity: 1; }
        85%  { opacity: 1; }
        100% { transform: translateY(120vh); opacity: 0; }
      }
      @keyframes line-breathe {
        0%, 100% { opacity: var(--op); }
        50%      { opacity: calc(var(--op) * 0.45); }
      }
    `}</style>

    {/* Static thin guide lines */}
    {LINES.map((l, i) => (
      <div
        key={`g-${i}`}
        className="absolute top-0 h-full"
        style={{
          left: `${l.x}%`,
          width: '1px',
          background:
            'linear-gradient(to bottom, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)',
          ['--op' as never]: l.op * 0.4,
          animation: `line-breathe ${l.dur * 1.4}s ease-in-out ${l.delay}s infinite`,
        }}
      />
    ))}

    {/* Falling coral streaks */}
    {LINES.map((l, i) => (
      <div
        key={`s-${i}`}
        className="absolute top-0"
        style={{
          left: `${l.x}%`,
          width: '1px',
          height: '28vh',
          background:
            'linear-gradient(to bottom, rgba(244,132,95,0) 0%, rgba(244,132,95,0.15) 30%, rgba(244,132,95,0.9) 92%, #F4845F 100%)',
          boxShadow: '0 0 6px rgba(244,132,95,0.6), 0 0 14px rgba(244,132,95,0.25)',
          animation: `rain-fall ${l.dur}s cubic-bezier(0.4, 0, 0.6, 1) ${l.delay}s infinite`,
        }}
      />
    ))}

    {/* Second wave with longer delays */}
    {LINES.map((l, i) => (
      <div
        key={`s2-${i}`}
        className="absolute top-0"
        style={{
          left: `${l.x}%`,
          width: '1px',
          height: '22vh',
          background:
            'linear-gradient(to bottom, rgba(244,132,95,0) 0%, rgba(244,132,95,0.1) 30%, rgba(244,132,95,0.7) 92%, #F4845F 100%)',
          boxShadow: '0 0 5px rgba(244,132,95,0.5)',
          animation: `rain-fall ${l.dur * 1.3}s cubic-bezier(0.4, 0, 0.6, 1) ${l.delay + l.dur / 2}s infinite`,
        }}
      />
    ))}
  </div>
);

export default MotionVerticalRain;
