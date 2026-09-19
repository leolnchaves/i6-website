# Cartão "A inteligência" vira índice da página + faixa de credenciais (página /our-ai)

Direção aprovada: **índice numerado + rodapé de KPIs dentro do cartão** (protótipo v2).

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

### 2. Âncoras e navegação suave
- Cada seção da página recebe um identificador de âncora (`#motores`, `#modelo-fundacional`, `#metodo`, `#base-cientifica`, `#camada-abstracao`, `#governanca`).
- Rolagem suave ao clicar, com margem para o cabeçalho fixo não cobrir o título da seção.

### 3. Nova ordem das seções da página
1. Hero (cartão-índice)
2. Núcleo Preditivo (motores)
3. Modelo Fundacional
4. Método
5. Base Científica
6. Camada de Abstração (i6 Builder Platform)
7. Governança (segurança e conformidade)
8. Evidência (resultados)
9. Vocabulário
10. Próximo passo (encerramento)

### 4. Idiomas
- Rótulos dos links e dos KPIs traduzidos em PT/EN/ES no arquivo de conteúdo da página.

## Detalhes técnicos
- `src/components/our-ai/IntelligenceHero.tsx`: cartão base ganha grade de links numerados + faixa de KPIs; conteúdo via `content` (sem texto fixo no componente).
- `src/data/staticData/ourAIContent.ts`: novos campos `hero.indexLinks` (rótulo + âncora) e `hero.credentials` (valor + rótulo) em PT/EN/ES.
- `src/pages/OurAI.tsx`: reordenação dos blocos e envelopamento de cada seção com `id` + `scroll-mt`.
- `src/index.css`: `scroll-behavior: smooth` (se ainda não existir).
- Nada muda nos textos das seções, no diagrama de linhas coral nem no restante do layout.
- Validação: `tsgo`, log de build, e Playwright (PT/EN/ES, desktop 1280×1800 e mobile 390×844) conferindo clique nos links, rolagem até a seção certa e ausência de rolagem lateral.
