# Cartão "A inteligência" vira índice + KPIs + linha vertical da plataforma (página /our-ai)

Direções aprovadas: **índice numerado + rodapé de KPIs dentro do cartão** (v2 da 1ª rodada) e **linha vertical fina com respiro no texto** (v2 da 2ª rodada).

## O que muda

### 1. Cartão "A inteligência" (hero da página Nossa IA)
- Mantém o título **"A inteligência"** e o subtítulo atual ("Motores, modelo fundacional e método científico") sem perder texto.
- Abaixo do subtítulo, seis links numerados (01–06) em grade de até 3 colunas, número coral em fonte mono, divisor fino sob cada link, hover em coral:
  - 01 Motores → seção Núcleo Preditivo
  - 02 Modelo Fundacional → seção Modelo Fundacional
  - 03 Método → seção Método
  - 04 Base Científica → seção Base Científica
  - 05 Camada de Abstração → seção Camada de Abstração
  - 06 Governança → seção Governança
- Rodapé do cartão (faixa em areia mais escura com divisor fino no topo) com os 5 KPIs reais, número em destaque + rótulo pequeno em maiúsculas:
  - **3** motores proprietários
  - **20GB** escala de treino fundacional
  - **50** bases públicas/adquiridas de pré-treinamento
  - **5** publicações revisadas por pares
  - **9** palestras & conferências técnicas
- No celular os links empilham (1 coluna) e os KPIs quebram em duas linhas.

### 2. Linha vertical "i6 DECISION PLATFORM"
- Linha vertical fina (1px), no mesmo coral das linhas que conectam os boxes, à esquerda de todo o desenho do hero — do topo do cartão i6 Decision Suite até a base do cartão "A inteligência".
- Texto **"I6 DECISION PLATFORM"** a 90° (leitura de baixo para cima), centralizado na linha, com "respiro": o fundo da página cobre a linha atrás do texto (como no protótipo aprovado), em maiúsculas pequenas com espaçamento largo entre letras, na cor coral.
- No celular a linha é omitida para não estourar a tela estreita.

### 3. Âncoras e navegação suave
- Cada seção da página recebe um identificador de âncora (`#motores`, `#modelo-fundacional`, `#metodo`, `#base-cientifica`, `#camada-abstracao`, `#governanca`).
- Rolagem suave ao clicar, com margem para o cabeçalho fixo não cobrir o título da seção.

### 4. Nova ordem das seções da página
1. Hero (cartão-índice + linha vertical)
2. Núcleo Preditivo (motores)
3. Modelo Fundacional
4. Método
5. Base Científica
6. Camada de Abstração (i6 Builder Platform)
7. Governança (segurança e conformidade)
8. Evidência (resultados)
9. Vocabulário
10. Próximo passo (encerramento)

### 5. Idiomas
- Rótulos dos links e dos KPIs traduzidos em PT/EN/ES no arquivo de conteúdo da página. O texto da linha vertical ("I6 DECISION PLATFORM") é nome de plataforma e fica igual nos três idiomas.

## Detalhes técnicos
- `src/components/our-ai/IntelligenceHero.tsx`: cartão base ganha grade de links numerados + faixa de KPIs; envoltório do diagrama ganha a linha vertical (`hidden lg:flex`, hairline 1px coral, texto com `writing-mode: vertical-rl; rotate-180`, fundo `bg-background` para o respiro); conteúdo via `content` (sem texto fixo no componente).
- `src/data/staticData/ourAIContent.ts`: novos campos `hero.indexLinks` (rótulo + âncora) e `hero.credentials` (valor + rótulo) em PT/EN/ES.
- `src/pages/OurAI.tsx`: reordenação dos blocos e envelopamento de cada seção com `id` + `scroll-mt-24`.
- `src/index.css`: `html { scroll-behavior: smooth }` (se ainda não existir).
- Nada muda nos textos das seções, no desenho das linhas conectoras entre os boxes nem no restante do layout.
- Validação: `tsgo`, log de build, e Playwright (PT/EN/ES, desktop 1280×1800 e mobile 390×844) conferindo clique nos links, rolagem até a seção certa, linha vertical correta no desktop e ausente no mobile, sem rolagem lateral.
