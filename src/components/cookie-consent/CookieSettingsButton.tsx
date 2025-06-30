
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

interface CookieSettingsButtonProps {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

/**
 * Button to reopen cookie settings
 * Can be placed in footer, privacy policy, or settings pages
 */
const CookieSettingsButton = ({ 
  variant = 'ghost', 
  size = 'sm',
  className = '' 
}: CookieSettingsButtonProps) => {
  const { showDetails } = useCookieConsent();

  return (
    <Button
      onClick={showDetails}
      variant={variant}
      size={size}
      className={`text-gray-600 hover:text-orange-600 transition-colors duration-300 ${className}`}
    >
      <Settings className="w-4 h-4 mr-2" />
      Configurar Cookies
    </Button>
  );
};

export default CookieSettingsButton;
