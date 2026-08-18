import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import BuildEasyLogo from './BuildEasyLogo';

interface HeaderProps {
  currentScreen?: string;
  activeBuilderTab?: string;
  onNavigateHome: () => void;
  onStartBuilder: () => void;
  onReset?: () => void;
  hasResumeData?: boolean;
}

export default function Header({
  onNavigateHome,
  onStartBuilder,
  hasResumeData,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMobileCtaClick = () => {
    setMobileMenuOpen(false);
    onStartBuilder();
  };

  return (
    <div className="w-full sticky top-0 z-50 shrink-0 select-none bg-white">
      {/* Top subtle border */}
      <div className="h-[2px] w-full bg-[#222222]" />

      {/* Main Header Bar */}
      <header
        id="main-app-header"
        className="w-full h-[56px] sm:h-[60px] md:h-[64px] bg-white border-b border-[#E7E7E7] px-4 sm:px-6 md:px-8"
      >
        <div className="w-full max-w-[1440px] mx-auto h-full grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-center">
          
          {/* LEFT: Typographic BuildEasy Logo */}
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

          {/* CENTER: Main Home Navigation */}
          <div className="hidden md:flex items-center justify-self-center">
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
          </div>

          {/* RIGHT: Primary Action */}
          <div className="flex items-center justify-self-end gap-3">
            <div className="hidden md:flex items-center gap-3">
              <button
                id="header-create-resume-btn"
                onClick={onStartBuilder}
                className="h-[40px] px-5 rounded-[7px] bg-[#111111] text-white text-[13.5px] lg:text-[14px] font-semibold hover:bg-[#242424] hover:-translate-y-px transition-all duration-150 flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#111111] focus:ring-offset-2"
              >
                <span>{hasResumeData ? 'Resume Builder' : 'Create My Resume'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Actions: Hamburger Menu */}
            <div className="flex md:hidden items-center gap-2">
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
            </div>

          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
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
              <span>{hasResumeData ? 'Resume Builder' : 'Create My Resume'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
