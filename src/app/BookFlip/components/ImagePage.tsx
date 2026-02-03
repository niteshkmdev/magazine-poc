import  { forwardRef } from 'react';

type ImagePageProps = {
  src: string;
  title?: string;
};

export const ImagePage = forwardRef<HTMLDivElement, ImagePageProps>(
  ({ src, title }, ref) => {
    return (
      <div ref={ref} className="image-page page">
        <img className='image-el' src={src} alt={title ?? 'demo image'} />
        {title && <div className="caption">{title}</div>}
      </div>
    );
  }
);

ImagePage.displayName = 'ImagePage';
