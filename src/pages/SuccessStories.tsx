
import { useState, memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import HeaderNovo from '@/components/hometeste/HeaderNovo';
import FooterNovo from '@/components/hometeste/FooterNovo';
import CTAFinal from '@/components/hometeste/CTAFinal';
import VerticalWaves from '@/components/solutions/VerticalWaves';
import CookieConsentManager from '@/components/cookies/CookieConsentManager';
import SuccessStoriesHero from '@/components/success-stories/SuccessStoriesHero';
import MetricsSection from '@/components/success-stories/MetricsSection';
import SegmentFilter from '@/components/success-stories/SegmentFilter';
import ModernStoriesGrid from '@/components/success-stories/ModernStoriesGrid';
import TestimonialsSection from '@/components/success-stories/TestimonialsSection';

const SuccessStories = memo(() => {
  const { language } = useLanguage();
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0B1224] relative">
      <VerticalWaves />
      <div className="relative">
        <div className="relative z-[20]">
          <HeaderNovo />
        </div>
        <div className="relative z-[10]">
          <SuccessStoriesHero />
          <MetricsSection />
          <SegmentFilter
            onSegmentChange={setSelectedSegment}
            selectedSegment={selectedSegment}
          />
          <ModernStoriesGrid selectedSegment={selectedSegment} />
          <TestimonialsSection />
        </div>
        <CTAFinal />
        <div className="relative z-[20]">
          <FooterNovo />
        </div>
        <CookieConsentManager />
      </div>
    </div>
  );
});

SuccessStories.displayName = 'SuccessStories';

export default SuccessStories;
