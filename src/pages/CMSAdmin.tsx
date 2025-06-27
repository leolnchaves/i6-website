
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { logger } from '@/utils/logger';

/**
 * CMS Admin page - hidden admin interface
 * Accessible only by direct URL navigation
 */
const CMSAdmin = () => {
  // Performance monitoring for the CMS admin page
  const metrics = usePerformanceMonitor('CMSAdminPage', 20);
  
  // Log admin page access
  logger.info('CMS Admin page accessed', { 
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent 
  }, 'CMSAdmin');
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blank page - ready for CMS content */}
    </div>
  );
};

export default CMSAdmin;
