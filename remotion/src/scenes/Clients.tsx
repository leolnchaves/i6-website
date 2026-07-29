import React from 'react';
import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { Kicker, SceneFrame, Title } from '../components/Type';
import { CORAL, LINE } from '../theme';
import { useSceneDuration } from '../components/SceneContext';

const clients = [
  { file: 'ems-new.png', name: 'EMS' },
  { file: 'multi.png', name: 'Multi' },
  { file: 'biolab.png', name: 'Biolab' },
  { file: 'bmg-new.png', name: 'Banco BMG' },
  { file: 'unicred.png', name: 'Unicred' },
  { file: 'germed-new.png', name: 'Germed' },
  { file: 'legrand-new.png', name: 'Legrand' },
  { file: 'alpargatas-new.png', name: 'Alpargatas' },
  { file: 'camil.png', name: 'Camil' },
  { file: 'mds-group.png', name: 'MDS Group' },
  { file: 'skyfit.png', name: 'Skyfit' },
];

/** stagger irregular */
const STAGGER = [5, 9, 14, 20, 27, 35, 41, 46, 52, 59, 67];

const Slot: React.FC<{ c: (typeof clients)[number]; i: number; sweep: number }> = ({
  c,
  i,
  sweep,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = useSceneDuration();
  const delay = 52 + (STAGGER[i] ?? i * 7);
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, stiffness: 120 },
    durationInFrames: 32,
  });

  // saída ativa
  const out = interpolate(frame, [duration - 18, duration - 2], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // deriva senoidal defasada: nenhum frame parado
  const drift = Math.sin(frame / 38 + i * 0.9) * 3;

  // varredura coral que "lê" as logos da esquerda para a direita
  const pos = (i % 6) / 5;
  const glow = Math.max(0, 1 - Math.abs(sweep - pos) * 5.5);

  return (
    <div
      style={{
        flex: '1 1 0',
        minWidth: 0,
        height: 132,
        opacity: s * (1 - out),
        transform: `translateY(${((1 - s) * 30 + drift - out * 22).toFixed(2)}px)`,
        filter: `blur(${((1 - s) * 7 + out * 9).toFixed(2)}px)`,
        border: `1px solid ${glow > 0.02 ? `rgba(244,132,95,${(0.1 + glow * 0.4).toFixed(3)})` : LINE}`,
        borderRadius: 18,
        background: `linear-gradient(160deg, rgba(255,255,255,${(0.045 + glow * 0.05).toFixed(3)}), rgba(255,255,255,0.015))`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '22px 26px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Img
        src={staticFile(`images/clients/${c.file}`)}
        alt={c.name}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          filter: 'grayscale(1) brightness(2.3) contrast(1.02)',
          opacity: 0.88 + glow * 0.12,

        }}
      />
    </div>
  );
};

export const Clients: React.FC = () => {
  const frame = useCurrentFrame();
  // varredura única percorrendo a grade
  const sweep = interpolate(frame, [78, 168], [-0.25, 1.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const row1 = clients.slice(0, 6);
  const row2 = clients.slice(6);

  return (
    <AbsoluteFill>
      <SceneFrame>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <Kicker>Prova</Kicker>
          <Title delay={8} size={76}>
            Líderes que transformam <br />
            <span style={{ color: CORAL }}>antecipação</span> em vantagem
          </Title>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 54 }}>
            <div style={{ display: 'flex', gap: 24 }}>
              {row1.map((c, i) => (
                <Slot key={c.file} c={c} i={i} sweep={sweep} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 24, paddingRight: '16.6%' }}>
              {row2.map((c, i) => (
                <Slot key={c.file} c={c} i={i + 6} sweep={sweep} />
              ))}
            </div>
          </div>
        </div>
      </SceneFrame>
    </AbsoluteFill>
  );
};
