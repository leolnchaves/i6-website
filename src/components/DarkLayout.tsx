import { Outlet, useLocation } from 'react-router-dom';
import HeaderNovo from '@/components/hometeste/HeaderNovo';
import FooterNovo from '@/components/hometeste/FooterNovo';
import WaveBackground from '@/components/hometeste/WaveBackground';
import CookieConsentManager from '@/components/cookies/CookieConsentManager';

const DarkLayout = () => {
  const location = useLocation();
  const hideWaves = ['/privacy-policy', '/ethics-policy'].some((p) =>
    location.pathname === p || location.pathname.endsWith(p)
  );

  return (
  <div className="min-h-screen bg-[#0B1224] relative">
    {!hideWaves && <WaveBackground />}
    <div className="relative">
      <div className="relative z-[20]">
        <HeaderNovo />
      </div>
      <main className="relative z-[10]">
        <Outlet />
      </main>
      <div className="relative z-[20]">
        <FooterNovo />
      </div>
      <CookieConsentManager />
    </div>
  </div>
  );
};

export default DarkLayout;
