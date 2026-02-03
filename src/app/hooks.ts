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





export function useResponsiveBookSize(maxWidth = 900) {
  const [size, setSize] = useState({ width: 0, height: 0,sWidth:0,sHeight:0 });
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const availableWidth = Math.min(vw * 0.95, maxWidth);
      const availableHeight = vh * 0.9;

      let width = availableWidth;
      let height = width / PAGE_ASPECT;

      if (height > availableHeight) {
        height = availableHeight;
        width = height * PAGE_ASPECT;
      }

      setSize({
        width: Math.round(width),
        height: Math.round(height),
        sHeight: vh,
        sWidth:vw
      });
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [maxWidth]);

  return size;
}
