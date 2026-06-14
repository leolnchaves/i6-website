/**
 * Silk Streams — fluid, modern, soft flowing curves that suggest
 * "data + intelligence + movement". Multiple bezier paths span the
 * viewport; subtle shimmer travels along them, and luminous dots glide
 * the full length of each path.
 */
const PATHS = [
  'M-50,180 C 220,80 480,300 760,180 C 1040,60 1280,260 1500,160',
  'M-50,340 C 240,260 520,420 820,340 C 1100,260 1320,400 1500,320',
  'M-50,520 C 260,420 540,600 840,500 C 1120,400 1320,560 1500,460',
  'M-50,700 C 220,620 500,780 800,680 C 1080,580 1320,720 1500,640',
];

const MotionSilkStreams = () => (
  <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
    <style>{`
      @keyframes silk-shimmer {
        0% { stroke-dashoffset: 1800; opacity: 0; }
        15% { opacity: 0.6; }
        85% { opacity: 0.6; }
        100% { stroke-dashoffset: 0; opacity: 0; }
      }
      @keyframes silk-breathe {
        0%,100% { opacity: 0.10; }
        50% { opacity: 0.22; }
      }
    `}</style>
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="silk-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F4845F" stopOpacity="0" />
          <stop offset="20%" stopColor="#F4845F" stopOpacity="0.9" />
          <stop offset="80%" stopColor="#F4845F" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F4845F" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="silk-dot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F4845F" stopOpacity="1" />
          <stop offset="50%" stopColor="#F4845F" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#F4845F" stopOpacity="0" />
        </radialGradient>
        {PATHS.map((d, i) => (
          <path key={i} id={`silk-path-${i}`} d={d} />
        ))}
      </defs>

      {/* Base soft curves — always present, breathing slowly */}
      {PATHS.map((d, i) => (
        <path
          key={`base-${i}`}
          d={d}
          fill="none"
          stroke="url(#silk-grad)"
          strokeWidth={1.2}
          strokeLinecap="round"
          style={{ animation: `silk-breathe ${14 + i * 3}s ease-in-out ${i * 1.5}s infinite` }}
        />
      ))}

      {/* Light traces flowing along each curve */}
      {PATHS.map((d, i) => (
        <path
          key={`trace-${i}`}
          d={d}
          fill="none"
          stroke="#F4845F"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeDasharray="220 1800"
          style={{ animation: `silk-shimmer ${16 + i * 4}s linear ${i * 2}s infinite` }}
        />
      ))}

      {/* Glowing dots gliding along the paths */}
      {PATHS.map((_, i) => (
        <g key={`dot-${i}`}>
          <circle r={14} fill="url(#silk-dot)">
            <animateMotion dur={`${22 + i * 5}s`} repeatCount="indefinite" begin={`${i * 2.5}s`}>
              <mpath href={`#silk-path-${i}`} />
            </animateMotion>
          </circle>
          <circle r={2.2} fill="#F4845F">
            <animateMotion dur={`${22 + i * 5}s`} repeatCount="indefinite" begin={`${i * 2.5}s`}>
              <mpath href={`#silk-path-${i}`} />
            </animateMotion>
          </circle>
        </g>
      ))}
    </svg>
  </div>
);

export default MotionSilkStreams;
