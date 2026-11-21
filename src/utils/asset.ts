/**
 * Prepends the Vite base URL (e.g. `/little-world/` for GitHub Pages or `/` for root/custom domain)
 * to an asset path.
 */
export function assetUrl(path: string): string {
  if (!path || path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}
