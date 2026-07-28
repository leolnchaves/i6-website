import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Body, Kicker, Reveal, SceneFrame, Title } from '../components/Type';
import { CORAL, FONT_BODY, FONT_DISPLAY, LINE, MUTED, WHITE } from '../theme';

const engines = [
  { name: 'i6 RecSys', tagline: 'Recomendação de alto desempenho', desc: 'Sugestões personalizadas e escaláveis para mix e volume — em PDV, e-commerce e canais digitais' },
  { name: 'i6 Previsio', tagline: 'Previsão de demanda granular', desc: 'Previsões precisas que otimizam produção, estoque e distribuição, eliminando ruptura e excesso' },
  { name: 'i6 ElasticPrice', tagline: 'Precificação dinâmica', desc: 'Aprende com sinais de mercado e demanda para entregar recomendações de preço rápidas e precisas' },
];

const xaiArguments = [
  {
    tag: 'E-commerce',
    text: '“Recomendado porque o cliente comprou este item há 21 dias e a recompra média da categoria é de 25 dias”',
  },
  {
    tag: 'Pricing',
    text: '“Preço sugerido porque a elasticidade da categoria caiu 12% nesta região nas últimas 4 semanas”',
  },
  {
    tag: 'Varejo · PDV',
    text: '“Reposição antecipada porque o giro deste SKU no PDV subiu por 3 semanas seguidas com cobertura em queda”',
  },
];

export const Engines: React.FC = () => {
  const frame = useCurrentFrame();
  const xaiPulse = 0.5 + 0.5 * Math.sin(frame / 22);

  return (
    <AbsoluteFill>
      <SceneFrame>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Kicker>Proprietary AI</Kicker>
          <Title delay={8} size={70}>
            Três motores. <span style={{ color: CORAL }}>Uma camada conversacional</span>
          </Title>
          <Body delay={20} size={26} maxWidth={1200}>
            Motores próprios que aprendem comportamento, antecipam decisão e prescrevem ação — não
            geram texto, geram resultado
          </Body>

          <div style={{ display: 'flex', gap: 26, marginTop: 30 }}>
            {engines.map((e, i) => {
              const pulse = 0.5 + 0.5 * Math.sin((frame - i * 20) / 24);
              return (
                <Reveal key={e.name} delay={42 + i * 18} distance={30} style={{ flex: 1 }}>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.045)',
                      border: `1px solid ${LINE}`,
                      borderRadius: 24,
                      padding: '26px 26px',
                      minHeight: 250,
                      boxShadow: `0 0 ${20 + pulse * 26}px rgba(244,132,95,${(0.05 + pulse * 0.06).toFixed(3)})`,
                    }}
                  >
                    <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 36, color: CORAL, marginBottom: 10 }}>
                      {e.name}
                    </div>
                    <div style={{ fontFamily: FONT_DISPLAY, fontSize: 25, color: WHITE, marginBottom: 14 }}>
                      {e.tagline}
                    </div>
                    <div style={{ fontFamily: FONT_BODY, fontSize: 22, color: MUTED, lineHeight: 1.4 }}>
                      {e.desc}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={112} distance={24}>
            <div
              style={{
                marginTop: 30,
                border: `2px solid rgba(244,132,95,${(0.4 + xaiPulse * 0.35).toFixed(3)})`,
                background: 'rgba(244,132,95,0.09)',
                borderRadius: 24,
                padding: '28px 34px 30px',
                boxShadow: `0 0 ${26 + xaiPulse * 34}px rgba(244,132,95,${(0.08 + xaiPulse * 0.08).toFixed(3)})`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginBottom: 20 }}>
                <span
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 700,
                    fontSize: 34,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: CORAL,
                    whiteSpace: 'nowrap',
                  }}
                >
                  XAI for Business
                </span>
                <span style={{ fontFamily: FONT_BODY, fontSize: 24, color: WHITE, lineHeight: 1.3 }}>
                  Explicabilidade que vira argumento de venda: cada recomendação mostra os sinais que
                  a motivaram
                </span>
              </div>

              <div style={{ display: 'flex', gap: 18 }}>
                {xaiArguments.map((a, i) => (
                  <Reveal key={a.tag} delay={128 + i * 16} distance={18} style={{ flex: 1 }}>
                    <div
                      style={{
                        background: 'rgba(11,18,36,0.55)',
                        border: `1px solid rgba(244,132,95,0.28)`,
                        borderRadius: 18,
                        padding: '18px 20px',
                        height: '100%',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: FONT_BODY,
                          fontSize: 16,
                          letterSpacing: '0.22em',
                          textTransform: 'uppercase',
                          color: CORAL,
                          marginBottom: 10,
                        }}
                      >
                        {a.tag}
                      </div>
                      <div style={{ fontFamily: FONT_BODY, fontSize: 21, color: WHITE, lineHeight: 1.35 }}>
                        {a.text}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </SceneFrame>
    </AbsoluteFill>
  );
};
