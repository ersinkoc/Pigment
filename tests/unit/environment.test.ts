import { describe, it, expect } from 'vitest';
import { getEnvironment } from '../../src/utils/environment';

describe('Environment Utility', () => {
  describe('getEnvironment', () => {
    it('should return platform and color support info', () => {
      const env = getEnvironment();

      expect(env).toHaveProperty('isNode');
      expect(env).toHaveProperty('isBrowser');
      expect(env).toHaveProperty('isWindows');
      expect(env).toHaveProperty('isCI');
      expect(env).toHaveProperty('hasTTY');
      expect(env).toHaveProperty('colorSupport');
    });

    it('should return colorSupport with proper structure', () => {
      const env = getEnvironment();

      expect(env.colorSupport).toHaveProperty('level');
      expect(env.colorSupport).toHaveProperty('hasBasic');
      expect(env.colorSupport).toHaveProperty('has256');
      expect(env.colorSupport).toHaveProperty('has16m');
    });

    it('should detect Node.js environment', () => {
      const env = getEnvironment();

      expect(env.isNode).toBe(true);
      expect(env.isBrowser).toBe(false);
    });
  });
});
