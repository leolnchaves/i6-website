import { ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface HorizontalSolutionCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
  category: string;
  features?: string[];
  outcome?: string;
}

const HorizontalSolutionCard = ({ 
  title, 
  description, 
  icon, 
  index, 
  category,
  features,
  outcome 
}: HorizontalSolutionCardProps) => {
  // Função para obter o ícone do Lucide baseado no nome do banco
  const getIcon = (iconName: string) => {
    const pascalCase = iconName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    
    const IconComponent = (LucideIcons as any)[pascalCase] || 
                          (LucideIcons as any)[iconName] || 
                          LucideIcons.Building2;
    
    return IconComponent;
  };

  const IconComponent = getIcon(icon);
  const isReversed = index % 2 === 1;

  // Define cores baseadas no índice usando as cores do sistema
  const colorSchemes = [
    { text: 'text-primary', bg: 'from-primary/5 to-primary/10', accent: 'bg-primary/20' },
    { text: 'text-orange-600', bg: 'from-orange-500/5 to-orange-600/10', accent: 'bg-orange-500/20' },
    { text: 'text-blue-600', bg: 'from-blue-500/5 to-blue-600/10', accent: 'bg-blue-500/20' }
  ];
  
  const colorScheme = colorSchemes[index % colorSchemes.length];

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.2)] transition-all duration-500 transform hover:-translate-y-2">
      <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
        {/* Image/Icon Side */}
        <div className="md:w-2/5 relative">
          <div className={`w-full h-64 bg-gradient-to-br ${colorScheme.bg} flex items-center justify-center relative overflow-hidden`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] opacity-30"></div>
            
            {/* Main Icon */}
            <div className="relative z-10">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl">
                <IconComponent className={`w-12 h-12 ${colorScheme.text}`} />
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-white/30 rounded-full"></div>
            <div className="absolute bottom-6 right-6 w-2 h-2 bg-white/20 rounded-full"></div>
            <div className="absolute top-1/3 right-4 w-1 h-1 bg-white/40 rounded-full"></div>
          </div>
        </div>

        {/* Content Side */}
        <div className="md:w-3/5 p-6 flex flex-col justify-center">
          <span className={`${colorScheme.text} text-sm font-medium tracking-wider uppercase mb-2`}>
            {category}
          </span>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {title}
          </h3>
          
          <p className="text-gray-600 text-base leading-relaxed mb-4">
            {description}
          </p>

          {/* Features list if available */}
          {features && features.length > 0 && (
            <ul className="space-y-1 mb-4">
              {features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="text-sm text-gray-500 flex items-start">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Outcome if available */}
          {outcome && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Resultado</p>
              <p className="text-sm text-gray-700">{outcome}</p>
            </div>
          )}
          
          <a
            href="/solutions"
            className={`inline-flex items-center ${colorScheme.text} font-medium group`}
          >
            <span className="mr-2 group-hover:mr-4 transition-all">
              Explore a Solução
            </span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HorizontalSolutionCard;