import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Kicker, Reveal, SceneFrame, Title } from '../components/Type';
import { CORAL, FONT_BODY, FONT_DISPLAY, LINE, MUTED, WHITE } from '../theme';

const questions = [
  'Onde o preço atual está reduzindo a probabilidade de conversão?',
  'Quais sessões precisam de incentivos para converter?',
  'Onde há risco de ruptura nas próximas semanas?',
];

const Typed: React.FC<{ text: string; start: number }> = ({ text, start }) => {
  const frame = useCurrentFrame();
  const chars = Math.floor(
    interpolate(frame - start, [0, text.length * 1.1], [0, text.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const caret = frame > start && chars < text.length;
  return (
    <span style={{ fontFamily: FONT_BODY, fontSize: 30, color: WHITE, lineHeight: 1.4 }}>
      {text.slice(0, chars)}
      {caret ? <span style={{ color: CORAL }}>|</span> : null}
    </span>
  );
};

export const Signal: React.FC = () => (
  <AbsoluteFill>
    <SceneFrame label="i6 Signal">
      <div style={{ display: 'flex', gap: 70, alignItems: 'center' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <Kicker>Camada transversal</Kicker>
          <Title delay={8} size={82}>
            i6 <span style={{ color: CORAL }}>Signal</span>
          </Title>
          <Reveal delay={20}>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 38, color: WHITE, lineHeight: 1.2 }}>
              A camada conversacional que transforma predição em decisão
            </div>
          </Reveal>
          <Reveal delay={32}>
            <div style={{ fontFamily: FONT_BODY, fontSize: 27, color: MUTED, lineHeight: 1.45, maxWidth: 620 }}>
              Conecta os sinais preditivos dos modelos aos times de negócio: onde agir, por que agir
              e qual impacto esperar
            </div>
          </Reveal>
        </div>

        <div
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.045)',
            border: `1px solid ${LINE}`,
            borderRadius: 28,
            padding: '38px 36px',
            minHeight: 470,
          }}
        >
          <div
            style={{
              fontFamily: FONT_BODY,
              fontSize: 20,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: CORAL,
              marginBottom: 30,
            }}
          >
            Exemplos de sinais
          </div>
          {questions.map((q, i) => (
            <div
              key={q}
              style={{
                display: 'flex',
                gap: 18,
                alignItems: 'flex-start',
                paddingBottom: 26,
                marginBottom: 26,
                borderBottom: i < questions.length - 1 ? `1px solid ${LINE}` : 'none',
              }}
            >
              <span style={{ color: CORAL, fontSize: 30, fontFamily: FONT_DISPLAY, lineHeight: 1.3 }}>
                ›
              </span>
              <Typed text={q} start={46 + i * 78} />
            </div>
          ))}
        </div>
      </div>
    </SceneFrame>
  </AbsoluteFill>
);
