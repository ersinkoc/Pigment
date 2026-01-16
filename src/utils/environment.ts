import type { Platform, ColorSupport } from '../types.js';
import { detectPlatform } from './platform.js';
import { detectColorSupport, supportsColor } from './color-support.js';

export function getEnvironment(): Platform & { colorSupport: ColorSupport } {
  const platform = detectPlatform();
  const colorSupport = detectColorSupport();

  return {
    ...platform,
    colorSupport
  };
}

export { detectPlatform, isNode, isBrowser, isWindows, isCI, hasTTY } from './platform.js';
export { detectColorSupport, supportsColor } from './color-support.js';
export { hexToRgb, validateHex } from './hex-to-rgb.js';
export { hslToRgb } from './hsl-to-rgb.js';
export { rgbToAnsi256 } from './rgb-to-ansi256.js';
