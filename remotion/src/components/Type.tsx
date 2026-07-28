import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { CORAL, FAINT, FONT_BODY, FONT_DISPLAY, MUTED, WHITE } from '../theme';

/** Entrada padrão do sistema de movimento: sobe + revela por máscara. */
export const Reveal: React.FC<{
  delay?: number;
  children: React.ReactNode;
  distance?: number;
  style?: React.CSSProperties;
}> = ({ delay = 0, children, distance = 34, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: 26 });
  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${(1 - s) * distance}px)`,
        filter: `blur(${(1 - s) * 6}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Kicker: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => (
  <Reveal delay={delay} distance={16}>
    <span
      style={{
        fontFamily: FONT_BODY,
        fontSize: 24,
        fontWeight: 600,
        letterSpacing: '0.34em',
        textTransform: 'uppercase',
        color: CORAL,
      }}
    >
      {children}
    </span>
  </Reveal>
);

export const Title: React.FC<{
  children: React.ReactNode;
  delay?: number;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, size = 92, style }) => (
  <Reveal delay={delay}>
    <h1
      style={{
        fontFamily: FONT_DISPLAY,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.04,
        letterSpacing: '-0.035em',
        color: WHITE,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </h1>
  </Reveal>
);

export const Body: React.FC<{
  children: React.ReactNode;
  delay?: number;
  size?: number;
  color?: string;
  maxWidth?: number;
}> = ({ children, delay = 0, size = 34, color = MUTED, maxWidth = 1000 }) => (
  <Reveal delay={delay} distance={22}>
    <p
      style={{
        fontFamily: FONT_BODY,
        fontSize: size,
        lineHeight: 1.42,
        color,
        margin: 0,
        maxWidth,
      }}
    >
      {children}
    </p>
  </Reveal>
);

/** Régua coral animada, motivo recorrente da peça. */
export const Rule: React.FC<{ delay?: number; width?: number }> = ({ delay = 0, width = 190 }) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame - delay, [0, 24], [0, width], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <div style={{ height: 4, width: w, background: CORAL, borderRadius: 2 }} />;
};

export const SceneFrame: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      padding: '96px 170px 88px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    {children}
    <div
      style={{
        position: 'absolute',
        left: 170,
        bottom: 54,
        fontFamily: FONT_BODY,
        fontSize: 21,
        letterSpacing: '0.24em',
        color: FAINT,
      }}
    >
      {label}
    </div>
  </div>
);
