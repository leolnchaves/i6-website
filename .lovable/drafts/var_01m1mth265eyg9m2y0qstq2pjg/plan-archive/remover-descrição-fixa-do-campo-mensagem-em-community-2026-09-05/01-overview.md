# Remover descrição fixa do campo Mensagem em /community

## Contexto
Em `/community` (variante `community` do `ContactForm`), o campo **Mensagem** exibe uma descrição longa fixa abaixo do label: "Conte um pouco do seu histórico, por que você quer fazer parte da comunidade e o que espera encontrar aqui." Essa descrição não faz sentido no contexto de comunidade e precisa ser removida. Nas variantes `/contact` (`default`) e `/i6-builders` (`builders`) a descrição permanece.

## Objetivo
- Remover a renderização da descrição fixa do campo **Mensagem** apenas na variante `community`.
- Manter a descrição em `default` e `builders`.
- Garantir acessibilidade: quando não houver descrição, o textarea não deve referenciar `aria-describedby` para um elemento inexistente.
- Preservar validação, envio, tracking e textos em PT/EN/ES.

## Escopo
- Alterar `src/components/contact/ContactForm.tsx`.
- Não alterar traduções nem remover as chaves existentes (mantidas para reuso futuro).
- Ao final: typecheck e build.
