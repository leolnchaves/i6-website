
import { useState } from 'react';
import clientHering from '@/assets/client-hering.png';
import clientEms from '@/assets/client-ems.png';
import clientLegrand from '@/assets/client-legrand.png';
import clientCogna from '@/assets/client-cogna.png';
import clientAche from '@/assets/client-ache.png';
import clientNatura from '@/assets/client-natura.png';
import clientJequiti from '@/assets/client-jequiti.png';
import clientEmbraer from '@/assets/client-embraer.png';
import clientBanco from '@/assets/client-banco.png';
import clientFinancorp from '@/assets/client-financorp.png';

const ClientCarousel = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Client logos with the provided images
  const clients = [
    { name: 'HERING', logo: clientHering },
    { name: 'EMS', logo: clientEms },
    { name: 'LEGRAND', logo: clientLegrand },
    { name: 'COGNA', logo: clientCogna },
    { name: 'ACHĒ', logo: clientAche },
    { name: 'NATURA&CO', logo: clientNatura },
    { name: 'JEQUITI', logo: clientJequiti },
    { name: 'EMBRAER', logo: clientEmbraer },
    { name: 'BANCO XYZ', logo: clientBanco },
    { name: 'FINANCORP', logo: clientFinancorp }
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
