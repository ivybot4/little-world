import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { books } from '../config/books';
import './LibraryPage.css';

const COUNT = books.length; // 3 books
const COPIES = 12; // 12 copies * 3 books = 36 items on the circular 3D shelf
const TOTAL = COUNT * COPIES;
const HALF = TOTAL / 2;
const ACTIVE_BOOK_STORAGE_KEY = 'libraryActiveBookId';

function smoothstep(x: number) {
  const c = Math.max(0, Math.min(1, x));
  return c * c * (3 - 2 * c);
}

export function LibraryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const stateBookId = (location.state as { activeBookId?: string } | null)?.activeBookId;
  const savedBookId =
    stateBookId ??
    (typeof window !== 'undefined' ? sessionStorage.getItem(ACTIVE_BOOK_STORAGE_KEY) : null);
  const resolvedStartIdx = Math.max(
    0,
    books.findIndex((b) => b.id === savedBookId)
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);
  const shelfRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const maskTitleRef = useRef<HTMLDivElement>(null);
  const maskSubRef = useRef<HTMLDivElement>(null);
  const maskRatingRef = useRef<HTMLDivElement>(null);
  const activeBookIdxRef = useRef<number>(resolvedStartIdx);
  const stepShelfRef = useRef<(delta: number) => void>(() => {});

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = reducedMotionQuery.matches;
    const onMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
    };
    reducedMotionQuery.addEventListener('change', onMotionChange);

    // Start on the middle copy at the resolved book index
    const startIdx = activeBookIdxRef.current;
    let s = startIdx + Math.floor(COPIES / 2) * COUNT;
    let T = s;
    let activeIdx = startIdx;
    sessionStorage.setItem(ACTIVE_BOOK_STORAGE_KEY, books[startIdx].id);

    stepShelfRef.current = (delta: number) => {
      T = Math.round(T + delta);
    };
    let tiltX = 0;
    let tiltY = 0;
    let hoveredTape: number | null = null;
    const lifts = new Float32Array(TOTAL);

    let W = window.innerWidth;
    let V = window.innerHeight;
    let mx = W / 2;
    let my = V / 2;

    let H = 360;
    let ws = 60;
    let d = 190;
    let gap = 12;
    let U = 468;
    let shelfCentreY = V * 0.41;
    const P = 1400;
    let XS: Float32Array = new Float32Array(1);

    const stageEl = stageRef.current!;
    const tapeEls = Array.from(stageEl.querySelectorAll<HTMLDivElement>('.vasari-tape'));
    const spEls = tapeEls.map((el) => el.querySelector<HTMLDivElement>('.sp')!);
    const cvEls = tapeEls.map((el) => el.querySelector<HTMLDivElement>('.cv')!);

    function measure() {
      W = window.innerWidth;
      V = window.innerHeight;
      H = probeRef.current
        ? probeRef.current.getBoundingClientRect().height
        : Math.min(V * 0.47, W * 0.33);
      if (H < 40) H = Math.min(V * 0.47, W * 0.33);
      ws = (H * 78) / 740;
      d = (H * 457) / 739;
      gap = H * 0.032;
      U = W < 768 ? H * 1.05 : H * 1.3;
      shelfCentreY = V * (W <= 767 ? 0.43 : 0.41);

      const maxSteps = Math.ceil((3 * U) / 2) + 4;
      XS = new Float32Array(maxSteps);
      let acc = 0;
      for (let i = 0; i < maxSteps; i++) {
        XS[i] = acc;
        const u = i * 2;
        acc += 2 / (1 + Math.pow(u / U, 1.6));
      }

      for (let v = 0; v < TOTAL; v++) {
        const sp = spEls[v];
        const cv = cvEls[v];
        sp.style.width = `${ws}px`;
        sp.style.left = `${-ws / 2}px`;
        sp.style.transform = `translateZ(${d / 2}px)`;

        cv.style.width = `${d}px`;
        cv.style.left = `${-d / 2}px`;
        cv.style.transform = `rotateY(90deg) translateZ(${ws / 2}px)`;
      }
    }

    measure();
    window.addEventListener('resize', measure);

    function rel(v: number, sVal: number) {
      let r = (v - sVal) % TOTAL;
      if (r < -HALF) r += TOTAL;
      if (r >= HALF) r -= TOTAL;
      return r;
    }

    function B(r: number) {
      if (r <= -1) return -0.5;
      if (r >= 1) return 0.5;
      return (r + Math.sin(Math.PI * r) / Math.PI) / 2;
    }

    function F(r: number) {
      return r * (ws + gap) + (d - ws + 1.4 * gap) * B(r);
    }

    function scl(u: number) {
      return 1 / (1 + Math.pow(Math.abs(u) / U, 1.6));
    }

    function xsc(u: number) {
      const idx = Math.min(XS.length - 1, Math.floor(Math.abs(u) / 2));
      return (u < 0 ? -1 : 1) * XS[idx];
    }

    // Caption swap (mask slide)
    function swapMaskText(maskEl: HTMLDivElement | null, newText: string, dir: number) {
      if (!maskEl) return;
      const dSign = dir >= 0 ? 1 : -1;
      const oldSpans = Array.from(maskEl.querySelectorAll('span'));
      const nextSpan = document.createElement('span');
      nextSpan.className = oldSpans[0]?.className || '';
      nextSpan.textContent = newText;
      maskEl.appendChild(nextSpan);

      if (reducedMotion) {
        oldSpans.forEach((sp) => sp.remove());
        return;
      }

      oldSpans.forEach((sp) => {
        const computed = getComputedStyle(sp).transform;
        const anim = sp.animate(
          [
            { transform: computed === 'none' ? 'translateY(0%)' : computed },
            { transform: `translateY(${-dSign * 105}%)` },
          ],
          {
            duration: 650,
            easing: 'cubic-bezier(.2,.8,.2,1)',
            fill: 'both',
          }
        );
        anim.onfinish = () => sp.remove();
      });

      nextSpan.animate(
        [
          { transform: `translateY(${dSign * 105}%)` },
          { transform: 'translateY(0%)' },
        ],
        {
          duration: 650,
          easing: 'cubic-bezier(.2,.8,.2,1)',
          fill: 'both',
        }
      );
    }

    function updateCaption(newIdx: number, dir: number) {
      activeBookIdxRef.current = newIdx;
      const book = books[newIdx];
      sessionStorage.setItem(ACTIVE_BOOK_STORAGE_KEY, book.id);
      swapMaskText(maskTitleRef.current, book.title, dir);
      swapMaskText(maskSubRef.current, book.author, dir);
      swapMaskText(maskRatingRef.current, book.rating, dir);
    }

    function openActiveBookReview() {
      const idx = ((Math.round(s) % COUNT) + COUNT) % COUNT;
      const book = books[idx];
      if (book) {
        sessionStorage.setItem(ACTIVE_BOOK_STORAGE_KEY, book.id);
        navigate(`/library/${book.id}`);
      }
    }

    // Drag & Click on Shelf
    let isPointerDown = false;
    let dragStartX = 0;
    let dragStartT = 0;
    let wasDragged = false;

    const shelfEl = shelfRef.current!;
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      isPointerDown = true;
      wasDragged = false;
      dragStartX = e.clientX;
      dragStartT = T;
    };

    const onPointerMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;

      if (isPointerDown) {
        const dx = e.clientX - dragStartX;
        if (Math.abs(dx) > 5) {
          wasDragged = true;
        }
        if (wasDragged) {
          T = dragStartT - dx / (ws + gap);
        }
      }

      const target = e.target as HTMLElement | null;
      const tapeTarget = target?.closest<HTMLDivElement>('.vasari-tape');

      if (tapeTarget) {
        hoveredTape = Number(tapeTarget.dataset.v);
      } else {
        hoveredTape = null;
      }
    };

    const onPointerUp = () => {
      if (!isPointerDown) return;
      isPointerDown = false;
      if (wasDragged) {
        T = Math.round(T);
      }
    };

    const onShelfClick = (e: MouseEvent) => {
      if (wasDragged) return;
      const tapeTarget = (e.target as HTMLElement).closest<HTMLDivElement>('.vasari-tape');
      if (tapeTarget) {
        const vIdx = Number(tapeTarget.dataset.v);
        const r = rel(vIdx, s);
        if (Math.abs(r) < 0.45) {
          openActiveBookReview();
        } else {
          T = Math.round(T + r);
        }
        return;
      }
      if (
        Math.abs(e.clientX - W / 2) < 0.55 * d &&
        Math.abs(e.clientY - shelfCentreY) < 0.55 * H
      ) {
        openActiveBookReview();
      }
    };

    const onPointerCancel = () => {
      if (!isPointerDown) return;
      isPointerDown = false;
      if (wasDragged) {
        T = Math.round(T);
      }
    };

    shelfEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerCancel);
    shelfEl.addEventListener('click', onShelfClick);

    // Wheel scrubbing
    let wheelSnapTimer: number | null = null;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      T += (delta / (ws + gap)) * 0.5;
      if (wheelSnapTimer !== null) window.clearTimeout(wheelSnapTimer);
      wheelSnapTimer = window.setTimeout(() => {
        T = Math.round(T);
      }, 160);
    };
    window.addEventListener('wheel', onWheel, { passive: false });

    // Keyboard navigation
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        T = Math.round(T - 1);
      } else if (e.key === 'ArrowRight') {
        T = Math.round(T + 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);

    // Single requestAnimationFrame loop
    let rafId = 0;
    let lastTime = performance.now();

    function tick(now: number) {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      if (reducedMotion) {
        s = T;
      } else {
        const kSpring = isPointerDown && wasDragged ? 18 : 5.2;
        s += (T - s) * (1 - Math.exp(-kSpring * dt));
      }

      if (s > TOTAL * 2 || s < -TOTAL * 2) {
        const shift = Math.trunc(s / COUNT) * COUNT;
        s -= shift;
        T -= shift;
      }

      const nextActive = ((Math.round(s) % COUNT) + COUNT) % COUNT;
      if (nextActive !== activeIdx) {
        const dir = T - s >= 0 ? 1 : -1;
        activeIdx = nextActive;
        updateCaption(activeIdx, dir);
      }

      const onCover =
        Math.abs(T - s) < 0.3 &&
        Math.abs(mx - W / 2) < 0.55 * d &&
        Math.abs(my - shelfCentreY) < 0.55 * H;

      const targetTiltY = onCover
        ? ((mx - W / 2) / (0.55 * d)) * 8
        : ((mx - W / 2) / W) * 4;
      const targetTiltX = onCover ? -((my - shelfCentreY) / (H / 2)) * 5 : 0;

      const easeTilt = reducedMotion ? 1 : 1 - Math.exp(-7 * dt);
      tiltY += (targetTiltY - tiltY) * easeTilt;
      tiltX += (targetTiltX - tiltX) * easeTilt;

      const liftRate = reducedMotion ? 1 : 1 - Math.exp(-12 * dt);
      for (let v = 0; v < TOTAL; v++) {
        const r = rel(v, s);
        const o = smoothstep(Math.max(0, 1 - Math.abs(r)));
        const u = F(r);
        const tapeEl = tapeEls[v];

        if (Math.abs(u) > U * 1.95) {
          tapeEl.style.display = 'none';
          continue;
        }
        tapeEl.style.display = 'block';

        const targetLift = hoveredTape === v && Math.abs(r) > 0.5 ? 1 : 0;
        lifts[v] += (targetLift - lifts[v]) * liftRate;
        const lift = lifts[v];

        const sc = scl(u);
        const k = 1 / sc;
        const z = P * (1 - k) + o * H * 0.1;
        const x = xsc(u) * k;
        const y = (H * 0.5 * (1 - sc) * 0.42 + o * H * 0.012 - lift * H * 0.05) * k;

        const signU = u < 0 ? -1 : u > 0 ? 1 : 0;
        const rotY =
          signU * Math.min(1, Math.abs(u) / U) * 26 * (1 - o) -
          90 * o +
          tiltY * o;
        const rotX = tiltX * o;

        tapeEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        tapeEl.style.zIndex = `${Math.round(3000 + z)}`;

        const spShade = Math.min(0.6, o * 0.55 + (1 - sc) * 0.32);
        const cvShade = (1 - o) * 0.82;
        spEls[v].style.setProperty('--shade', spShade.toFixed(3));
        cvEls[v].style.setProperty('--shade', cvShade.toFixed(3));
        spEls[v].style.opacity = o > 0.92 ? '0' : '1';
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      reducedMotionQuery.removeEventListener('change', onMotionChange);
      window.removeEventListener('resize', measure);
      shelfEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerCancel);
      shelfEl.removeEventListener('click', onShelfClick);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const tapes = [];
  for (let copy = 0; copy < COPIES; copy++) {
    for (let i = 0; i < COUNT; i++) {
      const v = copy * COUNT + i;
      const book = books[i];
      tapes.push(
        <div className="vasari-tape" key={v} data-v={v}>
          <div
            className="vasari-face sp"
            style={
              book.spineImage
                ? {
                    backgroundImage: `url("${book.spineImage}")`,
                    backgroundSize: '100% 100%',
                  }
                : { backgroundColor: book.color }
            }
          >
            {!book.spineImage && (
              <div className="book-spine-inner">
                <span className="book-spine-title">{book.title}</span>
              </div>
            )}
          </div>
          <div
            className="vasari-face cv"
            style={
              book.coverImage
                ? {
                    backgroundImage: `url("${book.coverImage}")`,
                    backgroundSize: '100% 100%',
                  }
                : { backgroundColor: book.color }
            }
          >
            {!book.coverImage && (
              <div className="book-cover-inner">
                <span className="book-cover-author">{book.author}</span>
                <span className="book-cover-title">{book.title}</span>
                <span className="book-cover-ornament">✦</span>
              </div>
            )}
          </div>
        </div>
      );
    }
  }

  const initialBook = books[resolvedStartIdx] ?? books[0];

  return (
    <div className="vasari-archive" ref={rootRef}>
      <div className="vasari-probe" ref={probeRef} />

      {/* Paper grain SVG overlay */}
      <svg className="vasari-grain" aria-hidden="true">
        <defs>
          <pattern
            id="vasari-grain-pat"
            width="220"
            height="220"
            patternUnits="userSpaceOnUse"
          >
            <filter id="vasari-grain-flt" x="0" y="0" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.85"
                numOctaves={3}
                stitchTiles="stitch"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.45  0 0 0 0 0.42  0 0 0 0 0.38  0 0 0 0.22 0"
              />
            </filter>
            <rect width="220" height="220" filter="url(#vasari-grain-flt)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vasari-grain-pat)" />
      </svg>

      {/* Top Go Back button */}
      <header className="library-header">
        <Link to="/" className="library-back-btn">
          GO BACK
        </Link>
      </header>

      {/* Floor shadow */}
      <div className="vasari-floor-shadow" aria-hidden="true" />

      {/* 3D Book Shelf */}
      <section className="vasari-shelf" ref={shelfRef} aria-label="Book Shelf">
        <div className="vasari-stage" ref={stageRef}>
          {tapes}
        </div>
      </section>

      {/* Prev / Next Book Arrow Buttons */}
      <button
        type="button"
        className="vasari-arrow vasari-arrow--prev"
        aria-label="Previous book"
        onClick={() => stepShelfRef.current(-1)}
      >
        <svg viewBox="0 0 24 12" aria-hidden="true">
          <path d="M23 6H2M7 1L2 6l5 5" />
        </svg>
      </button>

      <button
        type="button"
        className="vasari-arrow vasari-arrow--next"
        aria-label="Next book"
        onClick={() => stepShelfRef.current(1)}
      >
        <svg viewBox="0 0 24 12" aria-hidden="true">
          <path d="M1 6h21M17 1l5 5-5 5" />
        </svg>
      </button>

      {/* Caption */}
      <div className="vasari-caption">
        <button
          type="button"
          className="vasari-title-btn"
          onClick={() => {
            const book = books[activeBookIdxRef.current] ?? books[0];
            if (book) {
              sessionStorage.setItem(ACTIVE_BOOK_STORAGE_KEY, book.id);
              navigate(`/library/${book.id}`);
            }
          }}
        >
          <div className="vasari-mask" ref={maskTitleRef}>
            <span className="vasari-cap-title">{initialBook.title}</span>
          </div>
        </button>
        <div className="vasari-mask" ref={maskSubRef}>
          <span className="vasari-cap-sub">{initialBook.author}</span>
        </div>
        <div className="vasari-mask" ref={maskRatingRef}>
          <span className="vasari-cap-rating">{initialBook.rating}</span>
        </div>
        <p className="vasari-cap-hint">
          Click on a book to know more and to read the review.
          <br />
          Hold and drag to the left or right to view other books.
        </p>
      </div>
    </div>
  );
}
