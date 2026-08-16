import React, { useState } from 'react';
import { PortfolioData, TemplateId } from '../../types';
import LivePreviewPane from '../common/LivePreviewPane';
import PillButton from '../common/PillButton';
import ChangeTemplateModal from '../ChangeTemplateModal';
import { triggerPdfExport } from '../../lib/exporter';
import { ArrowLeft, Download, LayoutTemplate, ShieldCheck } from 'lucide-react';
import ResumeCheckPanel from '../ResumeCheckPanel';
import { TabType } from '../FormBuilder';

interface ScreenPreviewProps {
  data: PortfolioData;
  onBackToEdit: () => void;
  onProceedToExport: () => void;
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

  const handleDownloadAndProceed = async () => {
    await triggerPdfExport(data);
    onProceedToExport();
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
            className="text-xs py-2 px-4"
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
            className="text-xs py-1.5 px-3 bg-[#F3F4F6] border border-[#E5E7EB] hover:bg-[#E5E7EB] text-[#0F172A]"
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

        {/* Right: Download PDF Action */}
        <div className="flex items-center gap-2">
          <PillButton
            variant="secondary"
            onClick={() => setIsCheckPanelOpen(true)}
            iconLeft={<ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
            className="text-xs py-2 px-4"
          >
            Check Resume
          </PillButton>
          <PillButton
            variant="primary"
            onClick={handleDownloadAndProceed}
            iconLeft={<Download className="w-3.5 h-3.5" />}
            className="text-xs py-2 px-5"
          >
            Download PDF
          </PillButton>
        </div>
      </div>

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
