import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { detectPlatform, isNode, isBrowser, isWindows, isCI, hasTTY } from '../../src/utils/platform';

describe('Platform Detection', () => {
  const originalEnv = { ...process.env };
  const originalPlatform = process.platform;

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  describe('detectPlatform', () => {
    it('should return platform information', () => {
      const platform = detectPlatform();
      expect(platform).toBeDefined();
      expect(typeof platform.isNode).toBe('boolean');
      expect(typeof platform.isBrowser).toBe('boolean');
      expect(typeof platform.isWindows).toBe('boolean');
      expect(typeof platform.isCI).toBe('boolean');
      expect(typeof platform.hasTTY).toBe('boolean');
    });

    it('should detect Node.js environment', () => {
      const platform = detectPlatform();
      // In test environment, we're running in Node
      expect(platform.isNode).toBe(true);
    });

    it('should detect non-browser environment in Node', () => {
      const platform = detectPlatform();
      // In Node.js, there's no window/document
      expect(platform.isBrowser).toBe(false);
    });

    it('should cache platform detection result', async () => {
      vi.resetModules();
      const { detectPlatform: detect } = await import('../../src/utils/platform');

      const result1 = detect();
      const result2 = detect();

      expect(result1).toBe(result2); // Same reference means cached
    });

    it('should detect CI environment', async () => {
      vi.resetModules();
      process.env.CI = 'true';
      const { detectPlatform: detect } = await import('../../src/utils/platform');

      const platform = detect();
      expect(platform.isCI).toBe(true);
    });

    it('should detect CONTINUOUS_INTEGRATION environment', async () => {
      vi.resetModules();
      delete process.env.CI;
      process.env.CONTINUOUS_INTEGRATION = 'true';
      const { detectPlatform: detect } = await import('../../src/utils/platform');

      const platform = detect();
      expect(platform.isCI).toBe(true);
    });

    it('should return false for CI when not in CI environment', async () => {
      vi.resetModules();
      delete process.env.CI;
      delete process.env.CONTINUOUS_INTEGRATION;
      const { detectPlatform: detect } = await import('../../src/utils/platform');

      const platform = detect();
      expect(platform.isCI).toBe(false);
    });
  });

  describe('isNode', () => {
    it('should return true in Node.js environment', () => {
      const result = isNode();
      expect(result).toBe(true);
    });
  });

  describe('isBrowser', () => {
    it('should return false in Node.js environment', () => {
      const result = isBrowser();
      expect(result).toBe(false);
    });

    it('should detect browser environment when window and document are defined', async () => {
      vi.resetModules();

      // Mock window and document globals
      const originalWindow = (globalThis as any).window;
      const originalDocument = (globalThis as any).document;

      (globalThis as any).window = {};
      (globalThis as any).document = {};

      const { detectPlatform: detect } = await import('../../src/utils/platform');
      const platform = detect();

      // Should detect as browser when both window and document exist
      expect(platform.isBrowser).toBe(true);

      // Cleanup
      if (originalWindow === undefined) {
        delete (globalThis as any).window;
      } else {
        (globalThis as any).window = originalWindow;
      }
      if (originalDocument === undefined) {
        delete (globalThis as any).document;
      } else {
        (globalThis as any).document = originalDocument;
      }
    });
  });

  describe('isWindows', () => {
    it('should detect Windows platform correctly', () => {
      const result = isWindows();
      // In test environment, this depends on actual platform
      expect(typeof result).toBe('boolean');
      if (process.platform === 'win32') {
        expect(result).toBe(true);
      } else {
        expect(result).toBe(false);
      }
    });
  });

  describe('isCI', () => {
    it('should return true when CI=true', async () => {
      vi.resetModules();
      process.env.CI = 'true';
      const { isCI: checkCI } = await import('../../src/utils/platform');
      expect(checkCI()).toBe(true);
    });

    it('should return true when CONTINUOUS_INTEGRATION=true', async () => {
      vi.resetModules();
      delete process.env.CI;
      process.env.CONTINUOUS_INTEGRATION = 'true';
      const { isCI: checkCI } = await import('../../src/utils/platform');
      expect(checkCI()).toBe(true);
    });

    it('should return false when not in CI', async () => {
      vi.resetModules();
      delete process.env.CI;
      delete process.env.CONTINUOUS_INTEGRATION;
      const { isCI: checkCI } = await import('../../src/utils/platform');
      expect(checkCI()).toBe(false);
    });
  });

  describe('hasTTY', () => {
    it('should return a boolean', () => {
      const result = hasTTY();
      expect(typeof result).toBe('boolean');
    });

    it('should reflect stdout.isTTY status', () => {
      const result = hasTTY();
      expect(result).toBe(process.stdout?.isTTY === true);
    });
  });
});
