import React from 'react';
import { PortfolioData } from '../../../types';

interface WizardStepProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
}

export default function WizardStepPersonal({ data, onChange }: WizardStepProps) {
  const update = (key: keyof PortfolioData['basicInfo'], value: string) => {
    onChange({
      ...data,
      basicInfo: { ...data.basicInfo, [key]: value },
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Tell us about yourself</h2>
      <p className="text-gray-500 mb-8">Start with the basics. You can change everything later.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name *</label>
          <input
            type="text"
            className="w-full border rounded-lg p-3"
            placeholder="Sahil Soni"
            value={data.basicInfo.name}
            onChange={(e) => update('name', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Professional Title</label>
          <input
            type="text"
            className="w-full border rounded-lg p-3"
            placeholder="e.g. Full Stack Developer"
            value={data.basicInfo.tagline}
            onChange={(e) => update('tagline', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            type="email"
            className="w-full border rounded-lg p-3"
            placeholder="sahil@example.com"
            value={data.basicInfo.email}
            onChange={(e) => update('email', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            className="w-full border rounded-lg p-3"
            placeholder="+91 98765 43210"
            value={data.basicInfo.phone || ''}
            onChange={(e) => update('phone', e.target.value)}
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            className="w-full border rounded-lg p-3"
            placeholder="Pune, India"
            value={data.basicInfo.location || ''}
            onChange={(e) => update('location', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">LinkedIn</label>
          <input
            type="url"
            className="w-full border rounded-lg p-3"
            placeholder="linkedin.com/in/username"
            value={data.basicInfo.linkedin || ''}
            onChange={(e) => update('linkedin', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">GitHub</label>
          <input
            type="url"
            className="w-full border rounded-lg p-3"
            placeholder="github.com/username"
            value={data.basicInfo.github || ''}
            onChange={(e) => update('github', e.target.value)}
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium mb-1">Portfolio</label>
          <input
            type="url"
            className="w-full border rounded-lg p-3"
            placeholder="yourwebsite.com"
            value={data.basicInfo.portfolio || ''}
            onChange={(e) => update('portfolio', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
