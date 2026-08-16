import React, { useState } from 'react';
import { ArrowRight, RotateCcw, Menu, X } from 'lucide-react';
import { TabType } from '../FormBuilder';
import BuildEasyLogo from './BuildEasyLogo';

interface HeaderProps {
  currentScreen: 'home' | 'builder' | 'preview' | 'confirmation';
  activeBuilderTab?: TabType;
  onNavigateHome: () => void;
  onStartBuilder: () => void;
  onReset: () => void;
}

export default function Header({
  currentScreen,
  activeBuilderTab,
  onNavigateHome,
  onStartBuilder,
  onReset,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Stepper for Guided Workflow in builder/preview screens
  const steps = [
    { id: 'builder', label: 'Details', num: 1 },
    { id: 'preview', label: 'Review', num: 2 },
    { id: 'confirmation', label: 'Export', num: 3 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentScreen);
  const isHome = currentScreen === 'home';

  const handleMobileNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (!isHome) {
      onNavigateHome();
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleMobileCtaClick = () => {
    setMobileMenuOpen(false);
    onStartBuilder();
  };

  return (
    <div className="w-full sticky top-0 z-50 shrink-0 select-none bg-white">
      {/* 1. Top border: 2px solid #222222 */}
      <div className="h-[2px] w-full bg-[#222222]" />

      {/* 2. Main Header Bar: Height 60-64px (desktop), 56-60px (mobile) */}
      <header
        id="main-app-header"
        className="w-full h-[56px] sm:h-[60px] md:h-[64px] bg-white border-b border-[#E7E7E7] px-4 sm:px-6 md:px-8"
      >
        <div className="w-full max-w-[1440px] mx-auto h-full grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-center">
          
          {/* LEFT: Typographic BuildEasy Logo Only (No icons, no square background) */}
          <div className="flex items-center justify-self-start">
            <button
              id="header-logo-btn"
              onClick={onNavigateHome}
              className="flex items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#111111] focus:ring-offset-2 rounded py-1 px-1 -ml-1 text-left transition-opacity hover:opacity-90"
              aria-label="BuildEasy Home"
            >
              <BuildEasyLogo size="md" />
            </button>
          </div>

          {/* CENTER: Navigation (Desktop) / Stepper (Builder) */}
          <div className="hidden md:flex items-center justify-self-center">
            {isHome ? (
              <nav className="flex items-center gap-8 lg:gap-10" aria-label="Main Navigation">
                <a
                  href="#templates"
                  className="text-[13.5px] lg:text-[14px] font-medium text-[#555B65] hover:text-[#111111] transition-colors duration-150"
                >
                  Templates
                </a>
                <a
                  href="#how-it-works"
                  className="text-[13.5px] lg:text-[14px] font-medium text-[#555B65] hover:text-[#111111] transition-colors duration-150"
                >
                  How It Works
                </a>
                <a
                  href="#features"
                  className="text-[13.5px] lg:text-[14px] font-medium text-[#555B65] hover:text-[#111111] transition-colors duration-150"
                >
                  Features
                </a>
              </nav>
            ) : (
              <div className="flex items-center gap-2" aria-label="Resume Progress">
                {steps.map((step, idx) => {
                  const isActive = step.id === currentScreen;
                  const isCompleted = currentStepIndex > idx;

                  return (
                    <React.Fragment key={step.id}>
                      {idx > 0 && (
                        <div
                          className={`w-5 h-[1px] ${
                            isCompleted ? 'bg-[#111111]' : 'bg-[#E5E7EB]'
                          }`}
                        />
                      )}
                      <div
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-[#111111] text-white shadow-2xs'
                            : isCompleted
                            ? 'bg-[#F3F4F6] text-[#111827]'
                            : 'text-[#9CA3AF]'
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                            isActive
                              ? 'bg-white text-[#111111]'
                              : isCompleted
                              ? 'bg-[#111111] text-white'
                              : 'bg-[#E5E7EB] text-[#6B7280]'
                          }`}
                        >
                          {isCompleted ? '✓' : step.num}
                        </span>
                        <span>{step.label}</span>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT: Primary CTA Button (Desktop) / Mobile Toggle Button */}
          <div className="flex items-center justify-self-end gap-3">
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {isHome ? (
                <button
                  id="header-create-resume-btn"
                  onClick={onStartBuilder}
                  className="h-[40px] px-5 rounded-[7px] bg-[#111111] text-white text-[13.5px] lg:text-[14px] font-semibold hover:bg-[#242424] hover:-translate-y-px transition-all duration-150 flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#111111] focus:ring-offset-2"
                >
                  <span>Create My Resume</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                  <button
                    onClick={onReset}
                    className="text-xs font-semibold text-[#6B7280] hover:text-[#111827] px-3 py-1.5 rounded-md hover:bg-[#F3F4F6] transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Reset & start over"
                  >
                    <RotateCcw className="w-3 h-3 text-[#9CA3AF]" />
                    <span>Start Over</span>
                  </button>
              )}
            </div>

            {/* Mobile Actions: Hamburger Menu Toggle */}
            <div className="flex md:hidden items-center gap-2">
              {isHome ? (
                <button
                  id="mobile-menu-toggle-btn"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="w-9 h-9 flex items-center justify-center rounded-md text-[#111111] hover:bg-[#F3F4F6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#111111]"
                  aria-label="Toggle navigation menu"
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5 text-[#111111]" />
                  ) : (
                    <Menu className="w-5 h-5 text-[#111111]" />
                  )}
                </button>
              ) : (
                <button
                  onClick={onReset}
                  className="text-xs font-semibold text-[#6B7280] hover:text-[#111827] px-2.5 py-1.5 rounded bg-[#F3F4F6] border border-[#E5E7EB] flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* Mobile Menu Dropdown (Clean white background, thin border, matching spec sheet) */}
      {isHome && mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-white border-b border-[#E5E7EB] px-5 py-5 flex flex-col gap-4 shadow-sm animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => handleMobileNavClick('#templates')}
              className="text-left py-1.5 text-[16px] font-medium text-[#111827] hover:text-[#555B65] transition-colors"
            >
              Templates
            </button>
            <button
              onClick={() => handleMobileNavClick('#how-it-works')}
              className="text-left py-1.5 text-[16px] font-medium text-[#111827] hover:text-[#555B65] transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => handleMobileNavClick('#features')}
              className="text-left py-1.5 text-[16px] font-medium text-[#111827] hover:text-[#555B65] transition-colors"
            >
              Features
            </button>
          </div>

          <div className="pt-2 border-t border-[#F3F4F6]">
            <button
              id="mobile-drawer-create-resume-btn"
              onClick={handleMobileCtaClick}
              className="w-full h-[44px] rounded-[7px] bg-[#111111] text-white text-[14px] font-semibold hover:bg-[#242424] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Create My Resume</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
