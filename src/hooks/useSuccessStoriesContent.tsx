
import { useCMSPageContent } from './useCMSPageContent';

export const useSuccessStoriesContent = (language: string = 'en') => {
  const { content, loading, error, getContent } = useCMSPageContent('success-stories', language);

  // Helper functions for each section
  const getHeroContent = () => ({
    title: getContent('successStoriesHero', 'title', 'Transforming Industries with'),
    subtitle: getContent('successStoriesHero', 'subtitle', 'AI-Powered Solutions'),
    description: getContent('successStoriesHero', 'description', 'Discover how our AI solutions have revolutionized businesses across various industries, delivering measurable results and sustainable growth.')
  });

  const getMetricsContent = () => ({
    avgROI: getContent('successStoriesMetrics', 'avgROI', '150%'),
    avgROILabel: getContent('successStoriesMetrics', 'avgROILabel', 'Average ROI Increase'),
    companiesServed: getContent('successStoriesMetrics', 'companiesServed', '500+'),
    companiesServedLabel: getContent('successStoriesMetrics', 'companiesServedLabel', 'Companies Served'),
    costSavings: getContent('successStoriesMetrics', 'costSavings', '$50M+'),
    costSavingsLabel: getContent('successStoriesMetrics', 'costSavingsLabel', 'Total Cost Savings')
  });

  const getCTAContent = () => ({
    title: getContent('successStoriesCTA', 'title', 'Ready to Transform Your Business?'),
    description: getContent('successStoriesCTA', 'description', 'Join hundreds of companies that have already transformed their operations with our AI solutions. Start your journey today.'),
    buttonText: getContent('successStoriesCTA', 'buttonText', 'Get Started Today')
  });

  return {
    content,
    loading,
    error,
    getHeroContent,
    getMetricsContent,
    getCTAContent
  };
};
