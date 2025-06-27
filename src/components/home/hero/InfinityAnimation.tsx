
/**
 * Infinity symbol animation component
 * Creates an animated infinity symbol with light effect behind hero text
 * Separated component for easy removal if needed
 */
const InfinityAnimation = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Infinity Symbol with Light Effect */}
      <div className="relative">
        {/* Main Infinity Symbol */}
        <svg 
          width="800" 
          height="400" 
          viewBox="0 0 800 400" 
          className="opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gradient for light effect */}
          <defs>
            <linearGradient id="lightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="30%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="70%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="-200 0;800 0;-200 0"
                dur="4s"
                repeatCount="indefinite"
              />
            </linearGradient>
            
            {/* Base gradient for the symbol */}
            <linearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(249,115,22,0.15)" />
              <stop offset="50%" stopColor="rgba(59,130,246,0.15)" />
              <stop offset="100%" stopColor="rgba(249,115,22,0.15)" />
            </linearGradient>
          </defs>
          
          {/* Infinity Symbol Path */}
          <path
            d="M 200 200 C 200 120, 280 120, 320 160 C 360 120, 440 120, 440 160 C 440 200, 360 240, 320 200 C 280 240, 200 240, 200 200 Z
               M 360 200 C 360 160, 440 160, 480 200 C 520 160, 600 160, 600 200 C 600 280, 520 280, 480 240 C 440 280, 360 280, 360 200 Z"
            fill="url(#baseGradient)"
            stroke="url(#lightGradient)"
            strokeWidth="3"
            className="animate-pulse"
          />
        </svg>

        {/* Additional glowing effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-96 h-48 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full blur-xl animate-slide-curve"
            style={{
              animationDuration: '4s',
              animationDelay: '0.5s'
            }}
          ></div>
        </div>

        {/* Subtle rotating glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-80 h-40 bg-gradient-to-r from-orange-400/5 via-blue-400/10 to-orange-400/5 rounded-full blur-2xl animate-spin"
            style={{
              animationDuration: '20s'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default InfinityAnimation;
