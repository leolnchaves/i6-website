import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang, useLocalizedPath } from '@/utils/localizedPath';
import { Link } from 'react-router-dom';

const ctaCopyByLang = {
  pt: { suiteCta: 'Contratar a i6 Decision Suite', contact: 'Falar com especialista' },
  en: { suiteCta: 'Get the i6 Decision Suite', contact: 'Talk to an expert' },
  es: { suiteCta: 'Contratar la i6 Decision Suite', contact: 'Hablar con un especialista' },
};
import { suiteCopy, SUITE_URL } from './suiteContent';

const ProductSuite = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, suiteCopy).products;
  const localized = useLocalizedPath();
  const contactCopy = pickLang(language, ctaCopyByLang);
  const [activeId, setActiveId] = useState(copy.items[0].id);

  const active = copy.items.find((p) => p.id === activeId) ?? copy.items[0];

  const flowSteps = [
    { label: copy.flowLabels.input, value: active.flow.input },
    { label: copy.flowLabels.decision, value: active.flow.decision },
    { label: copy.flowLabels.value, value: active.flow.value },
  ];

  return (
    <section className="container mx-auto px-6 py-20 md:py-28">
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary mb-4">
          {copy.eyebrow}
        </p>
        <h2 className="text-3xl md:text-[2.6rem] leading-[1.12] font-bold text-foreground">
          {copy.title}
        </h2>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
          {copy.description}
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
        {/* Selector */}
        <div
          role="group"
          aria-label={copy.selectorLabel}
          className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 -mx-1 px-1 snap-x"
        >
          {copy.items.map((product) => {
            const isActive = product.id === active.id;
            return (
              <button
                key={product.id}
                type="button"
                onClick={() => setActiveId(product.id)}
                aria-pressed={isActive}
                className={`snap-start shrink-0 lg:shrink text-left rounded-[var(--radius)] border px-4 py-3 transition-colors duration-300 min-w-[168px] lg:min-w-0 lg:w-full ${
                  isActive
                    ? 'border-primary/45 bg-card shadow-[var(--sand-shadow-soft)]'
                    : 'border-border bg-secondary/40 hover:bg-card'
                }`}
              >
                <span
                  className={`block text-sm font-semibold ${
                    isActive ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {product.name}
                </span>
                <span className="mt-1 hidden lg:block text-xs leading-snug text-muted-foreground">
                  {product.claim}
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <article key={active.id} className="sand-card p-7 md:p-9 motion-safe:animate-sand-rise">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {active.name}
          </p>
          <h3 className="mt-3 text-xl md:text-2xl font-semibold leading-snug text-foreground">
            {active.headline}
          </h3>
          <p className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground">
            {active.body}
          </p>

          <p className="mt-4 border-l-2 border-primary/40 pl-4 text-sm leading-relaxed text-foreground/80">
            {active.pain}
          </p>

          <p className="mt-6 text-xs leading-relaxed text-muted-foreground/90 border-t border-border pt-5">
            {active.capabilities}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {flowSteps.map((step, i) => (
              <div key={step.label} className="rounded-[var(--radius)] bg-secondary/60 p-4">
                <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                  {step.label}
                  {i < flowSteps.length - 1 && (
                    <ArrowRight size={11} className="text-muted-foreground/60" aria-hidden="true" />
                  )}
                </span>
                <span className="mt-2 block text-xs leading-snug text-foreground">{step.value}</span>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <a
          href={SUITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          {contactCopy.suiteCta}
          <ArrowUpRight size={16} />
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

export default ProductSuite;
