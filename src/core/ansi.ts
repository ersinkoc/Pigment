import { ANSI_MODIFIERS, ANSI_FOREGROUND_COLORS, ANSI_FOREGROUND_BRIGHT_COLORS, ANSI_BACKGROUND_COLORS, ANSI_BACKGROUND_BRIGHT_COLORS } from '../constants.js';
import type { Style } from '../types.js';
import { StyleError } from '../errors.js';

export function generateModifierCode(name: string): Style {
  const modifier = ANSI_MODIFIERS[name as keyof typeof ANSI_MODIFIERS];
  if (!modifier) {
    throw new StyleError(`Unknown modifier: ${name}`);
  }

  return {
    name,
    code: -1,
    open: modifier.open,
    close: modifier.close,
    type: 'modifier'
  };
}

export function generateColorCode(name: string, background = false): Style {
  // Handle gray/grey aliases - they map to blackBright
  // Use toLowerCase for case-insensitive comparison since proxy passes capitalized names
  let normalizedName = name;
  const lowerName = name.toLowerCase();
  if (lowerName === 'gray' || lowerName === 'grey') {
    normalizedName = 'blackBright';
  } else if (lowerName === 'bggray' || lowerName === 'bggrey') {
    normalizedName = 'bgBlackBright';
  }

  const foregroundColors = { ...ANSI_FOREGROUND_COLORS, ...ANSI_FOREGROUND_BRIGHT_COLORS };
  const backgroundColors = { ...ANSI_BACKGROUND_COLORS, ...ANSI_BACKGROUND_BRIGHT_COLORS };

  // Normalize the lookup name for background colors
  let lookupName = normalizedName;
  if (background && !normalizedName.startsWith('bg')) {
    // Convert 'red' to 'bgRed', 'redBright' to 'bgRedBright'
    lookupName = 'bg' + normalizedName.charAt(0).toUpperCase() + normalizedName.slice(1);
  }

  const allColors = background ? backgroundColors : foregroundColors;
  const code = allColors[lookupName as keyof typeof allColors];

  if (code === undefined) {
    throw new StyleError(`Unknown color: ${name}`);
  }

  const closeCode = background ? 49 : 39;

  return {
    name,
    code,
    open: `\x1b[${code}m`,
    close: `\x1b[${closeCode}m`,
    type: 'color',
    background
  };
}

export function generateAnsi256Code(code: number, background = false): Style {
  if (code < 0 || code > 255) {
    throw new StyleError(`ANSI 256 code must be between 0 and 255, got ${code}`);
  }

  const prefix = background ? 48 : 38;
  const closeCode = background ? 49 : 39;

  return {
    name: `ansi256(${code})`,
    code,
    open: `\x1b[${prefix};5;${code}m`,
    close: `\x1b[${closeCode}m`,
    type: 'color',
    background
  };
}

export function generateRgbCode(r: number, g: number, b: number, background = false): Style {
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    throw new StyleError(`RGB values must be between 0 and 255, got (${r}, ${g}, ${b})`);
  }

  const prefix = background ? 48 : 38;
  const closeCode = background ? 49 : 39;

  return {
    name: `rgb(${r}, ${g}, ${b})`,
    code: -1,
    open: `\x1b[${prefix};2;${r};${g};${b}m`,
    close: `\x1b[${closeCode}m`,
    type: 'color',
    background
  };
}

export function generateResetCode(): string {
  return '\x1b[0m';
}
