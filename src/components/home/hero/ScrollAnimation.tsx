
import { useState, useEffect } from 'react';

const ScrollAnimation = () => {
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 0.016); // ~60fps
    }, 16);
    
    return () => clearInterval(interval);
  }, []);
  
  // Calculate transform values based on time for automatic movement
  const layer1Transform = Math.sin(time * 0.3) * 20;
  const layer2Transform = Math.sin(time * 0.4) * 25;
  const layer3Transform = Math.sin(time * 0.5) * 30;
  const layer4Transform = Math.sin(time * 0.6) * 25;
  const layer5Transform = Math.sin(time * 0.7) * 20;
  
  const layer1Rotate = Math.cos(time * 0.2) * 10;
  const layer2Rotate = Math.cos(time * 0.3) * 15;
  const layer3Rotate = Math.cos(time * 0.4) * 12;
  const layer4Rotate = Math.cos(time * 0.35) * 15;
  const layer5Rotate = Math.cos(time * 0.25) * 10;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Layer 1 - Outermost */}
      <div 
        className="absolute left-8 top-16 w-[700px] h-[700px] opacity-80"
        style={{
          transform: `translateY(${layer1Transform}px) rotateY(${layer1Rotate}deg)`,
        }}
      >
        <div className="w-full h-full animate-snake-slow bg-gradient-to-br from-orange-400/25 to-red-500/25 rounded-[40%]"></div>
      </div>
      
      {/* Layer 2 */}
      <div 
        className="absolute left-16 top-24 w-[700px] h-[700px] opacity-85"
        style={{
          transform: `translateY(${layer2Transform}px) rotateY(${layer2Rotate}deg)`,
        }}
      >
        <div className="w-full h-full animate-wave-fast bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-[35%]"></div>
      </div>
      
      {/* Layer 3 - Central layers */}
      <div 
        className="absolute left-24 top-32 w-[700px] h-[700px] opacity-90"
        style={{
          transform: `translateY(${layer3Transform}px) rotateY(${layer3Rotate}deg)`,
        }}
      >
        <div className="w-full h-full animate-float-curve bg-gradient-to-br from-orange-600/18 to-red-700/18 rounded-[30%]"></div>
      </div>
      
      {/* Layer 4 */}
      <div 
        className="absolute left-32 top-40 w-[700px] h-[700px] opacity-85"
        style={{
          transform: `translateY(${layer4Transform}px) rotateY(${layer4Rotate}deg)`,
        }}
      >
        <div className="w-full h-full animate-slide-curve bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-[35%]"></div>
      </div>
      
      {/* Layer 5 - Innermost */}
      <div 
        className="absolute left-40 top-48 w-[700px] h-[700px] opacity-80"
        style={{
          transform: `translateY(${layer5Transform}px) rotateY(${layer5Rotate}deg)`,
        }}
      >
        <div className="w-full h-full animate-drift-curve bg-gradient-to-br from-orange-400/25 to-red-500/25 rounded-[40%]"></div>
      </div>
      
      {/* Additional floating particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-400/60 rounded-full animate-float"
            style={{
              left: `${5 + (i * 8)}%`,
              top: `${10 + (i * 6)}%`,
              transform: `translateY(${Math.sin(time * 0.8 + i) * 10}px)`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollAnimation;
