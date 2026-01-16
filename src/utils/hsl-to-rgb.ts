export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const hNormalized = h / 360;
  const sNormalized = s / 100;
  const lNormalized = l / 100;

  let r: number;
  let g: number;
  let b: number;

  if (sNormalized === 0) {
    r = g = b = lNormalized;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = lNormalized < 0.5 ? lNormalized * (1 + sNormalized) : lNormalized + sNormalized - lNormalized * sNormalized;
    const p = 2 * lNormalized - q;

    r = hue2rgb(p, q, hNormalized + 1 / 3);
    g = hue2rgb(p, q, hNormalized);
    b = hue2rgb(p, q, hNormalized - 1 / 3);
  }

  return {
    r: Math.round(Math.max(0, Math.min(255, r * 255))),
    g: Math.round(Math.max(0, Math.min(255, g * 255))),
    b: Math.round(Math.max(0, Math.min(255, b * 255)))
  };
}
