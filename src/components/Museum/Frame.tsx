import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { ArtworkConfig, ArtworkSize } from '../../config/artworks';
import './Frame.css';

export interface FrameProps {
  artwork: ArtworkConfig;
  isMobile?: boolean;
  onSelect: (artwork: ArtworkConfig, buttonEl: HTMLButtonElement) => void;
  onKeyboardFocus?: (buttonEl: HTMLButtonElement) => void;
}

export function computeGridSpans(
  width: number,
  height: number,
  size: ArtworkSize,
  isMobile: boolean
): { rowSpan: number; colSpan: number } {
  const ar = width / height;

  if (isMobile) {
    const targetArea = size === 'large' ? 9 : size === 'medium' ? 6 : 4;
    const rawRows = Math.sqrt(targetArea / ar);
    const rowSpan = Math.max(2, Math.min(4, Math.round(rawRows)));
    const colSpan = Math.max(2, Math.min(5, Math.round(rowSpan * ar)));
    return { rowSpan, colSpan };
  }

  const targetArea = size === 'large' ? 20 : size === 'medium' ? 12 : 6;
  const rawRows = Math.sqrt(targetArea / ar);
  const rowSpan = Math.max(2, Math.min(6, Math.round(rawRows)));
  const colSpan = Math.max(2, Math.min(7, Math.round(rowSpan * ar)));
  return { rowSpan, colSpan };
}

export const Frame = forwardRef<HTMLButtonElement, FrameProps>(function Frame(
  { artwork, isMobile = false, onSelect, onKeyboardFocus },
  forwardedRef
) {
  const innerRef = useRef<HTMLButtonElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useImperativeHandle(forwardedRef, () => innerRef.current as HTMLButtonElement);

  // Single lazy-loading method: IntersectionObserver when frame comes near screen
  useEffect(() => {
    const el = innerRef.current;
    if (!el || shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad]);

  const { rowSpan, colSpan } = computeGridSpans(
    artwork.width,
    artwork.height,
    artwork.size,
    isMobile
  );
  const ar = artwork.width / artwork.height;

  return (
    <div
      className="museum-frame-slot"
      style={{
        gridRow: `span ${rowSpan}`,
        gridColumn: `span ${colSpan}`,
      }}
    >
      <button
        ref={innerRef}
        type="button"
        className={`museum-frame museum-frame--${artwork.frame} museum-frame--${artwork.size}`}
        aria-label={artwork.title}
        style={{ '--ar': ar.toFixed(5) } as React.CSSProperties}
        onClick={(e) => onSelect(artwork, e.currentTarget)}
        onFocus={(e) => {
          if (e.currentTarget.matches(':focus-visible')) {
            onKeyboardFocus?.(e.currentTarget);
          }
        }}
      >
        <span className="museum-frame-molding">
          <span className="museum-frame-mat">
            <span className="museum-frame-canvas">
              {shouldLoad && (
                <img
                  src={artwork.thumbnail || artwork.image}
                  alt=""
                  width={artwork.width}
                  height={artwork.height}
                  className="museum-frame-img"
                  draggable={false}
                />
              )}
            </span>
          </span>
        </span>
      </button>
    </div>
  );
});
