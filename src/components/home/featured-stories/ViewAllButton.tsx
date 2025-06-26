
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const ViewAllButton = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center">
      <Link to="/success-stories">
        <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold hover:scale-105">
          {t('home.featuredStories.viewAll')}
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </Link>
    </div>
  );
};

export default ViewAllButton;
