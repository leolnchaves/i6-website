
import { Routes, Route, Navigate } from 'react-router-dom';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { logger } from '@/utils/logger';
import { CMSAuthProvider } from '@/hooks/useCMSAuth';
import CMSLayout from '@/components/cms/CMSLayout';
import CMSLogin from '@/components/cms/CMSLogin';
import CMSProtectedRoute from '@/components/cms/CMSProtectedRoute';
import SecurityHeaders from '@/components/cms/SecurityHeaders';
import SiteStructure from '@/components/cms/SiteStructure';
import ContentManagement from '@/components/cms/ContentManagement';
import ComponentsManagement from '@/components/cms/ComponentsManagement';
import CMSPhase1Tests from '@/pages/CMSPhase1Tests';

/**
 * CMS Admin page - hidden admin interface
 * Accessible only by direct URL navigation
 */
const CMSAdmin = () => {
  // Performance monitoring for the CMS admin page
  const metrics = usePerformanceMonitor('CMSAdminPage', 20);
  
  // Log admin page access com informações limitadas por segurança
  logger.info('CMS Admin page accessed', { 
    timestamp: new Date().toISOString(),
    // Remover userAgent por questões de privacidade
  }, 'CMSAdmin');
  
  return (
    <>
      <SecurityHeaders />
      <CMSAuthProvider>
        <Routes>
          <Route path="/login" element={<CMSLogin />} />
          <Route path="/" element={<Navigate to="/cms-admin-i6/site-structure" replace />} />
          <Route path="/*" element={
            <CMSProtectedRoute>
              <CMSLayout />
            </CMSProtectedRoute>
          } />
        </Routes>
      </CMSAuthProvider>
    </>
  );
};

export default CMSAdmin;
