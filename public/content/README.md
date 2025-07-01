
# Sistema de Conteúdo Híbrido (CMS + Markdown)

Este sistema permite usar arquivos Markdown como fallback para o conteúdo do CMS, proporcionando flexibilidade e facilidade de manutenção.

## Estrutura de Pastas

```
public/content/
├── pages/
│   ├── home/
│   │   ├── en.md
│   │   └── pt.md
│   ├── solutions/
│   │   ├── en.md
│   │   └── pt.md
│   ├── success-stories/
│   │   ├── en.md
│   │   └── pt.md
│   └── contact/
│       ├── en.md
│       └── pt.md
├── cards/
│   ├── results/
│   ├── solutions/
│   └── success-stories/
└── README.md
```

## Formato dos Arquivos Markdown

Cada arquivo Markdown deve ter um front matter YAML com os dados de conteúdo:

```markdown
---
# Seção Hero
homeHero.title: "Título da Página"
homeHero.subtitle: "Subtítulo"
homeHero.description: "Descrição da página"

# Seção de Estatísticas
stats.stat1Value: "97%"
stats.stat1Label: "Performance"
---

# Conteúdo Principal

Este é o conteúdo adicional que pode ser usado para outras seções.
```

## Como Usar

### 1. Hook Híbrido

Use o hook `useHybridPageContent` nos componentes:

```typescript
import { useHybridPageContent } from '@/hooks/useHybridPageContent';

const MyComponent = () => {
  const { getContent, loading } = useHybridPageContent('home', language);
  
  const title = getContent('homeHero', 'title', 'Fallback Title');
  
  return <h1>{title}</h1>;
};
```

### 2. Prioridade de Conteúdo

O sistema usa a seguinte ordem de prioridade:

1. **CMS Database** (fonte primária)
2. **Markdown Files** (fallback)
3. **Translation Files** (fallback final)

### 3. Cache

Os arquivos Markdown são automaticamente cached por 5 minutos para melhor performance.

## Migração Gradual

Este sistema permite migração gradual:

1. **Fase 1**: Sistema híbrido funcionando em paralelo
2. **Fase 2**: Exportação de dados do CMS para Markdown
3. **Fase 3**: Transição completa para Markdown (opcional)

## Desenvolvimento

Para adicionar novo conteúdo:

1. Crie o arquivo Markdown correspondente
2. Adicione o front matter com as chaves necessárias
3. Use o hook `useHybridPageContent` no componente
4. Teste com e sem dados no CMS

## Benefícios

- ✅ **Reversível**: Pode voltar ao sistema anterior a qualquer momento
- ✅ **Gradual**: Migração por partes sem quebrar funcionalidades
- ✅ **Flexível**: Suporta tanto CMS quanto Markdown
- ✅ **Performance**: Cache automático dos arquivos
- ✅ **Versionamento**: Arquivos Markdown podem ser versionados no Git
- ✅ **Backup**: Conteúdo preservado em ambos os formatos
