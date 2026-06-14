const FADE_MASK = 'linear-gradient(to right, black 50%, transparent 100%)';

const WaveBackground = () => (
  <div
    aria-hidden="true"
    className="fixed left-0 top-0 h-full w-[72px] pointer-events-none overflow-hidden z-[15]"
    style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
  >
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 72 1200"
      preserveAspectRatio="none"
    >
      {/* Curva 1 — colada na borda */}
      <path
        d="M3,-60 C7,180 -1,360 4,580 C9,800 1,960 5,1260"
        fill="none"
        stroke="rgba(244,132,95,0.32)"
        strokeWidth="0.9"
        strokeLinecap="round"
        className="motion-safe:animate-[curve-flow-2_14s_ease-in-out_infinite_reverse]"
        style={{ transformOrigin: '3px 600px' }}
      />
      {/* Curva 2 */}
      <path
        d="M10,-50 C16,200 4,380 12,600 C20,820 6,980 14,1260"
        fill="none"
        stroke="rgba(244,132,95,0.40)"
        strokeWidth="1.1"
        strokeLinecap="round"
        className="motion-safe:animate-[curve-flow-1_11s_ease-in-out_infinite]"
        style={{ transformOrigin: '10px 600px' }}
      />
      {/* Curva 3 — principal */}
      <path
        d="M19,-40 C26,160 12,340 22,560 C32,780 16,940 24,1240"
        fill="none"
        stroke="rgba(244,132,95,0.48)"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="motion-safe:animate-[curve-flow-3_12s_ease-in-out_infinite]"
        style={{ transformOrigin: '19px 600px' }}
      />
      {/* Curva 4 */}
      <path
        d="M28,-50 C34,180 20,360 32,580 C44,800 24,960 34,1260"
        fill="none"
        stroke="rgba(244,132,95,0.34)"
        strokeWidth="1.0"
        strokeLinecap="round"
        className="motion-safe:animate-[curve-flow-1_15s_ease-in-out_infinite_reverse]"
        style={{ transformOrigin: '28px 600px' }}
      />
      {/* Curva 5 */}
      <path
        d="M38,-60 C46,200 30,380 42,600 C54,820 34,980 44,1260"
        fill="none"
        stroke="rgba(244,132,95,0.28)"
        strokeWidth="1.1"
        strokeLinecap="round"
        className="motion-safe:animate-[curve-flow-2_13s_ease-in-out_infinite]"
        style={{ transformOrigin: '38px 600px' }}
      />
      {/* Curva 6 */}
      <path
        d="M50,-40 C58,180 42,360 54,580 C66,800 46,960 56,1260"
        fill="none"
        stroke="rgba(244,132,95,0.22)"
        strokeWidth="0.9"
        strokeLinecap="round"
        className="motion-safe:animate-[curve-flow-3_16s_ease-in-out_infinite_reverse]"
        style={{ transformOrigin: '50px 600px' }}
      />
    </svg>
  </div>
);

export default WaveBackground;
