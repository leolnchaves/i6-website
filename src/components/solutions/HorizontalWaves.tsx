import { memo } from 'react';

const HorizontalWaves = memo(() => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-[500px] md:h-[600px] pointer-events-none z-[1] translate-y-[30%]">
      <svg
        viewBox="0 0 2800 500"
        preserveAspectRatio="none"
        className="w-[200%] h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1 - pequena, base (230-270) */}
        <path
          d="M0,250 C120,235 280,265 450,240 C620,230 750,268 950,245 C1150,235 1300,260 1450,242 C1600,270 1750,238 1900,255 C2050,265 2200,240 2400,250 C2550,260 2700,242 2800,250"
          fill="none"
          stroke="rgba(244,132,95,0.20)"
          strokeWidth="1.5"
          className="animate-[wave-slide-1_25s_linear_infinite]"
        />
        {/* Layer 2 - pequena, base (220-280) */}
        <path
          d="M0,250 C100,225 230,275 380,230 C530,220 680,278 830,240 C980,225 1100,270 1280,250 C1460,280 1550,222 1700,260 C1850,275 2000,230 2150,245 C2300,270 2500,228 2650,250 L2800,250"
          fill="none"
          stroke="rgba(244,132,95,0.22)"
          strokeWidth="1.5"
          className="animate-[wave-slide-2_22s_linear_infinite]"
        />
        {/* Layer 3 - media (180-320) */}
        <path
          d="M0,250 C150,190 300,310 480,200 C660,180 780,315 950,260 C1120,195 1250,310 1400,240 C1550,320 1680,185 1850,250 C2020,300 2150,195 2350,250 C2500,310 2650,200 2800,250"
          fill="none"
          stroke="rgba(244,132,95,0.12)"
          strokeWidth="2"
          className="animate-[wave-slide-3_20s_linear_infinite]"
        />
        {/* Layer 4 - media (160-340) */}
        <path
          d="M0,250 C80,175 200,330 350,170 C500,160 620,340 780,260 C940,175 1060,335 1200,250 C1340,165 1450,330 1600,250 C1750,340 1880,170 2050,250 C2220,325 2380,175 2550,250 C2680,330 2750,185 2800,250"
          fill="none"
          stroke="rgba(244,132,95,0.10)"
          strokeWidth="2"
          className="animate-[wave-slide-4_18s_linear_infinite]"
        />
        {/* Layer 5 - grande (80-400), picos ate titulo */}
        <path
          d="M0,250 C130,120 260,370 420,90 C580,80 700,390 870,250 C1040,110 1180,400 1330,250 C1480,100 1580,380 1730,250 C1880,390 2020,95 2180,250 C2340,380 2480,120 2650,250 L2800,250"
          fill="none"
          stroke="rgba(244,132,95,0.07)"
          strokeWidth="2.5"
          className="animate-[wave-slide-5_15s_linear_infinite]"
        />
        {/* Layer 6 - grande (50-420), picos maximos */}
        <path
          d="M0,250 C100,60 250,410 400,55 C550,50 680,420 850,250 C1020,70 1150,415 1320,250 C1490,55 1600,410 1770,250 C1940,420 2080,60 2250,250 C2420,400 2580,70 2700,250 L2800,250"
          fill="none"
          stroke="rgba(244,132,95,0.05)"
          strokeWidth="2.5"
          className="animate-[wave-slide-1_20s_linear_infinite]"
        />
        {/* Layer 7 - pequena compacta (210-290), forte */}
        <path
          d="M0,250 C150,215 300,285 470,218 C640,210 780,288 940,245 C1100,215 1230,285 1400,240 C1570,290 1700,212 1870,255 C2040,282 2180,218 2350,250 C2520,285 2670,220 2800,250"
          fill="none"
          stroke="rgba(244,132,95,0.30)"
          strokeWidth="3"
          className="animate-[wave-slide-3_17s_linear_infinite]"
        />
        {/* Layer 8 - media (150-350), sutil */}
        <path
          d="M0,250 C120,160 280,340 430,155 C580,150 720,345 900,250 C1080,165 1200,340 1380,250 C1560,350 1700,160 1880,250 C2060,335 2200,170 2400,250 C2580,340 2700,165 2800,250"
          fill="none"
          stroke="rgba(244,132,95,0.08)"
          strokeWidth="2"
          className="animate-[wave-slide-2_24s_linear_infinite]"
        />
      </svg>
    </div>
  );
});

HorizontalWaves.displayName = 'HorizontalWaves';

export default HorizontalWaves;
