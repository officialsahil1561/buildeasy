import React from 'react';
import { PortfolioData } from '../../../types';

interface WizardStepProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
}

export default function WizardStepProjects({ data, onChange }: WizardStepProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">What have you built?</h2>
      <p className="text-gray-500 mb-8">Projects are especially useful if you're a student or early in your career.</p>
      
      {data.projects.length === 0 ? (
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-4">No projects yet.</p>
          <button className="bg-black text-white px-6 py-2 rounded-lg">+ Add Project</button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.projects.map((proj, index) => (
            <div key={index} className="border p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-bold">{proj.title}</h3>
                <p className="text-sm text-gray-600">{proj.description}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-sm text-blue-600">Edit</button>
                <button className="text-sm text-red-600">Delete</button>
              </div>
            </div>
          ))}
          <button className="text-blue-600 font-semibold">+ Add another project</button>
        </div>
      )}
    </div>
  );
}
