import { AbsoluteFill } from 'remotion';
import { Body, Kicker, Reveal, SceneFrame, Title } from '../components/Type';
import { CORAL, FONT_BODY, FONT_DISPLAY, LINE, MUTED, WHITE } from '../theme';

const territories = [
  {
    title: 'Crescimento & Inteligência de Consumidor',
    tagline: 'Venda mais para clientes, visitantes e canais com maior propensão de conversão',
    chips: ['Personalização Preditiva', 'Descoberta Preditiva', 'Campanhas por Propensão'],
  },
  {
    title: 'Demanda, Distribuição e Planejamento Comercial',
    tagline: 'Planeje melhor, venda melhor e reduza desperdício operacional',
    chips: ['Forecast Preditivo de Demanda', 'Metas Comerciais Preditivas', 'Mix, Sortimento e Pedido Ideal'],
  },
  {
    title: 'Precificação e Inteligência de Margem',
    tagline: 'Ajuste preço ao movimento real de mercado, cliente, estoque e margem',
    chips: ['Preço Orientado à Margem', 'Preço Orientado ao Giro', 'Preço Orientado à Conversão'],
  },
];

export const Territories: React.FC = () => (
  <AbsoluteFill>
    <SceneFrame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <Kicker>Onde a predição vira resultado</Kicker>
        <Title delay={8} size={78}>
          Alavancas <span style={{ color: CORAL }}>Preditivas</span> de Valor
        </Title>
        <Body delay={20} size={29} maxWidth={1200}>
          Organizamos nossas soluções em frentes de impacto, orientadas exatamente para onde as
          operações precisam capturar resultado
        </Body>

        <div style={{ display: 'flex', gap: 30, marginTop: 48 }}>
          {territories.map((t, i) => (
            <Reveal key={t.title} delay={44 + i * 20} distance={34} style={{ flex: 1 }}>
              <div
                style={{
                  background: 'linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                  border: `1px solid ${LINE}`,
                  borderLeft: `4px solid ${CORAL}`,
                  borderRadius: 24,
                  padding: '34px 30px',
                  minHeight: 420,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 700,
                    fontSize: 34,
                    color: WHITE,
                    lineHeight: 1.14,
                    marginBottom: 16,
                    minHeight: 120,
                  }}
                >
                  {t.title}
                </div>
                <div
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 24,
                    color: MUTED,
                    lineHeight: 1.38,
                    marginBottom: 26,
                    minHeight: 100,
                  }}
                >
                  {t.tagline}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {t.chips.map((c, j) => (
                    <Reveal key={c} delay={74 + i * 20 + j * 8} distance={12}>
                      <span
                        style={{
                          fontFamily: FONT_BODY,
                          fontSize: 22,
                          fontWeight: 500,
                          color: CORAL,
                          background: 'rgba(244,132,95,0.10)',
                          borderRadius: 999,
                          padding: '10px 20px',
                          display: 'inline-block',
                        }}
                      >
                        {c}
                      </span>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SceneFrame>
  </AbsoluteFill>
);
