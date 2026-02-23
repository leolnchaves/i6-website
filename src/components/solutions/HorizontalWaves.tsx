import { memo } from 'react';

const HorizontalWaves = memo(() => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-[180px] md:h-[220px] pointer-events-none z-[1] translate-y-1/2">
      <svg
        viewBox="0 0 2800 200"
        preserveAspectRatio="none"
        className="w-[200%] h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1 - furthest, slowest, lowest opacity */}
        <path
          d="M0,120 C80,60 180,150 300,90 C420,30 500,140 650,100 C800,60 900,160 1050,80 C1200,20 1300,130 1400,110 C1500,60 1600,150 1750,90 C1900,30 2000,140 2150,100 C2300,60 2400,160 2550,80 C2700,20 2750,130 2800,110"
          fill="none"
          stroke="rgba(244,132,95,0.08)"
          strokeWidth="2"
          className="animate-[wave-slide-1_25s_linear_infinite]"
        />
        {/* Layer 2 */}
        <path
          d="M0,140 C120,70 250,160 400,110 C550,50 650,155 800,120 C950,70 1080,150 1200,95 C1320,40 1400,145 1550,105 C1700,55 1800,160 1950,110 C2100,50 2200,155 2350,120 C2500,70 2630,150 2750,95 L2800,100"
          fill="none"
          stroke="rgba(244,132,95,0.14)"
          strokeWidth="2.5"
          className="animate-[wave-slide-2_20s_linear_infinite]"
        />
        {/* Layer 3 - mid */}
        <path
          d="M0,100 C100,40 220,170 380,85 C540,15 620,130 780,95 C940,55 1050,165 1180,75 C1310,10 1400,125 1530,100 C1660,55 1780,170 1940,85 C2100,15 2180,130 2340,95 C2500,55 2610,165 2740,75 L2800,90"
          fill="none"
          stroke="rgba(244,132,95,0.22)"
          strokeWidth="2.5"
          className="animate-[wave-slide-3_18s_linear_infinite]"
        />
        {/* Layer 4 */}
        <path
          d="M0,130 C150,55 280,165 430,100 C580,35 700,150 850,115 C1000,65 1120,170 1280,90 C1400,40 1500,155 1650,110 C1800,55 1930,165 2080,100 C2230,35 2350,150 2500,115 C2650,65 2720,170 2800,90"
          fill="none"
          stroke="rgba(244,132,95,0.30)"
          strokeWidth="3"
          className="animate-[wave-slide-4_15s_linear_infinite]"
        />
        {/* Layer 5 - closest, fastest, highest opacity */}
        <path
          d="M0,150 C90,80 200,175 350,110 C500,45 600,160 750,125 C900,75 1020,180 1180,95 C1340,30 1400,140 1560,120 C1720,70 1850,175 2000,110 C2150,45 2250,160 2400,125 C2550,75 2670,180 2800,95"
          fill="none"
          stroke="rgba(244,132,95,0.40)"
          strokeWidth="3"
          className="animate-[wave-slide-5_22s_linear_infinite]"
        />
      </svg>
    </div>
  );
});

HorizontalWaves.displayName = 'HorizontalWaves';

export default HorizontalWaves;
