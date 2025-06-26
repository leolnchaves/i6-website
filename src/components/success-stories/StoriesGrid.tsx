
import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const StoriesGrid = () => {
  const stories = [
    {
      company: "TechCorp Industries",
      industry: "Manufacturing",
      challenge: "Reducing production downtime and optimizing efficiency",
      solution: "AI-powered predictive maintenance and quality control",
      results: [
        { metric: "Downtime Reduction", value: "75%" },
        { metric: "Cost Savings", value: "$2.3M" },
        { metric: "Efficiency Increase", value: "40%" }
      ],
      quote: "Infinity6's AI solutions transformed our manufacturing process. We've seen unprecedented efficiency gains and cost reductions.",
      author: "Sarah Johnson, CTO",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
    },
    {
      company: "FinanceFlow",
      industry: "Financial Services",
      challenge: "Fraud detection and risk assessment automation",
      solution: "Machine learning algorithms for real-time transaction analysis",
      results: [
        { metric: "Fraud Detection", value: "99.2%" },
        { metric: "False Positives", value: "-85%" },
        { metric: "Processing Speed", value: "10x" }
      ],
      quote: "The AI-driven fraud detection system has revolutionized our security operations while improving customer experience.",
      author: "Michael Chen, VP of Operations",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop"
    },
    {
      company: "RetailMax",
      industry: "E-commerce",
      challenge: "Personalizing customer experience and inventory management",
      solution: "AI recommendation engine and demand forecasting",
      results: [
        { metric: "Revenue Growth", value: "45%" },
        { metric: "Customer Retention", value: "+60%" },
        { metric: "Inventory Turnover", value: "3x" }
      ],
      quote: "Our customers love the personalized experience, and our inventory management has never been more efficient.",
      author: "Lisa Rodriguez, CEO",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {stories.map((story, index) => (
            <Card key={index} className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
              <CardContent className="p-0">
                <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={`p-12 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-3"></div>
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {story.industry}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{story.company}</h2>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Challenge</h3>
                      <p className="text-gray-600">{story.challenge}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Solution</h3>
                      <p className="text-gray-600">{story.solution}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {story.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <div className="text-2xl font-bold text-blue-600 mb-1">{result.value}</div>
                          <div className="text-sm text-gray-600">{result.metric}</div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
                      <Quote className="w-8 h-8 text-blue-600 mb-4" />
                      <p className="text-gray-800 italic mb-4">"{story.quote}"</p>
                      <p className="text-gray-600 font-medium">— {story.author}</p>
                    </div>
                  </div>

                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="h-full min-h-[400px] bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <img 
                        src={story.image} 
                        alt={story.company}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesGrid;
