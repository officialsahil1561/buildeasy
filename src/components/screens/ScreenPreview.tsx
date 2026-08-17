import React, { useState } from 'react';
import { PortfolioData, TemplateId } from '../../types';
import LivePreviewPane from '../common/LivePreviewPane';
import PillButton from '../common/PillButton';
import ChangeTemplateModal from '../ChangeTemplateModal';
import { generatePdfBlobAndDownload, triggerPdfExport, ExportResult } from '../../lib/exporter';
import { ArrowLeft, Download, LayoutTemplate, ShieldCheck, Loader2, AlertTriangle, Printer } from 'lucide-react';
import ResumeCheckPanel from '../ResumeCheckPanel';
import { TabType } from '../FormBuilder';

interface ScreenPreviewProps {
  data: PortfolioData;
  onBackToEdit: () => void;
  onProceedToExport: (result?: ExportResult) => void;
  onNavigateToTab?: (tabId: TabType) => void;
  onSwitchTemplate: (t: TemplateId, accentColor?: string) => void;
}

export default function ScreenPreview({
  data,
  onBackToEdit,
  onProceedToExport,
  onNavigateToTab,
  onSwitchTemplate,
}: ScreenPreviewProps) {
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isCheckPanelOpen, setIsCheckPanelOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const handleDownloadAndProceed = async () => {
    setIsExporting(true);
    setExportError(null);

    try {
      const res = await generatePdfBlobAndDownload(data);
      setIsExporting(false);
      if (res.success) {
        onProceedToExport(res);
      } else {
        setExportError(res.error || 'Failed to generate PDF file. Please try again.');
      }
    } catch (err: any) {
      setIsExporting(false);
      setExportError(err.message || 'An error occurred while exporting.');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F5F7FA] overflow-hidden">
      {/* Top Review Toolbar */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 md:px-8 py-3 flex flex-wrap justify-between items-center gap-3 shrink-0 select-none">
        
        {/* Left: Edit button */}
        <div className="flex items-center gap-2">
          <PillButton
            variant="secondary"
            onClick={onBackToEdit}
            iconLeft={<ArrowLeft className="w-3.5 h-3.5" />}
            className="text-xs py-2 px-4 cursor-pointer"
          >
            Edit Form
          </PillButton>
        </div>

        {/* Center: Change Template Modal Trigger */}
        <div className="flex items-center gap-2">
          <PillButton
            id="preview-change-template-btn"
            variant="ghost"
            onClick={() => setIsTemplateModalOpen(true)}
            iconLeft={<LayoutTemplate className="w-3.5 h-3.5 text-[#64748B]" />}
            className="text-xs py-1.5 px-3 bg-[#F3F4F6] border border-[#E5E7EB] hover:bg-[#E5E7EB] text-[#0F172A] cursor-pointer"
          >
            <span className="font-semibold">Template:</span>
            <span className="capitalize ml-1 text-[#2563EB] font-bold">{data.templateId}</span>
            {data.accentColor && (
              <span
                className="w-2.5 h-2.5 rounded-full ml-1 border border-black/20"
                style={{ backgroundColor: data.accentColor }}
                title={`Accent: ${data.accentColor}`}
              />
            )}
          </PillButton>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <PillButton
            variant="secondary"
            onClick={() => setIsCheckPanelOpen(true)}
            iconLeft={<ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
            className="text-xs py-2 px-3.5 cursor-pointer"
          >
            Check Resume
          </PillButton>
          <PillButton
            variant="secondary"
            onClick={() => triggerPdfExport(data)}
            iconLeft={<Printer className="w-3.5 h-3.5 text-[#2563EB]" />}
            className="text-xs py-2 px-3.5 bg-[#EFF6FF] border border-[#BFDBFE] hover:bg-[#DBEAFE] text-[#1D4ED8] cursor-pointer"
            title="Generates 100% vector PDF with selectable, copyable text and clickable links for ATS applications"
          >
            Vector PDF (ATS)
          </PillButton>
          <PillButton
            variant="primary"
            onClick={handleDownloadAndProceed}
            disabled={isExporting}
            iconLeft={isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            className="text-xs py-2 px-4 cursor-pointer disabled:opacity-50"
          >
            {isExporting ? 'Generating...' : 'Download PDF'}
          </PillButton>
        </div>
      </div>

      {exportError && (
        <div className="bg-rose-50 border-b border-rose-200 px-6 py-2.5 text-xs text-rose-700 font-medium flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{exportError}</span>
          </div>
          <button onClick={() => setExportError(null)} className="text-rose-600 hover:text-rose-900 font-bold">Dismiss</button>
        </div>
      )}

      {/* Main Document Review Sheet Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center items-start">
        <LivePreviewPane data={data} isFullView={true} />
      </div>

      {/* Change Template Modal */}
      <ChangeTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        currentTemplateId={data.templateId}
        currentAccentColor={data.accentColor}
        onApplyTemplate={(newTpl, newColor) => {
          onSwitchTemplate(newTpl, newColor);
        }}
        resumeData={data}
      />

      {/* Resume Check Panel */}
      <ResumeCheckPanel
        data={data}
        isOpen={isCheckPanelOpen}
        onClose={() => setIsCheckPanelOpen(false)}
        onNavigateToTab={(tabId) => {
          setIsCheckPanelOpen(false);
          if (onNavigateToTab) onNavigateToTab(tabId);
          else onBackToEdit();
        }}
      />
    </div>
  );
}
