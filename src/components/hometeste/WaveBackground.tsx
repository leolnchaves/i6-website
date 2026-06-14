const FADE_MASK = 'linear-gradient(to right, black 35%, transparent 100%)';

const WaveBackground = () => (
  <div
    aria-hidden="true"
    className="fixed left-0 top-0 h-full w-[260px] pointer-events-none overflow-hidden z-[15]"
    style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
  >
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 260 1200"
      preserveAspectRatio="none"
    >
      {/* Curva principal — mais visível, ancorada ao centro da faixa */}
      <path
        d="M120,-40 C130,160 70,340 110,560 C150,780 90,940 130,1240"
        fill="none"
        stroke="rgba(244,132,95,0.45)"
        strokeWidth="1.6"
        strokeLinecap="round"
        className="motion-safe:animate-[curve-flow-1_14s_ease-in-out_infinite]"
        style={{ transformOrigin: '120px 600px' }}
      />
      {/* Curva fina próxima à borda esquerda */}
      <path
        d="M60,-60 C70,180 30,360 60,580 C90,800 40,960 70,1260"
        fill="none"
        stroke="rgba(244,132,95,0.30)"
        strokeWidth="0.9"
        strokeLinecap="round"
        className="motion-safe:animate-[curve-flow-2_18s_ease-in-out_infinite_reverse]"
        style={{ transformOrigin: '60px 600px' }}
      />
      {/* Curva externa, suave e larga */}
      <path
        d="M180,-50 C170,200 220,380 190,600 C160,820 210,1000 180,1260"
        fill="none"
        stroke="rgba(244,132,95,0.22)"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="motion-safe:animate-[curve-flow-3_22s_ease-in-out_infinite]"
        style={{ transformOrigin: '180px 600px' }}
      />
    </svg>
  </div>
);

export default WaveBackground;
