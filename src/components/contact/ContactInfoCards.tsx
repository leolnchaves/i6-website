
import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactInfoCards = () => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: t('contact.info.emailUs'),
      details: "infinity6@infinity6.ai",
      description: t('contact.info.emailDescription')
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: t('contact.info.callUs'),
      details: "+55 19 998197775",
      description: t('contact.info.callDescription')
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t('contact.info.visitUs'),
      details: "Campinas, BR",
      description: t('contact.info.visitDescription')
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {contactInfo.map((info, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <CardContent className="p-8">
                <div className="flex justify-center text-blue-600 mb-4">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-xl font-bold text-gray-900 mb-1">{info.details}</p>
                <p className="text-gray-600 text-sm">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfoCards;
