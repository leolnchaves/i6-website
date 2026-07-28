import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { FONT_BODY, FONT_DISPLAY } from '../../theme';
import type { Scene } from './data';
import { LABELS, SIDEBAR } from './data';
import {
  IconBook,
  IconBrain,
  IconChart,
  IconChevronDown,
  IconChevronLeft,
  IconDatabase,
  IconGrid,
  IconHeart,
  IconHome,
  IconLayers,
  IconLightbulb,
  IconRepeat,
  IconRotate,
  IconSend,
  IconSettings,
  IconShuffle,
  IconSparkles,
  IconTarget,
  IconTrendUp,
  IconUpload,
  IconZap,
} from './icons';

const ORANGE = '#f97316';
const ORANGE_SOFT = '#fb923c';

/** Revelação local (opacidade + subida), toda baseada em frame. */
const In: React.FC<{
  delay: number;
  children: React.ReactNode;
  distance?: number;
  style?: React.CSSProperties;
}> = ({ delay, children, distance = 14, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: 18 });
  return (
    <div style={{ opacity: s, transform: `translateY(${(1 - s) * distance}px)`, ...style }}>
      {children}
    </div>
  );
};

const menuIcons = [IconHome, IconUpload, IconTarget, IconDatabase, IconBrain, IconGrid];
const wizardIcons = [IconSparkles, IconTrendUp, IconShuffle, IconRepeat, IconLayers, IconZap, IconTarget];

/** ── Sidebar clara ─────────────────────────────────────────── */
const Sidebar: React.FC<{ delay: number }> = ({ delay }) => (
  <In
    delay={delay}
    distance={0}
    style={{
      width: 268,
      flexShrink: 0,
      background: '#fff',
      borderRight: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div style={{ padding: '16px 16px', borderBottom: '1px solid #f3f4f6' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '11px 12px',
          borderRadius: 12,
          background: 'rgba(255,237,213,0.6)',
          borderLeft: `3px solid ${ORANGE}`,
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: '#1f2937',
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '0.06em',
              fontFamily: FONT_BODY,
            }}
          >
            ÂNGULO
          </div>
          <div style={{ color: '#6b7280', fontSize: 13, fontFamily: FONT_BODY }}>Forecast</div>
        </div>
        <IconChevronDown size={18} />
      </div>
    </div>

    <div style={{ flex: 1, padding: '10px 10px', display: 'flex', flexDirection: 'column', gap: 3 }}>
      {SIDEBAR.map((label, i) => {
        const Icon = menuIcons[i];
        const active = i === 4;
        return (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 11,
              padding: '11px 14px',
              borderRadius: 11,
              fontFamily: FONT_BODY,
              fontSize: 16,
              color: active ? '#ea580c' : '#4b5563',
              fontWeight: active ? 600 : 400,
              background: active
                ? 'linear-gradient(90deg, rgba(255,237,213,0.9), rgba(219,234,254,0.75))'
                : 'transparent',
              borderLeft: active ? `3px solid ${ORANGE}` : '3px solid transparent',
            }}
          >
            <Icon size={19} color={active ? '#ea580c' : '#6b7280'} />
            <span>{label}</span>
          </div>
        );
      })}
    </div>

    <div style={{ borderTop: '1px solid #f3f4f6', padding: '10px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      {['Billing Analytics', 'Analytics'].map((l) => (
        <div
          key={l}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 11,
            padding: '10px 14px',
            borderRadius: 11,
            fontFamily: FONT_BODY,
            fontSize: 15,
            color: '#6b7280',
          }}
        >
          <IconChart size={18} />
          <span>{l}</span>
        </div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px' }}>
        <IconSettings size={19} color="#9ca3af" />
        <IconChevronLeft size={18} />
      </div>
    </div>
  </In>
);

