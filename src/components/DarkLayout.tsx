import { Outlet, useLocation } from 'react-router-dom';
import HeaderNovo from '@/components/hometeste/HeaderNovo';
import FooterNovo from '@/components/hometeste/FooterNovo';
import VerticalWaves from '@/components/solutions/VerticalWaves';
import CookieConsentManager from '@/components/cookies/CookieConsentManager';

const DarkLayout = () => {
  const location = useLocation();
  const hideWaves = ['/', '/privacy-policy', '/ethics-policy'].includes(location.pathname);

  return (
  <div className="min-h-screen bg-[#0B1224] relative">
    {!hideWaves && <VerticalWaves />}
    <div className="relative">
      <div className="relative z-[20]">
        <HeaderNovo />
      </div>
      <div className="relative z-[10]">
        <Outlet />
      </div>
      <div className="relative z-[20]">
        <FooterNovo />
      </div>
      <CookieConsentManager />
    </div>
  </div>
  );
};

export default DarkLayout;
