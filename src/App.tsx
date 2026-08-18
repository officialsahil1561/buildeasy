import React, { useState, useEffect } from 'react';
import { PortfolioData, TemplateId } from './types';
import Header from './components/common/Header';
import ScreenHome from './components/screens/ScreenHome';
import ResumeWizard from './components/wizard/ResumeWizard';
import ScreenBuilder from './components/screens/ScreenBuilder';
import ScreenPreview from './components/screens/ScreenPreview';
import ScreenExportConfirmation from './components/screens/ScreenExportConfirmation';
import ConfirmModal from './components/common/ConfirmModal';
import { TabType } from './components/FormBuilder';
import { loadPersistedResume, persistResumeData, STORAGE_KEYS } from './lib/storage';
import { BLANK_RESUME_DATA } from './types';

type ScreenId = 'home' | 'wizard' | 'builder' | 'preview' | 'confirmation';

export default function App() {
  // Main resume data state initialized through authoritative migration engine
  const [data, setData] = useState<PortfolioData>(() => loadPersistedResume());

  // Current screen state
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SCREEN);
    if (saved === 'onboarding' || saved === 'template') return 'home';
    return (saved as ScreenId) || 'home';
  });

  // Active step tab in guided builder
  const [activeBuilderTab, setActiveBuilderTab] = useState<TabType>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TAB);
    return (saved as TabType) || 'basic';
  });

  // Modal States
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Autosave resume data with quota guard & versioning
  useEffect(() => {
    const timer = setTimeout(() => {
      persistResumeData(data);
    }, 300);
    return () => clearTimeout(timer);
  }, [data]);

  // Persist current screen
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SCREEN, currentScreen);
    } catch (e) {
      // Ignore
    }
  }, [currentScreen]);

  // Persist current builder tab
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TAB, activeBuilderTab);
    } catch (e) {
      // Ignore
    }
  }, [activeBuilderTab]);

  // Actions
  const handleSelectTemplate = (templateId: TemplateId, accentColor?: string) => {
    setData((prev) => ({
      ...prev,
      templateId,
      ...(accentColor !== undefined ? { accentColor } : {}),
    }));
  };

  const [wizardTemplateId, setWizardTemplateId] = useState<TemplateId | undefined>();

  const hasResumeData = Boolean(
    (data.experience && data.experience.length > 0) ||
    (data.education && data.education.length > 0) ||
    (data.skills && data.skills.length > 0) ||
    Boolean(data.basicInfo?.name?.trim())
  );

  const handleStartFromHome = (templateId?: TemplateId) => {
    if (hasResumeData) {
      if (templateId) {
        setData((prev) => ({ ...prev, templateId }));
      }
      setActiveBuilderTab('basic');
      setCurrentScreen('builder');
    } else {
      setWizardTemplateId(templateId);
      setCurrentScreen('wizard');
    }
  };

  const handleStartOverRequest = () => {
    setIsResetConfirmOpen(true);
  };

  const handleConfirmStartOver = () => {
    setData({
      ...BLANK_RESUME_DATA,
      templateId: data.templateId || 'minimal',
    });
    setActiveBuilderTab('basic');
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen bg-[#F7F8F9] flex flex-col font-sans select-none antialiased text-[#111827]">
      {/* 1. Global Header for Home view */}
      {currentScreen === 'home' && (
        <Header
          currentScreen={currentScreen}
          activeBuilderTab={activeBuilderTab}
          onNavigateHome={() => setCurrentScreen('home')}
          onStartBuilder={() => handleStartFromHome()}
          onReset={handleStartOverRequest}
          hasResumeData={hasResumeData}
        />
      )}

      {/* 2. Main Screen Routing */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Screen 1: Editorial Landing Page */}
        {currentScreen === 'home' && (
          <div className="flex-1 overflow-y-auto">
            <ScreenHome
              onStartBuilder={(templateId) => handleStartFromHome(templateId)}
              hasResumeData={hasResumeData}
            />
          </div>
        )}

        {/* Screen 2: Guided Resume Creation Wizard */}
        {currentScreen === 'wizard' && (
          <div className="flex-1 overflow-y-auto bg-white">
            <ResumeWizard
              initialTemplateId={wizardTemplateId}
              onComplete={(finalData) => {
                setData(finalData);
                setCurrentScreen('builder');
              }}
              onExit={() => setCurrentScreen('home')}
            />
          </div>
        )}

        {/* Screen 3: Guided Multi-Step Form & Real-time Live Preview */}
        {currentScreen === 'builder' && (
          <ScreenBuilder
            data={data}
            onChange={setData}
            activeTab={activeBuilderTab}
            onTabChange={setActiveBuilderTab}
            onNextAtEnd={() => setCurrentScreen('preview')}
            onBackAtStart={() => setCurrentScreen('home')}
          />
        )}

        {/* Screen 4: Full Document Preview & Review */}
        {currentScreen === 'preview' && (
          <ScreenPreview
            data={data}
            onBackToEdit={() => setCurrentScreen('builder')}
            onSelectTemplate={handleSelectTemplate}
          />
        )}

        {/* Screen 5: Export Confirmation & Download */}
        {currentScreen === 'confirmation' && (
          <ScreenExportConfirmation
            data={data}
            onEditAgain={() => setCurrentScreen('builder')}
            onStartOver={handleStartOverRequest}
          />
        )}
      </main>

      {/* 3. Reset Confirmation Modal */}
      <ConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleConfirmStartOver}
        title="Start a new resume?"
        message="Your current resume will be cleared. This action cannot be undone."
        confirmText="Start New Resume"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}
