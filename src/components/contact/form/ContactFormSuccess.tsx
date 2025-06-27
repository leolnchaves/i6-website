
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactFormSuccess = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center py-8">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('contact.form.messageSent')}</h3>
      <p className="text-gray-600">
        {t('contact.form.thankYou')}
      </p>
    </div>
  );
};

export default ContactFormSuccess;
