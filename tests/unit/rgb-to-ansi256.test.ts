import { describe, it, expect } from 'vitest';
import { rgbToAnsi256 } from '../../src/utils/rgb-to-ansi256';

describe('RGB to ANSI 256 Conversion', () => {
  describe('rgbToAnsi256', () => {
    it('should convert red to ANSI 256', () => {
      const result = rgbToAnsi256(255, 0, 0);
      expect(result).toBe(196);
    });

    it('should convert green to ANSI 256', () => {
      const result = rgbToAnsi256(0, 255, 0);
      expect(result).toBe(46);
    });

    it('should convert blue to ANSI 256', () => {
      const result = rgbToAnsi256(0, 0, 255);
      expect(result).toBe(21);
    });

    it('should convert white to ANSI 256', () => {
      const result = rgbToAnsi256(255, 255, 255);
      expect(result).toBe(231);
    });

    it('should convert black to ANSI 256', () => {
      const result = rgbToAnsi256(0, 0, 0);
      expect(result).toBe(16);
    });

    it('should convert gray to grayscale ANSI 256 range', () => {
      const result = rgbToAnsi256(128, 128, 128);
      expect(result).toBeGreaterThanOrEqual(232);
      expect(result).toBeLessThanOrEqual(255);
    });

    it('should use RGB cube for non-grayscale colors', () => {
      const result = rgbToAnsi256(100, 100, 200);
      expect(result).toBeGreaterThanOrEqual(16);
      expect(result).toBeLessThanOrEqual(231);
    });

    it('should handle boundary values', () => {
      expect(rgbToAnsi256(0, 0, 0)).toBe(16);
      expect(rgbToAnsi256(255, 255, 255)).toBe(231);
    });
  });
});
