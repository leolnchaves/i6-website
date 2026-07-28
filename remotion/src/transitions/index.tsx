import React from 'react';
import { AbsoluteFill, interpolate, random } from 'remotion';
import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from '@remotion/transitions';
import { CORAL } from '../theme';

type Empty = Record<string, unknown>;

/* ------------------------------------------------------------------ */
/* 1. Wipe de moldura: uma barra coral varre a tela e revela a cena.   */
/* ------------------------------------------------------------------ */

const FrameWipePresentation: React.FC<
  TransitionPresentationComponentProps<{ direction?: 'left' | 'right' | 'up' }>
> = ({ children, presentationProgress, presentationDirection, passedProps }) => {
  const dir = passedProps.direction ?? 'left';
  const p = presentationProgress;
  const entering = presentationDirection === 'entering';

  const edge = p * 100;
  const barSize = 6;

  const clip = (() => {
    if (dir === 'up') {
      return entering ? `inset(${100 - edge}% 0 0 0)` : `inset(0 0 ${edge}% 0)`;
    }
    if (dir === 'right') {
      return entering ? `inset(0 0 0 ${100 - edge}%)` : `inset(0 ${edge}% 0 0)`;
    }
    return entering ? `inset(0 ${100 - edge}% 0 0)` : `inset(0 0 0 ${edge}%)`;
  })();

  // leve deslocamento contrário: a cena "assenta" no lugar
  const push = entering ? (1 - p) * 26 : -p * 20;
  const tx = dir === 'up' ? 0 : (dir === 'right' ? -push : push);
  const ty = dir === 'up' ? push : 0;

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          clipPath: clip,
          transform: `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px)`,
        }}
      >
        {children}
      </AbsoluteFill>
      {entering ? (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
          <div
            style={
              dir === 'up'
                ? {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: `${100 - edge}%`,
                    height: barSize,
                    background: CORAL,
                    boxShadow: `0 0 40px 6px rgba(244,132,95,0.45)`,
                    opacity: p > 0.98 ? 0 : 1,
                  }
                : {
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    [dir === 'right' ? 'right' : 'left']: `${edge}%`,
                    width: barSize,
                    background: CORAL,
                    boxShadow: `0 0 40px 6px rgba(244,132,95,0.45)`,
                    opacity: p > 0.98 ? 0 : 1,
                  }
            }
          />
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};

export const frameWipe = (
  props: { direction?: 'left' | 'right' | 'up' } = {},
): TransitionPresentation<{ direction?: 'left' | 'right' | 'up' }> => ({
  component: FrameWipePresentation,
  props,
});

/* ------------------------------------------------------------------ */
/* 2. Whip-pan: pan rápido com motion blur no eixo do movimento.        */
/* ------------------------------------------------------------------ */

const WhipPanPresentation: React.FC<
  TransitionPresentationComponentProps<{ axis?: 'x' | 'y' }>
> = ({ children, presentationProgress, presentationDirection, passedProps }) => {
  const axis = passedProps.axis ?? 'x';
  const p = presentationProgress;
  const entering = presentationDirection === 'entering';
  const shift = entering ? (1 - p) * 46 : -p * 46;
  const blur = interpolate(p, [0, 0.5, 1], [0, 26, 0]);

  return (
    <AbsoluteFill
      style={{
        transform: axis === 'x' ? `translateX(${shift}%)` : `translateY(${shift}%)`,
        filter: `blur(${blur.toFixed(1)}px)`,
        opacity: entering ? interpolate(p, [0, 0.35], [0, 1], { extrapolateRight: 'clamp' }) : 1,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const whipPan = (
  props: { axis?: 'x' | 'y' } = {},
): TransitionPresentation<{ axis?: 'x' | 'y' }> => ({
  component: WhipPanPresentation,
  props,
});

/* ------------------------------------------------------------------ */
/* 3. Corte seco com glitch: troca abrupta com RGB split e fatias.      */
/* ------------------------------------------------------------------ */

const GlitchCutPresentation: React.FC<TransitionPresentationComponentProps<Empty>> = ({
  children,
  presentationProgress,
  presentationDirection,
}) => {
  const p = presentationProgress;
  const entering = presentationDirection === 'entering';
  // corte seco no meio
  const visible = entering ? p >= 0.5 : p < 0.5;
  if (!visible) return <AbsoluteFill />;

  const k = 1 - Math.abs(p - 0.5) * 2; // pico no corte
  const off = 2 + k * 12;
  const seed = Math.round(p * 1000);

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `translateX(${-off}px)`,
          mixBlendMode: 'screen',
          opacity: 0.5 * k,
          filter: 'hue-rotate(-40deg) saturate(3)',
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `translateX(${off}px)`,
          mixBlendMode: 'screen',
          opacity: 0.5 * k,
          filter: 'hue-rotate(150deg) saturate(3)',
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill style={{ transform: `scale(${1 + k * 0.02})` }}>{children}</AbsoluteFill>
      {k > 0.05
        ? Array.from({ length: 5 }, (_, i) => {
            const top = random(`gc${seed}${i}`) * 100;
            const h = 8 + random(`gch${seed}${i}`) * 40;
            const dx = (random(`gcd${seed}${i}`) - 0.5) * 140 * k;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: `${top}%`,
                  height: h,
                  transform: `translateX(${dx.toFixed(1)}px)`,
                  background:
                    i % 2 === 0
                      ? `rgba(244,132,95,${(0.2 * k).toFixed(3)})`
                      : `rgba(255,255,255,${(0.07 * k).toFixed(3)})`,
                }}
              />
            );
          })
        : null}
    </AbsoluteFill>
  );
};

export const glitchCut = (): TransitionPresentation<Empty> => ({
  component: GlitchCutPresentation,
  props: {},
});
