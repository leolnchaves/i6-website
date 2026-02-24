import React, { memo, useEffect } from 'react';
import { X, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import solutionIcon from '@/assets/icons/solution-icon.png';

interface StoryModalData {
  id: string;
  industry: string;
  company_name: string;
  challenge: string;
  solution: string;
  metric1_value: string;
  metric1_label: string;
  metric2_value: string;
  metric2_label: string;
  metric3_value: string;
  metric3_label: string;
  customer_quote: string;
  customer_name: string;
  customer_title: string;
  image_url: string;
}

interface CompanyDetails {
  about: string;
  logo: string;
}

interface Solution {
  icon: any;
  name: string;
  color: string;
}

interface StoryModalProps {
  selectedStory: StoryModalData | null;
  onClose: () => void;
  language: string;
  getCompanyDetails: (story: StoryModalData) => CompanyDetails;
  getImplementedSolutions: (story: StoryModalData) => Solution[];
}

const StoryModal: React.FC<StoryModalProps> = memo(({
  selectedStory,
  onClose,
  language,
  getCompanyDetails,
  getImplementedSolutions
}) => {
  useEffect(() => {
    if (selectedStory) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedStory]);

  if (!selectedStory) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0B1224] border border-white/10 rounded-xl max-w-3xl w-full min-h-[50vh] max-h-[90vh] relative shadow-2xl animate-modal-enter flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient bar */}
        <div className="h-1 bg-[#F4845F]"></div>

        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 z-10 rounded-full w-8 h-8 bg-white/10 hover:bg-white/20 text-white"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Header */}
        <div className="p-6 pb-4 border-b border-white/10">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 pr-4">
              <div className="flex items-center mb-3">
                <Building2 className="w-4 h-4 text-white/40 mr-2" />
                <span className="text-xs font-medium text-white/40 uppercase tracking-wider">
                  {selectedStory.industry}
                </span>
              </div>
              <h1 className="text-2xl font-semibold text-white mb-3">
                {selectedStory.company_name}
              </h1>
              <p className="text-white/60 text-sm leading-relaxed">
                {getCompanyDetails(selectedStory).about}
              </p>
            </div>
            <div className="flex-shrink-0 mr-8 self-center">
              <img
                src={getCompanyDetails(selectedStory).logo}
                alt={`${selectedStory.company_name} logo`}
                className="w-16 h-16 rounded-lg object-contain border border-white/10 bg-white/5 p-2 brightness-0 invert opacity-80"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-sm font-semibold text-white mb-2 uppercase tracking-wider">
                {language === 'en' ? 'Challenge' : 'Desafio'}
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                {selectedStory.challenge}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white mb-2 uppercase tracking-wider">
                {language === 'en' ? 'Solution' : 'Solução'}
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                {selectedStory.solution}
              </p>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="text-xl font-semibold text-[#F4845F] mb-1">{selectedStory.metric1_value}</div>
              <div className="text-xs text-white/50 font-medium">{selectedStory.metric1_label}</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="text-xl font-semibold text-[#F4845F] mb-1">{selectedStory.metric2_value}</div>
              <div className="text-xs text-white/50 font-medium">{selectedStory.metric2_label}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
});

StoryModal.displayName = 'StoryModal';

export default StoryModal;
