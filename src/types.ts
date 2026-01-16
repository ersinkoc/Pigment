import type { Plugin as OxogPlugin, Kernel as OxogKernel, MaybePromise, Unsubscribe } from '@oxog/types';
import type { KernelInstance } from '@oxog/plugin';

// Re-export @oxog/types for convenience
export type { MaybePromise, Unsubscribe } from '@oxog/types';

export type PigmentOptions = {
  level?: 0 | 1 | 2 | 3;
  forceColor?: boolean;
  noColor?: boolean;
  plugins?: Plugin<PigmentContext>[];
};

export type ColorSupport = {
  level: 0 | 1 | 2 | 3;
  hasBasic: boolean;
  has256: boolean;
  has16m: boolean;
};

export type Styler = (text: string) => string;

export type Style = {
  name: string;
  code: number;
  open: string;
  close: string;
  type: 'modifier' | 'color';
  background?: boolean;
};

export type Pigment = {
  bold: Pigment;
  dim: Pigment;
  italic: Pigment;
  underline: Pigment;
  strikethrough: Pigment;
  inverse: Pigment;
  hidden: Pigment;
  reset: Pigment;
  black: Pigment;
  red: Pigment;
  green: Pigment;
  yellow: Pigment;
  blue: Pigment;
  magenta: Pigment;
  cyan: Pigment;
  white: Pigment;
  blackBright: Pigment;
  redBright: Pigment;
  greenBright: Pigment;
  yellowBright: Pigment;
  blueBright: Pigment;
  magentaBright: Pigment;
  cyanBright: Pigment;
  whiteBright: Pigment;
  gray: Pigment;
  grey: Pigment;
  bgBlack: Pigment;
  bgRed: Pigment;
  bgGreen: Pigment;
  bgYellow: Pigment;
  bgBlue: Pigment;
  bgMagenta: Pigment;
  bgCyan: Pigment;
  bgWhite: Pigment;
  bgBlackBright: Pigment;
  bgRedBright: Pigment;
  bgGreenBright: Pigment;
  bgYellowBright: Pigment;
  bgBlueBright: Pigment;
  bgMagentaBright: Pigment;
  bgCyanBright: Pigment;
  bgWhiteBright: Pigment;
  bgGray: Pigment;
  bgGrey: Pigment;
  ansi256(code: number): Pigment;
  bgAnsi256(code: number): Pigment;
  rgb(r: number, g: number, b: number): Pigment;
  bgRgb(r: number, g: number, b: number): Pigment;
  hex(color: string): Pigment;
  bgHex(color: string): Pigment;
  hsl(h: number, s: number, l: number): Pigment;
  bgHsl(h: number, s: number, l: number): Pigment;
  (text: string): string;
};

/**
 * Plugin interface - re-exported from @oxog/types.
 * Use this for creating Pigment-compatible plugins.
 */
export type Plugin<TContext = unknown> = OxogPlugin<TContext>;

/**
 * Kernel interface - re-exported from @oxog/types.
 */
export type Kernel<TContext = unknown> = OxogKernel<TContext>;

/**
 * Pigment kernel type - extended KernelInstance from @oxog/plugin.
 */
export type PigmentKernel<TContext = PigmentContext> = KernelInstance<TContext, PigmentEvents>;

/**
 * Pigment context shared between plugins.
 */
export interface PigmentContext {
  /** Current color level */
  level: 0 | 1 | 2 | 3;
  /** Whether colors are enabled */
  enabled: boolean;
  /** Color support information */
  colorSupport: ColorSupport;
  /** Registered styles map */
  styles?: Map<string, StyleFunction>;
  /** Colors map */
  colors?: {
    foreground: Record<string, number>;
    background: Record<string, number>;
    all: Record<string, number>;
  };
  /** Utility functions */
  utils?: {
    hexToRgb: (hex: string) => { r: number; g: number; b: number };
    hslToRgb: (h: number, s: number, l: number) => { r: number; g: number; b: number };
    rgbToAnsi256: (r: number, g: number, b: number) => number;
    detectColorSupport: (level?: 0 | 1 | 2 | 3) => ColorSupport;
    supportsColor: (level?: 0 | 1 | 2 | 3) => ColorSupport;
  };
}

/**
 * Pigment event map for type-safe events.
 */
export interface PigmentEvents {
  'plugin:register': { plugin: Plugin<PigmentContext> };
  'plugin:unregister': { plugin: Plugin<PigmentContext> };
  'plugin:init': { plugin: Plugin<PigmentContext> };
  'plugin:destroy': { plugin: Plugin<PigmentContext> };
  'context:change': PigmentContext;
  'style:apply': { name: string; text: string };
  'error': Error;
  [key: string]: unknown;
}

/**
 * Style function type.
 */
export type StyleFunction = {
  (text: string): string;
  open: string;
  close: string;
};

export type ThemePreset = 'monokai' | 'dracula' | 'nord' | 'github' | 'vscode' | 'tokyo-night' | 'catppuccin' | 'one-dark' | 'solarized';

export type BoxBorder = 'single' | 'double' | 'rounded' | 'bold' | 'classic';

export type GradientPluginOptions = {
  steps?: number;
};

export type ThemePluginOptions = {
  preset?: ThemePreset;
  custom?: Record<string, string>;
};

export type BoxPluginOptions = {
  border?: BoxBorder;
  padding?: number;
};

export type PigmentPluginOptions = {
  theme?: ThemePreset;
  level?: 0 | 1 | 2 | 3;
};

export type Platform = {
  isNode: boolean;
  isBrowser: boolean;
  isWindows: boolean;
  isCI: boolean;
  hasTTY: boolean;
};

export type ThemePresetColors = {
  keyword: string;
  string: string;
  number: string;
  comment: string;
  error: string;
  success: string;
  warning: string;
  info: string;
};

export type SemanticPluginOptions = {
  success?: string;
  error?: string;
  warning?: string;
  info?: string;
  debug?: string;
};

export type BoxChars = {
  tl: string;
  tr: string;
  bl: string;
  br: string;
  h: string;
  v: string;
};

export type KernelOptions<TContext> = {
  context?: TContext;
};

/**
 * Event handler type.
 */
export type EventHandler = (data?: unknown) => void;
