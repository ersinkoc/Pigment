import { describe, it, expect } from 'vitest';
import { hslToRgb } from '../../src/utils/hsl-to-rgb';

describe('HSL to RGB Conversion', () => {
  describe('hslToRgb', () => {
    it('should convert red', () => {
      const result = hslToRgb(0, 100, 50);
      expect(result.r).toBe(255);
      expect(result.g).toBe(0);
      expect(result.b).toBe(0);
    });

    it('should convert green', () => {
      const result = hslToRgb(120, 100, 50);
      expect(result.r).toBe(0);
      expect(result.g).toBe(255);
      expect(result.b).toBe(0);
    });

    it('should convert blue', () => {
      const result = hslToRgb(240, 100, 50);
      expect(result.r).toBe(0);
      expect(result.g).toBe(0);
      expect(result.b).toBe(255);
    });

    it('should convert gray (0% saturation)', () => {
      const result = hslToRgb(0, 0, 50);
      expect(result.r).toBe(128);
      expect(result.g).toBe(128);
      expect(result.b).toBe(128);
    });

    it('should convert white (100% lightness)', () => {
      const result = hslToRgb(0, 0, 100);
      expect(result.r).toBe(255);
      expect(result.g).toBe(255);
      expect(result.b).toBe(255);
    });

    it('should convert black (0% lightness)', () => {
      const result = hslToRgb(0, 0, 0);
      expect(result.r).toBe(0);
      expect(result.g).toBe(0);
      expect(result.b).toBe(0);
    });

    it('should clamp values to 0-255', () => {
      const result = hslToRgb(120, 100, 150);
      expect(result.r).toBe(255);
      expect(result.g).toBe(255);
      expect(result.b).toBe(255);
    });

    it('should clamp negative values', () => {
      const result = hslToRgb(120, 100, -50);
      expect(result.r).toBe(0);
      expect(result.g).toBe(0);
      expect(result.b).toBe(0);
    });

    it('should handle full hue spectrum', () => {
      const colors = [
        hslToRgb(0, 100, 50),
        hslToRgb(60, 100, 50),
        hslToRgb(120, 100, 50),
        hslToRgb(180, 100, 50),
        hslToRgb(240, 100, 50),
        hslToRgb(300, 100, 50)
      ];

      expect(colors[0]).toEqual({ r: 255, g: 0, b: 0 });
      expect(colors[1]).toEqual({ r: 255, g: 255, b: 0 });
      expect(colors[2]).toEqual({ r: 0, g: 255, b:  0 });
      expect(colors[3]).toEqual({ r: 0, g: 255, b: 255 });
      expect(colors[4]).toEqual({ r: 0, g: 0, b: 255 });
      expect(colors[5]).toEqual({ r: 255, g: 0, b: 255 });
    });
  });
});
