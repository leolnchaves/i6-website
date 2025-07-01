
import React from 'react';
import Phase2TestPanel from '@/components/cms/debug/Phase2TestPanel';

const CMSPhase2Tests = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Testes da Fase 2</h1>
        <p className="mt-2 text-gray-600">
          Validação dos hooks específicos para Markdown e sistema de fallback
        </p>
      </div>
      
      <Phase2TestPanel />
    </div>
  );
};

export default CMSPhase2Tests;
