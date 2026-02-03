// src/app/BookFlip/PdfBook.tsx
import { useEffect, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { FlipBook } from '@/components/FlipBook';
import { PdfPage } from './components/PdfPage';
import '@/assets/css/pdf.css';
import { useFlipBookSize } from '../hooks';
import { PdfBack, PdfCover } from './components/PdfConver';

const PDF_URL =
  'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';

export default function PdfBook() {
  const [pages, setPages] = useState<pdfjs.PDFPageProxy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { width, height } = useFlipBookSize();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);

        const pdf = await pdfjs.getDocument({
          url: PDF_URL,
          withCredentials: false,
        }).promise;

        const loadedPages = await Promise.all(
          Array.from({ length: pdf.numPages }, (_, i) =>
            pdf.getPage(i + 1)
          )
        );

        if (!cancelled) {
          setPages(loadedPages);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        
        if (!cancelled) {
          setError('Failed to load PDF');
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  /* ---------- Fullscreen loading ---------- */
  if (loading) {
    return (
      <div className="pdf-fullscreen pdf-loading">
        <div className="spinner" />
        <p>Loading PDF…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pdf-fullscreen pdf-error">
        <p>{error}</p>
      </div>
    );
  }

  /* ---------- Actual book ---------- */
  return (
    <div className="pdf-fullscreen">
      <FlipBook
         width={width}
        height={height}
        size="fixed"
        showCover
        drawShadow
        maxShadowOpacity={0.5}
      >
        <PdfCover  />
        {pages.map(p => (
          <PdfPage
            key={p.pageNumber}
            page={p}
              width={width}
            height={height}
          />
        ))}
        <PdfBack/>
      </FlipBook>
    </div>
  );
}
