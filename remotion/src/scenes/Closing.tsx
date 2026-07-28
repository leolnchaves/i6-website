import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { Reveal, Rule } from '../components/Type';
import { CORAL, FONT_BODY, FONT_DISPLAY, WHITE } from '../theme';

// A logo só entra depois do fim da transição (24 frames) para nunca
// aparecer sobreposta à cena de resultados.
const LOGO_START = 0;

export const Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - LOGO_START,
    fps,
    config: { damping: 200 },
    durationInFrames: 34,
  });
  // Crescimento contínuo para leitura em TV acima do stand.
  const width = interpolate(frame, [LOGO_START, 330], [520, 900], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const glow = 0.5 + 0.5 * Math.sin(frame / 30);
  const drift = Math.sin(frame / 46) * 5;

  return (
    <AbsoluteFill
      style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 40 }}
    >
      <div
        style={{
          position: 'relative',
          opacity: s,
          transform: `translateY(${(1 - s) * 26 + drift}px)`,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '-14% -8%',
            borderRadius: 999,
            background: `radial-gradient(closest-side, rgba(244,132,95,${(0.12 + glow * 0.1).toFixed(3)}), rgba(244,132,95,0))`,
            filter: 'blur(6px)',
          }}
        />
        <Img src={staticFile('images/logo-horiz.png')} style={{ width, position: 'relative' }} />
      </div>

      <Reveal delay={LOGO_START + 26}>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            fontSize: 54,
            color: WHITE,
            letterSpacing: '-0.035em',
            textAlign: 'center',
          }}
        >
          Decisões antecipadas. <span style={{ color: CORAL }}>Resultados comprovados</span>
        </div>
      </Reveal>

      <Reveal delay={LOGO_START + 44}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 700,
              fontSize: 48,
              letterSpacing: '-0.01em',
              color: WHITE,
            }}
          >
            www.<span style={{ color: CORAL }}>infinity6</span>.ai
          </div>
          <Rule delay={LOGO_START + 54} width={260} />
        </div>
      </Reveal>

      <Reveal delay={LOGO_START + 58}>
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 24,
            color: CORAL,
            border: `1px solid rgba(244,132,95,0.5)`,
            borderRadius: 999,
            padding: '16px 42px',
          }}
        >
          performance@infinity6.ai
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};
