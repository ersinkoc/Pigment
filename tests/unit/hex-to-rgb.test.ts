import { describe, it, expect } from 'vitest';
import { hexToRgb, validateHex } from '../../src/utils/hex-to-rgb';

describe('HEX to RGB Conversion', () => {
  describe('hexToRgb', () => {
    it('should convert 6-digit HEX', () => {
      const result = hexToRgb('#FF0000');
      expect(result).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('should convert 6-digit HEX without #', () => {
      const result = hexToRgb('FF0000');
      expect(result).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('should convert 3-digit HEX', () => {
      const result = hexToRgb('#F00');
      expect(result).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('should convert 3-digit HEX without #', () => {
      const result = hexToRgb('F00');
      expect(result).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('should convert white', () => {
      const result = hexToRgb('#FFFFFF');
      expect(result).toEqual({ r: 255, g: 255, b: 255 });
    });

    it('should convert black', () => {
      const result = hexToRgb('#000000');
      expect(result).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('should throw ColorError for invalid length', () => {
      expect(() => hexToRgb('FF')).toThrow();
    });

    it('should throw ColorError for invalid characters', () => {
      expect(() => hexToRgb('#GGGGGG')).toThrow();
    });
  });

  describe('validateHex', () => {
    it('should return true for valid 6-digit HEX', () => {
      expect(validateHex('#FF0000')).toBe(true);
    });

    it('should return true for valid 3-digit HEX', () => {
      expect(validateHex('#F00')).toBe(true);
    });

    it('should return true for valid HEX without #', () => {
      expect(validateHex('FF0000')).toBe(true);
    });

    it('should return false for invalid HEX', () => {
      expect(validateHex('invalid')).toBe(false);
    });

    it('should return false for wrong length', () => {
      expect(validateHex('#FF')).toBe(false);
    });

    it('should return false for invalid characters', () => {
      expect(validateHex('#GGGGGG')).toBe(false);
    });
  });
});
