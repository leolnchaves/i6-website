
import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import ContactFormFields from './form/ContactFormFields';
import ContactFormSuccess from './form/ContactFormSuccess';

const ContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <Card className="border-0 shadow-2xl">
      <CardHeader className="p-8">
        <CardTitle className="text-2xl font-bold text-gray-900">
          {t('contact.form.growthMessage')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        {isSubmitted ? (
          <ContactFormSuccess />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <ContactFormFields 
              formData={formData}
              handleInputChange={handleInputChange}
            />

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-lg py-3"
            >
              {t('contact.form.sendMessage')}
              <Send className="ml-2 w-4 h-4" />
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactForm;
