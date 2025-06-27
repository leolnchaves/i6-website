
import { useLanguage } from '@/contexts/LanguageContext';

const SolutionsHero = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="block mb-2">{t('solutions.hero.mainTitle')}</span>
            <span className="block bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent pb-2">
              {t('solutions.hero.mainSubtitle')}
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            {t('solutions.hero.description')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SolutionsHero;
