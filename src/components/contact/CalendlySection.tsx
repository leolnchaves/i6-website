
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const CalendlySection = () => {
  const { t } = useLanguage();

  return (
    <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-orange-500 text-white">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4">
            Sometimes a quick chat is all it takes.
          </h3>
          <p className="text-lg opacity-90 mb-6">
            Let's cut to the chase: schedule a session with our experts now!
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
  );
};

export default CalendlySection;
