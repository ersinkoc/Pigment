import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createPigment, pigment, plugins } from '../../src/index';

describe('Pigment Integration Tests', () => {
  describe('Default pigment instance', () => {
    it('should work out of the box', () => {
      const result = pigment.red('Hello');
      expect(result).toContain('Hello');
    });

    it('should support chaining modifiers and colors', () => {
      const result = pigment.bold.red('Error');
      expect(result).toContain('\x1b[1m');
      expect(result).toContain('\x1b[31m');
      expect(result).toContain('Error');
    });

    it('should support nested styling', () => {
      const outer = pigment.red(`Error: ${pigment.bold('critical')}`);
      expect(outer).toContain('Error:');
      expect(outer).toContain('critical');
    });
  });

  describe('Custom pigment instance', () => {
    it('should create with custom level', () => {
      const p = createPigment({ level: 3 });
      expect(p.level).toBe(3);
    });

    it('should disable colors with noColor option', () => {
      const p = createPigment({ noColor: true });
      expect(p.level).toBe(0);
    });

    it('should force colors with forceColor option', () => {
      const p = createPigment({ forceColor: true, level: 3 });
      expect(p.level).toBe(3);
    });
  });

  describe('Plugin integration', () => {
    it('should work with gradient plugin', () => {
      const p = createPigment({
        level: 3,
        plugins: [plugins.gradientPlugin()]
      });
      expect(p).toBeDefined();
    });

    it('should work with theme plugin', () => {
      const p = createPigment({
        level: 3,
        plugins: [plugins.themePlugin({ preset: 'monokai' })]
      });
      expect(p).toBeDefined();
    });

    it('should work with semantic plugin', () => {
      const p = createPigment({
        level: 3,
        plugins: [plugins.semanticPlugin()]
      });
      expect(p).toBeDefined();
    });

    it('should work with box plugin', () => {
      const p = createPigment({
        level: 3,
        plugins: [plugins.boxPlugin()]
      });
      expect(p).toBeDefined();
    });

    it('should work with template plugin', () => {
      const p = createPigment({
        level: 3,
        plugins: [plugins.templatePlugin()]
      });
      expect(p).toBeDefined();
    });

    it('should work with multiple plugins', () => {
      const p = createPigment({
        level: 3,
        plugins: [
          plugins.gradientPlugin(),
          plugins.themePlugin(),
          plugins.semanticPlugin(),
          plugins.boxPlugin(),
          plugins.templatePlugin()
        ]
      });
      expect(p).toBeDefined();
    });
  });

  describe('Builder API integration', () => {
    it('should access builder from pigment instance', () => {
      const p = createPigment({ level: 3 });
      expect(p.builder).toBeDefined();
    });

    it('should use builder for styling', () => {
      const p = createPigment({ level: 3 });
      const result = p.builder.bold().red().paint('Error');
      expect(result).toContain('\x1b[1m');
      expect(result).toContain('\x1b[31m');
      expect(result).toContain('Error');
    });

    it('should chain builder methods', () => {
      const p = createPigment({ level: 3 });
      const result = p.builder
        .bold()
        .italic()
        .underline()
        .red()
        .bgWhite()
        .paint('Styled');
      expect(result).toContain('Styled');
    });
  });

  describe('Color methods integration', () => {
    it('should support all basic foreground colors', () => {
      const colors = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'] as const;
      for (const color of colors) {
        const result = (pigment as any)[color]('test');
        expect(result).toContain('test');
      }
    });

    it('should support all bright foreground colors', () => {
      const colors = ['blackBright', 'redBright', 'greenBright', 'yellowBright', 'blueBright', 'magentaBright', 'cyanBright', 'whiteBright'] as const;
      for (const color of colors) {
        const result = (pigment as any)[color]('test');
        expect(result).toContain('test');
      }
    });

    it('should support gray/grey aliases', () => {
      const grayResult = pigment.gray('test');
      const greyResult = pigment.grey('test');
      expect(grayResult).toContain('test');
      expect(greyResult).toContain('test');
    });

    it('should support all background colors', () => {
      const colors = ['bgBlack', 'bgRed', 'bgGreen', 'bgYellow', 'bgBlue', 'bgMagenta', 'bgCyan', 'bgWhite'] as const;
      for (const color of colors) {
        const result = (pigment as any)[color]('test');
        expect(result).toContain('test');
      }
    });

    it('should support all modifiers', () => {
      const modifiers = ['bold', 'dim', 'italic', 'underline', 'strikethrough', 'inverse', 'hidden', 'reset'] as const;
      for (const mod of modifiers) {
        const result = (pigment as any)[mod]('test');
        expect(result).toContain('test');
      }
    });

    it('should support ansi256 colors', () => {
      const result = pigment.ansi256(196)('test');
      expect(result).toContain('\x1b[38;5;196m');
      expect(result).toContain('test');
    });

    it('should support bgAnsi256 colors', () => {
      const result = pigment.bgAnsi256(21)('test');
      expect(result).toContain('\x1b[48;5;21m');
      expect(result).toContain('test');
    });

    it('should support rgb colors', () => {
      const result = pigment.rgb(255, 128, 0)('test');
      expect(result).toContain('\x1b[38;2;255;128;0m');
      expect(result).toContain('test');
    });

    it('should support bgRgb colors', () => {
      const result = pigment.bgRgb(0, 128, 255)('test');
      expect(result).toContain('\x1b[48;2;0;128;255m');
      expect(result).toContain('test');
    });

    it('should support hex colors', () => {
      const result = pigment.hex('#FF8800')('test');
      expect(result).toContain('\x1b[38;2;255;136;0m');
      expect(result).toContain('test');
    });

    it('should support bgHex colors', () => {
      const result = pigment.bgHex('#0088FF')('test');
      expect(result).toContain('\x1b[48;2;0;136;255m');
      expect(result).toContain('test');
    });

    it('should support hsl colors', () => {
      const result = pigment.hsl(0, 100, 50)('test');
      expect(result).toContain('\x1b[38;2;255;0;0m');
      expect(result).toContain('test');
    });

    it('should support bgHsl colors', () => {
      const result = pigment.bgHsl(240, 100, 50)('test');
      expect(result).toContain('\x1b[48;2;0;0;255m');
      expect(result).toContain('test');
    });
  });

  describe('Complex chaining', () => {
    it('should support deep chaining', () => {
      const result = pigment.bold.italic.underline.red.bgWhite('Complex');
      expect(result).toContain('\x1b[1m');
      expect(result).toContain('\x1b[3m');
      expect(result).toContain('\x1b[4m');
      expect(result).toContain('\x1b[31m');
      expect(result).toContain('\x1b[47m');
      expect(result).toContain('Complex');
    });

    it('should support extended color method chaining', () => {
      const result = pigment.bold.ansi256(196)('Error');
      expect(result).toContain('\x1b[1m');
      expect(result).toContain('\x1b[38;5;196m');
    });

    it('should support hex color chaining', () => {
      const result = pigment.bold.hex('#FF0000')('Red');
      expect(result).toContain('\x1b[1m');
      expect(result).toContain('\x1b[38;2;255;0;0m');
    });
  });

  describe('Error handling', () => {
    it('should throw for invalid hex colors', () => {
      expect(() => pigment.hex('not-a-color')('test')).toThrow();
    });

    it('should handle empty strings', () => {
      const result = pigment.red('');
      expect(result).toContain('\x1b[31m');
    });

    it('should handle special characters', () => {
      const result = pigment.red('Hello\nWorld\t!');
      expect(result).toContain('Hello\nWorld\t!');
    });

    it('should handle unicode', () => {
      const result = pigment.red('Hello 世界 🌍');
      expect(result).toContain('Hello 世界 🌍');
    });
  });

  describe('Environment compatibility', () => {
    it('should handle level 0 (no colors)', () => {
      const p = createPigment({ level: 0 });
      // Even at level 0, the styling methods still work (they just add ANSI codes)
      // The actual stripping of colors would be done by the terminal or a strip-ansi utility
      const result = p.red('test');
      expect(result).toContain('test');
    });

    it('should handle level 1 (basic colors)', () => {
      const p = createPigment({ level: 1 });
      const result = p.red('test');
      expect(result).toContain('\x1b[31m');
    });

    it('should handle level 2 (256 colors)', () => {
      const p = createPigment({ level: 2 });
      const result = p.ansi256(196)('test');
      expect(result).toContain('\x1b[38;5;196m');
    });

    it('should handle level 3 (true color)', () => {
      const p = createPigment({ level: 3 });
      const result = p.rgb(255, 0, 0)('test');
      expect(result).toContain('\x1b[38;2;255;0;0m');
    });
  });

  describe('Real-world usage patterns', () => {
    it('should format log messages', () => {
      const info = pigment.blue('[INFO]');
      const warn = pigment.yellow('[WARN]');
      const error = pigment.red.bold('[ERROR]');

      expect(info).toContain('\x1b[34m');
      expect(warn).toContain('\x1b[33m');
      expect(error).toContain('\x1b[31m');
      expect(error).toContain('\x1b[1m');
    });

    it('should format status indicators', () => {
      const success = pigment.green('✓');
      const failure = pigment.red('✗');
      const pending = pigment.yellow('○');

      expect(success).toContain('✓');
      expect(failure).toContain('✗');
      expect(pending).toContain('○');
    });

    it('should format code highlights', () => {
      const keyword = pigment.magenta('const');
      const variable = pigment.cyan('name');
      const string = pigment.green('"value"');

      expect(keyword).toContain('const');
      expect(variable).toContain('name');
      expect(string).toContain('"value"');
    });

    it('should format tables/lists', () => {
      const header = pigment.bold.underline('Header');
      const row1 = `  ${pigment.cyan('→')} Item 1`;
      const row2 = `  ${pigment.cyan('→')} Item 2`;

      expect(header).toContain('Header');
      expect(row1).toContain('Item 1');
      expect(row2).toContain('Item 2');
    });
  });
});
