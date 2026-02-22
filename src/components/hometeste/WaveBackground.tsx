const WaveBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 800 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Curva 1 - larga, suave */}
      <path
        d="M120,900 C120,750 60,650 80,500 C100,350 180,300 160,150 C150,50 130,-20 120,-50"
        fill="none"
        stroke="rgba(255,160,120,0.35)"
        strokeWidth="2"
        className="motion-safe:animate-[curve-flow-1_12s_ease-in-out_infinite]"
        style={{ transformOrigin: '120px 450px' }}
      />
      {/* Curva 2 */}
      <path
        d="M160,920 C155,780 100,680 130,520 C160,360 220,280 200,120 C190,30 170,-30 160,-60"
        fill="none"
        stroke="rgba(255,200,165,0.28)"
        strokeWidth="1.5"
        className="motion-safe:animate-[curve-flow-2_16s_ease-in-out_infinite]"
        style={{ transformOrigin: '160px 450px' }}
      />
      {/* Curva 3 */}
      <path
        d="M90,910 C95,760 40,660 70,490 C100,320 150,260 130,100 C120,10 100,-40 90,-70"
        fill="none"
        stroke="rgba(255,150,110,0.45)"
        strokeWidth="0.8"
        className="motion-safe:animate-[curve-flow-3_10s_ease-in-out_infinite]"
        style={{ transformOrigin: '90px 450px' }}
      />
      {/* Curva 4 */}
      <path
        d="M200,930 C195,790 150,700 180,540 C210,380 260,300 240,140 C230,50 210,-20 200,-50"
        fill="none"
        stroke="rgba(255,185,145,0.22)"
        strokeWidth="1.8"
        className="motion-safe:animate-[curve-flow-4_18s_ease-in-out_infinite]"
        style={{ transformOrigin: '200px 450px' }}
      />
      {/* Curva 5 */}
      <path
        d="M140,915 C138,770 80,670 110,510 C140,350 200,290 180,130 C170,40 150,-30 140,-60"
        fill="none"
        stroke="rgba(255,140,100,0.30)"
        strokeWidth="1.2"
        className="motion-safe:animate-[curve-flow-1_20s_ease-in-out_infinite_reverse]"
        style={{ transformOrigin: '140px 450px' }}
      />
      {/* Curva 6 */}
      <path
        d="M60,905 C65,750 20,640 50,480 C80,320 130,250 110,90 C100,0 80,-50 60,-80"
        fill="none"
        stroke="rgba(255,215,190,0.32)"
        strokeWidth="0.6"
        className="motion-safe:animate-[curve-flow-2_14s_ease-in-out_infinite_reverse]"
        style={{ transformOrigin: '60px 450px' }}
      />
      {/* Curva 7 */}
      <path
        d="M230,925 C225,780 180,690 210,530 C240,370 290,310 270,150 C260,60 240,-10 230,-40"
        fill="none"
        stroke="rgba(255,170,130,0.25)"
        strokeWidth="1"
        className="motion-safe:animate-[curve-flow-3_15s_ease-in-out_infinite]"
        style={{ transformOrigin: '230px 450px' }}
      />
      {/* Curva 8 - mais fina, accent */}
      <path
        d="M180,940 C175,800 130,710 160,550 C190,390 240,320 220,160 C210,70 190,-10 180,-40"
        fill="none"
        stroke="rgba(255,190,155,0.28)"
        strokeWidth="0.5"
        className="motion-safe:animate-[curve-flow-4_11s_ease-in-out_infinite_reverse]"
        style={{ transformOrigin: '180px 450px' }}
      />
      {/* Curva 9 */}
      <path
        d="M100,895 C105,740 50,640 80,470 C110,300 160,230 140,70 C130,-20 110,-60 100,-90"
        fill="none"
        stroke="rgba(255,155,115,0.50)"
        strokeWidth="0.7"
        className="motion-safe:animate-[curve-flow-1_17s_ease-in-out_infinite]"
        style={{ transformOrigin: '100px 450px' }}
      />
      {/* Curva 10 */}
      <path
        d="M250,935 C245,790 200,700 230,540 C260,380 310,310 290,150 C280,60 260,-10 250,-40"
        fill="none"
        stroke="rgba(255,210,180,0.20)"
        strokeWidth="1.4"
        className="motion-safe:animate-[curve-flow-2_22s_ease-in-out_infinite]"
        style={{ transformOrigin: '250px 450px' }}
      />
    </svg>
  </div>
);

export default WaveBackground;
