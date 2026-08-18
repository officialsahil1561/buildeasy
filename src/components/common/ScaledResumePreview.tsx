import React, { useRef, useState, useEffect } from 'react';
import { PortfolioData } from '../../types';
import TemplateRenderer from '../TemplateRenderer';
import { ErrorBoundary } from '../ErrorBoundary';

interface ScaledResumePreviewProps {
  data: PortfolioData;
  className?: string;
  pageWidth?: number; // Base full size page width (default 816px for Letter, 794px for A4)
  aspectRatio?: number; // Height / Width ratio (A4: 1.414, Letter: 1.294)
  interactive?: boolean;
}

export default function ScaledResumePreview({
  data,
  className = '',
  pageWidth,
  aspectRatio,
  interactive = false,
}: ScaledResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const isA4 = data.customization?.pageSize?.toLowerCase() === 'a4';
  const effectivePageWidth = pageWidth || (isA4 ? 794 : 816);
  const effectiveAspectRatio = aspectRatio || (isA4 ? 1.4142 : 1.2941);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => {
      const w = el.clientWidth;
      if (w > 0) {
        setContainerWidth(w);
      }
    };

    updateWidth();

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scale = containerWidth > 0 ? containerWidth / effectivePageWidth : 0.35;
  const scaledHeight = containerWidth > 0 ? containerWidth * effectiveAspectRatio : undefined;

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-white ${className}`}
      style={{
        height: scaledHeight ? `${scaledHeight}px` : undefined,
        aspectRatio: `${1} / ${effectiveAspectRatio}`,
      }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left bg-white"
        style={{
          width: `${effectivePageWidth}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          pointerEvents: interactive ? 'auto' : 'none',
        }}
      >
        <ErrorBoundary>
          <TemplateRenderer data={data} />
        </ErrorBoundary>
      </div>
    </div>
  );
}
