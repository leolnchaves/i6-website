
import { Play, ArrowRight, TrendingUp, Users, DollarSign } from 'lucide-react';
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
      results: [
        { icon: <TrendingUp className="w-4 h-4" />, value: "75%", label: "Downtime Reduction" },
        { icon: <DollarSign className="w-4 h-4" />, value: "$2.3M", label: "Cost Savings" }
      ],
      videoThumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      company: "FinanceFlow",
      industry: "Financial Services", 
      description: "Machine learning fraud detection with 99.2% accuracy rate",
      results: [
        { icon: <Users className="w-4 h-4" />, value: "99.2%", label: "Detection Rate" },
        { icon: <TrendingUp className="w-4 h-4" />, value: "10x", label: "Processing Speed" }
      ],
      videoThumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      company: "RetailMax",
      industry: "E-commerce",
      description: "AI recommendation engine boosted revenue by 45%",
      results: [
        { icon: <DollarSign className="w-4 h-4" />, value: "45%", label: "Revenue Growth" },
        { icon: <Users className="w-4 h-4" />, value: "+60%", label: "Retention" }
      ],
      videoThumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop",
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
              className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden bg-white"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-0">
                {/* Video Thumbnail with Play Button */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={story.videoThumbnail}
                    alt={story.company}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${story.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform transition-all duration-300 ${hoveredCard === index ? 'scale-110' : 'scale-100'} hover:bg-white`}>
                      <Play className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Industry Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {story.industry}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{story.company}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{story.description}</p>
                  
                  {/* Results */}
                  <div className="flex gap-4 mb-4">
                    {story.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="flex items-center gap-1">
                        <div className="text-blue-600">{result.icon}</div>
                        <div className="text-sm">
                          <span className="font-bold text-gray-900">{result.value}</span>
                          <span className="text-gray-600 ml-1">{result.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Learn More Link */}
                  <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
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
