import React, { memo, useEffect } from 'react';
import { X, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import solutionIcon from '@/assets/solution-icon.png';

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
  // Handle cleanup on unmount
  useEffect(() => {
    if (selectedStory) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedStory]);

  if (!selectedStory) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl max-w-3xl w-full max-h-[85vh] relative shadow-xl animate-modal-enter overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient bar on top - matching the card design */}
        <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-blue-500"></div>
        
        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 z-10 rounded-full w-8 h-8 bg-gray-100 hover:bg-gray-200"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Header with company info and logo */}
        <div className="p-6 pb-4 border-b border-gray-100">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 pr-4">
              <div className="flex items-center mb-3">
                <Building2 className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {selectedStory.industry}
                </span>
              </div>
              
              <h1 className="text-2xl font-semibold text-gray-900 mb-3">
                {selectedStory.company_name}
              </h1>

              {/* About text - directly below company name */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {getCompanyDetails(selectedStory).about}
              </p>
            </div>
            
            {/* Client Logo - smaller and positioned in header */}
            <div className="flex-shrink-0 mr-8">
              <img 
                src={getCompanyDetails(selectedStory).logo}
                alt={`${selectedStory.company_name} logo`}
                className="w-10 h-10 rounded-lg object-contain border border-gray-200 bg-white p-1"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                {language === 'en' ? 'Challenge' : 'Desafio'}
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {selectedStory.challenge}
              </p>
            </div>
            
            <div>
              <h2 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                {language === 'en' ? 'Solution' : 'Solução'}
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {selectedStory.solution}
              </p>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="text-xl font-semibold text-gray-700 mb-1">
                {selectedStory.metric1_value}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                {selectedStory.metric1_label}
              </div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="text-xl font-semibold text-gray-700 mb-1">
                {selectedStory.metric2_value}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                {selectedStory.metric2_label}
              </div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="text-xl font-semibold text-gray-700 mb-1">
                {selectedStory.metric3_value}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                {selectedStory.metric3_label}
              </div>
            </div>
          </div>

          {/* Implemented Solutions */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
              {language === 'en' ? 'Implemented Solutions' : 'Soluções Implementadas'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getImplementedSolutions(selectedStory).map((solution, index) => (
                <div key={index} className="flex items-center bg-white px-3 py-2 rounded-lg border border-gray-200 min-h-[44px] w-full">
                  <div className="w-6 h-6 rounded flex items-center justify-center mr-3 flex-shrink-0">
                    <img 
                      src={solutionIcon} 
                      alt="Solution" 
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                  <span className="font-medium text-gray-900 text-sm leading-tight line-clamp-2 flex-1">
                    {solution.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

StoryModal.displayName = 'StoryModal';

export default StoryModal;