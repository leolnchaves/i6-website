
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
      className="bg-white rounded-2xl border-2 border-transparent bg-gradient-to-r from-orange-500 to-blue-500 p-[2px] hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] h-full"
      style={{ 
        animationDelay: `${index * 0.1}s`
      }}
    >
      <div className="bg-white rounded-2xl p-6 h-full flex flex-col min-h-[280px]">
        {/* Área da imagem/ícone */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            {cardImage ? (
              <img 
                src={cardImage} 
                alt={title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            )}
          </div>
          
          {/* Número do card no canto */}
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-800">{index + 1}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">RESULTADO</div>
          </div>
        </div>
        
        {/* Título principal */}
        <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
          {title}
        </h3>
        
        {/* Descrição */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
          {description}
        </p>
        
        {/* Lista de resultados - apenas os 2 primeiros */}
        <div className="mt-auto border-t border-gray-100 pt-4">
          <div className="space-y-2">
            {solutions.slice(0, 2).map((solution, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-xs text-gray-600 leading-relaxed">{solution}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
