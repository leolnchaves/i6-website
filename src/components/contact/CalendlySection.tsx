
import { Calendar, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const CalendlySection = () => {
  const { t } = useLanguage();

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {t('contact.calendly.title')}
          </h3>
          <p className="text-gray-600 mb-8">
            {t('contact.calendly.description')}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-gray-600">
            <Clock className="w-5 h-5 text-blue-600" />
            <span>30-45 minutes consultation</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Users className="w-5 h-5 text-blue-600" />
            <span>Meet with our AI experts</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span>Flexible scheduling options</span>
          </div>
        </div>

        <Button 
          size="lg" 
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4"
        >
          Schedule Free Consultation
        </Button>

        <p className="text-sm text-gray-500 text-center mt-4">
          No commitment required • Free consultation
        </p>
      </CardContent>
    </Card>
  );
};

export default CalendlySection;
