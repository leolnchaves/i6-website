
import { useState } from 'react';
import { PROCESSED_ASSETS } from '@/utils/assetUtils';

const ClientCarousel = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Client logos with the provided images
  const clients = [
    { name: 'HERING', logo: PROCESSED_ASSETS.CLIENTS.HERING },
    { name: 'EMS', logo: PROCESSED_ASSETS.CLIENTS.EMS },
    { name: 'LEGRAND', logo: PROCESSED_ASSETS.CLIENTS.LEGRAND },
    { name: 'COGNA', logo: PROCESSED_ASSETS.CLIENTS.COGNA },
    { name: 'ACHĒ', logo: PROCESSED_ASSETS.CLIENTS.ACHE },
    { name: 'NATURA&CO', logo: PROCESSED_ASSETS.CLIENTS.NATURA },
    { name: 'JEQUITI', logo: PROCESSED_ASSETS.CLIENTS.JEQUITI },
    { name: 'EMBRAER', logo: PROCESSED_ASSETS.CLIENTS.EMBRAER },
    { name: 'BANCO XYZ', logo: PROCESSED_ASSETS.CLIENTS.BANCO },
    { name: 'FINANCORP', logo: PROCESSED_ASSETS.CLIENTS.FINANCORP }
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
            animationDuration: `${doubledClients.length * 3}s`
          }}
        >
          {doubledClients.map((client, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 h-16 mx-6 flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <img 
                src={client.logo} 
                alt={client.name}
                className={`object-contain opacity-30 hover:opacity-50 transition-opacity duration-300 filter grayscale brightness-75 ${
                  client.name === 'NATURA&CO' ? 'max-h-10 max-w-32' : 'max-h-12 max-w-full'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientCarousel;
