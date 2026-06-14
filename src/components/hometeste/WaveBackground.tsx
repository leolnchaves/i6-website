const FADE_MASK = 'linear-gradient(to right, black 30%, transparent 100%)';

const WaveBackground = () => (
  <div
    aria-hidden="true"
    className="fixed left-0 top-0 h-full w-[220px] pointer-events-none overflow-hidden z-[15]"
    style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
  >
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 220 1200"
      preserveAspectRatio="none"
    >
      {/* Curva 1 — borda */}
      <path
        d="M30,-60 C38,180 14,360 32,580 C50,800 22,960 36,1260"
        fill="none"
        stroke="rgba(244,132,95,0.30)"
        strokeWidth="0.9"
        strokeLinecap="round"
        className="motion-safe:animate-[curve-flow-2_14s_ease-in-out_infinite_reverse]"
        style={{ transformOrigin: '30px 600px' }}
      />
      {/* Curva 2 */}
      <path
        d="M50,-50 C60,200 30,380 52,600 C74,820 38,980 56,1260"
        fill="none"
        stroke="rgba(244,132,95,0.38)"
        strokeWidth="1.1"
        strokeLinecap="round"
        className="motion-safe:animate-[curve-flow-1_11s_ease-in-out_infinite]"
        style={{ transformOrigin: '50px 600px' }}
      />
      {/* Curva 3 — principal, mais visível */}
      <path
        d="M72,-40 C82,160 50,340 76,560 C102,780 60,940 80,1240"
        fill="none"
        stroke="rgba(244,132,95,0.45)"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="motion-safe:animate-[curve-flow-3_12s_ease-in-out_infinite]"
        style={{ transformOrigin: '72px 600px' }}
      />
      {/* Curva 4 */}
      <path
        d="M92,-50 C100,180 70,360 96,580 C122,800 78,960 100,1260"
        fill="none"
        stroke="rgba(244,132,95,0.32)"
        strokeWidth="1.0"
        strokeLinecap="round"
        className="motion-safe:animate-[curve-flow-1_15s_ease-in-out_infinite_reverse]"
        style={{ transformOrigin: '92px 600px' }}
      />
      {/* Curva 5 */}
      <path
        d="M112,-60 C122,200 90,380 116,600 C142,820 98,980 120,1260"
        fill="none"
        stroke="rgba(244,132,95,0.28)"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="motion-safe:animate-[curve-flow-2_13s_ease-in-out_infinite]"
        style={{ transformOrigin: '112px 600px' }}
      />
      {/* Curva 6 */}
      <path
        d="M132,-40 C140,180 110,360 134,580 C158,800 116,960 138,1260"
        fill="none"
        stroke="rgba(244,132,95,0.22)"
        strokeWidth="0.9"
        strokeLinecap="round"
        className="motion-safe:animate-[curve-flow-3_16s_ease-in-out_infinite_reverse]"
        style={{ transformOrigin: '132px 600px' }}
      />
    </svg>
  </div>
);

export default WaveBackground;
