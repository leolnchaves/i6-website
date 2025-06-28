
import { 
  TrendingUp, 
  Shield, 
  Award, 
  Clock, 
  Target, 
  DollarSign, 
  Eye, 
  ShoppingCart, 
  Search, 
  Users,
  LucideIcon
} from 'lucide-react';

interface DynamicIconProps {
  iconName: string;
  className?: string;
}

const iconMap: { [key: string]: LucideIcon } = {
  TrendingUp,
  Shield,
  Award,
  Clock,
  Target,
  DollarSign,
  Eye,
  ShoppingCart,
  Search,
  Users,
};

export const DynamicIcon = ({ iconName, className = "w-8 h-8" }: DynamicIconProps) => {
  const IconComponent = iconMap[iconName];
  
  if (!IconComponent) {
    // Fallback to TrendingUp if icon not found
    return <TrendingUp className={className} />;
  }
  
  return <IconComponent className={className} />;
};
