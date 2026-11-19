import type { CSSProperties, ReactNode } from 'react';
import './Blocks.css';

/**
 * Building blocks for project writeups in src/content/projects/*.tsx.
 * Every block accepts an optional `style` prop for one-off custom styling
 * (fonts, colors, sizes, spacing, etc.).
 */

interface BaseProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

const cx = (...names: (string | undefined | false)[]) => names.filter(Boolean).join(' ');

/** A section with an optional heading. */
export function Section({
  title,
  children,
  style,
  className,
}: BaseProps & { title?: ReactNode }) {
  return (
    <section className={cx('pc-section', className)} style={style}>
      {title && <h2 className="pc-h2">{title}</h2>}
      {children}
    </section>
  );
}

/** Smaller sub-heading inside a section. */
export function SubHeading({ children, style, className }: BaseProps) {
  return (
    <h3 className={cx('pc-h3', className)} style={style}>
      {children}
    </h3>
  );
}

/** Body paragraph. */
export function P({ children, style, className }: BaseProps) {
  return (
    <p className={cx('pc-p', className)} style={style}>
      {children}
    </p>
  );
}

/** Large intro paragraph, good for the first lines of a writeup. */
export function Lead({ children, style, className }: BaseProps) {
  return (
    <p className={cx('pc-lead', className)} style={style}>
      {children}
    </p>
  );
}

/** Link. External links open in a new tab automatically. */
export function A({ href, children, style, className }: BaseProps & { href: string }) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={cx('pc-link', className)}
      style={style}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}

/** Image with an optional caption. */
export function Figure({
  src,
  alt = '',
  caption,
  width,
  bordered = true,
  style,
  className,
}: {
  src: string;
  alt?: string;
  caption?: ReactNode;
  /** CSS width, e.g. "60%" or "420px". Defaults to full width. */
  width?: string;
  bordered?: boolean;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <figure className={cx('pc-figure', className)} style={{ width, ...style }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cx('pc-img', bordered && 'pc-img--bordered')}
      />
      {caption && <figcaption className="pc-caption">{caption}</figcaption>}
    </figure>
  );
}

/** Lay out children side by side (stacks on phones). */
export function Columns({
  children,
  count = 2,
  gap = '28px',
  align = 'start',
  style,
  className,
}: BaseProps & { count?: number; gap?: string; align?: 'start' | 'center' | 'end' }) {
  return (
    <div
      className={cx('pc-columns', className)}
      style={{
        gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
        gap,
        alignItems: align,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Large italic quote set in a serif font. */
export function PullQuote({ children, cite, style, className }: BaseProps & { cite?: ReactNode }) {
  return (
    <blockquote className={cx('pc-quote', className)} style={style}>
      <p>{children}</p>
      {cite && <cite>— {cite}</cite>}
    </blockquote>
  );
}

/** Highlighted box for notes, results, or key takeaways. */
export function Callout({
  title,
  children,
  tone = 'note',
  style,
  className,
}: BaseProps & { title?: ReactNode; tone?: 'note' | 'success' | 'warning' }) {
  return (
    <aside className={cx('pc-callout', `pc-callout--${tone}`, className)} style={style}>
      {title && <p className="pc-callout-title">{title}</p>}
      {children}
    </aside>
  );
}

/** Bulleted or numbered list. Pass items as an array. */
export function List({
  items,
  ordered = false,
  style,
  className,
}: {
  items: ReactNode[];
  ordered?: boolean;
  style?: CSSProperties;
  className?: string;
}) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag className={cx('pc-list', className)} style={style}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </Tag>
  );
}

/** Code block. Use a template string for multi-line code. */
export function Code({ children, language, style, className }: BaseProps & { language?: string }) {
  return (
    <pre className={cx('pc-code', className)} style={style} data-language={language}>
      <code>{children}</code>
    </pre>
  );
}

/** Inline code, e.g. <C>torch.compile</C>. */
export function C({ children }: { children: ReactNode }) {
  return <code className="pc-inline-code">{children}</code>;
}

/** Row of key stats, e.g. latency or accuracy numbers. */
export function Stats({ items }: { items: { value: ReactNode; label: ReactNode }[] }) {
  return (
    <div className="pc-stats">
      {items.map((item, i) => (
        <div key={i} className="pc-stat">
          <span className="pc-stat-value">{item.value}</span>
          <span className="pc-stat-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Embedded video (YouTube/Vimeo embed URL or a direct .mp4 path). */
export function Video({ src, title = 'Video', caption }: { src: string; title?: string; caption?: ReactNode }) {
  const isFile = /\.(mp4|webm|mov)$/i.test(src);
  return (
    <figure className="pc-figure">
      <div className="pc-video">
        {isFile ? (
          <video src={src} controls playsInline />
        ) : (
          <iframe
            src={src}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      {caption && <figcaption className="pc-caption">{caption}</figcaption>}
    </figure>
  );
}

/** Single action button styled like the project cards (border, hover invert). */
export function ActionButton({
  href,
  children,
  style,
  className,
}: {
  href: string;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={cx('pc-action-btn', className)}
      style={style}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}

/** Row of action buttons (e.g. GITHUB, TRY HERE!). */
export function ProjectActions({
  children,
  githubUrl,
  tryUrl,
  style,
  className,
}: {
  children?: ReactNode;
  githubUrl?: string;
  tryUrl?: string;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div className={cx('pc-actions', className)} style={style}>
      {githubUrl && <ActionButton href={githubUrl}>GITHUB</ActionButton>}
      {tryUrl && <ActionButton href={tryUrl}>TRY HERE!</ActionButton>}
      {children}
    </div>
  );
}

/** Thin horizontal divider. */
export function Divider() {
  return <hr className="pc-divider" />;
}