/** ── Barra de favoritos ────────────────────────────────────── */
const FavBar: React.FC<{ delay: number }> = ({ delay }) => (
  <In
    delay={delay}
    distance={0}
    style={{
      width: 52,
      flexShrink: 0,
      background: 'rgba(255,255,255,0.96)',
      borderRight: '1px solid rgba(229,231,235,0.6)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 14,
      gap: 8,
    }}
  >
    {wizardIcons.map((Icon, i) => (
      <div key={i} style={{ height: 30, display: 'flex', alignItems: 'center' }}>
        <Icon size={17} color="#9ca3af" />
      </div>
    ))}
    <div style={{ width: 22, height: 1, background: '#d1d5db', margin: '6px 0' }} />
    {[0, 1, 2, 3, 4].map((i) => (
      <div key={i} style={{ height: 26, display: 'flex', alignItems: 'center' }}>
        <IconHeart size={17} />
      </div>
    ))}
  </In>
);

/** ── Tabela ────────────────────────────────────────────────── */
const Table: React.FC<{ viz: Extract<Scene['viz'], { kind: 'table' }>; delay: number }> = ({ viz, delay }) => (
  <div style={{ margin: '18px 0' }}>
    <div
      style={{
        display: 'flex',
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: 9,
      }}
    >
      {viz.headers.map((h, i) => (
        <div
          key={h}
          style={{
            flex: i === 1 ? 1.7 : 1,
            fontFamily: FONT_BODY,
            fontSize: 13,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: '#374151',
            fontWeight: 500,
          }}
        >
          {h}
        </div>
      ))}
    </div>
    {viz.rows.map((row, ri) => (
      <In key={ri} delay={delay + ri * 6} distance={10}>
        <div style={{ display: 'flex', borderBottom: '1px solid #f3f4f6', padding: '12px 0' }}>
          {row.map((cell, ci) => (
            <div
              key={ci}
              style={{
                flex: ci === 1 ? 1.7 : 1,
                fontFamily: FONT_BODY,
                fontSize: 18,
                color: ci === 0 ? '#6b7280' : '#1f2937',
                fontWeight: ci === 2 ? 700 : 400,
              }}
            >
              {cell}
            </div>
          ))}
        </div>
      </In>
    ))}
  </div>
);

/** ── Gráfico de barras ─────────────────────────────────────── */
const Bars: React.FC<{ viz: Extract<Scene['viz'], { kind: 'bars' }>; delay: number }> = ({ viz, delay }) => {
  const frame = useCurrentFrame();
  const max = Math.max(...viz.data.map((d) => d.potential));
  return (
    <div style={{ margin: '18px 0' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 42, height: 250, paddingLeft: 6 }}>
        {viz.data.map((d, i) => {
          const g = interpolate(frame - delay - i * 7, [0, 26], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const hPot = (d.potential / max) * 190 * g;
          const hGap = (d.gap / max) * 190 * g;
          return (
            <div key={d.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 200 }}>
                <div
                  style={{
                    width: 46,
                    height: hPot,
                    borderRadius: '8px 8px 0 0',
                    background: 'linear-gradient(180deg, #93c5fd, #3b82f6)',
                  }}
                />
                <div
                  style={{
                    width: 46,
                    height: hGap,
                    borderRadius: '8px 8px 0 0',
                    background: `linear-gradient(180deg, ${ORANGE_SOFT}, ${ORANGE})`,
                  }}
                />
              </div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 16, color: '#4b5563' }}>{d.label}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: '#ea580c', fontWeight: 600 }}>
                score {d.score}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 22, marginTop: 14, alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: '#3b82f6' }} />
          <span style={{ fontFamily: FONT_BODY, fontSize: 15, color: '#6b7280' }}>Potencial (R$ mil)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: ORANGE }} />
          <span style={{ fontFamily: FONT_BODY, fontSize: 15, color: '#6b7280' }}>Gap de receita (R$ mil)</span>
        </div>
      </div>
    </div>
  );
};

