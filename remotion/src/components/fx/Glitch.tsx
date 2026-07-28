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
      <GlitchLayer hue={-45} dx={-off} k={k}>
        {children}
      </GlitchLayer>
      <GlitchLayer hue={150} dx={off} k={k}>
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
  hue: number;
  dx: number;
  k: number;
  children: React.ReactNode;
}> = ({ hue, dx, k, children }) => (
  <AbsoluteFill
    style={{
      transform: `translateX(${dx.toFixed(2)}px)`,
      mixBlendMode: 'screen',
      opacity: 0.45 * k,
      filter: `hue-rotate(${hue}deg) saturate(4)`,
    }}
  >
    {children}
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
