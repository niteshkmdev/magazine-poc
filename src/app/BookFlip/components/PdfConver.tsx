// src/app/BookFlip/components/PdfCover.tsx
import { forwardRef } from 'react';

export const PdfCover = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="page pdf-cover">
      <div className="pdf-cover-content">
        <h1>PDF Reader</h1>
        <p>Flip-style document preview</p>
      </div>
    </div>
  );
});

PdfCover.displayName = 'PdfCover';



export const PdfBack = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="page pdf-back">
      <div className="pdf-back-content">
        <p>End of PDF</p>
      </div>
    </div>
  );
});

PdfBack.displayName = 'PdfBack';
