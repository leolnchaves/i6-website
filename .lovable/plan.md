# Contato: form-first, sem Calendly público

Reposicionar `/contact` para o padrão enterprise B2B: form qualificado como CTA único, sem Calendly exposto, com e-mail como fallback discreto. Sem WhatsApp por enquanto.

---

## Mudanças

### 1. Remover Calendly da página pública

**Arquivo:** `src/pages/Contact.tsx`

- Remover import e uso de `<CalendlySection />`.
- Trocar o grid `lg:grid-cols-2 gap-12 items-stretch` por layout de coluna única centralizada (`max-w-2xl mx-auto`) para o `<ContactForm />`.
- **Não deletar** `src/components/contact/CalendlySection.tsx` — fica no codebase para uso interno (SDR pode enviar o link manualmente após qualificação).

**Efeito colateral positivo:** elimina o warning "Datadog Browser SDK: No storage available" no console, que vinha do iframe Calendly.

### 2. Strip discreto de contato direto

Novo componente `src/components/contact/DirectContactStrip.tsx`, posicionado **abaixo** do form e **acima** do `<FAQSection />`:

```
Já nos conhece?  performance@infinity6.ai
Already know us?  performance@infinity6.ai
```

- Linha única, centralizada, tipografia pequena (`text-sm text-white/55`).
- Sem card, sem ícone grande, sem botão destacado — apenas texto + link `mailto:`.
- Strings PT/EN inline no componente (`useLanguage`).
- `<a>` semântico com `aria-label`.

### 3. Ajuste de copy

Verificar `ContactHero.tsx` e o botão de submit do `ContactForm` para remover qualquer menção a "agende" / "schedule a call". Substituir por:
- PT: "Envie sua mensagem — respondemos em até 1 dia útil"
- EN: "Send your message — we reply within 1 business day"

Mantém a promessa de tempo de resposta que o Calendly resolvia visualmente.

### 4. Form: campos qualificadores (apenas verificação, sem alterar)

Ler `src/components/contact/form/ContactFormFields.tsx` para confirmar presença de: empresa, cargo, e-mail corporativo, mensagem. Se faltar **cargo** ou **porte/segmento**, sinalizo no fim — **não altero o form sem sua aprovação explícita**, porque é um capture ativo.

---

## Detalhes técnicos

- Sem mudança em rotas, sitemap, JSON-LD do FAQ, SEO ou backend.
- Sem novas dependências.
- `CalendlySection.tsx` permanece no repositório, apenas desplugado da rota pública.
- Build/preview: alteração puramente visual + remoção de iframe.

---

## Resultado esperado

- `/contact` com foco único no form qualificado (best practice enterprise B2B).
- Fallback `mailto:performance@infinity6.ai` para quem já conhece a marca.
- Console limpo (sem warning Datadog do Calendly).
- Footer mantém `performance@infinity6.ai` (sem mudança).
