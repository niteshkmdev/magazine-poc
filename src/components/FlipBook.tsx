import React from 'react'
import HTMLFlipBookRaw, {  } from 'react-pageflip'
import type { IEventProps, IFlipSetting } from 'react-pageflip/build/html-flip-book/settings';

interface IProps extends IFlipSetting, IEventProps {
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
    renderOnlyPageLengthChange?: boolean;
}
type FlipBookProps =
  & React.PropsWithChildren<
      Pick<
        IProps,
        | 'width'
        | 'height'
        | 'size'
        | 'showCover'
        | 'maxShadowOpacity'
        | 'drawShadow'
      >
    >
  & Partial<Omit<IProps,
      | 'width'
      | 'height'
      | 'size'
      | 'showCover'
      | 'maxShadowOpacity'
      | 'drawShadow'
    >>

const HTMLFlipBook = HTMLFlipBookRaw as unknown as React.FC<
  React.PropsWithChildren<Partial<IProps>>
>

export const FlipBook: React.FC<FlipBookProps> = ({
  width,
  height,
  size = 'fixed',
  showCover = false,
  maxShadowOpacity = 0.5,
  drawShadow = true,
  children,
  ...rest
}) => {
  return (
    <HTMLFlipBook
      width={width}
      height={height}
      size={size}
      showCover={showCover}
      maxShadowOpacity={maxShadowOpacity}
      drawShadow={drawShadow}

      /* ---- DEFAULTS (centralized) ---- */
      startPage={0}
      minWidth={315}
      maxWidth={1000}
      minHeight={420}
      maxHeight={1350}
      autoSize
      mobileScrollSupport
      swipeDistance={1}
      flippingTime={1000}
      showPageCorners
      disableFlipByClick={false}
      clickEventForward={false}
      useMouseEvents
      usePortrait={false}
      startZIndex={0}
      className=""
      style={{}}

      {...rest}
    >
      {children}
    </HTMLFlipBook>
  )
}
