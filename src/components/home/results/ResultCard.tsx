
import React from 'react';

interface ResultCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  solutions: string[];
  index: number;
  backgroundColor?: string;
  backgroundOpacity?: number;
}

const ResultCard = ({ icon, title, description, solutions, index, backgroundColor, backgroundOpacity }: ResultCardProps) => {
  return (
    <div
      className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-200 will-change-transform transform hover:scale-[1.02] h-full min-h-[280px] flex flex-col text-left group"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}
    >
      <div className="flex-shrink-0 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center will-change-transform group-hover:scale-105 transition-transform duration-150 ease-out">
          {React.cloneElement(icon as React.ReactElement, {
            className: "text-primary text-lg"
          })}
        </div>
      </div>
      
      <div className="flex-grow">
        <h3 className="text-sm font-bold text-gray-900 mb-3 leading-tight">
          {title}
        </h3>
        
        <p className="text-gray-600 text-xs leading-relaxed mb-4">
          {description}
        </p>

        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-gray-800 mb-2">AI-Driven Outcomes:</h4>
          <ul className="space-y-1">
            {solutions.map((solution, idx) => (
              <li key={idx} className="text-[10px] text-gray-600 flex items-start">
                <span className="w-1 h-1 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                <span className="leading-relaxed">{solution}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
