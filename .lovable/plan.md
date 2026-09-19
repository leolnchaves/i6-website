# CTA de segurança no fim da seção Governança

## O que o visitante vai ver

Na página `/our-ai`, ao final da seção **Governança**, logo abaixo do subtítulo, aparece:

```text
Privacidade e isolamento são pré-requisitos de arquitetura, não camadas adicionadas depois.

Precisa de detalhes de segurança para a sua área de risco?
Fale com nosso time →            ← link laranja, mesmo estilo da Camada de Abstração
```

Ao clicar, o visitante chega na página de contato (na mesma língua), a rolagem vai direto para o formulário, e o formulário já vem pronto:

- **Assunto**: "Outro" (a opção que hoje aparece como "Outros" na triagem)
- **Mensagem**: já preenchida com o pedido de informações sobre camadas e evidências de segurança
- O motivo interno enviado na triagem continua "Outro" — nada muda no que chega internamente

## Passos

1. **Textos da seção** (`src/data/staticData/ourAIContent.ts`)
   - Adicionar dois campos ao bloco `security` (interface na linha 56-61): a pergunta e o rótulo do link.
   - Preencher nos três blocos: PT (linhas 238-248), EN (434-444), ES (630-640).

2. **Mensagem pré-preenchida** (`src/data/contact/content.ts`)
   - Criar um mapa de atalhos (`CONTACT_INTENTS`) com o id `security`: assunto `other` + mensagem nos três idiomas. Fica do lado do contato para que qualquer outro atalho futuro reutilize o mesmo mecanismo.

3. **O CTA** (`src/components/our-ai/SecuritySection.tsx`)
   - Inserir a pergunta (texto discreto) e o link laranja logo depois do parágrafo do subtítulo, na coluna esquerda.
   - Reaproveitar exatamente as classes do CTA da Camada de Abstração (`BuilderBridge.tsx`): `group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary` com o ícone de seta que desliza no hover — a cor laranja vem do mesmo token.
   - Destino: `/contact?intent=security#contact-form` no idioma atual (o prefixo `/pt`, `/en` ou `/es` é aplicado pelo mesmo utilitário usado nos outros links). O `#contact-form` aciona a rolagem suave que a página de contato já faz hoje.

4. **Pré-preenchimento do formulário** (`src/components/contact/ContactForm.tsx` + `ContactHeroSplit.tsx`)
   - Nova propriedade opcional no formulário: `prefill?: { subject?: string; message?: string }`, aplicada uma vez ao montar.
   - O preenchimento é feito programaticamente (e não como valores iniciais do formulário) de propósito: assim, depois do envio, o comportamento atual de limpar os campos se mantém — hoje ele já limpa, e com valores iniciais a mensagem voltaria a aparecer.
   - `ContactHeroSplit.tsx` lê `intent` na URL, consulta o mapa do passo 2 e repassa ao formulário. Um `intent` desconhecido é simplesmente ignorado, e o formulário se comporta como hoje.

## Textos (PT / EN / ES)

| | PT | EN | ES |
| --- | --- | --- | --- |
| Pergunta | Precisa de detalhes de segurança para a sua área de risco? | Need security details for your risk area? | ¿Necesitas detalles de seguridad para tu área de riesgo? |
| Link | Fale com nosso time | Talk to our team | Habla con nuestro equipo |
| Mensagem | Desejo mais informações sobre camadas e evidências de segurança da plataforma. | I'd like more information about the platform's layers and security evidence. | Deseo más información sobre las capas y las evidencias de seguridad de la plataforma. |

O espanhol segue o tratamento "ti" já usado no site. O inglês não muda nenhum outro texto.

## Verificação

- Navegar ao vivo em `/pt/our-ai`, `/en/our-ai`, `/es/our-ai`: confirmar a pergunta + link laranja abaixo do subtítulo, clicar e conferir a URL com `intent=security`, o Assunto selecionado como "Outro" e a mensagem preenchida no idioma certo.
- Confirmar que o envio continua limpando os campos e que o payload vai com `source: "i6-website"`, `reason: "Outro"` e o contexto de UTMs normalmente.
- Rodar o pré-render e a validação de JSON-LD, depois o build completo (geração de `llms.txt` + `sitemap.xml` + `vite build`).
- Nenhuma rota nova: `llms.txt`, `sitemap.xml` e os textos ocultos do build ficam inalterados.
