import React from 'react';
import { createRoot } from 'react-dom/client';
import { PortfolioData } from '../types';
import TemplateRenderer from '../components/TemplateRenderer';

export async function triggerPdfExport(data: PortfolioData): Promise<void> {
  const baseName = data.resumeName || data.basicInfo?.name || 'My_Resume';
  const sanitizedName = baseName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  
  const filename = sanitizedName ? `${sanitizedName}_Resume` : 'BuildEasy_Resume';

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    // Fallback if popups blocked
    const originalTitle = document.title;
    document.title = filename;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
    return;
  }

  printWindow.document.title = filename;

  // Clone head styles to ensure all Tailwind & custom theme fonts are available
  document.querySelectorAll('link, style').forEach((node) => {
    printWindow.document.head.appendChild(node.cloneNode(true));
  });

  // Inject standard Google Fonts Link explicitly to ensure they render beautifully in new tab
  const fontLink = printWindow.document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=JetBrains+Mono:wght@400;500;600&display=swap';
  printWindow.document.head.appendChild(fontLink);

  // Inject style reset
  const styleReset = printWindow.document.createElement('style');
  styleReset.innerHTML = `
    @page {
      size: ${data.customization?.pageSize === 'a4' ? 'A4' : 'letter'};
      margin: 0;
    }
    body {
      margin: 0 !important;
      padding: 0 !important;
      background-color: #F3F4F6 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    #print-root {
      width: 100% !important;
      height: auto !important;
    }
    .print-instruction-banner {
      background-color: #111827;
      color: white;
      padding: 12px 20px;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 13px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .print-btn {
      background-color: #2563EB;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 12px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .print-btn:hover {
      background-color: #1D4ED8;
    }
    @media print {
      body {
        background-color: white !important;
      }
      .print-instruction-banner {
        display: none !important;
      }
      #print-root {
        padding: 0 !important;
        margin: 0 !important;
        background-color: white !important;
      }
      .resume-container-sheet {
        box-shadow: none !important;
        margin: 0 !important;
        border: none !important;
      }
    }
  `;
  printWindow.document.head.appendChild(styleReset);

  // Set up container structure
  const bodyContainer = printWindow.document.createElement('div');
  bodyContainer.className = 'min-h-screen bg-gray-100 flex flex-col';

  // Create instructions banner
  const banner = printWindow.document.createElement('div');
  banner.className = 'print-instruction-banner';
  banner.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="font-size: 20px;">📄</span>
      <div>
        <strong style="display: block; font-size: 14px;">Your PDF Resume is Ready</strong>
        <span style="font-size: 11px; color: #9CA3AF; display: block; margin-top: 2px;">
          Choose <strong>"Save as PDF"</strong> as Destination and ensure <strong>"Background graphics"</strong> is checked in the print settings.
        </span>
      </div>
    </div>
    <div style="display: flex; gap: 8px;">
      <button class="print-btn" onclick="window.print()">Print / Save PDF</button>
      <button class="print-btn" style="background-color: #374151;" onclick="window.close()">Close Tab</button>
    </div>
  `;
  bodyContainer.appendChild(banner);

  const printRoot = printWindow.document.createElement('div');
  printRoot.id = 'print-root';
  printRoot.className = 'flex-1 flex justify-center items-start py-8 px-4 bg-gray-100 print:bg-white print:py-0 print:px-0';

  const innerWrapper = printWindow.document.createElement('div');
  innerWrapper.className = 'resume-container-sheet w-[816px] bg-white shadow-xl print:shadow-none border border-gray-200 print:border-none';
  printRoot.appendChild(innerWrapper);
  bodyContainer.appendChild(printRoot);

  printWindow.document.body.appendChild(bodyContainer);

  // Render React tree using React 18 createRoot
  const root = createRoot(innerWrapper);
  root.render(<TemplateRenderer data={data} />);

  // Trigger print after rendering completes
  setTimeout(() => {
    printWindow.print();
  }, 450);
}

export function downloadBackupJson(data: PortfolioData): void {
  const nameSlug = (data.resumeName || data.basicInfo?.name || 'resume').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${nameSlug}-resume-data.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
