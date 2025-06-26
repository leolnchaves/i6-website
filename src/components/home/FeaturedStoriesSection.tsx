
import { Play, ArrowRight, TrendingUp, Users, DollarSign, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const FeaturedStoriesSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const stories = [
    {
      id: 1,
      company: "TechCorp Industries",
      industry: "Manufacturing",
      description: "AI-powered predictive maintenance reduced downtime by 75%",
      challenge: "Reducing production downtime and optimizing efficiency",
      solution: "AI-powered predictive maintenance and quality control",
      quote: "Infinity6's AI solutions transformed our manufacturing process. We've seen unprecedented efficiency gains and cost reductions.",
      author: "Sarah Johnson, CTO",
      results: [
        { icon: <TrendingUp className="w-4 h-4" />, value: "75%", label: "Downtime Reduction" },
        { icon: <DollarSign className="w-4 h-4" />, value: "$2.3M", label: "Cost Savings" },
        { icon: <Users className="w-4 h-4" />, value: "40%", label: "Efficiency Increase" }
      ],
      videoThumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      company: "FinanceFlow",
      industry: "Financial Services", 
      description: "Machine learning fraud detection with 99.2% accuracy rate",
      challenge: "Fraud detection and risk assessment automation",
      solution: "Machine learning algorithms for real-time transaction analysis",
      quote: "The AI-driven fraud detection system has revolutionized our security operations while improving customer experience.",
      author: "Michael Chen, VP of Operations",
      results: [
        { icon: <Users className="w-4 h-4" />, value: "99.2%", label: "Detection Rate" },
        { icon: <TrendingUp className="w-4 h-4" />, value: "10x", label: "Processing Speed" },
        { icon: <DollarSign className="w-4 h-4" />, value: "-85%", label: "False Positives" }
      ],
      videoThumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      company: "RetailMax",
      industry: "E-commerce",
      description: "AI recommendation engine boosted revenue by 45%",
      challenge: "Personalizing customer experience and inventory management",
      solution: "AI recommendation engine and demand forecasting",
      quote: "Our customers love the personalized experience, and our inventory management has never been more efficient.",
      author: "Lisa Rodriguez, CEO",
      results: [
        { icon: <DollarSign className="w-4 h-4" />, value: "45%", label: "Revenue Growth" },
        { icon: <Users className="w-4 h-4" />, value: "+60%", label: "Retention" },
        { icon: <TrendingUp className="w-4 h-4" />, value: "3x", label: "Inventory Turnover" }
      ],
      videoThumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_3mb.mp4",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Success Stories That
            <span className="block bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
              Transform Industries
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how leading companies achieved remarkable results with our AI solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stories.map((story, index) => (
            <Card 
              key={story.id}
              className={`group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden bg-white ${
                hoveredCard === index ? 'scale-110 z-20' : ''
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-0">
                {/* Video Container with Thumbnail and Video */}
                <div className={`relative overflow-hidden transition-all duration-500 ${
                  hoveredCard === index ? 'h-48' : 'h-48'
                }`}>
                  {/* Thumbnail Image */}
                  <img 
                    src={story.videoThumbnail}
                    alt={story.company}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      hoveredCard === index ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  
                  {/* Video Element */}
                  <video 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                      hoveredCard === index ? 'opacity-100' : 'opacity-0'
                    }`}
                    src={story.videoUrl}
                    muted
                    loop
                    autoPlay={hoveredCard === index}
                  />

                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${story.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  
                  {/* Play Button - only show when not hovering */}
                  {hoveredCard !== index && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform transition-all duration-300 hover:bg-white hover:scale-110">
                        <Play className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" />
                      </div>
                    </div>
                  )}

                  {/* Industry Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {story.industry}
                    </span>
                  </div>
                </div>

                {/* Content - Expanded when hovered */}
                <div className={`p-6 transition-all duration-500 ${
                  hoveredCard === index ? 'min-h-[400px]' : ''
                }`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{story.company}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{story.description}</p>
                  
                  {/* Expanded content when hovered */}
                  {hoveredCard === index && (
                    <div className="space-y-4 animate-fade-in">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">Challenge</h4>
                        <p className="text-gray-600 text-sm">{story.challenge}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">Solution</h4>
                        <p className="text-gray-600 text-sm">{story.solution}</p>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                        <Quote className="w-5 h-5 text-blue-600 mb-2" />
                        <p className="text-gray-800 italic text-sm mb-2">"{story.quote}"</p>
                        <p className="text-gray-600 text-xs font-medium">— {story.author}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Results - Always visible but adjusted spacing */}
                  <div className={`grid grid-cols-3 gap-2 ${hoveredCard === index ? 'mt-4' : 'mb-4'}`}>
                    {story.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-sm font-bold text-blue-600">{result.value}</div>
                        <div className="text-xs text-gray-600">{result.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Learn More Link - Only when not hovered */}
                  {hoveredCard !== index && (
                    <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Stories Button */}
        <div className="text-center">
          <Link to="/success-stories">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              View All Success Stories
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStoriesSection;
