
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const ViewAllButton = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center">
      <Link to="/success-stories">
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
          {t('home.featuredStories.viewAll')}
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </Link>
    </div>
  );
};

export default ViewAllButton;
