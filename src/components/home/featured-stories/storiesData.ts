
import { TrendingUp, Users, DollarSign } from 'lucide-react';

export const createStoriesData = (t: any) => [
  {
    id: 1,
    company: t('successStories.stories.techcorp.company'),
    industry: t('successStories.stories.techcorp.industry'),
    description: t('home.featuredStories.techcorp.description'),
    challenge: t('successStories.stories.techcorp.challenge'),
    solution: t('successStories.stories.techcorp.solution'),
    quote: t('successStories.stories.techcorp.quote'),
    author: t('successStories.stories.techcorp.author'),
    results: [
      { icon: TrendingUp, value: "75%", label: t('successStories.common.downtimeReduction') },
      { icon: DollarSign, value: "$2.3M", label: t('successStories.common.costSavings') },
      { icon: Users, value: "40%", label: t('successStories.common.efficiencyIncrease') }
    ],
    videoThumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    company: t('successStories.stories.financeflow.company'),
    industry: t('successStories.stories.financeflow.industry'),
    description: t('home.featuredStories.financeflow.description'),
    challenge: t('successStories.stories.financeflow.challenge'),
    solution: t('successStories.stories.financeflow.solution'),
    quote: t('successStories.stories.financeflow.quote'),
    author: t('successStories.stories.financeflow.author'),
    results: [
      { icon: Users, value: "99.2%", label: t('home.featuredStories.detectionRate') },
      { icon: TrendingUp, value: "10x", label: t('successStories.common.processingSpeed') },
      { icon: DollarSign, value: "-85%", label: t('successStories.common.falsePositives') }
    ],
    videoThumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
    videoUrl: "https://cdn.freepik.com/free-video/work-team-analyzing-comparing-papers-results-meeting-coffee-shop_167239.mp4",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    company: t('successStories.stories.retailmax.company'),
    industry: t('successStories.stories.retailmax.industry'),
    description: t('home.featuredStories.retailmax.description'),
    challenge: t('successStories.stories.retailmax.challenge'),
    solution: t('successStories.stories.retailmax.solution'),
    quote: t('successStories.stories.retailmax.quote'),
    author: t('successStories.stories.retailmax.author'),
    results: [
      { icon: DollarSign, value: "45%", label: t('successStories.common.revenueGrowth') },
      { icon: Users, value: "+60%", label: t('home.featuredStories.retention') },
      { icon: TrendingUp, value: "3x", label: t('successStories.common.inventoryTurnover') }
    ],
    videoThumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_3mb.mp4",
    color: "from-orange-500 to-red-500"
  }
];
