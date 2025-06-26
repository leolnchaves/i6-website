
import { CheckCircle, ArrowRight, Target, Users, Cog, TrendingUp, DollarSign, BarChart3, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const Solutions = () => {
  console.log('Solutions page is rendering');
  
  const { t } = useLanguage();

  const solutions = [
    {
      icon: <Target className="w-12 h-12 text-blue-600" />,
      title: 'Smart Discovery for Anonymous Visitors',
      focus: 'Focus: B2B, B2C | Segment: All',
      description: 'Turn anonymous traffic into engaged buyers. Our engine uses real-time signals and context to drive high-value recommendations without needing prior user history.',
      features: [
        'Contextual Affinity Modeling',
        'Cold-Start Personalization',
        'Anonymous Visitor Intelligence',
        'Real-time Recommendations'
      ],
      outcome: 'Unlocks product discovery and boosts engagement with zero historical data.',
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: <Users className="w-12 h-12 text-purple-600" />,
      title: 'Predictive Personalization for Identified Users',
      focus: 'Focus: B2B, B2C, B2B2C, D2C | Segment: All',
      description: 'Deliver truly personalized experiences by predicting customer needs based on individual behavior and preferences. Increase retention and drive higher purchase frequency.',
      features: [
        'Behavioral Data Analysis',
        'Omnichannel Personalization',
        'Cross-sell and Up-sell Intelligence',
        'Profile Enrichment and Scoring'
      ],
      outcome: 'Increases customer lifetime value with intelligent, behavior-based personalization.',
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: <Cog className="w-12 h-12 text-green-600" />,
      title: 'Industrial Recommendation Intelligence',
      focus: 'Focus: B2B, B2B2C | Segment: Industry and Manufacturing',
      description: 'Align commercial targets with intelligent recommendations that optimize assortment, pricing, and POS behavior — all in real time.',
      features: [
        'Assortment Optimization',
        'Dynamic Pricing Integration',
        'Commercial Target Alignment',
        'POS Behavioral Forecasting'
      ],
      outcome: 'Drives product relevance and sell-out, aligned with revenue and margin goals.',
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-orange-600" />,
      title: 'Predictive Campaign Targeting',
      focus: 'Focus: B2C | Segment: All',
      description: 'Identify and activate only the users most likely to convert before your campaign even begins. Reduce CAC and increase effectiveness with precision targeting.',
      features: [
        'Propensity Modeling',
        'Conversion Likelihood Scoring',
        'Campaign Audience Refinement',
        'Lead Activation Strategy'
      ],
      outcome: 'Maximizes ROI by targeting the right customer at the right time.',
      gradient: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      icon: <DollarSign className="w-12 h-12 text-red-600" />,
      title: 'Smart Price Optimization',
      focus: 'Focus: B2B, B2C, B2B2C, D2C | Segment: All',
      description: 'A dynamic pricing solution that adapts in real time to demand, behavior, and product lifecycle. Maximize profitability without losing competitiveness.',
      features: [
        'Behavior-Based Pricing',
        'Lifecycle-Aware Strategy',
        'Price Sensitivity Calibration',
        'Margin Optimization Engine'
      ],
      outcome: 'Improves margin, sales velocity, and competitiveness through intelligent pricing.',
      gradient: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-teal-600" />,
      title: 'Adaptive Demand Forecasting',
      focus: 'Focus: B2B, B2C | Segment: All',
      description: 'Forecast demand with precision and adaptability. Our self-adjusting models project future sales based on trends, seasonality, and behaviors — empowering supply chain and commercial planning.',
      features: [
        'Self-Reinforcing Forecast Model',
        'Extended Projection (N+M)',
        'Seasonality and Trend Detection',
        'Inventory and Supply Chain Alignment'
      ],
      outcome: 'Enhances demand planning accuracy and agility in fast-changing markets.',
      gradient: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200"
    }
  ];

  const processSteps = [
    {
      key: "discovery",
      title: "Discovery & Business Angle Definition",
      subtitle: "Business Requirement Analysis",
      description: "Understanding your business needs and defining the optimal approach",
      color: "from-blue-500 to-blue-600"
    },
    {
      key: "data",
      title: "Data Sample & Anonymization",
      subtitle: "Secure Data Processing",
      description: "Collecting and preparing your data with full privacy protection",
      color: "from-purple-500 to-purple-600"
    },
    {
      key: "training",
      title: "Model Training & Fine-tuning",
      subtitle: "Business-Oriented Training",
      description: "Building custom AI models tailored to your specific business context",
      color: "from-green-500 to-green-600"
    },
    {
      key: "testing",
      title: "Performance Evaluation",
      subtitle: "Precision & Backtest Analysis",
      description: "Comprehensive testing to ensure optimal performance and accuracy",
      color: "from-orange-500 to-orange-600"
    },
    {
      key: "integration",
      title: "Integration & Recommendations",
      subtitle: "Active Digital Channel Integration",
      description: "Seamless deployment across your digital ecosystem",
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="block mb-2">AI Solutions</span>
              <span className="block bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent pb-2">
                for Modern Business
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover how our AI solutions can transform your business operations and drive growth.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className={`border-2 ${solution.borderColor} ${solution.bgColor} shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 overflow-hidden`}>
                <div className={`h-1 bg-gradient-to-r ${solution.gradient}`}></div>
                <CardHeader className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="mr-4 mt-1">
                      {solution.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                        {solution.title}
                      </CardTitle>
                      <div className="text-sm text-gray-600 font-medium mb-3 bg-white/60 rounded-full px-3 py-1 inline-block">
                        {solution.focus}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {solution.description}
                  </p>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="space-y-2 mb-6">
                    {solution.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-white/70 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Business Outcomes:</h4>
                    <p className="text-gray-700 text-sm">{solution.outcome}</p>
                  </div>
                  
                  <Button className={`w-full bg-gradient-to-r ${solution.gradient} hover:opacity-90 text-white transition-all duration-300 shadow-md hover:shadow-lg`}>
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              AI Implementation Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
              Risk-free testing. Concrete potential in 30 days.
            </p>
          </div>

          {/* Process Flow */}
          <div className="relative max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-4">
              {processSteps.map((step, index) => (
                <div key={step.key} className="flex flex-col items-center relative">
                  {/* Step Card */}
                  <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 max-w-xs text-center border border-gray-200">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 leading-tight">
                      {step.title}
                    </h3>
                    <div className="text-sm text-gray-600 mb-3 font-medium">
                      ({step.subtitle})
                    </div>
                  </div>
                  
                  {/* Circular Process Icon */}
                  <div className="my-6">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  
                  {/* Arrow (except for last item) */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-8 transform -translate-y-1/2">
                      <ChevronRight className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Bottom Section */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-orange-100 to-orange-50 rounded-xl p-8 border border-orange-200">
                <h3 className="text-2xl font-bold text-orange-800 mb-4">
                  Sandbox Environment & Consulting Support Included
                </h3>
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
                  <div className="bg-white rounded-full px-6 py-3 border-2 border-orange-300 shadow-md">
                    <span className="font-semibold text-orange-700">FAST TRACK SCALE</span>
                  </div>
                  <div className="bg-white rounded-full px-6 py-3 border-2 border-orange-300 shadow-md">
                    <span className="font-semibold text-orange-700">API Integration & Model Maturity Enhancement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Transform Your Business Today
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ready to revolutionize your business with AI? Let's discuss how we can help you achieve your goals.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
