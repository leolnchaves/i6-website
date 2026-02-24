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

      {/* 10. Atualizações da Política */}
      <section className="border-b border-white/10 pb-8">
        <h2 className="text-2xl font-bold text-white mb-4">10. Atualizações da Política</h2>
        <p className="text-white/70">
          A infinity6 poderá atualizar esta Política para refletir melhorias em processos, mudanças regulatórias ou evolução tecnológica, comunicando tais alterações de forma clara e transparente.
        </p>
      </section>

      {/* 11. Contato */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">11. Contato</h2>
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
