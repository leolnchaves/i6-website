
# Igualar os títulos dos cards de Formulário e Calendly

## Problema
O card do Calendly tem um título grande e bold ("Prefere avançar direto para uma conversa estratégica?"), enquanto o card do formulário de contato não exibe nenhum título visível -- apenas o subtítulo pequeno em texto claro.

## Solução
Adicionar o título existente (`title1` + `title2`) ao card do formulário, usando exatamente o mesmo estilo tipográfico do título do Calendly: `text-3xl font-bold text-white`.

## Mudanças

### 1. `src/components/contact/ContactForm.tsx`
- Inserir o título (combinando `title1` e `title2`) acima do subtítulo dentro do `CardContent`
- Usar as mesmas classes do Calendly: `text-3xl font-bold mb-4 text-white`

### 2. Nenhuma mudança no `CalendlySection.tsx`
O estilo do Calendly já está correto e serve como referência.

## Detalhes Técnicos
- No `ContactForm.tsx`, antes da tag `<p>` do subtítulo (linha 131), será adicionado:
```tsx
<h3 className="text-3xl font-bold mb-4 text-white">
  {text.title1} {text.title2}
</h3>
```
- Isso garante que ambos os cards usem `h3`, `text-3xl`, `font-bold`, `mb-4` e `text-white` como padrão tipográfico consistente.
