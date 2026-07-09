## Ajuste: posicionamento do eyebrow "XAI for Business"

### Objetivo
Reposicionar o eyebrow/coral badge da seção de Explicabilidade em `/our-ai` para ficar **acima do título**, em vez de abaixo dele.

### Escopo
- Alterar apenas o componente `src/components/our-ai/ExplainabilitySection.tsx`.
- Manter todos os textos, estilos e comportamentos existentes.
- Aplicar a mudança para ambos os idiomas (PT/EN), já que o componente é compartilhado.

### Implementação
1. Reordenar os elementos no `div` de cabeçalho da seção:
   - Colocar `<span>` do eyebrow antes do `<h2>`.
   - Ajustar espaçamentos (`mb-*`) para manter equilíbrio visual: eyebrow com margem inferior pequena, título com margem inferior padrão, parágrafos subsequentes inalterados.
2. Garantir que o layout continue responsivo e centralizado.
3. Rodar build para validar.

### Resultado esperado
Visual: eyebrow "XAI ORIENTADA A NEGÓCIO" / "XAI FOR BUSINESS" posicionado acima do título principal da seção.