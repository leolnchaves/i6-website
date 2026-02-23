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
        {/* Layer 1 - top zone, invades title area */}
        <path
          d="M0,80 C120,50 280,110 450,70 C620,30 750,100 950,85 C1150,65 1300,40 1450,90 C1600,120 1750,55 1900,75 C2050,95 2200,45 2400,80 C2550,105 2700,60 2800,70"
          fill="none"
          stroke="rgba(244,132,95,0.04)"
          strokeWidth="1.5"
          className="animate-[wave-slide-1_25s_linear_infinite]"
        />
        {/* Layer 2 - upper zone, invades title */}
        <path
          d="M0,130 C100,95 230,160 380,120 C530,80 680,150 830,110 C980,70 1100,145 1280,130 C1460,115 1550,75 1700,140 C1850,170 2000,90 2150,125 C2300,155 2500,85 2650,120 L2800,110"
          fill="none"
          stroke="rgba(244,132,95,0.06)"
          strokeWidth="1.5"
          className="animate-[wave-slide-2_22s_linear_infinite]"
        />
        {/* Layer 3 - between title and center */}
        <path
          d="M0,185 C150,140 300,220 480,170 C660,120 780,210 950,190 C1120,165 1250,130 1400,200 C1550,240 1680,155 1850,180 C2020,210 2150,140 2350,195 C2500,230 2650,160 2800,175"
          fill="none"
          stroke="rgba(244,132,95,0.08)"
          strokeWidth="2"
          className="animate-[wave-slide-3_20s_linear_infinite]"
        />
        {/* Layer 4 - center, main focus */}
        <path
          d="M0,240 C80,180 200,290 350,230 C500,170 620,280 780,250 C940,215 1060,300 1200,235 C1340,175 1450,270 1600,260 C1750,245 1880,180 2050,250 C2220,310 2380,200 2550,240 C2680,270 2750,210 2800,230"
          fill="none"
          stroke="rgba(244,132,95,0.14)"
          strokeWidth="2.5"
          className="animate-[wave-slide-4_18s_linear_infinite]"
        />
        {/* Layer 5 - center, strong */}
        <path
          d="M0,290 C130,230 260,340 420,280 C580,220 700,330 870,300 C1040,265 1180,350 1330,275 C1480,210 1580,320 1730,290 C1880,260 2020,340 2180,285 C2340,230 2480,310 2650,290 L2800,280"
          fill="none"
          stroke="rgba(244,132,95,0.22)"
          strokeWidth="2.5"
          className="animate-[wave-slide-5_15s_linear_infinite]"
        />
        {/* Layer 6 - center-low, strong */}
        <path
          d="M0,340 C100,290 250,380 400,330 C550,280 680,370 850,345 C1020,315 1150,390 1320,340 C1490,290 1600,365 1770,350 C1940,330 2080,280 2250,345 C2420,400 2580,310 2700,340 L2800,330"
          fill="none"
          stroke="rgba(244,132,95,0.30)"
          strokeWidth="3"
          className="animate-[wave-slide-1_20s_linear_infinite]"
        />
        {/* Layer 7 - invades metrics, strong */}
        <path
          d="M0,390 C150,340 300,420 470,380 C640,340 780,410 940,395 C1100,375 1230,430 1400,385 C1570,345 1700,415 1870,400 C2040,380 2180,340 2350,395 C2520,440 2670,370 2800,385"
          fill="none"
          stroke="rgba(244,132,95,0.35)"
          strokeWidth="3"
          className="animate-[wave-slide-3_17s_linear_infinite]"
        />
        {/* Layer 8 - bottom, invades metrics subtly */}
        <path
          d="M0,440 C120,410 280,460 430,430 C580,400 720,455 900,440 C1080,420 1200,460 1380,435 C1560,410 1700,450 1880,440 C2060,425 2200,455 2400,435 C2580,415 2700,450 2800,440"
          fill="none"
          stroke="rgba(244,132,95,0.10)"
          strokeWidth="2"
          className="animate-[wave-slide-2_24s_linear_infinite]"
        />
      </svg>
    </div>
  );
});

HorizontalWaves.displayName = 'HorizontalWaves';

export default HorizontalWaves;
