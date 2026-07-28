import { AbsoluteFill } from 'remotion';
import { TransitionSeries, springTiming, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { Backdrop } from './components/Backdrop';
import { Opening } from './scenes/Opening';
import { Thesis } from './scenes/Thesis';
import { HowItWorks } from './scenes/HowItWorks';
import { Territories } from './scenes/Territories';
import { Signal } from './scenes/Signal';
import { Engines } from './scenes/Engines';
import { Results } from './scenes/Results';
import { Closing } from './scenes/Closing';

const T = 24;
const slideT = () => springTiming({ config: { damping: 200 }, durationInFrames: T });
const fadeT = () => linearTiming({ durationInFrames: T });

export const MainVideo: React.FC = () => (
  <AbsoluteFill>
    <Backdrop />
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={210}>
        <Opening />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={fadeT()} />

      <TransitionSeries.Sequence durationInFrames={330}>
        <Thesis />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: 'from-right' })} timing={slideT()} />

      <TransitionSeries.Sequence durationInFrames={390}>
        <HowItWorks />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: 'from-right' })} timing={slideT()} />

      <TransitionSeries.Sequence durationInFrames={420}>
        <Territories />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={fadeT()} />

      <TransitionSeries.Sequence durationInFrames={700}>
        <Signal />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: 'from-right' })} timing={slideT()} />

      <TransitionSeries.Sequence durationInFrames={500}>
        <Engines />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: 'from-bottom' })} timing={slideT()} />

      <TransitionSeries.Sequence durationInFrames={450}>
        <Results />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: 'from-bottom' })} timing={slideT()} />

      <TransitionSeries.Sequence durationInFrames={360}>
        <Closing />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);

// 210+330+390+420+700+500+450+360 = 3360 ; menos 7 transições de 24 = 3192 frames (~106,4s)
export const TOTAL_FRAMES = 3360 - 7 * 24;
