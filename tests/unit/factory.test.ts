import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createPigment } from '../../src/core/factory';
import { BuilderPigment } from '../../src/core/builder';
import { resetColorSupportCache } from '../../src/utils/color-support';

describe('createPigment', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
    resetColorSupportCache();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    resetColorSupportCache();
  });

  describe('Basic creation', () => {
    it('should create a pigment instance', () => {
      const pigment = createPigment();
      expect(pigment).toBeDefined();
      expect(typeof pigment).toBe('function');
    });

    it('should have a builder property', () => {
      const pigment = createPigment();
      expect(pigment.builder).toBeDefined();
      expect(pigment.builder).toBeInstanceOf(BuilderPigment);
    });

    it('should have level property', () => {
      const pigment = createPigment();
      expect(pigment).toHaveProperty('level');
      expect(typeof pigment.level).toBe('number');
    });

    it('should have color level information', () => {
      const pigment = createPigment();
      expect(pigment).toHaveProperty('level');
      expect(typeof pigment.level).toBe('number');
      expect(pigment.level).toBeGreaterThanOrEqual(0);
      expect(pigment.level).toBeLessThanOrEqual(3);
    });
  });

  describe('Options', () => {
    it('should respect level option', () => {
      const pigment = createPigment({ level: 3 });
      expect(pigment.level).toBe(3);
    });

    it('should respect level 0', () => {
      const pigment = createPigment({ level: 0 });
      expect(pigment.level).toBe(0);
    });

    it('should respect level 1', () => {
      const pigment = createPigment({ level: 1 });
      expect(pigment.level).toBe(1);
    });

    it('should respect level 2', () => {
      const pigment = createPigment({ level: 2 });
      expect(pigment.level).toBe(2);
    });

    it('should respect noColor option', () => {
      const pigment = createPigment({ noColor: true });
      expect(pigment.level).toBe(0);
    });

    it('should respect forceColor option', () => {
      const pigment = createPigment({ forceColor: true, level: 3 });
      expect(pigment.level).toBe(3);
    });

    it('should use default level 3 when forceColor is true but level is not specified', () => {
      const pigment = createPigment({ forceColor: true });
      expect(pigment.level).toBe(3);
    });

    it('should prioritize noColor over forceColor', () => {
      const pigment = createPigment({ noColor: true, forceColor: true, level: 3 });
      expect(pigment.level).toBe(0);
    });

    it('should accept custom plugins', () => {
      const customPlugin = {
        name: 'custom-plugin',
        version: '1.0.0',
        install: vi.fn()
      };
      const pigment = createPigment({ plugins: [customPlugin] });
      expect(pigment).toBeDefined();
      expect(customPlugin.install).toHaveBeenCalled();
    });
  });

  describe('Chainable API', () => {
    it('should support modifier chaining', () => {
      const pigment = createPigment({ level: 3 });
      const result = pigment.bold('test');
      expect(result).toContain('test');
      expect(result).toContain('\x1b[1m');
    });

    it('should support color chaining', () => {
      const pigment = createPigment({ level: 3 });
      const result = pigment.red('test');
      expect(result).toContain('test');
      expect(result).toContain('\x1b[31m');
    });

    it('should support combined modifier and color chaining', () => {
      const pigment = createPigment({ level: 3 });
      const result = pigment.bold.red('test');
      expect(result).toContain('test');
      expect(result).toContain('\x1b[1m');
      expect(result).toContain('\x1b[31m');
    });

    it('should support background colors', () => {
      const pigment = createPigment({ level: 3 });
      const result = pigment.bgRed('test');
      expect(result).toContain('test');
      expect(result).toContain('\x1b[41m');
    });

    it('should support bright colors', () => {
      const pigment = createPigment({ level: 3 });
      const result = pigment.redBright('test');
      expect(result).toContain('test');
      expect(result).toContain('\x1b[91m');
    });
  });

  describe('Extended color methods', () => {
    it('should support ansi256 colors', () => {
      const pigment = createPigment({ level: 3 });
      const result = pigment.ansi256(196)('test');
      expect(result).toContain('test');
      expect(result).toContain('\x1b[38;5;196m');
    });

    it('should support bgAnsi256 colors', () => {
      const pigment = createPigment({ level: 3 });
      const result = pigment.bgAnsi256(196)('test');
      expect(result).toContain('test');
      expect(result).toContain('\x1b[48;5;196m');
    });

    it('should support rgb colors', () => {
      const pigment = createPigment({ level: 3 });
      const result = pigment.rgb(255, 0, 0)('test');
      expect(result).toContain('test');
      expect(result).toContain('\x1b[38;2;255;0;0m');
    });

    it('should support bgRgb colors', () => {
      const pigment = createPigment({ level: 3 });
      const result = pigment.bgRgb(255, 0, 0)('test');
      expect(result).toContain('test');
      expect(result).toContain('\x1b[48;2;255;0;0m');
    });

    it('should support hex colors', () => {
      const pigment = createPigment({ level: 3 });
      const result = pigment.hex('#FF0000')('test');
      expect(result).toContain('test');
      expect(result).toContain('\x1b[38;2;255;0;0m');
    });

    it('should support bgHex colors', () => {
      const pigment = createPigment({ level: 3 });
      const result = pigment.bgHex('#FF0000')('test');
      expect(result).toContain('test');
      expect(result).toContain('\x1b[48;2;255;0;0m');
    });

    it('should support hsl colors', () => {
      const pigment = createPigment({ level: 3 });
      const result = pigment.hsl(0, 100, 50)('test');
      expect(result).toContain('test');
      // Red in HSL is (0, 100, 50) which converts to RGB (255, 0, 0)
      expect(result).toContain('\x1b[38;2;255;0;0m');
    });

    it('should support bgHsl colors', () => {
      const pigment = createPigment({ level: 3 });
      const result = pigment.bgHsl(0, 100, 50)('test');
      expect(result).toContain('test');
      expect(result).toContain('\x1b[48;2;255;0;0m');
    });
  });

  describe('Error handling', () => {
    it('should handle invalid hex colors', () => {
      const pigment = createPigment({ level: 3 });
      expect(() => pigment.hex('invalid')('test')).toThrow('Invalid HEX color');
    });

    it('should handle plugin install errors', () => {
      const errorPlugin = {
        name: 'error-plugin',
        version: '1.0.0',
        install: () => {
          throw new Error('Plugin error');
        }
      };
      // createPigment throws when a plugin install fails
      expect(() => createPigment({ plugins: [errorPlugin] })).toThrow('Plugin error');
    });
  });

  describe('Visible method', () => {
    it('should return text when colors are enabled', () => {
      const pigment = createPigment({ level: 3 });
      const result = pigment.visible('test');
      expect(result).toBe('test');
    });

    it('should return empty string when colors are disabled', () => {
      const pigment = createPigment({ level: 0 });
      const result = pigment.visible('test');
      // visible returns empty when colors are not supported
      // since the text would be styled in a way only meaningful with color support
      expect(result).toBe('');
    });
  });
});
