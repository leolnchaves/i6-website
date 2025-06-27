
import React from 'react';

interface StatCardProps {
  value: string;
  label: string | React.ReactNode;
  delay?: string;
}

const StatCard = ({ value, label, delay = '0s' }: StatCardProps) => {
  return (
    <div className="scroll-reveal" style={{ animationDelay: delay }}>
      <div className="text-5xl font-bold mb-2 animate-bounce-in">{value}</div>
      <div className="text-xl opacity-90">{label}</div>
    </div>
  );
};

export default StatCard;
