// src/app/ImageBook/ImageBook.tsx
import { FlipBook } from '@/components/FlipBook';
import { ImagePage } from './components/ImagePage';
import { ImageBack, ImageCover } from './components/ImagePageCover';
import {  useResponsiveBookSize } from '../hooks';

const IMAGES = [
  'https://picsum.photos/360/520?random=1',
  'https://picsum.photos/360/520?random=2',
  'https://picsum.photos/360/520?random=3',
  'https://picsum.photos/360/520?random=4',
  'https://picsum.photos/360/520?random=5',
  'https://picsum.photos/360/520?random=6',
  'https://picsum.photos/360/520?random=7',
  'https://picsum.photos/360/520?random=8',
  'https://picsum.photos/360/520?random=9',
  'https://picsum.photos/360/520?random=10',
];


export default function ImageBook() {
     const { width, height,sWidth } = useResponsiveBookSize();
     const isMobile = sWidth < 850;
    const bookKey = `${width}x${height}x${sWidth}`;
  return (
<div className="flip-book-fullscreen">

    <FlipBook
        width={width}   // spread width
      key={bookKey}
    usePortrait={isMobile}
      maxShadowOpacity={isMobile ? 0.2 : 0.5}
      drawShadow={!isMobile}
      height={height}
      size="fixed"
      showCover
    >
      <ImageCover  />
      {IMAGES.map((src, i) => (
        <ImagePage key={i} src={src} title={`Image ${i + 1}`} />
      ))}
      <ImageBack />
    </FlipBook>
    </div>
  );
}
