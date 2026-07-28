import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Body, Kicker, Reveal, SceneFrame, Title } from '../components/Type';
import { CORAL, FONT_BODY, FONT_DISPLAY, LINE, MUTED, WHITE } from '../theme';

const engines = [
  { name: 'i6 RecSys', tagline: 'Recomendação de alto desempenho', desc: 'Sugestões personalizadas e escaláveis para mix e volume — em PDV, e-commerce e canais digitais' },
  { name: 'i6 Previsio', tagline: 'Previsão de demanda granular', desc: 'Previsões precisas que otimizam produção, estoque e distribuição, eliminando ruptura e excesso' },
  { name: 'i6 ElasticPrice', tagline: 'Precificação dinâmica', desc: 'Aprende com sinais de mercado e demanda para entregar recomendações de preço rápidas e precisas' },
];

export const Engines: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <SceneFrame>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Kicker>Proprietary AI</Kicker>
          <Title delay={8} size={76}>
            Três motores. <span style={{ color: CORAL }}>Uma camada conversacional</span>
          </Title>
          <Body delay={20} size={28} maxWidth={1200}>
            Motores próprios que aprendem comportamento, antecipam decisão e prescrevem ação — não
            geram texto, geram resultado
          </Body>

          <div style={{ display: 'flex', gap: 28, marginTop: 42 }}>
            {engines.map((e, i) => {
              const pulse = 0.5 + 0.5 * Math.sin((frame - i * 20) / 24);
              return (
                <Reveal key={e.name} delay={42 + i * 18} distance={30} style={{ flex: 1 }}>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.045)',
                      border: `1px solid ${LINE}`,
                      borderRadius: 24,
                      padding: '32px 28px',
                      minHeight: 320,
                      boxShadow: `0 0 ${20 + pulse * 26}px rgba(244,132,95,${(0.05 + pulse * 0.06).toFixed(3)})`,
                    }}
                  >
                    <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 40, color: CORAL, marginBottom: 12 }}>
                      {e.name}
                    </div>
                    <div style={{ fontFamily: FONT_DISPLAY, fontSize: 27, color: WHITE, marginBottom: 18 }}>
                      {e.tagline}
                    </div>
                    <div style={{ fontFamily: FONT_BODY, fontSize: 24, color: MUTED, lineHeight: 1.42 }}>
                      {e.desc}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={112} distance={22}>
            <div
              style={{
                marginTop: 40,
                display: 'flex',
                alignItems: 'center',
                gap: 26,
                border: `1px solid rgba(244,132,95,0.35)`,
                background: 'rgba(244,132,95,0.07)',
                borderRadius: 20,
                padding: '26px 34px',
              }}
            >
              <span
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 20,
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase',
                  color: CORAL,
                  whiteSpace: 'nowrap',
                }}
              >
                XAI for Business
              </span>
              <span style={{ fontFamily: FONT_BODY, fontSize: 26, color: WHITE, lineHeight: 1.35 }}>
                Explicabilidade que vira argumento de venda: cada recomendação mostra os sinais que
                a motivaram
              </span>
            </div>
          </Reveal>
        </div>
      </SceneFrame>
    </AbsoluteFill>
  );
};
