import React, { useState, useMemo } from 'react';
import { TemplateId, TemplateCategory } from '../../types';
import SelectableCard from '../common/SelectableCard';
import PillButton from '../common/PillButton';
import { ArrowRight, ArrowLeft, Sparkles, Filter } from 'lucide-react';

interface ScreenTemplateSelectProps {
  selectedTemplate: TemplateId | null;
  onSelectTemplate: (templateId: TemplateId) => void;
  onContinue: () => void;
  onLoadSampleData?: () => void;
}

interface TemplateItem {
  id: TemplateId;
  title: string;
  category: 'professional' | 'modern' | 'academic' | 'compact';
  categoryLabel: string;
  badge?: string;
  description: string;
  previewElements: React.ReactNode;
}

export default function ScreenTemplateSelect({
  selectedTemplate,
  onSelectTemplate,
  onContinue,
  onLoadSampleData,
}: ScreenTemplateSelectProps) {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('all');

  const categories: { id: TemplateCategory; label: string }[] = [
    { id: 'all', label: 'All Templates' },
    { id: 'professional', label: 'Professional' },
    { id: 'modern', label: 'Modern' },
    { id: 'academic', label: 'Academic' },
    { id: 'compact', label: 'Compact' },
  ];

  const templates: TemplateItem[] = [
    {
      id: 'minimal',
      title: 'Minimal',
      category: 'professional',
      categoryLabel: 'Professional',
      badge: 'ATS FAVORITE',
      description: 'Clean, text-first layout with high readability',
      previewElements: (
        <div className="w-full h-full bg-white p-3 flex flex-col text-[6px] text-slate-800 font-sans select-none pointer-events-none">
          <div className="border-b border-slate-200 pb-1 mb-1">
            <div className="w-20 h-1.5 bg-[#0F172A] rounded mb-0.5" />
            <div className="w-12 h-1 bg-slate-400 rounded" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="w-10 h-1 bg-[#0F172A] rounded" />
            <div className="w-full h-0.5 bg-slate-400 rounded" />
            <div className="w-full h-0.5 bg-slate-300 rounded" />
            <div className="w-5/6 h-0.5 bg-slate-300 rounded" />
          </div>
        </div>
      ),
    },
    {
      id: 'executive',
      title: 'Executive',
      category: 'professional',
      categoryLabel: 'Professional',
      badge: 'LEADERSHIP',
      description: 'Corporate typography and clear experience hierarchy',
      previewElements: (
        <div className="w-full h-full bg-white p-3 flex flex-col text-[6px] text-slate-800 font-sans select-none pointer-events-none">
          <div className="text-center border-b-2 border-slate-900 pb-1 mb-1">
            <div className="w-24 h-2 bg-[#0F172A] mx-auto rounded mb-0.5 uppercase" />
            <div className="w-16 h-1 bg-slate-400 mx-auto rounded" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="w-12 h-1 bg-[#0F172A] uppercase rounded" />
            <div className="w-full h-0.5 bg-slate-400 rounded" />
            <div className="w-4/5 h-0.5 bg-slate-300 rounded" />
            <div className="w-10 h-1 bg-[#0F172A] uppercase rounded pt-1" />
            <div className="w-full h-0.5 bg-slate-400 rounded" />
          </div>
        </div>
      ),
    },
    {
      id: 'modern',
      title: 'Modern',
      category: 'modern',
      categoryLabel: 'Modern',
      badge: 'CONTEMPORARY',
      description: 'Subtle accents and modern typography',
      previewElements: (
        <div className="w-full h-full bg-white flex flex-col text-[6px] text-slate-800 font-sans select-none pointer-events-none">
          <div className="bg-[#0F172A] p-2 text-white flex justify-between items-end">
             <div className="w-20 h-1.5 bg-white rounded mb-0.5" />
             <div className="w-10 h-1 bg-slate-400 rounded" />
          </div>
          <div className="p-2 space-y-1 flex-1">
            <div className="w-10 h-1 bg-[#0F172A] uppercase rounded" />
            <div className="w-full h-0.5 bg-slate-400 rounded" />
            <div className="w-full h-0.5 bg-slate-300 rounded" />
          </div>
        </div>
      ),
    },
    {
      id: 'academic',
      title: 'Academic',
      category: 'academic',
      categoryLabel: 'Academic',
      badge: 'EDUCATION 1ST',
      description: 'Education-forward CV ordering, dense research layout',
      previewElements: (
        <div className="w-full h-full bg-white p-3 flex flex-col justify-between text-[6px] text-slate-800 font-sans select-none pointer-events-none">
          <div className="text-center border-b-2 border-slate-900 pb-1 mb-1">
            <div className="w-24 h-1.5 bg-[#0F172A] mx-auto rounded mb-0.5 uppercase" />
            <div className="w-28 h-0.5 bg-slate-400 mx-auto rounded" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="w-10 h-1 bg-[#0F172A] uppercase rounded" />
            <div className="w-full h-0.5 bg-slate-400 rounded" />
            <div className="w-4/5 h-0.5 bg-slate-300 rounded" />
            <div className="w-12 h-1 bg-[#0F172A] uppercase rounded pt-1" />
            <div className="w-full h-0.5 bg-slate-400 rounded" />
            <div className="w-5/6 h-0.5 bg-slate-300 rounded" />
          </div>
        </div>
      ),
    },
    {
      id: 'classic',
      title: 'Classic',
      category: 'professional',
      categoryLabel: 'Professional',
      badge: 'TRADITIONAL',
      description: 'Traditional resume with strong horizontal rules',
      previewElements: (
        <div className="w-full h-full bg-white p-3 flex flex-col justify-between text-[6px] text-slate-800 font-sans select-none pointer-events-none">
          <div className="text-center mb-1">
            <div className="w-20 h-1.5 bg-black mx-auto rounded mb-0.5 uppercase font-bold" />
            <div className="w-28 h-0.5 bg-slate-600 mx-auto rounded" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="w-12 h-1 bg-black font-bold uppercase rounded" />
            <div className="w-full h-0.5 bg-slate-600 rounded" />
            <div className="w-5/6 h-0.5 bg-slate-500 rounded" />
            <div className="w-10 h-1 bg-black font-bold uppercase rounded pt-1" />
            <div className="w-full h-0.5 bg-slate-600 rounded" />
          </div>
        </div>
      ),
    },
    {
      id: 'compact',
      title: 'Compact',
      category: 'compact',
      categoryLabel: 'Compact',
      badge: 'DENSE 1-PAGE',
      description: 'Tight spacing, reduced gaps, maximum content per page',
      previewElements: (
        <div className="w-full h-full bg-white p-2.5 flex flex-col justify-between text-[6px] text-slate-800 font-sans select-none pointer-events-none">
          <div className="border-b border-slate-300 pb-0.5 mb-1 flex justify-between items-center">
            <div className="w-14 h-1.5 bg-[#0F172A] rounded" />
            <div className="w-10 h-0.5 bg-slate-400 rounded" />
          </div>
          <div className="grid grid-cols-12 gap-1 flex-1">
            <div className="col-span-8 space-y-1">
              <div className="w-8 h-0.5 bg-[#0F172A] rounded" />
              <div className="w-full h-0.5 bg-slate-400 rounded" />
              <div className="w-full h-0.5 bg-slate-300 rounded" />
              <div className="w-4/5 h-0.5 bg-slate-300 rounded" />
            </div>
            <div className="col-span-4 border-l border-slate-200 pl-1 space-y-1">
              <div className="w-6 h-0.5 bg-[#0F172A] rounded" />
              <div className="w-full h-0.5 bg-slate-300 rounded" />
              <div className="w-full h-0.5 bg-slate-300 rounded" />
            </div>
          </div>
        </div>
      ),
    }
  ];

  const filteredTemplates = useMemo(() => {
    if (selectedCategory === 'all') return templates;
    return templates.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="flex-1 overflow-y-auto bg-[#F5F7FA] px-4 py-8 md:py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Title and Intro with delightful Lottie Illustration */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-3 flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#475569] uppercase tracking-wider bg-[#F1F5F9] px-2.5 py-1 rounded-full border border-[#E2E8F0]">
              <Sparkles className="w-3.5 h-3.5 text-[#0F172A]" />
              <span>Step 1: Choose Your Architecture</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              Select a Resume Template
            </h1>
            <p className="text-sm text-[#4B5563] max-w-2xl leading-relaxed">
              All layouts are 100% deterministic, ATS-compatible, and consume the exact same structured profile. You can switch styles at any time without losing any input data!
            </p>
          </div>
          <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] shrink-0 bg-[#F8FAFC] rounded-2xl border border-[#F1F5F9] flex items-center justify-center p-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
            {/* @ts-ignore */}
            <dotlottie-wc
              src="https://lottie.host/3ca04852-0975-40cb-a93d-a0137ad9e148/7v6IF1qXi5.lottie"
              style={{ width: '200px', height: '200px', zIndex: 10 }}
              autoplay
              loop
            ></dotlottie-wc>
          </div>
        </div>

        {/* Category Filter Tabs (Pill-style row) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-1 no-scrollbar select-none border-b border-[#E5E7EB]">
          <div className="flex items-center gap-1 text-xs font-bold text-[#6B7280] mr-2 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = cat.id === 'all' 
              ? templates.length 
              : templates.filter(t => t.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full shrink-0 transition-all border ${
                  isActive
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-2xs'
                    : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F9FAFB] hover:text-[#111827]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#F3F4F6] text-[#6B7280]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Responsive Grid: 1 col (mobile), 2 cols (tablet), 3-4 cols (desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {filteredTemplates.map((tpl) => (
            <SelectableCard
              key={tpl.id}
              id={`template-card-${tpl.id}`}
              selected={selectedTemplate === tpl.id}
              onSelect={() => onSelectTemplate(tpl.id)}
              title={tpl.title}
              badge={tpl.badge}
              description={tpl.description}
              previewElements={tpl.previewElements}
            />
          ))}
        </div>

        {/* Bottom Actions Bar */}
        <div className="pt-4 border-t border-[#E5E7EB] flex flex-col sm:flex-row justify-between items-center gap-3">
          <PillButton
            variant="secondary"
            disabled={true}
            iconLeft={<ArrowLeft className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Back
          </PillButton>

          {onLoadSampleData && (
            <button
              type="button"
              onClick={onLoadSampleData}
              className="text-xs font-semibold text-[#6B7280] hover:text-[#111827] hover:underline"
            >
              Load Sample Profile
            </button>
          )}

          <PillButton
            variant="primary"
            disabled={!selectedTemplate}
            onClick={onContinue}
            iconRight={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Start Building
          </PillButton>
        </div>

      </div>
    </div>
  );
}
