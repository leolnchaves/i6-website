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
    { label: copy.products.flowLabels.input, value: active.flow.input },
    { label: copy.products.flowLabels.decision, value: active.flow.decision },
    { label: copy.products.flowLabels.value, value: active.flow.value },
  ];

  return (
    <section id="decision-suite" className="scroll-mt-24 container mx-auto px-6 py-20 md:py-28">
      {/* Abertura única */}
      <div className="max-w-3xl">
        <img
          src={getPublicAssetUrl('content/logos/i6-decision-suite-logo.png')}
          alt="i6 Decision Suite"
          className="mb-5 h-7 w-auto sm:h-8"
          draggable={false}
        />
        <h2 className="text-3xl font-bold leading-[1.12] text-foreground md:text-[2.6rem]">
          {copy.intro.title}
        </h2>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          {copy.intro.description}
        </p>
      </div>

      {/* Pilares em faixa horizontal */}
      <div className="mt-12 grid gap-8 md:mt-14 md:grid-cols-3">
        {copy.intro.pillars.map((pillar) => (
          <article key={pillar.title} className="border-t border-border pt-5">
            <h3 className="text-sm font-semibold text-foreground">{pillar.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
          </article>
        ))}
      </div>

      {/* Explorador de decisões */}
      <div className="mt-16 md:mt-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
          {copy.products.eyebrow}
        </p>
        <h3 className="mt-3 text-xl font-semibold leading-snug text-foreground md:text-2xl">
          {copy.products.title}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {copy.products.description}
        </p>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
          <div
            role="group"
            aria-label={copy.products.selectorLabel}
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1"
          >
            {copy.products.items.map((product) => {
              const isActive = product.id === active.id;
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setActiveId(product.id)}
                  aria-pressed={isActive}
                  className={`relative min-w-0 overflow-hidden rounded-[var(--radius)] border px-4 py-3 pl-5 text-left transition-colors duration-300 ${
                    isActive
                      ? 'border-primary/40 bg-card shadow-[var(--sand-shadow-soft)]'
                      : 'border-border bg-secondary/40 hover:bg-card'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 w-0.5 transition-colors duration-300 ${
                      isActive ? 'bg-primary' : 'bg-transparent'
                    }`}
                  />
                  <span className={`block text-sm font-semibold ${isActive ? 'text-primary' : 'text-foreground'}`}>
                    {product.name}
                  </span>
                  {isActive && (
                    <span className="mt-1 block text-xs leading-snug text-muted-foreground">
                      {product.claim}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <article key={active.id} className="sand-card p-7 motion-safe:animate-sand-rise md:p-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {active.name}
            </p>
            <h4 className="mt-3 text-xl font-semibold leading-snug text-foreground md:text-2xl">
              {active.headline}
            </h4>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{active.body}</p>
            <p className="mt-4 border-l-2 border-primary/40 pl-4 text-sm leading-relaxed text-foreground/80">
              {active.pain}
            </p>
            <p className="mt-6 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground/90">
              {active.capabilities}
            </p>

            <div className="mt-6 grid items-stretch gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
              {flowSteps.map((step, index) => (
                <div key={step.label} className="contents">
                  <div className="rounded-[var(--radius)] bg-secondary/60 p-4">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                      {step.label}
                    </span>
                    <span className="mt-2 block text-xs leading-snug text-foreground">{step.value}</span>
                  </div>
                  {index < flowSteps.length - 1 && (
                    <div className="hidden items-center justify-center sm:flex" aria-hidden="true">
                      <ArrowRight size={14} className="text-muted-foreground/60" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>

      {/* CTAs da seção */}
      <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
        <a
          href={SUITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          {contactCopy.suiteCta}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <Link
          to={localized('/contact')}
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40"
        >
          {contactCopy.contact}
        </Link>
      </div>
    </section>
  );
};

export default DecisionSuiteSection;
