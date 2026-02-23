import { Link, useNavigate } from 'react-router-dom';
import { Linkedin, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logoFooter from '@/assets/images/logo-footer.png';
import { useCallback } from 'react';

const FooterNovo = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const handleNav = useCallback(
    (href: string) => {
      navigate(href);
      window.scrollTo(0, 0);
    },
    [navigate]
  );

  const desc =
    language === 'pt'
      ? 'Tecnologia que conecta dados e decisões em tempo real.\nCresça com velocidade, escale com precisão.'
      : 'Technology that connects data and decisions in real time.\nGrow faster, scale smarter.';

  const copyright =
    language === 'pt'
      ? '© 2025 Infinity6.ai. Todos os direitos reservados.'
      : '© 2025 Infinity6.ai. All rights reserved.';

  const navLinks: { to: string; label: string; external?: boolean }[] = [
    { to: '/hometeste', label: t('header.home') },
    { to: '/solutions', label: t('header.solutions') },
    { to: '/success-stories', label: t('header.successStories') },
    { to: 'https://huggingface.co/i6-aiworks', label: t('header.community'), external: true },
    { to: '/contact', label: t('header.contact') },
  ];

  return (
    <footer className="bg-[#0B1224] text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <img src={logoFooter} alt="Infinity6" className="h-8 w-auto mb-4" loading="lazy" />
            <p className="text-white/40 text-sm max-w-md whitespace-pre-line mb-6">{desc}</p>

            <div className="flex gap-4 mb-6">
              <a href="https://www.linkedin.com/company/infinity6" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#F4845F] transition-colors">
                <Linkedin size={22} />
              </a>
              <a href="https://www.youtube.com/@infinity6ai" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#F4845F] transition-colors">
                <Youtube size={22} />
              </a>
            </div>

            <div className="flex gap-4 text-xs">
              <Link to="/privacy-policy" onClick={() => handleNav('/privacy-policy')} className="text-white/30 hover:text-[#F4845F] transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link to="/ethics-policy" onClick={() => handleNav('/ethics-policy')} className="text-white/30 hover:text-[#F4845F] transition-colors">
                {t('footer.ethics')}
              </Link>
            </div>
            <p className="text-white/30 text-xs mt-3">{copyright}</p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/60 uppercase tracking-wider">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.to}>
                  {l.external ? (
                    <a href={l.to} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#F4845F] transition-colors text-sm">
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.to} onClick={() => handleNav(l.to)} className="text-white/40 hover:text-[#F4845F] transition-colors text-sm">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/60 uppercase tracking-wider">{t('footer.contact')}</h3>
            <a href="mailto:movimento@infinity6.ai" className="text-white/40 hover:text-[#F4845F] transition-colors text-sm hover:underline">
              movimento@infinity6.ai
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterNovo;
