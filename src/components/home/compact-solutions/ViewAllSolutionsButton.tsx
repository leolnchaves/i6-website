
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ViewAllSolutionsButtonProps {
  buttonText: string;
}

const ViewAllSolutionsButton = ({ buttonText }: ViewAllSolutionsButtonProps) => {
  const handleClick = () => {
    // Scroll to top when navigating to Solutions page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex justify-center mt-12">
      <Link to="/solutions" onClick={handleClick}>
        <Button 
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium text-base transition-all duration-300 shadow-lg hover:shadow-xl group"
        >
          {buttonText || 'Ver Todas as Soluções'}
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </Link>
    </div>
  );
};

export default ViewAllSolutionsButton;
