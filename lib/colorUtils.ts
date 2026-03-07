/**
 * Convert a hex color to a light tint suitable for section backgrounds.
 * Blends the color with white at ~12% opacity.
 */
export function hexToLightBg(hex: string): string {
  const cleaned = hex.replace('#', '');
  if (cleaned.length !== 6) return hex;

  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) return hex;

  // Mix with white at 12% color intensity
  const mix = (c: number) => Math.round(255 - (255 - c) * 0.12);
  const lr = mix(r);
  const lg = mix(g);
  const lb = mix(b);

  return `#${lr.toString(16).padStart(2, '0')}${lg.toString(16).padStart(2, '0')}${lb.toString(16).padStart(2, '0')}`;
}
