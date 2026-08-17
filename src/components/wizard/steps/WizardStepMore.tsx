import React from 'react';
import { PortfolioData } from '../../../types';

interface WizardStepProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
}

export default function WizardStepMore({ data, onChange }: WizardStepProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Anything else?</h2>
      <p className="text-gray-500 mb-8">Choose what applies to you to make your resume stronger.</p>
      
      <div className="grid grid-cols-2 gap-4">
        {['Professional Summary', 'Certifications', 'Achievements & Awards', 'Publications', 'Volunteer Experience', 'Leadership', 'Languages', 'Research', 'Interests', 'Custom Section'].map((section) => (
          <button key={section} className="border p-4 rounded-lg text-left hover:border-black transition">
            + {section}
          </button>
        ))}
      </div>
    </div>
  );
}
