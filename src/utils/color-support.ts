import type { ColorSupport } from '../types.js';
import { detectPlatform, hasTTY } from './platform.js';

let cachedColorSupport: ColorSupport | undefined;

export function detectColorSupport(overrideLevel?: 0 | 1 | 2 | 3): ColorSupport {
  if (overrideLevel !== undefined) {
    const level = overrideLevel;
    return {
      level,
      hasBasic: level >= 1,
      has256: level >= 2,
      has16m: level >= 3
    };
  }

  if (cachedColorSupport) {
    return cachedColorSupport;
  }

  const platform = detectPlatform();

  if (platform.isBrowser) {
    // Browser console color support varies widely
    // Modern Chrome/Firefox/Edge support colors but not all do TrueColor
    // Default to level 1 (basic colors) - safer for mobile webviews and older browsers
    // Users can override with FORCE_COLOR or level option if they need more
    cachedColorSupport = {
      level: 1,
      hasBasic: true,
      has256: false,
      has16m: false
    };
    return cachedColorSupport;
  }

  if (!platform.isNode) {
    cachedColorSupport = {
      level: 0,
      hasBasic: false,
      has256: false,
      has16m: false
    };
    return cachedColorSupport;
  }

  if (process.env.NO_COLOR) {
    cachedColorSupport = {
      level: 0,
      hasBasic: false,
      has256: false,
      has16m: false
    };
    return cachedColorSupport;
  }

  if (process.env.FORCE_COLOR) {
    const level = parseInt(process.env.FORCE_COLOR, 10);
    const clampedLevel = Math.max(0, Math.min(3, level)) as 0 | 1 | 2 | 3;
    cachedColorSupport = {
      level: clampedLevel,
      hasBasic: clampedLevel >= 1,
      has256: clampedLevel >= 2,
      has16m: clampedLevel >= 3
    };
    return cachedColorSupport;
  }

  if (!hasTTY() && !process.env.CI) {
    cachedColorSupport = {
      level: 0,
      hasBasic: false,
      has256: false,
      has16m: false
    };
    return cachedColorSupport;
  }

  const term = process.env.TERM ?? '';

  if (term.includes('truecolor') || term.includes('24bit')) {
    cachedColorSupport = {
      level: 3,
      hasBasic: true,
      has256: true,
      has16m: true
    };
    return cachedColorSupport;
  }

  if (term.includes('256color')) {
    cachedColorSupport = {
      level: 2,
      hasBasic: true,
      has256: true,
      has16m: false
    };
    return cachedColorSupport;
  }

  if (process.env.CI) {
    cachedColorSupport = {
      level: 1,
      hasBasic: true,
      has256: false,
      has16m: false
    };
    return cachedColorSupport;
  }

  cachedColorSupport = {
    level: 1,
    hasBasic: true,
    has256: false,
    has16m: false
  };
  return cachedColorSupport;
}

export function supportsColor(): ColorSupport {
  return detectColorSupport();
}

/**
 * Reset the cached color support detection.
 * Useful for testing when environment variables change.
 */
export function resetColorSupportCache(): void {
  cachedColorSupport = undefined;
}
