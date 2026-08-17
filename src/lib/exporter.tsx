import React from 'react';
import { createRoot } from 'react-dom/client';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { PortfolioData } from '../types';
import TemplateRenderer from '../components/TemplateRenderer';

export interface ExportResult {
  success: boolean;
  filename: string;
  sizeKb: number;
  blob?: Blob;
  error?: string;
}

export async function generatePdfBlobAndDownload(data: PortfolioData): Promise<ExportResult> {
  const firstName = data.basicInfo?.firstName || data.basicInfo?.name?.split(' ')[0] || 'Resume';
  const lastName = data.basicInfo?.lastName || data.basicInfo?.name?.split(' ').slice(1).join(' ') || '';
  const cleanFirst = firstName.trim().replace(/[^a-zA-Z0-9]/g, '');
  const cleanLast = lastName.trim().replace(/[^a-zA-Z0-9]/g, '');
  const filename = cleanFirst && cleanLast ? `${cleanFirst}_${cleanLast}_Resume.pdf` : cleanFirst ? `${cleanFirst}_Resume.pdf` : 'BuildEasy_Resume.pdf';

  const isA4 = data.customization?.pageSize?.toLowerCase() === 'a4';
  const pdfWidth = isA4 ? 210 : 215.9; // mm
  const pdfHeight = isA4 ? 297 : 279.4; // mm

  // Create offscreen container
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  container.style.width = isA4 ? '794px' : '816px';
  container.style.backgroundColor = '#ffffff';
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(
    <div style={{ width: '100%', backgroundColor: '#ffffff' }}>
      <TemplateRenderer data={data} />
    </div>
  );

  // Wait for fonts & DOM rendering
  await new Promise((resolve) => setTimeout(resolve, 600));

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: isA4 ? 'a4' : 'letter',
    });

    // Calculate exact canvas height per PDF page ratio
    const pageCanvasHeight = (canvas.width * pdfHeight) / pdfWidth;
    const totalPages = Math.max(1, Math.ceil((canvas.height - 10) / pageCanvasHeight));

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) pdf.addPage();

      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = pageCanvasHeight;
      const ctx = pageCanvas.getContext('2d');

      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

        const sourceY = page * pageCanvasHeight;
        const sourceH = Math.min(pageCanvasHeight, canvas.height - sourceY);

        if (sourceH > 0) {
          ctx.drawImage(
            canvas,
            0,
            sourceY,
            canvas.width,
            sourceH,
            0,
            0,
            canvas.width,
            sourceH
          );
        }

        const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.98);
        pdf.addImage(pageImgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }
    }

    const pdfBlob = pdf.output('blob');
    const sizeKb = Math.round((pdfBlob.size / 1024) * 10) / 10;

    // Trigger download
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Clean up offscreen container
    root.unmount();
    document.body.removeChild(container);

    return {
      success: true,
      filename,
      sizeKb,
      blob: pdfBlob,
    };
  } catch (err: any) {
    // Cleanup container
    try {
      root.unmount();
      document.body.removeChild(container);
    } catch (_) {}

    return {
      success: false,
      filename,
      sizeKb: 0,
      error: err.message || 'Failed to generate PDF',
    };
  }
}

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
    const originalTitle = document.title;
    document.title = filename;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
    return;
  }

  printWindow.document.title = filename;

  document.querySelectorAll('link, style').forEach((node) => {
    printWindow.document.head.appendChild(node.cloneNode(true));
  });

  const fontLink = printWindow.document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=JetBrains+Mono:wght@400;500;600&display=swap';
  printWindow.document.head.appendChild(fontLink);

  const styleReset = printWindow.document.createElement('style');
  styleReset.innerHTML = `
    @page {
      size: ${data.customization?.pageSize?.toLowerCase() === 'a4' ? 'A4' : 'letter'};
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
        width: 100% !important;
      }
      section, article, .space-y-5 > div, .space-y-4 > div, .space-y-3 > div, .space-y-2 > div {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
      }
      h1, h2, h3, h4 {
        break-after: avoid !important;
        page-break-after: avoid !important;
      }
    }
  `;
  printWindow.document.head.appendChild(styleReset);

  const bodyContainer = printWindow.document.createElement('div');
  bodyContainer.className = 'min-h-screen bg-gray-100 flex flex-col';

  const banner = printWindow.document.createElement('div');
  banner.className = 'print-instruction-banner';
  banner.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="font-size: 20px;">📄</span>
      <div>
        <strong style="display: block; font-size: 14px;">Your PDF Resume is Ready</strong>
        <span style="font-size: 11px; color: #9CA3AF; display: block; margin-top: 2px;">
          Choose <strong>"Save as PDF"</strong> as Destination and ensure <strong>"Background graphics"</strong> is checked.
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
  const isA4 = data.customization?.pageSize?.toLowerCase() === 'a4';
  const widthClass = isA4 ? 'w-[794px]' : 'w-[816px]';
  innerWrapper.className = `resume-container-sheet ${widthClass} bg-white shadow-xl print:shadow-none border border-gray-200 print:border-none`;
  printRoot.appendChild(innerWrapper);
  bodyContainer.appendChild(printRoot);

  printWindow.document.body.appendChild(bodyContainer);

  const root = createRoot(innerWrapper);
  root.render(<TemplateRenderer data={data} />);

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
