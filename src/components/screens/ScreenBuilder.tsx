import React, { useState, useEffect } from 'react';
import { PortfolioData, TemplateId } from '../../types';
import FormBuilder, { TabType } from '../FormBuilder';
import DesignTab from '../tabs/DesignTab';
import ATSTab from '../tabs/ATSTab';
import LivePreviewPane from '../common/LivePreviewPane';
import ChangeTemplateModal from '../ChangeTemplateModal';
import BuildEasyLogo from '../common/BuildEasyLogo';
import { 
  ShieldCheck, 
  LayoutTemplate, 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles,
  FileText,
  Paintbrush
} from 'lucide-react';
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
  const [topTab, setTopTab] = useState<'content' | 'design' | 'ats'>('content');
  const [currentSectionTab, setCurrentSectionTab] = useState<TabType>(activeTab || 'overview');
  const [zoomLevel, setZoomLevel] = useState(0.85);
  const [isExporting, setIsExporting] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'Saved' | 'Saving...'>('Saved');

  // History stack for Undo / Redo
  const [history, setHistory] = useState<PortfolioData[]>([data]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleDataChange = (newData: PortfolioData) => {
    setSaveStatus('Saving...');
    onChange(newData);
    
    // Add to history
    setHistory((prev) => {
      const updated = prev.slice(0, historyIndex + 1);
      return [...updated, newData];
    });
    setHistoryIndex((prev) => prev + 1);

    setTimeout(() => {
      setSaveStatus('Saved');
    }, 400);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevData = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      onChange(prevData);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextData = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      onChange(nextData);
    }
  };

  const handleSectionTabChange = (newTab: TabType) => {
    if (newTab === 'customization') {
      setTopTab('design');
    } else {
      setCurrentSectionTab(newTab);
      onTabChange(newTab);
    }
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(Number((prev + 0.1).toFixed(2)), 1.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(Number((prev - 0.1).toFixed(2)), 0.4));
  const handleZoomFit = () => setZoomLevel(0.85);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F7F8F9] overflow-hidden">
      {/* 1. BUILDER TOPBAR */}
      <header className="h-14 border-b border-[#E5E7EB] bg-white px-4 md:px-6 flex items-center justify-between shrink-0 z-10 shadow-xs">
        <div className="flex items-center gap-3 md:gap-5">
          <button 
            onClick={onBackAtStart} 
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-black transition-colors cursor-pointer py-1 px-2 rounded hover:bg-gray-100"
            title="Back to Home"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </button>
          
          <div className="h-4 w-px bg-gray-200" />
          
          <button onClick={onBackAtStart} className="flex items-center hover:opacity-80 transition-opacity cursor-pointer">
            <BuildEasyLogo size="sm" />
          </button>

          <div className="h-4 w-px bg-gray-200 hidden sm:block" />

          <input 
            type="text"
            value={data.resumeName || ''} 
            onChange={(e) => handleDataChange({ ...data, resumeName: e.target.value })}
            placeholder="My Resume"
            className="font-bold text-xs sm:text-sm text-[#111827] bg-transparent border-b border-transparent hover:border-gray-300 focus:border-black outline-none px-1 py-0.5 max-w-[150px] sm:max-w-[220px]"
            title="Rename your resume document"
          />

          <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 hidden md:inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> {saveStatus}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="text-xs px-2.5 py-1.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed font-medium transition-colors"
            title="Undo (Ctrl+Z)"
          >
            Undo
          </button>
          <button 
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="text-xs px-2.5 py-1.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed font-medium transition-colors"
            title="Redo (Ctrl+Y)"
          >
            Redo
          </button>
          
          <button 
            onClick={() => setIsTemplateModalOpen(true)}
            className="text-xs px-3 py-1.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Change Template</span>
          </button>

          <button 
            onClick={async () => {
              setIsExporting(true);
              try {
                await triggerPdfExport(data);
              } catch (e) {
                console.error('Export failed', e);
              } finally {
                setIsExporting(false);
              }
            }} 
            disabled={isExporting}
            className="text-xs px-4 py-1.5 bg-[#111827] hover:bg-[#27272a] text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Exporting...' : 'Export PDF'}</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE WITH SPLIT VIEW */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Pane: Editor */}
        <div className="w-full lg:w-[48%] xl:w-[45%] h-full flex flex-col shrink-0 border-r border-[#E5E7EB] bg-white">
          {/* Sub Navigation Bar */}
          <div className="flex border-b border-[#E5E7EB] bg-[#FAFAFA] shrink-0">
            <button 
              onClick={() => setTopTab('content')} 
              className={`flex-1 py-3 text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 transition-all border-b-2 ${topTab === 'content' ? 'border-[#111827] text-[#111827] bg-white' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
            >
              <FileText className="w-4 h-4" />
              <span>Content</span>
            </button>
            <button 
              onClick={() => setTopTab('design')} 
              className={`flex-1 py-3 text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 transition-all border-b-2 ${topTab === 'design' ? 'border-[#111827] text-[#111827] bg-white' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
            >
              <Paintbrush className="w-4 h-4" />
              <span>Design</span>
            </button>
            <button 
              onClick={() => setTopTab('ats')} 
              className={`flex-1 py-3 text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 transition-all border-b-2 ${topTab === 'ats' ? 'border-[#111827] text-[#111827] bg-white' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>ATS Score</span>
            </button>
          </div>

          {/* Editor Body */}
          <div className="flex-1 overflow-y-auto">
            {topTab === 'content' && (
              <FormBuilder 
                data={data} 
                onChange={handleDataChange} 
                activeTab={currentSectionTab} 
                onTabChange={handleSectionTabChange} 
                onNextAtEnd={onNextAtEnd} 
                onBackAtStart={onBackAtStart} 
              />
            )}
            {topTab === 'design' && (
              <DesignTab 
                data={data} 
                onChange={handleDataChange} 
              />
            )}
            {topTab === 'ats' && (
              <ATSTab 
                data={data} 
              />
            )}
          </div>
        </div>

        {/* Right Pane: Live Document Preview */}
        <div className="hidden lg:flex flex-1 h-full flex-col bg-[#EDEDED] relative overflow-hidden">
          {/* Zoom & View Controls */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2 py-1 rounded-full shadow-md border border-gray-200 text-xs font-semibold text-gray-700">
            <button 
              onClick={handleZoomOut} 
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 text-[11px] font-mono min-w-[40px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button 
              onClick={handleZoomIn} 
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <div className="h-3 w-px bg-gray-200 mx-0.5" />
            <button 
              onClick={handleZoomFit} 
              className="px-2 py-1 hover:bg-gray-100 rounded-full text-[11px] font-medium transition-colors cursor-pointer"
              title="Reset Zoom"
            >
              Fit
            </button>
          </div>
          
          {/* Scrollable Canvas Sheet */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 flex justify-center items-start">
            <div 
              style={{ 
                transform: `scale(${zoomLevel})`, 
                transformOrigin: 'top center', 
                transition: 'transform 0.15s ease-out',
                width: '794px', // Standard A4 width reference in px for crystal-clear render
              }} 
              className="flex justify-center pb-24 shrink-0"
            >
              <LivePreviewPane data={data} className="w-full shadow-2xl rounded-sm" />
            </div>
          </div>
        </div>

      </div>

      {/* Change Template Modal */}
      <ChangeTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        currentTemplateId={data.templateId}
        currentAccentColor={data.accentColor}
        resumeData={data}
        onApplyTemplate={(templateId, accentColor) => {
          handleDataChange({
            ...data,
            templateId,
            ...(accentColor !== undefined ? { accentColor } : {}),
          });
          setIsTemplateModalOpen(false);
        }}
      />
    </div>
  );
}
