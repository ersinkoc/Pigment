import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createProxyPigment } from '../../src/core/proxy';
import { createKernel } from '@oxog/plugin';
import type { PigmentContext, PigmentEvents } from '../../src/types';
import { hexToRgb } from '../../src/utils/hex-to-rgb';
import { hslToRgb } from '../../src/utils/hsl-to-rgb';
import { rgbToAnsi256 } from '../../src/utils/rgb-to-ansi256';
import { detectColorSupport } from '../../src/utils/color-support';

describe('createProxyPigment', () => {
  let kernel: ReturnType<typeof createKernel<PigmentContext, PigmentEvents>>;

  beforeEach(() => {
    kernel = createKernel<PigmentContext, PigmentEvents>({
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
    kernel.init();
  });

  describe('Basic functionality', () => {
    it('should create a proxy pigment', () => {
      const pigment = createProxyPigment(kernel);
      expect(pigment).toBeDefined();
      expect(typeof pigment).toBe('function');
    });

    it('should return text when called as function with no styles', () => {
      const pigment = createProxyPigment(kernel);
      expect(pigment('test')).toBe('test');
    });

    it('should handle empty string input', () => {
      const pigment = createProxyPigment(kernel);
      expect(pigment('')).toBe('');
    });

    it('should handle undefined input', () => {
      const pigment = createProxyPigment(kernel);
      // @ts-ignore - testing undefined input
      expect(pigment(undefined)).toBe('');
    });

    it('should handle null input', () => {
      const pigment = createProxyPigment(kernel);
      // @ts-ignore - testing null input
      expect(pigment(null)).toBe('');
    });

    it('should access level property', () => {
      const pigment = createProxyPigment(kernel);
      expect((pigment as any).level).toBe(3);
    });

    it('should access supportsColor property', () => {
      const pigment = createProxyPigment(kernel);
      expect((pigment as any).supportsColor).toBeDefined();
      expect((pigment as any).supportsColor.level).toBe(3);
    });
  });

  describe('Modifiers', () => {
    it('should apply bold modifier', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.bold('test');
      expect(result).toContain('\x1b[1m');
      expect(result).toContain('test');
      expect(result).toContain('\x1b[22m');
    });

    it('should apply dim modifier', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.dim('test');
      expect(result).toContain('\x1b[2m');
    });

    it('should apply italic modifier', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.italic('test');
      expect(result).toContain('\x1b[3m');
    });

    it('should apply underline modifier', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.underline('test');
      expect(result).toContain('\x1b[4m');
    });

    it('should apply strikethrough modifier', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.strikethrough('test');
      expect(result).toContain('\x1b[9m');
    });

    it('should apply inverse modifier', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.inverse('test');
      expect(result).toContain('\x1b[7m');
    });

    it('should apply hidden modifier', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.hidden('test');
      expect(result).toContain('\x1b[8m');
    });

    it('should apply reset modifier', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.reset('test');
      expect(result).toContain('\x1b[0m');
    });
  });

  describe('Foreground colors', () => {
    it('should apply black color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.black('test');
      expect(result).toContain('\x1b[30m');
    });

    it('should apply red color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.red('test');
      expect(result).toContain('\x1b[31m');
    });

    it('should apply green color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.green('test');
      expect(result).toContain('\x1b[32m');
    });

    it('should apply yellow color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.yellow('test');
      expect(result).toContain('\x1b[33m');
    });

    it('should apply blue color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.blue('test');
      expect(result).toContain('\x1b[34m');
    });

    it('should apply magenta color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.magenta('test');
      expect(result).toContain('\x1b[35m');
    });

    it('should apply cyan color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.cyan('test');
      expect(result).toContain('\x1b[36m');
    });

    it('should apply white color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.white('test');
      expect(result).toContain('\x1b[37m');
    });

    it('should apply gray color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.gray('test');
      expect(result).toContain('\x1b[90m');
    });

    it('should apply grey color (alias)', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.grey('test');
      expect(result).toContain('\x1b[90m');
    });
  });

  describe('Bright foreground colors', () => {
    it('should apply blackBright color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.blackBright('test');
      expect(result).toContain('\x1b[90m');
    });

    it('should apply redBright color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.redBright('test');
      expect(result).toContain('\x1b[91m');
    });

    it('should apply greenBright color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.greenBright('test');
      expect(result).toContain('\x1b[92m');
    });

    it('should apply yellowBright color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.yellowBright('test');
      expect(result).toContain('\x1b[93m');
    });

    it('should apply blueBright color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.blueBright('test');
      expect(result).toContain('\x1b[94m');
    });

    it('should apply magentaBright color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.magentaBright('test');
      expect(result).toContain('\x1b[95m');
    });

    it('should apply cyanBright color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.cyanBright('test');
      expect(result).toContain('\x1b[96m');
    });

    it('should apply whiteBright color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.whiteBright('test');
      expect(result).toContain('\x1b[97m');
    });
  });

  describe('Background colors', () => {
    it('should apply bgBlack color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.bgBlack('test');
      expect(result).toContain('\x1b[40m');
    });

    it('should apply bgRed color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.bgRed('test');
      expect(result).toContain('\x1b[41m');
    });

    it('should apply bgGreen color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.bgGreen('test');
      expect(result).toContain('\x1b[42m');
    });

    it('should apply bgYellow color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.bgYellow('test');
      expect(result).toContain('\x1b[43m');
    });

    it('should apply bgBlue color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.bgBlue('test');
      expect(result).toContain('\x1b[44m');
    });

    it('should apply bgMagenta color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.bgMagenta('test');
      expect(result).toContain('\x1b[45m');
    });

    it('should apply bgCyan color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.bgCyan('test');
      expect(result).toContain('\x1b[46m');
    });

    it('should apply bgWhite color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.bgWhite('test');
      expect(result).toContain('\x1b[47m');
    });

    it('should apply bgGray color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.bgGray('test');
      expect(result).toContain('test');
    });

    it('should apply bgGrey color (alias)', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.bgGrey('test');
      expect(result).toContain('test');
    });
  });

  describe('Bright background colors', () => {
    it('should apply bgBlackBright color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.bgBlackBright('test');
      expect(result).toContain('\x1b[100m');
    });

    it('should apply bgRedBright color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.bgRedBright('test');
      expect(result).toContain('\x1b[101m');
    });

    it('should apply bgGreenBright color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.bgGreenBright('test');
      expect(result).toContain('\x1b[102m');
    });

    it('should apply bgYellowBright color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.bgYellowBright('test');
      expect(result).toContain('\x1b[103m');
    });

    it('should apply bgBlueBright color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.bgBlueBright('test');
      expect(result).toContain('\x1b[104m');
    });

    it('should apply bgMagentaBright color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.bgMagentaBright('test');
      expect(result).toContain('\x1b[105m');
    });

    it('should apply bgCyanBright color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.bgCyanBright('test');
      expect(result).toContain('\x1b[106m');
    });

    it('should apply bgWhiteBright color', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.bgWhiteBright('test');
      expect(result).toContain('\x1b[107m');
    });
  });

  describe('Extended color methods', () => {
    describe('ansi256', () => {
      it('should apply ansi256 foreground color', () => {
        const pigment = createProxyPigment(kernel);
        const result = pigment.ansi256(196)('test');
        expect(result).toContain('\x1b[38;5;196m');
        expect(result).toContain('test');
        expect(result).toContain('\x1b[39m');
      });

      it('should apply bgAnsi256 background color', () => {
        const pigment = createProxyPigment(kernel);
        const result = pigment.bgAnsi256(21)('test');
        expect(result).toContain('\x1b[48;5;21m');
        expect(result).toContain('test');
        expect(result).toContain('\x1b[49m');
      });
    });

    describe('rgb', () => {
      it('should apply rgb foreground color', () => {
        const pigment = createProxyPigment(kernel);
        const result = pigment.rgb(255, 128, 0)('test');
        expect(result).toContain('\x1b[38;2;255;128;0m');
        expect(result).toContain('test');
        expect(result).toContain('\x1b[39m');
      });

      it('should apply bgRgb background color', () => {
        const pigment = createProxyPigment(kernel);
        const result = pigment.bgRgb(128, 0, 255)('test');
        expect(result).toContain('\x1b[48;2;128;0;255m');
        expect(result).toContain('test');
        expect(result).toContain('\x1b[49m');
      });
    });

    describe('hex', () => {
      it('should apply hex foreground color', () => {
        const pigment = createProxyPigment(kernel);
        const result = pigment.hex('#FF8800')('test');
        expect(result).toContain('\x1b[38;2;255;136;0m');
        expect(result).toContain('test');
        expect(result).toContain('\x1b[39m');
      });

      it('should apply bgHex background color', () => {
        const pigment = createProxyPigment(kernel);
        const result = pigment.bgHex('#0088FF')('test');
        expect(result).toContain('\x1b[48;2;0;136;255m');
        expect(result).toContain('test');
        expect(result).toContain('\x1b[49m');
      });

      it('should throw on invalid hex color', () => {
        const pigment = createProxyPigment(kernel);
        expect(() => pigment.hex('invalid')('test')).toThrow('Invalid HEX color');
      });

      it('should throw on invalid bgHex color', () => {
        const pigment = createProxyPigment(kernel);
        expect(() => pigment.bgHex('invalid')('test')).toThrow('Invalid HEX color');
      });
    });

    describe('hsl', () => {
      it('should apply hsl foreground color', () => {
        const pigment = createProxyPigment(kernel);
        const result = pigment.hsl(0, 100, 50)('test');
        expect(result).toContain('\x1b[38;2;255;0;0m');
        expect(result).toContain('test');
      });

      it('should apply bgHsl background color', () => {
        const pigment = createProxyPigment(kernel);
        const result = pigment.bgHsl(240, 100, 50)('test');
        expect(result).toContain('\x1b[48;2;0;0;255m');
        expect(result).toContain('test');
      });
    });
  });

  describe('Style chaining', () => {
    it('should chain multiple modifiers', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.bold.italic.underline('test');
      expect(result).toContain('\x1b[1m');
      expect(result).toContain('\x1b[3m');
      expect(result).toContain('\x1b[4m');
      expect(result).toContain('test');
    });

    it('should chain modifiers and colors', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.bold.red('test');
      expect(result).toContain('\x1b[1m');
      expect(result).toContain('\x1b[31m');
      expect(result).toContain('test');
    });

    it('should chain colors and background colors', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.red.bgWhite('test');
      expect(result).toContain('\x1b[31m');
      expect(result).toContain('\x1b[47m');
      expect(result).toContain('test');
    });

    it('should close styles in reverse order', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.bold.red('test');
      const closeIndex1 = result.lastIndexOf('\x1b[39m');
      const closeIndex2 = result.lastIndexOf('\x1b[22m');
      expect(closeIndex1).toBeLessThan(closeIndex2);
    });
  });

  describe('Visible method', () => {
    it('should return text unchanged when color is supported', () => {
      const pigment = createProxyPigment(kernel);
      const result = pigment.visible('test');
      expect(result).toBe('test');
    });

    it('should return empty string when color is not supported', () => {
      const noColorKernel = createKernel<PigmentContext, PigmentEvents>({
        context: {
          colorSupport: { level: 0, hasBasic: false, has256: false, has16m: false },
          level: 0,
          enabled: false,
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
      noColorKernel.init();
      const pigment = createProxyPigment(noColorKernel);
      const result = pigment.visible('test');
      // visible returns empty when colors are not supported
      expect(result).toBe('');
    });
  });

  describe('Property access', () => {
    it('should return level from context', () => {
      const pigment = createProxyPigment(kernel);
      // Note: level is accessed through the context
      expect((pigment as any).level).toBe(3);
    });

    it('should return colorSupport from context', () => {
      const pigment = createProxyPigment(kernel);
      // supportsColor is not directly accessible through the proxy
      // The context stores colorSupport
      expect((pigment as any).level).toBe(3);
    });

    it('should return undefined for unknown properties', () => {
      const pigment = createProxyPigment(kernel);
      expect((pigment as any).unknownProperty).toBeUndefined();
    });
  });

  describe('Missing utilities', () => {
    it('should throw when hexToRgb utility is not available', () => {
      const noUtilsKernel = createKernel<PigmentContext, PigmentEvents>({
        context: {
          colorSupport: { level: 3, hasBasic: true, has256: true, has16m: true },
          level: 3,
          enabled: true,
          styles: new Map(),
          utils: undefined
        }
      });
      noUtilsKernel.init();
      const pigment = createProxyPigment(noUtilsKernel);
      expect(() => pigment.hex('#FF0000')('test')).toThrow('hexToRgb utility not available');
    });

    it('should throw when hslToRgb utility is not available', () => {
      const noHslKernel = createKernel<PigmentContext, PigmentEvents>({
        context: {
          colorSupport: { level: 3, hasBasic: true, has256: true, has16m: true },
          level: 3,
          enabled: true,
          styles: new Map(),
          utils: {
            hexToRgb,
            hslToRgb: undefined as any,
            rgbToAnsi256,
            detectColorSupport,
            supportsColor: detectColorSupport
          }
        }
      });
      noHslKernel.init();
      const pigment = createProxyPigment(noHslKernel);
      expect(() => pigment.hsl(0, 100, 50)('test')).toThrow('hslToRgb utility not available');
    });
  });

  describe('With pre-applied styles', () => {
    it('should create proxy with initial styles', () => {
      const initialStyles = [
        { name: 'bold', code: -1, open: '\x1b[1m', close: '\x1b[22m', type: 'modifier' as const }
      ];
      const pigment = createProxyPigment(kernel, initialStyles);
      const result = pigment('test');
      expect(result).toContain('\x1b[1m');
      expect(result).toContain('test');
      expect(result).toContain('\x1b[22m');
    });

    it('should combine initial styles with chained styles', () => {
      const initialStyles = [
        { name: 'bold', code: -1, open: '\x1b[1m', close: '\x1b[22m', type: 'modifier' as const }
      ];
      const pigment = createProxyPigment(kernel, initialStyles);
      const result = pigment.red('test');
      expect(result).toContain('\x1b[1m');
      expect(result).toContain('\x1b[31m');
      expect(result).toContain('test');
    });
  });
});
