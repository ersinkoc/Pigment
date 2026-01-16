import type { PigmentKernel, Pigment, Style, PigmentContext } from '../types.js';
import { generateModifierCode, generateColorCode, generateAnsi256Code, generateRgbCode } from './ansi.js';
import { MODIFIER_NAMES, COLOR_NAMES, BACKGROUND_COLOR_NAMES, EXTENDED_COLOR_METHODS } from '../constants.js';

const proxyCache = new WeakMap<object, Pigment>();

/**
 * Creates a Proxy-based Pigment instance for chainable API.
 *
 * @example
 * ```typescript
 * const pigment = createProxyPigment(kernel);
 * pigment.bold.red('Error!');
 * pigment.italic.blue.bgWhite('Info');
 * ```
 */
export function createProxyPigment(kernel: PigmentKernel, styles: Style[] = []): Pigment {
  const handler = {
    get(target: Pigment, prop: string): unknown {
      const ctx = kernel.getContext();

      if (prop === 'level') {
        return ctx.level;
      }

      if (prop === 'supportsColor') {
        return ctx.colorSupport;
      }

      if (MODIFIER_NAMES.includes(prop as any)) {
        const modifierStyle = generateModifierCode(prop);
        return createProxyPigment(kernel, [...styles, modifierStyle]);
      }

      if (COLOR_NAMES.includes(prop as any) || BACKGROUND_COLOR_NAMES.includes(prop as any)) {
        const background = prop.startsWith('bg');
        const colorName = background ? prop.slice(2) : prop;
        const colorStyle = generateColorCode(colorName, background);
        return createProxyPigment(kernel, [...styles, colorStyle]);
      }

      if (EXTENDED_COLOR_METHODS.includes(prop as any)) {
        if (prop === 'ansi256' || prop === 'bgAnsi256') {
          return (code: number) => {
            const background = prop === 'bgAnsi256';
            const ansi256Style = generateAnsi256Code(code, background);
            return createProxyPigment(kernel, [...styles, ansi256Style]);
          };
        }

        if (prop === 'rgb' || prop === 'bgRgb') {
          return (r: number, g: number, b: number) => {
            const background = prop === 'bgRgb';
            const rgbStyle = generateRgbCode(r, g, b, background);
            return createProxyPigment(kernel, [...styles, rgbStyle]);
          };
        }

        if (prop === 'hex' || prop === 'bgHex') {
          return (color: string) => {
            const background = prop === 'bgHex';
            const hexToRgb = ctx.utils?.hexToRgb;
            if (!hexToRgb) {
              throw new Error('hexToRgb utility not available');
            }
            // hexToRgb throws ColorError if invalid, no null check needed
            const { r, g, b } = hexToRgb(color);
            const rgbStyle = generateRgbCode(r, g, b, background);
            return createProxyPigment(kernel, [...styles, rgbStyle]);
          };
        }

        if (prop === 'hsl' || prop === 'bgHsl') {
          return (h: number, s: number, l: number) => {
            const background = prop === 'bgHsl';
            const hslToRgb = ctx.utils?.hslToRgb;
            if (!hslToRgb) {
              throw new Error('hslToRgb utility not available');
            }
            const { r, g, b } = hslToRgb(h, s, l);
            const rgbStyle = generateRgbCode(r, g, b, background);
            return createProxyPigment(kernel, [...styles, rgbStyle]);
          };
        }
      }

      if (prop === 'visible') {
        const colorSupport = ctx.colorSupport;
        return (text: string) => (colorSupport.level > 0 ? text : text);
      }

      return target[prop as keyof Pigment];
    },

    apply(_target: Pigment, _thisArg: unknown, argArray: unknown[]): unknown {
      const text = String(argArray[0] ?? '');
      return applyStyles(text, styles);
    }
  };

  // The function body is never executed because the apply trap intercepts all calls
  // We just need a callable target for the Proxy
  const pigment = new Proxy((() => '') as unknown as Pigment, handler);

  proxyCache.set(pigment, pigment);
  return pigment;
}

function applyStyles(text: string, styles: Style[]): string {
  if (styles.length === 0) {
    return text;
  }

  const open = styles.map((style) => style.open).join('');
  const close = [...styles].reverse().map((style) => style.close).join('');
  return `${open}${text}${close}`;
}
