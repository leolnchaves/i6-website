import { memo } from 'react';

const HorizontalWaves = memo(() => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-[100px] md:h-[120px] pointer-events-none z-0">
      <svg
        viewBox="0 0 1400 120"
        preserveAspectRatio="none"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Wave 1 - lowest opacity, slowest */}
        <path
          d="M0,70 C50,40 100,90 150,60 C200,30 250,85 300,55 C350,25 400,80 450,50 C500,20 550,75 600,45 C650,15 700,70 750,40 C800,10 850,65 900,35 C950,5 1000,60 1050,30 C1100,0 1150,55 1200,25 C1250,0 1300,50 1350,20 L1400,30 L1400,120 L0,120 Z"
          fill="rgba(244,132,95,0.08)"
          className="animate-[wave-horizontal-1_7s_ease-in-out_infinite]"
        />
        {/* Wave 2 */}
        <path
          d="M0,80 C60,50 120,95 180,65 C240,35 300,90 360,60 C420,30 480,85 540,55 C600,25 660,80 720,50 C780,20 840,75 900,45 C960,15 1020,70 1080,40 C1140,10 1200,65 1260,35 C1320,5 1380,55 1400,45 L1400,120 L0,120 Z"
          fill="rgba(244,132,95,0.14)"
          className="animate-[wave-horizontal-2_9s_ease-in-out_infinite]"
        />
        {/* Wave 3 - mid opacity */}
        <path
          d="M0,85 C45,55 90,100 135,70 C180,40 225,95 270,65 C315,35 360,90 405,60 C450,30 495,85 540,55 C585,25 630,80 675,50 C720,20 765,75 810,45 C855,15 900,70 945,40 C990,10 1035,65 1080,35 C1125,5 1170,60 1215,30 C1260,0 1305,55 1350,25 L1400,35 L1400,120 L0,120 Z"
          fill="rgba(244,132,95,0.20)"
          className="animate-[wave-horizontal-3_11s_ease-in-out_infinite]"
        />
        {/* Wave 4 */}
        <path
          d="M0,90 C55,65 110,105 165,75 C220,45 275,95 330,70 C385,40 440,90 495,65 C550,35 605,85 660,55 C715,25 770,80 825,50 C880,20 935,75 990,45 C1045,15 1100,70 1155,40 C1210,10 1265,65 1320,35 C1375,10 1400,50 1400,50 L1400,120 L0,120 Z"
          fill="rgba(244,132,95,0.28)"
          className="animate-[wave-horizontal-4_8s_ease-in-out_infinite]"
        />
        {/* Wave 5 - highest opacity, closest to bottom */}
        <path
          d="M0,95 C40,75 80,110 120,85 C160,60 200,100 240,80 C280,55 320,95 360,75 C400,50 440,90 480,70 C520,45 560,88 600,65 C640,42 680,85 720,60 C760,38 800,82 840,58 C880,35 920,78 960,55 C1000,32 1040,75 1080,52 C1120,30 1160,72 1200,48 C1240,28 1280,68 1320,45 C1360,25 1400,60 1400,60 L1400,120 L0,120 Z"
          fill="rgba(244,132,95,0.35)"
          className="animate-[wave-horizontal-1_6s_ease-in-out_infinite_reverse]"
        />
      </svg>
    </div>
  );
});

HorizontalWaves.displayName = 'HorizontalWaves';

export default HorizontalWaves;
