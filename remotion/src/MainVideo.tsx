import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { Backdrop } from './components/Backdrop';
import { Camera } from './components/Camera';
import { Frame } from './components/fx/Frame';
import { Grain } from './components/fx/Grain';
import { Scanlines } from './components/fx/Scanlines';
import { Glitch } from './components/fx/Glitch';
import { SignalThread, DotGrid } from './components/fx/Motifs';
import { frameWipe, whipPan, glitchCut } from './transitions';
import { Opening } from './scenes/Opening';
import { Thesis } from './scenes/Thesis';
import { HowItWorks } from './scenes/HowItWorks';
import { Territories } from './scenes/Territories';
import { Signal } from './scenes/Signal';
import { Engines } from './scenes/Engines';
import { Results } from './scenes/Results';
import { Clients } from './scenes/Clients';
import { Closing } from './scenes/Closing';

/* ---------------- ritmo ---------------- */
const D = {
  opening: 200,
  thesis: 300,
  how: 360,
  territories: 400,
  signal: 700,
  engines: 500,
  clients: 230,
  results: 430,
  closing: 360,
};
const T = { wipe: 20, whip: 10, cut: 8 };
const SCENES_TOTAL = Object.values(D).reduce((a, b) => a + b, 0);
const TRANS_TOTAL = T.wipe * 4 + T.whip * 2 + T.cut * 2;

export const TOTAL_FRAMES = SCENES_TOTAL - TRANS_TOTAL;


/* ---------------- wrapper de cena ---------------- */
const Scene: React.FC<{
  i: number;
  duration: number;
  screen?: boolean;
  bursts?: number[];
  children: React.ReactNode;
}> = ({ i, duration, screen, bursts, children }) => {
  const content = (
    <Camera variant={i} duration={duration}>
      <SignalThread variant={i} />
      {children}
      {screen ? <Scanlines /> : null}
    </Camera>
  );
  return bursts && bursts.length ? <Glitch bursts={bursts}>{content}</Glitch> : content;
};

const Overlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <>
      <Frame progress={frame / durationInFrames} />
      <Grain />
    </>
  );
};

export const MainVideo: React.FC = () => (
  <AbsoluteFill>
    {/* fundo com parallax mais lento que o conteúdo */}
    <Camera variant={4} depth={0.32}>
      <Backdrop />
      <DotGrid />
    </Camera>

    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={D.opening}>
        <Scene i={0} duration={D.opening} bursts={[62, 118]}>
          <Opening />
        </Scene>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={frameWipe({ direction: 'left' })}
        timing={linearTiming({ durationInFrames: T.wipe })}
      />

      <TransitionSeries.Sequence durationInFrames={D.thesis}>
        <Scene i={1} duration={D.thesis}>
          <Thesis />
        </Scene>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={whipPan({ axis: 'x' })}
        timing={linearTiming({ durationInFrames: T.whip })}
      />

      <TransitionSeries.Sequence durationInFrames={D.how}>
        <Scene i={2} duration={D.how}>
          <HowItWorks />
        </Scene>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={frameWipe({ direction: 'up' })}
        timing={linearTiming({ durationInFrames: T.wipe })}
      />

      <TransitionSeries.Sequence durationInFrames={D.territories}>
        <Scene i={3} duration={D.territories}>
          <Territories />
        </Scene>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={glitchCut()}
        timing={linearTiming({ durationInFrames: T.cut })}
      />

      <TransitionSeries.Sequence durationInFrames={D.signal}>
        <Scene i={4} duration={D.signal} screen bursts={[6, 250, 520]}>
          <Signal />
        </Scene>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={whipPan({ axis: 'y' })}
        timing={linearTiming({ durationInFrames: T.whip })}
      />

      <TransitionSeries.Sequence durationInFrames={D.engines}>
        <Scene i={5} duration={D.engines} screen>
          <Engines />
        </Scene>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={frameWipe({ direction: 'right' })}
        timing={linearTiming({ durationInFrames: T.wipe })}
      />

      <TransitionSeries.Sequence durationInFrames={D.clients}>
        <Scene i={6} duration={D.clients}>
          <Clients />
        </Scene>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={glitchCut()}
        timing={linearTiming({ durationInFrames: T.cut })}
      />

      <TransitionSeries.Sequence durationInFrames={D.results}>
        <Scene i={7} duration={D.results}>
          <Results />
        </Scene>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={frameWipe({ direction: 'right' })}
        timing={linearTiming({ durationInFrames: T.wipe })}
      />

      <TransitionSeries.Sequence durationInFrames={D.closing}>
        <Scene i={8} duration={D.closing}>
          <Closing />
        </Scene>
      </TransitionSeries.Sequence>

    </TransitionSeries>

    <Overlay />
  </AbsoluteFill>
);
