## Nota técnica

- Reusar os tokens do tema `theme-sand` já definidos em `index.css`: caixa = `.sand-card` (`--card` + `--border` + `--sand-shadow-soft`), campos = `bg-secondary/60 border-border rounded-[calc(var(--radius)-4px)]`, foco em `--ring`.
- `ContactForm.tsx`: trocar as classes de vidro escuro (`bg-white/5`, `border-white/10`, `text-white/70`, `bg-white/10`, `focus:ring-[#F4845F]/30`) por tokens sand; `<option>` sem `bg-[#0B1224]`.
- `ContactFormFields.tsx` (variantes community/builders): trocar `text-gray-700`/`text-gray-500`/`border-gray-300`/`focus:ring-blue-500` por tokens sand.
- `ContactHeroSplit.tsx`: remover o wrapper `bg-[#0B1224] p-2` — o próprio card já é a caixa branca.
- `Comunidade.tsx` e `I6Builders.tsx`: tirar a seção do formulário de dentro do bloco `bg-[#0B1224]`, envolvê-la em `theme-sand bg-background`, e manter o CTA final escuro com uma transição suave (gradiente do escuro para o areia) na emenda.
- Escopo somente visual: nenhuma mudança em endpoint, honeypot, `lead_uid`, validação, tracking ou textos. Ao final: checagem de tipos, build e verificação visual nas três rotas em PT/EN/ES.
