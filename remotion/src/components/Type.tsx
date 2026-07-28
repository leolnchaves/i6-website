import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { CORAL, FONT_BODY, FONT_DISPLAY, MUTED, WHITE } from '../theme';
import { useSceneDuration } from './SceneContext';

/** Curva de saída: elementos saem com blur + deslocamento antes do corte. */
const useExit = (lead = 0) => {
  const frame = useCurrentFrame();
  const duration = useSceneDuration();
  const start = duration - 22 + lead;
  return interpolate(frame, [start, duration - 4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

/** Entrada padrão do sistema de movimento: sobe, revela por máscara e sai ativa. */
export const Reveal: React.FC<{
  delay?: number;
  children: React.ReactNode;
  distance?: number;
  style?: React.CSSProperties;
  exitLead?: number;
}> = ({ delay = 0, children, distance = 34, style, exitLead = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: 26 });
  const out = useExit(exitLead);
  return (
    <div
      style={{
        opacity: s * (1 - out),
        transform: `translateY(${(1 - s) * distance - out * 26}px)`,
        filter: `blur(${((1 - s) * 6 + out * 10).toFixed(2)}px)`,
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
}) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <Reveal delay={delay} distance={12} exitLead={-6}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 34 * w, height: 2, background: CORAL }} />
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
      </div>
    </Reveal>
  );
};

/**
 * Título cinético: cada linha é revelada por máscara clip-path,
 * com stagger irregular entre linhas.
 */
const LINE_STAGGER = [0, 9, 21, 34];

export const Title: React.FC<{
  children: React.ReactNode;
  delay?: number;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, size = 92, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const out = useExit(4);

  // Divide o conteúdo em "linhas" a partir dos <br/> presentes no JSX.
  const nodes = React.Children.toArray(children);
  const lines: React.ReactNode[][] = [[]];
  nodes.forEach((n) => {
    if (React.isValidElement(n) && n.type === 'br') lines.push([]);
    else lines[lines.length - 1].push(n);
  });

  return (
    <h1
      style={{
        fontFamily: FONT_DISPLAY,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.06,
        letterSpacing: '-0.035em',
        color: WHITE,
        margin: 0,
        ...style,
      }}
    >
      {lines.map((line, i) => {
        const d = delay + (LINE_STAGGER[i] ?? i * 12);
        const s = spring({
          frame: frame - d,
          fps,
          config: { damping: 200 },
          durationInFrames: 30,
        });
        const reveal = interpolate(s, [0, 1], [100, 0]);
        return (
          <div key={i} style={{ overflow: 'hidden', display: 'block' }}>
            <div
              style={{
                display: 'block',
                clipPath: `inset(0 0 ${reveal.toFixed(2)}% 0)`,
                transform: `translateY(${((1 - s) * 0.22 * size - out * 30).toFixed(2)}px)`,
                opacity: 1 - out,
                filter: out > 0 ? `blur(${(out * 10).toFixed(2)}px)` : undefined,
              }}
            >
              {line}
            </div>
          </div>
        );
      })}
    </h1>
  );
};

export const Body: React.FC<{
  children: React.ReactNode;
  delay?: number;
  size?: number;
  color?: string;
  maxWidth?: number;
}> = ({ children, delay = 0, size = 34, color = MUTED, maxWidth = 1000 }) => (
  <Reveal delay={delay} distance={22} exitLead={2}>
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

/**
 * Contador: sobe de 0 até o valor com easing, preservando prefixo/sufixo
 * (ex.: "R$ 100M", "+2,6%", "−57%", "12x").
 */
export const Counter: React.FC<{ value: string; delay?: number; style?: React.CSSProperties }> = ({
  value,
  delay = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  if (!match) return <span style={style}>{value}</span>;
  const [, prefix, num, suffix] = match;
  const decimals = num.includes(',') ? num.split(',')[1].length : 0;
  const target = parseFloat(num.replace(/\./g, '').replace(',', '.'));
  const t = interpolate(frame - delay, [0, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const eased = 1 - Math.pow(1 - t, 3);
  const current = target * eased;
  const text = current
    .toFixed(decimals)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return (
    <span style={{ ...style, fontVariantNumeric: 'tabular-nums' }}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
};

export const SceneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
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
  </div>
);
