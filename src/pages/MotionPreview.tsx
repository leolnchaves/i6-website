import MotionVerticalRain from '@/components/hometeste/motion-options/MotionVerticalRain';
import MotionAuroraVertical from '@/components/hometeste/motion-options/MotionAuroraVertical';
import MotionLightRays from '@/components/hometeste/motion-options/MotionLightRays';

const HeroContent = () => (
  <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
    <h1 className="text-5xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white leading-tight tracking-tight">
      Movement Intelligence
    </h1>
    <p className="mt-4 text-lg sm:text-xl md:text-2xl font-light text-[#F4845F] tracking-wide">
      Data moves. <span className="font-semibold">You Grow.</span>
    </p>
    <p className="mt-6 text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
      Predictive AI that orchestrates demand, price, assortment and propensity.
    </p>
    <button className="mt-10 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border border-[#F4845F]/60">
      Set Data in Motion
    </button>
  </div>
);

const Panel = ({ label, name, children }: { label: string; name: string; children: React.ReactNode }) => (
  <section className="relative min-h-screen flex items-center justify-center bg-[#0B1224] overflow-hidden border-b border-white/5">
    {children}
    <div className="absolute top-6 left-6 z-20">
      <div className="text-[10px] uppercase tracking-[0.3em] text-[#F4845F]">{label}</div>
      <div className="text-xs text-white/60 mt-1">{name}</div>
    </div>
    <HeroContent />
  </section>
);

const MotionPreview = () => (
  <div className="bg-[#0B1224]">
    <Panel label="Option A" name="Vertical Rain"><MotionVerticalRain /></Panel>
    <Panel label="Option B" name="Aurora Vertical"><MotionAuroraVertical /></Panel>
    <Panel label="Option C" name="Light Rays & Neural Circuit"><MotionLightRays /></Panel>
  </div>
);

export default MotionPreview;
