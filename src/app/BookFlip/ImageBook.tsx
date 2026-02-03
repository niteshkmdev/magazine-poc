// src/app/ImageBook/ImageBook.tsx
import { FlipBook } from '@/components/FlipBook';
import { ImagePage } from './components/ImagePage';
import { ImageBack, ImageCover } from './components/ImagePageCover';
import { useFlipBookSize } from '../hooks';

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
    const { width, height } = useFlipBookSize();
  return (
    <FlipBook
        width={width}   // spread width

      maxShadowOpacity={0.5}
      height={height}
      size="fixed"
      showCover
      drawShadow
    >
      <ImageCover  />
      {IMAGES.map((src, i) => (
        <ImagePage key={i} src={src} title={`Image ${i + 1}`} />
      ))}
      <ImageBack />
    </FlipBook>
  );
}
