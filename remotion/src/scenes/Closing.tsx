import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { Reveal } from '../components/Type';
import { CORAL, FONT_BODY, FONT_DISPLAY, WHITE, MUTED } from '../theme';

export const Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 34 });
  const drift = Math.sin(frame / 46) * 5;

  return (
    <AbsoluteFill
      style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 44 }}
    >
      <div style={{ opacity: s, transform: `translateY(${(1 - s) * 26 + drift}px)` }}>
        <Img src={staticFile('images/logo-horiz.png')} style={{ width: 520 }} />
      </div>
      <Reveal delay={26}>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            fontSize: 60,
            color: WHITE,
            letterSpacing: '-0.035em',
            textAlign: 'center',
          }}
        >
          Decisões antecipadas. <span style={{ color: CORAL }}>Resultados comprovados</span>
        </div>
      </Reveal>
      <Reveal delay={44}>
        <div style={{ fontFamily: FONT_BODY, fontSize: 32, color: MUTED, textAlign: 'center' }}>
          infinity6.ai
        </div>
      </Reveal>
      <Reveal delay={58}>
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 26,
            color: CORAL,
            border: `1px solid rgba(244,132,95,0.5)`,
            borderRadius: 999,
            padding: '18px 44px',
          }}
        >
          performance@infinity6.ai
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};
