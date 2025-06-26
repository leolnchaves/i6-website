
const SandboxEnvironment = () => {
  return (
    <div className="mt-20">
      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-8 bg-gradient-to-b from-gray-300 to-transparent"></div>
        
        {/* Sandbox Environment Card */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 shadow-2xl text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold mb-2">
                Sandbox Environment & Consulting Support Included
              </h3>
              <p className="text-orange-100 text-lg">
                Complete testing environment with expert guidance throughout your journey
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-8 py-4 border border-white/20">
                <span className="font-bold text-lg">Risk-Free Testing Environment</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-8 py-4 border border-white/20">
                <span className="font-bold text-lg">Expert Consulting & Support</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-8 py-4 border border-white/20">
                <span className="font-bold text-lg">30-Day Concrete Results</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SandboxEnvironment;
