
import { Link } from 'react-router-dom';

const PolicyLinksSection = () => {
  return (
    <section className="py-8 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-8">
          <Link 
            to="/privacy-policy" 
            className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm font-medium"
          >
            Privacy Policy
          </Link>
          <Link 
            to="/ethics-policy" 
            className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm font-medium"
          >
            Ethics Policy
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PolicyLinksSection;
