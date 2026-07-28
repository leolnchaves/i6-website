import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { CORAL, FONT_BODY } from '../../theme';

const Corner: React.FC<{
  pos: 'tl' | 'tr' | 'bl' | 'br';
  draw: number;
  inset: number;
  len: number;
}> = ({ pos, draw, inset, len }) => {
  const v: React.CSSProperties = { position: 'absolute' };
  const top = pos[0] === 't';
  const left = pos[1] === 'l';
  const total = len;
  const drawn = total * draw;
  return (
    <div style={{ ...v, [top ? 'top' : 'bottom']: inset, [left ? 'left' : 'right']: inset }}>
      <div
        style={{
          position: 'absolute',
          [top ? 'top' : 'bottom']: 0,
          [left ? 'left' : 'right']: 0,
          width: drawn,
          height: 2,
          background: CORAL,
        }}
      />
      <div
        style={{
          position: 'absolute',
          [top ? 'top' : 'bottom']: 0,
          [left ? 'left' : 'right']: 0,
          width: 2,
          height: drawn,
          background: CORAL,
        }}
      />
    </div>
  );
};

/**
 * Moldura viva: cantos em L que se desenham, timecode e barra de progresso
 * da narrativa. Fica acima das cenas e abaixo do grão.
 */
export const Frame: React.FC<{ progress: number; label?: string }> = ({ progress, label }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const draw = interpolate(frame, [6, 34], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pulse = 0.55 + 0.45 * Math.sin(frame / 26);
  const secs = Math.floor(frame / fps);
  const tc = `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.9 }}>
      <Corner pos="tl" draw={draw} inset={46} len={70} />
      <Corner pos="tr" draw={draw} inset={46} len={70} />
      <Corner pos="bl" draw={draw} inset={46} len={70} />
      <Corner pos="br" draw={draw} inset={46} len={70} />

      {/* marca de viewfinder */}
      <div
        style={{
          position: 'absolute',
          top: 52,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          opacity: draw * 0.8,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: CORAL,
            opacity: 0.35 + pulse * 0.65,
          }}
        />
        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: 14,
            letterSpacing: '0.34em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          {label ?? 'infinity6'}
        </span>
      </div>

      {/* timecode */}
      <div
        style={{
          position: 'absolute',
          bottom: 52,
          right: 60,
          fontFamily: FONT_BODY,
          fontSize: 15,
          letterSpacing: '0.22em',
          color: 'rgba(255,255,255,0.3)',
          opacity: draw,
        }}
      >
        {tc} / {String(Math.floor(durationInFrames / fps / 60)).padStart(2, '0')}:
        {String(Math.floor(durationInFrames / fps) % 60).padStart(2, '0')}
      </div>

      {/* barra de progresso da narrativa */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.06)' }} />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: 3,
            width: `${(progress * 100).toFixed(2)}%`,
            background: `linear-gradient(90deg, rgba(244,132,95,0.35), ${CORAL})`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
