
import { useState } from 'react';
import { Search, Plus, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

const FAQSection = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const faqs = [
    {
      question: t('contact.faq.q1'),
      answer: t('contact.faq.a1')
    },
    {
      question: t('contact.faq.q2'),
      answer: t('contact.faq.a2')
    },
    {
      question: t('contact.faq.q3'),
      answer: t('contact.faq.a3')
    },
    {
      question: t('contact.faq.q4'),
      answer: t('contact.faq.a4')
    },
    {
      question: t('contact.faq.q5'),
      answer: t('contact.faq.a5')
    },
    {
      question: t('contact.faq.q6'),
      answer: t('contact.faq.a6')
    },
    {
      question: t('contact.faq.q7'),
      answer: t('contact.faq.a7')
    },
    {
      question: t('contact.faq.q8'),
      answer: t('contact.faq.a8')
    },
    {
      question: t('contact.faq.q9'),
      answer: t('contact.faq.a9')
    },
    {
      question: t('contact.faq.q10'),
      answer: t('contact.faq.a10')
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('contact.faq.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('contact.faq.subtitle')}
          </p>
        </div>

        {/* Search Filter */}
        <div className="max-w-2xl mx-auto mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
            {t('contact.faq.searchTitle')}
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder={t('contact.faq.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredFaqs.map((faq, index) => (
            <Card 
              key={index} 
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
                    <p className="text-gray-600 leading-relaxed">
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
              {t('contact.faq.noResults')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
