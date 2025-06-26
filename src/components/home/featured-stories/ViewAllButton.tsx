
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const ViewAllButton = () => {
  const { t } = useLanguage();

  const handleSuccessStoriesClick = () => {
    // Navigate to success-stories page and scroll to top
    window.location.href = '/success-stories';
  };

  return (
    <div className="text-center">
      <Button 
        size="lg" 
        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold hover:scale-105"
        onClick={handleSuccessStoriesClick}
      >
        {t('home.featuredStories.viewAll')}
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );
};

export default ViewAllButton;
