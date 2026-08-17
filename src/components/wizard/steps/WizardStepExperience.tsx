import React from 'react';
import { PortfolioData } from '../../../types';

interface WizardStepProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
}

export default function WizardStepExperience({ data, onChange }: WizardStepProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Where have you worked?</h2>
      <p className="text-gray-500 mb-8">Add jobs, internships, freelance work, or independent work.</p>
      
      {data.experience.length === 0 ? (
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-4">No experience added yet. If you haven't worked yet, that's okay.</p>
          <button className="bg-black text-white px-6 py-2 rounded-lg">+ Add Experience</button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index} className="border p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-bold">{exp.role}</h3>
                <p className="text-sm text-gray-600">{exp.org}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-sm text-blue-600">Edit</button>
                <button className="text-sm text-red-600">Delete</button>
              </div>
            </div>
          ))}
          <button className="text-blue-600 font-semibold">+ Add another experience</button>
        </div>
      )}
    </div>
  );
}
