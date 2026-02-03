// src/app/BookFlip/components/PdfPage.tsx
import  { forwardRef, useEffect, useRef } from 'react';
import * as pdfjs from 'pdfjs-dist';
// import workerUrl from 'pdfjs-dist/legacy/build/pdf.worker.min.js?url';
// import workerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

type PdfPageProps = {
  page: pdfjs.PDFPageProxy;
  width: number;
  height: number;
};

export const PdfPage = forwardRef<HTMLDivElement, PdfPageProps>(
  ({ page, width, height }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const viewport = page.getViewport({ scale: 1 });
      const scale = Math.min(
        width / viewport.width,
        height / viewport.height
      );

      const scaledViewport = page.getViewport({ scale });

      canvas.width = Math.floor(scaledViewport.width);
      canvas.height = Math.floor(scaledViewport.height);

      page.render({
        canvas,                 // ✅ REQUIRED in v5
        viewport: scaledViewport,
      });
    }, [page, width, height]);

    return (
      <div ref={ref} className="page pdf-page">
        <canvas ref={canvasRef} />
      </div>
    );
  }
);

PdfPage.displayName = 'PdfPage';
