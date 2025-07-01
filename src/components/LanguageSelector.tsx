
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [useTextFallback, setUseTextFallback] = useState(true); // Start with text fallback as default

  const languages = [
    { 
      code: 'en', 
      flag: '🇺🇸',
      text: 'EN',
      label: 'English'
    },
    { 
      code: 'pt', 
      flag: '🇧🇷',
      text: 'PT',
      label: 'Português'
    }
  ];

  useEffect(() => {
    // Enhanced emoji support detection
    const detectEmojiSupport = () => {
      // Check user agent for known problematic cases
      const userAgent = navigator.userAgent.toLowerCase();
      const isWindows = userAgent.includes('windows');
      const isChrome = userAgent.includes('chrome');
      
      // Some Windows Chrome versions have issues with flag emojis
      if (isWindows && isChrome) {
        console.log('Windows Chrome detected - using text fallback for better compatibility');
        setUseTextFallback(true);
        return;
      }

      // Canvas-based detection as secondary check
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          setUseTextFallback(true);
          return;
        }
        
        canvas.width = 20;
        canvas.height = 20;
        ctx.textBaseline = 'top';
        ctx.font = '16px Arial';
        
        // Test with flag emoji
        ctx.fillText('🇺🇸', 0, 0);
        const imageData = ctx.getImageData(0, 0, 20, 20);
        
        // Check if any non-transparent pixels exist
        let hasVisiblePixels = false;
        for (let i = 3; i < imageData.data.length; i += 4) {
          if (imageData.data[i] > 0) {
            hasVisiblePixels = true;
            break;
          }
        }
        
        // Additional check: compare with a basic emoji
        ctx.clearRect(0, 0, 20, 20);
        ctx.fillText('😀', 0, 0);
        const basicEmojiData = ctx.getImageData(0, 0, 20, 20);
        
        let hasBasicEmoji = false;
        for (let i = 3; i < basicEmojiData.data.length; i += 4) {
          if (basicEmojiData.data[i] > 0) {
            hasBasicEmoji = true;
            break;
          }
        }
        
        // Use flags only if both flag and basic emojis render
        const shouldUseEmoji = hasVisiblePixels && hasBasicEmoji;
        console.log('Emoji support detection:', { hasVisiblePixels, hasBasicEmoji, shouldUseEmoji });
        setUseTextFallback(!shouldUseEmoji);
        
      } catch (error) {
        console.log('Emoji detection failed, using text fallback:', error);
        setUseTextFallback(true);
      }
    };

    // Run detection after a short delay to ensure DOM is ready
    const timer = setTimeout(detectEmojiSupport, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as 'en' | 'pt')}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 hover:scale-110 border-2 ${
            language === lang.code 
              ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-lg scale-110' 
              : 'border-gray-200 hover:border-orange-300 bg-white text-gray-600 hover:bg-orange-50'
          }`}
          title={lang.label}
          aria-label={`Switch to ${lang.label}`}
        >
          {useTextFallback ? (
            <span className="font-bold text-xs">
              {lang.text}
            </span>
          ) : (
            <span 
              className="text-lg leading-none select-none" 
              style={{ 
                fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Android Emoji", sans-serif',
                fontSize: '16px'
              }}
            >
              {lang.flag}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
