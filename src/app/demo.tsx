// src/app/demos.tsx
import type React from 'react';
import Book from './BookFlip/Book';
import ImageBook from './BookFlip/ImageBook';
import PdfBook from './BookFlip/PdfBook';

export type DemoKey = 'book' | 'image-book' | 'pdf-book';

export const DEMOS: {
  key: DemoKey;
  title: string;
  description: string;
  render: () => React.JSX.Element;
}[] = [
  {
    key: 'book',
    title: 'Flip Book',
    description: 'Pokemon flip-book demo',
    render: () => <Book />,
  },
   {
    key: 'image-book',
    title: 'Image Book',
    description: 'Full-page image flip demo',
    render: () => <ImageBook />,
        },
   {
    key: 'pdf-book',
    title: 'PDF Book',
    render: () => <PdfBook />,
  },
  
];
