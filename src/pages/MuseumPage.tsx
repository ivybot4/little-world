import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Frame } from '../components/Museum/Frame';
import { artworks, type ArtworkConfig } from '../config/artworks';
import { assetUrl } from '../utils/asset';
import './MuseumPage.css';

/**
 * Coming Soon view for /museum:
 * Displays the crimson wall, wooden floor strip, link back to the world,
 * and a single centered antique frame (/images/museum/frame.png) with
 * "Museum coming soon" inside the frame opening.
 */
export function MuseumPage() {
  return (
    <div className="museum-page museum-page--coming-soon">
      <header className="museum-header">
        <Link to="/" className="museum-back-btn">
          GO BACK
        </Link>
      </header>

      <main className="museum-wall museum-wall--centered" aria-label="Museum">
        <div className="museum-coming-soon-frame">
          <img
            src={assetUrl('/images/museum/frame.png')}
            alt=""
            aria-hidden="true"
            className="museum-coming-soon-img"
            draggable={false}
          />
          <div className="museum-coming-soon-opening">
            <h1 className="museum-coming-soon-text">Museum coming soon</h1>
          </div>
        </div>
      </main>

      <div className="museum-floor" aria-hidden="true">
        <div className="museum-baseboard" />
        <div className="museum-floor-planks" />
      </div>
    </div>
  );
}

/**
 * Full interactive salon gallery implementation preserved for later activation.
 */
