import type { ThemePresetColors, BoxChars } from './types.js';

export const ANSI_MODIFIERS = {
  bold: { open: '\x1b[1m', close: '\x1b[22m' },
  dim: { open: '\x1b[2m', close: '\x1b[22m' },
  italic: { open: '\x1b[3m', close: '\x1b[23m' },
  underline: { open: '\x1b[4m', close: '\x1b[24m' },
  strikethrough: { open: '\x1b[9m', close: '\x1b[29m' },
  inverse: { open: '\x1b[7m', close: '\x1b[27m' },
  hidden: { open: '\x1b[8m', close: '\x1b[28m' },
  reset: { open: '\x1b[0m', close: '\x1b[0m' }
} as const;

export const ANSI_FOREGROUND_COLORS = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37
} as const;

export const ANSI_FOREGROUND_BRIGHT_COLORS = {
  blackBright: 90,
  redBright: 91,
  greenBright: 92,
  yellowBright: 93,
  blueBright: 94,
  magentaBright: 95,
  cyanBright: 96,
  whiteBright: 97
} as const;

export const ANSI_BACKGROUND_COLORS = {
  bgBlack: 40,
  bgRed: 41,
  bgGreen: 42,
  bgYellow: 43,
  bgBlue: 44,
  bgMagenta: 45,
  bgCyan: 46,
  bgWhite: 47
} as const;

export const ANSI_BACKGROUND_BRIGHT_COLORS = {
  bgBlackBright: 100,
  bgRedBright: 101,
  bgGreenBright: 102,
  bgYellowBright: 103,
  bgBlueBright: 104,
  bgMagentaBright: 105,
  bgCyanBright: 106,
  bgWhiteBright: 107
} as const;

export const ANSI_RESET = '\x1b[0m';

export const THEME_PRESETS: Record<string, ThemePresetColors> = {
  monokai: {
    keyword: '#ff79c6',
    string: '#f1fa8c',
    number: '#bd93f9',
    comment: '#6272a4',
    error: '#ff5555',
    success: '#50fa7b',
    warning: '#ffb86c',
    info: '#8be9fd'
  },
  dracula: {
    keyword: '#ff79c6',
    string: '#f1fa8c',
    number: '#bd93f9',
    comment: '#6272a4',
    error: '#ff5555',
    success: '#50fa7b',
    warning: '#ffb86c',
    info: '#8be9fd'
  },
  nord: {
    keyword: '#81a1c1',
    string: '#a3be8c',
    number: '#b48ead',
    comment: '#616e88',
    error: '#bf616a',
    success: '#a3be8c',
    warning: '#ebcb8b',
    info: '#88c0d0'
  },
  github: {
    keyword: '#ff7b72',
    string: '#a5d6ff',
    number: '#79c0ff',
    comment: '#8b949e',
    error: '#f85149',
    success: '#3fb950',
    warning: '#d29922',
    info: '#58a6ff'
  },
  vscode: {
    keyword: '#569cd6',
    string: '#ce9178',
    number: '#b5cea8',
    comment: '#6a9955',
    error: '#f14c4c',
    success: '#4ec9b0',
    warning: '#dcdcaa',
    info: '#9cdcfe'
  },
  'tokyo-night': {
    keyword: '#bb9af7',
    string: '#9ece6a',
    number: '#ff9e64',
    comment: '#565f89',
    error: '#f7768e',
    success: '#73daca',
    warning: '#e0af68',
    info: '#7dcfff'
  },
  catppuccin: {
    keyword: '#cba6f7',
    string: '#a6e3a1',
    number: '#fab387',
    comment: '#6c7086',
    error: '#f38ba8',
    success: '#a6e3a1',
    warning: '#f9e2af',
    info: '#89b4fa'
  },
  'one-dark': {
    keyword: '#c678dd',
    string: '#98c379',
    number: '#d19a66',
    comment: '#5c6370',
    error: '#e06c75',
    success: '#98c379',
    warning: '#e5c07b',
    info: '#61afef'
  },
  solarized: {
    keyword: '#859900',
    string: '#2aa198',
    number: '#d33682',
    comment: '#586e75',
    error: '#dc322f',
    success: '#859900',
    warning: '#b58900',
    info: '#268bd2'
  }
} as const;

export const BOX_BORDERS: Record<string, BoxChars> = {
  single: { tl: '┌', tr: '┐', bl: '└', br: '┘', h: '─', v: '│' },
  double: { tl: '╔', tr: '╗', bl: '╚', br: '╝', h: '═', v: '║' },
  rounded: { tl: '╭', tr: '╮', bl: '╰', br: '╯', h: '─', v: '│' },
  bold: { tl: '┏', tr: '┓', bl: '┗', br: '┛', h: '━', v: '┃' },
  classic: { tl: '+', tr: '+', bl: '+', br: '+', h: '-', v: '|' }
} as const;

export const MODIFIER_NAMES = [
  'bold',
  'dim',
  'italic',
  'underline',
  'strikethrough',
  'inverse',
  'hidden',
  'reset'
] as const;

export const COLOR_NAMES = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'blackBright',
  'redBright',
  'greenBright',
  'yellowBright',
  'blueBright',
  'magentaBright',
  'cyanBright',
  'whiteBright',
  'gray',
  'grey'
] as const;

export const BACKGROUND_COLOR_NAMES = [
  'bgBlack',
  'bgRed',
  'bgGreen',
  'bgYellow',
  'bgBlue',
  'bgMagenta',
  'bgCyan',
  'bgWhite',
  'bgBlackBright',
  'bgRedBright',
  'bgGreenBright',
  'bgYellowBright',
  'bgBlueBright',
  'bgMagentaBright',
  'bgCyanBright',
  'bgWhiteBright',
  'bgGray',
  'bgGrey'
] as const;

export const EXTENDED_COLOR_METHODS = [
  'ansi256',
  'bgAnsi256',
  'rgb',
  'bgRgb',
  'hex',
  'bgHex',
  'hsl',
  'bgHsl'
] as const;
