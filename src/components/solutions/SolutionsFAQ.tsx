import { memo, useCallback, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useLanguage } from '@/contexts/LanguageContext';
import { solutionsFaqContent } from '@/data/staticData/solutionsFaqData';

const SolutionsFAQ = memo(() => {
  const { language } = useLanguage();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const text = solutionsFaqContent[language];

  const handleCardClick = useCallback((index: number) => {
    setExpandedCard(prev => (prev === index ? null : index));
  }, []);

  return (
    <section className="py-16 relative" aria-labelledby="solutions-faq-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 id="solutions-faq-title" className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {text.title}
          </h2>
          <p className="text-xl text-white/60 leading-relaxed">
            {text.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {text.faqs.map((faq, index) => (
            <Collapsible
              key={faq.id}
              open={expandedCard === index}
              onOpenChange={() => handleCardClick(index)}
            >
              <div className="group relative h-full">
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/[0.07] transition-all duration-300 overflow-hidden h-full">
                  <CollapsibleTrigger className="w-full p-6 text-left transition-colors duration-200">
                    <div className="flex items-center justify-between group">
                      <div className="flex items-start space-x-4 flex-1 min-w-0">
                        <div className="flex-shrink-0 px-3 py-1.5 bg-[#F4845F]/10 border border-[#F4845F]/20 rounded-lg">
                          <span className="text-xs font-bold text-[#F4845F] whitespace-nowrap">
                            {text.productLabel[faq.product]}
                          </span>
                        </div>
                        <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-[#F4845F] transition-colors duration-200 leading-tight">
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`w-6 h-6 text-white/40 group-hover:text-[#F4845F] transition-all duration-300 flex-shrink-0 ml-4 ${
                          expandedCard === index ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t border-white/10">
                        <p className="whitespace-pre-wrap text-base text-white/60 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </div>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
});

SolutionsFAQ.displayName = 'SolutionsFAQ';

export default SolutionsFAQ;
