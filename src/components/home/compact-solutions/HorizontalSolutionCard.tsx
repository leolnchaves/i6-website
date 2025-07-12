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
  features
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

  // Imagens para os cards (primeiras são os GIFs específicos)
  const placeholderImages = [
    '/solution-Anonymous-Visitors.gif',
    '/solucao-Identified-Users.gif',
    '/solucao-Industrial-Intelligence.gif',
    '/solucao-Smart-Price.gif',
    'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=200&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop&crop=center'
  ];

  const imageUrl = placeholderImages[index % placeholderImages.length];

  // Define cores baseadas no índice usando as cores do sistema - versões mais sutis
  const colorSchemes = [
    { text: 'text-primary', gradient: 'from-primary/60 to-orange-400/60' },
    { text: 'text-orange-600', gradient: 'from-orange-400/60 to-red-400/60' },
    { text: 'text-blue-600', gradient: 'from-blue-400/60 to-purple-400/60' }
  ];
  
  const colorScheme = colorSchemes[index % colorSchemes.length];

  return (
    <div className="group bg-white rounded-t-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative mb-6">
      <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} min-h-[160px]`}>
        {/* Image Side */}
        <div className="md:w-2/5 relative overflow-hidden">
          <img 
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        </div>

        {/* Content Side */}
        <div className="md:w-3/5 p-4 flex flex-col justify-start">
          <span className={`${colorScheme.text} text-xs font-medium tracking-wider uppercase mb-3`}>
            {category}
          </span>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
            {title}
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {description}
          </p>

          {/* Features list if available */}
          {features && features.length > 0 && (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              {features.slice(0, 4).map((feature, idx) => (
                <li key={idx} className="text-xs text-gray-500 flex items-start">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Innovative Bottom Bar with Text - Aligned with card bottom */}
      <div className={`absolute top-full left-0 right-0 h-8 bg-gradient-to-r ${colorScheme.gradient} transform scale-x-0 group-hover:scale-x-100 transition-all duration-500 ease-out origin-left flex items-center justify-center cursor-pointer`}>
        <a 
          href="/solutions"
          className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 hover:underline flex items-center gap-2 drop-shadow-md"
        >
          <span>Explore Solution</span>
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default HorizontalSolutionCard;