import type { Plugin, BoxPluginOptions, BoxBorder, PigmentContext, PigmentKernel } from '../../types.js';
import { BOX_BORDERS } from '../../constants.js';

/**
 * Optional plugin that provides box drawing with borders.
 *
 * @example
 * ```typescript
 * import { createPigment } from '@oxog/pigment';
 * import { boxPlugin } from '@oxog/pigment/plugins';
 *
 * const pigment = createPigment({
 *   plugins: [boxPlugin()]
 * });
 *
 * pigment.box('Hello World');
 * // ┌─────────────┐
 * // │ Hello World │
 * // └─────────────┘
 *
 * pigment.box('Error!', { border: 'double', borderColor: 'red' });
 * ```
 */
export function boxPlugin(options?: BoxPluginOptions): Plugin<PigmentContext> {
  const border = options?.border ?? 'single';
  const padding = options?.padding ?? 1;

  return {
    name: 'box',
    version: '1.0.0',

    install(kernel) {
      const k = kernel as PigmentKernel;

      k.updateContext({
        box: {
          border,
          padding,
          enabled: true,
          borders: BOX_BORDERS
        }
      } as Partial<PigmentContext>);

      k.on('style:box', (data) => {
        const { text, border: boxBorder = border, padding: boxPadding = padding, bgColor } = data as { text: string; border?: BoxBorder; padding?: number; borderColor?: string; bgColor?: string };
        const chars = BOX_BORDERS[boxBorder];
        const lines = text.split('\n');
        const width = Math.max(...lines.map((l) => l.length)) + boxPadding * 2;
        const pad = ' '.repeat(boxPadding);

        const top = `${chars.tl}${chars.h.repeat(width)}${chars.tr}`;
        const middle = lines.map((line) => {
          const paddedLine = pad + line.padEnd(width - boxPadding * 2) + pad;
          return `${chars.v}${paddedLine}${chars.v}`;
        });
        const bottom = `${chars.bl}${chars.h.repeat(width)}${chars.br}`;

        const result = [top, ...middle, bottom].join('\n');

        if (bgColor) {
          const ctx = k.getContext();
          const hexToRgb = ctx.utils?.hexToRgb;
          if (!hexToRgb) {
            throw new Error('hexToRgb utility not available');
          }
          // hexToRgb throws ColorError if invalid, so no null check needed
          const { r, g, b } = hexToRgb(bgColor);
          return `\x1b[48;2;${r};${g};${b}m${result}\x1b[49m`;
        }

        return result;
      });
    }
  };
}
