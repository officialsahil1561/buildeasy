import React, { useState } from 'react';
import { PortfolioData, TemplateId, INITIAL_PORTFOLIO_DATA } from '../../types';
import { TEMPLATE_LIST } from '../ChangeTemplateModal';
import ScaledResumePreview from '../common/ScaledResumePreview';
import Footer from '../common/Footer';
import LottieAnimation from '../common/LottieAnimation';
import { 
  ArrowRight, 
  Layers, 
  Eye, 
  Download, 
  User, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck,
  FileText,
  Upload
} from 'lucide-react';

interface ScreenHomeProps {
  onStartBuilder: (templateId?: TemplateId) => void;
  hasResumeData?: boolean;
}

export default function ScreenHome({ onStartBuilder, hasResumeData }: ScreenHomeProps) {
  const sampleData = INITIAL_PORTFOLIO_DATA;

  return (
    <div className="w-full bg-[#F7F8F9] flex flex-col items-center">
      
      {/* 1. Hero Section */}
      <section className="w-full max-w-[1440px] px-6 py-24 md:py-32 flex flex-col items-center text-center">
        <h1 className="font-serif text-5xl md:text-7xl text-[#111827] mb-6 tracking-tight leading-[1.1] max-w-4xl">
          Your experience.<br />Beautifully presented.
        </h1>
        <p className="text-lg md:text-xl text-[#4B5563] mb-10 leading-relaxed max-w-2xl">
          Craft a resume that reflects your professional caliber. High-end editorial design meets intuitive building, ensuring your career history stands out with clarity and confidence.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
          <button
            onClick={() => onStartBuilder('minimal')}
            className="h-12 px-8 rounded-lg bg-[#111111] text-white font-semibold hover:bg-[#222222] transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <span>{hasResumeData ? 'Go to Builder' : 'Create My Resume'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#templates"
            className="h-12 px-8 rounded-lg bg-white border border-[#E5E7EB] text-[#111827] font-semibold hover:bg-[#F9FAFB] transition-colors flex items-center justify-center w-full sm:w-auto"
          >
            Explore Templates
          </a>
        </div>
        
        {/* Hero Image (Cascading resumes) */}
        <div className="relative w-full max-w-4xl h-[400px] md:h-[600px] flex justify-center items-start mt-8 pointer-events-none">
            <div className="absolute top-10 -left-10 md:left-10 w-[300px] md:w-[400px] transform -rotate-6 opacity-60 shadow-xl rounded-lg overflow-hidden border border-gray-200">
              <ScaledResumePreview data={{...sampleData, templateId: 'modern'}} pageWidth={816} className="w-full bg-white" />
            </div>
            <div className="absolute top-10 -right-10 md:right-10 w-[300px] md:w-[400px] transform rotate-6 opacity-60 shadow-xl rounded-lg overflow-hidden border border-gray-200">
              <ScaledResumePreview data={{...sampleData, templateId: 'executive'}} pageWidth={816} className="w-full bg-white" />
            </div>
            <div className="absolute top-0 z-10 w-[320px] md:w-[450px] shadow-2xl rounded-lg overflow-hidden border border-gray-200">
              <ScaledResumePreview data={{...sampleData, templateId: 'minimal'}} pageWidth={816} className="w-full bg-white" />
            </div>
        </div>
      </section>

      {/* 2. How it works */}
      <section id="how-it-works" className="w-full bg-white py-24 px-6 border-t border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16">
            <p className="text-sm font-bold tracking-widest text-[#6B7280] uppercase mb-3">How BuildEasy Works</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#111827] mb-4">How it works</h2>
            <p className="text-lg text-[#4B5563] max-w-lg mx-auto">
              Build a polished, professional resume in minutes — without starting from a blank page.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full items-center">
            {/* Step 1 */}
            <div className="order-2 md:order-1 flex flex-col justify-center max-w-md mx-auto md:mx-0">
               <div className="flex items-center gap-3 mb-4">
                 <span className="text-xs font-bold px-2 py-1 bg-[#F3F4F6] rounded-full text-[#4B5563]">01</span>
                 <span className="text-sm font-bold tracking-widest text-[#6B7280] uppercase">Start Here</span>
               </div>
               <h3 className="font-serif text-3xl text-[#111827] mb-4">Choose your template</h3>
               <p className="text-[#4B5563] leading-relaxed">
                 Start with a professionally designed resume template built for clarity, readability, and ATS compatibility.
               </p>
            </div>
            <div className="order-1 md:order-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-8 flex justify-center items-center">
               <div className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-4 flex flex-col gap-3">
                 <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]">
                   <span className="font-semibold text-sm">Select Template Style</span>
                   <span className="text-xs text-blue-600">6 curated layouts</span>
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                   <div className="border-2 border-blue-600 rounded-lg p-3 bg-blue-50/30">
                     <div className="flex justify-between mb-2"><span className="font-semibold text-sm">Minimal</span><span className="text-blue-600">✓</span></div>
                     <div className="w-full h-1 bg-gray-200 rounded mb-1"></div>
                     <div className="w-2/3 h-1 bg-gray-200 rounded"></div>
                   </div>
                   <div className="border border-[#E5E7EB] rounded-lg p-3">
                     <div className="mb-2"><span className="font-semibold text-sm">Executive</span></div>
                     <div className="w-full h-1 bg-gray-200 rounded mb-1"></div>
                     <div className="w-3/4 h-1 bg-gray-200 rounded"></div>
                   </div>
                   <div className="border border-[#E5E7EB] rounded-lg p-3">
                     <div className="mb-2"><span className="font-semibold text-sm">Modern</span></div>
                     <div className="w-full h-1 bg-gray-200 rounded mb-1"></div>
                     <div className="w-1/2 h-1 bg-gray-200 rounded"></div>
                   </div>
                   <div className="border border-[#E5E7EB] rounded-lg p-3">
                     <div className="mb-2"><span className="font-semibold text-sm">Academic</span></div>
                     <div className="w-full h-1 bg-gray-200 rounded mb-1"></div>
                     <div className="w-full h-1 bg-gray-200 rounded"></div>
                   </div>
                 </div>
               </div>
            </div>

            {/* Step 2 */}
            <div className="order-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-8 flex justify-center items-center">
              <div className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]">
                  <span className="font-semibold text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> Experience & Details</span>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">Saved</span>
                </div>
                <div className="border border-[#E5E7EB] rounded-lg p-3">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-sm">Staff Software Engineer</span>
                    <span className="text-xs text-gray-500">2022 — Present</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">Architected real-time collaboration canvas supporting 50k+ active users...</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">5 sections organized</span>
                  <span className="text-xs font-bold text-green-600">ATS-Ready</span>
                </div>
              </div>
            </div>
            <div className="order-4 flex flex-col justify-center max-w-md mx-auto md:mx-0">
               <div className="flex items-center gap-3 mb-4">
                 <span className="text-xs font-bold px-2 py-1 bg-[#F3F4F6] rounded-full text-[#4B5563]">02</span>
                 <span className="text-sm font-bold tracking-widest text-[#6B7280] uppercase">Build Your Profile</span>
               </div>
               <h3 className="font-serif text-3xl text-[#111827] mb-4">Add your information</h3>
               <p className="text-[#4B5563] leading-relaxed">
                 Add your experience, education, skills, projects, and links once. BuildEasy keeps everything organized.
               </p>
            </div>

            {/* Step 3 */}
            <div className="order-6 md:order-5 flex flex-col justify-center max-w-md mx-auto md:mx-0">
               <div className="flex items-center gap-3 mb-4">
                 <span className="text-xs font-bold px-2 py-1 bg-[#F3F4F6] rounded-full text-[#4B5563]">03</span>
                 <span className="text-sm font-bold tracking-widest text-[#6B7280] uppercase">Make It Yours</span>
               </div>
               <h3 className="font-serif text-3xl text-[#111827] mb-4">Make it yours</h3>
               <p className="text-[#4B5563] leading-relaxed">
                 Adjust the layout, typography, sections, and details while seeing every change instantly.
               </p>
            </div>
            <div className="order-5 md:order-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-8 flex justify-center items-center">
              <div className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-4 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm">Typography & Spacing Controls</span>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">EDIT → PREVIEW</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-[#E5E7EB] rounded-lg p-3 bg-gray-50">
                    <div className="text-xs text-gray-500 mb-1">Font Family</div>
                    <div className="font-semibold text-sm">Inter / Serif</div>
                  </div>
                  <div className="border border-[#E5E7EB] rounded-lg p-3 bg-gray-50">
                    <div className="text-xs text-gray-500 mb-1">Section Spacing</div>
                    <div className="font-semibold text-sm">Balanced (1.2x)</div>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 text-green-700 text-xs font-semibold rounded-lg p-3 text-center">
                  Instant Live Preview Updating
                </div>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="order-7 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-8 flex justify-center items-center">
              <div className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-4 flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-3">
                  <span className="font-semibold text-sm">Export Package</span>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">PDF Ready</span>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">ATS-Friendly</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-[#E5E7EB]">
                  <div className="w-8 h-8 bg-white border border-[#E5E7EB] rounded flex items-center justify-center text-gray-700 font-bold text-xs">PDF</div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">My_Resume.pdf</div>
                    <div className="text-[10px] text-gray-500">Clean layout • Working hyperlinks • 1 page</div>
                  </div>
                  <div className="text-blue-600 bg-blue-50 p-1 rounded-full"><ShieldCheck className="w-3 h-3" /></div>
                </div>
                <button className="w-full bg-[#111111] text-white rounded-lg py-3 text-sm font-semibold flex items-center justify-center gap-2">
                  Download Resume <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="order-8 flex flex-col justify-center max-w-md mx-auto md:mx-0">
               <div className="flex items-center gap-3 mb-4">
                 <span className="text-xs font-bold px-2 py-1 bg-[#F3F4F6] rounded-full text-[#4B5563]">04</span>
                 <span className="text-sm font-bold tracking-widest text-[#6B7280] uppercase">Ready To Go</span>
               </div>
               <h3 className="font-serif text-3xl text-[#111827] mb-4">Download & apply</h3>
               <p className="text-[#4B5563] leading-relaxed">
                 Export a polished, ATS-friendly PDF with working links and clean formatting, ready to send to employers.
               </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* 3. Meet BuildEasy */}
      <section className="w-full bg-[#F7F8F9] py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#111827] mb-6">Meet BuildEasy</h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
              A refined builder interface designed to feel more like a boutique publishing tool than a standard application. Focus on your content; we handle the precision.
            </p>
          </div>
          <div className="w-full rounded-2xl border border-[#E5E7EB] bg-white shadow-xl overflow-hidden flex flex-col">
            <div className="h-12 bg-[#F3F4F6] border-b border-[#E5E7EB] flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              </div>
              <div className="mx-auto bg-white rounded text-[10px] text-gray-500 px-24 py-1.5 border border-[#E5E7EB]">buildeasy.app/builder</div>
            </div>
            <div className="flex flex-col md:flex-row h-[500px]">
              <div className="w-full md:w-1/3 border-r border-[#E5E7EB] bg-white p-6 overflow-y-auto">
                <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-4">Content Sections</div>
                <div className="flex flex-col gap-2 mb-8">
                  <div className="border border-[#E5E7EB] rounded-lg p-3 bg-gray-50 flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2 font-medium"><User className="w-4 h-4 text-gray-500" /> Personal Info</span>
                    <span className="text-gray-400 text-xs">✓</span>
                  </div>
                  <div className="border border-[#111111] rounded-lg p-3 bg-[#111111] text-white flex justify-between items-center text-sm shadow-sm">
                    <span className="flex items-center gap-2 font-medium"><Briefcase className="w-4 h-4 text-white" /> Experience</span>
                    <span className="text-[10px] bg-white text-black font-bold px-1.5 py-0.5 rounded">Active</span>
                  </div>
                  <div className="border border-[#E5E7EB] rounded-lg p-3 bg-white flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2 font-medium"><GraduationCap className="w-4 h-4 text-gray-500" /> Education</span>
                  </div>
                </div>
                
                <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-4">Experience Editor</div>
                <div className="border border-[#E5E7EB] rounded-lg bg-white overflow-hidden text-sm">
                  <div className="p-3 border-b border-[#E5E7EB] font-semibold bg-gray-50">Staff Software Engineer</div>
                  <div className="p-3 border-b border-[#E5E7EB] text-gray-600">Linear Dynamics</div>
                  <div className="p-4 text-gray-500 text-xs leading-relaxed bg-gray-50/50">
                    • Architected real-time collaboration canvas supporting 50k+ daily concurrent users...
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3 bg-[#F9FAFB] p-8 flex justify-center items-start overflow-hidden">
                <div className="w-[85%] shadow-lg border border-[#E5E7EB] rounded-sm pointer-events-none bg-white">
                   <ScaledResumePreview data={{...sampleData, templateId: 'minimal'}} pageWidth={816} className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Templates */}
      <section id="templates" className="w-full bg-white py-24 px-6 border-t border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="flex flex-col md:flex-row justify-between items-end w-full mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl md:text-5xl text-[#111827] mb-4">Templates for every kind of career.</h2>
              <p className="text-lg text-[#4B5563]">
                Choose a professionally designed layout and make it your own. Switch anytime without losing data.
              </p>
            </div>
            <button 
              onClick={() => onStartBuilder('minimal')}
              className="text-[#111827] font-semibold border-b border-[#111827] pb-1 hover:text-[#4B5563] hover:border-[#4B5563] transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              Start with Default (Minimal) <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEMPLATE_LIST.map((tpl) => (
              <div key={tpl.id} className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:border-[#111111] hover:shadow-lg transition-all flex flex-col group cursor-pointer" onClick={() => onStartBuilder(tpl.id)}>
                <div className="bg-[#F9FAFB] p-8 flex justify-center border-b border-[#E5E7EB]">
                  <div className="w-full max-w-[220px] aspect-[1/1.414] rounded shadow-sm bg-white overflow-hidden pointer-events-none group-hover:scale-[1.02] transition-transform">
                    <ScaledResumePreview data={{...sampleData, templateId: tpl.id}} pageWidth={816} className="w-full h-full" />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-[#111827] text-lg">{tpl.name}</h3>
                      <span className="text-[10px] font-bold bg-[#F3F4F6] text-[#4B5563] px-2 py-1 rounded">{tpl.category || 'Professional'}</span>
                    </div>
                    <p className="text-sm text-[#6B7280] line-clamp-2">{tpl.description}</p>
                  </div>
                  <div className="mt-6 bg-[#F3F4F6] group-hover:bg-[#E5E7EB] text-[#111827] text-sm font-semibold py-2.5 rounded-lg flex justify-center items-center gap-2 transition-colors">
                    Use Template <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Features */}
      <section id="features" className="w-full bg-[#F7F8F9] py-24 px-6 border-t border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#111827] mb-6">Crafted for clarity and ease.</h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
              Every tool and template is built to save time while elevating your application.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 flex flex-col">
              <div className="w-12 h-12 bg-[#F3F4F6] rounded-xl flex items-center justify-center mb-6">
                <Layers className="w-5 h-5 text-[#111827]" />
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-3">Professional Editorial Layouts</h3>
              <p className="text-[#4B5563] leading-relaxed">Design beautiful, clean resumes automatically pre-configured to meet modern visual standards.</p>
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 flex flex-col">
              <div className="w-12 h-12 bg-[#F3F4F6] rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-5 h-5 text-[#111827]" />
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-3">Real-time Scanner & Analysis</h3>
              <p className="text-[#4B5563] leading-relaxed">Analyze your resume scores, scan keywords, and optimize formatting against custom job requirements.</p>
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 flex flex-col">
              <div className="w-12 h-12 bg-[#F3F4F6] rounded-xl flex items-center justify-center mb-6">
                <Download className="w-5 h-5 text-[#111827]" />
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-3">High-Resolution Vector Export</h3>
              <p className="text-[#4B5563] leading-relaxed">Export complete, standardized, and perfectly compliant vector PDFs ready for application portals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ATS Section */}
      <section className="w-full bg-white py-24 px-6 border-t border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 flex flex-col">
             <div className="flex items-center gap-2 mb-6">
               <span className="text-[11px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> ATS-Friendly</span>
             </div>
             <h2 className="font-serif text-4xl md:text-5xl text-[#111827] mb-6 leading-tight">Designed for people<br/>and systems.</h2>
             <p className="text-lg text-[#4B5563] leading-relaxed mb-6">
               Clear hierarchy and structured semantic layouts keep your experience easy to read without unnecessary decoration or parser-breaking formatting.
             </p>
             <div className="w-32 h-32 md:w-36 md:h-36 -ml-2">
               <LottieAnimation
                 src="https://lottie.host/23efb066-f5c6-45f4-99e8-50128ecb1551/nl0CjBJBE9.lottie"
                 className="w-full h-full"
               />
             </div>
          </div>
          <div className="w-full md:w-1/2 flex gap-4 justify-center items-center px-4">
             <div className="w-[45%] rounded-lg shadow-xl border border-[#E5E7EB] overflow-hidden bg-white -rotate-2 transform hover:scale-105 transition-transform duration-300">
               <ScaledResumePreview data={{...sampleData, templateId: 'classic'}} pageWidth={816} className="w-full pointer-events-none" />
             </div>
             <div className="w-[45%] rounded-lg shadow-xl border border-[#E5E7EB] overflow-hidden bg-white rotate-2 transform hover:scale-105 transition-transform duration-300 mt-12">
               <ScaledResumePreview data={{...sampleData, templateId: 'minimal'}} pageWidth={816} className="w-full pointer-events-none" />
             </div>
          </div>
        </div>
      </section>

      {/* 7. CTA Banner */}
      <section className="w-full bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto bg-[#F4EBE3] rounded-3xl p-12 md:p-20 flex flex-col items-center text-center relative overflow-hidden shadow-sm">
          {/* Lottie Animation: Smooth document builder / presentation */}
          <div className="mb-8 w-28 h-28 sm:w-32 sm:h-32 relative flex items-center justify-center">
            <LottieAnimation
              src="https://lottie.host/b4b07c81-fde7-4633-b494-f68345f9825c/jNZkHulCOq.lottie"
              className="w-full h-full"
            />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#111827] mb-6 leading-tight max-w-xl">
            Build a resume you're proud to send.
          </h2>
          <p className="text-lg text-[#111827] opacity-80 mb-10 max-w-lg mx-auto leading-relaxed">
            Join thousands of professionals who have elevated their career presentation with our editorial design tools.
          </p>
          <button
            onClick={() => onStartBuilder('minimal')}
            className="px-8 py-3.5 rounded-lg bg-[#111111] text-white font-bold hover:bg-[#222222] transition-colors flex items-center gap-3 text-[15px]"
          >
            <span>{hasResumeData ? 'Go to Builder' : 'Create My Resume'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
