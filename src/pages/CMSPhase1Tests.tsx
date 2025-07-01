
import React from 'react';
import Phase1TestPanel from '@/components/cms/debug/Phase1TestPanel';

const CMSPhase1Tests = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Testes da Fase 1</h1>
        <p className="mt-2 text-gray-600">
          Validação da infraestrutura base para migração CMS → Markdown
        </p>
      </div>
      
      <Phase1TestPanel />
    </div>
  );
};

export default CMSPhase1Tests;
