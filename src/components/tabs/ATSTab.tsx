import React, { useState } from 'react';
import { PortfolioData } from '../../types';

interface ATSTabProps {
  data: PortfolioData;
}

export default function ATSTab({ data }: ATSTabProps) {
  const [jobDescription, setJobDescription] = useState('');
  
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">ATS Optimization</h2>
      <textarea 
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste job description here..."
        className="w-full h-40 border rounded p-2 text-sm"
      />
      <button className="w-full bg-black text-white py-2 rounded">Analyze Resume</button>
    </div>
  );
}
