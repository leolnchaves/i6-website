
import { useLanguage } from '@/contexts/LanguageContext';

interface ContactFormFieldsProps {
  formData: {
    name: string;
    email: string;
    company: string;
    phone: string;
    subject: string;
    message: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ContactFormFields = ({ formData, handleInputChange }: ContactFormFieldsProps) => {
  const { t } = useLanguage();

  const nameDescription = t('contact.form.nameDescription');
  const emailDescription = t('contact.form.emailDescription');
  const companyDescription = t('contact.form.companyDescription');
  const phoneDescription = t('contact.form.phoneDescription');
  const messageDescription = t('contact.form.messageDescription');

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('contact.form.fullName')} *
          </label>
          {nameDescription && (
            <p className="text-xs text-gray-500 mb-2">{nameDescription}</p>
          )}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('contact.form.emailAddress')} *
          </label>
          {emailDescription && (
            <p className="text-xs text-gray-500 mb-2">{emailDescription}</p>
          )}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('contact.form.company')}
          </label>
          {companyDescription && (
            <p className="text-xs text-gray-500 mb-2">{companyDescription}</p>
          )}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('contact.form.phoneNumber')}
          </label>
          {phoneDescription && (
            <p className="text-xs text-gray-500 mb-2">{phoneDescription}</p>
          )}
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
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

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('contact.form.message')} *
        </label>
        {messageDescription && (
          <p className="text-sm text-gray-600 mb-3">{messageDescription}</p>
        )}
        <textarea
          name="message"
          required
          rows={12}
          value={formData.message}
          onChange={handleInputChange}
          className="w-full h-full min-h-[300px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
          placeholder={t('contact.form.messagePlaceholder')}
        />
      </div>
    </>
  );
};

export default ContactFormFields;
