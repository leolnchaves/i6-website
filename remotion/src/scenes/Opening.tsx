import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { Body, Reveal, Rule } from '../components/Type';
import { CORAL, FONT_BODY, FONT_DISPLAY, WHITE } from '../theme';

export const Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 18, stiffness: 90 }, durationInFrames: 45 });
  const scale = interpolate(s, [0, 1], [0.82, 1]);
  const drift = Math.sin(frame / 42) * 6;

  return (
    <AbsoluteFill
      style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 46 }}
    >
      <div style={{ transform: `scale(${scale}) translateY(${drift}px)`, opacity: s }}>
        <Img src={staticFile('images/symbol.png')} style={{ width: 300 }} />
      </div>
      <Reveal delay={26} distance={26}>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            fontSize: 74,
            letterSpacing: '-0.04em',
            color: WHITE,
          }}
        >
          Decida <span style={{ color: CORAL }}>antes</span> do mercado
        </div>
      </Reveal>
      <Reveal delay={44}>
        <Rule delay={44} width={220} />
      </Reveal>
      <Body delay={56} size={30} maxWidth={900}>
        <span style={{ fontFamily: FONT_BODY, textAlign: 'center', display: 'block' }}>
          IA proprietária aplicada a decisões de receita, margem e operação
        </span>
      </Body>
    </AbsoluteFill>
  );
};