/** ── Bloco de resposta ─────────────────────────────────────── */
const Answer: React.FC<{ scene: Scene; start: number }> = ({ scene, start }) => (
  <div>
    <In delay={start} distance={16}>
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 26, color: '#111827', marginBottom: 14 }}>
        {scene.title}
      </div>
    </In>
    <In delay={start + 8}>
      <div style={{ fontFamily: FONT_BODY, fontSize: 17, fontWeight: 600, color: ORANGE, marginBottom: 7 }}>
        {LABELS.executiveAnalysis}
      </div>
      <div style={{ fontFamily: FONT_BODY, fontSize: 19, lineHeight: 1.55, color: '#4b5563' }}>
        {scene.analysis}
      </div>
    </In>

    {scene.viz.kind === 'table' ? (
      <Table viz={scene.viz} delay={start + 20} />
    ) : (
      <Bars viz={scene.viz} delay={start + 20} />
    )}

    <In delay={start + 52}>
      <div style={{ fontFamily: FONT_BODY, fontSize: 17, fontWeight: 600, color: ORANGE, margin: '20px 0 10px' }}>
        {LABELS.recommendedActions}
      </div>
    </In>
    {scene.actions.map((a, i) => (
      <In key={i} delay={start + 58 + i * 8}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 9 }}>
          <span style={{ fontFamily: FONT_BODY, fontSize: 19, color: ORANGE, fontWeight: 700 }}>{i + 1}.</span>
          <span style={{ fontFamily: FONT_BODY, fontSize: 19, lineHeight: 1.5, color: '#4b5563' }}>
            <strong style={{ color: '#1f2937' }}>{a.bold}</strong> {a.text}
          </span>
        </div>
      </In>
    ))}

    <In delay={start + 88}>
      <div
        style={{
          marginTop: 20,
          padding: 16,
          borderRadius: 14,
          background: 'linear-gradient(135deg, rgba(255,237,213,0.8), rgba(254,243,199,0.8))',
          border: '1px solid rgba(253,186,116,0.4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <IconLightbulb size={17} />
          <span style={{ fontFamily: FONT_BODY, fontSize: 15, fontWeight: 500, color: '#9a3412' }}>
            {LABELS.suggestedQuestions}
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {scene.questions.map((q) => (
            <span key={q} style={{ fontFamily: FONT_BODY, fontSize: 15, color: '#6b7280' }}>
              {q}
            </span>
          ))}
        </div>
      </div>
    </In>
  </div>
);

/** ── Intelliboard completo ─────────────────────────────────── */
export const Intelliboard: React.FC<{
  scene: Scene;
  /** frames */
  typeStart: number;
  typeEnd: number;
  answerStart: number;
  scrollStart: number;
  scrollEnd: number;
  scrollAmount: number;
}> = ({ scene, typeStart, typeEnd, answerStart, scrollStart, scrollEnd, scrollAmount }) => {
  const frame = useCurrentFrame();

  const typedChars = Math.floor(
    interpolate(frame, [typeStart, typeEnd], [0, scene.question.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const typing = frame >= typeStart && frame < typeEnd;
  const sent = frame >= typeEnd + 8;
  const inputValue = sent ? '' : scene.question.slice(0, typedChars);

  const sendPulse = interpolate(frame, [typeEnd, typeEnd + 5, typeEnd + 12], [1, 1.22, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const dotsVisible = frame >= typeEnd + 10 && frame < answerStart;
  const scrollY = interpolate(frame, [scrollStart, scrollEnd], [0, -scrollAmount], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: 1560,
        borderRadius: 18,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 34px 90px rgba(0,0,0,0.5)',
      }}
    >
      {/* Header */}
      <In
        delay={0}
        distance={0}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 26px',
          background: 'linear-gradient(135deg, #0F1F36, #1E4A94, #0F1F36)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ color: '#fb923c', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 28 }}>i6</span>
          <span style={{ color: '#fff', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 25, letterSpacing: '-0.02em' }}>
            Intelliboard
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#fb923c', fontFamily: FONT_BODY, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em' }}>
              VIVARIS COMÉRCIO E VAREJO
            </div>
            <div style={{ color: '#fff', fontFamily: FONT_BODY, fontSize: 14, fontWeight: 500 }}>Leonardo Chaves</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontFamily: FONT_BODY, fontSize: 12 }}>
              leonardo.chaves@vivaris.com
            </div>
          </div>
          <Img
            src={staticFile('images/avatar-ricardo.jpg')}
            style={{ width: 46, height: 46, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 0 0 2px rgba(255,255,255,0.4)' }}
          />
        </div>
      </In>

      {/* Corpo */}
      <div style={{ display: 'flex', height: 690, background: '#fff' }}>
        <Sidebar delay={5} />
        <FavBar delay={8} />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: '#fff' }}>
          {/* Chat */}
          <div style={{ flex: 1, overflow: 'hidden', padding: '26px 60px 0' }}>
            <div style={{ transform: `translateY(${scrollY}px)` }}>
              {/* Estado vazio */}
              {frame < typeEnd + 4 && (
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 150 }}>
                  <span style={{ fontFamily: FONT_BODY, fontSize: 26, color: '#d1d5db', fontWeight: 300, letterSpacing: '0.02em' }}>
                    Qual insight preditivo vamos descobrir hoje?
                  </span>
                </div>
              )}

              {/* Bolha do usuário */}
              {frame >= typeEnd + 4 && (
                <In delay={typeEnd + 4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,237,213,0.85), rgba(219,234,254,0.6))',
                      border: '1px solid rgba(229,231,235,0.7)',
                      borderRadius: 18,
                      padding: '12px 20px',
                      maxWidth: '80%',
                      fontFamily: FONT_BODY,
                      fontSize: 19,
                      color: '#1f2937',
                    }}
                  >
                    {scene.question}
                  </div>
                </In>
              )}

              {/* Pontinhos */}
              {dotsVisible && (
                <div style={{ display: 'flex', gap: 8, padding: '18px 6px' }}>
                  {[0, 1, 2].map((i) => {
                    const b = Math.sin((frame - i * 4) / 3) * 5;
                    return (
                      <div
                        key={i}
                        style={{
                          width: 11,
                          height: 11,
                          borderRadius: '50%',
                          background: ORANGE_SOFT,
                          transform: `translateY(${b}px)`,
                        }}
                      />
                    );
                  })}
                </div>
              )}

              {frame >= answerStart && (
                <div style={{ marginTop: 20 }}>
                  <Answer scene={scene} start={answerStart} />
                </div>
              )}
            </div>
          </div>

          {/* Barra de input */}
          <div
            style={{
              borderTop: '1px solid rgba(229,231,235,0.7)',
              background: 'rgba(255,255,255,0.97)',
              padding: '16px 22px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <IconBook size={22} />
            <IconRotate size={22} />
            <div
              style={{
                flex: 1,
                height: 54,
                borderRadius: 999,
                border: `1px solid ${typing ? ORANGE : '#e5e7eb'}`,
                boxShadow: typing ? '0 0 0 3px rgba(251,146,60,0.25)' : 'none',
                display: 'flex',
                alignItems: 'center',
                padding: '0 24px',
                fontFamily: FONT_BODY,
                fontSize: 19,
                color: inputValue ? '#374151' : '#d1d5db',
              }}
            >
              {inputValue || LABELS.placeholder}
              {typing ? <span style={{ color: ORANGE, marginLeft: 2 }}>|</span> : null}
            </div>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `scale(${sendPulse})`,
                boxShadow: `0 8px 22px rgba(249,115,22,${(0.3 * sendPulse).toFixed(2)})`,
              }}
            >
              <IconSend size={22} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
