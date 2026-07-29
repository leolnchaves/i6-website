## Plano para destravar e acelerar o render

Sim — o problema não é falta de insistência; o render está sempre parando no mesmo ponto porque o bloco **5/17** cobre a virada entre a cena de **Territórios** e o início da cena pesada do **i6 Signal**. Em vez de continuar tentando o mesmo bloco de 210 frames, vou mudar a estratégia.

### 1. Parar o render travado
- Encerrar o processo atual que ficou preso no bloco `1050–1259`
- Manter intactos os 5 blocos já renderizados
- Não sobrescrever o vídeo antigo

### 2. Trocar o render por blocos menores no trecho crítico
- Renderizar o trecho problemático em microblocos, por exemplo:
  - `1050–1119`
  - `1120–1179`
  - `1180–1219`
  - `1220–1259`
- Usar `concurrency: 1` só nesse trecho crítico para reduzir travamento do Chromium
- Depois voltar a blocos maiores para o restante do vídeo

### 3. Se o início do i6 Signal continuar travando
Aplicar uma otimização leve apenas para render, preservando a aparência:
- reduzir a quantidade de camadas duplicadas do `Glitch` na entrada do Signal
- simplificar temporariamente efeitos de scanline/câmera no trecho do Signal
- manter a UI do i6 Intelliboard visualmente igual, mas com menos custo por frame

### 4. Renderizar o restante em blocos mais seguros
- Continuar de `1260` até `3363`
- Usar blocos de `90–120` frames, mais rápidos de recuperar se algum falhar
- Evitar refazer blocos já prontos

### 5. Concatenar e validar
- Juntar todos os blocos com `ffmpeg`
- Salvar como arquivo novo:
  `/mnt/documents/infinity6-institucional-v2.mp4`
- Validar com `ffprobe` duração, tamanho e existência do arquivo
- Entregar o link do artefato para download

## Resultado esperado

Essa abordagem deve destravar o ponto recorrente do **5/17**, evitar perder progresso e acelerar o fechamento porque só o trecho pesado será tratado com render mais conservador.