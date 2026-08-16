import React, { useState, useEffect } from 'react';
import { PortfolioData, INITIAL_PORTFOLIO_DATA, BLANK_RESUME_DATA, TemplateId } from './types';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ScreenHome from './components/screens/ScreenHome';
import ScreenBuilder from './components/screens/ScreenBuilder';
import ScreenPreview from './components/screens/ScreenPreview';
import ScreenExportConfirmation from './components/screens/ScreenExportConfirmation';
import { TabType } from './components/FormBuilder';

const LOCAL_STORAGE_DATA_KEY = 'buildeasy_data_v2';
const LOCAL_STORAGE_SCREEN_KEY = 'buildeasy_screen_v2';
const LOCAL_STORAGE_TAB_KEY = 'buildeasy_tab_v2';

// Legacy keys fallback
const LEGACY_DATA_KEY = 'careerarchitect_data_v2';

type ScreenId = 'home' | 'builder' | 'preview' | 'confirmation';

export default function App() {
  // Main resume data state
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_DATA_KEY) || localStorage.getItem(LEGACY_DATA_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.basicInfo?.name === 'Alex Morgan' || parsed.basicInfo?.firstName === 'Alex') {
          return BLANK_RESUME_DATA;
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse saved resume data', e);
      }
    }
    return BLANK_RESUME_DATA;
  });

  // Current screen state
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_SCREEN_KEY);
    if (saved === 'onboarding' || saved === 'template') return 'home';
    return (saved as ScreenId) || 'home';
  });

  // Active step tab in guided builder
  const [activeBuilderTab, setActiveBuilderTab] = useState<TabType>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_TAB_KEY);
    return (saved as TabType) || 'overview';
  });

  // Autosave resume data to localStorage with quota handling
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(data));
      } catch (e) {
        console.warn('LocalStorage quota exceeded or unavailable', e);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [data]);

  // Persist current screen
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_SCREEN_KEY, currentScreen);
    } catch (e) {
      // Ignore
    }
  }, [currentScreen]);

  // Persist current builder tab
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_TAB_KEY, activeBuilderTab);
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

  const handleStartBuilder = (templateId?: TemplateId) => {
    if (templateId) {
      setData((prev) => ({
        ...prev,
        templateId,
      }));
    }
    setActiveBuilderTab('overview');
    setCurrentScreen('builder');
  };

  const handleStartOver = () => {
    setData({
      ...BLANK_RESUME_DATA,
      templateId: data.templateId || 'minimal',
    });
    setActiveBuilderTab('overview');
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen bg-[#F7F8F9] flex flex-col font-sans select-none antialiased text-[#111827]">
      {/* 1. Global Header */}
      {currentScreen === 'home' && <Header
        currentScreen={currentScreen}
        activeBuilderTab={activeBuilderTab}
        onNavigateHome={() => setCurrentScreen('home')}
        onStartBuilder={() => handleStartBuilder()}
        onReset={handleStartOver}
      />}

      {/* 2. Main Screen Routing */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Screen 1: Editorial Landing Page */}
        {currentScreen === 'home' && (
          <div className="flex-1 overflow-y-auto">
            <ScreenHome onStartBuilder={handleStartBuilder} />
          </div>
        )}

        {/* Screen 2: Guided Multi-Step Form & Real-time Live Preview */}
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

        {/* Screen 3: Full Document Preview & Review */}
        {currentScreen === 'preview' && (
          <ScreenPreview
            data={data}
            onBackToEdit={() => setCurrentScreen('builder')}
            onNavigateToTab={(tabId) => {
              setActiveBuilderTab(tabId);
              setCurrentScreen('builder');
            }}
            onProceedToExport={() => setCurrentScreen('confirmation')}
            onSwitchTemplate={handleSelectTemplate}
          />
        )}

        {/* Screen 4: Export Confirmation & Download */}
        {currentScreen === 'confirmation' && (
          <ScreenExportConfirmation
            data={data}
            onEditAgain={() => setCurrentScreen('builder')}
            onStartOver={handleStartOver}
          />
        )}
      </main>

      {/* 3. Global Footer */}
      {currentScreen === 'home' && <Footer />}
    </div>
  );
}
