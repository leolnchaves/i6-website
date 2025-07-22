
import { Link, useNavigate } from 'react-router-dom';
import { Linkedin, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { memo, useMemo, useCallback } from 'react';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { PROCESSED_ASSETS } from '@/utils/assetUtils';

const Footer = memo(() => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  // Lazy loading optimization for footer image
  const { isVisible, elementRef } = useIntersectionObserver({ threshold: 0.1 });
  const { isLoaded: logoLoaded } = useImagePreloader(
    PROCESSED_ASSETS.LOGO_FOOTER,
    isVisible
  );
  
  // Memoized static content - prevents recreation on every render
  const footerContent = useMemo(() => ({
    pt: {
      companyDescription: "Tecnologia que conecta dados e decisões em tempo real.\nCresça com velocidade, escale com precisão.",
      contactEmail: "lets.talk@infinity6.ai",
      contactPhone: "+55 (19) 99819-7775",
      copyrightText: "© 2024 Infinity6.ai. Todos os direitos reservados."
    },
    en: {
      companyDescription: "Technology that connects data and decisions in real time.\nGrow faster, scale smarter.",
      contactEmail: "lets.talk@infinity6.ai", 
      contactPhone: "+55 (19) 99819-7775",
      copyrightText: "© 2024 Infinity6.ai. All rights reserved."
    }
  }), []);

  // Memoized footer text based on current language
  const footerText = useMemo(() => footerContent[language], [footerContent, language]);

  // Optimized navigation handler - removes setTimeout delay
  const handleLinkClick = useCallback((href?: string) => {
    if (href) {
      navigate(href);
    }
    // Immediate scroll to top without setTimeout
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <footer ref={elementRef} className="bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 gradient-accent opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 gradient-secondary opacity-10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info with optimized logo loading */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              {isVisible && logoLoaded ? (
                <img 
                  src={PROCESSED_ASSETS.LOGO_FOOTER} 
                  alt="Infinity6" 
                  className="h-8 w-auto"
                  loading="lazy"
                />
              ) : (
                <div className="h-8 w-16 bg-gray-700 animate-pulse rounded"></div>
              )}
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              {footerText.companyDescription}
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
                onClick={() => handleLinkClick('/privacy-policy')}
              >
                {t('footer.privacy')}
              </Link>
              <Link 
                to="/ethics-policy" 
                className="text-gray-500 hover:text-orange-400 transition-colors duration-300"
                onClick={() => handleLinkClick('/ethics-policy')}
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
                  onClick={() => handleLinkClick('/')}
                >
                  {t('header.home')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/solutions" 
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
                  onClick={() => handleLinkClick('/solutions')}
                >
                  {t('header.solutions')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/success-stories" 
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
                  onClick={() => handleLinkClick('/success-stories')}
                >
                  {t('header.successStories')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
                  onClick={() => handleLinkClick('/contact')}
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
                {footerText.contactEmail}
              </li>
              <li className="hover:text-orange-400 transition-colors duration-300">
                {footerText.contactPhone}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{footerText.copyrightText}</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
