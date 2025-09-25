import React from 'react';
import { processAllIcons } from '@/utils/processImpactIcons';

const IconProcessor = () => {
  const handleProcessIcons = async () => {
    try {
      await processAllIcons();
      alert('Ícones processados! Verifique os downloads.');
    } catch (error) {
      console.error('Erro ao processar ícones:', error);
      alert('Erro ao processar ícones. Verifique o console.');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleProcessIcons}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg"
      >
        Processar Ícones
      </button>
    </div>
  );
};

export default IconProcessor;