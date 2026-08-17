import React, { useState } from 'react';
import { PortfolioData, INITIAL_PORTFOLIO_DATA } from '../types';
import { ChevronRight, Settings, Layout, Link2, Briefcase, GraduationCap, Code, Lightbulb, Copy, Trash2, Plus, GripVertical, AlertCircle, Image as ImageIcon, Award, BookOpen, Sparkles, FileSpreadsheet } from 'lucide-react';
import { SortableList, SortableItem } from './builder/editors/SortableList';
import { validateImageFile } from '../lib/utils';
import ConfirmModal from './common/ConfirmModal';


export type TabType = 
  | 'overview' 
  | 'basic' 
  | 'links' 
  | 'experience' 
  | 'education' 
  | 'projects' 
  | 'skills' 
  | 'certifications' 
  | 'achievements' 
  | 'publications' 
  | 'custom'
  | 'customization';

interface FormBuilderProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
  activeTab: TabType;
  onTabChange: (tabId: TabType) => void;
  onNextAtEnd: () => void;
  onBackAtStart: () => void;
}

export default function FormBuilder({
  data,
  onChange,
  activeTab,
  onTabChange,
}: FormBuilderProps) {

  // For sections that support accordions
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [isSampleDataConfirmOpen, setIsSampleDataConfirmOpen] = useState(false);


  const updateField = <K extends keyof PortfolioData>(field: K, value: PortfolioData[K]) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const updateBasicInfo = (key: keyof PortfolioData['basicInfo'], value: string) => {
    updateField('basicInfo', { ...data.basicInfo, [key]: value });
  };

  // Completion helpers
  const getCompletion = () => {
    return {
      basic: data.basicInfo.name && data.basicInfo.email,
      links: data.links.length > 0,
      experience: data.experience.length,
      education: data.education.length,
      projects: data.projects.length,
      skills: data.skills.length > 0,
    };
  };
  const comp = getCompletion();

  // OVERVIEW LIST
  if (activeTab === 'overview' || activeTab as string === 'summary') { // Fallback handling
    return (
      <div className="flex flex-col h-full bg-[#FAFAFA]">
        <div className="p-4 md:p-6 border-b border-[#E5E7EB] bg-white shrink-0">
          <div className="flex flex-col gap-1.5 mb-3">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">Resume Document Name</label>
            <input
              type="text"
              value={data.resumeName || ''}
              onChange={(e) => updateField('resumeName', e.target.value)}
              placeholder="e.g. Software Engineer Resume"
              className="w-full px-3 py-1.5 text-xs bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] font-bold text-[#111827]"
              title="Give your resume document a name (e.g. Senior Software Engineer Resume) to set the exported PDF filename."
            />
          </div>
          <div className="h-px bg-[#E5E7EB] mb-3" />
          <div className="flex items-center justify-between mt-1">
            <div>
              <h2 className="text-sm font-bold text-[#111827]">Resume Sections</h2>
              <p className="text-xs text-[#6B7280] mt-0.5">Select a section to edit your content.</p>
            </div>
            <button
              onClick={() => setIsSampleDataConfirmOpen(true)}
              className="px-2.5 py-1 text-[11px] font-bold text-[#2563EB] bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] rounded-md flex items-center gap-1 transition-colors cursor-pointer"
              title="Fill fields with realistic example resume content"
            >
              <FileSpreadsheet className="w-3 h-3" />
              <span>Load Sample Data</span>
            </button>
          </div>
        </div>

        <ConfirmModal
          isOpen={isSampleDataConfirmOpen}
          onClose={() => setIsSampleDataConfirmOpen(false)}
          onConfirm={() => {
            onChange({
              ...INITIAL_PORTFOLIO_DATA,
              templateId: data.templateId || 'minimal',
              customization: data.customization || INITIAL_PORTFOLIO_DATA.customization,
            });
          }}
          title="Load sample resume data?"
          message="This will replace your current resume information with sample content. You can edit or clear it anytime."
          confirmText="Load Sample Data"
          cancelText="Cancel"
          variant="primary"
        />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-2">
          {/* Static sections */}
          <SectionNavItem icon={<Layout />} title="Personal Information" status={comp.basic ? '✓' : 'Missing info'} onClick={() => onTabChange('basic')} />
          <SectionNavItem icon={<Link2 />} title="Social Links" status={comp.links ? `${data.links.length} links` : 'Optional'} onClick={() => onTabChange('links')} />
          
          <div className="h-px bg-[#E5E7EB] my-4" />
          
          {/* Reorderable sections */}
          <SortableList items={data.customization?.sectionOrder || []} onReorder={(newOrder) => updateField('customization', { ...data.customization!, sectionOrder: newOrder})}>
            {(data.customization?.sectionOrder || []).map((sectionId) => {
              if (sectionId === 'summary') return null; // We put summary in basic info mostly, or we could add a tab
              if (sectionId === 'experience') return <SortableItem key={sectionId} id={sectionId} dragHandle><SectionNavItem icon={<Briefcase />} title="Experience" status={comp.experience ? `${comp.experience} entries` : 'Optional'} onClick={() => onTabChange('experience')} dragMode /></SortableItem>;
              if (sectionId === 'education') return <SortableItem key={sectionId} id={sectionId} dragHandle><SectionNavItem icon={<GraduationCap />} title="Education" status={comp.education ? `${comp.education} entries` : 'Optional'} onClick={() => onTabChange('education')} dragMode /></SortableItem>;
              if (sectionId === 'projects') return <SortableItem key={sectionId} id={sectionId} dragHandle><SectionNavItem icon={<Code />} title="Projects" status={comp.projects ? `${comp.projects} entries` : 'Optional'} onClick={() => onTabChange('projects')} dragMode /></SortableItem>;
              if (sectionId === 'skills') return <SortableItem key={sectionId} id={sectionId} dragHandle><SectionNavItem icon={<Lightbulb />} title="Skills" status={comp.skills ? 'Added' : 'Optional'} onClick={() => onTabChange('skills')} dragMode /></SortableItem>;
              if (sectionId === 'certifications') return <SortableItem key={sectionId} id={sectionId} dragHandle><SectionNavItem icon={<Award />} title="Certifications" status={data.certifications?.length ? `${data.certifications.length} entries` : 'Optional'} onClick={() => onTabChange('certifications')} dragMode /></SortableItem>;
              if (sectionId === 'achievements' || sectionId === 'awards') return <SortableItem key={sectionId} id={sectionId} dragHandle><SectionNavItem icon={<Award />} title="Awards" status={data.achievements?.length ? `${data.achievements.length} entries` : 'Optional'} onClick={() => onTabChange('achievements')} dragMode /></SortableItem>;
              if (sectionId === 'publications') return <SortableItem key={sectionId} id={sectionId} dragHandle><SectionNavItem icon={<BookOpen />} title="Publications" status={data.publications?.length ? `${data.publications.length} entries` : 'Optional'} onClick={() => onTabChange('publications')} dragMode /></SortableItem>;
              if (sectionId === 'custom') return <SortableItem key={sectionId} id={sectionId} dragHandle><SectionNavItem icon={<Sparkles />} title="Custom Section" status={data.customSections?.length ? `${data.customSections.length} entries` : 'Optional'} onClick={() => onTabChange('custom')} dragMode /></SortableItem>;
              return null;
            })}
          </SortableList>

          <div className="pt-2 relative">
            <button 
              onClick={() => {
                const el = document.getElementById('add-section-menu');
                if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
              }}
              className="w-full py-3 px-4 border border-dashed border-[#D1D5DB] text-[#6B7280] rounded-xl text-sm font-semibold hover:bg-[#F9FAFB] hover:text-[#111827] hover:border-[#9CA3AF] transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Section
            </button>
            <div id="add-section-menu" style={{ display: 'none' }} className="absolute bottom-full left-0 mb-2 w-full bg-white border border-[#E5E7EB] rounded-xl shadow-lg p-2 z-10">
              {['Experience', 'Education', 'Projects', 'Skills', 'Certifications', 'Awards', 'Publications', 'Custom Section'].map(opt => {
                const idMap: any = {
                  'Experience': 'experience',
                  'Education': 'education',
                  'Projects': 'projects',
                  'Skills': 'skills',
                  'Certifications': 'certifications',
                  'Awards': 'achievements',
                  'Publications': 'publications',
                  'Custom Section': 'custom',
                };
                const sid = idMap[opt];
                // Only show if not already in sectionOrder
                if ((data.customization?.sectionOrder || []).includes(sid)) return null;
                return (
                  <button key={opt} onClick={() => {
                    const currentOrder = data.customization?.sectionOrder || [];
                    if (!currentOrder.includes(sid)) {
                      updateField('customization', { ...data.customization!, sectionOrder: [...currentOrder, sid] });
                    }
                    document.getElementById('add-section-menu')!.style.display = 'none';
                  }} className="w-full text-left px-3 py-2 text-sm text-[#374151] hover:bg-[#F3F4F6] rounded-md font-medium">
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="h-px bg-[#E5E7EB] my-4" />
          <SectionNavItem icon={<Settings />} title="Template & Design" status="Customization" onClick={() => onTabChange('customization')} />
        </div>
      </div>
    );
  }

  // INDIVIDUAL EDITORS
  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="h-12 border-b border-[#E5E7EB] px-4 flex items-center shrink-0 bg-[#FAFAFA]">
        <button 
          onClick={() => onTabChange('overview')}
          className="text-xs font-semibold text-[#4B5563] hover:text-[#111827] flex items-center gap-1 py-1"
        >
          <ChevronRight className="w-4 h-4 rotate-180" /> Back to Sections
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#111827]">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-[#374151]">Full Name <span className="text-rose-500">*</span></label>
                <input value={data.basicInfo.name || ''} onChange={(e) => updateBasicInfo('name', e.target.value)} placeholder="Jane Doe" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
              </div>
              
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-[#374151]">Professional Title</label>
                <input value={data.basicInfo.tagline || ''} onChange={(e) => updateBasicInfo('tagline', e.target.value)} placeholder="Senior Software Engineer" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#374151]">Email</label>
                <input type="email" value={data.basicInfo.email || ''} onChange={(e) => updateBasicInfo('email', e.target.value)} placeholder="jane@example.com" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#374151]">Phone</label>
                <input type="tel" value={data.basicInfo.phone || ''} onChange={(e) => updateBasicInfo('phone', e.target.value)} placeholder="+1 (555) 000-0000" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-[#374151]">Location</label>
                <input value={data.basicInfo.location || ''} onChange={(e) => updateBasicInfo('location', e.target.value)} placeholder="San Francisco, CA" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#374151]">Personal Website</label>
                <input value={data.basicInfo.website || ''} onChange={(e) => updateBasicInfo('website', e.target.value)} placeholder="https://example.com" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#374151]">LinkedIn URL</label>
                <input value={data.basicInfo.linkedin || ''} onChange={(e) => updateBasicInfo('linkedin', e.target.value)} placeholder="https://linkedin.com/in/username" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#374151]">GitHub URL</label>
                <input value={data.basicInfo.github || ''} onChange={(e) => updateBasicInfo('github', e.target.value)} placeholder="https://github.com/username" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#374151]">Portfolio URL</label>
                <input value={data.basicInfo.portfolio || ''} onChange={(e) => updateBasicInfo('portfolio', e.target.value)} placeholder="https://myportfolio.com" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
              </div>

              {/* Secure Profile Photo Uploader */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-[#374151] flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-gray-500" /> Profile Photo (Optional)
                </label>
                <div className="flex items-center gap-4 p-4 border border-[#E5E7EB] rounded-xl bg-gray-50">
                  {data.basicInfo.photo ? (
                    <div className="relative group shrink-0">
                      <img src={data.basicInfo.photo} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md" />
                      <button
                        type="button"
                        onClick={() => {
                          updateBasicInfo('photo', '');
                          setPhotoError(null);
                        }}
                        className="absolute -top-1 -right-1 bg-rose-600 text-white rounded-full p-1 shadow-sm hover:bg-rose-700 transition-colors"
                        title="Remove photo"
                      >
                        <Trash2 aria-label="Delete" className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 shrink-0 font-bold border-2 border-white shadow-sm text-lg">
                      {data.basicInfo.name ? data.basicInfo.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <div className="flex-1 space-y-1">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setPhotoError(null);
                        const validation = validateImageFile(file);
                        if (!validation.isValid) {
                          setPhotoError(validation.error || 'Invalid image file.');
                          e.target.value = ''; // Reset input
                          return;
                        }
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          updateBasicInfo('photo', reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }}
                      className="text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#111827] file:text-white hover:file:bg-[#374151] file:cursor-pointer"
                    />
                    <p className="text-[10px] text-gray-500">Allowed formats: JPG, PNG, WebP (Max 5MB). SVG, HTML, and other files are strictly blocked.</p>
                    {photoError && (
                      <p className="text-xs text-rose-600 font-semibold flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {photoError}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-[#374151]">Professional Summary</label>
                <textarea value={data.basicInfo.summary || ''} onChange={(e) => updateBasicInfo('summary', e.target.value)} placeholder="Brief summary of your professional background..." className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
              </div>
            </div>
          </div>
        )}

        {/* Other tabs will be handled in separate components but rendered here for now to keep it simple, or inline. Let's do inline for simplicity and pass data. */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#111827]">Experience</h2>
              <button 
                onClick={() => {
                  const newId = crypto.randomUUID();
                  updateField('experience', [{ id: newId, role: '', org: '', startDate: '', endDate: '', current: false, bullets: [''] }, ...data.experience]);
                  setExpandedId(newId);
                }}
                className="text-xs font-bold text-white bg-[#111827] hover:bg-[#374151] px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
            
            {data.experience.length === 0 ? (
              <p className="text-sm text-[#6B7280]">No experience added yet.</p>
            ) : (
              <SortableList items={data.experience.map(e => e.id!)} onReorder={(newOrder) => {
                const newExp = newOrder.map(id => data.experience.find(e => e.id === id)!);
                updateField('experience', newExp);
              }}>
                {data.experience.map((exp, idx) => (
                  <SortableItem key={exp.id} id={exp.id!} dragHandle>
                    <AccordionEntry
                      title={exp.role ? `${exp.role} at ${exp.org || 'Company'}` : 'New Experience'}
                      subtitle={exp.startDate ? `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}` : ''}
                      isExpanded={expandedId === exp.id}
                      onToggle={() => setExpandedId(expandedId === exp.id ? null : exp.id!)}
                      onDelete={() => {
                        if (confirm('Delete this experience?')) {
                          updateField('experience', data.experience.filter(e => e.id !== exp.id));
                        }
                      }}
                      onDuplicate={() => {
                        const copy = { ...exp, id: crypto.randomUUID() };
                        const newExp = [...data.experience];
                        newExp.splice(idx + 1, 0, copy);
                        updateField('experience', newExp);
                        setExpandedId(copy.id);
                      }}
                    >
                      <div className="p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#374151]">Job Title</label>
                            <input value={exp.role} onChange={(e) => {
                              const newExp = [...data.experience];
                              newExp[idx].role = e.target.value;
                              updateField('experience', newExp);
                            }} placeholder="Software Engineer" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#374151]">Company</label>
                            <input value={exp.org} onChange={(e) => {
                              const newExp = [...data.experience];
                              newExp[idx].org = e.target.value;
                              updateField('experience', newExp);
                            }} placeholder="Acme Corp" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#374151]">Start Date</label>
                            <input value={exp.startDate} onChange={(e) => {
                              const newExp = [...data.experience];
                              newExp[idx].startDate = e.target.value;
                              updateField('experience', newExp);
                            }} placeholder="Jan 2020" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#374151]">End Date</label>
                            <div className="flex gap-2 items-center">
                              <input value={exp.endDate} onChange={(e) => {
                                const newExp = [...data.experience];
                                newExp[idx].endDate = e.target.value;
                                updateField('experience', newExp);
                              }} placeholder="Present" disabled={exp.current} className="flex-1 w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] disabled:opacity-50" />
                              <label className="flex items-center gap-1.5 text-xs text-[#4B5563] cursor-pointer whitespace-nowrap">
                                <input type="checkbox" checked={exp.current} onChange={(e) => {
                                  const newExp = [...data.experience];
                                  newExp[idx].current = e.target.checked;
                                  if (e.target.checked) newExp[idx].endDate = '';
                                  updateField('experience', newExp);
                                }} className="rounded border-[#D1D5DB] text-[#2563EB] focus:ring-[#2563EB]" /> Current
                              </label>
                            </div>
                          </div>

                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-bold text-[#374151]">Location (Optional)</label>
                            <input value={exp.location || ''} onChange={(e) => {
                              const newExp = [...data.experience];
                              newExp[idx].location = e.target.value;
                              updateField('experience', newExp);
                            }} placeholder="San Francisco, CA (or Remote)" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>
                        </div>

                        {/* Bullets */}
                        <div className="space-y-2 pt-2">
                          <label className="text-xs font-bold text-[#374151]">Bullet Points</label>
                          <SortableList items={exp.bullets.map((_, i) => `${exp.id}-b-${i}`)} onReorder={(newOrder) => {
                            // Extract old indices from the newOrder strings
                            const oldIndices = newOrder.map(idStr => parseInt(idStr.split('-').pop()!));
                            const newBullets = oldIndices.map(i => exp.bullets[i]);
                            const newExp = [...data.experience];
                            newExp[idx].bullets = newBullets;
                            updateField('experience', newExp);
                          }}>
                            {exp.bullets.map((bullet, bIdx) => (
                              <SortableItem key={`${exp.id}-b-${bIdx}`} id={`${exp.id}-b-${bIdx}`} dragHandle>
                                <div className="flex p-1 pr-3 items-start gap-2 bg-white">
                                  <textarea 
                                    value={bullet} 
                                    onChange={(e) => {
                                      const newExp = [...data.experience];
                                      newExp[idx].bullets[bIdx] = e.target.value;
                                      updateField('experience', newExp);
                                    }}
                                    placeholder="Developed a new feature that increased user engagement by 20%..."
                                    className="flex-1 text-sm bg-transparent resize-none h-16 focus:outline-none py-1.5"
                                  />
                                  <button onClick={() => {
                                    const newExp = [...data.experience];
                                    newExp[idx].bullets.splice(bIdx, 1);
                                    updateField('experience', newExp);
                                  }} aria-label="Delete" title="Delete" className="mt-1.5 p-1.5 text-[#9CA3AF] hover:text-rose-500 hover:bg-rose-50 rounded transition-colors">
                                    <Trash2 aria-label="Delete" className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </SortableItem>
                            ))}
                          </SortableList>
                          <button onClick={() => {
                            const newExp = [...data.experience];
                            newExp[idx].bullets.push('');
                            updateField('experience', newExp);
                          }} className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 mt-2">
                            <Plus className="w-3.5 h-3.5" /> Add bullet
                          </button>
                        </div>

                      </div>
                    </AccordionEntry>
                  </SortableItem>
                ))}
              </SortableList>
            )}
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#111827]">Education</h2>
              <button 
                onClick={() => {
                  const newId = crypto.randomUUID();
                  updateField('education', [{ id: newId, degree: '', institution: '', startDate: '', endDate: '', field: '' }, ...data.education]);
                  setExpandedId(newId);
                }}
                className="text-xs font-bold text-white bg-[#111827] hover:bg-[#374151] px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
            
            {data.education.length === 0 ? (
              <p className="text-sm text-[#6B7280]">No education added yet.</p>
            ) : (
              <SortableList items={data.education.map(e => e.id!)} onReorder={(newOrder) => {
                const newEdu = newOrder.map(id => data.education.find(e => e.id === id)!);
                updateField('education', newEdu);
              }}>
                {data.education.map((edu, idx) => (
                  <SortableItem key={edu.id} id={edu.id!} dragHandle>
                    <AccordionEntry
                      title={edu.degree ? `${edu.degree} at ${edu.institution || 'Institution'}` : 'New Education'}
                      subtitle={edu.startDate ? `${edu.startDate} - ${edu.endDate || 'Present'}` : ''}
                      isExpanded={expandedId === edu.id}
                      onToggle={() => setExpandedId(expandedId === edu.id ? null : edu.id!)}
                      onDelete={() => {
                        if (confirm('Delete this education entry?')) {
                          updateField('education', data.education.filter(e => e.id !== edu.id));
                        }
                      }}
                      onDuplicate={() => {
                        const copy = { ...edu, id: crypto.randomUUID() };
                        const newEdu = [...data.education];
                        newEdu.splice(idx + 1, 0, copy);
                        updateField('education', newEdu);
                        setExpandedId(copy.id);
                      }}
                    >
                      <div className="p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-bold text-[#374151]">Institution</label>
                            <input value={edu.institution} onChange={(e) => {
                              const newEdu = [...data.education];
                              newEdu[idx].institution = e.target.value;
                              updateField('education', newEdu);
                            }} placeholder="University Name" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-bold text-[#374151]">Degree / Field of Study</label>
                            <input value={edu.degree} onChange={(e) => {
                              const newEdu = [...data.education];
                              newEdu[idx].degree = e.target.value;
                              updateField('education', newEdu);
                            }} placeholder="B.S. Computer Science" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#374151]">Start Date</label>
                            <input value={edu.startDate} onChange={(e) => {
                              const newEdu = [...data.education];
                              newEdu[idx].startDate = e.target.value;
                              updateField('education', newEdu);
                            }} placeholder="Sep 2018" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#374151]">End Date</label>
                            <input value={edu.endDate || ''} onChange={(e) => {
                              const newEdu = [...data.education];
                              newEdu[idx].endDate = e.target.value;
                              updateField('education', newEdu);
                            }} placeholder="May 2022" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>

                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-bold text-[#374151]">GPA / Honors (Optional)</label>
                            <input value={edu.gpa || ''} onChange={(e) => {
                              const newEdu = [...data.education];
                              newEdu[idx].gpa = e.target.value;
                              updateField('education', newEdu);
                            }} placeholder="3.8 GPA, Magna Cum Laude" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>

                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-bold text-[#374151]">Location (Optional)</label>
                            <input value={edu.location || ''} onChange={(e) => {
                              const newEdu = [...data.education];
                              newEdu[idx].location = e.target.value;
                              updateField('education', newEdu);
                            }} placeholder="Boston, MA" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>
                        </div>
                      </div>
                    </AccordionEntry>
                  </SortableItem>
                ))}
              </SortableList>
            )}
          </div>
        )}

        {/* Similar tabs for Projects, Skills, Links */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#111827]">Projects</h2>
              <button 
                onClick={() => {
                  const newId = crypto.randomUUID();
                  updateField('projects', [{ id: newId, title: '', description: '', tech: [], link: '' }, ...data.projects]);
                  setExpandedId(newId);
                }}
                className="text-xs font-bold text-white bg-[#111827] hover:bg-[#374151] px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
            
            {data.projects.length === 0 ? (
              <p className="text-sm text-[#6B7280]">No projects added yet.</p>
            ) : (
              <SortableList items={data.projects.map(e => e.id!)} onReorder={(newOrder) => {
                const newProj = newOrder.map(id => data.projects.find(e => e.id === id)!);
                updateField('projects', newProj);
              }}>
                {data.projects.map((proj, idx) => (
                  <SortableItem key={proj.id} id={proj.id!} dragHandle>
                    <AccordionEntry
                      title={proj.title || 'New Project'}
                      subtitle={proj.tech ? proj.tech.slice(0, 3).join(', ') : ''}
                      isExpanded={expandedId === proj.id}
                      onToggle={() => setExpandedId(expandedId === proj.id ? null : proj.id!)}
                      onDelete={() => {
                        if (confirm('Delete this project?')) {
                          updateField('projects', data.projects.filter(e => e.id !== proj.id));
                        }
                      }}
                      onDuplicate={() => {
                        const copy = { ...proj, id: crypto.randomUUID() };
                        const newProj = [...data.projects];
                        newProj.splice(idx + 1, 0, copy);
                        updateField('projects', newProj);
                        setExpandedId(copy.id);
                      }}
                    >
                      <div className="p-4 space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-[#374151]">Project Name</label>
                          <input value={proj.title} onChange={(e) => {
                            const newProj = [...data.projects];
                            newProj[idx].title = e.target.value;
                            updateField('projects', newProj);
                          }} placeholder="Portfolio Website" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-[#374151]">Description</label>
                          <textarea value={proj.description} onChange={(e) => {
                            const newProj = [...data.projects];
                            newProj[idx].description = e.target.value;
                            updateField('projects', newProj);
                          }} placeholder="Built a responsive personal portfolio using React and Tailwind..." className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-[#374151]">Technologies (comma separated)</label>
                          <input value={proj.tech ? proj.tech.join(', ') : ''} onChange={(e) => {
                            const newProj = [...data.projects];
                            newProj[idx].tech = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                            updateField('projects', newProj);
                          }} placeholder="React, TypeScript, Tailwind" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#374151]">Live URL (Optional)</label>
                            <input value={proj.link || ''} onChange={(e) => {
                              const newProj = [...data.projects];
                              newProj[idx].link = e.target.value;
                              updateField('projects', newProj);
                            }} placeholder="https://example.com" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#374151]">GitHub URL (Optional)</label>
                            <input value={proj.githubUrl || ''} onChange={(e) => {
                              const newProj = [...data.projects];
                              newProj[idx].githubUrl = e.target.value;
                              updateField('projects', newProj);
                            }} placeholder="https://github.com/username/project" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>
                        </div>

                        {/* Project Bullet Points */}
                        <div className="space-y-2 pt-2">
                          <label className="text-xs font-bold text-[#374151]">Project Highlights / Bullet Points</label>
                          <SortableList items={(proj.bullets || []).map((_, i) => `${proj.id}-b-${i}`)} onReorder={(newOrder) => {
                            const oldIndices = newOrder.map(idStr => parseInt(idStr.split('-').pop()!));
                            const newBullets = oldIndices.map(i => (proj.bullets || [])[i]);
                            const newProj = [...data.projects];
                            newProj[idx].bullets = newBullets;
                            updateField('projects', newProj);
                          }}>
                            {(proj.bullets || []).map((bullet, bIdx) => (
                              <SortableItem key={`${proj.id}-b-${bIdx}`} id={`${proj.id}-b-${bIdx}`} dragHandle>
                                <div className="flex p-1 pr-3 items-start gap-2 bg-white">
                                  <textarea 
                                    value={bullet} 
                                    onChange={(e) => {
                                      const newProj = [...data.projects];
                                      if (!newProj[idx].bullets) newProj[idx].bullets = [];
                                      newProj[idx].bullets![bIdx] = e.target.value;
                                      updateField('projects', newProj);
                                    }}
                                    placeholder="Integrated real-time database syncing with <100ms latency..."
                                    className="flex-1 text-sm bg-transparent resize-none h-16 focus:outline-none py-1.5"
                                  />
                                  <button onClick={() => {
                                    const newProj = [...data.projects];
                                    if (newProj[idx].bullets) {
                                      newProj[idx].bullets!.splice(bIdx, 1);
                                      updateField('projects', newProj);
                                    }
                                  }} aria-label="Delete" title="Delete" className="mt-1.5 p-1.5 text-[#9CA3AF] hover:text-rose-500 hover:bg-rose-50 rounded transition-colors">
                                    <Trash2 aria-label="Delete" className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </SortableItem>
                            ))}
                          </SortableList>
                          <button onClick={() => {
                            const newProj = [...data.projects];
                            if (!newProj[idx].bullets) newProj[idx].bullets = [];
                            newProj[idx].bullets!.push('');
                            updateField('projects', newProj);
                          }} className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 mt-2">
                            <Plus className="w-3.5 h-3.5" /> Add bullet
                          </button>
                        </div>
                      </div>
                    </AccordionEntry>
                  </SortableItem>
                ))}
              </SortableList>
            )}
          </div>
        )}

        {/* Links Tab */}
        {activeTab === 'links' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#111827]">Social Links</h2>
              <button 
                onClick={() => {
                  updateField('links', [...data.links, { label: '', url: '' }]);
                }}
                className="text-xs font-bold text-white bg-[#111827] hover:bg-[#374151] px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
            
            {data.links.length === 0 ? (
              <p className="text-sm text-[#6B7280]">No links added yet.</p>
            ) : (
              <div className="space-y-3">
                {data.links.map((link, idx) => (
                  <div key={idx} className="flex gap-2 items-start bg-[#F9FAFB] border border-[#E5E7EB] p-3 rounded-lg">
                    <div className="space-y-1.5 w-1/3">
                      <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Label</label>
                      <input value={link.label} onChange={(e) => {
                        const newLinks = [...data.links];
                        newLinks[idx].label = e.target.value;
                        updateField('links', newLinks);
                      }} placeholder="LinkedIn" className="w-full px-2 py-1.5 text-sm bg-white border border-[#E5E7EB] rounded focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">URL</label>
                      <input value={link.url} onChange={(e) => {
                        const newLinks = [...data.links];
                        newLinks[idx].url = e.target.value;
                        updateField('links', newLinks);
                      }} placeholder="https://..." className="w-full px-2 py-1.5 text-sm bg-white border border-[#E5E7EB] rounded focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                    </div>
                    <button onClick={() => {
                      updateField('links', data.links.filter((_, i) => i !== idx));
                    }} aria-label="Delete" title="Delete" className="mt-6 p-1.5 text-[#9CA3AF] hover:text-rose-500 hover:bg-rose-50 rounded transition-colors">
                      <Trash2 aria-label="Delete" className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#111827]">Skills</h2>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#374151]">Add a skill</label>
              <div className="flex gap-2">
                <input 
                  id="skill-input-field"
                  placeholder="e.g. React" 
                  className="flex-1 px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      const v = e.currentTarget.value.trim();
                      if (!data.skills.includes(v)) updateField('skills', [...data.skills, v]);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button 
                  onClick={() => {
                    const input = document.getElementById('skill-input-field') as HTMLInputElement;
                    if (input && input.value.trim()) {
                      const v = input.value.trim();
                      if (!data.skills.includes(v)) updateField('skills', [...data.skills, v]);
                      input.value = '';
                    }
                  }}
                  className="bg-[#111827] text-white px-4 rounded-lg text-sm font-semibold hover:bg-[#374151] transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {data.skills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-[#F3F4F6] text-[#374151] px-3 py-1.5 rounded-full text-sm font-medium border border-[#E5E7EB]">
                  {skill}
                  <button onClick={() => {
                    updateField('skills', data.skills.filter((_, i) => i !== idx));
                  }} aria-label="Delete" title="Delete" className="text-[#9CA3AF] hover:text-rose-500 rounded-full hover:bg-white transition-colors">
                    <Trash2 aria-label="Delete" className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {data.skills.length === 0 && <p className="text-sm text-[#6B7280]">No skills added yet.</p>}
            </div>
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#111827]">Certifications</h2>
              <button 
                onClick={() => {
                  const newId = crypto.randomUUID();
                  const list = data.certifications || [];
                  updateField('certifications', [{ id: newId, title: '', subtitle: '', date: '', description: '' }, ...list]);
                  setExpandedId(newId);
                }}
                className="text-xs font-bold text-white bg-[#111827] hover:bg-[#374151] px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
            
            {(!data.certifications || data.certifications.length === 0) ? (
              <p className="text-sm text-[#6B7280]">No certifications added yet.</p>
            ) : (
              <SortableList items={(data.certifications || []).map(e => e.id!)} onReorder={(newOrder) => {
                const list = data.certifications || [];
                const newList = newOrder.map(id => list.find(e => e.id === id)!);
                updateField('certifications', newList);
              }}>
                {(data.certifications || []).map((cert, idx) => (
                  <SortableItem key={cert.id} id={cert.id!} dragHandle>
                    <AccordionEntry
                      title={cert.title || 'New Certification'}
                      subtitle={cert.subtitle || ''}
                      isExpanded={expandedId === cert.id}
                      onToggle={() => setExpandedId(expandedId === cert.id ? null : cert.id!)}
                      onDelete={() => {
                        if (confirm('Delete this certification?')) {
                          updateField('certifications', (data.certifications || []).filter(e => e.id !== cert.id));
                        }
                      }}
                      onDuplicate={() => {
                        const copy = { ...cert, id: crypto.randomUUID() };
                        const newList = [...(data.certifications || [])];
                        newList.splice(idx + 1, 0, copy);
                        updateField('certifications', newList);
                        setExpandedId(copy.id);
                      }}
                    >
                      <div className="p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-bold text-[#374151]">Certification Name</label>
                            <input value={cert.title} onChange={(e) => {
                              const newList = [...(data.certifications || [])];
                              newList[idx].title = e.target.value;
                              updateField('certifications', newList);
                            }} placeholder="AWS Certified Solutions Architect" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#374151]">Issuer / Authority</label>
                            <input value={cert.subtitle || ''} onChange={(e) => {
                              const newList = [...(data.certifications || [])];
                              newList[idx].subtitle = e.target.value;
                              updateField('certifications', newList);
                            }} placeholder="Amazon Web Services" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#374151]">Date Earned</label>
                            <input value={cert.date || ''} onChange={(e) => {
                              const newList = [...(data.certifications || [])];
                              newList[idx].date = e.target.value;
                              updateField('certifications', newList);
                            }} placeholder="Jan 2023" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-bold text-[#374151]">Description / Details (Optional)</label>
                            <textarea value={cert.description || ''} onChange={(e) => {
                              const newList = [...(data.certifications || [])];
                              newList[idx].description = e.target.value;
                              updateField('certifications', newList);
                            }} placeholder="Credential ID or description of certification topics..." className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg h-20 resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>
                        </div>
                      </div>
                    </AccordionEntry>
                  </SortableItem>
                ))}
              </SortableList>
            )}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#111827]">Honors & Awards</h2>
              <button 
                onClick={() => {
                  const newId = crypto.randomUUID();
                  updateField('achievements', [{ id: newId, title: '', issuer: '', date: '' }, ...data.achievements]);
                  setExpandedId(newId);
                }}
                className="text-xs font-bold text-white bg-[#111827] hover:bg-[#374151] px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
            
            {data.achievements.length === 0 ? (
              <p className="text-sm text-[#6B7280]">No honors or awards added yet.</p>
            ) : (
              <SortableList items={data.achievements.map(e => e.id!)} onReorder={(newOrder) => {
                const newList = newOrder.map(id => data.achievements.find(e => e.id === id)!);
                updateField('achievements', newList);
              }}>
                {data.achievements.map((award, idx) => (
                  <SortableItem key={award.id} id={award.id!} dragHandle>
                    <AccordionEntry
                      title={award.title || 'New Award'}
                      subtitle={award.issuer || ''}
                      isExpanded={expandedId === award.id}
                      onToggle={() => setExpandedId(expandedId === award.id ? null : award.id!)}
                      onDelete={() => {
                        if (confirm('Delete this award?')) {
                          updateField('achievements', data.achievements.filter(e => e.id !== award.id));
                        }
                      }}
                      onDuplicate={() => {
                        const copy = { ...award, id: crypto.randomUUID() };
                        const newList = [...data.achievements];
                        newList.splice(idx + 1, 0, copy);
                        updateField('achievements', newList);
                        setExpandedId(copy.id);
                      }}
                    >
                      <div className="p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-bold text-[#374151]">Award Title</label>
                            <input value={award.title} onChange={(e) => {
                              const newList = [...data.achievements];
                              newList[idx].title = e.target.value;
                              updateField('achievements', newList);
                            }} placeholder="1st Place, Hackathon" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#374151]">Issuer / Organization</label>
                            <input value={award.issuer} onChange={(e) => {
                              const newList = [...data.achievements];
                              newList[idx].issuer = e.target.value;
                              updateField('achievements', newList);
                            }} placeholder="Google" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#374151]">Date</label>
                            <input value={award.date} onChange={(e) => {
                              const newList = [...data.achievements];
                              newList[idx].date = e.target.value;
                              updateField('achievements', newList);
                            }} placeholder="May 2022" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>
                        </div>
                      </div>
                    </AccordionEntry>
                  </SortableItem>
                ))}
              </SortableList>
            )}
          </div>
        )}

        {activeTab === 'publications' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#111827]">Publications</h2>
              <button 
                onClick={() => {
                  const newId = crypto.randomUUID();
                  const list = data.publications || [];
                  updateField('publications', [{ id: newId, title: '', subtitle: '', date: '', description: '' }, ...list]);
                  setExpandedId(newId);
                }}
                className="text-xs font-bold text-white bg-[#111827] hover:bg-[#374151] px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
            
            {(!data.publications || data.publications.length === 0) ? (
              <p className="text-sm text-[#6B7280]">No publications added yet.</p>
            ) : (
              <SortableList items={(data.publications || []).map(e => e.id!)} onReorder={(newOrder) => {
                const list = data.publications || [];
                const newList = newOrder.map(id => list.find(e => e.id === id)!);
                updateField('publications', newList);
              }}>
                {(data.publications || []).map((pub, idx) => (
                  <SortableItem key={pub.id} id={pub.id!} dragHandle>
                    <AccordionEntry
                      title={pub.title || 'New Publication'}
                      subtitle={pub.subtitle || ''}
                      isExpanded={expandedId === pub.id}
                      onToggle={() => setExpandedId(expandedId === pub.id ? null : pub.id!)}
                      onDelete={() => {
                        if (confirm('Delete this publication?')) {
                          updateField('publications', (data.publications || []).filter(e => e.id !== pub.id));
                        }
                      }}
                      onDuplicate={() => {
                        const copy = { ...pub, id: crypto.randomUUID() };
                        const newList = [...(data.publications || [])];
                        newList.splice(idx + 1, 0, copy);
                        updateField('publications', newList);
                        setExpandedId(copy.id);
                      }}
                    >
                      <div className="p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-bold text-[#374151]">Publication Title</label>
                            <input value={pub.title} onChange={(e) => {
                              const newList = [...(data.publications || [])];
                              newList[idx].title = e.target.value;
                              updateField('publications', newList);
                            }} placeholder="An Analysis of Scalable Web Systems" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#374151]">Publisher / Journal</label>
                            <input value={pub.subtitle || ''} onChange={(e) => {
                              const newList = [...(data.publications || [])];
                              newList[idx].subtitle = e.target.value;
                              updateField('publications', newList);
                            }} placeholder="IEEE Journal" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#374151]">Date</label>
                            <input value={pub.date || ''} onChange={(e) => {
                              const newList = [...(data.publications || [])];
                              newList[idx].date = e.target.value;
                              updateField('publications', newList);
                            }} placeholder="May 2022" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-bold text-[#374151]">Description / Abstract</label>
                            <textarea value={pub.description || ''} onChange={(e) => {
                              const newList = [...(data.publications || [])];
                              newList[idx].description = e.target.value;
                              updateField('publications', newList);
                            }} placeholder="Brief abstract or key findings..." className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg h-20 resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                          </div>
                        </div>
                      </div>
                    </AccordionEntry>
                  </SortableItem>
                ))}
              </SortableList>
            )}
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-[#111827]">Custom Sections</h2>
                <p className="text-xs text-[#6B7280]">Add coursework, volunteer work, awards, leadership, or custom headings.</p>
              </div>
              <button 
                onClick={() => {
                  const currentCustoms = data.customSections || [];
                  const newSection = {
                    id: crypto.randomUUID(),
                    name: 'New Custom Section',
                    items: [{ id: crypto.randomUUID(), title: '', subtitle: '', date: '', description: '' }]
                  };
                  updateField('customSections', [...currentCustoms, newSection]);
                }}
                className="text-xs font-bold text-white bg-[#111827] hover:bg-[#374151] px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add New Custom Section
              </button>
            </div>

            {(!data.customSections || data.customSections.length === 0) ? (
              <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-6 text-center space-y-3">
                <p className="text-sm text-[#6B7280]">No custom sections created yet.</p>
                <button
                  onClick={() => {
                    updateField('customSections', [{
                      id: crypto.randomUUID(),
                      name: 'Custom Section',
                      items: [{ id: crypto.randomUUID(), title: '', subtitle: '', date: '', description: '' }]
                    }]);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold bg-white border border-gray-300 hover:bg-gray-100 rounded-md shadow-sm"
                >
                  Create First Custom Section
                </button>
              </div>
            ) : (
              data.customSections.map((sec, secIdx) => (
                <div key={sec.id || secIdx} className="bg-white border border-gray-200 rounded-xl p-4 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
                    <div className="flex-1 space-y-1">
                      <label className="text-xs font-bold text-[#374151]">Section Title</label>
                      <input 
                        value={sec.name} 
                        onChange={(e) => {
                          const updated = [...data.customSections!];
                          updated[secIdx].name = e.target.value;
                          updateField('customSections', updated);
                        }} 
                        placeholder="e.g. Volunteer Experience, Coursework, Awards" 
                        className="w-full px-3 py-1.5 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] font-bold" 
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-5">
                      <button 
                        onClick={() => {
                          const newItem = { id: crypto.randomUUID(), title: '', subtitle: '', date: '', description: '' };
                          const updated = [...data.customSections!];
                          updated[secIdx].items = [newItem, ...(updated[secIdx].items || [])];
                          updateField('customSections', updated);
                          setExpandedId(newItem.id);
                        }}
                        className="text-xs font-semibold text-[#2563EB] bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-md flex items-center gap-1 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Item
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm(`Delete section "${sec.name}"?`)) {
                            const updated = data.customSections!.filter((_, idx) => idx !== secIdx);
                            updateField('customSections', updated);
                          }
                        }}
                        className="text-xs font-semibold text-red-600 hover:bg-red-50 p-1.5 rounded-md transition-colors"
                        title="Delete Section"
                      >
                        <Trash2 aria-label="Delete" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {(!sec.items || sec.items.length === 0) ? (
                    <p className="text-xs text-[#6B7280] italic">No items in this section.</p>
                  ) : (
                    <SortableList items={sec.items.map(e => e.id!)} onReorder={(newOrder) => {
                      const updated = [...data.customSections!];
                      const newItems = newOrder.map(id => sec.items.find(e => e.id === id)!);
                      updated[secIdx].items = newItems;
                      updateField('customSections', updated);
                    }}>
                      {sec.items.map((item, itemIdx) => (
                        <SortableItem key={item.id} id={item.id!} dragHandle>
                          <AccordionEntry
                            title={item.title || 'New Item'}
                            subtitle={item.subtitle || ''}
                            isExpanded={expandedId === item.id}
                            onToggle={() => setExpandedId(expandedId === item.id ? null : item.id!)}
                            onDelete={() => {
                              const updated = [...data.customSections!];
                              updated[secIdx].items = updated[secIdx].items.filter(e => e.id !== item.id);
                              updateField('customSections', updated);
                            }}
                            onDuplicate={() => {
                              const copy = { ...item, id: crypto.randomUUID() };
                              const updated = [...data.customSections!];
                              updated[secIdx].items.splice(itemIdx + 1, 0, copy);
                              updateField('customSections', updated);
                              setExpandedId(copy.id);
                            }}
                          >
                            <div className="p-4 space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5 md:col-span-2">
                                  <label className="text-xs font-bold text-[#374151]">Item Title</label>
                                  <input value={item.title} onChange={(e) => {
                                    const updated = [...data.customSections!];
                                    updated[secIdx].items[itemIdx].title = e.target.value;
                                    updateField('customSections', updated);
                                  }} placeholder="Title" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-xs font-bold text-[#374151]">Subtitle / Subheading</label>
                                  <input value={item.subtitle || ''} onChange={(e) => {
                                    const updated = [...data.customSections!];
                                    updated[secIdx].items[itemIdx].subtitle = e.target.value;
                                    updateField('customSections', updated);
                                  }} placeholder="Role, Organization, or Details" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-xs font-bold text-[#374151]">Date</label>
                                  <input value={item.date || ''} onChange={(e) => {
                                    const updated = [...data.customSections!];
                                    updated[secIdx].items[itemIdx].date = e.target.value;
                                    updateField('customSections', updated);
                                  }} placeholder="Jan 2023 - Present" className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                                </div>
                                <div className="space-y-1.5 md:col-span-2">
                                  <label className="text-xs font-bold text-[#374151]">Description</label>
                                  <textarea value={item.description || ''} onChange={(e) => {
                                    const updated = [...data.customSections!];
                                    updated[secIdx].items[itemIdx].description = e.target.value;
                                    updateField('customSections', updated);
                                  }} placeholder="Details about this item..." className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg h-20 resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                                </div>
                              </div>
                            </div>
                          </AccordionEntry>
                        </SortableItem>
                      ))}
                    </SortableList>
                  )}
                </div>
              ))
            )}
          </div>
        )}


        {activeTab === 'customization' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#111827]">Template & Design</h2>
            <p className="text-sm text-[#6B7280]">To change your resume's template and colors, use the "Template" button in the top right corner of the builder header.</p>
          </div>
        )}
      </div>
    </div>
  );
}


function SectionNavItem({ icon, title, status, onClick, dragMode = false }: { icon: React.ReactNode, title: string, status: string, onClick: () => void, dragMode?: boolean }) {
  return (
    <div 
      className={`w-full flex items-center justify-between p-4 bg-white border border-[#E5E7EB] rounded-xl cursor-pointer hover:border-[#2563EB] hover:shadow-sm transition-all group ${dragMode ? 'pl-2' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {dragMode ? (
          <div className="p-1 cursor-grab active:cursor-grabbing text-[#9CA3AF] hover:bg-[#F3F4F6] rounded">
            <GripVertical className="w-4 h-4" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-[#F9FAFB] flex items-center justify-center text-[#4B5563]">
            {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-4 h-4' })}
          </div>
        )}
        {dragMode && (
          <div className="w-8 h-8 rounded-lg bg-[#F9FAFB] flex items-center justify-center text-[#4B5563]">
            {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-4 h-4' })}
          </div>
        )}
        <div className="flex flex-col text-left">
          <span className="text-sm font-bold text-[#111827]">{title}</span>
          <span className={`text-[11px] font-semibold mt-0.5 ${status.includes('✓') ? 'text-emerald-600' : status === 'Optional' || status === 'Customization' ? 'text-[#6B7280]' : 'text-[#2563EB]'}`}>
            {status}
          </span>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#2563EB] transition-colors" />
    </div>
  );
}

function AccordionEntry({ title, subtitle, isExpanded, onToggle, onDelete, onDuplicate, children }: any) {
  return (
    <div className="flex flex-col">
      <div 
        className={`flex items-center justify-between p-4 cursor-pointer hover:bg-[#F9FAFB] transition-colors ${isExpanded ? 'bg-[#F9FAFB] border-b border-[#E5E7EB]' : ''}`}
        onClick={onToggle}
      >
        <div className="flex flex-col flex-1 min-w-0 pr-4">
          <span className="text-sm font-bold text-[#111827] truncate">{title}</span>
          {subtitle && <span className="text-[11px] text-[#6B7280] font-medium mt-0.5 truncate">{subtitle}</span>}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button 
            onClick={(e) => { e.stopPropagation(); onDuplicate(); }}
            className="p-1.5 text-[#6B7280] hover:bg-white hover:text-[#111827] rounded-md transition-colors"
            title="Duplicate"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="p-1.5 text-[#6B7280] hover:bg-rose-50 hover:text-rose-600 rounded-md transition-colors"
            title="Delete"
          >
            <Trash2 aria-label="Delete" className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-[#E5E7EB] mx-1" />
          <ChevronRight className={`w-4 h-4 text-[#9CA3AF] transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </div>
      </div>
      {isExpanded && (
        <div className="bg-white">
          {children}
        </div>
      )}
    </div>
  );
}
