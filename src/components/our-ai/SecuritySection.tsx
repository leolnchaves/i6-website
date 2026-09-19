import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLocalizedPath } from '@/utils/localizedPath';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['security'];
}

/** Segurança e conformidade por design — conteúdo mantido, tema areia. */
const SecuritySection = memo(({ content }: Props) => {
  const localized = useLocalizedPath();
  return (
    <section className="container mx-auto px-6 py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">{content.eyebrow}</p>
          <h2 className="mt-4 text-3xl md:text-[2.4rem] font-bold leading-[1.14] text-foreground">{content.title}</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{content.lead}</p>
          {/* Atalho de Governança → /contact com assunto "Outro" e mensagem pré-preenchida */}
          <p className="mt-8 max-w-xl text-sm text-muted-foreground">{content.ctaQuestion}</p>
          <Link
            to={`${localized('/contact')}?intent=security#contact-form`}
            className="group mt-2.5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            {content.ctaLink}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {content.pillars.map((p) => (
            <div key={p.title} className="sand-card p-6">
              <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

SecuritySection.displayName = 'SecuritySection';
export default SecuritySection;
