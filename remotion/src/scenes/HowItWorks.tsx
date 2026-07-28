import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Body, Kicker, Reveal, SceneFrame, Title } from '../components/Type';
import { CORAL, FONT_BODY, FONT_DISPLAY, LINE, MUTED, WHITE } from '../theme';

const steps = [
  { n: '01', title: 'Captura de sinais', desc: 'Demanda, preço, estoque, comportamento e contexto de mercado' },
  { n: '02', title: 'Predição', desc: 'Modelos proprietários identificam risco, intenção, elasticidade e propensão' },
  { n: '03', title: 'Recomendação priorizada', desc: 'A melhor ação por objetivo, canal, cliente, SKU ou região' },
  { n: '04', title: 'Ativação', desc: 'A decisão chega à operação no ecossistema do cliente' },
];

export const HowItWorks: React.FC = () => {
  const frame = useCurrentFrame();
  const lineW = interpolate(frame - 44, [0, 60], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <SceneFrame>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Kicker>Do sinal à decisão</Kicker>
          <Title delay={8} size={74}>
            Como transformamos sinais em{' '}
            <span style={{ color: CORAL }}>decisões acionáveis</span>
          </Title>
          <Body delay={22} size={30} maxWidth={1180}>
            Da leitura do contexto à ativação no canal, combinamos predição, recomendação e execução
            para antecipar a próxima melhor decisão
          </Body>

          <div style={{ position: 'relative', marginTop: 62 }}>

            <div style={{ display: 'flex', gap: 34 }}>
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={50 + i * 16} distance={26} style={{ flex: 1 }}>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: `1px solid ${LINE}`,
                      borderTop: `3px solid ${CORAL}`,
                      borderRadius: 22,
                      padding: '30px 28px 34px',
                      minHeight: 300,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: FONT_DISPLAY,
                        fontWeight: 700,
                        fontSize: 46,
                        color: CORAL,
                        marginBottom: 16,
                      }}
                    >
                      {s.n}
                    </div>
                    <div
                      style={{
                        fontFamily: FONT_DISPLAY,
                        fontWeight: 500,
                        fontSize: 32,
                        color: WHITE,
                        marginBottom: 12,
                        lineHeight: 1.15,
                      }}
                    >
                      {s.title}
                    </div>
                    <div style={{ fontFamily: FONT_BODY, fontSize: 25, color: MUTED, lineHeight: 1.4 }}>
                      {s.desc}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </SceneFrame>
    </AbsoluteFill>
  );
};
