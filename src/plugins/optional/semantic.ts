import type { Plugin, SemanticPluginOptions, PigmentContext, PigmentKernel } from '../../types.js';

/**
 * Optional plugin that provides semantic colors (success, error, warning, info, debug).
 *
 * @example
 * ```typescript
 * import { createPigment } from '@oxog/pigment';
 * import { semanticPlugin } from '@oxog/pigment/plugins';
 *
 * const pigment = createPigment({
 *   plugins: [semanticPlugin()]
 * });
 *
 * pigment.success('✓ Task completed');
 * pigment.error('✗ Task failed');
 * pigment.warning('⚠ Check this');
 * pigment.info('ℹ Note');
 * pigment.debug('[DEBUG] value');
 * ```
 */
export function semanticPlugin(options?: SemanticPluginOptions): Plugin<PigmentContext> {
  const colors = options ?? {};

  const defaultColors = {
    success: colors.success ?? '#50fa7b',
    error: colors.error ?? '#ff5555',
    warning: colors.warning ?? '#ffb86c',
    info: colors.info ?? '#8be9fd',
    debug: colors.debug ?? '#6272a4'
  };

  return {
    name: 'semantic',
    version: '1.0.0',

    install(kernel) {
      const k = kernel as PigmentKernel;

      k.updateContext({
        semantic: {
          colors: defaultColors,
          enabled: true
        }
      } as Partial<PigmentContext>);

      const ctx = k.getContext();
      const hexToRgb = ctx.utils?.hexToRgb;
      if (!hexToRgb) {
        throw new Error('hexToRgb utility not available');
      }

      // hexToRgb throws ColorError for invalid hex, so no null check needed
      k.on('style:success', (data) => {
        const { r, g, b } = hexToRgb(defaultColors.success);
        return `\x1b[38;2;${r};${g};${b}m${(data as { text: string }).text}\x1b[39m`;
      });

      k.on('style:error', (data) => {
        const { r, g, b } = hexToRgb(defaultColors.error);
        return `\x1b[38;2;${r};${g};${b}m${(data as { text: string }).text}\x1b[39m`;
      });

      k.on('style:warning', (data) => {
        const { r, g, b } = hexToRgb(defaultColors.warning);
        return `\x1b[38;2;${r};${g};${b}m${(data as { text: string }).text}\x1b[39m`;
      });

      k.on('style:info', (data) => {
        const { r, g, b } = hexToRgb(defaultColors.info);
        return `\x1b[38;2;${r};${g};${b}m${(data as { text: string }).text}\x1b[39m`;
      });

      k.on('style:debug', (data) => {
        const { r, g, b } = hexToRgb(defaultColors.debug);
        return `\x1b[38;2;${r};${g};${b}m${(data as { text: string }).text}\x1b[39m`;
      });
    }
  };
}
