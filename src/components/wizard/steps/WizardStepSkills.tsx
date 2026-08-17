import React from 'react';
import { PortfolioData } from '../../../types';

interface WizardStepProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
}

export default function WizardStepSkills({ data, onChange }: WizardStepProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">What are you good at?</h2>
      <p className="text-gray-500 mb-8">Add skills that match the roles you're targeting.</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {data.skills.map((skill, index) => (
          <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
            {skill} <button className="text-gray-500 hover:text-red-600">×</button>
          </span>
        ))}
      </div>
      <button className="text-blue-600 font-semibold">+ Add Skill</button>
    </div>
  );
}
