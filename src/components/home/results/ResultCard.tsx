
import React from 'react';

interface ResultCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  solutions: string[];
  index: number;
  backgroundColor?: string;
  backgroundOpacity?: number;
  cardImage?: string; // Nova prop para imagem do card
}

const ResultCard = ({ icon, title, description, solutions, index, backgroundColor, backgroundOpacity, cardImage }: ResultCardProps) => {
  return (
    <div
      className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 will-change-transform transform hover:scale-[1.02] h-full min-h-[320px] flex flex-col overflow-hidden group"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}
    >
      {/* Imagem do topo */}
      <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {cardImage ? (
          <img 
            src={cardImage} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
            {React.cloneElement(icon as React.ReactElement, {
              className: "text-primary text-4xl"
            })}
          </div>
        )}
        
        {/* Data no canto superior direito */}
        <div className="absolute top-4 right-4 text-gray-600 text-xs font-medium bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg">
          {`${index + 1}º`}
        </div>
      </div>
      
      {/* Conteúdo do card */}
      <div className="flex-grow p-6 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Lista de resultados compacta */}
        <div className="mt-auto">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Resultados orientados por IA
          </h4>
          <div className="space-y-2">
            {solutions.slice(0, 3).map((solution, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                <span className="text-xs text-gray-600 leading-relaxed line-clamp-2">{solution}</span>
              </div>
            ))}
            {solutions.length > 3 && (
              <div className="text-xs text-gray-400 italic">
                +{solutions.length - 3} mais resultados...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
