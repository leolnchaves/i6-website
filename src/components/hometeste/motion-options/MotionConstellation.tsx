const NODES: Array<[number, number, number, number]> = [
  // x, y, r, delay(s)
  [10, 18, 1.6, 0], [22, 38, 2.2, 1.2], [16, 70, 1.4, 2.5],
  [34, 22, 1.8, 3.1], [40, 55, 2.4, 0.7], [30, 84, 1.6, 4.0],
  [55, 14, 1.4, 1.8], [62, 44, 2.0, 2.2], [50, 76, 1.8, 3.6],
  [74, 28, 2.2, 0.4], [80, 60, 1.5, 1.5], [70, 88, 1.8, 2.8],
  [88, 36, 1.6, 3.9], [92, 72, 2.0, 1.0], [46, 32, 1.3, 4.5],
];

// Pairs of node indices to connect
const EDGES: Array<[number, number, number]> = [
  // a, b, dur(s)
  [0, 1, 14], [1, 3, 18], [1, 4, 16], [2, 5, 20], [3, 6, 17],
  [4, 7, 15], [5, 8, 19], [6, 9, 13], [7, 10, 16], [8, 11, 18],
  [9, 12, 14], [10, 13, 17], [11, 13, 20], [4, 14, 15], [7, 14, 19],
];

const MotionConstellation = () => (
  <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
    <style>{`
      @keyframes node-pulse { 0%,100%{opacity:.35;} 50%{opacity:.9;} }
      @keyframes line-trace { 0%{stroke-dashoffset:240;opacity:0;} 20%{opacity:.55;} 80%{opacity:.55;} 100%{stroke-dashoffset:0;opacity:0;} }
    `}</style>
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      {EDGES.map(([a, b, dur], i) => {
        const [x1, y1] = NODES[a];
        const [x2, y2] = NODES[b];
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#F4845F"
            strokeWidth={0.08}
            strokeLinecap="round"
            style={{
              strokeDasharray: 240,
              animation: `line-trace ${dur}s ease-in-out ${i * 0.7}s infinite`,
            }}
          />
        );
      })}
      {EDGES.map(([a, b], i) => {
        const [x1, y1] = NODES[a];
        const [x2, y2] = NODES[b];
        return (
          <line
            key={`base-${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(244,132,95,0.08)"
            strokeWidth={0.05}
          />
        );
      })}
      {NODES.map(([x, y, r, delay], i) => (
        <circle
          key={i}
          cx={x} cy={y} r={r * 0.18}
          fill="#F4845F"
          style={{ animation: `node-pulse ${6 + (i % 4)}s ease-in-out ${delay}s infinite` }}
        />
      ))}
    </svg>
  </div>
);

export default MotionConstellation;
