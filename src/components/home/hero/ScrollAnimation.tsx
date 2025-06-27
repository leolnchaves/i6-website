
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ScrollAnimation = () => {
  const { scrollY } = useScrollAnimation();
  
  // Calculate transform values based on scroll position
  const layer1Transform = scrollY * 0.1;
  const layer2Transform = scrollY * 0.15;
  const layer3Transform = scrollY * 0.2;
  const layer4Transform = scrollY * 0.25;
  const layer5Transform = scrollY * 0.3;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Layer 1 - Outermost */}
      <div 
        className="absolute left-1/4 top-1/2 w-[600px] h-[600px] opacity-30"
        style={{
          transform: `translateY(-50%) translateY(${layer1Transform}px) rotateY(${scrollY * 0.1}deg)`,
        }}
      >
        <div className="w-full h-full animate-snake-slow bg-gradient-to-br from-orange-400/2 to-orange-500/3 rounded-[40%] blur-sm"></div>
      </div>
      
      {/* Layer 2 */}
      <div 
        className="absolute left-1/3 top-1/2 w-[550px] h-[550px] opacity-35"
        style={{
          transform: `translateY(-50%) translateY(${layer2Transform}px) rotateY(${scrollY * 0.15}deg)`,
        }}
      >
        <div className="w-full h-full animate-wave-fast bg-gradient-to-br from-orange-500/12 to-orange-600/15 rounded-[35%]"></div>
      </div>
      
      {/* Layer 3 - Central layers */}
      <div 
        className="absolute left-1/2 top-1/2 w-[500px] h-[500px] opacity-40"
        style={{
          transform: `translateX(-50%) translateY(-50%) translateY(${layer3Transform}px) rotateY(${scrollY * 0.2}deg)`,
        }}
      >
        <div className="w-full h-full animate-float-curve bg-gradient-to-br from-orange-600/15 to-orange-700/15 rounded-[30%]"></div>
      </div>
      
      {/* Layer 4 */}
      <div 
        className="absolute right-1/3 top-1/2 w-[550px] h-[550px] opacity-35"
        style={{
          transform: `translateY(-50%) translateY(${layer4Transform}px) rotateY(${scrollY * 0.25}deg)`,
        }}
      >
        <div className="w-full h-full animate-slide-curve bg-gradient-to-br from-orange-500/12 to-orange-600/15 rounded-[35%]"></div>
      </div>
      
      {/* Layer 5 - Outermost right */}
      <div 
        className="absolute right-1/4 top-1/2 w-[600px] h-[600px] opacity-30"
        style={{
          transform: `translateY(-50%) translateY(${layer5Transform}px) rotateY(${scrollY * 0.3}deg)`,
        }}
      >
        <div className="w-full h-full animate-drift-curve bg-gradient-to-br from-orange-400/10 to-orange-500/15 rounded-[40%] blur-sm"></div>
      </div>
      
      {/* Central glowing core - Increased opacity */}
      <div 
        className="absolute left-1/2 top-1/2 w-[300px] h-[300px] opacity-60"
        style={{
          transform: `translateX(-50%) translateY(-50%) translateY(${scrollY * 0.05}px) scale(${1 + scrollY * 0.0005})`,
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-orange-300/12 to-orange-400/15 rounded-full blur-md animate-pulse"></div>
      </div>
      
      {/* Additional floating particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-orange-400/12 rounded-full animate-float"
            style={{
              left: `${15 + (i * 7)}%`,
              top: `${20 + (i * 5)}%`,
              transform: `translateY(${scrollY * (0.02 + i * 0.01)}px)`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollAnimation;
