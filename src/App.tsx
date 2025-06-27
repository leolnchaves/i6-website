
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { CMSProvider } from '@/contexts/CMSContext';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Solutions from '@/pages/Solutions';
import SuccessStories from '@/pages/SuccessStories';
import Contact from '@/pages/Contact';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import EthicsPolicy from '@/pages/EthicsPolicy';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminContent from '@/pages/AdminContent';
import AdminMedia from '@/pages/AdminMedia';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <CMSProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/solutions" element={<Layout><Solutions /></Layout>} />
                <Route path="/success-stories" element={<Layout><SuccessStories /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
                <Route path="/ethics-policy" element={<Layout><EthicsPolicy /></Layout>} />
                <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
                <Route path="/admin/content" element={<Layout><AdminContent /></Layout>} />
                <Route path="/admin/media" element={<Layout><AdminMedia /></Layout>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CMSProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
