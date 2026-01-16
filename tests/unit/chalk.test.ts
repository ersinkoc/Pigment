import { describe, it, expect, beforeEach } from 'vitest';
import { Chalk } from '../../src/core/chalk';
import chalk from '../../src/core/chalk-default';

describe('Chalk Compatibility Layer', () => {
  describe('Chalk Class', () => {
    let chalkInstance: Chalk;

    beforeEach(() => {
      chalkInstance = new Chalk({ level: 3 });
    });

    describe('Constructor', () => {
      it('should create instance with default options', () => {
        const c = new Chalk();
        expect(c).toBeInstanceOf(Chalk);
        expect(c.level).toBeGreaterThanOrEqual(0);
        expect(c.level).toBeLessThanOrEqual(3);
      });

      it('should create instance with custom level', () => {
        const c = new Chalk({ level: 2 });
        expect(c.level).toBe(2);
      });

      it('should set supportsColor property', () => {
        const c = new Chalk({ level: 3 });
        expect(c.supportsColor).toBeDefined();
        expect(c.supportsColor.level).toBe(3);
        expect(c.supportsColor.hasBasic).toBe(true);
        expect(c.supportsColor.has256).toBe(true);
        expect(c.supportsColor.has16m).toBe(true);
      });

      it('should handle level 0', () => {
        const c = new Chalk({ level: 0 });
        expect(c.level).toBe(0);
        expect(c.supportsColor.hasBasic).toBe(false);
      });

      it('should handle level 1', () => {
        const c = new Chalk({ level: 1 });
        expect(c.level).toBe(1);
        expect(c.supportsColor.hasBasic).toBe(true);
        expect(c.supportsColor.has256).toBe(false);
      });
    });

    describe('Foreground colors', () => {
      it('should apply red', () => {
        const result = chalkInstance.red('test');
        expect(result).toContain('\x1b[31m');
        expect(result).toContain('test');
      });

      it('should apply green', () => {
        const result = chalkInstance.green('test');
        expect(result).toContain('\x1b[32m');
      });

      it('should apply yellow', () => {
        const result = chalkInstance.yellow('test');
        expect(result).toContain('\x1b[33m');
      });

      it('should apply blue', () => {
        const result = chalkInstance.blue('test');
        expect(result).toContain('\x1b[34m');
      });

      it('should apply magenta', () => {
        const result = chalkInstance.magenta('test');
        expect(result).toContain('\x1b[35m');
      });

      it('should apply cyan', () => {
        const result = chalkInstance.cyan('test');
        expect(result).toContain('\x1b[36m');
      });

      it('should apply white', () => {
        const result = chalkInstance.white('test');
        expect(result).toContain('\x1b[37m');
      });

      it('should apply black', () => {
        const result = chalkInstance.black('test');
        expect(result).toContain('\x1b[30m');
      });

      it('should apply gray', () => {
        const result = chalkInstance.gray('test');
        expect(result).toContain('\x1b[90m');
      });

      it('should apply grey (alias)', () => {
        const result = chalkInstance.grey('test');
        expect(result).toContain('\x1b[90m');
      });
    });

    describe('Bright foreground colors', () => {
      it('should apply redBright', () => {
        const result = chalkInstance.redBright('test');
        expect(result).toContain('\x1b[91m');
      });

      it('should apply greenBright', () => {
        const result = chalkInstance.greenBright('test');
        expect(result).toContain('\x1b[92m');
      });

      it('should apply yellowBright', () => {
        const result = chalkInstance.yellowBright('test');
        expect(result).toContain('\x1b[93m');
      });

      it('should apply blueBright', () => {
        const result = chalkInstance.blueBright('test');
        expect(result).toContain('\x1b[94m');
      });

      it('should apply magentaBright', () => {
        const result = chalkInstance.magentaBright('test');
        expect(result).toContain('\x1b[95m');
      });

      it('should apply cyanBright', () => {
        const result = chalkInstance.cyanBright('test');
        expect(result).toContain('\x1b[96m');
      });

      it('should apply whiteBright', () => {
        const result = chalkInstance.whiteBright('test');
        expect(result).toContain('\x1b[97m');
      });
    });

    describe('Background colors', () => {
      it('should apply bgRed', () => {
        const result = chalkInstance.bgRed('test');
        expect(result).toContain('\x1b[41m');
      });

      it('should apply bgGreen', () => {
        const result = chalkInstance.bgGreen('test');
        expect(result).toContain('\x1b[42m');
      });

      it('should apply bgYellow', () => {
        const result = chalkInstance.bgYellow('test');
        expect(result).toContain('\x1b[43m');
      });

      it('should apply bgBlue', () => {
        const result = chalkInstance.bgBlue('test');
        expect(result).toContain('\x1b[44m');
      });

      it('should apply bgMagenta', () => {
        const result = chalkInstance.bgMagenta('test');
        expect(result).toContain('\x1b[45m');
      });

      it('should apply bgCyan', () => {
        const result = chalkInstance.bgCyan('test');
        expect(result).toContain('\x1b[46m');
      });

      it('should apply bgWhite', () => {
        const result = chalkInstance.bgWhite('test');
        expect(result).toContain('\x1b[47m');
      });

      it('should apply bgBlack', () => {
        const result = chalkInstance.bgBlack('test');
        expect(result).toContain('\x1b[40m');
      });

      it('should apply bgGray', () => {
        const result = chalkInstance.bgGray('test');
        expect(result).toContain('test');
      });

      it('should apply bgGrey (alias)', () => {
        const result = chalkInstance.bgGrey('test');
        expect(result).toContain('test');
      });
    });

    describe('Bright background colors', () => {
      it('should apply bgRedBright', () => {
        const result = chalkInstance.bgRedBright('test');
        expect(result).toContain('\x1b[101m');
      });

      it('should apply bgGreenBright', () => {
        const result = chalkInstance.bgGreenBright('test');
        expect(result).toContain('\x1b[102m');
      });

      it('should apply bgYellowBright', () => {
        const result = chalkInstance.bgYellowBright('test');
        expect(result).toContain('\x1b[103m');
      });

      it('should apply bgBlueBright', () => {
        const result = chalkInstance.bgBlueBright('test');
        expect(result).toContain('\x1b[104m');
      });

      it('should apply bgMagentaBright', () => {
        const result = chalkInstance.bgMagentaBright('test');
        expect(result).toContain('\x1b[105m');
      });

      it('should apply bgCyanBright', () => {
        const result = chalkInstance.bgCyanBright('test');
        expect(result).toContain('\x1b[106m');
      });

      it('should apply bgWhiteBright', () => {
        const result = chalkInstance.bgWhiteBright('test');
        expect(result).toContain('\x1b[107m');
      });
    });

    describe('Modifiers', () => {
      it('should apply bold', () => {
        const result = chalkInstance.bold('test');
        expect(result).toContain('\x1b[1m');
      });

      it('should apply dim', () => {
        const result = chalkInstance.dim('test');
        expect(result).toContain('\x1b[2m');
      });

      it('should apply italic', () => {
        const result = chalkInstance.italic('test');
        expect(result).toContain('\x1b[3m');
      });

      it('should apply underline', () => {
        const result = chalkInstance.underline('test');
        expect(result).toContain('\x1b[4m');
      });

      it('should apply strikethrough', () => {
        const result = chalkInstance.strikethrough('test');
        expect(result).toContain('\x1b[9m');
      });

      it('should apply inverse', () => {
        const result = chalkInstance.inverse('test');
        expect(result).toContain('\x1b[7m');
      });

      it('should apply hidden', () => {
        const result = chalkInstance.hidden('test');
        expect(result).toContain('\x1b[8m');
      });

      it('should apply reset', () => {
        const result = chalkInstance.reset('test');
        expect(result).toContain('\x1b[0m');
      });
    });

    describe('Visible method', () => {
      it('should return text when colors supported', () => {
        const c = new Chalk({ level: 3 });
        const result = c.visible('test');
        expect(result).toBe('test');
      });

      it('should return text when colors not supported', () => {
        const c = new Chalk({ level: 0 });
        const result = c.visible('test');
        expect(result).toBe('test');
      });
    });

    describe('RGB method', () => {
      it('should return a function that applies rgb color', () => {
        const colorFn = chalkInstance.rgb(255, 0, 0);
        expect(typeof colorFn).toBe('function');
        const result = colorFn('test');
        expect(result).toContain('\x1b[38;2;255;0;0m');
        expect(result).toContain('test');
      });

      it('should apply bgRgb color', () => {
        const colorFn = chalkInstance.bgRgb(0, 255, 0);
        expect(typeof colorFn).toBe('function');
        const result = colorFn('test');
        expect(result).toContain('\x1b[48;2;0;255;0m');
      });
    });

    describe('Hex method', () => {
      it('should return a function that applies hex color', () => {
        const colorFn = chalkInstance.hex('#FF0000');
        expect(typeof colorFn).toBe('function');
        const result = colorFn('test');
        expect(result).toContain('\x1b[38;2;255;0;0m');
        expect(result).toContain('test');
      });

      it('should apply bgHex color', () => {
        const colorFn = chalkInstance.bgHex('#00FF00');
        expect(typeof colorFn).toBe('function');
        const result = colorFn('test');
        expect(result).toContain('\x1b[48;2;0;255;0m');
      });
    });

    describe('ANSI 256 method', () => {
      it('should return a function that applies ansi256 color', () => {
        const colorFn = chalkInstance.ansi256(196);
        expect(typeof colorFn).toBe('function');
        const result = colorFn('test');
        expect(result).toContain('\x1b[38;5;196m');
        expect(result).toContain('test');
      });

      it('should apply bgAnsi256 color', () => {
        const colorFn = chalkInstance.bgAnsi256(21);
        expect(typeof colorFn).toBe('function');
        const result = colorFn('test');
        expect(result).toContain('\x1b[48;5;21m');
      });
    });
  });

  describe('Default chalk export', () => {
    it('should be a Chalk instance', () => {
      expect(chalk).toBeInstanceOf(Chalk);
    });

    it('should have level property', () => {
      expect(chalk.level).toBeGreaterThanOrEqual(0);
      expect(chalk.level).toBeLessThanOrEqual(3);
    });

    it('should have supportsColor property', () => {
      expect(chalk.supportsColor).toBeDefined();
      expect(chalk.supportsColor).toHaveProperty('level');
      expect(chalk.supportsColor).toHaveProperty('hasBasic');
      expect(chalk.supportsColor).toHaveProperty('has256');
      expect(chalk.supportsColor).toHaveProperty('has16m');
    });

    it('should set level from supportsColor', () => {
      expect(chalk.level).toBe(chalk.supportsColor.level);
    });

    it('should have color methods', () => {
      expect(typeof chalk.red).toBe('function');
      expect(typeof chalk.green).toBe('function');
      expect(typeof chalk.blue).toBe('function');
    });

    it('should have modifier methods', () => {
      expect(typeof chalk.bold).toBe('function');
      expect(typeof chalk.italic).toBe('function');
      expect(typeof chalk.underline).toBe('function');
    });
  });
});
