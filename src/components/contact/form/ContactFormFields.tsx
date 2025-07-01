
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

  const handleInputChangeWithLogging = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    console.log(`📞 ContactFormFields input change:`);
    console.log(`  - Field: ${e.target.name}`);
    console.log(`  - Value: "${e.target.value}"`);
    console.log(`  - Ends with space: ${e.target.value.endsWith(' ')}`);
    
    handleInputChange(e);
  };

  return (
    <>
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
            onChange={handleInputChangeWithLogging}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder={t('contact.form.namePlaceholder')}
            autoComplete="off"
            spellCheck="false"
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
            onChange={handleInputChangeWithLogging}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder={t('contact.form.emailPlaceholder')}
            autoComplete="off"
            spellCheck="false"
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
            onChange={handleInputChangeWithLogging}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder={t('contact.form.companyPlaceholder')}
            autoComplete="off"
            spellCheck="false"
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
            onChange={handleInputChangeWithLogging}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder={t('contact.form.phonePlaceholder')}
            autoComplete="off"
            spellCheck="false"
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
          onChange={handleInputChangeWithLogging}
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('contact.form.message')} *
        </label>
        <textarea
          name="message"
          required
          rows={12}
          value={formData.message}
          onChange={handleInputChangeWithLogging}
          className="w-full h-full min-h-[300px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
          placeholder={t('contact.form.messagePlaceholder')}
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    </>
  );
};

export default ContactFormFields;
