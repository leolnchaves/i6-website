import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import logoHeader from '@/assets/images/logo-header.png';

type ResearchItem = {
  to?: string;
  label: string;
  comingSoon?: boolean;
};

const HeaderNovo = () => {
  const { language, setLanguage, t } = useLanguage();
  const localized = useLocalizedPath();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResearchOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    setResearchOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  const researchMenu: ResearchItem[] = [
    { to: localized('/i6-intelligence'), label: t('header.research.hub') },
    { to: localized('/insights'), label: t('header.research.media') },
    { to: localized('/i6-blog'), label: t('header.research.blog') },
    { to: localized('/solutions/demand-supply-efficiency'), label: t('header.solutions.demandSupply') },
    { to: localized('/solutions/data-monetization'), label: t('header.solutions.dataMonetization') },
    { to: localized('/solutions/predictive-operations'), label: t('header.solutions.predictiveOps') },
    { to: localized('/solutions/behavior-conversion'), label: t('header.solutions.behaviorConversion') },
  ];

  const leftLinks = [
    { to: localized('/'), label: t('header.home') },
    { to: localized('/solutions'), label: t('header.solutions') },
    { to: localized('/our-ai'), label: t('header.proprietaryAi') },
    { to: localized('/success-stories'), label: t('header.successStories') },
  ];

  const contactLink = { to: localized('/contact'), label: t('header.contact') };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0B1224]/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to={localized('/')} className="shrink-0">
          <img src={logoHeader} alt="infinity6 logo" className="h-12 w-auto brightness-0 invert" />
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {leftLinks.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="text-sm font-medium text-white/80 hover:text-[#F4845F] transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}

          {/* i6 Research dropdown */}
          <li ref={dropdownRef} className="relative">
            <button
              onClick={() => setResearchOpen((v) => !v)}
              className="inline-flex items-center gap-1 text-sm font-medium text-white/80 hover:text-[#F4845F] transition-colors"
              aria-expanded={researchOpen}
              aria-haspopup="true"
            >
              {t('header.research')}
              <ChevronDown size={14} className={`transition-transform ${researchOpen ? 'rotate-180' : ''}`} />
            </button>
            {researchOpen && (
              <ul className="absolute left-0 top-full mt-2 w-max rounded-lg border border-white/10 bg-[#0B1224]/95 backdrop-blur-md shadow-xl py-2">
                {researchMenu.map((sl, i) => (
                  <li key={sl.to ?? `coming-${i}`}>
                    {sl.comingSoon || !sl.to ? (
                      <span className="flex items-center gap-2 px-4 py-2 text-sm text-white/40 whitespace-nowrap cursor-not-allowed">
                        {sl.label}
                        <span className="text-[10px] uppercase tracking-wider bg-white/10 text-white/60 px-1.5 py-0.5 rounded">
                          {t('header.research.comingSoon')}
                        </span>
                      </span>
                    ) : (
                      <Link
                        to={sl.to}
                        className="block px-4 py-2 text-sm text-white/80 hover:text-[#F4845F] hover:bg-white/5 transition-colors whitespace-nowrap"
                      >
                        {sl.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <Link
              to={contactLink.to}
              className="text-sm font-medium text-white/80 hover:text-[#F4845F] transition-colors"
            >
              {contactLink.label}
            </Link>
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-1 rounded-full border border-[#F4845F]/30 px-1 py-0.5">
          {(['pt', 'en'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                language === lang ? 'bg-[#F4845F] text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0B1224] border-t border-white/10 px-6 pb-6 pt-2">
          <ul className="flex flex-col gap-4">
            {leftLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setMenuOpen(false)}
                  className="text-white/80 hover:text-[#F4845F] transition-colors text-sm font-medium"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <div className="text-white/50 uppercase tracking-wider text-xs mb-2">{t('header.research')}</div>
              <ul className="flex flex-col gap-3 pl-3 border-l border-white/10">
                {researchMenu.map((sl, i) => (
                  <li key={sl.to ?? `coming-m-${i}`}>
                    {sl.comingSoon || !sl.to ? (
                      <span className="flex items-center gap-2 text-white/40 text-sm font-medium cursor-not-allowed">
                        {sl.label}
                        <span className="text-[10px] uppercase tracking-wider bg-white/10 text-white/60 px-1.5 py-0.5 rounded">
                          {t('header.research.comingSoon')}
                        </span>
                      </span>
                    ) : (
                      <Link
                        to={sl.to}
                        onClick={() => setMenuOpen(false)}
                        className="text-white/80 hover:text-[#F4845F] transition-colors text-sm font-medium"
                      >
                        {sl.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link
                to={contactLink.to}
                onClick={() => setMenuOpen(false)}
                className="text-white/80 hover:text-[#F4845F] transition-colors text-sm font-medium"
              >
                {contactLink.label}
              </Link>
            </li>
          </ul>
          <div className="flex gap-2 mt-4">
            {(['pt', 'en'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => { setLanguage(lang); setMenuOpen(false); }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  language === lang ? 'bg-[#F4845F] text-white' : 'text-white/60 border border-white/20'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderNovo;
