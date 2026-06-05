const PrivacyPolicyPT = () => {
  const renderSection = (title: string, text: string, items?: string[]) => (
    <section className="border-b border-white/10 pb-8">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-white/70 mb-4">{text}</p>
      {items && (
        <ul className="list-disc list-inside text-white/70 space-y-2 marker:text-[#F4845F]">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );

  const renderBoldItems = (items: { title: string; desc: string }[]) => (
    <ul className="list-disc list-inside text-white/70 space-y-3 marker:text-[#F4845F]">
      {items.map((item, i) => (
        <li key={i}>
          <strong className="text-white">{item.title}:</strong> {item.desc}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 1. Introdução */}
      <section className="border-b border-white/10 pb-8">
        <h2 className="text-2xl font-bold text-white mb-4">1. Introdução</h2>
        <p className="text-white/70 mb-4">
          A infinity6 é uma plataforma de inteligência de dados escalável, desenvolvida para acelerar resultados e ampliar o sucesso em larga escala. Nossa prioridade é garantir a confidencialidade, integridade, disponibilidade e transparência no tratamento das informações, alinhando-nos às melhores práticas internacionais (ISO/IEC 42001) e ao marco regulatório europeu para Inteligência Artificial (AI Act).
        </p>
        <p className="text-white/70">
          Esta Política de Privacidade descreve como protegemos os dados de nossos clientes, usuários e parceiros, assegurando conformidade legal, técnica e ética, além de introduzir um modelo de classificação de confidencialidade de ativos e informações.
        </p>
      </section>

      {/* 2. Princípios de Proteção de Dados */}
      <section className="border-b border-white/10 pb-8">
        <h2 className="text-2xl font-bold text-white mb-4">2. Princípios de Proteção de Dados</h2>
        <p className="text-white/70 mb-4">
          A infinity6 adota os seguintes princípios, em conformidade com a ISO/IEC 42001 e a Lei de IA da UE:
        </p>
        {renderBoldItems([
          { title: "Minimização de Dados", desc: "trabalhamos apenas com informações estritamente necessárias." },
          { title: "Anonimização por padrão", desc: "todos os dados recebidos de clientes chegam já anonimizados, eliminando a necessidade de tratamento de dados pessoais." },
          { title: "Finalidade clara e legítima", desc: "processamos dados exclusivamente para fins previamente acordados com cada cliente." },
          { title: "Não compartilhamento entre clientes", desc: "nenhuma informação de um cliente é disponibilizada a outro cliente." },
          { title: "Segurança e confidencialidade", desc: "todos os ativos digitais e informações internas são classificados e protegidos de acordo com seu nível de confidencialidade." },
          { title: "Responsabilidade e prestação de contas", desc: "mantemos governança clara e controles auditáveis sobre o ciclo de vida dos dados." },
        ])}
      </section>

      {/* 3. Classificação de Confidencialidade */}
      <section className="border-b border-white/10 pb-8">
        <h2 className="text-2xl font-bold text-white mb-4">3. Classificação de Confidencialidade</h2>
        <p className="text-white/70 mb-6">
          Todas as informações e ativos da infinity6 são categorizados em quatro níveis de confidencialidade:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/10">
                <th className="border border-white/10 px-4 py-3 text-left text-white font-semibold">Classificação</th>
                <th className="border border-white/10 px-4 py-3 text-left text-white font-semibold">Descrição</th>
                <th className="border border-white/10 px-4 py-3 text-left text-white font-semibold">Exemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white/5">
                <td className="border border-white/10 px-4 py-3 text-white font-medium">Pública</td>
                <td className="border border-white/10 px-4 py-3 text-white/70">Informações disponíveis publicamente sem restrições</td>
                <td className="border border-white/10 px-4 py-3 text-white/70">Material de marketing, site institucional</td>
              </tr>
              <tr>
                <td className="border border-white/10 px-4 py-3 text-white font-medium">Interna</td>
                <td className="border border-white/10 px-4 py-3 text-white/70">Informações restritas ao uso dentro da infinity6</td>
                <td className="border border-white/10 px-4 py-3 text-white/70">Procedimentos internos não sensíveis</td>
              </tr>
              <tr className="bg-white/5">
                <td className="border border-white/10 px-4 py-3 text-white font-medium">Confidencial</td>
                <td className="border border-white/10 px-4 py-3 text-white/70">Informações críticas que exigem proteção contra divulgação externa</td>
                <td className="border border-white/10 px-4 py-3 text-white/70">Documentos técnicos, relatórios de clientes anonimizados, contratos internos, artefatos e processos do cliente</td>
              </tr>
              <tr>
                <td className="border border-white/10 px-4 py-3 text-white font-medium">Sigilosa</td>
                <td className="border border-white/10 px-4 py-3 text-white/70">Informações altamente sensíveis com impacto significativo caso divulgadas</td>
                <td className="border border-white/10 px-4 py-3 text-white/70">Ativos de desenvolvimento, código-fonte proprietário, algoritmos, modelos de IA, dados estratégicos financeiros e operacionais</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Dados Tratados */}
      <section className="border-b border-white/10 pb-8">
        <h2 className="text-2xl font-bold text-white mb-4">4. Dados Tratados pela infinity6</h2>

        <h3 className="text-lg font-semibold text-white/80 mb-3">4.1 Dados de Clientes</h3>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 marker:text-[#F4845F]">
          <li>Recebidos anonimizados e sem possibilidade de identificação de indivíduos.</li>
          <li>Processados exclusivamente para fins de inteligência de dados, análises e geração de valor ao cliente contratante.</li>
          <li><strong className="text-white">Classificação de confidencialidade:</strong> Confidencial</li>
        </ul>

        <h3 className="text-lg font-semibold text-white/80 mb-3">4.2 Dados Internos da infinity6</h3>
        <ul className="list-disc list-inside text-white/70 space-y-2 marker:text-[#F4845F]">
          <li><strong className="text-white">Ativos de desenvolvimento:</strong> código, algoritmos, modelos e pipelines de dados.</li>
          <li><strong className="text-white">Classificação:</strong> Sigilosa</li>
          <li>Nunca compartilhados com terceiros.</li>
          <li><strong className="text-white">Documentos internos:</strong> estratégicos, técnicos, financeiros e operacionais.</li>
          <li><strong className="text-white">Classificação:</strong> Confidencial</li>
          <li>Protegidos por controles de acesso rigorosos.</li>
        </ul>
      </section>

      {/* 5. Compartilhamento de Dados */}
      {renderSection(
        "5. Compartilhamento de Dados",
        "",
        [
          "Não há compartilhamento de dados de clientes com outros clientes.",
          "Dados de clientes não são comercializados, alugados ou transferidos a terceiros.",
          "Compartilhamento restrito apenas para cumprimento de obrigações legais ou regulatórias, com avaliação jurídica.",
        ]
      )}

      {/* 6. Segurança da Informação */}
      {renderSection(
        "6. Segurança da Informação",
        "",
        [
          "SGSI-IA baseado na ISO/IEC 42001.",
          "Controles de acesso baseados em identidade, mínimo privilégio e autenticação multifator.",
          "Criptografia de dados em repouso e em trânsito.",
          "Monitoramento e auditoria contínua de sistemas críticos.",
          "Gestão de vulnerabilidades, pentests e auditorias externas.",
          "Planos de continuidade de negócios e resposta a incidentes periodicamente testados.",
        ]
      )}

      {/* 7. Conformidade com a Lei de IA da UE */}
      {renderSection(
        "7. Conformidade com a Lei de IA da União Europeia",
        "",
        [
          "Avaliação de riscos de IA e mitigação de impactos adversos.",
          "Explicabilidade dos modelos de IA sempre que aplicável.",
          "Monitoramento contínuo e controle de viés/discriminação.",
          "Auditoria e rastreabilidade de operações de IA.",
          "Alinhamento a regulamentações de alto risco de IA quando aplicáveis.",
        ]
      )}

      {/* 8. Direitos dos Clientes */}
      {renderSection(
        "8. Direitos dos Clientes",
        "",
        [
          "Transparência sobre o tratamento de dados anonimizados.",
          "Controle sobre a finalidade e o escopo de uso dos dados.",
          "Segurança contratual quanto à confidencialidade e proteção das informações.",
          "Direito à auditoria formal para comprovar conformidade.",
        ]
      )}

      {/* 9. Confidencialidade e Propriedade Intelectual */}
      {renderSection(
        "9. Confidencialidade e Propriedade Intelectual",
        "",
        [
          "Todos os desenvolvimentos tecnológicos são Sigilosos e propriedade exclusiva da infinity6.",
          "Nenhum ativo de desenvolvimento é compartilhado com terceiros.",
          "Todos os documentos internos são Confidenciais, protegidos contra divulgação não autorizada.",
        ]
      )}

      {/* 10. Cookies e Analytics do Site */}
      <section className="border-b border-white/10 pb-8">
        <h2 className="text-2xl font-bold text-white mb-4">10. Cookies e Analytics do Site</h2>
        <p className="text-white/70 mb-4">
          Quando você navega em infinity6.ai, coletamos automaticamente, sob base legal de <strong className="text-white">legítimo interesse</strong>, informações anônimas para entender como o site é usado e melhorar sua experiência. Nenhum dado pessoal identificável é coletado nesta etapa.
        </p>
        <p className="text-white/70 mb-3"><strong className="text-white">O que coletamos:</strong></p>
        {renderBoldItems([
          { title: 'anonymous_id', desc: 'identificador anônimo (UUID) gerado no seu navegador e guardado em localStorage. Não identifica você pessoalmente.' },
          { title: 'session_id', desc: 'identificador temporário de sessão; expira após 30 minutos de inatividade.' },
          { title: 'Origem da visita', desc: 'parâmetros UTM (source, medium, campaign), referrer e landing page.' },
          { title: 'Histórico no site', desc: 'últimas 20 páginas visitadas e últimos 30 eventos de interação (cliques em CTAs, downloads de Insights, envios de formulário).' },
          { title: 'Dados técnicos via Google Analytics 4', desc: 'tipo de dispositivo, navegador, país aproximado.' },
        ])}
        <p className="text-white/70 mt-4 mb-2">
          <strong className="text-white">Como usamos:</strong> medir desempenho, melhorar a experiência de uso e, quando você opta por preencher um formulário, anexar esse histórico anônimo ao seu contato para enriquecer o atendimento.
        </p>
        <p className="text-white/70 mb-2">
          <strong className="text-white">Cookies adicionais (marketing/preferências):</strong> só são ativados após consentimento explícito no banner de cookies. Você pode revisar e alterar suas escolhas a qualquer momento em "Preferências de cookies".
        </p>
        <p className="text-white/70">
          <strong className="text-white">Seus direitos:</strong> desativar analytics em "Preferências de cookies", limpar o storage do navegador ou solicitar exclusão via <a href="mailto:security@infinity6.ai" className="text-[#F4845F] hover:underline">security@infinity6.ai</a>.
        </p>
      </section>

      {/* 11. Atualizações da Política */}
      <section className="border-b border-white/10 pb-8">
        <h2 className="text-2xl font-bold text-white mb-4">11. Atualizações da Política</h2>
        <p className="text-white/70">
          A infinity6 poderá atualizar esta Política para refletir melhorias em processos, mudanças regulatórias ou evolução tecnológica, comunicando tais alterações de forma clara e transparente.
        </p>
      </section>

      {/* 12. Contato */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">12. Contato</h2>
        <p className="text-white/70 mb-4">
          Em caso de dúvidas ou solicitações relacionadas a esta política:
        </p>
        <div className="bg-white/5 border border-white/10 p-6 rounded-lg mb-6">
          <p className="text-white/70">
            <strong className="text-white">E-mail:</strong> security@infinity6.com
          </p>
        </div>
        <p className="text-white/70 flex items-center gap-2">
          🔒 A infinity6 reafirma seu compromisso com a confiança, segurança e ética no uso de dados e inteligência artificial.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicyPT;
