import React, { useRef, useState, useEffect } from 'react';
import { PortfolioData } from '../types';
import BasicInfoEditor from './builder/editors/BasicInfoEditor';
import ExperienceEditor from './builder/editors/ExperienceEditor';
import EducationEditor from './builder/editors/EducationEditor';
import ProjectsEditor from './builder/editors/ProjectsEditor';
import SkillsEditor from './builder/editors/SkillsEditor';
import AdditionalSectionsEditor from './builder/editors/AdditionalSectionsEditor';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  FolderGit2, 
  Wrench, 
  Layers, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';

export type TabType = 
  | 'overview'
  | 'basic' 
  | 'experience' 
  | 'education' 
  | 'projects' 
  | 'skills' 
  | 'customSections' 
  | 'customization';

interface FormBuilderProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
  activeTab: TabType;
  onTabChange: (tabId: TabType) => void;
  onNextAtEnd?: () => void;
  onBackAtStart?: () => void;
}

const SECTION_SEQUENCE: TabType[] = [
  'basic',
  'experience',
  'education',
  'projects',
  'skills',
  'customSections',
];

const NAVIGATION_ITEMS: Array<{ id: TabType; label: string; icon: any }> = [
  { id: 'basic', label: 'Contact & Bio', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'customSections', label: 'Additional', icon: Layers },
];

export default function FormBuilder({
  data,
  onChange,
  activeTab,
  onTabChange,
  onNextAtEnd,
  onBackAtStart,
}: FormBuilderProps) {
  const currentTab = activeTab === 'overview' ? 'basic' : activeTab;
  const currentIdx = SECTION_SEQUENCE.indexOf(currentTab);
  
  const navContainerRef = useRef<HTMLElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (navContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navContainerRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleNext = () => {
    if (currentIdx < SECTION_SEQUENCE.length - 1) {
      onTabChange(SECTION_SEQUENCE[currentIdx + 1]);
    } else if (onNextAtEnd) {
      onNextAtEnd();
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      onTabChange(SECTION_SEQUENCE[currentIdx - 1]);
    } else if (onBackAtStart) {
      onBackAtStart();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative overflow-hidden">
      {/* 1. Horizontal Section Pills Bar with smooth fade affordance */}
      <div className="relative shrink-0 border-b border-gray-200 bg-[#FAFAFA]">
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
        )}
        
        <nav
          ref={navContainerRef}
          onScroll={checkScroll}
          aria-label="Resume sections"
          className="px-3 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none"
        >
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#111827] text-white shadow-xs'
                    : 'bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-200/70'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
        )}
      </div>

      {/* 2. Active Section Editor View - Independently scrollable */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-white min-h-0">
        {currentTab === 'basic' && <BasicInfoEditor data={data} onChange={onChange} />}
        {currentTab === 'experience' && <ExperienceEditor data={data} onChange={onChange} />}
        {currentTab === 'education' && <EducationEditor data={data} onChange={onChange} />}
        {currentTab === 'projects' && <ProjectsEditor data={data} onChange={onChange} />}
        {currentTab === 'skills' && <SkillsEditor data={data} onChange={onChange} />}
        {currentTab === 'customSections' && <AdditionalSectionsEditor data={data} onChange={onChange} />}
      </div>

      {/* 3. Bottom Sticky Step Controls */}
      <div className="p-3.5 border-t border-gray-200 bg-[#FAFAFA] flex items-center justify-between shrink-0 shadow-[0_-2px_6px_rgba(0,0,0,0.02)]">
        <button
          type="button"
          onClick={handleBack}
          className="px-3 py-1.5 text-xs font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{currentIdx === 0 ? 'Home' : 'Previous'}</span>
        </button>

        <span className="text-[11px] font-semibold text-gray-400">
          Step {Math.max(1, currentIdx + 1)} of {SECTION_SEQUENCE.length}
        </span>

        <button
          type="button"
          onClick={handleNext}
          className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#111827] hover:bg-black rounded-lg flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
        >
          <span>{currentIdx === SECTION_SEQUENCE.length - 1 ? 'Preview' : 'Next'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
