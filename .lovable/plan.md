## Remover seção "Resultados em movimento" da Home

Em `src/pages/HomeTeste.tsx`:
- Remover o import na linha 5: `import ResultadosSection from '@/components/hometeste/ResultadosSection';`
- Remover o uso na linha 17: `<ResultadosSection />`

A seção "Provas em números" (logo abaixo) permanece como única seção de resultados na home. O arquivo `src/components/hometeste/ResultadosSection.tsx` fica órfão mas não será deletado (sem impacto no build).
