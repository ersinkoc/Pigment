import type { Plugin, PigmentPluginOptions, ThemePreset } from '../../types.js';
import type { Kernel } from '@oxog/types';
import type { KernelInstance } from '@oxog/plugin';
import { THEME_PRESETS } from '../../constants.js';
import { hexToRgb } from '../../utils/hex-to-rgb.js';
import { createPigment } from '../../core/factory.js';

/**
 * Plugin that adds Pigment color support to any @oxog kernel.
 * Use this in @oxog/log, @oxog/cli, etc.
 *
 * @example
 * ```typescript
 * // In @oxog/log or @oxog/cli
 * import { pigmentPlugin } from '@oxog/pigment/plugins';
 *
 * const log = createLogger();
 * log.use(pigmentPlugin()); // Adds color support to logger
 *
 * // Now log has access to colors
 * log.pigment.red('Error message');
 * ```
 */
export function pigmentPlugin<TContext = unknown>(options?: PigmentPluginOptions): Plugin<TContext> {
  const theme = options?.theme ?? 'monokai';
  const level = options?.level;

  return {
    name: 'pigment',
    version: '1.0.0',

    install(kernel) {
      const k = kernel as unknown as KernelInstance<TContext, Record<string, unknown>>;
      const themeColors = THEME_PRESETS[theme] ?? THEME_PRESETS.monokai;

      // Create a pigment instance for the ecosystem
      const pigment = createPigment({ level });

      // Extend kernel with pigment instance
      (k as any).pigment = pigment;

      k.updateContext({
        ecosystem: {
          theme,
          level,
          themeColors,
          enabled: true
        },
        colors: {
          red: pigment.red,
          green: pigment.green,
          yellow: pigment.yellow,
          blue: pigment.blue,
          magenta: pigment.magenta,
          cyan: pigment.cyan,
          white: pigment.white,
          black: pigment.black,
          bold: pigment.bold,
          dim: pigment.dim,
          italic: pigment.italic,
          underline: pigment.underline
        }
      } as unknown as Partial<TContext>);

      k.on('ecosystem:style', (data) => {
        const { text, type, preset: presetOverride } = data as { text: string; type?: 'success' | 'error' | 'warning' | 'info'; preset?: ThemePreset };
        const activeTheme = presetOverride ? THEME_PRESETS[presetOverride] ?? themeColors : themeColors;

        if (type && activeTheme[type as keyof typeof activeTheme]) {
          const color = activeTheme[type as keyof typeof activeTheme];
          // hexToRgb throws ColorError for invalid hex, so no null check needed
          const { r, g, b } = hexToRgb(color);
          return `\x1b[38;2;${r};${g};${b}m${text}\x1b[39m`;
        }

        return text;
      });

      k.on('ecosystem:format', (data) => {
        const { message, level = 'info' } = data as { message: string; level?: string };
        const colorMap: Record<string, string> = {
          info: themeColors.info,
          success: themeColors.success,
          warning: themeColors.warning,
          error: themeColors.error
        };

        const color = colorMap[level] ?? themeColors.info;
        // hexToRgb throws ColorError for invalid hex, so no null check needed
        const { r, g, b } = hexToRgb(color);
        return `\x1b[38;2;${r};${g};${b}m${message}\x1b[39m`;
      });
    }
  };
}
