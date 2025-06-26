
import { Card, CardContent } from '@/components/ui/card';

const FAQSection = () => {
  const faqs = [
    {
      question: "How long does AI implementation take?",
      answer: "Implementation time varies by project complexity, typically ranging from 2-6 months for full deployment."
    },
    {
      question: "What industries do you serve?",
      answer: "We serve all industries including manufacturing, finance, healthcare, retail, and technology companies."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, we offer 24/7 support, maintenance, and continuous optimization services for all our AI solutions."
    },
    {
      question: "What's the typical ROI for AI projects?",
      answer: "Our clients typically see 150% ROI within the first year, with continued improvements over time."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Common questions about our AI solutions and services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
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
      </div>
    </section>
  );
};

export default FAQSection;
