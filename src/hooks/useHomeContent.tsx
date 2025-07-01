
interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
}

interface StatData {
  value: string;
  label: string;
}

export const useHomeContent = () => {
  const getHeroContent = (): HeroContent => {
    return {
      title: "Transform Your Business with AI Innovation",
      subtitle: "Powered by Advanced Intelligence",
      description: "Harness the power of artificial intelligence to revolutionize your operations, enhance decision-making, and drive unprecedented growth across all aspects of your business."
    };
  };

  const getStatsContent = () => {
    return {
      stat1: { value: "500+", label: "AI Projects Completed" },
      stat2: { value: "98%", label: "Client Satisfaction Rate" },
      stat3: { value: "2.5x", label: "Average ROI Increase" },
      stat4: { value: "24/7", label: "AI Support Available" }
    };
  };

  return {
    getHeroContent,
    getStatsContent
  };
};
