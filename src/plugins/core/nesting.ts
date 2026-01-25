import type { Plugin, PigmentContext, PigmentKernel } from '../../types.js';

/**
 * Core plugin that enables nested/composed style support.
 *
 * Nesting is handled directly in applyStyles() by replacing inner reset codes
 * with outer style reopeners. This plugin just sets the enabled flag for
 * compatibility and to indicate nesting support is active.
 *
 * @example
 * ```typescript
 * const pigment = createPigment();
 * // Nested styles work automatically:
 * pigment.red(`Error: ${pigment.blue('details')} here`);
 * // Output: "Error: " (red), "details" (blue), " here" (red again)
 * ```
 */
export function nestingPlugin(): Plugin<PigmentContext> {
  return {
    name: 'nesting',
    version: '1.0.0',

    install(kernel) {
      const k = kernel as PigmentKernel;

      k.updateContext({
        nesting: {
          enabled: true
        }
      } as Partial<PigmentContext>);
    }
  };
}
