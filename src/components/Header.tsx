
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navigation = [
    { name: t('header.home'), href: '/' },
    { name: t('header.solutions'), href: '/solutions' },
    { name: t('header.successStories'), href: '/success-stories' },
    { name: t('header.contact'), href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLinkClick = () => {
    // Close mobile menu when link is clicked
    setIsMenuOpen(false);
    // Scroll to top immediately
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
            onClick={handleLinkClick}
          >
            <img 
              src="/lovable-uploads/cc5580c3-aefa-4ec3-add2-d2aa49649a86.png" 
              alt="Infinity6" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={handleLinkClick}
                className={`text-sm font-medium transition-all duration-300 hover:text-orange-500 relative group ${
                  isActive(item.href) ? 'text-orange-500' : 'text-gray-700'
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Language Selector and CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0 rounded-full font-semibold">
              {t('header.getStarted')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-6 h-6">
              <Menu className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} size={24} />
              <X className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} size={24} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-out ${isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t glass">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 text-base font-medium transition-all duration-300 hover:text-orange-500 hover:bg-orange-50 rounded-lg ${
                  isActive(item.href) ? 'text-orange-500 bg-orange-50' : 'text-gray-700'
                }`}
                onClick={handleLinkClick}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2 flex items-center justify-between">
              <LanguageSelector />
            </div>
            <div className="px-3 py-2">
              <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:scale-105 transition-all duration-300 border-0 rounded-full font-semibold">
                {t('header.getStarted')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
