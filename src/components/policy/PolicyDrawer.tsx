import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { toContentLang } from '@/utils/localizedPath';
import { PrivacyPolicyBody, privacyHero } from '@/pages/PrivacyPolicy';
import { EthicsPolicyBody, ethicsContent } from '@/pages/EthicsPolicy';

export type PolicyKind = 'privacy' | 'ethics';

type PolicyDrawerContextValue = {
  openPolicy: (kind: PolicyKind) => void;
  closePolicy: () => void;
};

const PolicyDrawerContext = createContext<PolicyDrawerContextValue>({
  openPolicy: () => undefined,
  closePolicy: () => undefined,
});

export const usePolicyDrawer = () => useContext(PolicyDrawerContext);

const PolicyDrawerPanel = ({ kind, onClose }: { kind: PolicyKind; onClose: () => void }) => {
  const { language } = useLanguage();
  const contentLang = toContentLang(language);
  const head = kind === 'privacy' ? privacyHero[contentLang] : ethicsContent[contentLang];

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
      <Dialog.Content
        className="fixed inset-y-0 right-0 z-[61] flex h-full w-[92%] flex-col border-l border-black/5 bg-[#FAF7F2] shadow-2xl transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right data-[state=open]:duration-500 data-[state=closed]:duration-300 md:w-[40%]"
        aria-describedby={undefined}
      >
        {/* Cabeçalho fixo */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[#F4845F]/10 bg-[#FAF7F2]/90 p-6 backdrop-blur-md">
          <Dialog.Title className="text-xl font-bold text-[#2D2D2D]">{head.title}</Dialog.Title>
          <Dialog.Close
            aria-label="Fechar"
            className="group rounded-full p-2 transition-colors hover:bg-[#F4845F]/10"
          >
            <X className="h-6 w-6 text-[#2D2D2D] group-hover:text-[#F4845F]" />
          </Dialog.Close>
        </div>

        {/* Conteúdo com rolagem própria */}
        <div className="policy-surface flex-1 overflow-y-auto p-6 text-sm leading-relaxed md:p-8">
          <p className="mb-8 text-[#5D5D5D]">{head.subtitle}</p>
          {kind === 'privacy' ? <PrivacyPolicyBody /> : <EthicsPolicyBody />}
        </div>

        {/* Rodapé do painel */}
        <div className="border-t border-[#F4845F]/10 bg-white/30 p-6 text-center">
          <p className="text-[10px] uppercase tracking-widest text-[#5D5D5D]">{head.lastUpdated}</p>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export const PolicyDrawerProvider = ({ children }: { children: ReactNode }) => {
  const [kind, setKind] = useState<PolicyKind | null>(null);

  const openPolicy = useCallback((next: PolicyKind) => setKind(next), []);
  const closePolicy = useCallback(() => setKind(null), []);

  const value = useMemo(() => ({ openPolicy, closePolicy }), [openPolicy, closePolicy]);

  return (
    <PolicyDrawerContext.Provider value={value}>
      {children}
      <Dialog.Root open={kind !== null} onOpenChange={(open) => !open && closePolicy()}>
        {kind && <PolicyDrawerPanel kind={kind} onClose={closePolicy} />}
      </Dialog.Root>
    </PolicyDrawerContext.Provider>
  );
};

export default PolicyDrawerProvider;
