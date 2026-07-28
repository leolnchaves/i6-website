import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { SceneContext } from './SceneContext';

/**
 * Movimento de câmera contínuo. Cada cena recebe uma variante diferente
 * para que nunca haja dois movimentos iguais em sequência.
 * Tudo derivado de useCurrentFrame() — nada de CSS animation.
 */
type Move = { x: number; y: number; z: number; rot: number };

const MOVES: Move[] = [
  { x: 0, y: -26, z: 0.05, rot: 0 }, // sobe + zoom in
  { x: 30, y: 0, z: 0.03, rot: -0.3 }, // puxa da esquerda
  { x: -24, y: 10, z: 0.045, rot: 0.25 }, // empurra pra direita
  { x: 0, y: 24, z: -0.03, rot: 0 }, // desce + zoom out
  { x: 16, y: -14, z: 0.02, rot: 0.15 }, // diagonal lenta
  { x: -30, y: -8, z: 0.05, rot: -0.2 },
  { x: 8, y: 22, z: 0.035, rot: 0.3 },
  { x: 0, y: -18, z: 0.06, rot: 0 },
];

export const Camera: React.FC<{
  variant: number;
  /** 1 = conteúdo, valores menores = camadas de fundo (parallax real) */
  depth?: number;
  /** duração da cena, usada pelas saídas ativas dos textos */
  duration?: number;
  children: React.ReactNode;
}> = ({ variant, depth = 1, duration, children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const span = duration ?? durationInFrames;
  const m = MOVES[variant % MOVES.length];
  const t = interpolate(frame, [0, Math.max(span - 1, 1)], [0, 1], {
    extrapolateRight: 'clamp',
  });
  // easing muito suave: nunca acelera, nunca para
  const e = t * t * (3 - 2 * t) * 0.35 + t * 0.65;
  // respiração de alta frequência, quase imperceptível
  const breathe = Math.sin(frame / 78) * 3 * depth;

  const x = m.x * e * depth;
  const y = m.y * e * depth + breathe;
  const scale = 1 + m.z * e * depth;
  const rot = m.rot * e * depth;

  const inner = (
    <AbsoluteFill
      style={{
        transform: `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)}) rotate(${rot.toFixed(3)}deg)`,
        transformOrigin: '50% 50%',
        willChange: 'transform',
      }}
    >
      {children}
    </AbsoluteFill>
  );

  if (duration === undefined) return inner;
  return <SceneContext.Provider value={{ duration }}>{inner}</SceneContext.Provider>;
};
