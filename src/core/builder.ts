import type { PigmentKernel, Style } from '../types.js';
import { generateModifierCode, generateColorCode, generateAnsi256Code, generateRgbCode } from './ansi.js';
import { hexToRgb } from '../utils/hex-to-rgb.js';
import { hslToRgb } from '../utils/hsl-to-rgb.js';

/**
 * Builder-pattern Pigment for explicit composition.
 *
 * @example
 * ```typescript
 * const builder = new BuilderPigment(kernel);
 * const styled = builder.bold().red().paint('Error!');
 * ```
 */
export class BuilderPigment {
  private styles: Style[] = [];

  constructor(_kernel: PigmentKernel) {}

  bold(): this {
    this.styles.push(generateModifierCode('bold'));
    return this;
  }

  dim(): this {
    this.styles.push(generateModifierCode('dim'));
    return this;
  }

  italic(): this {
    this.styles.push(generateModifierCode('italic'));
    return this;
  }

  underline(): this {
    this.styles.push(generateModifierCode('underline'));
    return this;
  }

  strikethrough(): this {
    this.styles.push(generateModifierCode('strikethrough'));
    return this;
  }

  inverse(): this {
    this.styles.push(generateModifierCode('inverse'));
    return this;
  }

  hidden(): this {
    this.styles.push(generateModifierCode('hidden'));
    return this;
  }

  reset(): this {
    this.styles.push(generateModifierCode('reset'));
    return this;
  }

  black(): this {
    this.styles.push(generateColorCode('black', false));
    return this;
  }

  red(): this {
    this.styles.push(generateColorCode('red', false));
    return this;
  }

  green(): this {
    this.styles.push(generateColorCode('green', false));
    return this;
  }

  yellow(): this {
    this.styles.push(generateColorCode('yellow', false));
    return this;
  }

  blue(): this {
    this.styles.push(generateColorCode('blue', false));
    return this;
  }

  magenta(): this {
    this.styles.push(generateColorCode('magenta', false));
    return this;
  }

  cyan(): this {
    this.styles.push(generateColorCode('cyan', false));
    return this;
  }

  white(): this {
    this.styles.push(generateColorCode('white', false));
    return this;
  }

  blackBright(): this {
    this.styles.push(generateColorCode('blackBright', false));
    return this;
  }

  redBright(): this {
    this.styles.push(generateColorCode('redBright', false));
    return this;
  }

  greenBright(): this {
    this.styles.push(generateColorCode('greenBright', false));
    return this;
  }

  yellowBright(): this {
    this.styles.push(generateColorCode('yellowBright', false));
    return this;
  }

  blueBright(): this {
    this.styles.push(generateColorCode('blueBright', false));
    return this;
  }

  magentaBright(): this {
    this.styles.push(generateColorCode('magentaBright', false));
    return this;
  }

  cyanBright(): this {
    this.styles.push(generateColorCode('cyanBright', false));
    return this;
  }

  whiteBright(): this {
    this.styles.push(generateColorCode('whiteBright', false));
    return this;
  }

  gray(): this {
    this.styles.push(generateColorCode('gray', false));
    return this;
  }

  grey(): this {
    this.styles.push(generateColorCode('grey', false));
    return this;
  }

  bgBlack(): this {
    this.styles.push(generateColorCode('black', true));
    return this;
  }

  bgRed(): this {
    this.styles.push(generateColorCode('red', true));
    return this;
  }

  bgGreen(): this {
    this.styles.push(generateColorCode('green', true));
    return this;
  }

  bgYellow(): this {
    this.styles.push(generateColorCode('yellow', true));
    return this;
  }

  bgBlue(): this {
    this.styles.push(generateColorCode('blue', true));
    return this;
  }

  bgMagenta(): this {
    this.styles.push(generateColorCode('magenta', true));
    return this;
  }

  bgCyan(): this {
    this.styles.push(generateColorCode('cyan', true));
    return this;
  }

  bgWhite(): this {
    this.styles.push(generateColorCode('white', true));
    return this;
  }

  bgBlackBright(): this {
    this.styles.push(generateColorCode('blackBright', true));
    return this;
  }

  bgRedBright(): this {
    this.styles.push(generateColorCode('redBright', true));
    return this;
  }

  bgGreenBright(): this {
    this.styles.push(generateColorCode('greenBright', true));
    return this;
  }

  bgYellowBright(): this {
    this.styles.push(generateColorCode('yellowBright', true));
    return this;
  }

  bgBlueBright(): this {
    this.styles.push(generateColorCode('blueBright', true));
    return this;
  }

  bgMagentaBright(): this {
    this.styles.push(generateColorCode('magentaBright', true));
    return this;
  }

  bgCyanBright(): this {
    this.styles.push(generateColorCode('cyanBright', true));
    return this;
  }

  bgWhiteBright(): this {
    this.styles.push(generateColorCode('whiteBright', true));
    return this;
  }

  bgGray(): this {
    this.styles.push(generateColorCode('gray', true));
    return this;
  }

  bgGrey(): this {
    this.styles.push(generateColorCode('grey', true));
    return this;
  }

  ansi256(code: number): this {
    this.styles.push(generateAnsi256Code(code, false));
    return this;
  }

  bgAnsi256(code: number): this {
    this.styles.push(generateAnsi256Code(code, true));
    return this;
  }

  rgb(r: number, g: number, b: number): this {
    this.styles.push(generateRgbCode(r, g, b, false));
    return this;
  }

  bgRgb(r: number, g: number, b: number): this {
    this.styles.push(generateRgbCode(r, g, b, true));
    return this;
  }

  hex(color: string): this {
    const rgb = hexToRgb(color);
    if (rgb) {
      const { r, g, b } = rgb;
      this.styles.push(generateRgbCode(r, g, b, false));
    }
    return this;
  }

  bgHex(color: string): this {
    const rgb = hexToRgb(color);
    if (rgb) {
      const { r, g, b } = rgb;
      this.styles.push(generateRgbCode(r, g, b, true));
    }
    return this;
  }

  hsl(h: number, s: number, l: number): this {
    const { r, g, b } = hslToRgb(h, s, l);
    this.styles.push(generateRgbCode(r, g, b, false));
    return this;
  }

  bgHsl(h: number, s: number, l: number): this {
    const { r, g, b } = hslToRgb(h, s, l);
    this.styles.push(generateRgbCode(r, g, b, true));
    return this;
  }

  paint(text: string): string {
    if (this.styles.length === 0) {
      return text;
    }

    const open = this.styles.map((style) => style.open).join('');
    const close = [...this.styles].reverse().map((style) => style.close).join('');
    return `${open}${text}${close}`;
  }
}
