import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseOptimizedNavigationOptions {
  scrollToTop?: boolean;
  behavior?: ScrollBehavior;
}

export const useOptimizedNavigation = (options: UseOptimizedNavigationOptions = {}) => {
  const { scrollToTop = true, behavior = 'auto' } = options;
  const navigate = useNavigate();

  const navigateWithScroll = useCallback((to: string, options?: { replace?: boolean }) => {
    navigate(to, options);
    
    if (scrollToTop) {
      // Use requestAnimationFrame for smooth performance
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior
        });
      });
    }
  }, [navigate, scrollToTop, behavior]);

  return { navigateWithScroll };
};