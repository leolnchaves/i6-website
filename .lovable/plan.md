## Objetivo

Gerar um arquivo **MP4 1920x1080, PT-BR, ~2 minutos, sem áudio**, com o conteúdo das páginas Home, Soluções, Nossa IA e Cases em formato de motion design editorial — pronto para copiar num pendrive e rodar em loop numa TV.

## Direção visual

Segue a identidade do site:
- Fundo navy `#0B1224` com gradientes sutis e as "ondas" laterais coral já usadas no site
- Acento coral `#F4845F`, textos em branco / branco 60%
- Tipografia: uma display + uma de texto, sem pontos finais em títulos (regra da marca)
- Marca sempre em minúsculo: **infinity6**
- Movimento: entradas por spring suave + revelação por máscara; transições consistentes entre cenas (sem fade-para-preto)

## Roteiro (~120s, 8 blocos)

1. **Abertura** (8s) — símbolo infinity6 + frase de posicionamento
2. **Home / Tese** (16s) — "Decisões antecipadas" e o que a infinity6 faz
3. **Como funcionamos** (16s) — os sinais → predição → decisão
4. **Soluções: territórios** (18s) — Growth, Planejamento, Preço
5. **i6 Signal** (14s) — camada conversacional sobre a saída preditiva dos motores
6. **Nossa IA** (18s) — motores i6 RecSys / i6 Previsio / i6 ElasticPrice + XAI for Business
7. **Resultados e cases** (22s) — números reais por segmento (Farma, Varejo, Financeiro, Fashion), animados
8. **Encerramento** (8s) — logo + infinity6.ai + performance@infinity6.ai

Todo o texto vem do conteúdo já existente no projeto (`realResults`, `solutionsV2/content`, `ourAIContent`, seção de resultados da home). **Nenhum número novo é inventado.**

## Como será produzido (detalhes técnicos)

- Projeto Remotion em `remotion/` (versionado, permite re-renderizar e editar depois)
- 1920x1080, 30fps, ~3600 frames, `muted: true`
- Cenas separadas em `remotion/src/scenes/`, encadeadas com `TransitionSeries`
- Camadas persistentes (gradiente + ondas laterais) atravessando o vídeo inteiro
- Render em 3 lotes de frames (o sandbox tem limite de 10 min por comando) e concatenação final com ffmpeg
- Checagem de frames-chave com `remotion still` antes do render completo
- Saída: `/mnt/documents/infinity6-tv-pt-1080p.mp4` — download direto pelo chat, depois é só copiar para o pendrive

## Observações

- Sem áudio, como pedido — a peça é legível "no mudo"
- O vídeo não altera nada do site atual; é uma pasta nova no projeto
- Para loop na TV: a maioria dos players USB tem "repetir" — o último frame conecta visualmente com o primeiro para o loop ficar limpo
- Se quiser depois uma versão EN ou 4K, é só re-render do mesmo projeto
