import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { NAVY, NAVY_DEEP, NAVY_SOFT, CORAL } from '../theme';

/** Faixa de "ondas" laterais coral, presente no site. */
const Wave: React.FC<{ side: 'left' | 'right'; frame: number; total: number }> = ({
  side,
  frame,
  total,
}) => {
  const drift = Math.sin((frame / total) * Math.PI * 2 + (side === 'left' ? 0 : 1.7)) * 26;
  const paths = [0, 1, 2, 3, 4];
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        [side]: 0,
        width: 420,
        transform: `translateY(${drift}px)`,
        opacity: 0.5,
      }}
    >
      <svg width="420" height="1080" viewBox="0 0 420 1080" preserveAspectRatio="none">
        {paths.map((i) => {
          const off = i * 46;
          const amp = 60 + i * 12;
          const phase = frame / 55 + i * 0.7;
          const x = (t: number) =>
            (side === 'left' ? off : 420 - off) +
            (side === 'left' ? 1 : -1) * Math.sin(t * 3.1 + phase) * amp;
          const pts = Array.from({ length: 13 }, (_, k) => {
            const t = k / 12;
            return `${x(t).toFixed(1)},${(t * 1080).toFixed(1)}`;
          });
          return (
            <polyline
              key={i}
              points={pts.join(' ')}
              fill="none"
              stroke={CORAL}
              strokeWidth={1.6}
              strokeOpacity={0.42 - i * 0.055}
            />
          );
        })}
      </svg>
    </div>
  );
};

export const Backdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const glow = interpolate(Math.sin(frame / 90), [-1, 1], [0.35, 0.6]);

  return (
    <AbsoluteFill style={{ backgroundColor: NAVY }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 90% at 20% 0%, ${NAVY_SOFT} 0%, ${NAVY} 45%, ${NAVY_DEEP} 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(45% 40% at ${50 + Math.sin(frame / 130) * 12}% ${
            30 + Math.cos(frame / 160) * 10
          }%, rgba(244,132,95,${(0.12 * glow).toFixed(3)}) 0%, rgba(244,132,95,0) 70%)`,
        }}
      />
      <Wave side="left" frame={frame} total={durationInFrames} />
      <Wave side="right" frame={frame} total={durationInFrames} />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(7,12,24,0.55) 0%, rgba(7,12,24,0) 22%, rgba(7,12,24,0) 78%, rgba(7,12,24,0.6) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
