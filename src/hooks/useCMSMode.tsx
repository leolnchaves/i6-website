
import { useState, useEffect } from 'react';

type CMSMode = 'supabase' | 'markdown' | 'hybrid';

interface CMSModeConfig {
  mode: CMSMode;
  apiEndpoint?: string;
  enableSync?: boolean;
}

export const useCMSMode = () => {
  const [config, setConfig] = useState<CMSModeConfig>({
    mode: 'hybrid', // Começamos com híbrido
    apiEndpoint: '/api/markdown',
    enableSync: true
  });

  const [isMarkdownSupported, setIsMarkdownSupported] = useState(false);
  const [isSupabaseAvailable, setIsSupabaseAvailable] = useState(true);

  useEffect(() => {
    // Detectar se a API de Markdown está disponível
    const checkMarkdownAPI = async () => {
      try {
        const response = await fetch('/api/markdown/health');
        setIsMarkdownSupported(response.ok);
      } catch (error) {
        console.log('Markdown API not available, using Supabase only');
        setIsMarkdownSupported(false);
      }
    };

    checkMarkdownAPI();
  }, []);

  const switchMode = (newMode: CMSMode) => {
    console.log(`Switching CMS mode from ${config.mode} to ${newMode}`);
    setConfig(prev => ({ ...prev, mode: newMode }));
  };

  const updateConfig = (newConfig: Partial<CMSModeConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  return {
    config,
    isMarkdownSupported,
    isSupabaseAvailable,
    switchMode,
    updateConfig,
    // Helpers
    isHybridMode: config.mode === 'hybrid',
    isMarkdownOnly: config.mode === 'markdown',
    isSupabaseOnly: config.mode === 'supabase',
  };
};
