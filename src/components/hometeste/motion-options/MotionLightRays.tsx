// Option C — Light Rays & Neural Circuit
// Coral light rays beaming from top-left diagonally, connecting to a soft
// circuit/neural network of nodes pulsing on the left third.
const MotionLightRays = () => (
  <div
    className="absolute inset-0 pointer-events-none overflow-hidden"
    style={{
      maskImage:
        'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)',
      WebkitMaskImage:
        'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)',
    }}
    aria-hidden
  >
    <style>{`
      @keyframes ray-sweep {
        0%, 100% { opacity: 0.55; transform: rotate(0deg) scaleY(1); }
        50%      { opacity: 0.95; transform: rotate(2deg) scaleY(1.05); }
      }
      @keyframes ray-sweep-2 {
        0%, 100% { opacity: 0.35; transform: rotate(0deg); }
        50%      { opacity: 0.8;  transform: rotate(-1.5deg); }
      }
      @keyframes node-pulse {
        0%, 100% { opacity: 0.35; r: 2.2; }
        50%      { opacity: 1;    r: 3.6; }
      }
      @keyframes line-flow {
        0%   { stroke-dashoffset: 240; opacity: 0.2; }
        50%  { opacity: 0.9; }
        100% { stroke-dashoffset: 0; opacity: 0.2; }
      }
      @keyframes core-breathe {
        0%, 100% { opacity: 0.6; transform: scale(1); }
        50%      { opacity: 1;   transform: scale(1.08); }
      }
    `}</style>

    {/* Top-left diagonal light rays */}
    <div
      className="absolute"
      style={{
        top: '-20%',
        left: '-10%',
        width: '70%',
        height: '90%',
        background:
          'conic-gradient(from 130deg at 10% 10%, transparent 0deg, rgba(244,132,95,0.0) 18deg, rgba(244,132,95,0.55) 24deg, rgba(255,180,140,0.15) 30deg, transparent 40deg)',
        filter: 'blur(18px)',
        transformOrigin: '10% 10%',
        animation: 'ray-sweep 9s ease-in-out infinite',
      }}
    />
    <div
      className="absolute"
      style={{
        top: '-25%',
        left: '-15%',
        width: '85%',
        height: '95%',
        background:
          'conic-gradient(from 125deg at 8% 8%, transparent 0deg, rgba(244,132,95,0.0) 22deg, rgba(255,160,120,0.4) 28deg, transparent 45deg)',
        filter: 'blur(40px)',
        transformOrigin: '8% 8%',
        animation: 'ray-sweep-2 13s ease-in-out infinite',
      }}
    />

    {/* Hot core glow at top-left */}
    <div
      className="absolute"
      style={{
        top: '-8%',
        left: '-6%',
        width: '24vw',
        height: '24vw',
        background:
          'radial-gradient(circle at center, rgba(255,200,160,0.85) 0%, rgba(244,132,95,0.5) 25%, rgba(244,132,95,0.12) 50%, transparent 75%)',
        filter: 'blur(20px)',
        animation: 'core-breathe 6s ease-in-out infinite',
      }}
    />

    {/* Neural circuit on left third */}
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 600 1000"
      preserveAspectRatio="xMinYMid slice"
    >
      <defs>
        <linearGradient id="lr-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(244,132,95,0)" />
          <stop offset="50%" stopColor="rgba(244,132,95,0.9)" />
          <stop offset="100%" stopColor="rgba(244,132,95,0)" />
        </linearGradient>
      </defs>

      {/* Connecting lines (circuit-like, soft curves) */}
      {[
        { d: 'M 40 120 Q 180 200 320 260', dur: '7s', delay: '0s' },
        { d: 'M 60 320 Q 200 360 360 420', dur: '9s', delay: '-2s' },
        { d: 'M 30 540 Q 200 560 380 600', dur: '8s', delay: '-4s' },
        { d: 'M 80 720 Q 220 740 360 800', dur: '10s', delay: '-1s' },
        { d: 'M 320 260 Q 280 380 360 420', dur: '11s', delay: '-3s' },
        { d: 'M 360 420 Q 320 500 380 600', dur: '9s', delay: '-5s' },
        { d: 'M 380 600 Q 360 700 360 800', dur: '8s', delay: '-2s' },
      ].map((p, i) => (
        <path
          key={i}
          d={p.d}
          stroke="url(#lr-line)"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="120 240"
          style={{ animation: `line-flow ${p.dur} linear infinite`, animationDelay: p.delay }}
        />
      ))}

      {/* Nodes */}
      {[
        { cx: 40, cy: 120, d: '0s' },
        { cx: 320, cy: 260, d: '-1s' },
        { cx: 60, cy: 320, d: '-2s' },
        { cx: 360, cy: 420, d: '-0.5s' },
        { cx: 30, cy: 540, d: '-3s' },
        { cx: 380, cy: 600, d: '-1.8s' },
        { cx: 80, cy: 720, d: '-2.4s' },
        { cx: 360, cy: 800, d: '-0.9s' },
      ].map((n, i) => (
        <g key={i}>
          <circle
            cx={n.cx}
            cy={n.cy}
            r="8"
            fill="rgba(244,132,95,0.18)"
            style={{ animation: `node-pulse 4s ease-in-out infinite`, animationDelay: n.d }}
          />
          <circle
            cx={n.cx}
            cy={n.cy}
            r="2.6"
            fill="rgba(255,200,170,0.95)"
            style={{ animation: `node-pulse 4s ease-in-out infinite`, animationDelay: n.d }}
          />
        </g>
      ))}
    </svg>
  </div>
);

export default MotionLightRays;
