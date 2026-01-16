import { describe, it, expect } from 'vitest';
import { generateModifierCode, generateColorCode, generateAnsi256Code, generateRgbCode, generateResetCode } from '../../src/core/ansi';
import { StyleError } from '../../src/errors';

describe('ANSI Code Generation', () => {
  describe('generateModifierCode', () => {
    it('should generate bold modifier code', () => {
      const result = generateModifierCode('bold');
      expect(result).toEqual({
        name: 'bold',
        code: -1,
        open: '\x1b[1m',
        close: '\x1b[22m',
        type: 'modifier'
      });
    });

    it('should generate dim modifier code', () => {
      const result = generateModifierCode('dim');
      expect(result.open).toBe('\x1b[2m');
      expect(result.close).toBe('\x1b[22m');
    });

    it('should throw StyleError for unknown modifier', () => {
      expect(() => generateModifierCode('unknown')).toThrow(StyleError);
    });
  });

  describe('generateColorCode', () => {
    it('should generate red color code', () => {
      const result = generateColorCode('red', false);
      expect(result).toEqual({
        name: 'red',
        code: 31,
        open: '\x1b[31m',
        close: '\x1b[39m',
        type: 'color',
        background: false
      });
    });

    it('should generate background color code', () => {
      const result = generateColorCode('bgRed', true);
      expect(result.open).toBe('\x1b[41m');
      expect(result.close).toBe('\x1b[49m');
    });

    it('should generate bright color code', () => {
      const result = generateColorCode('redBright', false);
      expect(result.code).toBe(91);
    });

    it('should throw StyleError for unknown color', () => {
      expect(() => generateColorCode('unknown', false)).toThrow(StyleError);
    });

    it('should handle gray alias', () => {
      const result = generateColorCode('gray', false);
      expect(result.code).toBe(90); // blackBright
    });

    it('should handle grey alias', () => {
      const result = generateColorCode('grey', false);
      expect(result.code).toBe(90); // blackBright
    });

    it('should handle bgGray alias', () => {
      const result = generateColorCode('bgGray', true);
      expect(result.code).toBe(100); // bgBlackBright
    });

    it('should handle bgGrey alias', () => {
      const result = generateColorCode('bgGrey', true);
      expect(result.code).toBe(100); // bgBlackBright
    });

    it('should convert foreground color to background when background=true', () => {
      const result = generateColorCode('red', true);
      expect(result.code).toBe(41); // bgRed
    });
  });

  describe('generateAnsi256Code', () => {
    it('should generate valid ANSI 256 code', () => {
      const result = generateAnsi256Code(196, false);
      expect(result.open).toBe('\x1b[38;5;196m');
      expect(result.close).toBe('\x1b[39m');
    });

    it('should generate background ANSI 256 code', () => {
      const result = generateAnsi256Code(196, true);
      expect(result.open).toBe('\x1b[48;5;196m');
      expect(result.close).toBe('\x1b[49m');
    });

    it('should throw StyleError for invalid code (< 0)', () => {
      expect(() => generateAnsi256Code(-1, false)).toThrow(StyleError);
    });

    it('should throw StyleError for invalid code (> 255)', () => {
      expect(() => generateAnsi256Code(256, false)).toThrow(StyleError);
    });
  });

  describe('generateRgbCode', () => {
    it('should generate RGB color code', () => {
      const result = generateRgbCode(255, 0, 0, false);
      expect(result.open).toBe('\x1b[38;2;255;0;0m');
      expect(result.close).toBe('\x1b[39m');
    });

    it('should generate background RGB code', () => {
      const result = generateRgbCode(255, 0, 0, true);
      expect(result.open).toBe('\x1b[48;2;255;0;0m');
      expect(result.close).toBe('\x1b[49m');
    });

    it('should throw StyleError for invalid red value', () => {
      expect(() => generateRgbCode(-1, 0, 0, false)).toThrow(StyleError);
    });

    it('should throw StyleError for invalid green value', () => {
      expect(() => generateRgbCode(0, 256, 0, false)).toThrow(StyleError);
    });

    it('should throw StyleError for invalid blue value', () => {
      expect(() => generateRgbCode(0, 0, 256, false)).toThrow(StyleError);
    });
  });

  describe('generateResetCode', () => {
    it('should generate reset code', () => {
      const result = generateResetCode();
      expect(result).toBe('\x1b[0m');
    });
  });
});
