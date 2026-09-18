# Localizar todos os valores numéricos da Home

## Objetivo
Garantir que números, casas decimais, abreviações e valores monetários exibidos na Home sigam as convenções de PT, EN e ES, sem alterar o significado das métricas.

## Implementação
1. **Resultados reais**
   - Tornar o valor principal de cada KPI localizável, assim como rótulo e setor já são.
   - Corrigir especialmente `+7,8MM` para `+7.8MM` em inglês, mantendo vírgula decimal em português e espanhol.
   - Aplicar a mesma escolha por idioma em todos os locais que reutilizam esses KPIs, evitando divergências entre a Home e outras páginas.
   - Preservar os valores numéricos puros usados nos dados estruturados para buscadores.

2. **Painel de decisões da abertura**
   - Revisar todos os números dos cartões rotativos: moeda, decimal, percentual, pontos percentuais, multiplicadores, milhares e quantidades.
   - Manter vírgula decimal e “mil” em PT/ES; ponto decimal e `k` em EN.
   - Corrigir somente inconsistências encontradas, sem mudar os números ou o texto comercial.

3. **Demais seções da Home**
   - Conferir percentuais presentes nos produtos, além das numerações de etapas e blocos.
   - Tratar `01`, `02` etc. como numeração estrutural neutra, sem alteração por idioma.
   - Não modificar nomes de marca ou produto que contêm `i6`.

## Validação
- Conferir a Home completa em `/pt`, `/en` e `/es`, incluindo a rotação dos cartões da abertura e todos os seis KPIs.
- Validar desktop e celular, verificando texto, quebra de linha e ausência de rolagem horizontal.
- Confirmar compilação limpa e ausência de erros no navegador.

## Detalhes técnicos
- Usar os padrões de localização já existentes (`pickLang`) e ampliar o tipo compartilhado dos KPIs para aceitar valores por idioma.
- Não introduzir banco de dados nem alterar conteúdo fora do necessário para manter os KPIs compartilhados consistentes.
