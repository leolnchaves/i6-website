import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { detectPreferredLang, isLang } from "./utils/localizedPath";

const ScrollToTop = () => { useScrollToTop(); return null; };

import DarkLayout from "./components/DarkLayout";
import Solutions from "./pages/Solutions";
import SuccessStories from "./pages/SuccessStories";
import SuccessStoryArticle from "./pages/SuccessStoryArticle";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import EthicsPolicy from "./pages/EthicsPolicy";

import NotFound from "./pages/NotFound";
import HomeTeste from "./pages/HomeTeste";
import HomeV1 from "./pages/HomeV1";
import HomeV2 from "./pages/HomeV2";
import HomeV3 from "./pages/HomeV3";
import HomeV4 from "./pages/HomeV4";
import Insights from "./pages/Insights";
import InsightArticle from "./pages/InsightArticle";
import Intelligence from "./pages/Intelligence";
import IntelligenceOrInsightArticle from "./pages/IntelligenceOrInsightArticle";
import Blog from "./pages/Blog";
import OurAI from "./pages/OurAI";
import TransformationLanding from "./pages/TransformationLanding";
import Kiosk from "./pages/Kiosk";

import ErrorBoundary from "./components/common/ErrorBoundary";
import DebugPanel from "./components/debug/DebugPanel";
import { logger } from "./utils/logger";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        logger.warn('Query failed, retrying...', { failureCount, error: error.message }, 'ReactQuery');
        return failureCount < 3;
      },
    },
    mutations: {
      onError: (error) => {
        logger.error('Mutation error occurred', { message: error.message }, 'ReactQuery');
      },
    },
  },
});

/** Redirects any non-localized path to /<preferred-lang>/<path> */
const RootLangRedirect = () => {
  const location = useLocation();
  const lang = detectPreferredLang();
  const target = `/${lang}${location.pathname === '/' ? '' : location.pathname}${location.search}${location.hash}`;
  return <Navigate to={target} replace />;
};

/** Validates :lang param; if invalid, redirects to detected language */
const LocalizedRoutes = () => {
  const { lang } = useParams();
  const location = useLocation();

  if (!isLang(lang)) {
    const preferred = detectPreferredLang();
    const rest = location.pathname.replace(/^\/[^/]+/, '');
    return <Navigate to={`/${preferred}${rest}${location.search}${location.hash}`} replace />;
  }

  return (
    <Routes>
      <Route element={<DarkLayout />}>
        <Route index element={<HomeTeste />} />
        <Route path="home-v1" element={<HomeV1 />} />
        <Route path="home-v2" element={<HomeV2 />} />
        <Route path="home-v3" element={<HomeV3 />} />
        <Route path="home-v4" element={<HomeV4 />} />
        <Route path="solutions" element={<Solutions />} />
        <Route path="solutions/:slug" element={<TransformationLanding />} />
        <Route path="our-ai" element={<OurAI />} />
        <Route path="success-stories" element={<SuccessStories />} />
        <Route path="success-stories/:slug" element={<SuccessStoryArticle />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="ethics-policy" element={<EthicsPolicy />} />
        <Route path="cookie-settings" element={<Navigate to="../?cookies=open" replace />} />
        <Route path="insights" element={<Insights />} />
        <Route path="insights/:slug" element={<InsightArticle />} />
        <Route path="i6-intelligence" element={<Intelligence />} />
        <Route path="i6-intelligence/:slug" element={<IntelligenceOrInsightArticle />} />
        <Route path="i6-blog" element={<Blog />} />
        <Route path="i6-blog/:slug" element={<InsightArticle />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  logger.info('App initialized', {
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    viewport: { width: window.innerWidth, height: window.innerHeight }
  }, 'App');

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <LanguageProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <ScrollToTop />
                <Routes>

                  {/* Standalone kiosk / totem experience (no header/footer, no lang prefix) */}
                  <Route path="/kiosk" element={<Kiosk />} />

                  {/* Localized site */}
                  <Route path="/:lang/*" element={<LocalizedRoutes />} />

                  {/* Root + any unprefixed path -> redirect to /<lang>/... */}
                  <Route path="/" element={<RootLangRedirect />} />
                  <Route path="*" element={<RootLangRedirect />} />
                </Routes>
                <DebugPanel />
              </TooltipProvider>
            </LanguageProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
