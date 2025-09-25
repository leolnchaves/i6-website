
import React from 'react';

interface ResultCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  solutions: string[];
  index: number;
  backgroundColor?: string;
  backgroundOpacity?: number;
  cardImage?: string;
}

const ResultCard = ({ title, description, solutions, index, cardImage }: ResultCardProps) => {
  return (
    <div
      className="bg-white rounded-xl border border-gray-100/50 shadow-sm hover:shadow-lg hover:border-gray-200/60 transition-all duration-300 transform hover:scale-[1.02] h-full relative overflow-hidden"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 8px 24px rgba(251, 146, 60, 0.04)'
      }}
    >
      {/* Linha de destaque sutil no topo */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-400/30 via-blue-400/30 to-orange-400/30"></div>
      
      <div className="p-4 h-full flex flex-col min-h-[200px]">
        {/* Header com imagem */}
        <div className="flex justify-start items-start mb-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            {cardImage ? (
              <img 
                src={cardImage} 
                alt={title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-lg">📊</span>
            )}
          </div>
        </div>
        
        {/* Título compacto */}
        <h3 className="text-sm font-bold text-gray-900 mb-2 leading-tight line-clamp-2">
          {title}
        </h3>
        
        {/* Descrição breve */}
        <p className="text-gray-600 text-xs leading-relaxed mb-3 flex-grow line-clamp-3">
          {description}
        </p>
        
        {/* Apenas 1 resultado principal */}
        <div className="mt-auto pt-2 border-t border-gray-100">
          <div className="flex items-start gap-2">
            <div className="w-1 h-1 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <span className="text-xs text-gray-600 leading-relaxed line-clamp-1">
              {solutions[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
