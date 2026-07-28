import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { Intelliboard } from '../components/signal/Intelliboard';
import { CHIPS, LABELS, SCENES } from '../components/signal/data';
import { CORAL, FONT_BODY, FONT_DISPLAY, MUTED, WHITE } from '../theme';

const ChipsBar: React.FC<{ activeChip: string }> = ({ activeChip }) => {
  const frame = useCurrentFrame();
  const s = interpolate(frame, [4, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        padding: 8,
        borderRadius: 999,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.10)',
        opacity: s,
      }}
    >
      {CHIPS.map((c) => {
        const active = c === activeChip;
        return (
          <div
            key={c}
            style={{
              padding: '12px 28px',
              borderRadius: 999,
              fontFamily: FONT_BODY,
              fontSize: 20,
              fontWeight: 500,
              color: active ? WHITE : 'rgba(255,255,255,0.6)',
              background: active ? 'rgba(249,115,22,0.85)' : 'transparent',
              boxShadow: active ? '0 8px 26px rgba(249,115,22,0.35)' : 'none',
            }}
          >
            {c}
          </div>
        );
      })}
    </div>
  );
};

const Take: React.FC<{ index: number; scrollAmount: number }> = ({ index, scrollAmount }) => {
  const scene = SCENES[index];
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34, paddingTop: 208 }}>
        <ChipsBar activeChip={scene.chipLabel} />
        <Intelliboard
          scene={scene}
          typeStart={18}
          typeEnd={18 + Math.round(scene.question.length * 0.85)}
          answerStart={18 + Math.round(scene.question.length * 0.85) + 26}
          scrollStart={18 + Math.round(scene.question.length * 0.85) + 130}
          scrollEnd={330}
          scrollAmount={scrollAmount}
        />
      </div>
    </AbsoluteFill>
  );
};

export const Signal: React.FC = () => {
  const frame = useCurrentFrame();
  const headOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      {/* Cabeçalho da seção */}
      <div
        style={{
          position: 'absolute',
          top: 44,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: headOpacity,
          zIndex: 2,
        }}
      >
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 50, color: WHITE, letterSpacing: '-0.03em' }}>
          i6 <span style={{ color: CORAL }}>Signal</span>
        </div>
        <div style={{ fontFamily: FONT_BODY, fontSize: 22, color: MUTED, marginTop: 20 }}>
          {LABELS.sectionSubtitle}
        </div>
      </div>

      <div style={{ position: 'absolute', inset: 0 }}>
        <Sequence from={0} durationInFrames={370}>
          <Take index={0} scrollAmount={330} />
        </Sequence>
        <Sequence from={370} durationInFrames={330}>
          <Take index={1} scrollAmount={300} />
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
