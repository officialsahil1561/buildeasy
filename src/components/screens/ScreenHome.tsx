import React, { useState } from 'react';
import { PortfolioData, TemplateId, INITIAL_PORTFOLIO_DATA } from '../../types';
import { TEMPLATE_LIST } from '../ChangeTemplateModal';
import ScaledResumePreview from '../common/ScaledResumePreview';
import { 
  ArrowRight, 
  Layers, 
  Eye, 
  Download, 
  User, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck
} from 'lucide-react';

interface ScreenHomeProps {
  onStartBuilder: (templateId?: TemplateId) => void;
}

export default function ScreenHome({ onStartBuilder }: ScreenHomeProps) {
  const [mockupActiveTab, setMockupActiveTab] = useState<'editor' | 'preview'>('preview');

  const sampleData = INITIAL_PORTFOLIO_DATA;

  // Sample data variations for hero layered documents
  const minimalData: PortfolioData = { ...sampleData, templateId: 'minimal' };
  const creativeData: PortfolioData = { ...sampleData, templateId: 'executive', accentColor: '#0F172A' };
  const developerData: PortfolioData = { ...sampleData, templateId: 'modern', accentColor: '#2563EB' };

  return (
    <div className="w-full bg-[#F7F8F9] text-[#171717] selection:bg-[#111111] selection:text-white overflow-x-hidden" style={{ backgroundColor: '#ffffff', borderColor: '#ffffff' }}>
      
      {/* 1. HERO SECTION */}
      <section className="pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-20 md:pb-28 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* Editorial Serif Headline (Responsive 40px mobile -> 72px desktop) */}
        <h1 className="font-serif text-[38px] leading-[1.12] sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#111827] max-w-3xl sm:leading-[1.08] mb-4 sm:mb-6">
          Your experience.<br />
          Beautifully presented.
        </h1>

        {/* Supporting Copy */}
        <p className="text-sm sm:text-base md:text-lg text-[#4B5563] max-w-2xl font-normal leading-relaxed mb-6 sm:mb-8 px-2">
          Craft a resume that reflects your professional caliber. High-end editorial design
          meets intuitive building, ensuring your career history stands out with clarity and confidence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 mb-12 sm:mb-16 md:mb-20 w-full sm:w-auto px-4 sm:px-0">
          <button
            id="hero-create-resume-btn"
            onClick={() => onStartBuilder('minimal')}
            className="w-full sm:w-auto px-7 py-3.5 sm:py-3 rounded-[7px] bg-[#111111] text-white text-sm font-semibold hover:bg-black hover:-translate-y-px transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#111111] focus:ring-offset-2 min-h-[44px]"
          >
            <span>Create My Resume</span>
            <ArrowRight style={{ width: '67px', height: '57px' }} className="w-4 h-4" />
          </button>

          <a
            href="#templates"
            className="w-full sm:w-auto px-6 py-3.5 sm:py-3 rounded-[7px] bg-white border border-[#D1D5DB] text-[#374151] text-sm font-semibold hover:bg-[#F9FAFB] hover:text-[#111827] transition-all shadow-2xs flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#111111] min-h-[44px]"
          >
            Explore Templates
          </a>
        </div>

        {/* HERO VISUAL: Responsive layered documents (stacked/scaled cleanly on mobile without overflow) */}
        <div className="relative w-full max-w-4xl flex items-center justify-center pt-2 sm:pt-4 pb-4 sm:pb-8">
          {/* Left Layered Document (Hidden on very small mobile to prevent clipping) */}
          <div className="hidden sm:block absolute left-[4%] sm:left-[10%] md:left-[16%] -top-2 sm:-top-4 w-[200px] sm:w-[280px] md:w-[350px] aspect-[1/1.32] rounded-lg shadow-md sm:shadow-lg border border-[#E5E7EB] bg-white overflow-hidden -rotate-6 transform transition-transform duration-300 hover:-rotate-3 z-0 opacity-80 sm:opacity-85">
            <ScaledResumePreview data={creativeData} pageWidth={816} className="w-full h-full" />
          </div>

          {/* Right Layered Document (Hidden on very small mobile to prevent clipping) */}
          <div className="hidden sm:block absolute right-[4%] sm:right-[10%] md:right-[16%] -top-2 sm:-top-4 w-[200px] sm:w-[280px] md:w-[350px] aspect-[1/1.32] rounded-lg shadow-md sm:shadow-lg border border-[#E5E7EB] bg-white overflow-hidden rotate-6 transform transition-transform duration-300 hover:rotate-3 z-0 opacity-80 sm:opacity-85">
            <ScaledResumePreview data={developerData} pageWidth={816} className="w-full h-full" />
          </div>

          {/* Center Dominant Document (Always visible, responsive width) */}
          <div className="relative z-10 w-[260px] sm:w-[330px] md:w-[400px] aspect-[1/1.32] rounded-lg shadow-xl sm:shadow-2xl border border-[#CBD5E1] bg-white overflow-hidden">
            <ScaledResumePreview data={minimalData} pageWidth={816} className="w-full h-full" />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION — ITERATION 2 */}
      <section className="py-14 sm:py-20 md:py-28 px-4 sm:px-6 bg-[#F7F8FA] border-b border-[#E3E7EC]">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          
          <div className="text-center mb-16 sm:mb-20">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B6472] block mb-2">
              HOW BUILDEASY WORKS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#111827] mb-3 sm:mb-4">
              How it works
            </h2>
            <p className="text-sm sm:text-base text-[#5B6472] max-w-lg mx-auto">
              Build a polished, professional resume in minutes — without starting from a blank page.
            </p>
          </div>

          {/* Connected vertical workflow container */}
          <div className="w-full relative space-y-16 sm:space-y-24">
            {/* Subtle vertical connector line */}
            <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-[1px] bg-[#DDE3EA] -translate-x-1/2 z-0" />

            {/* STEP 01: Text Left, Visual Right */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="flex flex-col items-start text-left space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EFF6FF] border border-[#2563EB]/30 text-[#2563EB] flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#5B6472]">
                    START HERE
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#111827]">
                  Choose your template
                </h3>
                <p className="text-sm text-[#5B6472] leading-relaxed">
                  Start with a professionally designed resume template built for clarity, readability, and ATS compatibility.
                </p>
              </div>

              {/* Visual Right: Template selection UI */}
              <div className="bg-white rounded-2xl border border-[#E3E7EC] p-5 shadow-2xs">
                <div className="flex items-center justify-between mb-4 border-b border-[#E3E7EC] pb-3">
                  <span className="text-xs font-bold text-[#111827]">Select Template Style</span>
                  <span className="text-[10px] font-medium text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-full">4 curated layouts</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {/* Minimal (Selected) */}
                  <div className="relative p-3 rounded-xl border-2 border-[#2563EB] bg-[#EFF6FF] flex flex-col justify-between h-36">
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-[10px]">✓</div>
                    <div>
                      <span className="text-xs font-bold text-[#111827]">Minimal</span>
                      <p className="text-[10px] text-[#5B6472]">Clean & timeless</p>
                    </div>
                    <div className="space-y-1 pt-2">
                      <div className="h-1.5 w-3/4 bg-[#2563EB]/25 rounded" />
                      <div className="h-1 w-full bg-[#DDE3EA] rounded" />
                      <div className="h-1 w-1/2 bg-[#DDE3EA] rounded" />
                    </div>
                  </div>
                  {/* Executive */}
                  <div className="p-3 rounded-xl border border-[#E3E7EC] bg-white flex flex-col justify-between h-36">
                    <div>
                      <span className="text-xs font-bold text-[#111827]">Executive</span>
                      <p className="text-[10px] text-[#5B6472]">Authoritative grid</p>
                    </div>
                    <div className="space-y-1 pt-2">
                      <div className="h-1.5 w-2/3 bg-[#94A3B8] rounded" />
                      <div className="h-1 w-full bg-[#E3E7EC] rounded" />
                    </div>
                  </div>
                  {/* Modern */}
                  <div className="p-3 rounded-xl border border-[#E3E7EC] bg-white flex flex-col justify-between h-36">
                    <div>
                      <span className="text-xs font-bold text-[#111827]">Modern</span>
                      <p className="text-[10px] text-[#5B6472]">Creative split</p>
                    </div>
                    <div className="space-y-1 pt-2">
                      <div className="h-1.5 w-3/4 bg-[#94A3B8] rounded" />
                      <div className="h-1 w-full bg-[#E3E7EC] rounded" />
                    </div>
                  </div>
                  {/* Academic */}
                  <div className="p-3 rounded-xl border border-[#E3E7EC] bg-[#F1F5F9] flex flex-col justify-between h-36">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#111827]">Academic</span>
                      <span className="text-[8px] bg-white text-[#5B6472] px-1.5 py-0.5 rounded border border-[#E3E7EC]">CV</span>
                    </div>
                    <div className="space-y-1 pt-2">
                      <div className="h-1.5 w-4/5 bg-[#94A3B8] rounded" />
                      <div className="h-1 w-full bg-[#E3E7EC] rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 02: Visual Left, Text Right */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Visual Left: Builder UI snapshot */}
              <div className="bg-white rounded-2xl border border-[#E3E7EC] p-5 shadow-2xs order-2 md:order-1">
                <div className="flex items-center justify-between mb-4 border-b border-[#E3E7EC] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#087F5B]" />
                    <span className="text-xs font-bold text-[#111827]">Experience & Details</span>
                  </div>
                  <span className="text-[10px] text-[#087F5B] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-full font-medium">Saved</span>
                </div>
                <div className="space-y-3">
                  <div className="bg-[#F7F8FA] p-3 rounded-xl border border-[#E3E7EC] space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold text-[#111827]">
                      <span>Staff Software Engineer</span>
                      <span className="text-[10px] text-[#5B6472]">2022 — Present</span>
                    </div>
                    <p className="text-[11px] text-[#5B6472]">Architected real-time collaboration canvas supporting 50k+ active users...</p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#5B6472] px-1">
                    <span>5 sections organized</span>
                    <span className="text-[#087F5B] font-semibold">ATS-Ready</span>
                  </div>
                </div>
              </div>

              {/* Text Right */}
              <div className="flex flex-col items-start text-left space-y-3 order-1 md:order-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#E3E7EC] text-[#5B6472] flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#5B6472]">
                    BUILD YOUR PROFILE
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#111827]">
                  Add your information
                </h3>
                <p className="text-sm text-[#5B6472] leading-relaxed">
                  Add your experience, education, skills, projects, and links once. BuildEasy keeps everything organized.
                </p>
              </div>
            </div>

            {/* STEP 03: Text Left, Visual Right */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="flex flex-col items-start text-left space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#E3E7EC] text-[#5B6472] flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#5B6472]">
                    MAKE IT YOURS
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#111827]">
                  Make it yours
                </h3>
                <p className="text-sm text-[#5B6472] leading-relaxed">
                  Adjust the layout, typography, sections, and details while seeing every change instantly.
                </p>
              </div>

              {/* Visual Right: Customization Controls & Live Preview indicator */}
              <div className="bg-white rounded-2xl border border-[#E3E7EC] p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E3E7EC] pb-3">
                  <span className="text-xs font-bold text-[#111827]">Typography & Spacing Controls</span>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#2563EB] font-medium bg-[#EFF6FF] px-2 py-0.5 rounded">
                    <span>EDIT</span>
                    <span>→</span>
                    <span>PREVIEW</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-[#F7F8FA] rounded-xl border border-[#E3E7EC]">
                    <span className="text-[10px] text-[#5B6472] block mb-1">Font Family</span>
                    <span className="text-xs font-bold text-[#111827]">Inter / Serif</span>
                  </div>
                  <div className="p-3 bg-[#F7F8FA] rounded-xl border border-[#E3E7EC]">
                    <span className="text-[10px] text-[#5B6472] block mb-1">Section Spacing</span>
                    <span className="text-xs font-bold text-[#111827]">Balanced (1.2x)</span>
                  </div>
                </div>
                <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl text-center">
                  <span className="text-xs font-semibold text-[#087F5B]">Instant Live Preview Updating</span>
                </div>
              </div>
            </div>

            {/* STEP 04: Visual Left, Text Right */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Visual Left: Export / Download card */}
              <div className="bg-white rounded-2xl border border-[#E3E7EC] p-5 shadow-2xs space-y-4 order-2 md:order-1">
                <div className="flex items-center justify-between border-b border-[#E3E7EC] pb-3">
                  <span className="text-xs font-bold text-[#111827]">Export Package</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#087F5B] border border-[#A7F3D0]">
                      PDF Ready
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20">
                      ATS-Friendly
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-[#F7F8FA] rounded-xl border border-[#E3E7EC] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#111827] block">My_Resume.pdf</span>
                    <span className="text-[10px] text-[#5B6472]">Clean layout • Working hyperlinks • 1 page</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                </div>
                <button
                  onClick={() => onStartBuilder('minimal')}
                  className="w-full py-3 rounded-[7px] bg-[#111111] text-white text-xs font-semibold hover:bg-black transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Download Resume</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Text Right */}
              <div className="flex flex-col items-start text-left space-y-3 order-1 md:order-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#E3E7EC] text-[#5B6472] flex items-center justify-center font-bold text-xs">
                    04
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#5B6472]">
                    READY TO GO
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#111827]">
                  Download & apply
                </h3>
                <p className="text-sm text-[#5B6472] leading-relaxed">
                  Export a polished, ATS-friendly PDF with working links and clean formatting, ready to send to employers.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. MEET BUILDEASY: Product Interface Mockup */}
      <section id="how-it-works" className="py-14 sm:py-20 md:py-28 px-4 sm:px-6 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#111827] text-center mb-3 sm:mb-4">
            Meet BuildEasy
          </h2>

          <p className="text-sm sm:text-base text-[#4B5563] text-center max-w-2xl leading-relaxed mb-8 sm:mb-12 px-2">
            A refined builder interface designed to feel more like a boutique publishing tool than a
            standard application. Focus on your content; we handle the precision.
          </p>

          {/* Mobile Tab Toggle for Mockup (< md viewports) */}
          <div className="md:hidden flex items-center bg-[#F3F4F6] p-1 rounded-lg border border-[#E5E7EB] mb-4">
            <button
              onClick={() => setMockupActiveTab('preview')}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                mockupActiveTab === 'preview' ? 'bg-white text-[#111827] shadow-2xs' : 'text-[#6B7280]'
              }`}
            >
              Live Resume
            </button>
            <button
              onClick={() => setMockupActiveTab('editor')}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                mockupActiveTab === 'editor' ? 'bg-white text-[#111827] shadow-2xs' : 'text-[#6B7280]'
              }`}
            >
              Step Editor
            </button>
          </div>

          {/* Browser Window Mockup */}
          <div className="w-full max-w-4xl rounded-xl border border-[#D1D5DB] bg-white shadow-xl overflow-hidden">
            {/* Browser Window Header */}
            <div className="h-10 bg-[#F3F4F6] border-b border-[#E5E7EB] px-4 flex items-center justify-between select-none">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB] border border-[#CBD5E1]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB] border border-[#CBD5E1]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB] border border-[#CBD5E1]" />
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-md px-3 sm:px-4 py-0.5 text-[10px] sm:text-[11px] text-[#6B7280] font-mono shadow-2xs truncate max-w-[180px] sm:max-w-none">
                buildeasy.app/builder
              </div>
              <div className="w-8" />
            </div>

            {/* Mockup Body: Left Editor + Right Live Sheet */}
            <div className="flex flex-col md:flex-row min-h-[360px] md:h-[460px] bg-[#F8FAFC]">
              
              {/* Left Editor Simulation */}
              <div
                className={`w-full md:w-[42%] bg-white border-b md:border-b-0 md:border-r border-[#E5E7EB] p-4 sm:p-5 flex flex-col overflow-y-auto space-y-4 ${
                  mockupActiveTab === 'preview' ? 'hidden md:flex' : 'flex'
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                    Content Sections
                  </span>
                  <div className="mt-2 space-y-1.5">
                    <div className="flex items-center justify-between p-2 rounded-md bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-semibold text-[#111827]">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-[#4B5563]" />
                        <span>Personal Info</span>
                      </div>
                      <span className="text-[10px] text-[#059669] font-bold">✓</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-md bg-[#0F172A] text-white text-xs font-semibold shadow-xs">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-white" />
                        <span>Experience</span>
                      </div>
                      <span className="text-[10px] text-white/80 font-bold">Active</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-md bg-white border border-[#E5E7EB] text-xs font-semibold text-[#6B7280]">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5 text-[#9CA3AF]" />
                        <span>Education</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Experience Editor Form Snapshot */}
                <div className="pt-2 border-t border-[#F3F4F6] space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                    Experience Editor
                  </span>
                  <div className="space-y-2">
                    <div>
                      <div className="w-full text-xs p-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-[#111827] font-medium">
                        Staff Software Engineer
                      </div>
                    </div>
                    <div>
                      <div className="w-full text-xs p-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-[#111827] font-medium">
                        Linear Dynamics
                      </div>
                    </div>
                    <div className="p-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-[11px] text-[#4B5563] leading-relaxed">
                      • Architected real-time collaboration canvas supporting 50k+ daily concurrent users...
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Live Resume Sheet Simulation */}
              <div
                className={`w-full md:w-[58%] p-4 sm:p-6 flex items-center justify-center bg-[#F1F5F9] overflow-hidden ${
                  mockupActiveTab === 'editor' ? 'hidden md:flex' : 'flex'
                }`}
              >
                <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] aspect-[1/1.32] rounded-lg border border-[#CBD5E1] shadow-md bg-white overflow-hidden">
                  <ScaledResumePreview data={minimalData} pageWidth={816} className="w-full h-full" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. TEMPLATES SHOWCASE */}
      <section id="templates" className="py-14 sm:py-20 md:py-28 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#111827] mb-2 sm:mb-3">
              Templates for every kind of career.
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] max-w-xl">
              Choose a professionally designed layout and make it your own. Switch anytime without losing data.
            </p>
          </div>

          <button
            onClick={() => onStartBuilder('minimal')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#111827] hover:text-black underline underline-offset-4 cursor-pointer self-start md:self-auto"
          >
            <span>Start with Default (Minimal)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Responsive Grid: 1 col (Mobile) -> 2 cols (Tablet) -> 3 cols (Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMPLATE_LIST.map((tpl) => {
            const cardData: PortfolioData = { ...sampleData, templateId: tpl.id };

            return (
              <div
                key={tpl.id}
                className="group bg-white rounded-xl border border-[#E5E7EB] hover:border-[#94A3B8] shadow-2xs hover:shadow-md transition-all duration-150 overflow-hidden flex flex-col hover:-translate-y-1"
              >
                {/* Thumbnail Frame */}
                <div className="w-full h-56 sm:h-60 md:h-64 bg-[#F8FAFC] border-b border-[#E5E7EB] flex items-center justify-center p-3 relative overflow-hidden">

                  {/* Scaled Page Container */}
                  <div className="w-full h-full rounded border border-[#E2E8F0] shadow-2xs overflow-hidden flex items-start justify-center bg-white">
                    <ScaledResumePreview data={cardData} pageWidth={816} className="w-full h-full" />
                  </div>
                </div>

                {/* Card Info Footer */}
                <div className="p-4 flex flex-col justify-between flex-1 space-y-3 bg-white">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#111827]">{tpl.name}</h3>
                      <span className="text-[10px] font-semibold text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-full">
                        {tpl.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7280] mt-1 line-clamp-1">{tpl.description}</p>
                  </div>

                  <button
                    onClick={() => onStartBuilder(tpl.id)}
                    className="w-full py-2.5 px-3 rounded-md bg-[#F3F4F6] group-hover:bg-[#111111] text-[#111827] group-hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
                  >
                    <span>Use Template</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. BENEFITS SECTION: Restrained 3-Card Layout */}
      <section id="features" className="py-14 sm:py-20 md:py-28 px-4 sm:px-6 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#111827] mb-2 sm:mb-3">
              Crafted for clarity and ease.
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563]">
              Every tool and template is built to save time while elevating your application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {/* Benefit Card 1 - Instant Creator */}
            <div className="p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] bg-white flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all duration-200">
              <div className="w-[300px] h-[300px] flex items-center justify-center overflow-hidden mb-4 bg-[#F9FAFB] rounded-xl border border-[#F3F4F6]">
                {/* @ts-ignore */}
                <dotlottie-wc src="https://lottie.host/3ca04852-0975-40cb-a93d-a0137ad9e148/7v6IF1qXi5.lottie" style={{ width: '300px', height: '300px' }} autoplay loop></dotlottie-wc>
              </div>
              <div className="w-full">
                <h3 className="text-lg font-bold text-[#111827] mb-2">Professional Editorial Layouts</h3>
                <p className="text-sm text-[#5B6472] leading-relaxed">
                  Design beautiful, clean resumes automatically pre-configured to meet modern visual standards.
                </p>
              </div>
            </div>

            {/* Benefit Card 2 - ATS Diagnostic */}
            <div className="p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] bg-white flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all duration-200">
              <div className="w-[300px] h-[300px] flex items-center justify-center overflow-hidden mb-4 bg-[#F9FAFB] rounded-xl border border-[#F3F4F6]">
                {/* @ts-ignore */}
                <dotlottie-wc src="https://lottie.host/90b8f637-0021-46aa-882c-661c6299ea46/reLdmA02iY.lottie" style={{ width: '300px', height: '300px' }} autoplay loop></dotlottie-wc>
              </div>
              <div className="w-full">
                <h3 className="text-lg font-bold text-[#111827] mb-2">Real-time Scanner & Analysis</h3>
                <p className="text-sm text-[#5B6472] leading-relaxed">
                  Analyze your resume scores, scan keywords, and optimize formatting against custom job requirements.
                </p>
              </div>
            </div>

            {/* Benefit Card 3 - Seamless PDF Output */}
            <div className="p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] bg-white flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all duration-200">
              <div className="w-[300px] h-[300px] flex items-center justify-center overflow-hidden mb-4 bg-[#F9FAFB] rounded-xl border border-[#F3F4F6]">
                {/* @ts-ignore */}
                <dotlottie-wc src="https://lottie.host/acadc4e0-a2ac-4929-8d36-23f5f70555fd/n4X7vhkYKN.lottie" style={{ width: '300px', height: '300px' }} autoplay loop></dotlottie-wc>
              </div>
              <div className="w-full">
                <h3 className="text-lg font-bold text-[#111827] mb-2">High-Resolution Vector Export</h3>
                <p className="text-sm text-[#5B6472] leading-relaxed">
                  Export complete, standardized, and perfectly compliant vector PDFs ready for application portals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ATS COMPLIANCE SECTION */}
      <section className="py-14 sm:py-20 md:py-28 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12">
          <div className="max-w-md text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs font-bold mb-3 sm:mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ATS-Friendly</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#111827] mb-3 sm:mb-4">
              Designed for people and systems.
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              Clear hierarchy and structured semantic layouts keep your experience easy to read without
              unnecessary decoration or parser-breaking formatting.
            </p>
          </div>

          {/* ATS Template Miniatures */}
          <div className="flex items-center justify-center gap-4 w-full md:w-auto">
            <div className="w-[160px] sm:w-[200px] md:w-[220px] aspect-[1/1.32] rounded-lg border border-[#CBD5E1] shadow-md bg-white overflow-hidden">
              <ScaledResumePreview data={{ ...sampleData, templateId: 'executive' }} pageWidth={816} className="w-full h-full" />
            </div>
            <div className="w-[160px] sm:w-[200px] md:w-[220px] aspect-[1/1.32] rounded-lg border border-[#CBD5E1] shadow-md bg-white overflow-hidden">
              <ScaledResumePreview data={{ ...sampleData, templateId: 'minimal' }} pageWidth={816} className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. LARGE WARM CTA CARD */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="bg-[#F5EBE1] border border-[#E8DCCF] rounded-2xl p-6 sm:p-10 md:p-16 flex flex-col items-center text-center shadow-sm">
          
          {/* Lottie Animation 1 */}
          <div className="w-[180px] h-[180px] flex items-center justify-center -mt-4 mb-2">
            {/* @ts-ignore */}
            <dotlottie-wc
              src="https://lottie.host/b4b07c81-fde7-4633-b494-f68345f9825c/jNZkHulCOq.lottie"
              style={{ width: '180px', height: '180px' }}
              autoplay
              loop
            ></dotlottie-wc>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl font-normal tracking-tight text-[#111827] max-w-xl mb-3 sm:mb-4 leading-tight">
            Build a resume you're proud to send.
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#4B5563] max-w-lg mb-6 sm:mb-8 leading-relaxed">
            Join thousands of professionals who have elevated their career presentation with our editorial design tools.
          </p>

          <button
            onClick={() => onStartBuilder('minimal')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-[7px] bg-[#111111] text-white text-sm font-semibold hover:bg-black hover:-translate-y-px transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#111111] focus:ring-offset-2 min-h-[44px]"
          >
            <span>Create My Resume</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
