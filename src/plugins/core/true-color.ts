import type { Plugin, PigmentContext, PigmentKernel } from '../../types.js';
import { ColorError } from '../../errors.js';

/**
 * Core plugin that provides RGB, HEX, and HSL color support.
 *
 * @example
 * ```typescript
 * const pigment = createPigment();
 * pigment.rgb(255, 136, 0)('Orange text');
 * pigment.hex('#FF8800')('Orange text');
 * pigment.hsl(30, 100, 50)('Orange text');
 * ```
 */
export function trueColorPlugin(): Plugin<PigmentContext> {
  return {
    name: 'true-color',
    version: '1.0.0',

    install(kernel) {
      const k = kernel as PigmentKernel;
      const ctx = k.getContext();
      const utils = ctx.utils;

      k.updateContext({
        trueColor: {
          enabled: true,
          supports16m: ctx.colorSupport?.has16m ?? false
        }
      } as Partial<PigmentContext>);

      k.on('color:rgb', (data) => {
        const { r, g, b, background } = data as { r: number; g: number; b: number; background: boolean };

        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
          throw new ColorError(`RGB values must be between 0 and 255, got (${r}, ${g}, ${b})`);
        }

        const prefix = background ? 48 : 38;
        const closeCode = background ? 49 : 39;

        return {
          name: `rgb(${r}, ${g}, ${b})`,
          code: -1,
          open: `\x1b[${prefix};2;${r};${g};${b}m`,
          close: `\x1b[${closeCode}m`,
          type: 'color' as const,
          background
        };
      });

      k.on('color:hex', (data) => {
        const { hex, background } = data as { hex: string; background: boolean };

        if (!utils?.hexToRgb) {
          throw new Error('hexToRgb utility not available');
        }

        // hexToRgb throws ColorError if invalid, so no need to check for null
        const rgb = utils.hexToRgb(hex);
        k.emit('color:rgb', { ...rgb, background });
      });

      k.on('color:hsl', (data) => {
        const { h, s, l, background } = data as { h: number; s: number; l: number; background: boolean };

        if (!utils?.hslToRgb) {
          throw new Error('hslToRgb utility not available');
        }

        const rgb = utils.hslToRgb(h, s, l);
        k.emit('color:rgb', { ...rgb, background });
      });
    }
  };
}
