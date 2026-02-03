// src/app/ImageBook/ImageCover.tsx
import  { forwardRef } from 'react';

export const ImageCover = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="page image-cover">
      <div className="image-cover-content">
        <h1>Image Book</h1>
        <p>Visual flip-book demo</p>
      </div>
    </div>
  );
});

ImageCover.displayName = 'ImageCover';




export const ImageBack = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="page image-back">
      <div className="image-back-content">
        <p>End of Demo</p>
      </div>
    </div>
  );
});

ImageBack.displayName = 'ImageBack';
