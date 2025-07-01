
import { useEffect } from 'react';

/**
 * Componente para configurar headers de segurança básicos
 * Nota: Headers reais devem ser configurados no servidor
 */
const SecurityHeaders = () => {
  useEffect(() => {
    // Configurar Content Security Policy via meta tag
    const existingCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!existingCSP) {
      const meta = document.createElement('meta');
      meta.setAttribute('http-equiv', 'Content-Security-Policy');
      meta.setAttribute('content', 
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data: https:; " +
        "font-src 'self' data:; " +
        "connect-src 'self' https://*.supabase.co;"
      );
      document.head.appendChild(meta);
    }

    // Configurar outras meta tags de segurança
    const securityMetas = [
      { name: 'referrer', content: 'strict-origin-when-cross-origin' },
      { name: 'X-Content-Type-Options', content: 'nosniff' },
      { name: 'X-Frame-Options', content: 'DENY' },
      { name: 'X-XSS-Protection', content: '1; mode=block' }
    ];

    securityMetas.forEach(({ name, content }) => {
      const existing = document.querySelector(`meta[name="${name}"]`);
      if (!existing) {
        const meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    });

    // Remover informações desnecessárias
    const generator = document.querySelector('meta[name="generator"]');
    if (generator) {
      generator.remove();
    }

  }, []);

  return null;
};

export default SecurityHeaders;
