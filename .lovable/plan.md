
# Atualizar texto da Politica de Privacidade

## Objetivo
Substituir todo o conteudo PT da pagina de Politica de Privacidade pelo novo texto fornecido, que tem uma estrutura significativamente diferente: 11 secoes (em vez de 9), inclui uma tabela de classificacao de confidencialidade, subsecoes com dados de clientes/internos, e conteudo mais detalhado sobre conformidade com ISO/IEC 42001 e AI Act.

## Mudancas

### `src/pages/PrivacyPolicy.tsx` - Reescrita completa

A estrutura atual usa um objeto `content` com EN/PT e um `renderSection` generico. O novo conteudo PT exige:

1. **Novo conteudo PT** com 11 secoes:
   - 1. Introducao (2 paragrafos)
   - 2. Principios de Protecao de Dados (texto + 6 items com titulos em negrito)
   - 3. Classificacao de Confidencialidade (texto + tabela 4x3)
   - 4. Dados Tratados (2 subsecoes: 4.1 Dados de Clientes, 4.2 Dados Internos - cada com bullets e classificacao)
   - 5. Compartilhamento de Dados (3 bullets)
   - 6. Seguranca da Informacao (6 bullets)
   - 7. Conformidade com a Lei de IA da UE (5 bullets)
   - 8. Direitos dos Clientes (4 bullets)
   - 9. Confidencialidade e Propriedade Intelectual (3 bullets)
   - 10. Atualizacoes da Politica (paragrafo simples)
   - 11. Contato (email: security@infinity6.com + frase de compromisso)

2. **Manter conteudo EN** inalterado (sera exibido quando o idioma for ingles)

3. **Adaptar o JSX de renderizacao** para suportar:
   - Tabela estilizada (secao 3)
   - Subsecoes numeradas (secao 4)
   - Bullets com texto em negrito seguido de descricao (secao 2)
   - Novo email de contato (security@infinity6.com) e frase final com icone de cadeado

4. **Renderizacao condicional por idioma**: como a estrutura PT e EN sao muito diferentes agora, o JSX sera dividido - EN usa a renderizacao atual, PT usa uma renderizacao customizada para acomodar tabela e subsecoes.

## Detalhes tecnicos

- O objeto `content.pt` sera completamente substituido com as novas secoes
- Uma funcao `renderPTContent()` sera criada para renderizar o layout PT com tabela e subsecoes
- A funcao `renderSection()` existente continua sendo usada para o conteudo EN
- A tabela de classificacao usara classes Tailwind consistentes com o design existente (`bg-white/5`, `border-white/10`, `text-white/70`)
- Items com titulo em negrito usarao `<strong className="text-white">` seguido do texto em `text-white/70`
