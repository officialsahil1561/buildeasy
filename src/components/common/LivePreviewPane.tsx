import React from 'react';
import { PortfolioData } from '../../types';
import TemplateRenderer from '../TemplateRenderer';

interface LivePreviewPaneProps {
  data: PortfolioData;
  className?: string;
  isFullView?: boolean;
}

export default function LivePreviewPane({
  data,
  className = '',
  isFullView = false,
}: LivePreviewPaneProps) {
  return (
    <div className={`w-full flex justify-center items-start ${className}`}>
      <div
        id="resume-document-sheet"
        className={`w-full bg-white rounded-lg border border-[#E5E7EB] shadow-[0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-200 ${
          isFullView ? 'max-w-4xl' : 'max-w-2xl'
        }`}
      >

        {/* Dynamic overrides */}
        <style dangerouslySetInnerHTML={{ __html: `
          #resume-document-sheet {
            ${data.accentColor ? `
            --color-accent: ${data.accentColor};
            --tw-text-opacity: 1;
            ` : ''}
          }
          #resume-document-sheet .text-blue-600, #resume-document-sheet .text-blue-700 {
            color: var(--color-accent, #2563EB) !important;
          }
          #resume-document-sheet .bg-blue-600, #resume-document-sheet .bg-blue-700, #resume-document-sheet .bg-gray-900 {
            ${data.accentColor ? `background-color: var(--color-accent) !important; color: #ffffff !important;` : ''}
          }
          #resume-document-sheet .border-blue-600, #resume-document-sheet .border-gray-900, #resume-document-sheet .border-black {
            ${data.accentColor ? `border-color: var(--color-accent) !important;` : ''}
          }
          
          @page {
            size: ${data.customization?.pageSize === 'a4' ? 'A4' : 'letter'} portrait;
            margin: 0;
          }
/* Spacing overrides */
          ${data.customization?.spacing === 'compact' ? `
            #resume-document-sheet .gap-6 { gap: 1rem !important; }
            #resume-document-sheet .gap-5 { gap: 0.75rem !important; }
            #resume-document-sheet .gap-4 { gap: 0.5rem !important; }
            #resume-document-sheet .space-y-6 > * + * { margin-top: 1rem !important; }
            #resume-document-sheet .space-y-5 > * + * { margin-top: 0.75rem !important; }
            #resume-document-sheet .space-y-4 > * + * { margin-top: 0.5rem !important; }
            #resume-document-sheet .mb-8 { margin-bottom: 1.5rem !important; }
            #resume-document-sheet .mb-6 { margin-bottom: 1rem !important; }
            #resume-document-sheet .pb-5 { padding-bottom: 0.75rem !important; }
            #resume-document-sheet { line-height: 1.35 !important; }
          ` : data.customization?.spacing === 'comfortable' ? `
            #resume-document-sheet .gap-6 { gap: 2rem !important; }
            #resume-document-sheet .gap-5 { gap: 1.5rem !important; }
            #resume-document-sheet .gap-4 { gap: 1.25rem !important; }
            #resume-document-sheet .space-y-6 > * + * { margin-top: 2rem !important; }
            #resume-document-sheet .space-y-5 > * + * { margin-top: 1.5rem !important; }
            #resume-document-sheet .space-y-4 > * + * { margin-top: 1.25rem !important; }
            #resume-document-sheet .mb-8 { margin-bottom: 2.5rem !important; }
            #resume-document-sheet .mb-6 { margin-bottom: 2rem !important; }
            #resume-document-sheet .pb-5 { padding-bottom: 1.5rem !important; }
            #resume-document-sheet { line-height: 1.65 !important; }
          ` : ''}
        `}} />

        <TemplateRenderer data={data} />
      </div>
    </div>
  );
}
