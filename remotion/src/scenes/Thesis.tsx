import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Body, Kicker, Reveal, SceneFrame, Title } from '../components/Type';
import { CORAL, FONT_BODY, LINE, MUTED, WHITE } from '../theme';

const chips = ['margem', 'giro', 'conversão', 'custo'];

export const Thesis: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <SceneFrame label="infinity6">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          <Kicker>A tese</Kicker>
          <Title delay={10} size={96}>
            Decisões antecipadas,
            <br />
            <span style={{ color: CORAL }}>resultados comprovados</span>
          </Title>
          <Body delay={26} maxWidth={1120}>
            Transformamos sinais do negócio, mercado e comportamento em decisões que protegem
            margem, aceleram giro, aumentam conversão e reduzem custo
          </Body>
          <div style={{ display: 'flex', gap: 18, marginTop: 26 }}>
            {chips.map((c, i) => {
              const pulse =
                0.85 + 0.15 * Math.sin((frame - i * 12) / 18) * (frame > 46 + i * 9 ? 1 : 0);
              return (
                <Reveal key={c} delay={46 + i * 9} distance={18}>
                  <span
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 30,
                      fontWeight: 500,
                      color: WHITE,
                      border: `1px solid ${LINE}`,
                      background: `rgba(244,132,95,${(0.07 * pulse).toFixed(3)})`,
                      borderRadius: 999,
                      padding: '16px 34px',
                      display: 'inline-block',
                    }}
                  >
                    {c}
                  </span>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={104} distance={16}>
            <span style={{ fontFamily: FONT_BODY, fontSize: 26, color: MUTED }}>
              Home · infinity6.ai
            </span>
          </Reveal>
        </div>
      </SceneFrame>
    </AbsoluteFill>
  );
};
