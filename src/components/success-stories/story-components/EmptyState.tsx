import React, { memo } from 'react';

interface EmptyStateProps {
  selectedSegment: string | null;
  language: string;
}

const EmptyState: React.FC<EmptyStateProps> = memo(({ selectedSegment, language }) => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-8">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
            {selectedSegment
              ? (language === 'en'
                  ? `No success stories found for "${selectedSegment}"`
                  : `Nenhum case de sucesso encontrado para "${selectedSegment}"`)
              : (language === 'en'
                  ? 'No success stories available'
                  : 'Nenhum case de sucesso disponível')
            }
          </h2>
          <p className="text-white/60 text-sm md:text-base">
            {selectedSegment
              ? (language === 'en'
                  ? 'Try selecting a different segment or view all stories.'
                  : 'Tente selecionar um segmento diferente ou veja todos os cases.')
              : (language === 'en'
                  ? 'Success stories will be displayed here when available.'
                  : 'Os cases de sucesso serão exibidos aqui quando estiverem disponíveis.')
            }
          </p>
        </div>
      </div>
    </section>
  );
});

EmptyState.displayName = 'EmptyState';

export default EmptyState;
