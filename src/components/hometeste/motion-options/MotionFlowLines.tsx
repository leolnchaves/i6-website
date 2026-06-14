const LINES = [
  { top: '22%', dur: 18, delay: 0, dotDur: 9, dotDelay: 0 },
  { top: '38%', dur: 26, delay: 3, dotDur: 13, dotDelay: 2 },
  { top: '58%', dur: 22, delay: 1.5, dotDur: 11, dotDelay: 4 },
  { top: '76%', dur: 30, delay: 5, dotDur: 15, dotDelay: 1 },
];

const MotionFlowLines = () => (
  <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
    <style>{`
      @keyframes flow-dot { 0%{transform:translateX(-10vw);opacity:0;} 8%{opacity:1;} 92%{opacity:1;} 100%{transform:translateX(110vw);opacity:0;} }
      @keyframes flow-dot-2 { 0%{transform:translateX(-10vw);opacity:0;} 10%{opacity:1;} 90%{opacity:1;} 100%{transform:translateX(110vw);opacity:0;} }
      @keyframes line-shimmer { 0%,100%{opacity:.05;} 50%{opacity:.12;} }
    `}</style>
    {LINES.map((l, i) => (
      <div key={i} className="absolute left-0 right-0" style={{ top: l.top }}>
        {/* base line */}
        <div
          className="h-px w-full"
          style={{
            background: 'linear-gradient(to right, transparent 0%, rgba(244,132,95,0.5) 20%, rgba(244,132,95,0.5) 80%, transparent 100%)',
            animation: `line-shimmer ${l.dur}s ease-in-out ${l.delay}s infinite`,
          }}
        />
        {/* travelling dot with trailing glow */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-0"
          style={{ animation: `${i % 2 ? 'flow-dot-2' : 'flow-dot'} ${l.dotDur}s linear ${l.dotDelay}s infinite` }}
        >
          <div className="relative">
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 h-px"
              style={{
                width: '120px',
                background: 'linear-gradient(to left, rgba(244,132,95,0.9), rgba(244,132,95,0))',
              }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full bg-[#F4845F]"
              style={{ boxShadow: '0 0 12px rgba(244,132,95,0.9), 0 0 24px rgba(244,132,95,0.5)' }}
            />
          </div>
        </div>
        {/* second dot offset */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-0"
          style={{ animation: `${i % 2 ? 'flow-dot' : 'flow-dot-2'} ${l.dotDur * 1.4}s linear ${l.dotDelay + 3}s infinite` }}
        >
          <div className="relative">
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 h-px"
              style={{
                width: '80px',
                background: 'linear-gradient(to left, rgba(244,132,95,0.6), rgba(244,132,95,0))',
              }}
            />
            <div
              className="w-1 h-1 rounded-full bg-[#F4845F]"
              style={{ boxShadow: '0 0 8px rgba(244,132,95,0.8)' }}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default MotionFlowLines;
