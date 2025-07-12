
import { TrendingUp, Users, DollarSign } from 'lucide-react';

export const createStoriesData = (t: any) => [
  {
    id: 1,
    company: "EMS",
    industry: "Manufacturing",
    description: "Implemented predictive buying intelligence to optimize engagement, prevent stockouts and improve digital sell-out margins.",
    challenge: "Inventory optimization challenges",
    solution: "AI-powered predictive buying intelligence",
    quote: "The predictive intelligence has transformed our supply chain efficiency",
    author: "Supply Chain Director",
    results: [
      { icon: TrendingUp, value: "85%", label: "Stockout Reduction" },
      { icon: DollarSign, value: "32%", label: "Margin Improvement" },
      { icon: Users, value: "78%", label: "Engagement Boost" }
    ],
    videoThumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    company: "World's second-largest foods producer",
    industry: "Manufacturing",
    description: "Deployed AI-powered assortment optimization to boost sales efficiency and uncover new growth opportunities.",
    challenge: "Assortment optimization complexity",
    solution: "AI-powered assortment optimization platform",
    quote: "The AI assortment optimization opened new growth paths we never saw before",
    author: "VP of Sales Strategy",
    results: [
      { icon: TrendingUp, value: "45%", label: "Sales Efficiency" },
      { icon: DollarSign, value: "28%", label: "Revenue Growth" },
      { icon: Users, value: "67%", label: "New Opportunities" }
    ],
    videoThumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
    videoUrl: "https://cdn.freepik.com/free-video/work-team-analyzing-comparing-papers-results-meeting-coffee-shop_167239.mp4",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 3,
    company: "Most traditional fashion brand in LATAM",
    industry: "Fashion",
    description: "Implemented real-time recommendation engine for both logged-in and anonymous users to boost engagement and online sales.",
    challenge: "Personalization for diverse user types",
    solution: "Real-time recommendation engine for all users",
    quote: "The recommendation engine revolutionized our online customer experience",
    author: "Digital Innovation Manager",
    results: [
      { icon: Users, value: "92%", label: "User Engagement" },
      { icon: DollarSign, value: "58%", label: "Online Sales Growth" },
      { icon: TrendingUp, value: "3.2x", label: "Conversion Rate" }
    ],
    videoThumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_3mb.mp4",
    color: "from-purple-500 to-pink-500"
  }
];
