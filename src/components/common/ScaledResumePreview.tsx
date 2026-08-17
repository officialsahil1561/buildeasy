import React, { useRef, useState, useEffect } from 'react';
import { PortfolioData } from '../../types';
import TemplateRenderer from '../TemplateRenderer';
import { ErrorBoundary } from '../ErrorBoundary';

interface ScaledResumePreviewProps {
  data: PortfolioData;
  className?: string;
  pageWidth?: number; // Base full size page width (default 816px)
  aspectRatio?: number; // Height / Width ratio (default ~1.294 for standard letter paper)
  minHeight?: number | string;
}

/**
 * ScaledResumePreview implements the strict two-layer scaling pattern:
 * 1. Outer Frame (ThumbnailFrame): Fixed or fluid container with overflow: hidden.
 * 2. Inner ScaledPage: Sized to constant 816px, with transform: scale(frameWidth / 816).
 * 
 * Hover effects MUST only be applied to the outer ThumbnailFrame, NEVER the inner ScaledPage.
 */
export default function ScaledResumePreview({
  data,
  className = '',
  pageWidth = 816,
  aspectRatio = 1.2941,
  minHeight,
}: ScaledResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Measure initial width
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

  // Compute scale ratio (default fallback while measuring: 0.3)
  const scale = containerWidth > 0 ? containerWidth / pageWidth : 0.35;
  const scaledHeight = containerWidth > 0 ? containerWidth * aspectRatio : undefined;

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none ${className}`}
      style={{
        height: scaledHeight ? `${scaledHeight}px` : (minHeight || '100%'),
      }}
    >
      <div
        style={{
          width: `${pageWidth}px`,
          minHeight: `${pageWidth * aspectRatio}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          pointerEvents: 'none',
        }}
        className="bg-white"
      >
        <ErrorBoundary>
          <TemplateRenderer data={data} />
        </ErrorBoundary>
      </div>
    </div>
  );
}
