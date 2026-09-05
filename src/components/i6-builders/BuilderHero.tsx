import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { builderCopy, CONTACT_ANCHOR } from '@/data/i6Builders/content';
import { useTypewriter } from '@/hooks/useTypewriter';

/**
 * Abertura editorial: título à esquerda, painel de código à direita.
 * O painel de código usa animação typewriter caractere a caractere, em loop,
 * sem interação do usuário (hover/foco apenas congelam). Cada linha tem uma
 * camada "fantasma" invisível com o texto completo, reservando a largura final
 * desde o primeiro frame — o texto digitado é sobreposto por cima, sem reflow.
 * O bloco animado é decorativo (aria-hidden); o código completo fica em sr-only
 * para leitores de tela. Com prefers-reduced-motion, o bloco principal mostra
 * tudo imediatamente e serve de fonte acessível.
 */
const BuilderHero = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, builderCopy).hero;
  const { typedCount, isDone, reducedMotion, setPaused } = useTypewriter(copy.codeLines);

  const [before, after] = copy.title.split(copy.highlight);
  const fullCode = copy.codeLines.join('\n');

  // Offset inicial de cada linha dentro do texto completo (+1 pela quebra de linha)
  const lineOffsets: number[] = [];
  copy.codeLines.reduce((acc, line, i) => {
    lineOffsets[i] = acc;
    return acc + line.length + 1;
  }, 0);

  // Linha onde o cursor está agora
  const activeLine = reducedMotion
    ? copy.codeLines.length - 1
    : isDone
      ? copy.codeLines.length - 1
      : copy.codeLines.reduce(
          (found, line, i) => (typedCount >= lineOffsets[i] ? i : found),
          0,
        );


  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 sand-glow" />
      <div className="relative container mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          <div className="animate-sand-rise">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-5">{copy.eyebrow}</p>
            <h1 className="text-4xl md:text-[3.4rem] leading-[1.06] font-bold text-foreground">
              {before}
              <span className="text-primary">{copy.highlight}</span>
              {after}
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">{copy.sub}</p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href={CONTACT_ANCHOR}
                className="group inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {copy.cta}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-medium text-foreground/60">
                {copy.badges.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span aria-hidden className="h-1 w-1 rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Painel de código — assinatura visual da página */}
          <div className="relative">
            <div className="overflow-hidden rounded-[calc(var(--radius)+6px)] border border-[#0B1224]/15 bg-[#0B1224] shadow-[var(--sand-shadow-lift)]">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
                <span aria-hidden className="h-2 w-2 rounded-full bg-[#F4845F]/80" />
                <span aria-hidden className="h-2 w-2 rounded-full bg-white/20" />
                <span aria-hidden className="h-2 w-2 rounded-full bg-white/20" />
                <span className="ml-2 font-mono text-[11px] tracking-wide text-white/45">{copy.codeTitle}</span>
              </div>

              {/* Código completo para leitores de tela quando a animação está ativa */}
              {!reducedMotion && (
                <pre className="sr-only">{fullCode}</pre>
              )}

              <pre
                aria-hidden={!reducedMotion}
                tabIndex={reducedMotion ? undefined : 0}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocus={() => setPaused(true)}
                onBlur={() => setPaused(false)}
                className="overflow-x-auto px-5 py-6 font-mono text-[12.5px] leading-[1.85] text-white/80 outline-none"
              >
                <code>
                  {copy.codeLines.map((line, i) => {
                    const isComment = line.startsWith('#');
                    const typed = reducedMotion
                      ? line.length
                      : Math.max(0, Math.min(line.length, typedCount - lineOffsets[i]));
                    const showCursor = !reducedMotion && i === activeLine;

                    return (
                      <span key={`${i}-${line}`} className="relative block whitespace-pre">
                        {/* Camada fantasma: reserva a largura/quebra final da linha */}
                        <span aria-hidden className="invisible">
                          {line.length ? line : '\u00A0'}
                        </span>

                        {/* Camada digitada, sobreposta */}
                        <span
                          className={`absolute inset-0 whitespace-pre ${isComment ? 'text-white/35' : ''}`}
                        >
                          {line.slice(0, typed)}
                          {showCursor && (
                            <span
                              aria-hidden
                              className={`ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-white/70 ${isDone ? 'animate-pulse' : ''}`}
                            />
                          )}
                        </span>
                      </span>
                    );
                  })}
                </code>
              </pre>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderHero;
