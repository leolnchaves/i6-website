
import { Link } from 'react-router-dom';
import { Linkedin, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCMSPageContent } from '@/hooks/useCMSPageContent';

const Footer = () => {
  const { t, language } = useLanguage();
  const { getContent, loading } = useCMSPageContent('components', language);

  // Get footer content from CMS with fallbacks
  const companyDescription = getContent('footer', 'company_description', t('footer.description'));
  const contactEmail = getContent('footer', 'contact_email', 'hello@infinity6.ai');
  const contactPhone = getContent('footer', 'contact_phone', '+1 (555) 123-4567');
  const copyrightText = getContent('footer', 'copyright_text', t('footer.copyright'));

  const handleLinkClick = () => {
    // Scroll to top when link is clicked
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 gradient-accent opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 gradient-secondary opacity-10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/fa0e2de0-5d60-4759-bb8f-ae448b70417c.png" 
                alt="Infinity6" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              {loading ? t('footer.description') : companyDescription}
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://www.linkedin.com/company/infinity6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:scale-110 transform"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="https://www.youtube.com/@infinity6ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:scale-110 transform"
              >
                <Youtube size={24} />
              </a>
            </div>
            
            {/* Policy Links */}
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <Link 
                to="/privacy-policy" 
                className="text-gray-500 hover:text-orange-400 transition-colors duration-300"
                onClick={handleLinkClick}
              >
                {t('footer.privacy')}
              </Link>
              <Link 
                to="/ethics-policy" 
                className="text-gray-500 hover:text-orange-400 transition-colors duration-300"
                onClick={handleLinkClick}
              >
                {t('footer.ethics')}
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
                  onClick={handleLinkClick}
                >
                  {t('header.home')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/solutions" 
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
                  onClick={handleLinkClick}
                >
                  {t('header.solutions')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/success-stories" 
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
                  onClick={handleLinkClick}
                >
                  {t('header.successStories')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
                  onClick={handleLinkClick}
                >
                  {t('header.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-orange-400 transition-colors duration-300">
                {loading ? 'hello@infinity6.ai' : contactEmail}
              </li>
              <li className="hover:text-orange-400 transition-colors duration-300">
                {loading ? '+1 (555) 123-4567' : contactPhone}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{loading ? t('footer.copyright') : copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
