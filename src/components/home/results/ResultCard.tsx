
import React from 'react';

interface ResultCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  backgroundColor?: string;
  backgroundOpacity?: number;
}

const ResultCard = ({ icon, title, description, index, backgroundColor, backgroundOpacity }: ResultCardProps) => {
  return (
    <div
      className="bg-white p-3 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.2)] transition-all duration-300 transform hover:-translate-y-2 h-full min-h-[200px] flex flex-col items-center justify-between text-center group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex-shrink-0">
        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {React.cloneElement(icon as React.ReactElement, {
            className: "text-primary text-lg"
          })}
        </div>
      </div>
      
      <div className="flex-grow flex flex-col justify-center">
        <h3 className="text-xs font-bold text-gray-900 mb-2 text-center leading-tight px-1 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-600 text-center text-[10px] leading-tight px-1 line-clamp-4">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
