
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
        className="absolute left-1/4 top-1/2 w-[500px] h-[500px] opacity-60"
        style={{
          transform: `translateY(-50%) translateY(${layer1Transform}px) rotateY(${scrollY * 0.1}deg)`,
        }}
      >
        <div className="w-full h-full animate-snake-slow bg-gradient-to-br from-orange-400/15 to-red-500/15 rounded-[40%] blur-sm"></div>
      </div>
      
      {/* Layer 2 */}
      <div 
        className="absolute left-1/3 top-1/2 w-[420px] h-[420px] opacity-70"
        style={{
          transform: `translateY(-50%) translateY(${layer2Transform}px) rotateY(${scrollY * 0.15}deg)`,
        }}
      >
        <div className="w-full h-full animate-wave-fast bg-gradient-to-br from-orange-500/12 to-red-600/12 rounded-[35%]"></div>
      </div>
      
      {/* Layer 3 - Central layers */}
      <div 
        className="absolute left-1/2 top-1/2 w-[350px] h-[350px] opacity-80"
        style={{
          transform: `translateX(-50%) translateY(-50%) translateY(${layer3Transform}px) rotateY(${scrollY * 0.2}deg)`,
        }}
      >
        <div className="w-full h-full animate-float-curve bg-gradient-to-br from-orange-600/10 to-red-700/10 rounded-[30%]"></div>
      </div>
      
      {/* Layer 4 */}
      <div 
        className="absolute right-1/3 top-1/2 w-[420px] h-[420px] opacity-70"
        style={{
          transform: `translateY(-50%) translateY(${layer4Transform}px) rotateY(${scrollY * 0.25}deg)`,
        }}
      >
        <div className="w-full h-full animate-slide-curve bg-gradient-to-br from-orange-500/12 to-red-600/12 rounded-[35%]"></div>
      </div>
      
      {/* Layer 5 - Outermost right */}
      <div 
        className="absolute right-1/4 top-1/2 w-[500px] h-[500px] opacity-60"
        style={{
          transform: `translateY(-50%) translateY(${layer5Transform}px) rotateY(${scrollY * 0.3}deg)`,
        }}
      >
        <div className="w-full h-full animate-drift-curve bg-gradient-to-br from-orange-400/15 to-red-500/15 rounded-[40%] blur-sm"></div>
      </div>
      
      {/* Additional floating particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-400/40 rounded-full animate-float"
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
