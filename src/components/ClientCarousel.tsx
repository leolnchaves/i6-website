
import { useEffect, useState } from 'react';

const ClientCarousel = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Sample client logos (using text as placeholders for the carousel)
  const clients = [
    'HERING',
    'EMS',
    'LEGRAND', 
    'COGNA',
    'ACHĒ',
    'NATURA&CO',
    'JEQUITI',
    'EMBRAER',
    'BANCO XYZ',
    'FINANCORP',
    'CREDITECH',
    'FINANCEMAX'
  ];

  // Double the array for seamless loop
  const doubledClients = [...clients, ...clients];

  return (
    <div className="w-full overflow-hidden">
      <div 
        className="flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className={`flex animate-marquee ${isHovered ? 'paused' : ''}`}
          style={{
            width: `${doubledClients.length * 200}px`,
            animation: `marquee ${doubledClients.length * 3}s linear infinite`
          }}
        >
          {doubledClients.map((client, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 h-16 mx-6 flex items-center justify-center text-white/40 text-lg font-medium hover:text-white/70 transition-colors duration-300 cursor-pointer"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee linear infinite;
        }
        
        .animate-marquee.paused {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default ClientCarousel;
