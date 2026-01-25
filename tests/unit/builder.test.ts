import { describe, it, expect } from 'vitest';
import { BuilderPigment } from '../../src/core/builder';

describe('Builder Pattern API', () => {
  let builder: BuilderPigment;

  beforeEach(() => {
    builder = new BuilderPigment(null);
  });

  describe('Modifiers', () => {
    it('should apply bold', () => {
      const result = builder.bold().paint('test');
      expect(result).toContain('\x1b[1m');
      expect(result).toContain('test');
    });

    it('should apply dim', () => {
      const result = builder.dim().paint('test');
      expect(result).toContain('\x1b[2m');
    });

    it('should apply italic', () => {
      const result = builder.italic().paint('test');
      expect(result).toContain('\x1b[3m');
    });

    it('should apply underline', () => {
      const result = builder.underline().paint('test');
      expect(result).toContain('\x1b[4m');
    });

    it('should apply strikethrough', () => {
      const result = builder.strikethrough().paint('test');
      expect(result).toContain('\x1b[9m');
    });

    it('should apply inverse', () => {
      const result = builder.inverse().paint('test');
      expect(result).toContain('\x1b[7m');
    });

    it('should apply hidden', () => {
      const result = builder.hidden().paint('test');
      expect(result).toContain('\x1b[8m');
    });

    it('should apply reset', () => {
      const result = builder.reset().paint('test');
      expect(result).toContain('\x1b[0m');
    });

    it('should chain modifiers', () => {
      const result = builder.bold().dim().paint('test');
      expect(result).toContain('\x1b[1m');
      expect(result).toContain('\x1b[2m');
    });
  });

  describe('Colors', () => {
    it('should apply black', () => {
      const result = builder.black().paint('test');
      expect(result).toContain('\x1b[30m');
    });

    it('should apply red', () => {
      const result = builder.red().paint('test');
      expect(result).toContain('\x1b[31m');
    });

    it('should apply green', () => {
      const result = builder.green().paint('test');
      expect(result).toContain('\x1b[32m');
    });

    it('should apply yellow', () => {
      const result = builder.yellow().paint('test');
      expect(result).toContain('\x1b[33m');
    });

    it('should apply blue', () => {
      const result = builder.blue().paint('test');
      expect(result).toContain('\x1b[34m');
    });

    it('should apply magenta', () => {
      const result = builder.magenta().paint('test');
      expect(result).toContain('\x1b[35m');
    });

    it('should apply cyan', () => {
      const result = builder.cyan().paint('test');
      expect(result).toContain('\x1b[36m');
    });

    it('should apply white', () => {
      const result = builder.white().paint('test');
      expect(result).toContain('\x1b[37m');
    });

    it('should apply gray', () => {
      const result = builder.gray().paint('test');
      expect(result).toContain('\x1b[90m');
    });

    it('should apply grey alias', () => {
      const result = builder.grey().paint('test');
      expect(result).toContain('\x1b[90m');
    });

    it('should apply background color', () => {
      const result = builder.bgRed().paint('test');
      expect(result).toContain('\x1b[41m');
    });

    it('should apply bgBlack', () => {
      const result = builder.bgBlack().paint('test');
      expect(result).toContain('\x1b[40m');
    });

    it('should apply bgGreen', () => {
      const result = builder.bgGreen().paint('test');
      expect(result).toContain('\x1b[42m');
    });

    it('should apply bgYellow', () => {
      const result = builder.bgYellow().paint('test');
      expect(result).toContain('\x1b[43m');
    });

    it('should apply bgBlue', () => {
      const result = builder.bgBlue().paint('test');
      expect(result).toContain('\x1b[44m');
    });

    it('should apply bgMagenta', () => {
      const result = builder.bgMagenta().paint('test');
      expect(result).toContain('\x1b[45m');
    });

    it('should apply bgCyan', () => {
      const result = builder.bgCyan().paint('test');
      expect(result).toContain('\x1b[46m');
    });

    it('should apply bgWhite', () => {
      const result = builder.bgWhite().paint('test');
      expect(result).toContain('\x1b[47m');
    });

    it('should apply bgGray', () => {
      const result = builder.bgGray().paint('test');
      expect(result).toContain('\x1b[100m');
    });

    it('should apply bgGrey alias', () => {
      const result = builder.bgGrey().paint('test');
      expect(result).toContain('\x1b[100m');
    });

    it('should apply bright color', () => {
      const result = builder.redBright().paint('test');
      expect(result).toContain('\x1b[91m');
    });

    it('should apply blackBright', () => {
      const result = builder.blackBright().paint('test');
      expect(result).toContain('\x1b[90m');
    });

    it('should apply greenBright', () => {
      const result = builder.greenBright().paint('test');
      expect(result).toContain('\x1b[92m');
    });

    it('should apply yellowBright', () => {
      const result = builder.yellowBright().paint('test');
      expect(result).toContain('\x1b[93m');
    });

    it('should apply blueBright', () => {
      const result = builder.blueBright().paint('test');
      expect(result).toContain('\x1b[94m');
    });

    it('should apply magentaBright', () => {
      const result = builder.magentaBright().paint('test');
      expect(result).toContain('\x1b[95m');
    });

    it('should apply cyanBright', () => {
      const result = builder.cyanBright().paint('test');
      expect(result).toContain('\x1b[96m');
    });

    it('should apply whiteBright', () => {
      const result = builder.whiteBright().paint('test');
      expect(result).toContain('\x1b[97m');
    });

    it('should apply bgBlackBright', () => {
      const result = builder.bgBlackBright().paint('test');
      expect(result).toContain('\x1b[100m');
    });

    it('should apply bgRedBright', () => {
      const result = builder.bgRedBright().paint('test');
      expect(result).toContain('\x1b[101m');
    });

    it('should apply bgGreenBright', () => {
      const result = builder.bgGreenBright().paint('test');
      expect(result).toContain('\x1b[102m');
    });

    it('should apply bgYellowBright', () => {
      const result = builder.bgYellowBright().paint('test');
      expect(result).toContain('\x1b[103m');
    });

    it('should apply bgBlueBright', () => {
      const result = builder.bgBlueBright().paint('test');
      expect(result).toContain('\x1b[104m');
    });

    it('should apply bgMagentaBright', () => {
      const result = builder.bgMagentaBright().paint('test');
      expect(result).toContain('\x1b[105m');
    });

    it('should apply bgCyanBright', () => {
      const result = builder.bgCyanBright().paint('test');
      expect(result).toContain('\x1b[106m');
    });

    it('should apply bgWhiteBright', () => {
      const result = builder.bgWhiteBright().paint('test');
      expect(result).toContain('\x1b[107m');
    });

    it('should chain colors', () => {
      const result = builder.red().bold().paint('test');
      expect(result).toContain('\x1b[31m');
      expect(result).toContain('\x1b[1m');
    });
  });

  describe('Extended Colors', () => {
    it('should apply ANSI 256', () => {
      const result = builder.ansi256(196).paint('test');
      expect(result).toContain('\x1b[38;5;196m');
    });

    it('should apply bgAnsi256', () => {
      const result = builder.bgAnsi256(196).paint('test');
      expect(result).toContain('\x1b[48;5;196m');
    });

    it('should apply RGB', () => {
      const result = builder.rgb(255, 0, 0).paint('test');
      expect(result).toContain('\x1b[38;2;255;0;0m');
    });

    it('should apply HEX', () => {
      const result = builder.hex('#FF0000').paint('test');
      expect(result).toContain('\x1b[38;2;255;0;0m');
    });

    it('should apply bgHex', () => {
      const result = builder.bgHex('#FF0000').paint('test');
      expect(result).toContain('\x1b[48;2;255;0;0m');
    });

    it('should apply background RGB', () => {
      const result = builder.bgRgb(255, 0, 0).paint('test');
      expect(result).toContain('\x1b[48;2;255;0;0m');
    });

    it('should apply HSL', () => {
      const result = builder.hsl(0, 100, 50).paint('test');
      expect(result).toContain('\x1b[38;2;255;0;0m');
    });

    it('should apply bgHsl', () => {
      const result = builder.bgHsl(0, 100, 50).paint('test');
      expect(result).toContain('\x1b[48;2;255;0;0m');
    });

    it('should throw error for invalid hex', () => {
      expect(() => builder.hex('invalid').paint('test')).toThrow('Invalid HEX color format');
    });

    it('should throw error for invalid bgHex', () => {
      expect(() => builder.bgHex('invalid').paint('test')).toThrow('Invalid HEX color format');
    });
  });

  describe('paint', () => {
    it('should apply all accumulated styles', () => {
      const result = builder.bold().red().underline().paint('test');
      expect(result).toContain('\x1b[1m');
      expect(result).toContain('\x1b[31m');
      expect(result).toContain('\x1b[4m');
    });

    it('should return text unchanged when no styles applied', () => {
      const result = builder.paint('test');
      expect(result).toBe('test');
    });

    it('should handle empty text', () => {
      const result = builder.bold().paint('');
      // Empty strings should return empty without unnecessary ANSI codes
      expect(result).toBe('');
    });
  });

  describe('Chaining', () => {
    it('should return new instance for each method', () => {
      const builder1 = builder.bold();
      const builder2 = builder1.red();
      const result = builder2.paint('test');
      expect(result).toContain('\x1b[1m');
      expect(result).toContain('\x1b[31m');
    });

    it('should allow long chains', () => {
      const result = builder
        .bold()
        .dim()
        .italic()
        .underline()
        .strikethrough()
        .inverse()
        .hidden()
        .paint('test');
      expect(result).toContain('test');
      expect(result).toContain('\x1b[1m');
    });
  });
});
