import type { Plugin, PigmentContext, PigmentKernel } from '../../types.js';
import { detectColorSupport } from '../../utils/color-support.js';
import { isCI } from '../../utils/platform.js';

/**
 * Core plugin that handles environment detection (NO_COLOR, FORCE_COLOR, TTY).
 *
 * Respects environment variables:
 * - NO_COLOR - disables all colors
 * - FORCE_COLOR - forces color level (0, 1, 2, 3)
 * - TERM - terminal type detection
 * - CI - CI environment detection
 *
 * @example
 * ```typescript
 * const pigment = createPigment();
 * // Automatically detects environment
 * ```
 */
export function environmentPlugin(): Plugin<PigmentContext> {
  return {
    name: 'environment',
    version: '1.0.0',

    install(kernel) {
      const k = kernel as PigmentKernel;
      const ci = isCI();
      const existingContext = k.getContext();

      // Preserve the colorSupport level if it was explicitly set via options
      // Only detect fresh if no level was set
      const colorSupport = existingContext.colorSupport ?? detectColorSupport();

      k.updateContext({
        environment: {
          isCI: ci,
          noColor: process.env.NO_COLOR !== undefined,
          forceColor: process.env.FORCE_COLOR !== undefined,
          term: process.env.TERM ?? ''
        }
        // Don't overwrite colorSupport - it was already set in factory with the correct level
      } as Partial<PigmentContext>);

      k.on('environment:check', () => {
        const ctx = k.getContext();
        const env = (ctx as any).environment;

        if (env?.noColor) {
          return { level: 0 as const, enabled: false };
        }

        if (env?.forceColor) {
          const level = parseInt(process.env.FORCE_COLOR ?? '0', 10);
          return { level: Math.max(0, Math.min(3, level)) as 0 | 1 | 2 | 3, enabled: true };
        }

        if (ci) {
          return { level: 1 as const, enabled: colorSupport.hasBasic };
        }

        return { level: colorSupport.level, enabled: colorSupport.level > 0 };
      });

      k.on('environment:override', (data) => {
        const { level, noColor, forceColor } = data as { level?: 0 | 1 | 2 | 3; noColor?: boolean; forceColor?: boolean };

        if (noColor !== undefined) {
          process.env.NO_COLOR = noColor ? '1' : '';
        }

        if (forceColor !== undefined && level !== undefined) {
          process.env.FORCE_COLOR = String(level);
        }

        const newColorSupport = detectColorSupport(level);
        k.updateContext({ colorSupport: newColorSupport });
      });
    }
  };
}
