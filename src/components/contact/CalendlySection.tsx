
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const CalendlySection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-orange-500 text-white max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">
                Let's kickstart your AI transformation.
              </h3>
              <p className="text-lg opacity-90 mb-6">
                Schedule a free session with our experts and unlock what's next for your business.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <iframe
                src="https://calendly.com/leo-infinity6/30min"
                width="100%"
                height="600"
                frameBorder="0"
                title="Schedule a meeting"
                className="rounded-lg"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CalendlySection;
