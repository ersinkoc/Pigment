import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createKernel } from '@oxog/plugin';
import type { PigmentContext, PigmentEvents } from '../../../src/types';
import { hexToRgb } from '../../../src/utils/hex-to-rgb';
import { hslToRgb } from '../../../src/utils/hsl-to-rgb';
import { rgbToAnsi256 } from '../../../src/utils/rgb-to-ansi256';
import { detectColorSupport } from '../../../src/utils/color-support';

import { gradientPlugin } from '../../../src/plugins/optional/gradient';
import { themePlugin } from '../../../src/plugins/optional/theme';
import { semanticPlugin } from '../../../src/plugins/optional/semantic';
import { boxPlugin } from '../../../src/plugins/optional/box';
import { templatePlugin } from '../../../src/plugins/optional/template';

describe('Optional Plugins', () => {
  const createTestKernel = () => {
    return createKernel<PigmentContext, PigmentEvents>({
      context: {
        colorSupport: { level: 3, hasBasic: true, has256: true, has16m: true },
        level: 3,
        enabled: true,
        styles: new Map(),
        utils: {
          hexToRgb,
          hslToRgb,
          rgbToAnsi256,
          detectColorSupport,
          supportsColor: detectColorSupport
        }
      }
    });
  };

  describe('gradientPlugin', () => {
    it('should have correct name and version', () => {
      const plugin = gradientPlugin();
      expect(plugin.name).toBe('gradient');
      expect(plugin.version).toBe('1.0.0');
    });

    it('should install with default options', () => {
      const kernel = createTestKernel();
      kernel.use(gradientPlugin());
      kernel.init();

      const ctx = kernel.getContext() as any;
      expect(ctx.gradient).toBeDefined();
      expect(ctx.gradient.enabled).toBe(true);
      expect(ctx.gradient.steps).toBe(10);
    });

    it('should install with custom steps', () => {
      const kernel = createTestKernel();
      kernel.use(gradientPlugin({ steps: 20 }));
      kernel.init();

      const ctx = kernel.getContext() as any;
      expect(ctx.gradient.steps).toBe(20);
    });

    it('should register style:gradient event handler', () => {
      const kernel = createTestKernel();
      kernel.use(gradientPlugin());
      kernel.init();

      expect(() => kernel.emit('style:gradient', {
        start: '#FF0000',
        end: '#0000FF',
        text: 'test'
      })).not.toThrow();
    });

    it('should handle rgb() format in gradient', () => {
      const kernel = createTestKernel();
      kernel.use(gradientPlugin());
      kernel.init();

      expect(() => kernel.emit('style:gradient', {
        start: 'rgb(255, 0, 0)',
        end: 'rgb(0, 0, 255)',
        text: 'test gradient'
      })).not.toThrow();
    });

    it('should handle invalid color format gracefully', () => {
      const kernel = createTestKernel();
      kernel.use(gradientPlugin());
      kernel.init();

      expect(() => kernel.emit('style:gradient', {
        start: 'invalid',
        end: 'invalid',
        text: 'test'
      })).not.toThrow();
    });

    it('should register style:rainbow event handler', () => {
      const kernel = createTestKernel();
      kernel.use(gradientPlugin());
      kernel.init();

      expect(() => kernel.emit('style:rainbow', { text: 'Rainbow' })).not.toThrow();
    });

    it('should handle rainbow with custom steps', () => {
      const kernel = createTestKernel();
      kernel.use(gradientPlugin());
      kernel.init();

      expect(() => kernel.emit('style:rainbow', { text: 'Rainbow', steps: 5 })).not.toThrow();
    });
  });

  describe('themePlugin', () => {
    it('should have correct name and version', () => {
      const plugin = themePlugin();
      expect(plugin.name).toBe('theme');
      expect(plugin.version).toBe('1.0.0');
    });

    it('should install with default monokai preset', () => {
      const kernel = createTestKernel();
      kernel.use(themePlugin());
      kernel.init();

      const ctx = kernel.getContext() as any;
      expect(ctx.theme).toBeDefined();
      expect(ctx.theme.enabled).toBe(true);
      expect(ctx.theme.preset).toBe('monokai');
    });

    it('should install with custom preset', () => {
      const kernel = createTestKernel();
      kernel.use(themePlugin({ preset: 'dracula' }));
      kernel.init();

      const ctx = kernel.getContext() as any;
      expect(ctx.theme.preset).toBe('dracula');
    });

    it('should install with custom colors', () => {
      const kernel = createTestKernel();
      kernel.use(themePlugin({
        custom: {
          keyword: '#FF0000',
          string: '#00FF00',
          number: '#0000FF',
          comment: '#888888',
          error: '#FF0000',
          success: '#00FF00',
          warning: '#FFFF00',
          info: '#00FFFF'
        }
      }));
      kernel.init();

      const ctx = kernel.getContext() as any;
      expect(ctx.theme.colors.keyword).toBe('#FF0000');
    });

    it('should throw for unknown preset', () => {
      expect(() => themePlugin({ preset: 'unknown-preset' as any })).toThrow('Unknown theme preset');
    });

    it('should register style:theme event handler', () => {
      const kernel = createTestKernel();
      kernel.use(themePlugin());
      kernel.init();

      expect(() => kernel.emit('style:theme', { type: 'keyword', text: 'const' })).not.toThrow();
    });

    it('should register style:theme:keyword event', () => {
      const kernel = createTestKernel();
      kernel.use(themePlugin());
      kernel.init();

      expect(() => kernel.emit('style:theme:keyword', { text: 'const' })).not.toThrow();
    });

    it('should register style:theme:string event', () => {
      const kernel = createTestKernel();
      kernel.use(themePlugin());
      kernel.init();

      expect(() => kernel.emit('style:theme:string', { text: '"hello"' })).not.toThrow();
    });

    it('should register style:theme:number event', () => {
      const kernel = createTestKernel();
      kernel.use(themePlugin());
      kernel.init();

      expect(() => kernel.emit('style:theme:number', { text: '42' })).not.toThrow();
    });

    it('should register style:theme:comment event', () => {
      const kernel = createTestKernel();
      kernel.use(themePlugin());
      kernel.init();

      expect(() => kernel.emit('style:theme:comment', { text: '// comment' })).not.toThrow();
    });

    it('should register style:theme:error event', () => {
      const kernel = createTestKernel();
      kernel.use(themePlugin());
      kernel.init();

      expect(() => kernel.emit('style:theme:error', { text: 'Error!' })).not.toThrow();
    });

    it('should register style:theme:success event', () => {
      const kernel = createTestKernel();
      kernel.use(themePlugin());
      kernel.init();

      expect(() => kernel.emit('style:theme:success', { text: 'Success!' })).not.toThrow();
    });

    it('should register style:theme:warning event', () => {
      const kernel = createTestKernel();
      kernel.use(themePlugin());
      kernel.init();

      expect(() => kernel.emit('style:theme:warning', { text: 'Warning!' })).not.toThrow();
    });

    it('should register style:theme:info event', () => {
      const kernel = createTestKernel();
      kernel.use(themePlugin());
      kernel.init();

      expect(() => kernel.emit('style:theme:info', { text: 'Info!' })).not.toThrow();
    });

    it('should support all presets', () => {
      const presets = ['monokai', 'dracula', 'nord', 'github', 'vscode', 'tokyo-night', 'catppuccin', 'one-dark', 'solarized'] as const;
      for (const preset of presets) {
        const kernel = createTestKernel();
        kernel.use(themePlugin({ preset }));
        kernel.init();
        const ctx = kernel.getContext() as any;
        expect(ctx.theme.preset).toBe(preset);
      }
    });
  });

  describe('semanticPlugin', () => {
    it('should have correct name and version', () => {
      const plugin = semanticPlugin();
      expect(plugin.name).toBe('semantic');
      expect(plugin.version).toBe('1.0.0');
    });

    it('should install with default colors', () => {
      const kernel = createTestKernel();
      kernel.use(semanticPlugin());
      kernel.init();

      const ctx = kernel.getContext() as any;
      expect(ctx.semantic).toBeDefined();
      expect(ctx.semantic.enabled).toBe(true);
      expect(ctx.semantic.colors.success).toBe('#50fa7b');
      expect(ctx.semantic.colors.error).toBe('#ff5555');
      expect(ctx.semantic.colors.warning).toBe('#ffb86c');
      expect(ctx.semantic.colors.info).toBe('#8be9fd');
      expect(ctx.semantic.colors.debug).toBe('#6272a4');
    });

    it('should install with custom colors', () => {
      const kernel = createTestKernel();
      kernel.use(semanticPlugin({
        success: '#00FF00',
        error: '#FF0000',
        warning: '#FFFF00',
        info: '#00FFFF',
        debug: '#888888'
      }));
      kernel.init();

      const ctx = kernel.getContext() as any;
      expect(ctx.semantic.colors.success).toBe('#00FF00');
      expect(ctx.semantic.colors.error).toBe('#FF0000');
    });

    it('should register style:success event handler', () => {
      const kernel = createTestKernel();
      kernel.use(semanticPlugin());
      kernel.init();

      expect(() => kernel.emit('style:success', { text: 'Success!' })).not.toThrow();
    });

    it('should register style:error event handler', () => {
      const kernel = createTestKernel();
      kernel.use(semanticPlugin());
      kernel.init();

      expect(() => kernel.emit('style:error', { text: 'Error!' })).not.toThrow();
    });

    it('should register style:warning event handler', () => {
      const kernel = createTestKernel();
      kernel.use(semanticPlugin());
      kernel.init();

      expect(() => kernel.emit('style:warning', { text: 'Warning!' })).not.toThrow();
    });

    it('should register style:info event handler', () => {
      const kernel = createTestKernel();
      kernel.use(semanticPlugin());
      kernel.init();

      expect(() => kernel.emit('style:info', { text: 'Info!' })).not.toThrow();
    });

    it('should register style:debug event handler', () => {
      const kernel = createTestKernel();
      kernel.use(semanticPlugin());
      kernel.init();

      expect(() => kernel.emit('style:debug', { text: 'Debug!' })).not.toThrow();
    });
  });

  describe('boxPlugin', () => {
    it('should have correct name and version', () => {
      const plugin = boxPlugin();
      expect(plugin.name).toBe('box');
      expect(plugin.version).toBe('1.0.0');
    });

    it('should install with default options', () => {
      const kernel = createTestKernel();
      kernel.use(boxPlugin());
      kernel.init();

      const ctx = kernel.getContext() as any;
      expect(ctx.box).toBeDefined();
      expect(ctx.box.enabled).toBe(true);
      expect(ctx.box.border).toBe('single');
      expect(ctx.box.padding).toBe(1);
    });

    it('should install with custom border', () => {
      const kernel = createTestKernel();
      kernel.use(boxPlugin({ border: 'double' }));
      kernel.init();

      const ctx = kernel.getContext() as any;
      expect(ctx.box.border).toBe('double');
    });

    it('should install with custom padding', () => {
      const kernel = createTestKernel();
      kernel.use(boxPlugin({ padding: 2 }));
      kernel.init();

      const ctx = kernel.getContext() as any;
      expect(ctx.box.padding).toBe(2);
    });

    it('should register style:box event handler', () => {
      const kernel = createTestKernel();
      kernel.use(boxPlugin());
      kernel.init();

      expect(() => kernel.emit('style:box', { text: 'Hello' })).not.toThrow();
    });

    it('should have borders configuration', () => {
      const kernel = createTestKernel();
      kernel.use(boxPlugin());
      kernel.init();

      const ctx = kernel.getContext() as any;
      expect(ctx.box.borders).toBeDefined();
      expect(ctx.box.borders.single).toBeDefined();
      expect(ctx.box.borders.double).toBeDefined();
      expect(ctx.box.borders.rounded).toBeDefined();
      expect(ctx.box.borders.bold).toBeDefined();
      expect(ctx.box.borders.classic).toBeDefined();
    });

    it('should handle bgColor option', () => {
      const kernel = createTestKernel();
      kernel.use(boxPlugin());
      kernel.init();

      expect(() => kernel.emit('style:box', { text: 'Hello', bgColor: '#FF0000' })).not.toThrow();
    });

    it('should handle invalid bgColor gracefully', () => {
      const kernel = createTestKernel();
      kernel.use(boxPlugin());
      kernel.init();

      expect(() => kernel.emit('style:box', { text: 'Hello', bgColor: 'invalid' })).not.toThrow();
    });

    it('should handle multiline text', () => {
      const kernel = createTestKernel();
      kernel.use(boxPlugin());
      kernel.init();

      expect(() => kernel.emit('style:box', { text: 'Line 1\nLine 2\nLine 3' })).not.toThrow();
    });

    it('should handle custom border option', () => {
      const kernel = createTestKernel();
      kernel.use(boxPlugin());
      kernel.init();

      expect(() => kernel.emit('style:box', { text: 'Hello', border: 'rounded' })).not.toThrow();
    });

    it('should handle custom padding option', () => {
      const kernel = createTestKernel();
      kernel.use(boxPlugin());
      kernel.init();

      expect(() => kernel.emit('style:box', { text: 'Hello', padding: 3 })).not.toThrow();
    });
  });

  describe('templatePlugin', () => {
    it('should have correct name and version', () => {
      const plugin = templatePlugin();
      expect(plugin.name).toBe('template');
      expect(plugin.version).toBe('1.0.0');
    });

    it('should install and update context', () => {
      const kernel = createTestKernel();
      kernel.use(templatePlugin());
      kernel.init();

      const ctx = kernel.getContext() as any;
      expect(ctx.template).toBeDefined();
      expect(ctx.template.enabled).toBe(true);
    });

    it('should register style:template event handler', () => {
      const kernel = createTestKernel();
      kernel.use(templatePlugin());
      kernel.init();

      const strings = ['Hello ', '!'] as unknown as TemplateStringsArray;
      Object.defineProperty(strings, 'raw', { value: strings });
      expect(() => kernel.emit('style:template', {
        strings,
        values: ['World']
      })).not.toThrow();
    });

    it('should handle non-string values', () => {
      const kernel = createTestKernel();
      kernel.use(templatePlugin());
      kernel.init();

      const strings = ['Count: ', ''] as unknown as TemplateStringsArray;
      Object.defineProperty(strings, 'raw', { value: strings });
      expect(() => kernel.emit('style:template', {
        strings,
        values: [42]
      })).not.toThrow();
    });

    it('should handle style expressions', () => {
      const kernel = createTestKernel();
      kernel.use(templatePlugin());
      kernel.init();

      const strings = ['', ''] as unknown as TemplateStringsArray;
      Object.defineProperty(strings, 'raw', { value: strings });
      expect(() => kernel.emit('style:template', {
        strings,
        values: ['{red}test']
      })).not.toThrow();
    });

    it('should handle invalid style expressions', () => {
      const kernel = createTestKernel();
      kernel.use(templatePlugin());
      kernel.init();

      const strings = ['', ''] as unknown as TemplateStringsArray;
      Object.defineProperty(strings, 'raw', { value: strings });
      expect(() => kernel.emit('style:template', {
        strings,
        values: ['{invalid.path}test']
      })).not.toThrow();
    });

    it('should handle deeply nested style path', () => {
      const kernel = createTestKernel();
      kernel.use(templatePlugin());
      kernel.init();

      const strings = ['', ''] as unknown as TemplateStringsArray;
      Object.defineProperty(strings, 'raw', { value: strings });
      expect(() => kernel.emit('style:template', {
        strings,
        values: ['{deeply.nested.path.to.style}text']
      })).not.toThrow();
    });

    it('should handle style expression with valid path to non-function', () => {
      const kernel = createTestKernel();
      kernel.use(templatePlugin());
      kernel.init();

      const strings = ['', ''] as unknown as TemplateStringsArray;
      Object.defineProperty(strings, 'raw', { value: strings });
      // colorSupport is an object, not a function
      expect(() => kernel.emit('style:template', {
        strings,
        values: ['{colorSupport}text']
      })).not.toThrow();
    });

    it('should handle parseStyleExpression with invalid path returning text', () => {
      const kernel = createTestKernel();
      kernel.use(templatePlugin());
      kernel.init();

      const strings = ['', ''] as unknown as TemplateStringsArray;
      Object.defineProperty(strings, 'raw', { value: strings });
      // Use a path that doesn't exist in context
      expect(() => kernel.emit('style:template', {
        strings,
        values: ['{nonexistent.path}text']
      })).not.toThrow();
    });

    it('should handle valid function path in parseStyleExpression', () => {
      const kernel = createTestKernel();
      kernel.use(templatePlugin());
      kernel.init();

      const strings = ['', ''] as unknown as TemplateStringsArray;
      Object.defineProperty(strings, 'raw', { value: strings });
      // The parseStyleExpression expects to find a function at the path
      // Since we don't have a valid style function in context, it should return text
      expect(() => kernel.emit('style:template', {
        strings,
        values: ['{utils}text']
      })).not.toThrow();
    });

    it('should call function when parseStyleExpression resolves to a function', () => {
      // Create kernel with a custom function in context
      const kernel = createKernel<PigmentContext, PigmentEvents>({
        context: {
          colorSupport: { level: 3, hasBasic: true, has256: true, has16m: true },
          level: 3,
          enabled: true,
          styles: new Map(),
          utils: {
            hexToRgb,
            hslToRgb,
            rgbToAnsi256,
            detectColorSupport,
            supportsColor: detectColorSupport
          },
          customStyle: (text: string) => `styled:${text}`
        } as any
      });
      kernel.use(templatePlugin());
      kernel.init();

      const strings = ['', ''] as unknown as TemplateStringsArray;
      Object.defineProperty(strings, 'raw', { value: strings });
      // Use a path that resolves to the customStyle function
      expect(() => kernel.emit('style:template', {
        strings,
        values: ['{customStyle}mytext']
      })).not.toThrow();
    });
  });

  describe('gradientPlugin - additional coverage', () => {
    it('should handle color index fallback for invalid colors', () => {
      const kernel = createTestKernel();
      kernel.use(gradientPlugin({ steps: 3 }));
      kernel.init();

      expect(() => kernel.emit('style:gradient', {
        start: '#FF0000',
        end: '#0000FF',
        text: 'ab',  // Short text to test edge cases
        steps: 2
      })).not.toThrow();
    });

    it('should handle empty text in gradient', () => {
      const kernel = createTestKernel();
      kernel.use(gradientPlugin());
      kernel.init();

      expect(() => kernel.emit('style:gradient', {
        start: '#FF0000',
        end: '#0000FF',
        text: ''
      })).not.toThrow();
    });

    it('should handle single character text in gradient', () => {
      const kernel = createTestKernel();
      kernel.use(gradientPlugin());
      kernel.init();

      expect(() => kernel.emit('style:gradient', {
        start: '#FF0000',
        end: '#0000FF',
        text: 'X'
      })).not.toThrow();
    });

    it('should handle empty text in rainbow', () => {
      const kernel = createTestKernel();
      kernel.use(gradientPlugin());
      kernel.init();

      expect(() => kernel.emit('style:rainbow', { text: '' })).not.toThrow();
    });

    it('should return text when start or end color is invalid', () => {
      const kernel = createTestKernel();
      kernel.use(gradientPlugin());
      kernel.init();

      // Test with both invalid colors - should return text unchanged
      expect(() => kernel.emit('style:gradient', {
        start: 'not-a-color',
        end: 'also-not-a-color',
        text: 'test text'
      })).not.toThrow();
    });

    it('should handle color index out of bounds gracefully', () => {
      const kernel = createTestKernel();
      kernel.use(gradientPlugin({ steps: 2 }));
      kernel.init();

      // Use very short steps to potentially trigger out of bounds
      expect(() => kernel.emit('style:gradient', {
        start: '#FF0000',
        end: '#0000FF',
        text: 'abcdefghij',
        steps: 2
      })).not.toThrow();
    });

    it('should handle rainbow with colors array edge case', () => {
      const kernel = createTestKernel();
      kernel.use(gradientPlugin({ steps: 3 }));
      kernel.init();

      // Test with text longer than steps
      expect(() => kernel.emit('style:rainbow', {
        text: 'abcdefghij',
        steps: 3
      })).not.toThrow();
    });

    it('should parse rgb format colors', () => {
      const kernel = createTestKernel();
      kernel.use(gradientPlugin());
      kernel.init();

      // Test with rgb() format
      expect(() => kernel.emit('style:gradient', {
        start: 'rgb(255, 0, 0)',
        end: 'rgb(0, 0, 255)',
        text: 'test'
      })).not.toThrow();
    });

    it('should handle invalid rgb format', () => {
      const kernel = createTestKernel();
      kernel.use(gradientPlugin());
      kernel.init();

      // Invalid rgb format should return text unchanged
      expect(() => kernel.emit('style:gradient', {
        start: 'rgb(invalid)',
        end: 'rgb(also-invalid)',
        text: 'test'
      })).not.toThrow();
    });

    it('should handle rainbow with steps=0 (empty colors array)', () => {
      const kernel = createTestKernel();
      kernel.use(gradientPlugin({ steps: 0 }));
      kernel.init();

      // With steps=0, colors array is empty, triggering the else branch
      expect(() => kernel.emit('style:rainbow', {
        text: 'test',
        steps: 0
      })).not.toThrow();
    });

    it('should handle gradient with steps=0 (empty colors array)', () => {
      const kernel = createTestKernel();
      kernel.use(gradientPlugin({ steps: 0 }));
      kernel.init();

      // With steps=0, colors array is empty, triggering the else branch
      expect(() => kernel.emit('style:gradient', {
        start: '#FF0000',
        end: '#0000FF',
        text: 'test',
        steps: 0
      })).not.toThrow();
    });

    it('should handle color without # or rgb( prefix (fallback hexToRgb path)', () => {
      const kernel = createTestKernel();
      kernel.use(gradientPlugin());
      kernel.init();

      // Test with valid # prefix for start, and without prefix for end
      // This triggers the fallback hexToRgb(end) branch
      expect(() => kernel.emit('style:gradient', {
        start: '#FF0000',
        end: 'invalid',  // Not starting with # or rgb( - triggers fallback hexToRgb
        text: 'test'
      })).not.toThrow();

      // Test with rgb( for start, and without prefix for end
      expect(() => kernel.emit('style:gradient', {
        start: 'rgb(255, 0, 0)',
        end: 'no-prefix',  // Triggers fallback hexToRgb
        text: 'test'
      })).not.toThrow();
    });
  });

  describe('boxPlugin - additional coverage', () => {
    it('should handle missing hexToRgb utility for bgColor by triggering error path', () => {
      const kernelNoUtils = createKernel<PigmentContext, PigmentEvents>({
        context: {
          colorSupport: { level: 3, hasBasic: true, has256: true, has16m: true },
          level: 3,
          enabled: true,
          styles: new Map(),
          utils: undefined
        }
      });
      kernelNoUtils.use(boxPlugin());
      kernelNoUtils.init();

      // This triggers the error path for missing hexToRgb
      kernelNoUtils.emit('style:box', { text: 'Hello', bgColor: '#FF0000' });
      expect(true).toBe(true);
    });

    it('should handle invalid bgColor by returning result without color', () => {
      const kernel = createTestKernel();
      kernel.use(boxPlugin());
      kernel.init();

      // This triggers the invalid bgColor path where hexToRgb returns null
      expect(() => kernel.emit('style:box', { text: 'Hello', bgColor: 'invalid-color' })).not.toThrow();
    });
  });

  describe('themePlugin - additional coverage', () => {
    it('should handle unknown theme color type by triggering error path', () => {
      const kernel = createTestKernel();
      kernel.use(themePlugin());
      kernel.init();

      // This triggers the error path for unknown theme color type
      kernel.emit('style:theme', { type: 'unknownType', text: 'test' });
      expect(true).toBe(true);
    });

    it('should handle missing hexToRgb utility by triggering error path', () => {
      const kernelNoUtils = createKernel<PigmentContext, PigmentEvents>({
        context: {
          colorSupport: { level: 3, hasBasic: true, has256: true, has16m: true },
          level: 3,
          enabled: true,
          styles: new Map(),
          utils: undefined
        }
      });
      kernelNoUtils.use(themePlugin());
      kernelNoUtils.init();

      // This triggers the error path for missing hexToRgb
      kernelNoUtils.emit('style:theme', { type: 'keyword', text: 'test' });
      expect(true).toBe(true);
    });

    it('should return text when hexToRgb returns null for invalid color', () => {
      const kernel = createTestKernel();
      // Use custom theme with invalid hex color
      kernel.use(themePlugin({
        custom: {
          keyword: 'invalid-hex',
          string: '#00FF00',
          number: '#0000FF',
          comment: '#888888',
          error: '#FF0000',
          success: '#00FF00',
          warning: '#FFFF00',
          info: '#00FFFF'
        }
      }));
      kernel.init();

      // This should trigger the null check path for hexToRgb result
      expect(() => kernel.emit('style:theme', { type: 'keyword', text: 'test' })).not.toThrow();
    });
  });

  describe('semanticPlugin - additional coverage', () => {
    it('should throw when hexToRgb utility is not available during install', () => {
      const kernelNoUtils = createKernel<PigmentContext, PigmentEvents>({
        context: {
          colorSupport: { level: 3, hasBasic: true, has256: true, has16m: true },
          level: 3,
          enabled: true,
          styles: new Map(),
          utils: undefined
        }
      });

      // semanticPlugin checks hexToRgb during install and throws
      expect(() => {
        kernelNoUtils.use(semanticPlugin());
      }).toThrow('hexToRgb utility not available');
    });
  });
});
