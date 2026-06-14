const FADE_MASK_LEFT = 'linear-gradient(to right, black 35%, transparent 100%)';

// Higher frequency wavy paths — more oscillations along Y axis.
// viewBox height 1200 split into ~8 oscillations per curve.
const Curves = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    viewBox="0 0 280 1200"
    preserveAspectRatio="none"
  >
    {/* Curva 1 — interna, fina, alta frequência */}
    <path
      d="M20,-60 C70,0 -20,80 30,160 C80,240 -10,320 40,400 C90,480 0,560 50,640 C100,720 10,800 60,880 C110,960 20,1040 70,1120 C120,1200 30,1260 80,1320"
      fill="none"
      stroke="rgba(244,132,95,0.28)"
      strokeWidth="1.6"
      strokeLinecap="round"
      className="motion-safe:animate-[curve-flow-2_14s_ease-in-out_infinite_reverse]"
      style={{ transformOrigin: '40px 600px' }}
    />
    {/* Curva 2 */}
    <path
      d="M50,-50 C110,40 0,120 60,200 C120,280 10,360 70,440 C130,520 20,600 80,680 C140,760 30,840 90,920 C150,1000 40,1080 100,1160 C160,1240 50,1280 110,1320"
      fill="none"
      stroke="rgba(244,132,95,0.38)"
      strokeWidth="2"
      strokeLinecap="round"
      className="motion-safe:animate-[curve-flow-1_11s_ease-in-out_infinite]"
      style={{ transformOrigin: '70px 600px' }}
    />
    {/* Curva 3 — principal, mais espessa */}
    <path
      d="M90,-40 C160,60 30,150 100,250 C170,350 40,440 110,540 C180,640 50,730 120,830 C190,930 60,1020 130,1120 C200,1220 70,1280 140,1340"
      fill="none"
      stroke="rgba(244,132,95,0.5)"
      strokeWidth="2.6"
      strokeLinecap="round"
      className="motion-safe:animate-[curve-flow-3_12s_ease-in-out_infinite]"
      style={{ transformOrigin: '110px 600px' }}
    />
    {/* Curva 4 */}
    <path
      d="M140,-50 C210,50 80,140 150,240 C220,340 90,430 160,530 C230,630 100,720 170,820 C240,920 110,1010 180,1110 C250,1210 120,1280 190,1340"
      fill="none"
      stroke="rgba(244,132,95,0.34)"
      strokeWidth="2"
      strokeLinecap="round"
      className="motion-safe:animate-[curve-flow-1_15s_ease-in-out_infinite_reverse]"
      style={{ transformOrigin: '160px 600px' }}
    />
    {/* Curva 5 — externa, suave */}
    <path
      d="M190,-60 C260,40 130,130 200,230 C270,330 140,420 210,520 C280,620 150,710 220,810 C290,910 160,1000 230,1100 C300,1200 170,1270 240,1340"
      fill="none"
      stroke="rgba(244,132,95,0.22)"
      strokeWidth="1.6"
      strokeLinecap="round"
      className="motion-safe:animate-[curve-flow-2_13s_ease-in-out_infinite]"
      style={{ transformOrigin: '210px 600px' }}
    />
  </svg>
);

const WaveBackground = () => (
  <div
    aria-hidden="true"
    className="absolute left-0 top-0 h-full w-[260px] md:w-[340px] lg:w-[400px] pointer-events-none overflow-hidden z-[1]"
    style={{ maskImage: FADE_MASK_LEFT, WebkitMaskImage: FADE_MASK_LEFT }}
  >
    <Curves />
  </div>
);

export default WaveBackground;