export function MuseumGalleryPage() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 767 : false
  );
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionMq.addEventListener('change', onMotionChange);

    const onResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener('resize', onResize);

    return () => {
      motionMq.removeEventListener('change', onMotionChange);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const updateScrollBounds = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(maxScroll - el.scrollLeft > 2);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    updateScrollBounds();
    el.addEventListener('scroll', updateScrollBounds, { passive: true });
    window.addEventListener('resize', updateScrollBounds);
    return () => {
      el.removeEventListener('scroll', updateScrollBounds);
      window.removeEventListener('resize', updateScrollBounds);
    };
  }, [updateScrollBounds, isMobile]);

  const scrollWallBy = useCallback(
    (delta: number) => {
      const el = viewportRef.current;
      if (!el) return;
      el.scrollBy({
        left: delta,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    },
    [reducedMotion]
  );

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (dialogRef.current?.open) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      e.preventDefault();
      el.scrollLeft += delta;
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const dragStateRef = useRef({
    isDown: false,
    startX: 0,
    startScrollLeft: 0,
    didDrag: false,
  });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || e.button !== 0) return;
    const el = viewportRef.current;
    if (!el) return;
    dragStateRef.current = {
      isDown: true,
      startX: e.clientX,
      startScrollLeft: el.scrollLeft,
      didDrag: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = dragStateRef.current;
    if (!state.isDown) return;
    const el = viewportRef.current;
    if (!el) return;
    const dx = e.clientX - state.startX;
    if (Math.abs(dx) > 6) {
      state.didDrag = true;
    }
    if (state.didDrag) {
      el.scrollLeft = state.startScrollLeft - dx;
    }
  };

  const handlePointerUpOrCancel = () => {
    dragStateRef.current.isDown = false;
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (dialogRef.current?.open) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setActiveIndex((prev) =>
            prev === null ? 0 : (prev - 1 + artworks.length) % artworks.length
          );
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setActiveIndex((prev) =>
            prev === null ? 0 : (prev + 1) % artworks.length
          );
        }
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollWallBy(-Math.round(window.innerWidth * 0.45));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollWallBy(Math.round(window.innerWidth * 0.45));
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [scrollWallBy]);

  const handleFrameKeyboardFocus = useCallback(
    (buttonEl: HTMLButtonElement) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const vpRect = viewport.getBoundingClientRect();
      const btnRect = buttonEl.getBoundingClientRect();
      const edgePad = 84;

      if (btnRect.left < vpRect.left + edgePad) {
        const delta = btnRect.left - (vpRect.left + edgePad);
        viewport.scrollBy({
          left: delta,
          behavior: reducedMotion ? 'auto' : 'smooth',
        });
      } else if (btnRect.right > vpRect.right - edgePad) {
        const delta = btnRect.right - (vpRect.right - edgePad);
        viewport.scrollBy({
          left: delta,
          behavior: reducedMotion ? 'auto' : 'smooth',
        });
      }
    },
    [reducedMotion]
  );

  const handleSelectArtwork = useCallback(
    (artwork: ArtworkConfig, buttonEl: HTMLButtonElement) => {
      if (dragStateRef.current.didDrag) {
        dragStateRef.current.didDrag = false;
        return;
      }
      const idx = artworks.findIndex((item) => item.id === artwork.id);
      if (idx === -1) return;

      lastTriggerRef.current = buttonEl;
      setActiveIndex(idx);

      const dialog = dialogRef.current;
      if (dialog && !dialog.open) {
        dialog.showModal();
      }
    },
    []
  );

  const closeLightbox = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) {
      dialog.close();
    }
  }, []);

  const handleDialogClose = useCallback(() => {
    setActiveIndex(null);
    const trigger = lastTriggerRef.current;
    if (trigger) {
      trigger.focus();
    }
  }, []);

  const showPrevArtwork = () => {
    setActiveIndex((prev) =>
      prev === null ? 0 : (prev - 1 + artworks.length) % artworks.length
    );
  };

  const showNextArtwork = () => {
    setActiveIndex((prev) =>
      prev === null ? 0 : (prev + 1) % artworks.length
    );
  };

  const activeArtwork = activeIndex !== null ? artworks[activeIndex] : null;

  return (
    <div className="museum-page">
      <header className="museum-header">
        <Link to="/" className="museum-back-btn">
          GO BACK
        </Link>
      </header>

      <button
        type="button"
        className="museum-scroll-btn museum-scroll-btn--left"
        aria-label="Scroll gallery left"
        disabled={!canScrollLeft}
        onClick={() => scrollWallBy(-Math.round(window.innerWidth * 0.65))}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>

      <button
        type="button"
        className="museum-scroll-btn museum-scroll-btn--right"
        aria-label="Scroll gallery right"
        disabled={!canScrollRight}
        onClick={() => scrollWallBy(Math.round(window.innerWidth * 0.65))}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      <div
        ref={viewportRef}
        className="museum-scroll-viewport"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUpOrCancel}
        onPointerCancel={handlePointerUpOrCancel}
      >
        <div className="museum-scroll-track">
          <main className="museum-wall" aria-label="Museum Gallery Wall">
            <div className="museum-salon-grid">
              {artworks.map((artwork) => (
                <Frame
                  key={artwork.id}
                  artwork={artwork}
                  isMobile={isMobile}
                  onSelect={handleSelectArtwork}
                  onKeyboardFocus={handleFrameKeyboardFocus}
                />
              ))}
            </div>
          </main>

          <div className="museum-floor" aria-hidden="true">
            <div className="museum-baseboard" />
            <div className="museum-floor-planks" />
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="museum-dialog"
        aria-label={activeArtwork?.title ?? 'Artwork detail'}
        onClose={handleDialogClose}
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            closeLightbox();
          }
        }}
      >
        {activeArtwork && (
          <div className="museum-dialog-content">
            <button
              type="button"
              className="museum-dialog-close"
              aria-label="Close artwork view"
              onClick={closeLightbox}
            >
              ×
            </button>

            <div className="museum-dialog-stage">
              <button
                type="button"
                className="museum-dialog-nav museum-dialog-nav--prev"
                aria-label="Previous artwork"
                onClick={showPrevArtwork}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>

              <figure className="museum-dialog-figure">
                <div
                  className={`museum-dialog-frame museum-frame--${activeArtwork.frame}`}
                >
                  <div className="museum-frame-molding">
                    <div className="museum-frame-mat">
                      <img
                        src={activeArtwork.image}
                        alt={activeArtwork.title}
                        width={activeArtwork.width}
                        height={activeArtwork.height}
                        className="museum-dialog-img"
                      />
                    </div>
                  </div>
                </div>

                <figcaption className="museum-dialog-caption">
                  <h2 className="museum-dialog-title">{activeArtwork.title}</h2>
                  <p className="museum-dialog-desc">{activeArtwork.caption}</p>
                </figcaption>
              </figure>

              <button
                type="button"
                className="museum-dialog-nav museum-dialog-nav--next"
                aria-label="Next artwork"
                onClick={showNextArtwork}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
