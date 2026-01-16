import type { Platform } from '../types.js';

let cachedPlatform: Platform | undefined;

export function detectPlatform(): Platform {
  if (cachedPlatform) {
    return cachedPlatform;
  }

  const isNode = typeof process !== 'undefined' && process.versions?.node !== undefined;
  const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
  const isWindows = isNode && process.platform === 'win32';
  const isCI = isNode && (process.env.CI === 'true' || process.env.CONTINUOUS_INTEGRATION === 'true');
  const hasTTY = isNode && process.stdout?.isTTY === true;

  cachedPlatform = { isNode, isBrowser, isWindows, isCI, hasTTY };
  return cachedPlatform;
}

export function isNode(): boolean {
  return detectPlatform().isNode;
}

export function isBrowser(): boolean {
  return detectPlatform().isBrowser;
}

export function isWindows(): boolean {
  return detectPlatform().isWindows;
}

export function isCI(): boolean {
  return detectPlatform().isCI;
}

export function hasTTY(): boolean {
  return detectPlatform().hasTTY;
}
