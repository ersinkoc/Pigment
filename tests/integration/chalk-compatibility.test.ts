import { describe, it, expect } from 'vitest';
import { Chalk } from '../../src/core/chalk';
import defaultChalk from '../../src/core/chalk-default';

describe('Chalk Compatibility Integration Tests', () => {
  describe('API Compatibility', () => {
    it('should match Chalk basic API', () => {
      const chalk = new Chalk({ level: 3 });

      // Basic colors
      expect(chalk.red('test')).toContain('\x1b[31m');
      expect(chalk.green('test')).toContain('\x1b[32m');
      expect(chalk.yellow('test')).toContain('\x1b[33m');
      expect(chalk.blue('test')).toContain('\x1b[34m');
    });

    it('should match Chalk modifier API', () => {
      const chalk = new Chalk({ level: 3 });

      expect(chalk.bold('test')).toContain('\x1b[1m');
      expect(chalk.dim('test')).toContain('\x1b[2m');
      expect(chalk.italic('test')).toContain('\x1b[3m');
      expect(chalk.underline('test')).toContain('\x1b[4m');
    });

    it('should match Chalk background color API', () => {
      const chalk = new Chalk({ level: 3 });

      expect(chalk.bgRed('test')).toContain('\x1b[41m');
      expect(chalk.bgGreen('test')).toContain('\x1b[42m');
      expect(chalk.bgBlue('test')).toContain('\x1b[44m');
    });

    it('should match Chalk bright color API', () => {
      const chalk = new Chalk({ level: 3 });

      expect(chalk.redBright('test')).toContain('\x1b[91m');
      expect(chalk.greenBright('test')).toContain('\x1b[92m');
      expect(chalk.blueBright('test')).toContain('\x1b[94m');
    });
  });

  describe('Extended Color Methods', () => {
    it('should match Chalk rgb() API', () => {
      const chalk = new Chalk({ level: 3 });
      const colorFn = chalk.rgb(255, 0, 0);

      expect(typeof colorFn).toBe('function');
      expect(colorFn('test')).toContain('\x1b[38;2;255;0;0m');
    });

    it('should match Chalk bgRgb() API', () => {
      const chalk = new Chalk({ level: 3 });
      const colorFn = chalk.bgRgb(0, 255, 0);

      expect(typeof colorFn).toBe('function');
      expect(colorFn('test')).toContain('\x1b[48;2;0;255;0m');
    });

    it('should match Chalk hex() API', () => {
      const chalk = new Chalk({ level: 3 });
      const colorFn = chalk.hex('#FF0000');

      expect(typeof colorFn).toBe('function');
      expect(colorFn('test')).toContain('\x1b[38;2;255;0;0m');
    });

    it('should match Chalk bgHex() API', () => {
      const chalk = new Chalk({ level: 3 });
      const colorFn = chalk.bgHex('#00FF00');

      expect(typeof colorFn).toBe('function');
      expect(colorFn('test')).toContain('\x1b[48;2;0;255;0m');
    });

    it('should match Chalk ansi256() API', () => {
      const chalk = new Chalk({ level: 3 });
      const colorFn = chalk.ansi256(196);

      expect(typeof colorFn).toBe('function');
      expect(colorFn('test')).toContain('\x1b[38;5;196m');
    });

    it('should match Chalk bgAnsi256() API', () => {
      const chalk = new Chalk({ level: 3 });
      const colorFn = chalk.bgAnsi256(21);

      expect(typeof colorFn).toBe('function');
      expect(colorFn('test')).toContain('\x1b[48;5;21m');
    });
  });

  describe('Level Support', () => {
    it('should support level property', () => {
      const chalk = new Chalk({ level: 3 });
      expect(chalk.level).toBe(3);
    });

    it('should support level 0', () => {
      const chalk = new Chalk({ level: 0 });
      expect(chalk.level).toBe(0);
    });

    it('should support level 1', () => {
      const chalk = new Chalk({ level: 1 });
      expect(chalk.level).toBe(1);
    });

    it('should support level 2', () => {
      const chalk = new Chalk({ level: 2 });
      expect(chalk.level).toBe(2);
    });
  });

  describe('supportsColor Property', () => {
    it('should have supportsColor property', () => {
      const chalk = new Chalk({ level: 3 });
      expect(chalk.supportsColor).toBeDefined();
    });

    it('should have level in supportsColor', () => {
      const chalk = new Chalk({ level: 3 });
      expect(chalk.supportsColor.level).toBe(3);
    });

    it('should have hasBasic in supportsColor', () => {
      const chalk = new Chalk({ level: 3 });
      expect(chalk.supportsColor.hasBasic).toBe(true);
    });

    it('should have has256 in supportsColor', () => {
      const chalk = new Chalk({ level: 3 });
      expect(chalk.supportsColor.has256).toBe(true);
    });

    it('should have has16m in supportsColor', () => {
      const chalk = new Chalk({ level: 3 });
      expect(chalk.supportsColor.has16m).toBe(true);
    });
  });

  describe('Default Instance', () => {
    it('should export default chalk instance', () => {
      expect(defaultChalk).toBeDefined();
      expect(defaultChalk).toBeInstanceOf(Chalk);
    });

    it('should have level set from supportsColor', () => {
      expect(defaultChalk.level).toBe(defaultChalk.supportsColor.level);
    });

    it('should work with default instance', () => {
      const result = defaultChalk.red('test');
      expect(result).toContain('test');
    });
  });

  describe('Visible Method', () => {
    it('should return text unchanged in visible()', () => {
      const chalk = new Chalk({ level: 3 });
      expect(chalk.visible('test')).toBe('test');
    });

    it('should return text unchanged in visible() when level is 0', () => {
      const chalk = new Chalk({ level: 0 });
      expect(chalk.visible('test')).toBe('test');
    });
  });

  describe('Gray/Grey Aliases', () => {
    it('should support gray alias', () => {
      const chalk = new Chalk({ level: 3 });
      const result = chalk.gray('test');
      expect(result).toContain('\x1b[90m');
    });

    it('should support grey alias', () => {
      const chalk = new Chalk({ level: 3 });
      const result = chalk.grey('test');
      expect(result).toContain('\x1b[90m');
    });

    it('should support bgGray alias', () => {
      const chalk = new Chalk({ level: 3 });
      const result = chalk.bgGray('test');
      expect(result).toContain('test');
    });

    it('should support bgGrey alias', () => {
      const chalk = new Chalk({ level: 3 });
      const result = chalk.bgGrey('test');
      expect(result).toContain('test');
    });
  });

  describe('Real-world Usage', () => {
    it('should format CLI output', () => {
      const chalk = new Chalk({ level: 3 });

      const success = chalk.green('Success: Operation completed');
      const error = chalk.red('Error: Something went wrong');
      const info = chalk.blue('Info: Starting process...');

      expect(success).toContain('Success');
      expect(error).toContain('Error');
      expect(info).toContain('Info');
    });

    it('should format log levels', () => {
      const chalk = new Chalk({ level: 3 });

      const debug = chalk.gray('[DEBUG]');
      const info = chalk.blue('[INFO]');
      const warn = chalk.yellow('[WARN]');
      const error = chalk.red('[ERROR]');

      expect(debug).toContain('[DEBUG]');
      expect(info).toContain('[INFO]');
      expect(warn).toContain('[WARN]');
      expect(error).toContain('[ERROR]');
    });

    it('should format status messages', () => {
      const chalk = new Chalk({ level: 3 });

      const pass = chalk.green('PASS');
      const fail = chalk.red('FAIL');
      const skip = chalk.yellow('SKIP');

      expect(pass).toContain('PASS');
      expect(fail).toContain('FAIL');
      expect(skip).toContain('SKIP');
    });
  });
});
