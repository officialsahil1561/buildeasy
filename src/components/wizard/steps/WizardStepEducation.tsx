import React, { useState } from 'react';
import { PortfolioData, EducationItem } from '../../../types';

interface WizardStepProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
}

export default function WizardStepEducation({ data, onChange }: WizardStepProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<EducationItem>({ institution: '', degree: '', field: '', startDate: '', endDate: '' });

  const save = () => {
    onChange({ ...data, education: [...data.education, form] });
    setIsAdding(false);
    setForm({ institution: '', degree: '', field: '', startDate: '', endDate: '' });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Where did you study?</h2>
      <p className="text-gray-500 mb-8">Add your education. You can add more than one.</p>
      
      {isAdding ? (
        <div className="border p-6 rounded-lg space-y-4">
          <input className="w-full border p-2 rounded" placeholder="Institution *" value={form.institution} onChange={e => setForm({...form, institution: e.target.value})} />
          <input className="w-full border p-2 rounded" placeholder="Degree *" value={form.degree} onChange={e => setForm({...form, degree: e.target.value})} />
          <div className="flex gap-4">
            <button className="bg-black text-white px-6 py-2 rounded" onClick={save}>Save Education</button>
            <button className="bg-gray-100 px-6 py-2 rounded" onClick={() => setIsAdding(false)}>Cancel</button>
          </div>
        </div>
      ) : data.education.length === 0 ? (
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-4">No education added yet. That's okay — you can add it later.</p>
          <button className="bg-black text-white px-6 py-2 rounded-lg" onClick={() => setIsAdding(true)}>+ Add Education</button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={index} className="border p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-bold">{edu.institution}</h3>
                <p className="text-sm text-gray-600">{edu.degree} {edu.field ? `in ${edu.field}` : ''}</p>
              </div>
              <button className="text-sm text-red-600" onClick={() => onChange({...data, education: data.education.filter((_, i) => i !== index)})}>Delete</button>
            </div>
          ))}
          <button className="text-blue-600 font-semibold" onClick={() => setIsAdding(true)}>+ Add another education</button>
        </div>
      )}
    </div>
  );
}
