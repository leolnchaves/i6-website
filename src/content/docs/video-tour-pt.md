---
title: "Tour em vídeo"
slug: video-tour
language: pt
section: resources
section_label: "Recursos"
order: 40
description: "Visão guiada de uma execução completa, do envio dos dados à leitura das predições."
content_type: video
video_provider: youtube
video_id: aqz-KE-bpKQ
sample: true
---

## O que o vídeo cobre

O tour percorre uma execução completa na plataforma, na mesma ordem em que uma
integração real acontece:

1. envio do lote de dados de entrada
2. disparo da execução de modelagem
3. leitura das predições e dos indicadores de qualidade
4. publicação do resultado no sistema de destino

## Antes de assistir

Recomendamos ler a página de autenticação primeiro — o vídeo assume que o
token de acesso já está emitido.

```bash
curl -X POST https://api.infinity6.ai/v1/executions \
  -H "Authorization: Bearer $I6_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"dataset_id":"ds_exemplo"}'
```

## Depois do vídeo

A referência da API detalha cada parâmetro mostrado no tour, incluindo os
códigos de erro que aparecem na etapa de validação.
