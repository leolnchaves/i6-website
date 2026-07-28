import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { Kicker, Reveal, SceneFrame, Title } from '../components/Type';
import { CORAL, FONT_BODY, FONT_DISPLAY, LINE, MUTED, WHITE } from '../theme';

const results = [
  { value: 'R$ 100M', label: 'em savings ao antecipar ruptura, overstocking e incineração', source: 'Varejo farma' },
  { value: '+23%', label: 'ticket médio por PDV', source: 'Varejo' },
  { value: '+36%', label: 'positivação de produtos', source: 'Varejo' },
  { value: '−57%', label: 'custo de CRM', source: 'Financeiro' },
  { value: '12x', label: 'mais conversão em campanhas', source: 'Financeiro' },
  { value: '+2,6%', label: 'mais vendas que a curadoria humana de looks', source: 'Fashion' },
];

const Card: React.FC<{ r: (typeof results)[number]; delay: number }> = ({ r, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 110 }, durationInFrames: 34 });
  return (
    <div
      style={{
        flex: '1 1 30%',
        opacity: s,
        transform: `translateY(${(1 - s) * 40}px) scale(${0.94 + s * 0.06})`,
        background: 'linear-gradient(160deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
        border: `1px solid ${LINE}`,
        borderLeft: `4px solid ${CORAL}`,
        borderRadius: 22,
        padding: '30px 30px 26px',
        minHeight: 250,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            fontSize: 68,
            color: CORAL,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          {r.value}
        </div>
        <div style={{ fontFamily: FONT_BODY, fontSize: 25, color: WHITE, lineHeight: 1.35 }}>
          {r.label}
        </div>
      </div>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 19,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: MUTED,
          marginTop: 22,
        }}
      >
        {r.source}
      </div>
    </div>
  );
};

export const Results: React.FC = () => (
  <AbsoluteFill>
    <SceneFrame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Kicker>Resultados reais</Kicker>
        <Title delay={8} size={74}>
          Onde a IA encontra o <span style={{ color: CORAL }}>crescimento do negócio</span>
        </Title>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 26, marginTop: 40 }}>
          {results.map((r, i) => (
            <Card key={r.value + r.source} r={r} delay={34 + i * 22} />
          ))}
        </div>
        <Reveal delay={200} distance={16}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 24, color: MUTED, marginTop: 26 }}>
            Resultados anonimizados de clientes infinity6
          </div>
        </Reveal>
      </div>
    </SceneFrame>
  </AbsoluteFill>
);
