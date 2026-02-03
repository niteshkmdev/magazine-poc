import { useEffect, useState } from "react";
const PAGE_ASPECT = 360 / 520; // width / height

export function useFlipBookSize() {
  const [size, setSize] = useState({ width: 360, height: 520 });

  useEffect(() => {
    function recalc() {
      const padding = 48; // breathing space around book
      const maxWidth = window.innerWidth - padding * 2;
      const maxHeight = window.innerHeight - padding * 2;

      // Fit by height first (more natural for PDFs)
      let height = Math.min(maxHeight, 820);
      let width = height * PAGE_ASPECT;

      // If width overflows, fit by width instead
      if (width > maxWidth) {
        width = Math.min(maxWidth, 640);
        height = width / PAGE_ASPECT;
      }

      setSize({
        width: Math.floor(width),
        height: Math.floor(height),
      });
    }

    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, []);

  return size;
}
