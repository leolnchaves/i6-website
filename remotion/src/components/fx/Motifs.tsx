import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { CORAL } from '../../theme';

/**
 * Fio condutor: uma linha coral que atravessa a tela e uma grade de pontos
 * que se desenha e apaga. Motivo recorrente, sempre discreto.
 */
export const SignalThread: React.FC<{ variant?: number }> = ({ variant = 0 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = interpolate(frame, [0, durationInFrames], [0, 1], { extrapolateRight: 'clamp' });

  const yBase = [0.24, 0.68, 0.42, 0.8, 0.32][variant % 5];
  const amp = 26 + (variant % 3) * 12;
  const pts = Array.from({ length: 40 }, (_, i) => {
    const t = i / 39;
    const x = t * 1920;
    const y =
      yBase * 1080 +
      Math.sin(t * 5.2 + frame / 46 + variant) * amp +
      Math.sin(t * 11 + frame / 26) * (amp * 0.25);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const dash = 2600;
  const draw = interpolate(frame, [10, 90], [dash, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fade = interpolate(p, [0, 0.12, 0.85, 1], [0, 1, 1, 0]);

  // pulso que corre pela linha
  const headT = (frame % 150) / 150;
  const headX = headT * 1920;
  const headY =
    yBase * 1080 +
    Math.sin(headT * 5.2 + frame / 46 + variant) * amp +
    Math.sin(headT * 11 + frame / 26) * (amp * 0.25);

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', opacity: fade }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <defs>
          <linearGradient id={`sig-${variant}`} x1="0" x2="1">
            <stop offset="0%" stopColor={CORAL} stopOpacity="0" />
            <stop offset="35%" stopColor={CORAL} stopOpacity="0.35" />
            <stop offset="100%" stopColor={CORAL} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          points={pts}
          fill="none"
          stroke={`url(#sig-${variant})`}
          strokeWidth={1.6}
          strokeDasharray={dash}
          strokeDashoffset={draw}
        />
        <circle cx={headX} cy={headY} r={4} fill={CORAL} opacity={0.55} />
        <circle cx={headX} cy={headY} r={12} fill={CORAL} opacity={0.12} />
      </svg>
    </AbsoluteFill>
  );
};

/** Grade de pontos que se desenha e apaga por blocos. */
export const DotGrid: React.FC<{ opacity?: number }> = ({ opacity = 0.16 }) => {
  const frame = useCurrentFrame();
  const cols = 24;
  const rows = 14;
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => {
            const phase = (r * cols + c) * 0.06;
            const a = 0.5 + 0.5 * Math.sin(frame / 34 - phase);
            return (
              <circle
                key={`${r}-${c}`}
                cx={(c + 0.5) * (1920 / cols)}
                cy={(r + 0.5) * (1080 / rows)}
                r={1.4}
                fill="#FFFFFF"
                opacity={opacity * a}
              />
            );
          }),
        )}
      </svg>
    </AbsoluteFill>
  );
};
