import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/utils/localizedPath';
import logoHeader from '@/assets/images/logo-header.png';

type SubLink = { to: string; label: string; comingSoon?: boolean };

const HeaderNovo = () => {
  const { language, setLanguage, t } = useLanguage();
  const localized = useLocalizedPath();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click / route change
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    setSolutionsOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  // Solutions submenu. Items flagged `comingSoon` are filtered out until their
  // pages exist (Phase 9 = Proprietary AI; Phase 10 = 4 transformation landings).
  const solutionsSubMenu: SubLink[] = [
    { to: localized('/solutions'), label: t('header.solutions.aiSolutions') },
    { to: localized('/our-ai'), label: t('header.solutions.proprietaryAi') },
    { to: localized('/solutions/demand-supply-efficiency'), label: t('header.solutions.demandSupply'), comingSoon: true },
    { to: localized('/solutions/data-monetization'), label: t('header.solutions.dataMonetization'), comingSoon: true },
    { to: localized('/solutions/predictive-operations'), label: t('header.solutions.predictiveOps'), comingSoon: true },
    { to: localized('/solutions/behavior-conversion'), label: t('header.solutions.behaviorConversion'), comingSoon: true },
  ].filter((item) => !item.comingSoon);

  const links = [
    { to: localized('/'), label: t('header.home') },
    { to: localized('/success-stories'), label: t('header.successStories') },
    { to: localized('/i6-intelligence'), label: t('header.intelligence') },
    { to: localized('/insights'), label: t('header.insights') },
    { to: localized('/contact'), label: t('header.contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B1224]/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to={localized('/')} className="shrink-0">
          <img src={logoHeader} alt="infinity6 logo" className="h-12 w-auto brightness-0 invert" />
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <Link
              to={links[0].to}
              className="text-sm font-medium text-white/80 hover:text-[#F4845F] transition-colors"
            >
              {links[0].label}
            </Link>
          </li>

          {/* Solutions dropdown */}
          <li ref={dropdownRef} className="relative">
            {solutionsSubMenu.length === 1 ? (
              <Link
                to={solutionsSubMenu[0].to}
                className="text-sm font-medium text-white/80 hover:text-[#F4845F] transition-colors"
              >
                {t('header.solutions')}
              </Link>
            ) : (
              <>
                <button
                  onClick={() => setSolutionsOpen((v) => !v)}
                  className="inline-flex items-center gap-1 text-sm font-medium text-white/80 hover:text-[#F4845F] transition-colors"
                  aria-expanded={solutionsOpen}
                  aria-haspopup="true"
                >
                  {t('header.solutions')}
                  <ChevronDown size={14} className={`transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
                </button>
                {solutionsOpen && (
                  <ul className="absolute left-0 top-full mt-2 min-w-[260px] rounded-lg border border-white/10 bg-[#0B1224]/95 backdrop-blur-md shadow-xl py-2">
                    {solutionsSubMenu.map((sl) => (
                      <li key={sl.to}>
                        <Link
                          to={sl.to}
                          className="block px-4 py-2 text-sm text-white/80 hover:text-[#F4845F] hover:bg-white/5 transition-colors"
                        >
                          {sl.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </li>

          {links.slice(1).map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="text-sm font-medium text-white/80 hover:text-[#F4845F] transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-1 rounded-full border border-[#F4845F]/30 px-1 py-0.5">
          {(['pt', 'en'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                language === lang
                  ? 'bg-[#F4845F] text-white'
                  : 'text-white/60 hover:text-white'
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
            <li>
              <Link to={links[0].to} onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-[#F4845F] transition-colors text-sm font-medium">
                {links[0].label}
              </Link>
            </li>
            {solutionsSubMenu.length === 1 ? (
              <li>
                <Link to={solutionsSubMenu[0].to} onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-[#F4845F] transition-colors text-sm font-medium">
                  {t('header.solutions')}
                </Link>
              </li>
            ) : (
              <li>
                <div className="text-white/50 uppercase tracking-wider text-xs mb-2">{t('header.solutions')}</div>
                <ul className="flex flex-col gap-3 pl-3 border-l border-white/10">
                  {solutionsSubMenu.map((sl) => (
                    <li key={sl.to}>
                      <Link to={sl.to} onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-[#F4845F] transition-colors text-sm font-medium">
                        {sl.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}
            {links.slice(1).map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-[#F4845F] transition-colors text-sm font-medium">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 mt-4">
            {(['pt', 'en'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => { setLanguage(lang); setMenuOpen(false); }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  language === lang
                    ? 'bg-[#F4845F] text-white'
                    : 'text-white/60 border border-white/20'
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
