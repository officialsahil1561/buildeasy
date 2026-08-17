import React from 'react';
import { PortfolioData } from '../../../types';

interface WizardStepProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
}

export default function WizardStepTemplate({ data, onChange }: WizardStepProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Choose your style</h2>
      <p className="text-gray-500 mb-8">You can change this later.</p>
      <div className="grid grid-cols-2 gap-4">
        {['Minimal', 'Modern', 'Executive', 'Classic', 'Academic', 'Compact'].map((template) => (
          <div key={template} className="border p-4 rounded-lg cursor-pointer hover:border-black">
            <h3 className="font-bold">{template}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
