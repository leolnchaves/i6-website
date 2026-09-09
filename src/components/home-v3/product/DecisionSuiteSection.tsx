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

      {/* Pilares em cartões subordinados */}
      <div className="mt-4 grid gap-2 md:grid-cols-3">
        {copy.intro.pillars.map((pillar) => (
          <article
            key={pillar.title}
            className="rounded-2xl border border-border bg-secondary/50 p-2.5"
          >
            <h3 className="text-sm font-semibold text-foreground">{pillar.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-1">{pillar.body}</p>
          </article>
        ))}
      </div>

      {/* Explorador de decisões */}
      <div className="mt-8 md:mt-10">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
              {copy.products.eyebrow}
            </p>
            <h3 className="mt-2 text-xl font-semibold leading-snug text-foreground md:text-2xl">
              {copy.products.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {copy.products.description}
            </p>

            <div
              role="group"
              aria-label={copy.products.selectorLabel}
              className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1"
            >
              {copy.products.items.map((product) => {
                const isActive = product.id === active.id;
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => setActiveId(product.id)}
                    aria-pressed={isActive}
                    className={`relative min-w-0 overflow-hidden rounded-xl border px-3 py-2.5 pl-4 text-left transition-colors duration-300 ${
                      isActive
                        ? 'border-primary/40 bg-card shadow-[var(--sand-shadow-soft)]'
                        : 'border-border bg-secondary/40 hover:bg-card'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-y-0 left-0 w-1 rounded-l-xl transition-colors duration-300 ${
                        isActive ? 'bg-primary' : 'bg-transparent'
                      }`}
                    />
                    <span className={`block text-sm font-semibold ${isActive ? 'text-primary' : 'text-foreground'}`}>
                      {product.name}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] leading-snug text-muted-foreground">
                      {product.claim}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <article
            key={active.id}
            className="sand-card !rounded-3xl flex flex-col justify-between p-5 motion-safe:animate-sand-rise md:p-6"
          >
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {active.name}
              </p>
              <h4 className="mt-2 text-xl font-semibold leading-snug text-foreground md:text-2xl">
                {active.headline}
              </h4>

              <ul className="mt-4 grid gap-y-2 gap-x-4 border-t border-border pt-3 sm:grid-cols-2">
                {capabilities.map((capability) => (
                  <li key={capability} className="flex items-center gap-2 text-xs text-foreground">
                    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {capability}
                  </li>
                ))}
              </ul>

              <div className="mt-4 rounded-2xl bg-secondary p-3">
                <div className="grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
                  {flowSteps.map((step, index) => (
                    <div key={step.label} className="contents">
                      <div className={`rounded-xl p-2.5 text-center ${index === 1 ? 'bg-card shadow-[var(--sand-shadow-soft)]' : ''}`}>
                        <span className={`block text-[10px] font-semibold uppercase tracking-[0.16em] ${index === 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                          {step.label}
                        </span>
                        <span className="mt-1 block truncate text-xs font-medium leading-snug text-foreground">{step.value}</span>
                      </div>
                      {index < flowSteps.length - 1 && (
                        <div className="hidden items-center justify-center sm:flex" aria-hidden="true">
                          <ArrowRight size={14} className="text-primary" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={SUITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:brightness-110"
              >
                {contactCopy.suiteCta}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <Link
                to={localized('/contact')}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-foreground px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                {contactCopy.contact}
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default DecisionSuiteSection;
