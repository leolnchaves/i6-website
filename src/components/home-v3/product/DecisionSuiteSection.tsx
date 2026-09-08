import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getPublicAssetUrl } from '@/utils/assetUtils';
import { pickLang, useLocalizedPath } from '@/utils/localizedPath';
import { suiteCopy, SUITE_URL } from './suiteContent';

const ctaCopyByLang = {
  pt: { suiteCta: 'Contratar a i6 Decision Suite', contact: 'Falar com especialista' },
  en: { suiteCta: 'Get the i6 Decision Suite', contact: 'Talk to an expert' },
  es: { suiteCta: 'Contratar la i6 Decision Suite', contact: 'Hablar con un especialista' },
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
      <div className="grid items-start gap-16 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] xl:gap-20">
        <div>
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

          <div className="mt-10 grid gap-4">
            {copy.intro.pillars.map((pillar) => (
              <article key={pillar.title} className="sand-card sand-card-hover p-6">
                <h3 className="text-base font-semibold text-foreground">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
            {copy.products.eyebrow}
          </p>
          <h2 className="text-3xl font-bold leading-[1.12] text-foreground md:text-[2.6rem]">
            {copy.products.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {copy.products.description}
          </p>

          <div
            role="group"
            aria-label={copy.products.selectorLabel}
            className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3"
          >
            {copy.products.items.map((product) => {
              const isActive = product.id === active.id;
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setActiveId(product.id)}
                  aria-pressed={isActive}
                  className={`min-w-0 rounded-[var(--radius)] border px-4 py-3 text-left transition-colors duration-300 ${
                    isActive
                      ? 'border-primary/45 bg-card shadow-[var(--sand-shadow-soft)]'
                      : 'border-border bg-secondary/40 hover:bg-card'
                  }`}
                >
                  <span className={`block text-sm font-semibold ${isActive ? 'text-primary' : 'text-foreground'}`}>
                    {product.name}
                  </span>
                  <span className="mt-1 hidden text-xs leading-snug text-muted-foreground sm:block">
                    {product.claim}
                  </span>
                </button>
              );
            })}
          </div>

          <article key={active.id} className="sand-card mt-6 p-7 motion-safe:animate-sand-rise md:p-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {active.name}
            </p>
            <h3 className="mt-3 text-xl font-semibold leading-snug text-foreground md:text-2xl">
              {active.headline}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{active.body}</p>
            <p className="mt-4 border-l-2 border-primary/40 pl-4 text-sm leading-relaxed text-foreground/80">
              {active.pain}
            </p>
            <p className="mt-6 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground/90">
              {active.capabilities}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {flowSteps.map((step, index) => (
                <div key={step.label} className="rounded-[var(--radius)] bg-secondary/60 p-4">
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                    {step.label}
                    {index < flowSteps.length - 1 && (
                      <ArrowRight size={11} className="text-muted-foreground/60" aria-hidden="true" />
                    )}
                  </span>
                  <span className="mt-2 block text-xs leading-snug text-foreground">{step.value}</span>
                </div>
              ))}
            </div>
          </article>

          <div className="mt-10 flex flex-wrap items-center gap-3">
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
        </div>
      </div>
    </section>
  );
};

export default DecisionSuiteSection;