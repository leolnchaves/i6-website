import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

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
          Let's Start a Conversation
        </CardTitle>
        <div className="space-y-2">
          <p className="text-xl font-semibold text-gray-800">
            Your AI journey starts here!
          </p>
          <p className="text-gray-600">
            Let our experts guide you from insight to impact.
          </p>
          <p className="text-gray-600">
            Let's build intelligent growth — together.
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        {isSubmitted ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('contact.form.messageSent')}</h3>
            <p className="text-gray-600">
              {t('contact.form.thankYou')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.fullName')} *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder={t('contact.form.namePlaceholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.emailAddress')} *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder={t('contact.form.emailPlaceholder')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.company')}
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder={t('contact.form.companyPlaceholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.phoneNumber')}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder={t('contact.form.phonePlaceholder')}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.form.subject')} *
              </label>
              <select
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">{t('contact.form.subjectPlaceholder')}</option>
                <option value="general">{t('contact.form.subjectGeneral')}</option>
                <option value="demo">{t('contact.form.subjectDemo')}</option>
                <option value="partnership">{t('contact.form.subjectPartnership')}</option>
                <option value="support">{t('contact.form.subjectSupport')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.form.message')} *
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                placeholder={t('contact.form.messagePlaceholder')}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-3"
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
