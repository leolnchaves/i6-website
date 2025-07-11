
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
      className="bg-white p-6 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.2)] transition-all duration-300 transform hover:-translate-y-2 aspect-square flex flex-col items-center justify-center text-center group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {React.cloneElement(icon as React.ReactElement, {
            className: "text-primary text-3xl"
          })}
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-2 text-center leading-tight">
        {title}
      </h3>
      
      <p className="text-gray-600 text-center text-sm leading-snug">
        {description}
      </p>
    </div>
  );
};

export default ResultCard;
