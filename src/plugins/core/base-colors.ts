import type { Plugin, PigmentContext, PigmentKernel } from '../../types.js';
import { ANSI_FOREGROUND_COLORS, ANSI_FOREGROUND_BRIGHT_COLORS, ANSI_BACKGROUND_COLORS, ANSI_BACKGROUND_BRIGHT_COLORS } from '../../constants.js';

/**
 * Core plugin that provides 16 base ANSI colors + bright variants.
 *
 * @example
 * ```typescript
 * const pigment = createPigment();
 * pigment.red('Error!');
 * pigment.greenBright('Success!');
 * ```
 */
export function baseColorsPlugin(): Plugin<PigmentContext> {
  return {
    name: 'base-colors',
    version: '1.0.0',

    install(kernel) {
      const k = kernel as PigmentKernel;
      const foregroundColors = { ...ANSI_FOREGROUND_COLORS, ...ANSI_FOREGROUND_BRIGHT_COLORS };
      const backgroundColors = { ...ANSI_BACKGROUND_COLORS, ...ANSI_BACKGROUND_BRIGHT_COLORS };

      k.updateContext({
        colors: {
          foreground: foregroundColors,
          background: backgroundColors,
          all: { ...foregroundColors, ...backgroundColors }
        }
      });
    }
  };
}
