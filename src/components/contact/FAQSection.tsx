import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import { pickLang } from '@/utils/localizedPath';
import { contactCopy } from '@/data/contact/content';

/**
 * Perguntas frequentes de /contact em acordeão (um item aberto por vez).
 * Textos centralizados em src/data/contact/content.ts (PT/EN/ES).
 */
const FAQSection = () => {
  const { language } = useLanguage();
  const copy = pickLang(language, contactCopy).faq;

  return (
    <section className="border-t border-border py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
              {copy.eyebrow}
            </p>
            <h2 className="text-3xl font-bold leading-[1.14] text-foreground md:text-[2.4rem]">
              {copy.title}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              {copy.sub}
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full border-t border-border">
            {copy.items.map((item) => (
              <AccordionItem key={item.id} value={`faq-${item.id}`} className="border-b border-border">
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-foreground hover:text-primary hover:no-underline md:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 pr-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
