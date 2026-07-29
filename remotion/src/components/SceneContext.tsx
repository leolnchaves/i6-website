import React from 'react';

/** Duração da cena atual (fornecida pelo MainVideo) para saídas ativas. */
export const SceneContext = React.createContext<{ duration: number }>({ duration: 300 });

export const useSceneDuration = () => React.useContext(SceneContext).duration;
