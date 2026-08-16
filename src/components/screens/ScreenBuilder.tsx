import React, { useState, useEffect } from 'react';
import { PortfolioData, TemplateId } from '../../types';
import FormBuilder, { TabType } from '../FormBuilder';
import LivePreviewPane from '../common/LivePreviewPane';
import PillButton from '../common/PillButton';
import ChangeTemplateModal from '../ChangeTemplateModal';
import ResumeCheckPanel from '../ResumeCheckPanel';
import BuildEasyLogo from '../common/BuildEasyLogo';
import { ShieldCheck, LayoutTemplate, Eye, ZoomIn, ZoomOut, Download, ArrowLeft, CheckCircle2, RotateCw } from 'lucide-react';
import { triggerPdfExport } from '../../lib/exporter';

interface ScreenBuilderProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
  activeTab: TabType;
  onTabChange: (tabId: TabType) => void;
  onNextAtEnd: () => void;
  onBackAtStart: () => void;
}

export default function ScreenBuilder({
  data,
  onChange,
  activeTab,
  onTabChange,
  onNextAtEnd,
  onBackAtStart,
}: ScreenBuilderProps) {
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isCheckPanelOpen, setIsCheckPanelOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [saveStatus, setSaveStatus] = useState<'Saved' | 'Saving...'>('Saved');
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Autosave indicator effect
  useEffect(() => {
    setSaveStatus('Saving...');
    const timer = setTimeout(() => {
      setSaveStatus('Saved');
    }, 800);
    return () => clearTimeout(timer);
  }, [data]);

  const handleOpenTemplateModal = () => setIsTemplateModalOpen(true);
  const handleApplyTemplate = (newTpl: TemplateId, newColor?: string) => {
    onChange({
      ...data,
      templateId: newTpl,
      accentColor: newColor,
    });
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  const handleZoomFit = () => setZoomLevel(1);

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      await triggerPdfExport(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F7F8F9] overflow-hidden">
      
      {/* 1. COMPACT BUILDER HEADER */}
      <header className="h-14 border-b border-[#E5E7EB] bg-white px-4 md:px-6 flex items-center justify-between shrink-0 z-10 shadow-sm relative">
        {/* Left: Logo & Resume Name */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onBackAtStart}
            className="flex items-center justify-center p-1.5 -ml-1.5 rounded-md hover:bg-[#F3F4F6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#111827]"
            title="Back to Home"
          >
            <ArrowLeft className="w-4 h-4 text-[#4B5563]" />
          </button>
          <div className="hidden sm:block h-4 w-px bg-[#E5E7EB]" />
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={data.resumeName || ''}
              onChange={(e) => {
                onChange({
                  ...data,
                  resumeName: e.target.value,
                });
              }}
              placeholder="Unnamed Resume"
              className="text-xs sm:text-sm font-bold text-[#111827] bg-transparent hover:bg-gray-50 focus:bg-white border border-transparent hover:border-gray-200 focus:border-[#2563EB] rounded px-2 py-1 max-w-[150px] sm:max-w-[220px] transition-all outline-none"
              title="Click to edit resume name"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          
          {/* Autosave Status */}
          <div className="hidden md:flex items-center gap-1.5 mr-2">
            {saveStatus === 'Saving...' ? (
              <>
                <RotateCw className="w-3 h-3 text-[#6B7280] animate-spin" />
                <span className="text-xs font-medium text-[#6B7280]">Saving...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span className="text-xs font-medium text-[#6B7280]">Saved</span>
              </>
            )}
          </div>

          <div className="hidden sm:block h-4 w-px bg-[#E5E7EB] mx-1" />

          {/* Desktop Actions */}
          <PillButton
            variant="ghost"
            onClick={handleOpenTemplateModal}
            iconLeft={<LayoutTemplate className="w-3.5 h-3.5" />}
            className="text-xs py-1.5 px-3 hidden lg:flex"
          >
            Template
          </PillButton>

          <PillButton
            variant="secondary"
            onClick={() => setIsCheckPanelOpen(true)}
            iconLeft={<ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
            className="text-xs py-1.5 px-3 hidden md:flex"
          >
            Check Resume
          </PillButton>

                    <PillButton
            variant="secondary"
            onClick={onNextAtEnd}
            iconLeft={<Eye className="w-3.5 h-3.5 text-[#4B5563]" />}
            className="text-xs py-1.5 px-3 hidden lg:flex"
          >
            Full Preview
          </PillButton>

          <PillButton
            variant="primary"
            onClick={handleDownload}
            iconLeft={<Download className="w-3.5 h-3.5" />}
            className="text-xs py-1.5 px-4"
          >
            <span className="hidden sm:inline">{isExporting ? 'Generating...' : 'Download PDF'}</span>
            <span className="sm:hidden">{isExporting ? '...' : 'Download'}</span>
          </PillButton>

          {/* Mobile Preview Toggle */}
          <button 
            className="md:hidden ml-1 p-2 rounded-md bg-[#F3F4F6] text-[#111827]"
            onClick={() => setIsMobilePreview(!isMobilePreview)}
          >
            {isMobilePreview ? <ArrowLeft className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Left Pane: Editor */}
        <div className={`w-full md:w-[45%] lg:w-[40%] xl:w-[35%] h-full flex flex-col shrink-0 border-r border-[#E5E7EB] bg-white transition-transform ${isMobilePreview ? '-translate-x-full absolute md:static md:translate-x-0' : ''}`}>
          <FormBuilder
            data={data}
            onChange={onChange}
            activeTab={activeTab}
            onTabChange={onTabChange}
            onNextAtEnd={onNextAtEnd}
            onBackAtStart={onBackAtStart}
          />
        </div>

        {/* Right Pane: Live Preview */}
        <div className={`flex-1 h-full flex flex-col bg-[#F3F4F6] transition-transform ${isMobilePreview ? 'translate-x-0' : 'translate-x-full absolute md:static md:translate-x-0 w-full'}`}>
          
          {/* Preview Controls Header */}
          <div className="h-12 border-b border-[#E5E7EB] px-4 flex justify-between items-center bg-[#FAFAFA] shrink-0 select-none">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#6B7280]" />
              <span className="text-xs font-bold text-[#374151] hidden sm:block">Live Preview</span>
              <span className="text-[10px] bg-[#E5E7EB] text-[#4B5563] px-2 py-0.5 rounded-full font-semibold uppercase">
                {data.templateId}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
               {/* Mobile Check Resume */}
              <button 
                onClick={() => setIsCheckPanelOpen(true)}
                className="md:hidden p-1.5 rounded-md text-emerald-600 hover:bg-[#E5E7EB]"
                title="Check Resume"
              >
                <ShieldCheck className="w-4 h-4" />
              </button>

              {/* Mobile Template */}
              <button 
                onClick={handleOpenTemplateModal}
                className="lg:hidden p-1.5 rounded-md text-[#4B5563] hover:bg-[#E5E7EB]"
                title="Change Template"
              >
                <LayoutTemplate className="w-4 h-4" />
              </button>

              <div className="flex items-center bg-[#E5E7EB] rounded-lg p-0.5">
                <button onClick={handleZoomOut} className="p-1 hover:bg-white rounded-md text-[#4B5563]" title="Zoom Out">
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button onClick={handleZoomFit} className="px-2 py-1 hover:bg-white rounded-md text-[10px] font-bold text-[#4B5563]" title="Fit to Screen">
                  {Math.round(zoomLevel * 100)}%
                </button>
                <button onClick={handleZoomIn} className="p-1 hover:bg-white rounded-md text-[#4B5563]" title="Zoom In">
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Scrollable Live Document Sheet */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center items-start">
            <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center', transition: 'transform 0.2s ease-out' }} className="w-full max-w-4xl flex justify-center pb-20">
              <LivePreviewPane data={data} className="w-full shadow-lg" />
            </div>
          </div>
        </div>

      </div>

      {/* Modals */}
      <ChangeTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        currentTemplateId={data.templateId}
        currentAccentColor={data.accentColor}
        onApplyTemplate={handleApplyTemplate}
        resumeData={data}
      />

      <ResumeCheckPanel
        data={data}
        isOpen={isCheckPanelOpen}
        onClose={() => setIsCheckPanelOpen(false)}
        onNavigateToTab={onTabChange}
      />
    </div>
  );
}
