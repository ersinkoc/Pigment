import { describe, it, expect } from 'vitest';
import {
  PigmentError,
  PluginError,
  ColorError,
  EnvironmentError,
  KernelError,
  StyleError
} from '../../src/errors';

describe('Error Classes', () => {
  describe('PigmentError', () => {
    it('should create error with message and code', () => {
      const error = new PigmentError('Test error', 'TEST_CODE');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(PigmentError);
      expect(error.message).toBe('Test error');
      expect(error.code).toBe('TEST_CODE');
      expect(error.name).toBe('PigmentError');
    });

    it('should have proper stack trace', () => {
      const error = new PigmentError('Test error', 'TEST_CODE');
      expect(error.stack).toBeDefined();
      expect(error.stack).toContain('PigmentError');
    });

    it('should be throwable', () => {
      expect(() => {
        throw new PigmentError('Thrown error', 'THROWN');
      }).toThrow(PigmentError);
    });

    it('should be catchable', () => {
      try {
        throw new PigmentError('Catch test', 'CATCH_TEST');
      } catch (e) {
        expect(e).toBeInstanceOf(PigmentError);
        expect((e as PigmentError).code).toBe('CATCH_TEST');
      }
    });
  });

  describe('PluginError', () => {
    it('should create error with plugin name and message', () => {
      const error = new PluginError('test-plugin', 'Plugin failed');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(PigmentError);
      expect(error).toBeInstanceOf(PluginError);
      expect(error.message).toBe('[test-plugin] Plugin failed');
      expect(error.code).toBe('PLUGIN_ERROR');
      expect(error.name).toBe('PluginError');
    });

    it('should format message with plugin name prefix', () => {
      const error = new PluginError('my-plugin', 'Initialization failed');
      expect(error.message).toContain('[my-plugin]');
      expect(error.message).toContain('Initialization failed');
    });

    it('should have proper stack trace', () => {
      const error = new PluginError('test-plugin', 'Stack test');
      expect(error.stack).toBeDefined();
    });
  });

  describe('ColorError', () => {
    it('should create error with message', () => {
      const error = new ColorError('Invalid color format');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(PigmentError);
      expect(error).toBeInstanceOf(ColorError);
      expect(error.message).toBe('Invalid color format');
      expect(error.code).toBe('COLOR_ERROR');
      expect(error.name).toBe('ColorError');
    });

    it('should have proper stack trace', () => {
      const error = new ColorError('Stack test');
      expect(error.stack).toBeDefined();
    });

    it('should be used for color validation errors', () => {
      const error = new ColorError('RGB values must be between 0 and 255');
      expect(error.code).toBe('COLOR_ERROR');
    });

    it('should be used for hex color errors', () => {
      const error = new ColorError('Invalid hex color: invalid');
      expect(error.message).toContain('Invalid hex color');
    });
  });

  describe('EnvironmentError', () => {
    it('should create error with message', () => {
      const error = new EnvironmentError('Environment detection failed');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(PigmentError);
      expect(error).toBeInstanceOf(EnvironmentError);
      expect(error.message).toBe('Environment detection failed');
      expect(error.code).toBe('ENVIRONMENT_ERROR');
      expect(error.name).toBe('EnvironmentError');
    });

    it('should have proper stack trace', () => {
      const error = new EnvironmentError('Stack test');
      expect(error.stack).toBeDefined();
    });
  });

  describe('KernelError', () => {
    it('should create error with message', () => {
      const error = new KernelError('Kernel initialization failed');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(PigmentError);
      expect(error).toBeInstanceOf(KernelError);
      expect(error.message).toBe('Kernel initialization failed');
      expect(error.code).toBe('KERNEL_ERROR');
      expect(error.name).toBe('KernelError');
    });

    it('should have proper stack trace', () => {
      const error = new KernelError('Stack test');
      expect(error.stack).toBeDefined();
    });
  });

  describe('StyleError', () => {
    it('should create error with message', () => {
      const error = new StyleError('Unknown style: unknown');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(PigmentError);
      expect(error).toBeInstanceOf(StyleError);
      expect(error.message).toBe('Unknown style: unknown');
      expect(error.code).toBe('STYLE_ERROR');
      expect(error.name).toBe('StyleError');
    });

    it('should have proper stack trace', () => {
      const error = new StyleError('Stack test');
      expect(error.stack).toBeDefined();
    });

    it('should be used for unknown modifier errors', () => {
      const error = new StyleError('Unknown modifier: invalidmod');
      expect(error.message).toContain('Unknown modifier');
    });

    it('should be used for unknown color errors', () => {
      const error = new StyleError('Unknown color: invalidcolor');
      expect(error.message).toContain('Unknown color');
    });
  });

  describe('Error hierarchy', () => {
    it('all errors should extend PigmentError', () => {
      expect(new PluginError('p', 'm')).toBeInstanceOf(PigmentError);
      expect(new ColorError('m')).toBeInstanceOf(PigmentError);
      expect(new EnvironmentError('m')).toBeInstanceOf(PigmentError);
      expect(new KernelError('m')).toBeInstanceOf(PigmentError);
      expect(new StyleError('m')).toBeInstanceOf(PigmentError);
    });

    it('all errors should extend Error', () => {
      expect(new PigmentError('m', 'c')).toBeInstanceOf(Error);
      expect(new PluginError('p', 'm')).toBeInstanceOf(Error);
      expect(new ColorError('m')).toBeInstanceOf(Error);
      expect(new EnvironmentError('m')).toBeInstanceOf(Error);
      expect(new KernelError('m')).toBeInstanceOf(Error);
      expect(new StyleError('m')).toBeInstanceOf(Error);
    });

    it('errors should have unique codes', () => {
      const codes = new Set([
        new PigmentError('', 'CUSTOM').code,
        new PluginError('', '').code,
        new ColorError('').code,
        new EnvironmentError('').code,
        new KernelError('').code,
        new StyleError('').code
      ]);
      // CUSTOM + 5 specific error codes = 6 unique codes
      expect(codes.size).toBe(6);
    });
  });

  describe('Error usage patterns', () => {
    it('should work with try-catch for specific error types', () => {
      const throwColor = () => {
        throw new ColorError('Bad color');
      };

      let caught = false;
      try {
        throwColor();
      } catch (e) {
        if (e instanceof ColorError) {
          caught = true;
          expect(e.code).toBe('COLOR_ERROR');
        }
      }
      expect(caught).toBe(true);
    });

    it('should work with instanceof checks', () => {
      const errors = [
        new PigmentError('test', 'TEST'),
        new PluginError('plugin', 'test'),
        new ColorError('test'),
        new EnvironmentError('test'),
        new KernelError('test'),
        new StyleError('test')
      ];

      for (const error of errors) {
        expect(error instanceof Error).toBe(true);
        expect(error instanceof PigmentError).toBe(true);
      }

      expect(errors[1] instanceof PluginError).toBe(true);
      expect(errors[2] instanceof ColorError).toBe(true);
      expect(errors[3] instanceof EnvironmentError).toBe(true);
      expect(errors[4] instanceof KernelError).toBe(true);
      expect(errors[5] instanceof StyleError).toBe(true);
    });

    it('should preserve error information when re-thrown', () => {
      const original = new StyleError('Original message');

      try {
        try {
          throw original;
        } catch (e) {
          throw e;
        }
      } catch (e) {
        expect(e).toBe(original);
        expect((e as StyleError).message).toBe('Original message');
        expect((e as StyleError).code).toBe('STYLE_ERROR');
      }
    });
  });
});
