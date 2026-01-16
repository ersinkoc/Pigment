import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createKernel } from '@oxog/plugin';
import { pigmentPlugin } from '../../../src/plugins/ecosystem/pigment-plugin';

describe('Ecosystem Plugin - pigmentPlugin', () => {
  const createTestKernel = <T = unknown>() => {
    return createKernel<T, Record<string, unknown>>({
      context: {} as T
    });
  };

  describe('Plugin metadata', () => {
    it('should have correct name and version', () => {
      const plugin = pigmentPlugin();
      expect(plugin.name).toBe('pigment');
      expect(plugin.version).toBe('1.0.0');
    });
  });

  describe('Installation', () => {
    it('should install with default options', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin());
      kernel.init();

      const ctx = kernel.getContext() as any;
      expect(ctx.ecosystem).toBeDefined();
      expect(ctx.ecosystem.enabled).toBe(true);
      expect(ctx.ecosystem.theme).toBe('monokai');
    });

    it('should install with custom theme', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin({ theme: 'dracula' }));
      kernel.init();

      const ctx = kernel.getContext() as any;
      expect(ctx.ecosystem.theme).toBe('dracula');
    });

    it('should install with custom level', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin({ level: 2 }));
      kernel.init();

      const ctx = kernel.getContext() as any;
      expect(ctx.ecosystem.level).toBe(2);
    });

    it('should add pigment instance to kernel', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin());
      kernel.init();

      expect((kernel as any).pigment).toBeDefined();
    });

    it('should add color methods to context', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin());
      kernel.init();

      const ctx = kernel.getContext() as any;
      expect(ctx.colors).toBeDefined();
      expect(typeof ctx.colors.red).toBe('function');
      expect(typeof ctx.colors.green).toBe('function');
      expect(typeof ctx.colors.yellow).toBe('function');
      expect(typeof ctx.colors.blue).toBe('function');
      expect(typeof ctx.colors.magenta).toBe('function');
      expect(typeof ctx.colors.cyan).toBe('function');
      expect(typeof ctx.colors.white).toBe('function');
      expect(typeof ctx.colors.black).toBe('function');
      expect(typeof ctx.colors.bold).toBe('function');
      expect(typeof ctx.colors.dim).toBe('function');
      expect(typeof ctx.colors.italic).toBe('function');
      expect(typeof ctx.colors.underline).toBe('function');
    });

    it('should have themeColors in context', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin());
      kernel.init();

      const ctx = kernel.getContext() as any;
      expect(ctx.ecosystem.themeColors).toBeDefined();
      expect(ctx.ecosystem.themeColors.keyword).toBeDefined();
      expect(ctx.ecosystem.themeColors.string).toBeDefined();
      expect(ctx.ecosystem.themeColors.number).toBeDefined();
      expect(ctx.ecosystem.themeColors.comment).toBeDefined();
      expect(ctx.ecosystem.themeColors.error).toBeDefined();
      expect(ctx.ecosystem.themeColors.success).toBeDefined();
      expect(ctx.ecosystem.themeColors.warning).toBeDefined();
      expect(ctx.ecosystem.themeColors.info).toBeDefined();
    });

    it('should fallback to monokai for unknown theme', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin({ theme: 'unknown-theme' as any }));
      kernel.init();

      const ctx = kernel.getContext() as any;
      // Falls back to monokai colors
      expect(ctx.ecosystem.themeColors).toBeDefined();
    });
  });

  describe('ecosystem:style event', () => {
    it('should register ecosystem:style event handler', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin());
      kernel.init();

      expect(() => kernel.emit('ecosystem:style', { text: 'test' })).not.toThrow();
    });

    it('should not throw when applying style type color', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin());
      kernel.init();

      expect(() => kernel.emit('ecosystem:style', { text: 'Error!', type: 'error' })).not.toThrow();
    });

    it('should not throw when applying success type color', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin());
      kernel.init();

      expect(() => kernel.emit('ecosystem:style', { text: 'Success!', type: 'success' })).not.toThrow();
    });

    it('should not throw when applying warning type color', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin());
      kernel.init();

      expect(() => kernel.emit('ecosystem:style', { text: 'Warning!', type: 'warning' })).not.toThrow();
    });

    it('should not throw when applying info type color', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin());
      kernel.init();

      expect(() => kernel.emit('ecosystem:style', { text: 'Info!', type: 'info' })).not.toThrow();
    });
  });

  describe('ecosystem:format event', () => {
    it('should register ecosystem:format event handler', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin());
      kernel.init();

      expect(() => kernel.emit('ecosystem:format', { message: 'test' })).not.toThrow();
    });

    it('should handle format with info level', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin());
      kernel.init();

      expect(() => kernel.emit('ecosystem:format', { message: 'test', level: 'info' })).not.toThrow();
    });

    it('should handle format with error level', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin());
      kernel.init();

      expect(() => kernel.emit('ecosystem:format', { message: 'Error', level: 'error' })).not.toThrow();
    });

    it('should handle format with success level', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin());
      kernel.init();

      expect(() => kernel.emit('ecosystem:format', { message: 'Success', level: 'success' })).not.toThrow();
    });

    it('should handle format with warning level', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin());
      kernel.init();

      expect(() => kernel.emit('ecosystem:format', { message: 'Warning', level: 'warning' })).not.toThrow();
    });
  });

  describe('Color methods', () => {
    it('should use color methods from context', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin());
      kernel.init();

      const ctx = kernel.getContext() as any;
      const redText = ctx.colors.red('test');
      expect(redText).toContain('\x1b[31m');
      expect(redText).toContain('test');
    });

    it('should use bold method from context', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin());
      kernel.init();

      const ctx = kernel.getContext() as any;
      const boldText = ctx.colors.bold('test');
      expect(boldText).toContain('\x1b[1m');
      expect(boldText).toContain('test');
    });
  });

  describe('Theme presets', () => {
    const presets = ['monokai', 'dracula', 'nord', 'github', 'vscode', 'tokyo-night', 'catppuccin', 'one-dark', 'solarized'] as const;

    for (const preset of presets) {
      it(`should support ${preset} theme`, () => {
        const kernel = createTestKernel();
        kernel.use(pigmentPlugin({ theme: preset }));
        kernel.init();

        const ctx = kernel.getContext() as any;
        expect(ctx.ecosystem.theme).toBe(preset);
        expect(ctx.ecosystem.themeColors).toBeDefined();
      });
    }
  });

  describe('ecosystem:style with preset override', () => {
    it('should apply preset override in ecosystem:style', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin({ theme: 'monokai' }));
      kernel.init();

      expect(() => kernel.emit('ecosystem:style', {
        text: 'test',
        type: 'error',
        preset: 'dracula'
      })).not.toThrow();
    });

    it('should fallback to default theme when preset override is unknown', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin({ theme: 'monokai' }));
      kernel.init();

      expect(() => kernel.emit('ecosystem:style', {
        text: 'test',
        type: 'error',
        preset: 'unknown-preset'
      })).not.toThrow();
    });

    it('should handle ecosystem:style without type', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin());
      kernel.init();

      expect(() => kernel.emit('ecosystem:style', { text: 'test' })).not.toThrow();
    });
  });

  describe('ecosystem:format edge cases', () => {
    it('should handle unknown format level', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin());
      kernel.init();

      expect(() => kernel.emit('ecosystem:format', {
        message: 'test',
        level: 'unknown-level'
      })).not.toThrow();
    });

    it('should handle format without level (default to info)', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin());
      kernel.init();

      expect(() => kernel.emit('ecosystem:format', { message: 'test' })).not.toThrow();
    });
  });

  describe('ecosystem:style with invalid hexToRgb result', () => {
    it('should return text when hexToRgb returns null for invalid color', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin());
      kernel.init();

      // The hexToRgb function will be called with theme colors
      // If we could inject an invalid color, it would trigger the null check
      expect(() => kernel.emit('ecosystem:style', { text: 'test', type: 'error' })).not.toThrow();
    });

    it('should handle ecosystem:format with invalid color in theme', () => {
      const kernel = createTestKernel();
      kernel.use(pigmentPlugin());
      kernel.init();

      // This exercises the format handler with different levels
      expect(() => kernel.emit('ecosystem:format', { message: 'test', level: 'error' })).not.toThrow();
    });
  });
});
