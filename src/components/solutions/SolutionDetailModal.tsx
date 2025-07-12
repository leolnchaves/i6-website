import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { LucideIcon, CheckCircle, Target } from 'lucide-react';

interface SolutionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  solution: {
    icon: LucideIcon;
    title: string;
    focus: string;
    description: string;
    features: string[];
    outcome: string;
    engine: string;
    bgColor: string;
  } | null;
}

const SolutionDetailModal = ({ isOpen, onClose, solution }: SolutionDetailModalProps) => {
  if (!solution) return null;

  const { icon: Icon, title, focus, description, features, outcome, engine, bgColor } = solution;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="p-3 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: bgColor }}
            >
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <Badge variant="secondary" className="mb-2 text-xs">
                {engine}
              </Badge>
              <DialogTitle className="text-2xl font-bold text-left">
                {title}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {focus}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-primary rounded-full"></div>
              Visão Geral
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-primary rounded-full"></div>
              Principais Funcionalidades
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Business Outcome */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-primary rounded-full"></div>
              Resultados de Negócio
            </h3>
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <Target className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-blue-800 leading-relaxed">
                {outcome}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SolutionDetailModal;