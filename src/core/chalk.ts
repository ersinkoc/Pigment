import type { ColorSupport } from '../types.js';
import { createPigment } from './factory.js';
import { detectColorSupport } from '../utils/color-support.js';

export class Chalk {
  level: 0 | 1 | 2 | 3;
  supportsColor: ColorSupport;
  private pigment: ReturnType<typeof createPigment>;

  constructor(options?: { level?: 0 | 1 | 2 | 3 }) {
    const colorSupport = detectColorSupport(options?.level);
    this.level = options?.level ?? colorSupport.level;
    this.supportsColor = colorSupport;
    this.pigment = createPigment({ level: this.level });
  }

  red(text: string): string {
    return this.pigment.red(text);
  }

  green(text: string): string {
    return this.pigment.green(text);
  }

  yellow(text: string): string {
    return this.pigment.yellow(text);
  }

  blue(text: string): string {
    return this.pigment.blue(text);
  }

  magenta(text: string): string {
    return this.pigment.magenta(text);
  }

  cyan(text: string): string {
    return this.pigment.cyan(text);
  }

  white(text: string): string {
    return this.pigment.white(text);
  }

  black(text: string): string {
    return this.pigment.black(text);
  }

  redBright(text: string): string {
    return this.pigment.redBright(text);
  }

  greenBright(text: string): string {
    return this.pigment.greenBright(text);
  }

  yellowBright(text: string): string {
    return this.pigment.yellowBright(text);
  }

  blueBright(text: string): string {
    return this.pigment.blueBright(text);
  }

  magentaBright(text: string): string {
    return this.pigment.magentaBright(text);
  }

  cyanBright(text: string): string {
    return this.pigment.cyanBright(text);
  }

  whiteBright(text: string): string {
    return this.pigment.whiteBright(text);
  }

  gray(text: string): string {
    return this.pigment.gray(text);
  }

  grey(text: string): string {
    return this.pigment.grey(text);
  }

  bgRed(text: string): string {
    return this.pigment.bgRed(text);
  }

  bgGreen(text: string): string {
    return this.pigment.bgGreen(text);
  }

  bgYellow(text: string): string {
    return this.pigment.bgYellow(text);
  }

  bgBlue(text: string): string {
    return this.pigment.bgBlue(text);
  }

  bgMagenta(text: string): string {
    return this.pigment.bgMagenta(text);
  }

  bgCyan(text: string): string {
    return this.pigment.bgCyan(text);
  }

  bgWhite(text: string): string {
    return this.pigment.bgWhite(text);
  }

  bgBlack(text: string): string {
    return this.pigment.bgBlack(text);
  }

  bgRedBright(text: string): string {
    return this.pigment.bgRedBright(text);
  }

  bgGreenBright(text: string): string {
    return this.pigment.bgGreenBright(text);
  }

  bgYellowBright(text: string): string {
    return this.pigment.bgYellowBright(text);
  }

  bgBlueBright(text: string): string {
    return this.pigment.bgBlueBright(text);
  }

  bgMagentaBright(text: string): string {
    return this.pigment.bgMagentaBright(text);
  }

  bgCyanBright(text: string): string {
    return this.pigment.bgCyanBright(text);
  }

  bgWhiteBright(text: string): string {
    return this.pigment.bgWhiteBright(text);
  }

  bgGray(text: string): string {
    return this.pigment.bgGray(text);
  }

  bgGrey(text: string): string {
    return this.pigment.bgGrey(text);
  }

  bold(text: string): string {
    return this.pigment.bold(text);
  }

  dim(text: string): string {
    return this.pigment.dim(text);
  }

  italic(text: string): string {
    return this.pigment.italic(text);
  }

  underline(text: string): string {
    return this.pigment.underline(text);
  }

  strikethrough(text: string): string {
    return this.pigment.strikethrough(text);
  }

  inverse(text: string): string {
    return this.pigment.inverse(text);
  }

  hidden(text: string): string {
    return this.pigment.hidden(text);
  }

  reset(text: string): string {
    return this.pigment.reset(text);
  }

  visible(text: string): string {
    return this.supportsColor.level > 0 ? text : text;
  }

  rgb(r: number, g: number, b: number): (text: string) => string {
    const coloredPigment = this.pigment.rgb(r, g, b);
    return (text: string) => coloredPigment(text);
  }

  bgRgb(r: number, g: number, b: number): (text: string) => string {
    const coloredPigment = this.pigment.bgRgb(r, g, b);
    return (text: string) => coloredPigment(text);
  }

  hex(color: string): (text: string) => string {
    const coloredPigment = this.pigment.hex(color);
    return (text: string) => coloredPigment(text);
  }

  bgHex(color: string): (text: string) => string {
    const coloredPigment = this.pigment.bgHex(color);
    return (text: string) => coloredPigment(text);
  }

  ansi256(code: number): (text: string) => string {
    const coloredPigment = this.pigment.ansi256(code);
    return (text: string) => coloredPigment(text);
  }

  bgAnsi256(code: number): (text: string) => string {
    const coloredPigment = this.pigment.bgAnsi256(code);
    return (text: string) => coloredPigment(text);
  }
}
