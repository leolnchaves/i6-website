# Roadmap — Typewriter em /i6-builders

- [x] Hook `useTypewriter` linha a linha (versão anterior)
- [ ] Reescrever `useTypewriter` para caractere por caractere (40ms ±15ms, +350ms em quebra de linha, startDelay 400ms)
- [ ] Anti-reflow por camada fantasma + overlay em `BuilderHero.tsx`
- [ ] Loop contínuo: após terminar, 5000ms com cursor piscando, limpar e reiniciar
- [ ] Pausar/retomar em hover e foco de teclado no painel de código
- [ ] `prefers-reduced-motion`: código completo imediato, sem digitação nem loop
- [ ] Rodar build e checagem de tipos
- [ ] Verificação visual PT/EN/ES (desktop e mobile)
