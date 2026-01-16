import { ColorError } from '../errors.js';

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const hexString = hex.trim().replace(/^#/, '');

  if (hexString.length === 3) {
    const expanded = hexString.split('').map((c) => c + c).join('');
    return parseExpandedHex(expanded);
  }

  if (hexString.length === 6) {
    return parseExpandedHex(hexString);
  }

  throw new ColorError(`Invalid HEX color format: ${hex}. Expected #RRGGBB or #RGB`);
}

function parseExpandedHex(hex: string): { r: number; g: number; b: number } {
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
    throw new ColorError(`Invalid HEX color: ${hex}`);
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return { r, g, b };
}

export function validateHex(hex: string): boolean {
  try {
    hexToRgb(hex);
    return true;
  } catch {
    return false;
  }
}
