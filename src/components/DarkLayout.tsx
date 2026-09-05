import { Outlet } from 'react-router-dom';
import HeaderNovo from '@/components/hometeste/HeaderNovo';
import FooterNovo from '@/components/hometeste/FooterNovo';
import CookieConsentManager from '@/components/cookies/CookieConsentManager';

const DarkLayout = () => (
  // `overflow-x-clip` (not `-hidden`): clips horizontal overflow without turning
  // this element into a scroll container, which would break `position: sticky`
  // for the documentation side columns.
  <div className="min-h-screen bg-[#0B1224] relative overflow-x-clip">

    <div className="relative">
      <div className="relative z-[60]">
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

export default DarkLayout;
