
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSPageContent } from '@/hooks/useCMSPageContent';

const ContactHero = () => {
  const { language, t } = useLanguage();
  const { getContent } = useCMSPageContent('contact', language);

  // Get content from CMS with fallbacks
  const title = getContent('contactHero', 'title', t('contact.hero.title'));
  const subtitle = getContent('contactHero', 'subtitle', t('contact.hero.subtitle'));
  const description = getContent('contactHero', 'description', t('contact.hero.description'));

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {title}
            <span className="block bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              {subtitle}
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
