const FADE_MASK_LEFT = 'linear-gradient(to right, black 35%, transparent 100%)';

// Linhas compactadas (próximas entre si) com frequências variadas
// para um movimento fluido, elegante e suave.
const Curves = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    viewBox="0 0 180 1200"
    preserveAspectRatio="none"
  >
    {/* Curva 1 — baixa frequência, suave e ampla */}
    <path
      d="M14,-60 C44,200 -10,500 30,800 C60,1020 18,1180 36,1320"
      fill="none"
      stroke="rgba(244,132,95,0.26)"
      strokeWidth="1.6"
      strokeLinecap="round"
      className="motion-safe:animate-[curve-flow-2_16s_ease-in-out_infinite_reverse]"
      style={{ transformOrigin: '20px 600px' }}
    />
    {/* Curva 2 — média-baixa frequência */}
    <path
      d="M30,-50 C70,180 10,420 60,640 C100,820 30,1020 70,1280"
      fill="none"
      stroke="rgba(244,132,95,0.34)"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="motion-safe:animate-[curve-flow-1_13s_ease-in-out_infinite]"
      style={{ transformOrigin: '40px 600px' }}
    />
    {/* Curva 3 — principal, média frequência, mais espessa */}
    <path
      d="M52,-40 C100,140 20,320 80,500 C140,680 30,860 90,1040 C150,1220 50,1300 100,1340"
      fill="none"
      stroke="rgba(244,132,95,0.5)"
      strokeWidth="2.4"
      strokeLinecap="round"
      className="motion-safe:animate-[curve-flow-3_14s_ease-in-out_infinite]"
      style={{ transformOrigin: '60px 600px' }}
    />
    {/* Curva 4 — frequência média, paralela à principal */}
    <path
      d="M72,-50 C120,150 40,340 100,520 C160,700 50,880 110,1060 C170,1240 70,1310 120,1340"
      fill="none"
      stroke="rgba(244,132,95,0.38)"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="motion-safe:animate-[curve-flow-1_17s_ease-in-out_infinite_reverse]"
      style={{ transformOrigin: '80px 600px' }}
    />
  </svg>
);

const WaveBackground = () => (
  <div
    aria-hidden="true"
    className="absolute left-0 top-0 h-full w-[200px] md:w-[260px] lg:w-[300px] pointer-events-none overflow-hidden z-[1]"
    style={{ maskImage: FADE_MASK_LEFT, WebkitMaskImage: FADE_MASK_LEFT }}
  >
    <Curves />
  </div>
);

export default WaveBackground;
