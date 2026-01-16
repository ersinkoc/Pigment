import type { Plugin, ThemePluginOptions, ThemePreset, PigmentContext, PigmentKernel } from '../../types.js';
import { THEME_PRESETS } from '../../constants.js';

/**
 * Optional plugin that provides predefined color themes.
 *
 * @example
 * ```typescript
 * import { createPigment } from '@oxog/pigment';
 * import { themePlugin } from '@oxog/pigment/plugins';
 *
 * const pigment = createPigment({
 *   plugins: [themePlugin({ preset: 'monokai' })]
 * });
 *
 * pigment.theme.keyword('const');
 * pigment.theme.string('"hello"');
 * pigment.theme.error('Error!');
 * ```
 *
 * Available presets: monokai, dracula, nord, github, vscode, tokyo-night, catppuccin, one-dark, solarized
 */
export function themePlugin(options?: ThemePluginOptions): Plugin<PigmentContext> {
  const preset = options?.preset ?? 'monokai';
  const custom = options?.custom ?? {};
  const theme = Object.keys(custom).length > 0 ? { ...custom } : THEME_PRESETS[preset];

  if (!theme) {
    throw new Error(`Unknown theme preset: ${preset}`);
  }

  return {
    name: 'theme',
    version: '1.0.0',

    install(kernel) {
      const k = kernel as PigmentKernel;

      k.updateContext({
        theme: {
          preset,
          colors: theme,
          enabled: true
        }
      } as Partial<PigmentContext>);

      k.on('style:theme', (data) => {
        const { type, text } = data as { type: keyof typeof theme; text: string };
        const color = theme[type];

        if (!color) {
          throw new Error(`Unknown theme color type: ${String(type)}`);
        }

        const ctx = k.getContext();
        const hexToRgb = ctx.utils?.hexToRgb;
        if (!hexToRgb) {
          throw new Error('hexToRgb utility not available');
        }

        // hexToRgb throws ColorError if invalid, so no null check needed
        const { r, g, b } = hexToRgb(color);
        const open = `\x1b[38;2;${r};${g};${b}m`;

        return `${open}${text}\x1b[39m`;
      });

      k.on('style:theme:keyword', (data) => {
        k.emit('style:theme', { type: 'keyword', text: (data as { text: string }).text });
      });

      k.on('style:theme:string', (data) => {
        k.emit('style:theme', { type: 'string', text: (data as { text: string }).text });
      });

      k.on('style:theme:number', (data) => {
        k.emit('style:theme', { type: 'number', text: (data as { text: string }).text });
      });

      k.on('style:theme:comment', (data) => {
        k.emit('style:theme', { type: 'comment', text: (data as { text: string }).text });
      });

      k.on('style:theme:error', (data) => {
        k.emit('style:theme', { type: 'error', text: (data as { text: string }).text });
      });

      k.on('style:theme:success', (data) => {
        k.emit('style:theme', { type: 'success', text: (data as { text: string }).text });
      });

      k.on('style:theme:warning', (data) => {
        k.emit('style:theme', { type: 'warning', text: (data as { text: string }).text });
      });

      k.on('style:theme:info', (data) => {
        k.emit('style:theme', { type: 'info', text: (data as { text: string }).text });
      });
    }
  };
}

export type { ThemePreset };
