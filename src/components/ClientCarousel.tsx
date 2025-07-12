
import { useState } from 'react';

const ClientCarousel = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Client logos with the provided images
  const clients = [
    { name: 'HERING', logo: '/lovable-uploads/9194246b-c699-4d07-b09b-6a4d309e7821.png' },
    { name: 'EMS', logo: '/lovable-uploads/58e286a1-1e55-47cc-8524-dc041be15b81.png' },
    { name: 'LEGRAND', logo: '/lovable-uploads/373196c0-5b6e-4e60-80c3-a1da99265d12.png' },
    { name: 'COGNA', logo: '/lovable-uploads/534d8da1-8e73-4707-9c28-3bb33e0fdfb6.png' },
    { name: 'ACHĒ', logo: '/lovable-uploads/a78ba018-aaab-423f-ac52-89f6cf1ff6ef.png' },
    { name: 'NATURA&CO', logo: '/lovable-uploads/c8169903-2836-45f3-830c-db6dc7e8ac9e.png' },
    { name: 'JEQUITI', logo: '/lovable-uploads/05313f6e-5f31-4189-8824-1615d0b72bfc.png' },
    { name: 'EMBRAER', logo: '/lovable-uploads/6d813ac5-011f-4bff-b35a-6eed9b162869.png' },
    { name: 'BANCO XYZ', logo: '/lovable-uploads/78e4760f-4843-4f50-b0b1-f93b9cf828f2.png' },
    { name: 'FINANCORP', logo: '/lovable-uploads/8c0acc2d-915a-484e-b83e-c82c3de47aa5.png' }
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
