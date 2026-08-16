import React from 'react';
import { PortfolioData } from '../../types';
import PillButton from '../common/PillButton';
import { triggerPdfExport } from '../../lib/exporter';
import { Check, FileText, Download, ArrowLeft, RotateCcw } from 'lucide-react';

interface ScreenExportConfirmationProps {
  data: PortfolioData;
  onEditAgain: () => void;
  onStartOver: () => void;
}

export default function ScreenExportConfirmation({
  data,
  onEditAgain,
  onStartOver,
}: ScreenExportConfirmationProps) {
  const fileName = `${(data.basicInfo.name || 'resume').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-resume.pdf`;
  
  // Calculate approximate rendered PDF size based on payload length
  const approximateSizeKb = Math.max(85, Math.min(240, Math.round(JSON.stringify(data).length / 25 + 60)));

  return (
    <div className="flex-1 overflow-y-auto bg-[#F5F7FA] py-12 px-4 flex justify-center items-center">
      <div className="max-w-md w-full bg-white rounded-[14px] border border-[#E5E7EB] p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] text-center space-y-6">
        
        {/* Small Restrained Success Icon */}
        <div className="w-12 h-12 bg-[#F0FDF4] border border-[#DCFCE7] text-[#16A34A] rounded-full flex items-center justify-center mx-auto">
          <Check className="w-6 h-6 stroke-[2.5]" />
        </div>

        {/* Heading */}
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            Your resume is ready
          </h1>
          <p className="text-sm text-[#6B7280]">
            Your document has been prepared for standard A4 high-resolution print and ATS submission.
          </p>
        </div>

        {/* Lottie Animation */}
        <div className="flex justify-center -my-2">
          <div className="w-[160px] h-[160px] flex items-center justify-center">
            {/* @ts-ignore */}
            <dotlottie-wc
              src="https://lottie.host/acadc4e0-a2ac-4929-8d36-23f5f70555fd/n4X7vhkYKN.lottie"
              style={{ width: '160px', height: '160px' }}
              autoplay
              loop
            ></dotlottie-wc>
          </div>
        </div>

        {/* Single File Card */}
        <div className="bg-[#F9FAFB] rounded-[10px] border border-[#E5E7EB] p-4 text-left space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0F172A] flex items-center justify-center text-white shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm text-[#111827] truncate font-mono">
                {fileName}
              </p>
              <div className="flex items-center gap-3 text-xs text-[#6B7280] mt-0.5">
                <span>Format: <strong className="text-[#111827] font-semibold">PDF</strong></span>
                <span>•</span>
                <span>Size: <strong className="text-[#111827] font-semibold">{approximateSizeKb} KB</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <PillButton
            variant="primary"
            onClick={onStartOver}
            iconLeft={<RotateCcw className="w-4 h-4" />}
            className="w-full text-sm py-3 justify-center"
          >
            Start a new resume
          </PillButton>

          <PillButton
            variant="secondary"
            onClick={() => triggerPdfExport(data)}
            iconLeft={<Download className="w-4 h-4" />}
            className="w-full text-xs py-2.5 justify-center"
          >
            Download PDF Again
          </PillButton>
        </div>

        {/* Secondary Edit Action */}
        <div className="pt-3 border-t border-[#E5E7EB] flex justify-center">
          <button
            onClick={onEditAgain}
            className="text-xs font-semibold text-[#4B5563] hover:text-[#111827] flex items-center gap-1.5 transition-colors focus:outline-none focus:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to editor & make changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
