import React, { forwardRef } from 'react';

type ImagePageProps = {
  src: string;
  title?: string;
};

export const ImagePage = forwardRef<HTMLDivElement, ImagePageProps>(
  ({ src, title }, ref) => {
    return (
      <div ref={ref} className="page image-page">
        <img src={src} alt={title ?? 'demo image'} />
        {title && <div className="caption">{title}</div>}
      </div>
    );
  }
);

ImagePage.displayName = 'ImagePage';
