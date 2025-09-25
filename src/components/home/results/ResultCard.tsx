
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
      className="bg-white rounded-xl border-2 border-transparent bg-gradient-to-r from-orange-500 to-blue-500 p-[1px] hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] h-full"
      style={{ 
        animationDelay: `${index * 0.1}s`
      }}
    >
      <div className="bg-white rounded-xl p-4 h-full flex flex-col min-h-[200px]">
        {/* Header com imagem e número */}
        <div className="flex justify-between items-start mb-3">
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
          
          <div className="text-right ml-2">
            <div className="text-lg font-bold text-gray-800">{index + 1}</div>
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
