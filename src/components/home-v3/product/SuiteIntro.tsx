import { useLanguage } from '@/contexts/LanguageContext';
import suiteLogoAsset from '@/assets/i6-decision-suite-logo.png.asset.json';
import { suiteCopy } from './suiteContent';

const SuiteIntro = () => {
  const { language } = useLanguage();
  const copy = suiteCopy[language === 'pt' ? 'pt' : 'en'].intro;

  return (
    <section id="decision-suite" className="container mx-auto px-6 pt-20 md:pt-28">
      <div className="max-w-3xl">
        <img
          src={suiteLogoAsset.url}
          alt="i6 Decision Suite"
          className="h-7 sm:h-8 w-auto mb-5"
          draggable={false}
        />
        <h2 className="text-3xl md:text-[2.6rem] leading-[1.12] font-bold text-foreground">
          {copy.title}
        </h2>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
          {copy.description}
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {copy.pillars.map((pillar) => (
          <article key={pillar.title} className="sand-card sand-card-hover p-6">
            <h3 className="text-base font-semibold text-foreground">{pillar.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SuiteIntro;
