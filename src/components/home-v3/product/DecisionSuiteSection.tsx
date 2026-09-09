import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getPublicAssetUrl } from '@/utils/assetUtils';
import { pickLang, useLocalizedPath } from '@/utils/localizedPath';
import { suiteCopy, SUITE_URL } from './suiteContent';

const ctaCopyByLang = {
  pt: { suiteCta: 'Conhecer a i6 Decision Suite', contact: 'Falar com especialista' },
  en: { suiteCta: 'Discover the i6 Decision Suite', contact: 'Talk to an expert' },
  es: { suiteCta: 'Conocer la i6 Decision Suite', contact: 'Hablar con un especialista' },
};

const DecisionSuiteSection = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, suiteCopy);
  const contactCopy = pickLang(language, ctaCopyByLang);
  const localized = useLocalizedPath();
  const [activeId, setActiveId] = useState(copy.products.items[0].id);
  const active = copy.products.items.find((product) => product.id === activeId) ?? copy.products.items[0];

  const flowSteps = [
    {
      label: copy.products.flowLabels.input,
      value: active.flow.input,
      pillar: copy.intro.pillars[0]?.title,
    },
    {
      label: copy.products.flowLabels.decision,
      value: active.flow.decision,
      pillar: copy.intro.pillars[1]?.title,
    },
    {
      label: copy.products.flowLabels.value,
      value: active.flow.value,
      pillar: copy.intro.pillars[2]?.title,
    },
  ];

  const capabilities = active.capabilities
    .split('·')
    .map((capability) => capability.trim())
    .slice(0, 4);

  return (
    <section id="decision-suite" className="scroll-mt-24 container mx-auto px-6 py-8 md:py-10">
      {/* Abertura única */}
      <div className="max-w-3xl">
        <img
          src={getPublicAssetUrl('content/logos/i6-decision-suite-logo.png')}
          alt="i6 Decision Suite"
          className="mb-3 h-6 w-auto sm:h-7"
          draggable={false}
        />
        <h2 className="text-2xl font-bold leading-[1.12] text-foreground md:text-[2.25rem]">
          {copy.intro.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
          {copy.intro.description}
        </p>
      </div>

      {/* Explorador de decisões */}
      <div className="mt-5 md:mt-6">
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {copy.products.description}
        </p>

        <div className="mt-4 grid items-start gap-5 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-stretch lg:gap-0">
          <div className="flex flex-col lg:h-full">
            <div
              role="group"
              aria-label={copy.products.selectorLabel}
              className="relative grid grid-cols-2 gap-2 sm:grid-cols-3 lg:z-20 lg:flex lg:h-full lg:flex-1 lg:flex-col lg:gap-0"
            >
              {copy.products.items.map((product) => {
                const isActive = product.id === active.id;
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => setActiveId(product.id)}
                    aria-pressed={isActive}
                    className={`relative min-w-0 overflow-hidden px-3 py-2 pl-4 text-left transition-colors duration-300 ${
                      isActive
                        ? 'rounded-xl border border-primary/40 bg-card shadow-[var(--sand-shadow-soft)] lg:z-30 lg:overflow-visible lg:rounded-l-[14px] lg:rounded-r-none lg:border-0 lg:border-b-0 lg:py-3 lg:shadow-[-20px_10px_40px_-15px_rgba(74,68,63,0.1)]'
                        : 'rounded-xl border border-border bg-secondary/40 hover:bg-card lg:rounded-none lg:border-0 lg:border-b lg:border-foreground/5 lg:bg-transparent lg:py-3 lg:opacity-60 lg:hover:bg-transparent lg:hover:opacity-100 lg:last:border-b-0'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-y-0 left-0 w-1 rounded-l-xl transition-colors duration-300 ${
                        isActive ? 'bg-primary lg:rounded-l-[10px]' : 'bg-transparent'
                      }`}
                    />
                    <span className={`block text-sm font-semibold ${isActive ? 'text-primary' : 'text-foreground'}`}>
                      {product.name}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] leading-snug text-muted-foreground">
                      {product.claim}
                    </span>
                    {/* Ponte de emenda: cobre a borda esquerda do painel */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 -right-px z-30 hidden w-4 bg-card lg:block"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <article
            key={active.id}
            className="relative flex flex-col rounded-3xl bg-card p-4 shadow-[var(--sand-shadow-soft)] motion-safe:animate-sand-rise md:p-5 lg:z-10 lg:h-full lg:shadow-[20px_20px_60px_-10px_rgba(74,68,63,0.08)]"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {active.name}
            </p>
            <h4 className="mt-1.5 text-lg font-semibold leading-snug text-foreground md:text-xl">
              {active.headline}
            </h4>

            <ul className="mt-3 grid gap-y-1.5 gap-x-4 border-t border-border pt-2.5 sm:grid-cols-2">
              {capabilities.map((capability) => (
                <li key={capability} className="flex items-center gap-2 text-xs text-foreground">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {capability}
                </li>
              ))}
            </ul>

            <div className="mt-3 rounded-2xl bg-secondary p-2.5">
              <div className="grid items-stretch gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
                {flowSteps.map((step, index) => (
                  <div key={step.label} className="contents">
                    <div className={`rounded-xl p-2 text-center ${index === 1 ? 'bg-card shadow-[var(--sand-shadow-soft)]' : ''}`}>
                      {step.pillar && (
                        <span className="block text-[10px] font-medium leading-snug text-muted-foreground">
                          {step.pillar}
                        </span>
                      )}
                      <span className={`mt-1 block text-[10px] font-semibold uppercase tracking-[0.16em] ${index === 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                        {step.label}
                      </span>
                      <span className="mt-0.5 block text-[11px] font-medium leading-snug text-foreground">{step.value}</span>
                    </div>
                    {index < flowSteps.length - 1 && (
                      <div className="hidden items-center justify-center sm:flex" aria-hidden="true">
                        <ArrowRight size={12} className="text-primary" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* CTAs da seção */}
      <div className="mt-5 flex flex-wrap items-center justify-start gap-2.5">
        <a
          href={SUITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:brightness-110"
        >
          {contactCopy.suiteCta}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <Link
          to={localized('/contact')}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          {contactCopy.contact}
        </Link>
      </div>
    </section>
  );
};

export default DecisionSuiteSection;
