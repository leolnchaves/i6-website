
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

const FAQSection = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      question: "How long does AI implementation take?",
      answer: "Implementation time varies depending on the project's complexity. Most of our clients see full deployment within 1 to 3 months, with measurable results starting in just a few weeks."
    },
    {
      question: "What industries do you serve?",
      answer: "We serve a wide range of industries, including retail, manufacturing, finance, healthcare, pharma, education and technology, always with a business-first approach."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes. We offer 24/7 support, proactive monitoring, maintenance and continuous optimization for all our AI solutions."
    },
    {
      question: "What's the typical ROI for your AI solutions?",
      answer: "Our clients commonly see up to 20x ROI within the first year, driven by increased efficiency, smarter decisions and revenue growth."
    },
    {
      question: "What kind of data do I need to get started?",
      answer: "We work with the data you already have, including behavioral, transactional, CRM or supply data. All data is 100% anonymized and handled securely. Our models are robust to gaps and can deliver value even with unstructured datasets. The first model training is conducted using a sample of your data, without requiring full integration."
    },
    {
      question: "Can your AI models integrate with our existing systems?",
      answer: "Yes. The Compass Suite is API-first and cloud-based, making it easy to connect with ERPs, CRMs, e-commerce platforms and internal data sources."
    },
    {
      question: "Do I need a data science team to use your solutions?",
      answer: "No. Our solutions are designed to be used by business teams. We take care of the AI complexity so your team can focus on action and results."
    },
    {
      question: "Is your AI explainable and compliant with data privacy regulations?",
      answer: "Absolutely. All our models include explainability layers to ensure transparency and trust. We are compliant with GDPR, LGPD and other global data privacy standards."
    },
    {
      question: "What makes Infinity6 different from other AI companies?",
      answer: "We combine predictive intelligence with real-time action, enabling smart decisions across the entire journey - with fast integration, measurable results and no heavy tech lift. We also offer a free test phase, proving the concrete potential of results before any cost is incurred."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            Search FAQs
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Type to search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredFaqs.map((faq, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">
              No FAQs found matching your search. Try different keywords.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
