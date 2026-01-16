import { describe, it, expect } from 'vitest';
import * as PigmentExports from '../../src/index';
import chalk from '../../src/index';

describe('Main Index Exports', () => {
  describe('Default export', () => {
    it('should export chalk as default', () => {
      expect(chalk).toBeDefined();
      expect(typeof chalk.red).toBe('function');
      expect(typeof chalk.bold).toBe('function');
    });
  });

  describe('Named exports', () => {
    describe('Core exports', () => {
      it('should export pigment instance', () => {
        expect(PigmentExports.pigment).toBeDefined();
        expect(typeof PigmentExports.pigment).toBe('function');
      });

      it('should export createPigment function', () => {
        expect(PigmentExports.createPigment).toBeDefined();
        expect(typeof PigmentExports.createPigment).toBe('function');
      });

      it('should export BuilderPigment class', () => {
        expect(PigmentExports.BuilderPigment).toBeDefined();
      });

      it('should export createKernel from @oxog/plugin', () => {
        expect(PigmentExports.createKernel).toBeDefined();
        expect(typeof PigmentExports.createKernel).toBe('function');
      });
    });

    describe('Color function exports', () => {
      it('should export modifier functions', () => {
        expect(typeof PigmentExports.bold).toBe('function');
        expect(typeof PigmentExports.dim).toBe('function');
        expect(typeof PigmentExports.italic).toBe('function');
        expect(typeof PigmentExports.underline).toBe('function');
        expect(typeof PigmentExports.strikethrough).toBe('function');
        expect(typeof PigmentExports.inverse).toBe('function');
        expect(typeof PigmentExports.hidden).toBe('function');
        expect(typeof PigmentExports.reset).toBe('function');
      });

      it('should export foreground color functions', () => {
        expect(typeof PigmentExports.black).toBe('function');
        expect(typeof PigmentExports.red).toBe('function');
        expect(typeof PigmentExports.green).toBe('function');
        expect(typeof PigmentExports.yellow).toBe('function');
        expect(typeof PigmentExports.blue).toBe('function');
        expect(typeof PigmentExports.magenta).toBe('function');
        expect(typeof PigmentExports.cyan).toBe('function');
        expect(typeof PigmentExports.white).toBe('function');
      });

      it('should export bright foreground color functions', () => {
        expect(typeof PigmentExports.blackBright).toBe('function');
        expect(typeof PigmentExports.redBright).toBe('function');
        expect(typeof PigmentExports.greenBright).toBe('function');
        expect(typeof PigmentExports.yellowBright).toBe('function');
        expect(typeof PigmentExports.blueBright).toBe('function');
        expect(typeof PigmentExports.magentaBright).toBe('function');
        expect(typeof PigmentExports.cyanBright).toBe('function');
        expect(typeof PigmentExports.whiteBright).toBe('function');
      });

      it('should export gray/grey aliases', () => {
        expect(typeof PigmentExports.gray).toBe('function');
        expect(typeof PigmentExports.grey).toBe('function');
      });

      it('should export background color functions', () => {
        expect(typeof PigmentExports.bgBlack).toBe('function');
        expect(typeof PigmentExports.bgRed).toBe('function');
        expect(typeof PigmentExports.bgGreen).toBe('function');
        expect(typeof PigmentExports.bgYellow).toBe('function');
        expect(typeof PigmentExports.bgBlue).toBe('function');
        expect(typeof PigmentExports.bgMagenta).toBe('function');
        expect(typeof PigmentExports.bgCyan).toBe('function');
        expect(typeof PigmentExports.bgWhite).toBe('function');
      });

      it('should export bright background color functions', () => {
        expect(typeof PigmentExports.bgBlackBright).toBe('function');
        expect(typeof PigmentExports.bgRedBright).toBe('function');
        expect(typeof PigmentExports.bgGreenBright).toBe('function');
        expect(typeof PigmentExports.bgYellowBright).toBe('function');
        expect(typeof PigmentExports.bgBlueBright).toBe('function');
        expect(typeof PigmentExports.bgMagentaBright).toBe('function');
        expect(typeof PigmentExports.bgCyanBright).toBe('function');
        expect(typeof PigmentExports.bgWhiteBright).toBe('function');
      });

      it('should export bgGray/bgGrey aliases', () => {
        expect(typeof PigmentExports.bgGray).toBe('function');
        expect(typeof PigmentExports.bgGrey).toBe('function');
      });

      it('should export compose function', () => {
        expect(typeof PigmentExports.compose).toBe('function');
      });
    });

    describe('Plugin exports', () => {
      it('should export plugins namespace', () => {
        expect(PigmentExports.plugins).toBeDefined();
      });

      it('should export core plugins', () => {
        expect(typeof PigmentExports.plugins.baseColorsPlugin).toBe('function');
        expect(typeof PigmentExports.plugins.modifiersPlugin).toBe('function');
        expect(typeof PigmentExports.plugins.ansi256Plugin).toBe('function');
        expect(typeof PigmentExports.plugins.trueColorPlugin).toBe('function');
        expect(typeof PigmentExports.plugins.nestingPlugin).toBe('function');
        expect(typeof PigmentExports.plugins.environmentPlugin).toBe('function');
      });

      it('should export optional plugins', () => {
        expect(typeof PigmentExports.plugins.gradientPlugin).toBe('function');
        expect(typeof PigmentExports.plugins.themePlugin).toBe('function');
        expect(typeof PigmentExports.plugins.semanticPlugin).toBe('function');
        expect(typeof PigmentExports.plugins.boxPlugin).toBe('function');
        expect(typeof PigmentExports.plugins.templatePlugin).toBe('function');
      });

      it('should export ecosystem plugins', () => {
        expect(typeof PigmentExports.plugins.pigmentPlugin).toBe('function');
      });
    });

    describe('Utility exports', () => {
      it('should export detectColorSupport', () => {
        expect(typeof PigmentExports.detectColorSupport).toBe('function');
      });

      it('should export supportsColor', () => {
        expect(typeof PigmentExports.supportsColor).toBe('function');
      });

      it('should export detectPlatform', () => {
        expect(typeof PigmentExports.detectPlatform).toBe('function');
      });

      it('should export isNode', () => {
        expect(typeof PigmentExports.isNode).toBe('function');
      });

      it('should export isBrowser', () => {
        expect(typeof PigmentExports.isBrowser).toBe('function');
      });

      it('should export isWindows', () => {
        expect(typeof PigmentExports.isWindows).toBe('function');
      });

      it('should export isCI', () => {
        expect(typeof PigmentExports.isCI).toBe('function');
      });

      it('should export hasTTY', () => {
        expect(typeof PigmentExports.hasTTY).toBe('function');
      });

      it('should export hexToRgb', () => {
        expect(typeof PigmentExports.hexToRgb).toBe('function');
      });

      it('should export validateHex', () => {
        expect(typeof PigmentExports.validateHex).toBe('function');
      });

      it('should export hslToRgb', () => {
        expect(typeof PigmentExports.hslToRgb).toBe('function');
      });

      it('should export rgbToAnsi256', () => {
        expect(typeof PigmentExports.rgbToAnsi256).toBe('function');
      });
    });
  });

  describe('Pigment instance properties', () => {
    it('should have level property', () => {
      expect(PigmentExports.pigment).toHaveProperty('level');
      expect(typeof (PigmentExports.pigment as any).level).toBe('number');
    });

    it('should have color methods available', () => {
      const pigment = PigmentExports.pigment as any;
      expect(typeof pigment.red).toBe('function');
      expect(typeof pigment.bold).toBe('function');
    });

    it('should have color methods attached', () => {
      const pigment = PigmentExports.pigment as any;
      expect(typeof pigment.red).toBe('function');
      expect(typeof pigment.bold).toBe('function');
      expect(typeof pigment.bgBlue).toBe('function');
    });
  });

  describe('Color function behavior', () => {
    it('bold should apply bold styling', () => {
      const result = PigmentExports.bold('test');
      expect(result).toContain('\x1b[1m');
      expect(result).toContain('test');
      expect(result).toContain('\x1b[22m');
    });

    it('red should apply red color', () => {
      const result = PigmentExports.red('test');
      expect(result).toContain('\x1b[31m');
      expect(result).toContain('test');
    });

    it('bgBlue should apply blue background', () => {
      const result = PigmentExports.bgBlue('test');
      expect(result).toContain('\x1b[44m');
      expect(result).toContain('test');
    });

    it('compose should combine multiple styles', () => {
      const combined = PigmentExports.compose(PigmentExports.bold, PigmentExports.red);
      const result = combined('test');
      expect(result).toContain('\x1b[1m');
      expect(result).toContain('\x1b[31m');
      expect(result).toContain('test');
    });
  });

  describe('Utility function behavior', () => {
    it('hexToRgb should convert hex to RGB', () => {
      const result = PigmentExports.hexToRgb('#FF0000');
      expect(result).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('validateHex should validate hex colors', () => {
      expect(PigmentExports.validateHex('#FF0000')).toBe(true);
      expect(PigmentExports.validateHex('invalid')).toBe(false);
    });

    it('hslToRgb should convert HSL to RGB', () => {
      const result = PigmentExports.hslToRgb(0, 100, 50);
      expect(result).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('rgbToAnsi256 should convert RGB to ANSI 256', () => {
      const result = PigmentExports.rgbToAnsi256(255, 0, 0);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(255);
    });

    it('detectPlatform should return platform info', () => {
      const platform = PigmentExports.detectPlatform();
      expect(platform).toHaveProperty('isNode');
      expect(platform).toHaveProperty('isBrowser');
      expect(platform).toHaveProperty('isWindows');
      expect(platform).toHaveProperty('isCI');
      expect(platform).toHaveProperty('hasTTY');
    });

    it('detectColorSupport should return color support info', () => {
      const support = PigmentExports.detectColorSupport();
      expect(support).toHaveProperty('level');
      expect(support).toHaveProperty('hasBasic');
      expect(support).toHaveProperty('has256');
      expect(support).toHaveProperty('has16m');
    });
  });

  describe('createPigment factory', () => {
    it('should create new pigment instances', () => {
      const pigment = PigmentExports.createPigment();
      expect(pigment).toBeDefined();
      expect(typeof pigment).toBe('function');
    });

    it('should accept options', () => {
      const pigment = PigmentExports.createPigment({ level: 3 });
      expect(pigment).toBeDefined();
      expect((pigment as any).level).toBe(3);
    });
  });
});
