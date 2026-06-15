// Option C — Ascending Streams: thin bezier curves rising from base, with light dots traveling up
const STREAMS = [
  { id: 's1', d: 'M 40 900 C 80 700, 20 500, 70 320 S 100 80, 60 -40', dur: 9, delay: 0 },
  { id: 's2', d: 'M 120 920 C 90 720, 160 540, 110 360 S 80 120, 130 -20', dur: 12, delay: 2 },
  { id: 's3', d: 'M 200 940 C 240 740, 180 540, 220 340 S 240 120, 200 -30', dur: 10, delay: 4 },
  { id: 's4', d: 'M 280 920 C 260 720, 320 520, 280 320 S 260 100, 300 -20', dur: 13, delay: 1 },
];

const MotionAscendingStreams = () => (
  <div
    className="absolute inset-0 pointer-events-none overflow-hidden"
    style={{
      maskImage:
        'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 60%)',
      WebkitMaskImage:
        'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 60%)',
    }}
    aria-hidden
  >
    <style>{`
      @keyframes stream-shimmer {
        0%, 100% { stroke-opacity: 0.18; }
        50%      { stroke-opacity: 0.4; }
      }
    `}</style>
    <svg
      viewBox="0 0 360 900"
      preserveAspectRatio="xMinYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="stream-line" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#F4845F" stopOpacity="0" />
          <stop offset="40%" stopColor="#F4845F" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#F4845F" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="stream-dot-halo">
          <stop offset="0%" stopColor="#F4845F" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#F4845F" stopOpacity="0" />
        </radialGradient>
        {STREAMS.map((s) => (
          <path key={`p-${s.id}`} id={s.id} d={s.d} />
        ))}
      </defs>

      {/* Base curves */}
      {STREAMS.map((s, i) => (
        <use
          key={`u-${s.id}`}
          href={`#${s.id}`}
          stroke="url(#stream-line)"
          strokeWidth="1"
          fill="none"
          style={{
            animation: `stream-shimmer ${s.dur * 1.5}s ease-in-out ${i * 0.7}s infinite`,
          }}
        />
      ))}

      {/* Travelling halos */}
      {STREAMS.map((s) => (
        <circle key={`h-${s.id}`} r="14" fill="url(#stream-dot-halo)">
          <animateMotion
            dur={`${s.dur * 1.6}s`}
            repeatCount="indefinite"
            begin={`${s.delay}s`}
            rotate="auto"
            keyPoints="1;0"
            keyTimes="0;1"
            calcMode="spline"
            keySplines="0.42 0 0.58 1"
          >
            <mpath href={`#${s.id}`} />
          </animateMotion>
        </circle>
      ))}

      {/* Travelling cores */}
      {STREAMS.map((s) => (
        <circle key={`c-${s.id}`} r="2.2" fill="#FFD9C7">
          <animateMotion
            dur={`${s.dur * 1.6}s`}
            repeatCount="indefinite"
            begin={`${s.delay}s`}
            keyPoints="1;0"
            keyTimes="0;1"
            calcMode="spline"
            keySplines="0.42 0 0.58 1"
          >
            <mpath href={`#${s.id}`} />
          </animateMotion>
        </circle>
      ))}
    </svg>
  </div>
);

export default MotionAscendingStreams;
