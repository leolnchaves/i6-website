
import { useEffect, useState } from 'react';

const ClientCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [clients.length]);

  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-center">
        <div 
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 200}px)` }}
        >
          {clients.concat(clients).map((client, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 h-16 mx-4 flex items-center justify-center text-white/30 text-lg font-semibold"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientCarousel;
