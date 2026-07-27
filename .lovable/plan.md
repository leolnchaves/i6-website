Adicionar um rótulo "SELECIONE UMA CATEGORIA E TIPO DE CLIENTE" imediatamente acima do quadro da matriz de seleção (faixas MODA / BENS DE CONSUMO) na demo de **Personalização + Descoberta Preditiva**, usando o mesmo design do rótulo "ESCOLHA UM PRODUTO OU OFERTA" (anexo 2).

## Alteração
- `src/components/kiosk/demos/PredictivePersonalizationDemo.tsx`: inserir um `<span>` logo antes do container da matriz de seleção com as classes:
  `block text-[1.6vmin] tracking-[0.25em] uppercase font-semibold text-[#F4845F] mb-[1.2vmin]`
- Localização:
  - PT: `SELECIONE UMA CATEGORIA E TIPO DE CLIENTE`
  - EN: `SELECT A CATEGORY AND CUSTOMER TYPE`

Sem alterar o quadro atual — apenas adiciona a linha de rótulo acima.
