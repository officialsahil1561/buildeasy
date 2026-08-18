import React, { useState, useEffect, useRef } from 'react';
import { PortfolioData, TemplateId } from '../../types';
import FormBuilder, { TabType } from '../FormBuilder';
import DesignTab from '../tabs/DesignTab';
import LivePreviewPane from '../common/LivePreviewPane';
import ChangeTemplateModal from '../ChangeTemplateModal';
import BuildEasyLogo from '../common/BuildEasyLogo';
import { 
  LayoutTemplate, 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  ArrowLeft, 
  CheckCircle2, 
  Check,
  Sparkles,
  FileText,
  Paintbrush
} from 'lucide-react';
import { triggerAuthoritativePdfExport } from '../../lib/exporter';

interface ScreenBuilderProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
  onNextAtEnd: () => void;
  onBackAtStart: () => void;
}

export default function ScreenBuilder({
  data,
  onChange,
  onNextAtEnd,
  onBackAtStart,
}: ScreenBuilderProps) {
  const [topTab, setTopTab] = useState<'content' | 'design'>('content');
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [isExporting, setIsExporting] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'Saved' | 'Saving...'>('Saved');

  const previewContainerRef = useRef<HTMLDivElement>(null);

  // History stack for Undo / Redo (limited to 40 states)
  const [history, setHistory] = useState<PortfolioData[]>([data]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleDataChange = (newData: PortfolioData) => {
    setSaveStatus('Saving...');
    onChange(newData);
    
    // Add to history with max 40 snapshots and forward-branch invalidation
    setHistory((prev) => {
      const updated = prev.slice(Math.max(0, historyIndex - 39), historyIndex + 1);
      return [...updated, newData];
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 39));

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

  // Keyboard shortcut listener for Undo / Redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      if (isCtrlOrCmd && !e.altKey) {
        if (e.key.toLowerCase() === 'z') {
          if (e.shiftKey) {
            if (!isInput) {
              e.preventDefault();
              handleRedo();
            }
          } else {
            if (!isInput) {
              e.preventDefault();
              handleUndo();
            }
          }
        } else if (e.key.toLowerCase() === 'y' && !e.shiftKey) {
          if (!isInput) {
            e.preventDefault();
            handleRedo();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history]);

  // Responsive Fit Zoom calculation based on container width & height and A4/Letter format
  const handleZoomFit = () => {
    if (previewContainerRef.current) {
      const { clientWidth, clientHeight } = previewContainerRef.current;
      const isA4 = data.customization?.pageSize?.toLowerCase() === 'a4';
      const targetWidth = 794; 
      const targetHeight = isA4 ? 1123 : 1056;
      
      const availableWidth = Math.max(300, clientWidth - 64); // 32px padding on each side
      const availableHeight = Math.max(400, clientHeight - 80);

      const scaleW = availableWidth / targetWidth;
      const scaleH = availableHeight / targetHeight;
      
      // Calculate optimal fit scale using both width and height, clamped between 0.5 and 1.25
      const optimalScale = Math.min(Math.max(Math.min(scaleW, scaleH), 0.5), 1.25);
      setZoomLevel(Number(optimalScale.toFixed(2)));
    } else {
      setZoomLevel(1.0);
    }
  };

  useEffect(() => {
    handleZoomFit();
  }, []);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(Number((prev + 0.05).toFixed(2)), 1.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(Number((prev - 0.05).toFixed(2)), 0.4));

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

          <span className="text-[12px] font-medium text-emerald-700 hidden md:inline-flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-600" /> {saveStatus}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="text-xs px-2.5 py-1.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed font-medium transition-colors cursor-pointer"
            title="Undo (Ctrl+Z)"
          >
            Undo
          </button>
          <button 
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="text-xs px-2.5 py-1.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed font-medium transition-colors cursor-pointer"
            title="Redo (Ctrl+Shift+Z)"
          >
            Redo
          </button>

          <div className="h-4 w-px bg-gray-200 mx-1 hidden sm:block" />

          <button
            onClick={() => setIsTemplateModalOpen(true)}
            className="text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Templates</span>
          </button>

          <button
            onClick={onNextAtEnd}
            className="text-xs font-bold text-white bg-[#111827] hover:bg-black px-3.5 py-1.5 rounded-md flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview & Export</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN SPLIT INTERFACE */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* LEFT PANEL: EDITORS & TABS */}
        <div className="w-full md:w-[500px] lg:w-[540px] xl:w-[580px] h-full flex flex-col bg-white border-r border-[#E5E7EB] shrink-0 overflow-hidden">
          
          {/* Main Top Navigation Tabs */}
          <div className="h-12 border-b border-[#E5E7EB] flex items-center px-4 gap-1 bg-[#FAFAFA] shrink-0">
            <button
              onClick={() => setTopTab('content')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                topTab === 'content'
                  ? 'bg-white text-[#111827] shadow-xs border border-[#E5E7EB]'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Content
            </button>

            <button
              onClick={() => setTopTab('design')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                topTab === 'design'
                  ? 'bg-white text-[#111827] shadow-xs border border-[#E5E7EB]'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              <Paintbrush className="w-3.5 h-3.5" />
              Design & Layout
            </button>
          </div>

          {/* Tab Content Pane */}
          <div className="flex-1 overflow-hidden min-h-0 bg-white">
            {topTab === 'content' && (
              <FormBuilder
                data={data}
                onChange={handleDataChange}
              />
            )}

            {topTab === 'design' && (
              <div className="h-full overflow-y-auto p-4 md:p-6">
                <DesignTab
                  data={data}
                  onChange={handleDataChange}
                />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: LIVE PREVIEW STAGE */}
        <div 
          ref={previewContainerRef}
          className="hidden md:flex flex-1 flex-col bg-[#E5E7EB]/60 relative overflow-hidden"
        >
          {/* Zoom & Canvas Controls Floating Toolbar */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-xs p-1 rounded-lg border border-[#D1D5DB] shadow-md">
            <button
              onClick={handleZoomOut}
              className="p-1.5 text-[#4B5563] hover:text-[#111827] hover:bg-gray-100 rounded transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-bold text-[#4B5563] px-1.5 min-w-[38px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 text-[#4B5563] hover:text-[#111827] hover:bg-gray-100 rounded transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="w-px h-3.5 bg-[#E5E7EB] mx-0.5" />
            <button
              onClick={handleZoomFit}
              className="text-[10px] font-bold text-[#4B5563] hover:text-[#111827] hover:bg-gray-100 px-2 py-1 rounded transition-colors cursor-pointer"
            >
              Fit
            </button>
          </div>

          {/* Interactive Document Sheet Canvas - Centered with balanced padding */}
          <div className="flex-1 overflow-auto flex justify-center items-start p-6 lg:p-10">
            <div 
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
              className="transition-transform duration-100 ease-out my-2"
            >
              <LivePreviewPane data={data} />
            </div>
          </div>
        </div>

      </div>

      {/* Template Selection Modal */}
      <ChangeTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        currentTemplateId={data.templateId}
        currentAccentColor={data.accentColor}
        resumeData={data}
        onApplyTemplate={(newTemplateId, newAccentColor) => {
          handleDataChange({
            ...data,
            templateId: newTemplateId,
            ...(newAccentColor ? { accentColor: newAccentColor } : {}),
          });
          setIsTemplateModalOpen(false);
        }}
      />
    </div>
  );
}
