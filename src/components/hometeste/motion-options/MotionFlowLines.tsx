/**
 * Flow Lines v2 — fluid, modern, smooth.
 * Curved bezier paths (not straight) with glowing dots gliding along
 * them; long luminous trails fade behind. Easing is gentle and the
 * paths breathe softly between cycles.
 */
const PATHS = [
  { d: 'M-100,210 C 320,140 700,320 1080,220 C 1320,160 1440,200 1600,180', dur: 18, delay: 0 },
  { d: 'M-100,420 C 280,360 620,500 1000,400 C 1280,330 1440,420 1600,380', dur: 26, delay: 4 },
  { d: 'M-100,620 C 360,540 700,720 1060,620 C 1320,550 1440,620 1600,580', dur: 22, delay: 2 },
  { d: 'M-100,800 C 300,720 660,860 1040,780 C 1320,720 1440,780 1600,760', dur: 30, delay: 6 },
];

const MotionFlowLines = () => (
  <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
    <style>{`
      @keyframes flow-breathe {
        0%,100% { opacity: 0.10; }
        50% { opacity: 0.20; }
      }
    `}</style>
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="flow-base" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F4845F" stopOpacity="0" />
          <stop offset="25%" stopColor="#F4845F" stopOpacity="0.7" />
          <stop offset="75%" stopColor="#F4845F" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#F4845F" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="flow-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F4845F" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#F4845F" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#F4845F" stopOpacity="0" />
        </radialGradient>
        {PATHS.map((p, i) => (
          <path key={i} id={`flow-path-${i}`} d={p.d} />
        ))}
      </defs>

      {/* Soft base curves */}
      {PATHS.map((p, i) => (
        <path
          key={`base-${i}`}
          d={p.d}
          fill="none"
          stroke="url(#flow-base)"
          strokeWidth={1}
          strokeLinecap="round"
          style={{ animation: `flow-breathe ${14 + i * 2}s ease-in-out ${i * 1.5}s infinite` }}
        />
      ))}

      {/* Glowing comet on each path: halo + bright core */}
      {PATHS.map((p, i) => (
        <g key={`comet-${i}`}>
          <circle r={28} fill="url(#flow-halo)" opacity={0.9}>
            <animateMotion
              dur={`${p.dur}s`}
              repeatCount="indefinite"
              begin={`${p.delay}s`}
              calcMode="spline"
              keyTimes="0;1"
              keySplines="0.42 0 0.58 1"
            >
              <mpath href={`#flow-path-${i}`} />
            </animateMotion>
          </circle>
          <circle r={2.6} fill="#F4845F">
            <animateMotion
              dur={`${p.dur}s`}
              repeatCount="indefinite"
              begin={`${p.delay}s`}
              calcMode="spline"
              keyTimes="0;1"
              keySplines="0.42 0 0.58 1"
            >
              <mpath href={`#flow-path-${i}`} />
            </animateMotion>
          </circle>
        </g>
      ))}

      {/* Second, slower comet offset on each path for layered movement */}
      {PATHS.map((p, i) => (
        <g key={`comet2-${i}`}>
          <circle r={18} fill="url(#flow-halo)" opacity={0.6}>
            <animateMotion
              dur={`${p.dur * 1.5}s`}
              repeatCount="indefinite"
              begin={`${p.delay + 5}s`}
              calcMode="spline"
              keyTimes="0;1"
              keySplines="0.42 0 0.58 1"
            >
              <mpath href={`#flow-path-${i}`} />
            </animateMotion>
          </circle>
          <circle r={1.8} fill="#F4845F">
            <animateMotion
              dur={`${p.dur * 1.5}s`}
              repeatCount="indefinite"
              begin={`${p.delay + 5}s`}
              calcMode="spline"
              keyTimes="0;1"
              keySplines="0.42 0 0.58 1"
            >
              <mpath href={`#flow-path-${i}`} />
            </animateMotion>
          </circle>
        </g>
      ))}
    </svg>
  </div>
);

export default MotionFlowLines;
