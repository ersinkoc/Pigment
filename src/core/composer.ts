import type { Styler } from '../types.js';
import { applyStyle } from './styler.js';
import { ANSI_MODIFIERS, ANSI_FOREGROUND_COLORS, ANSI_FOREGROUND_BRIGHT_COLORS, ANSI_BACKGROUND_COLORS, ANSI_BACKGROUND_BRIGHT_COLORS } from '../constants.js';

export const bold: Styler = (text) => applyStyle(text, '\x1b[1m', '\x1b[22m');
export const dim: Styler = (text) => applyStyle(text, '\x1b[2m', '\x1b[22m');
export const italic: Styler = (text) => applyStyle(text, '\x1b[3m', '\x1b[23m');
export const underline: Styler = (text) => applyStyle(text, '\x1b[4m', '\x1b[24m');
export const strikethrough: Styler = (text) => applyStyle(text, '\x1b[9m', '\x1b[29m');
export const inverse: Styler = (text) => applyStyle(text, '\x1b[7m', '\x1b[27m');
export const hidden: Styler = (text) => applyStyle(text, '\x1b[8m', '\x1b[28m');
export const reset: Styler = (text) => applyStyle(text, '\x1b[0m', '\x1b[0m');

export const black: Styler = (text) => applyStyle(text, '\x1b[30m', '\x1b[39m');
export const red: Styler = (text) => applyStyle(text, '\x1b[31m', '\x1b[39m');
export const green: Styler = (text) => applyStyle(text, '\x1b[32m', '\x1b[39m');
export const yellow: Styler = (text) => applyStyle(text, '\x1b[33m', '\x1b[39m');
export const blue: Styler = (text) => applyStyle(text, '\x1b[34m', '\x1b[39m');
export const magenta: Styler = (text) => applyStyle(text, '\x1b[35m', '\x1b[39m');
export const cyan: Styler = (text) => applyStyle(text, '\x1b[36m', '\x1b[39m');
export const white: Styler = (text) => applyStyle(text, '\x1b[37m', '\x1b[39m');

export const blackBright: Styler = (text) => applyStyle(text, '\x1b[90m', '\x1b[39m');
export const redBright: Styler = (text) => applyStyle(text, '\x1b[91m', '\x1b[39m');
export const greenBright: Styler = (text) => applyStyle(text, '\x1b[92m', '\x1b[39m');
export const yellowBright: Styler = (text) => applyStyle(text, '\x1b[93m', '\x1b[39m');
export const blueBright: Styler = (text) => applyStyle(text, '\x1b[94m', '\x1b[39m');
export const magentaBright: Styler = (text) => applyStyle(text, '\x1b[95m', '\x1b[39m');
export const cyanBright: Styler = (text) => applyStyle(text, '\x1b[96m', '\x1b[39m');
export const whiteBright: Styler = (text) => applyStyle(text, '\x1b[97m', '\x1b[39m');

export const gray = blackBright;
export const grey = blackBright;

export const bgBlack: Styler = (text) => applyStyle(text, '\x1b[40m', '\x1b[49m');
export const bgRed: Styler = (text) => applyStyle(text, '\x1b[41m', '\x1b[49m');
export const bgGreen: Styler = (text) => applyStyle(text, '\x1b[42m', '\x1b[49m');
export const bgYellow: Styler = (text) => applyStyle(text, '\x1b[43m', '\x1b[49m');
export const bgBlue: Styler = (text) => applyStyle(text, '\x1b[44m', '\x1b[49m');
export const bgMagenta: Styler = (text) => applyStyle(text, '\x1b[45m', '\x1b[49m');
export const bgCyan: Styler = (text) => applyStyle(text, '\x1b[46m', '\x1b[49m');
export const bgWhite: Styler = (text) => applyStyle(text, '\x1b[47m', '\x1b[49m');

export const bgBlackBright: Styler = (text) => applyStyle(text, '\x1b[100m', '\x1b[49m');
export const bgRedBright: Styler = (text) => applyStyle(text, '\x1b[101m', '\x1b[49m');
export const bgGreenBright: Styler = (text) => applyStyle(text, '\x1b[102m', '\x1b[49m');
export const bgYellowBright: Styler = (text) => applyStyle(text, '\x1b[103m', '\x1b[49m');
export const bgBlueBright: Styler = (text) => applyStyle(text, '\x1b[104m', '\x1b[49m');
export const bgMagentaBright: Styler = (text) => applyStyle(text, '\x1b[105m', '\x1b[49m');
export const bgCyanBright: Styler = (text) => applyStyle(text, '\x1b[106m', '\x1b[49m');
export const bgWhiteBright: Styler = (text) => applyStyle(text, '\x1b[107m', '\x1b[49m');

export const bgGray = bgBlackBright;
export const bgGrey = bgBlackBright;

export function compose(...stylers: Styler[]): Styler {
  return (text: string) => {
    return stylers.reduce((acc, styler) => styler(acc), text);
  };
}
