
import { useState, useEffect } from 'react';
import { Search, ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSPageContent } from '@/hooks/useCMSPageContent';
import { useCMSFAQCards } from '@/hooks/useCMSFAQCards';
import { useCMSContent } from '@/hooks/useCMSContent';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const FAQSection = () => {
  const { language, t } = useLanguage();
  const { getContent } = useCMSPageContent('contact', language);
  const { pages, fetchPages } = useCMSContent();
  const { cards, fetchCards } = useCMSFAQCards();
  const [pageId, setPageId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  useEffect(() => {
    if (pages.length > 0) {
      const contactPage = pages.find(p => p.slug === 'contact');
      if (contactPage) {
        setPageId(contactPage.id);
        fetchCards(contactPage.id, language);
      }
    }
  }, [pages, language, fetchCards]);

  const filteredFaqs = cards.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  // Get content from CMS with fallbacks
  const title = getContent('contactFAQ', 'title', t('contact.faq.title'));
  const subtitle = getContent('contactFAQ', 'subtitle', t('contact.faq.subtitle'));
  const searchTitle = getContent('contactFAQ', 'searchTitle', t('contact.faq.searchTitle'));
  const searchPlaceholder = getContent('contactFAQ', 'searchPlaceholder', t('contact.faq.searchPlaceholder'));
  const noResults = getContent('contactFAQ', 'noResults', t('contact.faq.noResults'));

  return (
    <section className="py-24 bg-gradient-to-b from-background to-accent/5 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:40px_40px] opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Enhanced Search */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-1 shadow-lg">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
                <Input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-transparent border-0 rounded-xl focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/60"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Cards */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.map((faq, index) => (
            <Collapsible
              key={faq.id}
              open={expandedCard === index}
              onOpenChange={() => handleCardClick(index)}
            >
              <div className="group relative">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                
                <div className="relative bg-card/90 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CollapsibleTrigger className="w-full p-6 text-left hover:bg-accent/30 transition-colors duration-200">
                    <div className="flex items-center justify-between group">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200 leading-tight">
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown 
                        className={`w-6 h-6 text-muted-foreground group-hover:text-primary transition-all duration-300 flex-shrink-0 ml-4 ${
                          expandedCard === index ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                    <div className="px-6 pb-6">
                      <div className="ml-14 pt-4 border-t border-border/50">
                        <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                          <p className="whitespace-pre-wrap text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </div>
            </Collapsible>
          ))}
        </div>

        {/* No Results State */}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-muted/50 rounded-2xl mb-6">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-xl text-muted-foreground">
              {noResults}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
