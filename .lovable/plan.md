## Objetivo

Criar um **PDF editorial** (não um container de texto) com a estética do site infinity6 — navy `#0B1224` + coral `#F4845F`, ondas/curvas, tipografia grande, respiração — onde o **texto faz parte do design**. O artigo anexo serve como primeiro exemplo. O mesmo script aceita qualquer PDF futuro e regenera o layout.

## Estética (linguagem visual)

Inspirada no site (HeroMovimento, WaveBackground, VerticalWaves):

- Fundo **navy profundo** com gradientes radiais sutis cor-de-coral
- **Linhas/ondas SVG** atravessando páginas (movimento estático, mas com sensação de fluxo — partículas finas, curvas Bézier, traços de 0.5pt)
- **Tipografia editorial**: títulos enormes (80–140pt) em peso black, com palavras-chave em coral; corpo em cinza claro 10–11pt em colunas estreitas
- **Números gigantes** como elementos gráficos (20%, 50%, 65%, US$ 100M tirados do artigo)
- **Pull-quotes oversized** ocupando meia página, sem caixa — só tipografia + uma linha coral fina
- **Áreas de imagem** marcadas como placeholders elegantes: retângulo navy claro com legenda em caps + um pequeno glifo `[ imagem ]` em coral, posicionado em bleed ou ancorado a uma coluna
- **Margens generosas** + colunas assimétricas (uma página 1+2, outra 2+1, outra coluna única central estreita)

Sem decoração genérica. Sem ícones clipart. Tudo geométrico, fino, intencional.

## Estrutura proposta (8–10 páginas)

1. **Capa** — título quebrado em 3 linhas, palavra "preditiva" em coral, onda fina cruzando, número da edição "N°01" no canto, área de imagem grande à direita (bleed)
2. **Abertura / lead** — frase de abertura como pôster ("Prever demanda nunca foi apenas uma questão estatística"), tipografia gigante, resto do parágrafo em coluna estreita
3. **Estatísticas-chave** — *gráfico real* gerado a partir do texto:
   - Barras horizontais finas mostrando 20–50% (erro), 65% (ruptura), 5–10% (armazenagem), 25–40% (admin) — McKinsey
   - Card com "US$ 100M" gigante + 15% acurácia — BCG
4. **Forecast estatístico × adaptativo** — comparação em duas colunas, separador coral vertical, perguntas como citações grandes
5. **Sinais antecipadores** — os 7 sinais como lista vertical com numeração 01–07 grande em coral, área de imagem lateral
6. **Acurácia + classificação por confiança** — gráfico de "barra de confiança" (alta/média/baixa) como diagrama horizontal de 3 segmentos
7. **Decisão como output** — pull-quote oversized do exemplo SKU + linhas-onda ao fundo
8. **Aprendizados infinity6** — texto + área de imagem (foto/diagrama placeholder)
9. **Da previsão à vantagem** — composição editorial, pergunta final em destaque
10. **Contracapa / CTAs** — links como tipografia destacada, wordmark "infinity6" grande, contato

Cada página tem **pelo menos um elemento de movimento** (curva, partículas, linha que continua da página anterior).

## Como funciona a reutilização

Um único script Python (`scripts/generate-i6-editorial-pdf.py`) que recebe um PDF como argumento:

```bash
python scripts/generate-i6-editorial-pdf.py <input.pdf> <output.pdf>
```

Fluxo interno:
1. **Extrai o texto** do PDF (pypdf/pdfplumber) e divide em seções por heading (linhas `## ` ou padrões detectados)
2. **Identifica estatísticas** automaticamente via regex (`\d+%`, `US\$\s?\d+`, ranges `\d+[–-]\d+%`) → vira o gráfico de barras
3. **Detecta listas com bullets** (`*`, `-`) → viram a página numerada 01–07
4. **Detecta pull-quotes** (parágrafos curtos isolados ou frases entre aspas) → viram páginas de citação gigante
5. **Mapeia** título / excerpt / cluster / CTAs do bloco final do PDF (mesmo padrão do artigo anexo)
6. **Renderiza** com ReportLab usando templates de página fixos (`CoverPage`, `LeadPage`, `StatsPage`, `ComparePage`, `NumberedListPage`, `QuotePage`, `ImagePage`, `ClosingPage`) — o script escolhe o template por seção
7. **Áreas de imagem** ficam como placeholders nomeados (`[ imagem · sell-out por região ]`) que o usuário pode preencher depois substituindo arquivos numa pasta `images/` opcional — se existir `images/page-03.jpg`, é colado; senão, mantém o placeholder elegante

Para PDFs muito diferentes do padrão, o script tem fallbacks: se não achar estatísticas, pula a página de gráfico; se não houver lista numerada, pula a página numerada — sempre garante coerência.

## Stack técnica

- **ReportLab** + **svglib** para curvas/ondas (Path direto no canvas) e composição editorial complexa
- **pdfplumber** para extrair texto preservando ordem
- Fontes Google: **Fraunces** (display serif moderno) + **Inter** (corpo) — baixadas via canvas-design fonts ou Google Fonts; fallback Helvetica/Times se indisponíveis
- Paleta fixa: `#0B1224` (bg), `#F4845F` (coral), `#E7ECF5` (texto claro), `#1A2238` (navy elevado), `#9AA3B7` (muted)

## QA obrigatório

Após gerar:
1. `pdftoppm -jpeg -r 150 output.pdf page` em todas as páginas
2. Inspecionar cada página: overlap, texto cortado, margens, contraste, alinhamento de ondas entre páginas, posição dos placeholders
3. Ciclo de correção até passar limpo
4. Reportar issues encontrados e correções

## Entregáveis em `/mnt/documents/`

1. `infinity6-editorial-forecast-adaptativo.pdf` — o artigo anexo renderizado
2. `infinity6-editorial-template.pdf` — versão "vazia" com lorem-ipsum em PT mostrando o sistema
3. `scripts/generate-i6-editorial-pdf.py` — gerador reaproveitável (versionado no projeto, em `scripts/`)
4. `scripts/README-editorial-pdf.md` — instruções curtas de uso (como rodar, como substituir imagens)

## Fora de escopo

- Sem mudanças no site/app
- Sem alterar `sync-insights-from-i6hub.mjs`
- Sem criar nova rota/página no React
- Não é DOCX — é PDF editorial puro

---

Confirma que posso prosseguir? Se quiser, posso ajustar antes:
- número de páginas (8–10 é a sugestão)
- estilo das ondas (mais geométrico tipo VerticalWaves vs. orgânico tipo HeroMovimento)
- se quer que eu gere também versões em inglês a partir do mesmo PDF
