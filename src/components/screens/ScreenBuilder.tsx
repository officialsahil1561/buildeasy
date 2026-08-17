import React, { useState, useEffect } from 'react';
import { PortfolioData, TemplateId } from '../../types';
import FormBuilder, { TabType } from '../FormBuilder';
import DesignTab from '../tabs/DesignTab';
import ATSTab from '../tabs/ATSTab';
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
  const [currentTab, setCurrentTab] = useState<'content' | 'design' | 'ats'>('content');
  const [zoomLevel, setZoomLevel] = useState(0.8);
  const [saveStatus, setSaveStatus] = useState<'Saved' | 'Saving...'>('Saved');
  const [resumeName, setResumeName] = useState(data.resumeName || 'Unnamed Resume');
  const [isExporting, setIsExporting] = useState(false);

  // Autosave status
  useEffect(() => {
    setSaveStatus('Saving...');
    const timer = setTimeout(() => {
        onChange({ ...data, resumeName });
        setSaveStatus('Saved');
    }, 800);
    return () => clearTimeout(timer);
  }, [data, resumeName]);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  const handleZoomFit = () => setZoomLevel(0.8);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F7F8F9] overflow-hidden">
      {/* 1. COMPACT BUILDER HEADER */}
      <header className="h-14 border-b border-[#E5E7EB] bg-white px-4 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-4">
            <button onClick={onBackAtStart} className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"><BuildEasyLogo size="md" /></button>
            <input 
                value={resumeName} 
                onChange={(e) => setResumeName(e.target.value)}
                className="font-bold text-sm border-b border-transparent hover:border-gray-300 focus:border-black outline-none"
            />
            <span className="text-xs text-gray-500">{saveStatus === 'Saved' ? 'Saved ✓' : 'Saving...'}</span>
        </div>
        <div className="flex items-center gap-2">
            <button className="text-sm px-3 py-1 hover:bg-gray-100 rounded">Undo</button>
            <button className="text-sm px-3 py-1 hover:bg-gray-100 rounded">Redo</button>
            <button onClick={async () => {
                setIsExporting(true);
                await triggerPdfExport(data);
                setIsExporting(false);
            }} className="text-sm px-4 py-1 bg-black text-white rounded-full">Export PDF</button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Pane: Editor */}
        <div className="w-[45%] h-full flex flex-col shrink-0 border-r border-[#E5E7EB] bg-white">
            <div className="flex border-b">
                <button onClick={() => setCurrentTab('content')} className={`flex-1 py-3 text-sm font-bold ${currentTab === 'content' ? 'border-b-2 border-black' : 'text-gray-500'}`}>Content</button>
                <button onClick={() => setCurrentTab('design')} className={`flex-1 py-3 text-sm font-bold ${currentTab === 'design' ? 'border-b-2 border-black' : 'text-gray-500'}`}>Design</button>
                <button onClick={() => setCurrentTab('ats')} className={`flex-1 py-3 text-sm font-bold ${currentTab === 'ats' ? 'border-b-2 border-black' : 'text-gray-500'}`}>ATS</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                {currentTab === 'content' && <FormBuilder data={data} onChange={onChange} activeTab="overview" onTabChange={() => {}} onNextAtEnd={() => {}} onBackAtStart={() => {}} />}
                {currentTab === 'design' && <DesignTab data={data} onChange={onChange} />}
                {currentTab === 'ats' && <ATSTab data={data} />}
            </div>
        </div>


        {/* Right Pane: Live Preview */}
        <div className="flex-1 h-full flex flex-col bg-[#F3F4F6] relative">
           <div className="absolute top-4 right-4 flex gap-2 bg-white p-1 rounded-full shadow">
                <button onClick={handleZoomOut} className="p-2 hover:bg-gray-100 rounded-full">-</button>
                <span className="text-xs p-2">{Math.round(zoomLevel * 100)}%</span>
                <button onClick={handleZoomIn} className="p-2 hover:bg-gray-100 rounded-full">+</button>
                <button onClick={handleZoomFit} className="text-xs p-2 hover:bg-gray-100 rounded-full">Fit</button>
           </div>
           
           {/* Scrollable Live Document Sheet */}
           <div className="flex-1 overflow-y-auto p-8 flex justify-center items-start">
             <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center', transition: 'transform 0.2s ease-out' }} className="w-full max-w-4xl flex justify-center pb-20">
               <LivePreviewPane data={data} className="w-full shadow-lg" />
             </div>
           </div>
        </div>

      </div>
    </div>
  );

}
