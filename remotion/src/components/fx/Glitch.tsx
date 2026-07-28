import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, random } from 'remotion';

/**
 * Glitch: deslocamento RGB + fatias horizontais + queda de scanline.
 * `bursts` = frames (relativos à cena) onde o glitch dispara.
 * Cada rajada dura ~5 frames. Usar com parcimônia.
 */
export const Glitch: React.FC<{
  bursts: number[];
  duration?: number;
  intensity?: number;
  children: React.ReactNode;
}> = ({ bursts, duration = 5, intensity = 1, children }) => {
  const frame = useCurrentFrame();
  const active = bursts.find((b) => frame >= b && frame < b + duration);
  if (active === undefined) return <>{children}</>;

  const local = frame - active;
  const decay = interpolate(local, [0, duration], [1, 0], { extrapolateRight: 'clamp' });
  const k = decay * intensity;
  const off = (1 + random(`g${frame}`) * 4) * k;

  return (
    <AbsoluteFill>
      <GlitchLayer color="rgba(255,0,60,0.55)" dx={-off} frame={frame} k={k}>
        {children}
      </GlitchLayer>
      <GlitchLayer color="rgba(0,220,255,0.5)" dx={off} frame={frame + 7} k={k}>
        {children}
      </GlitchLayer>
      <AbsoluteFill style={{ transform: `translateX(${(off * 0.3).toFixed(2)}px)` }}>
        {children}
      </AbsoluteFill>
      <Slices frame={frame} k={k} />
    </AbsoluteFill>
  );
};

const GlitchLayer: React.FC<{
  color: string;
  dx: number;
  frame: number;
  k: number;
  children: React.ReactNode;
}> = ({ color, dx, frame, k, children }) => (
  <AbsoluteFill
    style={{
      transform: `translateX(${dx.toFixed(2)}px)`,
      mixBlendMode: 'screen',
      opacity: 0.55 * k,
    }}
  >
    <AbsoluteFill>{children}</AbsoluteFill>
    <AbsoluteFill style={{ background: color, mixBlendMode: 'multiply' }} />
  </AbsoluteFill>
);

const Slices: React.FC<{ frame: number; k: number }> = ({ frame, k }) => {
  const n = 4;
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {Array.from({ length: n }, (_, i) => {
        const top = random(`t${frame}${i}`) * 100;
        const h = 6 + random(`h${frame}${i}`) * 26;
        const dx = (random(`d${frame}${i}`) - 0.5) * 90 * k;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: `${top}%`,
              height: h,
              background:
                i % 2 === 0
                  ? `rgba(244,132,95,${(0.16 * k).toFixed(3)})`
                  : 'rgba(255,255,255,0.05)',
              transform: `translateX(${dx.toFixed(1)}px)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
