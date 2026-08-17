import React from 'react';
import { PortfolioData, TemplateId } from '../../types';

interface DesignTabProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

export default function DesignTab({ data, onChange }: DesignTabProps) {
  const updateCustomization = (key: string, value: any) => {
      onChange({ ...data, customization: {...data.customization!, [key]: value} });
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Design</h2>
      <div>
        <label className="block text-sm font-medium mb-2">Template</label>
        <select 
            value={data.templateId} 
            onChange={(e) => onChange({...data, templateId: e.target.value as TemplateId})}
            className="w-full border rounded p-2"
        >
            <option value="minimal">Minimal</option>
            <option value="modern">Modern</option>
            <option value="executive">Executive</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Spacing</label>
        <select 
            value={data.customization?.spacing || 'standard'}
            onChange={(e) => updateCustomization('spacing', e.target.value)}
            className="w-full border rounded p-2"
        >
            <option value="compact">Compact</option>
            <option value="standard">Standard</option>
            <option value="comfortable">Comfortable</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Page Size</label>
        <select 
            value={data.customization?.pageSize || 'A4'}
            onChange={(e) => updateCustomization('pageSize', e.target.value)}
            className="w-full border rounded p-2"
        >
            <option value="A4">A4</option>
            <option value="Letter">US Letter</option>
        </select>
      </div>
    </div>
  );
}
