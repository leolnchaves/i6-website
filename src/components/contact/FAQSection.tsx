
import { useState, useEffect } from 'react';
import { Search, Plus, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSPageContent } from '@/hooks/useCMSPageContent';
import { useCMSFAQCards } from '@/hooks/useCMSFAQCards';
import { useCMSContent } from '@/hooks/useCMSContent';

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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600">
            {subtitle}
          </p>
        </div>

        {/* Search Filter */}
        <div className="max-w-2xl mx-auto mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
            {searchTitle}
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredFaqs.map((faq, index) => (
            <Card 
              key={faq.id} 
              className="cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white rounded-xl overflow-hidden"
              onClick={() => handleCardClick(index)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 pr-4 leading-tight flex-1">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 ml-2">
                    {expandedCard === index ? (
                      <Minus className="w-5 h-5 text-blue-500" />
                    ) : (
                      <Plus className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                </div>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  expandedCard === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pt-2 border-t border-gray-100 mt-3">
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">
              {noResults}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
