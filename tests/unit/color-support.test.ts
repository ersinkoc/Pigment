import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { detectColorSupport, supportsColor, resetColorSupportCache } from '../../src/utils/color-support';

describe('Color Support Detection', () => {
  const originalEnv = { ...process.env };
  const originalStdout = process.stdout;

  beforeEach(() => {
    // Reset the cached color support
    vi.resetModules();
    resetColorSupportCache();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    resetColorSupportCache();
  });

  describe('detectColorSupport', () => {
    describe('Override level', () => {
      it('should return level 0 when override is 0', () => {
        const result = detectColorSupport(0);
        expect(result.level).toBe(0);
        expect(result.hasBasic).toBe(false);
        expect(result.has256).toBe(false);
        expect(result.has16m).toBe(false);
      });

      it('should return level 1 when override is 1', () => {
        const result = detectColorSupport(1);
        expect(result.level).toBe(1);
        expect(result.hasBasic).toBe(true);
        expect(result.has256).toBe(false);
        expect(result.has16m).toBe(false);
      });

      it('should return level 2 when override is 2', () => {
        const result = detectColorSupport(2);
        expect(result.level).toBe(2);
        expect(result.hasBasic).toBe(true);
        expect(result.has256).toBe(true);
        expect(result.has16m).toBe(false);
      });

      it('should return level 3 when override is 3', () => {
        const result = detectColorSupport(3);
        expect(result.level).toBe(3);
        expect(result.hasBasic).toBe(true);
        expect(result.has256).toBe(true);
        expect(result.has16m).toBe(true);
      });
    });

    describe('NO_COLOR environment variable', () => {
      it('should return level 0 when NO_COLOR is set', async () => {
        vi.resetModules();
        process.env.NO_COLOR = '1';
        delete process.env.FORCE_COLOR;
        const { detectColorSupport: detect } = await import('../../src/utils/color-support');
        const result = detect();
        expect(result.level).toBe(0);
        expect(result.hasBasic).toBe(false);
      });
    });

    describe('FORCE_COLOR environment variable', () => {
      it('should respect FORCE_COLOR=0', async () => {
        vi.resetModules();
        delete process.env.NO_COLOR;
        process.env.FORCE_COLOR = '0';
        const { detectColorSupport: detect } = await import('../../src/utils/color-support');
        const result = detect();
        expect(result.level).toBe(0);
      });

      it('should respect FORCE_COLOR=1', async () => {
        vi.resetModules();
        delete process.env.NO_COLOR;
        process.env.FORCE_COLOR = '1';
        const { detectColorSupport: detect } = await import('../../src/utils/color-support');
        const result = detect();
        expect(result.level).toBe(1);
      });

      it('should respect FORCE_COLOR=2', async () => {
        vi.resetModules();
        delete process.env.NO_COLOR;
        process.env.FORCE_COLOR = '2';
        const { detectColorSupport: detect } = await import('../../src/utils/color-support');
        const result = detect();
        expect(result.level).toBe(2);
      });

      it('should respect FORCE_COLOR=3', async () => {
        vi.resetModules();
        delete process.env.NO_COLOR;
        process.env.FORCE_COLOR = '3';
        const { detectColorSupport: detect } = await import('../../src/utils/color-support');
        const result = detect();
        expect(result.level).toBe(3);
      });

      it('should clamp FORCE_COLOR to max 3', async () => {
        vi.resetModules();
        delete process.env.NO_COLOR;
        process.env.FORCE_COLOR = '10';
        const { detectColorSupport: detect } = await import('../../src/utils/color-support');
        const result = detect();
        expect(result.level).toBeLessThanOrEqual(3);
      });

      it('should clamp negative FORCE_COLOR to 0', async () => {
        vi.resetModules();
        delete process.env.NO_COLOR;
        process.env.FORCE_COLOR = '-1';
        const { detectColorSupport: detect } = await import('../../src/utils/color-support');
        const result = detect();
        expect(result.level).toBeGreaterThanOrEqual(0);
      });
    });

    describe('TERM environment variable', () => {
      it('should return level 3 for truecolor TERM', async () => {
        vi.resetModules();
        delete process.env.NO_COLOR;
        delete process.env.FORCE_COLOR;
        process.env.CI = 'true'; // Ensure we have basic support
        process.env.TERM = 'xterm-truecolor';
        const { detectColorSupport: detect } = await import('../../src/utils/color-support');
        const result = detect();
        expect(result.level).toBe(3);
        expect(result.has16m).toBe(true);
      });

      it('should return level 3 for 24bit TERM', async () => {
        vi.resetModules();
        delete process.env.NO_COLOR;
        delete process.env.FORCE_COLOR;
        process.env.CI = 'true';
        process.env.TERM = 'xterm-24bit';
        const { detectColorSupport: detect } = await import('../../src/utils/color-support');
        const result = detect();
        expect(result.level).toBe(3);
        expect(result.has16m).toBe(true);
      });

      it('should return level 2 for 256color TERM', async () => {
        vi.resetModules();
        delete process.env.NO_COLOR;
        delete process.env.FORCE_COLOR;
        process.env.CI = 'true';
        process.env.TERM = 'xterm-256color';
        const { detectColorSupport: detect } = await import('../../src/utils/color-support');
        const result = detect();
        expect(result.level).toBe(2);
        expect(result.has256).toBe(true);
        expect(result.has16m).toBe(false);
      });
    });

    describe('CI environment', () => {
      it('should return level 1 in CI environment', async () => {
        vi.resetModules();
        delete process.env.NO_COLOR;
        delete process.env.FORCE_COLOR;
        process.env.CI = 'true';
        delete process.env.TERM;
        const { detectColorSupport: detect } = await import('../../src/utils/color-support');
        const result = detect();
        expect(result.level).toBe(1);
        expect(result.hasBasic).toBe(true);
      });
    });

    describe('Default fallback', () => {
      it('should return level 1 as default when no TTY but CI', async () => {
        vi.resetModules();
        delete process.env.NO_COLOR;
        delete process.env.FORCE_COLOR;
        delete process.env.TERM;
        process.env.CI = 'true';
        const { detectColorSupport: detect } = await import('../../src/utils/color-support');
        const result = detect();
        expect(result.level).toBeGreaterThanOrEqual(1);
      });
    });

    describe('Caching', () => {
      it('should cache the result', async () => {
        vi.resetModules();
        delete process.env.NO_COLOR;
        process.env.FORCE_COLOR = '3';
        const { detectColorSupport: detect } = await import('../../src/utils/color-support');

        const result1 = detect();
        const result2 = detect();

        expect(result1).toBe(result2); // Same reference means cached
      });

      it('should not use cache when override level is provided', async () => {
        vi.resetModules();
        const { detectColorSupport: detect } = await import('../../src/utils/color-support');

        const result1 = detect(3);
        const result2 = detect(1);

        expect(result1.level).toBe(3);
        expect(result2.level).toBe(1);
      });
    });
  });

  describe('supportsColor', () => {
    it('should be an alias for detectColorSupport', async () => {
      vi.resetModules();
      process.env.FORCE_COLOR = '3';
      delete process.env.NO_COLOR;
      const { supportsColor: supports, detectColorSupport: detect } = await import('../../src/utils/color-support');

      const result = supports();
      expect(result).toBeDefined();
      expect(result).toHaveProperty('level');
      expect(result).toHaveProperty('hasBasic');
      expect(result).toHaveProperty('has256');
      expect(result).toHaveProperty('has16m');
    });
  });

  describe('Default fallback (TTY detection)', () => {
    it('should return level 1 as default in non-CI TTY environment', async () => {
      vi.resetModules();
      delete process.env.NO_COLOR;
      delete process.env.FORCE_COLOR;
      delete process.env.CI;
      process.env.TERM = 'xterm'; // Basic term, not truecolor or 256color

      // Mock TTY to be true
      const originalIsTTY = process.stdout.isTTY;
      Object.defineProperty(process.stdout, 'isTTY', { value: true, configurable: true });

      const { detectColorSupport: detect } = await import('../../src/utils/color-support');
      const result = detect();
      expect(result.level).toBeGreaterThanOrEqual(1);
      expect(result.hasBasic).toBe(true);

      // Restore
      Object.defineProperty(process.stdout, 'isTTY', { value: originalIsTTY, configurable: true });
    });

    it('should return level 0 when no TTY and no CI', async () => {
      vi.resetModules();
      delete process.env.NO_COLOR;
      delete process.env.FORCE_COLOR;
      delete process.env.CI;
      delete process.env.TERM;

      // Mock TTY to be false
      const originalIsTTY = process.stdout.isTTY;
      Object.defineProperty(process.stdout, 'isTTY', { value: false, configurable: true });

      const { detectColorSupport: detect } = await import('../../src/utils/color-support');
      const result = detect();
      expect(result.level).toBe(0);
      expect(result.hasBasic).toBe(false);

      // Restore
      Object.defineProperty(process.stdout, 'isTTY', { value: originalIsTTY, configurable: true });
    });
  });

  describe('Platform mocking', () => {
    it('should handle isBrowser scenario via mocking', async () => {
      vi.resetModules();

      // Mock the platform module to return isBrowser: true
      vi.doMock('../../src/utils/platform', () => ({
        detectPlatform: () => ({
          isNode: false,
          isBrowser: true,
          isBun: false,
          isDeno: false,
          isCI: false
        }),
        hasTTY: () => false,
        isCI: () => false
      }));

      const { detectColorSupport: detect } = await import('../../src/utils/color-support');
      const result = detect();

      // Browser environments get basic color support (level 1) - conservative default
      // since not all browsers/webviews support full ANSI colors
      expect(result.level).toBe(1);
      expect(result.hasBasic).toBe(true);
      expect(result.has16m).toBe(false);

      vi.doUnmock('../../src/utils/platform');
    });

    it('should handle non-Node non-Browser scenario', async () => {
      vi.resetModules();

      // Mock the platform module to return neither Node nor Browser
      vi.doMock('../../src/utils/platform', () => ({
        detectPlatform: () => ({
          isNode: false,
          isBrowser: false,
          isBun: false,
          isDeno: false,
          isCI: false
        }),
        hasTTY: () => false,
        isCI: () => false
      }));

      const { detectColorSupport: detect } = await import('../../src/utils/color-support');
      const result = detect();

      // Unknown environments get no color support (level 0)
      expect(result.level).toBe(0);
      expect(result.hasBasic).toBe(false);

      vi.doUnmock('../../src/utils/platform');
    });
  });

  describe('resetColorSupportCache', () => {
    it('should clear the cached color support', () => {
      // First call should cache a result
      const first = detectColorSupport();

      // Reset the cache
      resetColorSupportCache();

      // Set a different environment
      process.env.FORCE_COLOR = '0';

      // Second call after reset should detect fresh
      const second = detectColorSupport();

      // The results should be different due to cache reset and env change
      // Note: This tests that reset actually clears the cache
      expect(second.level).toBe(0);
    });

    it('should allow re-detection after reset', () => {
      // Force level 3
      process.env.FORCE_COLOR = '3';
      delete process.env.NO_COLOR;

      resetColorSupportCache();
      const result1 = detectColorSupport();
      expect(result1.level).toBe(3);

      // Change to level 1
      process.env.FORCE_COLOR = '1';
      resetColorSupportCache();
      const result2 = detectColorSupport();
      expect(result2.level).toBe(1);
    });
  });
});
