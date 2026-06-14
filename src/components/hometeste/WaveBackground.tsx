const FADE_MASK = 'linear-gradient(to right, black 25%, transparent 95%)';

const WaveBackground = () => (
  <div
    aria-hidden="true"
    className="fixed left-0 top-0 h-full w-[160px] pointer-events-none overflow-hidden z-[15]"
    style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
  >
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 160 1200"
      preserveAspectRatio="none"
    >
      {/* Curva 1 — colada na borda */}
      <path
        d="M4,-60 C10,180 -4,360 6,580 C16,800 0,960 8,1260"
        fill="none"
        stroke="rgba(244,132,95,0.30)"
        strokeWidth="0.9"
        strokeLinecap="round"
        className="motion-safe:animate-[curve-flow-2_14s_ease-in-out_infinite_reverse]"
        style={{ transformOrigin: '4px 600px' }}
      />
      {/* Curva 2 */}
      <path
        d="M16,-50 C24,200 8,380 20,600 C32,820 12,980 22,1260"
        fill="none"
        stroke="rgba(244,132,95,0.38)"
        strokeWidth="1.1"
        strokeLinecap="round"
        className="motion-safe:animate-[curve-flow-1_11s_ease-in-out_infinite]"
        style={{ transformOrigin: '16px 600px' }}
      />
      {/* Curva 3 — principal */}
      <path
        d="M30,-40 C40,160 18,340 34,560 C50,780 24,940 36,1240"
        fill="none"
        stroke="rgba(244,132,95,0.45)"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="motion-safe:animate-[curve-flow-3_12s_ease-in-out_infinite]"
        style={{ transformOrigin: '30px 600px' }}
      />
      {/* Curva 4 */}
      <path
        d="M46,-50 C54,180 32,360 50,580 C68,800 38,960 52,1260"
        fill="none"
        stroke="rgba(244,132,95,0.32)"
        strokeWidth="1.0"
        strokeLinecap="round"
        className="motion-safe:animate-[curve-flow-1_15s_ease-in-out_infinite_reverse]"
        style={{ transformOrigin: '46px 600px' }}
      />
      {/* Curva 5 */}
      <path
        d="M62,-60 C72,200 48,380 66,600 C84,820 54,980 68,1260"
        fill="none"
        stroke="rgba(244,132,95,0.28)"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="motion-safe:animate-[curve-flow-2_13s_ease-in-out_infinite]"
        style={{ transformOrigin: '62px 600px' }}
      />
      {/* Curva 6 */}
      <path
        d="M80,-40 C88,180 64,360 82,580 C100,800 70,960 86,1260"
        fill="none"
        stroke="rgba(244,132,95,0.22)"
        strokeWidth="0.9"
        strokeLinecap="round"
        className="motion-safe:animate-[curve-flow-3_16s_ease-in-out_infinite_reverse]"
        style={{ transformOrigin: '80px 600px' }}
      />
    </svg>
  </div>
);

export default WaveBackground;
