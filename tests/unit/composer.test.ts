import { describe, it, expect } from 'vitest';
import { createPigment } from '../../src/core/factory';
import {
  bold, dim, italic, underline, strikethrough, inverse, hidden, reset,
  black, red, green, yellow, blue, magenta, cyan, white,
  blackBright, redBright, greenBright, yellowBright, blueBright, magentaBright, cyanBright, whiteBright,
  gray, grey,
  bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite,
  bgBlackBright, bgRedBright, bgGreenBright, bgYellowBright, bgBlueBright, bgMagentaBright, bgCyanBright, bgWhiteBright,
  bgGray, bgGrey,
  compose
} from '../../src/core/composer';

describe('Function Composition API', () => {
  describe('Modifiers', () => {
    it('should export bold', () => {
      expect(bold('test')).toContain('\x1b[1m');
      expect(bold('test')).toContain('\x1b[22m');
    });

    it('should export dim', () => {
      expect(dim('test')).toContain('\x1b[2m');
    });

    it('should export italic', () => {
      expect(italic('test')).toContain('\x1b[3m');
    });

    it('should export underline', () => {
      expect(underline('test')).toContain('\x1b[4m');
    });

    it('should export strikethrough', () => {
      expect(strikethrough('test')).toContain('\x1b[9m');
    });

    it('should export inverse', () => {
      expect(inverse('test')).toContain('\x1b[7m');
    });

    it('should export hidden', () => {
      expect(hidden('test')).toContain('\x1b[8m');
    });

    it('should export reset', () => {
      expect(reset('test')).toContain('\x1b[0m');
    });
  });

  describe('Foreground colors', () => {
    it('should export black', () => {
      expect(black('test')).toContain('\x1b[30m');
    });

    it('should export red', () => {
      expect(red('test')).toContain('\x1b[31m');
    });

    it('should export green', () => {
      expect(green('test')).toContain('\x1b[32m');
    });

    it('should export yellow', () => {
      expect(yellow('test')).toContain('\x1b[33m');
    });

    it('should export blue', () => {
      expect(blue('test')).toContain('\x1b[34m');
    });

    it('should export magenta', () => {
      expect(magenta('test')).toContain('\x1b[35m');
    });

    it('should export cyan', () => {
      expect(cyan('test')).toContain('\x1b[36m');
    });

    it('should export white', () => {
      expect(white('test')).toContain('\x1b[37m');
    });
  });

  describe('Bright foreground colors', () => {
    it('should export blackBright', () => {
      expect(blackBright('test')).toContain('\x1b[90m');
    });

    it('should export redBright', () => {
      expect(redBright('test')).toContain('\x1b[91m');
    });

    it('should export greenBright', () => {
      expect(greenBright('test')).toContain('\x1b[92m');
    });

    it('should export yellowBright', () => {
      expect(yellowBright('test')).toContain('\x1b[93m');
    });

    it('should export blueBright', () => {
      expect(blueBright('test')).toContain('\x1b[94m');
    });

    it('should export magentaBright', () => {
      expect(magentaBright('test')).toContain('\x1b[95m');
    });

    it('should export cyanBright', () => {
      expect(cyanBright('test')).toContain('\x1b[96m');
    });

    it('should export whiteBright', () => {
      expect(whiteBright('test')).toContain('\x1b[97m');
    });
  });

  describe('Gray aliases', () => {
    it('should export gray as blackBright', () => {
      expect(gray('test')).toContain('\x1b[90m');
    });

    it('should export grey as blackBright', () => {
      expect(grey('test')).toContain('\x1b[90m');
    });
  });

  describe('Background colors', () => {
    it('should export bgBlack', () => {
      expect(bgBlack('test')).toContain('\x1b[40m');
    });

    it('should export bgRed', () => {
      expect(bgRed('test')).toContain('\x1b[41m');
    });

    it('should export bgGreen', () => {
      expect(bgGreen('test')).toContain('\x1b[42m');
    });

    it('should export bgYellow', () => {
      expect(bgYellow('test')).toContain('\x1b[43m');
    });

    it('should export bgBlue', () => {
      expect(bgBlue('test')).toContain('\x1b[44m');
    });

    it('should export bgMagenta', () => {
      expect(bgMagenta('test')).toContain('\x1b[45m');
    });

    it('should export bgCyan', () => {
      expect(bgCyan('test')).toContain('\x1b[46m');
    });

    it('should export bgWhite', () => {
      expect(bgWhite('test')).toContain('\x1b[47m');
    });
  });

  describe('Bright background colors', () => {
    it('should export bgBlackBright', () => {
      expect(bgBlackBright('test')).toContain('\x1b[100m');
    });

    it('should export bgRedBright', () => {
      expect(bgRedBright('test')).toContain('\x1b[101m');
    });

    it('should export bgGreenBright', () => {
      expect(bgGreenBright('test')).toContain('\x1b[102m');
    });

    it('should export bgYellowBright', () => {
      expect(bgYellowBright('test')).toContain('\x1b[103m');
    });

    it('should export bgBlueBright', () => {
      expect(bgBlueBright('test')).toContain('\x1b[104m');
    });

    it('should export bgMagentaBright', () => {
      expect(bgMagentaBright('test')).toContain('\x1b[105m');
    });

    it('should export bgCyanBright', () => {
      expect(bgCyanBright('test')).toContain('\x1b[106m');
    });

    it('should export bgWhiteBright', () => {
      expect(bgWhiteBright('test')).toContain('\x1b[107m');
    });
  });

  describe('Background gray aliases', () => {
    it('should export bgGray as bgBlackBright', () => {
      expect(bgGray('test')).toContain('\x1b[100m');
    });

    it('should export bgGrey as bgBlackBright', () => {
      expect(bgGrey('test')).toContain('\x1b[100m');
    });
  });

  describe('Individual stylers', () => {
    it('should handle empty text', () => {
      expect(bold('')).toBe('');
    });

    it('should handle multiline text', () => {
      const result = bold('line1\nline2');
      expect(result).toContain('line1');
      expect(result).toContain('line2');
      expect(result).toContain('\x1b[1m');
    });
  });

  describe('compose', () => {
    it('should compose multiple stylers', () => {
      const styler = compose(bold, red);
      const result = styler('test');
      expect(result).toContain('\x1b[1m');
      expect(result).toContain('\x1b[31m');
      expect(result).toContain('test');
    });

    it('should apply styles in order', () => {
      const styler1 = compose(bold, red);
      const styler2 = compose(red, bold);
      const result1 = styler1('test');
      const result2 = styler2('test');
      expect(result1).not.toBe(result2);
    });

    it('should be reusable', () => {
      const error = compose(bold, red);
      expect(error('test1')).toContain('\x1b[1m');
      expect(error('test2')).toContain('\x1b[1m');
    });

    it('should compose no stylers', () => {
      const styler = compose();
      expect(styler('test')).toBe('test');
    });
  });
});
