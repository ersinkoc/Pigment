export function rgbToAnsi256(r: number, g: number, b: number): number {
  const clampedR = Math.max(0, Math.min(255, r));
  const clampedG = Math.max(0, Math.min(255, g));
  const clampedB = Math.max(0, Math.min(255, b));

  if (clampedR === clampedG && clampedG === clampedB) {
    if (clampedR < 8) {
      return 16;
    }
    if (clampedR > 248) {
      return 231;
    }
    return Math.round(((clampedR - 8) / 247) * 24) + 232;
  }

  return Math.round(clampedR / 51) * 36 + Math.round(clampedG / 51) * 6 + Math.round(clampedB / 51) + 16;
}
