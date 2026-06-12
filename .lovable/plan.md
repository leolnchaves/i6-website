Remover o `<p>` redundante no topo do `ContactForm` (linha 153 de `src/components/contact/ContactForm.tsx`) — texto "Talk to us and share..." / equivalente PT, que duplica a descrição já presente no `ContactHero`.

Sem outras alterações: as strings `subtitle` em PT/EN podem permanecer no objeto `content` (não removo para evitar mudanças laterais), apenas a renderização é removida.