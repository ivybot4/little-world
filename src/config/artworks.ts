export type FrameStyle = 'ornate-gold' | 'thin-gold' | 'black' | 'dark-wood';

export type ArtworkSize = 'small' | 'medium' | 'large';

export interface ArtworkConfig {
  id: string;
  /** Small image used on the gallery wall */
  thumbnail: string;
  /** Full-resolution image used in the large modal view */
  image: string;
  title: string;
  caption: string;
  frame: FrameStyle;
  size: ArtworkSize;
  /** Intrinsic image width in pixels */
  width: number;
  /** Intrinsic image height in pixels */
  height: number;
}

/**
 * Helper to generate a lightweight SVG data URL placeholder artwork
 * at a given pixel resolution (small for wall thumbnail, full for modal view).
 */
function createPlaceholderSvg(
  w: number,
  h: number,
  bg1: string,
  bg2: string,
  accent: string,
  motif: 'mountains' | 'arch' | 'sun' | 'waves' | 'botanical' | 'geometric'
): string {
  let shape = '';
  if (motif === 'mountains') {
    shape = `
      <circle cx="${w * 0.72}" cy="${h * 0.28}" r="${Math.min(w, h) * 0.12}" fill="${accent}" opacity="0.85"/>
      <polygon points="0,${h} ${w * 0.38},${h * 0.42} ${w * 0.76},${h}" fill="${bg2}" opacity="0.9"/>
      <polygon points="${w * 0.28},${h} ${w * 0.68},${h * 0.34} ${w},${h}" fill="${accent}" opacity="0.55"/>
    `;
  } else if (motif === 'arch') {
    shape = `
      <path d="M ${w * 0.22} ${h * 0.88} L ${w * 0.22} ${h * 0.42} A ${w * 0.28} ${w * 0.28} 0 0 1 ${w * 0.78} ${h * 0.42} L ${w * 0.78} ${h * 0.88} Z" fill="${bg2}"/>
      <circle cx="${w * 0.5}" cy="${h * 0.48}" r="${Math.min(w, h) * 0.14}" fill="${accent}"/>
    `;
  } else if (motif === 'sun') {
    shape = `
      <circle cx="${w * 0.5}" cy="${h * 0.46}" r="${Math.min(w, h) * 0.26}" fill="${accent}" opacity="0.9"/>
      <rect x="0" y="${h * 0.64}" width="${w}" height="${h * 0.36}" fill="${bg2}" opacity="0.82"/>
    `;
  } else if (motif === 'waves') {
    shape = `
      <path d="M 0 ${h * 0.55} Q ${w * 0.25} ${h * 0.42} ${w * 0.5} ${h * 0.55} T ${w} ${h * 0.55} L ${w} ${h} L 0 ${h} Z" fill="${bg2}"/>
      <path d="M 0 ${h * 0.72} Q ${w * 0.25} ${h * 0.60} ${w * 0.5} ${h * 0.72} T ${w} ${h * 0.72} L ${w} ${h} L 0 ${h} Z" fill="${accent}" opacity="0.75"/>
    `;
  } else if (motif === 'botanical') {
    shape = `
      <ellipse cx="${w * 0.5}" cy="${h * 0.5}" rx="${w * 0.26}" ry="${h * 0.34}" fill="${bg2}" opacity="0.75"/>
      <path d="M ${w * 0.5} ${h * 0.84} Q ${w * 0.48} ${h * 0.5} ${w * 0.54} ${h * 0.18}" stroke="${accent}" stroke-width="${Math.max(2, w * 0.015)}" fill="none"/>
      <ellipse cx="${w * 0.42}" cy="${h * 0.42}" rx="${w * 0.11}" ry="${h * 0.06}" transform="rotate(-28 ${w * 0.42} ${h * 0.42})" fill="${accent}"/>
      <ellipse cx="${w * 0.6}" cy="${h * 0.52}" rx="${w * 0.11}" ry="${h * 0.06}" transform="rotate(24 ${w * 0.6} ${h * 0.52})" fill="${accent}"/>
    `;
  } else {
    shape = `
      <rect x="${w * 0.18}" y="${h * 0.18}" width="${w * 0.46}" height="${h * 0.46}" fill="${bg2}" opacity="0.85"/>
      <circle cx="${w * 0.62}" cy="${h * 0.62}" r="${Math.min(w, h) * 0.22}" fill="${accent}" opacity="0.85"/>
    `;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bg1}"/>
        <stop offset="100%" stop-color="${bg2}"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    ${shape}
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function makeArtworkPair(
  width: number,
  height: number,
  bg1: string,
  bg2: string,
  accent: string,
  motif: 'mountains' | 'arch' | 'sun' | 'waves' | 'botanical' | 'geometric'
) {
  const thumbScale = 0.35;
  const tw = Math.round(width * thumbScale);
  const th = Math.round(height * thumbScale);
  return {
    thumbnail: createPlaceholderSvg(tw, th, bg1, bg2, accent, motif),
    image: createPlaceholderSvg(width, height, bg1, bg2, accent, motif),
  };
}

export const artworks: ArtworkConfig[] = [
  {
    id: 'art-1',
    title: 'Autumn in the Valley',
    caption: 'Oil on linen, 2024 — Study of late afternoon light across the eastern ridge.',
    frame: 'ornate-gold',
    size: 'large',
    width: 960,
    height: 720,
    ...makeArtworkPair(960, 720, '#2c3e35', '#1b2621', '#d98a4c', 'mountains'),
  },
  {
    id: 'art-2',
    title: 'The Quiet Archway',
    caption: 'Gouache on cotton paper, 2023 — Courtyard study in warm ochre and sienna.',
    frame: 'thin-gold',
    size: 'small',
    width: 540,
    height: 720,
    ...makeArtworkPair(540, 720, '#dfd3c3', '#b89f82', '#9e4733', 'arch'),
  },
  {
    id: 'art-3',
    title: 'Solstice Horizon',
    caption: 'Acrylic on panel, 2024 — Minimalist study of dusk over still water.',
    frame: 'black',
    size: 'medium',
    width: 720,
    height: 720,
    ...makeArtworkPair(720, 720, '#1f2b3d', '#111824', '#e09f5a', 'sun'),
  },
  {
    id: 'art-4',
    title: 'Botanical Study IV',
    caption: 'Drypoint & watercolor, 2022 — Pressed winter foliage from the conservatory.',
    frame: 'dark-wood',
    size: 'small',
    width: 560,
    height: 680,
    ...makeArtworkPair(560, 680, '#e8e1d5', '#c7baa5', '#3d5a45', 'botanical'),
  },
  {
    id: 'art-5',
    title: 'Nocturne in Blue and Gold',
    caption: 'Oil on canvas, 2025 — Coastal tide reflections under a rising moon.',
    frame: 'ornate-gold',
    size: 'medium',
    width: 880,
    height: 600,
    ...makeArtworkPair(880, 600, '#182936', '#0e1922', '#d4a857', 'waves'),
  },
  {
    id: 'art-6',
    title: 'Composition No. 9',
    caption: 'Screenprint on archival paper, 2023 — Geometric balance in vermilion and slate.',
    frame: 'black',
    size: 'small',
    width: 640,
    height: 520,
    ...makeArtworkPair(640, 520, '#d8d2c7', '#9c9589', '#b83c2b', 'geometric'),
  },
  {
    id: 'art-7',
    title: 'Highland Morning',
    caption: 'Oil on wood panel, 2024 — Mist lifting from the northern pines.',
    frame: 'dark-wood',
    size: 'large',
    width: 760,
    height: 980,
    ...makeArtworkPair(760, 980, '#34493e', '#1f2d26', '#e2b878', 'mountains'),
  },
  {
    id: 'art-8',
    title: 'Terracotta Passage',
    caption: 'Casein on board, 2023 — Sunlit colonnade in the old quarter.',
    frame: 'thin-gold',
    size: 'medium',
    width: 620,
    height: 820,
    ...makeArtworkPair(620, 820, '#c88a68', '#8f5236', '#f0d2a8', 'arch'),
  },
  {
    id: 'art-9',
    title: 'Tideline Study',
    caption: 'Watercolor on cold-press paper, 2022 — Evening swell along the jetty.',
    frame: 'thin-gold',
    size: 'small',
    width: 720,
    height: 500,
    ...makeArtworkPair(720, 500, '#2b4454', '#192a35', '#88b2c4', 'waves'),
  },
  {
    id: 'art-10',
    title: 'Herbarium Leaf VII',
    caption: 'Ink and wash, 2024 — Specimen study on handmade mulberry paper.',
    frame: 'ornate-gold',
    size: 'small',
    width: 520,
    height: 680,
    ...makeArtworkPair(520, 680, '#2b241f', '#1a1512', '#c99b52', 'botanical'),
  },
  {
    id: 'art-11',
    title: 'Red Sun Over the Fjord',
    caption: 'Oil on canvas, 2025 — Late winter reflection across frozen water.',
    frame: 'dark-wood',
    size: 'large',
    width: 1020,
    height: 680,
    ...makeArtworkPair(1020, 680, '#2a2433', '#17131d', '#c94a38', 'sun'),
  },
  {
    id: 'art-12',
    title: 'Atelier Study II',
    caption: 'Charcoal and tempera, 2024 — Architectural forms in shadow and light.',
    frame: 'black',
    size: 'medium',
    width: 680,
    height: 800,
    ...makeArtworkPair(680, 800, '#cfc8bc', '#8e8679', '#2b3d4f', 'geometric'),
  },
];
