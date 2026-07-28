import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

/** Scanlines discretas — usadas apenas nas cenas de produto. */
export const Scanlines: React.FC<{ opacity?: number }> = ({ opacity = 0.055 }) => {
  const frame = useCurrentFrame();
  const shift = (frame % 8) / 2;
  const sweep = interpolate(frame % 180, [0, 180], [-10, 110]);
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            'repeating-linear-gradient(180deg, rgba(255,255,255,0.9) 0px, rgba(255,255,255,0.9) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 4px)',
          backgroundPosition: `0 ${shift}px`,
          opacity,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `${sweep}%`,
          height: 120,
          background:
            'linear-gradient(180deg, rgba(244,132,95,0) 0%, rgba(244,132,95,0.05) 50%, rgba(244,132,95,0) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
