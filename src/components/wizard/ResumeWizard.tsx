import React, { useState, useEffect } from 'react';
import { PortfolioData, BLANK_RESUME_DATA, TemplateId } from '../../types';
import WizardStepPersonal from './steps/WizardStepPersonal';
import WizardStepEducation from './steps/WizardStepEducation';
import WizardStepExperience from './steps/WizardStepExperience';
import WizardStepProjects from './steps/WizardStepProjects';
import WizardStepSkills from './steps/WizardStepSkills';
import WizardStepMore from './steps/WizardStepMore';
import WizardStepTemplate from './steps/WizardStepTemplate';
import BuildEasyLogo from '../common/BuildEasyLogo';

const STORAGE_KEY = 'buildeasy_resume_draft_v2';

const STEPS = [
  { name: 'Personal', id: 1 },
  { name: 'Education', id: 2 },
  { name: 'Experience', id: 3 },
  { name: 'Projects', id: 4 },
  { name: 'Skills', id: 5 },
  { name: 'More', id: 6 },
  { name: 'Template', id: 7 },
];

interface ResumeWizardProps {
  onComplete: (data: PortfolioData) => void;
  onExit: () => void;
  initialTemplateId?: TemplateId;
}

export default function ResumeWizard({ onComplete, onExit, initialTemplateId }: ResumeWizardProps) {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (initialTemplateId) {
        parsed.templateId = initialTemplateId;
      }
      return parsed;
    }
    const blank = { ...BLANK_RESUME_DATA };
    if (initialTemplateId) {
      blank.templateId = initialTemplateId;
    }
    return blank;
  });
  const [step, setStep] = useState(1);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const handleNext = () => {
    if (step < STEPS.length) setStep(step + 1);
    else {
      localStorage.removeItem(STORAGE_KEY);
      const defaultName = data.basicInfo.name ? `${data.basicInfo.name} — Resume` : 'My Resume'; const finalData = { ...data, resumeName: data.resumeName === 'Untitled Resume' || !data.resumeName ? defaultName : data.resumeName }; onComplete(finalData);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {
    switch(step) {
      case 1: return <WizardStepPersonal data={data} onChange={setData} />;
      case 2: return <WizardStepEducation data={data} onChange={setData} />;
      case 3: return <WizardStepExperience data={data} onChange={setData} />;
      case 4: return <WizardStepProjects data={data} onChange={setData} />;
      case 5: return <WizardStepSkills data={data} onChange={setData} />;
      case 6: return <WizardStepMore data={data} onChange={setData} />;
      case 7: return <WizardStepTemplate data={data} onChange={setData} />;
      default: return <div>Step {step}</div>;
    }
  };

  const progress = (step / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b px-8 py-4 flex justify-between items-center">
        <button onClick={onExit} className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"><BuildEasyLogo size="md" /></button>
        <button onClick={onExit} className="text-sm text-gray-500 hover:text-black">Save & Exit</button>
      </header>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 p-8">
        {/* Left: Progress Sidebar */}
        <div className="w-full md:w-64">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Create your resume</h2>
            <p className="text-sm text-gray-500">Step {step} of {STEPS.length}</p>
            <div className="w-full bg-gray-200 h-1 mt-2 rounded-full">
              <div className="bg-black h-1 rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <nav className="space-y-2">
            {STEPS.map((s, i) => (
              <div key={s.id} className={`flex items-center gap-3 p-2 rounded ${step === s.id ? 'bg-gray-100 font-bold' : 'text-gray-500'}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${step > s.id ? 'bg-black text-white' : step === s.id ? 'bg-black text-white' : 'border'}`}>
                    {step > s.id ? '✓' : s.id}
                </div>
                {s.name}
              </div>
            ))}
          </nav>
        </div>

        {/* Right: Content */}
        <div className="flex-1">
          {renderStep()}
          
          {/* Bottom Nav */}
          <div className="mt-12 flex justify-between pt-6 border-t">
            <button onClick={handleBack} disabled={step === 1} className="px-6 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50">Back</button>
            <button onClick={handleNext} className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800">{step === STEPS.length ? 'Create My Resume' : 'Continue'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
