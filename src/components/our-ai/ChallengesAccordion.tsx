import { memo } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { OurAIContent } from '@/data/staticData/ourAIContent';

interface Props {
  content: OurAIContent['challenges'];
}

const ChallengesAccordion = memo(({ content }: Props) => {
  return (
    <section className="relative py-20 md:py-28 bg-[#0A101F]">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{content.title}</h2>
          <p className="text-sm md:text-base text-white/55 leading-relaxed max-w-2xl mx-auto">
            {content.lead}
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {content.rows.map((row, idx) => (
            <AccordionItem
              key={row.challenge}
              value={`challenge-${idx}`}
              className="border border-white/10 rounded-lg bg-white/[0.02] px-5 data-[state=open]:border-[#F4845F]/30 transition-colors"
            >
              <AccordionTrigger className="text-left hover:no-underline py-4 text-sm md:text-base font-semibold text-white hover:text-[#F4845F] transition-colors [&[data-state=open]]:text-[#F4845F]">
                <span className="flex items-center gap-4">
                  <span className="text-[#F4845F]/70 font-mono text-xs w-6 shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {row.challenge}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pt-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-10">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-1.5">
                      {content.headers.learning}
                    </p>
                    <p className="text-sm text-white/70 leading-relaxed italic">{row.learning}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#F4845F]/80 mb-1.5">
                      {content.headers.resolution}
                    </p>
                    <p className="text-sm text-white/70 leading-relaxed">{row.resolution}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
});

ChallengesAccordion.displayName = 'ChallengesAccordion';
export default ChallengesAccordion;
