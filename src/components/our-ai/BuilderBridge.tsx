import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLocalizedPath } from '@/utils/localizedPath';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['builder'];
}

/** Faixa grafite: ponte para a camada de abstração (/i6-builders). */
const BuilderBridge = memo(({ content }: Props) => {
  const localized = useLocalizedPath();

  return (
    <section className="bg-[hsl(24_10%_14%)] py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">{content.eyebrow}</p>
            <h2 className="mt-4 text-3xl md:text-[2.4rem] font-bold leading-[1.14] text-[hsl(36_43%_98%)]">
              {content.title}
            </h2>
            <Link
              to={localized('/i6-builders')}
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              {content.cta}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>
          </div>

          <div>
            <p className="text-base md:text-lg leading-relaxed text-[hsl(36_20%_82%)]">{content.lead}</p>
            <dl className="mt-8 border-t border-[hsl(36_20%_82%/0.18)]">
              {content.bullets.map((b) => (
                <div
                  key={b.title}
                  className="grid gap-1 border-b border-[hsl(36_20%_82%/0.18)] py-5 md:grid-cols-[7rem_1fr] md:gap-8"
                >
                  <dt className="text-sm font-semibold text-[hsl(36_43%_98%)]">{b.title}</dt>
                  <dd className="text-sm leading-relaxed text-[hsl(36_20%_82%/0.85)]">{b.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
});

BuilderBridge.displayName = 'BuilderBridge';
export default BuilderBridge;
