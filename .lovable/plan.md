## Diagnóstico

A causa não é uma string hardcoded em PT — os três formulários do site (`LeadGateForm`, `ContactForm`, `ContactFormFields`) já têm mensagens de erro localizadas via `language === 'pt' ? ... : ...` ou via objeto `text.errors`.

O que está aparecendo em PT-BR mesmo na versão em inglês é a **validação nativa do navegador (HTML5)**. Todos os três `<form>` usam `<input type="email">` sem o atributo `noValidate` no `<form>`. Quando o e-mail é inválido, o navegador exibe um tooltip nativo ("Inclua um '@' no endereço de email…") no idioma do **navegador do usuário**, não no idioma do site. Como a maioria dos visitantes brasileiros tem o Chrome em PT-BR, a mensagem aparece em português mesmo quando o site está em inglês.

Os campos `register('email')` já usam Zod (`LeadGateForm`) e `react-hook-form` com `pattern` (`ContactForm`/`ContactFormFields`), e ambos já renderizam mensagens localizadas via `errors.email && <p>{t.invalidEmail}</p>` / `text.errors.emailInvalid`. Basta desligar a validação nativa para que apenas essas mensagens (já no idioma certo) sejam exibidas.

## Plano

1. **Adicionar `noValidate` nos três `<form>`**
   - `src/components/insights/LeadGateForm.tsx` → `<form onSubmit={...} noValidate ...>`
   - `src/components/contact/ContactForm.tsx` → mesmo ajuste no `<form>` principal
   - `src/components/contact/form/ContactFormFields.tsx` → mesmo ajuste (se houver `<form>` interno; se for só fragmento de inputs, não precisa)

2. **Manter `type="email"`** nos inputs
   - O `type="email"` continua útil para teclado mobile e autofill. Só a validação nativa do submit é desligada — a validação real continua sendo feita por Zod / react-hook-form com mensagens já localizadas.

3. **Verificação após o build**
   - Trocar idioma para EN, digitar e-mail inválido em:
     - Lead gate dos insights (`/en/insights/<slug>` gated)
     - Formulário de contato (`/en/contact`)
   - Confirmar que a mensagem exibida é a string EN do componente (ex.: "Invalid email" / "Please fill out this field.") e não o tooltip nativo do navegador.

## Fora de escopo

- Páginas estáticas em PT/EN (Privacy, Ethics, FAQs do Contato) já têm versões separadas por idioma e não foram reportadas — não serão tocadas.
- Mensagens do `toast` no `LeadGateForm` (`t.error`) já são localizadas.

## Arquivos afetados

- `src/components/insights/LeadGateForm.tsx`
- `src/components/contact/ContactForm.tsx`
- `src/components/contact/form/ContactFormFields.tsx` (somente se contiver um `<form>` próprio)
