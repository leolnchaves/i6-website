## Detalhes técnicos

### Arquivos alterados

1. `src/components/i6-builders/BuilderFinalCTA.tsx`
   - Remover o `<a>` primário (botão "Fale com o time") e o import do `ArrowRight` se não houver outro uso.
   - Substituir os dois `<Link>` de texto por chamadas com seta, usando a classe `group inline-flex items-center gap-2 text-sm font-semibold text-primary` e `<ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />`.
   - Manter `useLocalizedPath` para `/community` e `/docs`.

2. `src/data/i6Builders/content.ts`
   - No objeto `finalCta` de cada idioma, substituir:
     - `primary: 'Fale com o time'` / `'Talk to the team'` / `'Habla con el equipo'` — manter ou remover conforme não houver mais uso.
     - `community: 'Comunidade'` → `'Entre na comunidade i6 Builders'` / `'Join the i6 Builders community'` / `'Únete a la comunidad i6 Builders'`
     - `docs: 'Documentação'` → `'Ver documentação completa'` / `'View full documentation'` / `'Ver documentación completa'`

### Validação

- `npx tsgo --noEmit` para checagem de tipos.
- `bun run build` para garantir que o build passa.
- Visualização rápida no preview de `/pt/i6-builders` para confirmar o hover da seta e o alinhamento dos links.

### Não será feito

- Nenhuma publicação/tag/release.
- Nenhum lead de teste.
- Nenhuma alteração em `/community`, `/docs`, `/contact` ou no `ContactForm`.