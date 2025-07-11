
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
      className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 aspect-square flex flex-col items-center justify-center text-center group border border-gray-100"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="w-16 h-16 mb-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        {React.cloneElement(icon as React.ReactElement, {
          className: "text-orange-500 w-8 h-8"
        })}
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
        {title}
      </h3>
      
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ResultCard;
