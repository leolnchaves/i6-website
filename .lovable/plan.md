# Ajustes de layout da landing /go/:token (PT e EN)

## O que muda visualmente

1. **Mais respiro entre o menu e o título** — aumentar o espaçamento superior do hero.
2. **Remover o rótulo laranja "INFINITY6"** acima do título.
3. **Espaçamentos maiores** entre título, subtítulo, cards de passos e formulário (menos "apertado", mantendo tudo compacto o suficiente).
4. **Remover visualmente o campo "Assunto"** do formulário: o campo deixa de aparecer, mas o valor que vem no token continua sendo enviado ao HUB (campo oculto).
5. **Reposicionar a badge "Custo zero até o Backtest…"** para ficar logo abaixo dos passos 1 a 3, alinhada à esquerda — igual ao comportamento em `/solutions`.

## Detalhes técnicos

- `src/pages/GoLanding.tsx`
  - Remover o parágrafo do kicker (`copy.kicker`) e a chave `kicker` do objeto COPY.
  - Hero: `pt-8 pb-0` → padding superior maior (ex.: `pt-20 pb-2`) e margens do subtítulo aumentadas (`mt-3`).
  - Seção do formulário: aumentar `pt` (ex.: `pt-8 pb-8`) para separar dos cards.
- `src/components/solutions-v2/HowWeImplement.tsx`
  - No modo `compact`, manter o mesmo posicionamento da badge usado no modo padrão (absoluta, largura ~60% da grid, deslocada para baixo dos passos 1–3) em vez de centralizada abaixo de tudo; ajustar o `py` do container para reservar o espaço da badge.
  - Aumentar levemente `gap` e padding interno dos cards no modo compacto (`gap-3`, `p-3`) e o tamanho dos textos para melhor leitura.
- `src/components/contact/ContactForm.tsx`
  - Nova prop `hideSubject`. Quando ativa, renderizar o select como `<input type="hidden">` registrado em `subject` (valor vindo de `defaultValues`), sem label nem validação visual.
  - Manter o envio de `subscription: data.subject` inalterado.
  - Voltar espaçamentos do modo compacto a valores um pouco mais generosos (`space-y-3`, `gap-3`, textarea `min-h-[80px]`).
- Sem mudança de conteúdo/textos além da remoção do kicker; PT e EN seguem o mesmo layout.

## Verificação

Renderizar `/pt/go/<token>` e `/en/go/<token>` em viewport de desktop, conferir a ordem visual (título → subtítulo → 5 cards → badge sob os passos 1–3 → formulário sem "Assunto") e checar que o payload enviado ainda contém o assunto do token.
