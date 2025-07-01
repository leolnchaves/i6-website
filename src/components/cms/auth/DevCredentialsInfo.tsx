
import React from 'react';

const DevCredentialsInfo: React.FC = () => {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
      <p className="text-sm text-white/90 mb-2">
        <strong>Credenciais de teste (DEV):</strong>
      </p>
      <p className="text-sm text-white/80">
        Email: leo@infinity6.ai<br />
        Senha: tI#GhyB9kmlf
      </p>
      <p className="text-xs text-yellow-300 mt-2">
        ⚠️ Remover em produção
      </p>
    </div>
  );
};

export default DevCredentialsInfo;
