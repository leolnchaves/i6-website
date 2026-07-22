## Refinar seção "Como Funciona" — logos reais + conexões laterais

Reestruturar `src/components/hometeste/ComoFuncionamosSection.tsx` para posicionar as fontes de dados à **esquerda** conectadas apenas ao card **01 (Captura de sinais)**, e as ferramentas de ativação à **direita** conectadas apenas ao card **04 (Ativação)**, ambos com logos reais das marcas.

### Layout novo (desktop)

```text
┌──────────┐   ┌────┐ ┌────┐ ┌────┐ ┌────┐   ┌──────────┐
│ SOURCES  │──▶│ 01 │ │ 02 │ │ 03 │ │ 04 │◀──│ ACTIVATION│
│ (logos)  │   └────┘ └────┘ └────┘ └────┘   │  (logos)  │
└──────────┘                                  └──────────┘
```

- Grid `lg:grid-cols-[auto_1fr_auto]` com três colunas: sources · steps · activation.
- Coluna esquerda: pequeno rótulo vertical "Capturamos de qualquer ecossistema" + stack vertical de chips de origens.
- Coluna direita: rótulo "Ativamos em qualquer ecossistema" + stack vertical de chips de ativação.
- Coluna central: 4 cards numerados (mantém design atual).
- Conectores coral finos (SVG ou `div` com borda) ligando: chips da esquerda → borda esquerda do card **01**; chips da direita → borda direita do card **04**. Nada conectando aos cards 02 e 03.

### Mobile / tablet

- Empilhar: bloco de sources acima do card 01, cards em coluna, bloco de activation abaixo do card 04. Sem tentar renderizar linhas conectoras em mobile — apenas separadores discretos.

### Logos reais

Usar **simple-icons CDN** (`https://cdn.simpleicons.org/{slug}/{hex}`) via `<img>`. Vantagens:
- Zero dependências novas, zero binários no repo.
- Logos oficiais e monocromáticos, permitindo aplicar o tom "escurecido" que o site pede (usar cor `9CA3AF` ou similar).
- Fácil aplicar hover para brilhar (`filter: brightness(1.3)` ou trocar hex).

Chips ficam com o mesmo estilo atual (`rounded-full border border-white/10 bg-white/[0.02]`), apenas trocando o ícone `lucide` por `<img>` da logo (`w-3.5 h-3.5`).

**Sources (esquerda):** Oracle, SAP, Snowflake, Databricks, Google BigQuery (`googlebigquery`), PostgreSQL, Amazon S3 (`amazons3`), Salesforce, MongoDB, Amazon Redshift (`amazonredshift`), Apache Kafka (`apachekafka`).

**Activation (direita):** Salesforce, HubSpot, SAP, Shopify, WhatsApp, Gmail (`gmail`) para E-mail, Apple/Google Play para App (ou manter ícone genérico), etc. Ajustar a lista para caber vertical sem exagero (~8 itens).

### Fallback

Se algum slug não existir no CDN, cair para ícone `lucide-react` correspondente (Try/catch via `onError` no `<img>`).

### Arquivo

- **Editar apenas:** `src/components/hometeste/ComoFuncionamosSection.tsx`
