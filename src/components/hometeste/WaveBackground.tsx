const FADE_MASK_LEFT = 'linear-gradient(to right, black 30%, transparent 100%)';
const FADE_MASK_RIGHT = 'linear-gradient(to left, black 30%, transparent 100%)';

const Curves = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    viewBox="0 0 180 1200"
    preserveAspectRatio="none"
  >
    {/* Curva 1 — mais interna, fina */}
    <path
      d="M14,-60 C24,200 6,380 18,600 C30,820 8,980 20,1260"
      fill="none"
      stroke="rgba(244,132,95,0.28)"
      strokeWidth="1.4"
      strokeLinecap="round"
      className="motion-safe:animate-[curve-flow-2_14s_ease-in-out_infinite_reverse]"
      style={{ transformOrigin: '14px 600px' }}
    />
    {/* Curva 2 */}
    <path
      d="M38,-50 C52,220 28,400 44,620 C60,840 32,1000 48,1260"
      fill="none"
      stroke="rgba(244,132,95,0.36)"
      strokeWidth="1.6"
      strokeLinecap="round"
      className="motion-safe:animate-[curve-flow-1_11s_ease-in-out_infinite]"
      style={{ transformOrigin: '38px 600px' }}
    />
    {/* Curva 3 — principal */}
    <path
      d="M68,-40 C86,180 58,360 76,580 C94,800 60,960 80,1240"
      fill="none"
      stroke="rgba(244,132,95,0.46)"
      strokeWidth="2.2"
      strokeLinecap="round"
      className="motion-safe:animate-[curve-flow-3_12s_ease-in-out_infinite]"
      style={{ transformOrigin: '68px 600px' }}
    />
    {/* Curva 4 */}
    <path
      d="M100,-50 C118,200 90,380 108,600 C126,820 92,980 110,1260"
      fill="none"
      stroke="rgba(244,132,95,0.34)"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="motion-safe:animate-[curve-flow-1_15s_ease-in-out_infinite_reverse]"
      style={{ transformOrigin: '100px 600px' }}
    />
    {/* Curva 5 */}
    <path
      d="M132,-60 C152,220 124,400 142,620 C160,840 126,1000 144,1260"
      fill="none"
      stroke="rgba(244,132,95,0.26)"
      strokeWidth="1.6"
      strokeLinecap="round"
      className="motion-safe:animate-[curve-flow-2_13s_ease-in-out_infinite]"
      style={{ transformOrigin: '132px 600px' }}
    />
    {/* Curva 6 — mais externa, suave */}
    <path
      d="M162,-40 C182,180 154,360 172,580 C190,800 156,960 174,1240"
      fill="none"
      stroke="rgba(244,132,95,0.20)"
      strokeWidth="1.4"
      strokeLinecap="round"
      className="motion-safe:animate-[curve-flow-3_16s_ease-in-out_infinite_reverse]"
      style={{ transformOrigin: '162px 600px' }}
    />
  </svg>
);

const WaveBackground = () => (
  <>
    <div
      aria-hidden="true"
      className="absolute left-0 top-0 h-full w-[180px] md:w-[220px] pointer-events-none overflow-hidden z-[1]"
      style={{ maskImage: FADE_MASK_LEFT, WebkitMaskImage: FADE_MASK_LEFT }}
    >
      <Curves />
    </div>
    <div
      aria-hidden="true"
      className="absolute right-0 top-0 h-full w-[180px] md:w-[220px] pointer-events-none overflow-hidden z-[1]"
      style={{
        maskImage: FADE_MASK_RIGHT,
        WebkitMaskImage: FADE_MASK_RIGHT,
        transform: 'scaleX(-1)',
      }}
    >
      <Curves />
    </div>
  </>
);

export default WaveBackground;
