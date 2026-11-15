import { useEffect, useRef, type ReactNode } from 'react';
import './SceneContainer.css';

export interface SceneContainerProps {
  baseImageSrc: string;
  baseImageAlt?: string;
  children?: ReactNode;
}

export function SceneContainer({
  baseImageSrc,
  baseImageAlt = 'Illustrated world landscape',
  children,
}: SceneContainerProps) {
  const viewportRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    // Center the horizontal scroll on portrait mobile screens
    const centerScroll = () => {
      if (el.scrollWidth > el.clientWidth) {
        el.scrollLeft = (el.scrollWidth - el.clientWidth) * 0.5;
      }
    };
    centerScroll();
    window.addEventListener('resize', centerScroll);
    return () => window.removeEventListener('resize', centerScroll);
  }, []);

  return (
    <main className="scene-viewport" ref={viewportRef}>
      <div className="scene-stage">
        <img
          className="scene-base-image"
          src={baseImageSrc}
          alt={baseImageAlt}
          draggable={false}
        />
        {children}
      </div>
    </main>
  );
}
