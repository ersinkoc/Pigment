import type { Plugin, PigmentContext, PigmentKernel } from '../../types.js';
import { ANSI_MODIFIERS } from '../../constants.js';

/**
 * Core plugin that provides text modifiers (bold, dim, italic, etc.).
 *
 * @example
 * ```typescript
 * const pigment = createPigment();
 * pigment.bold('Bold text');
 * pigment.italic.underline('Styled text');
 * ```
 */
export function modifiersPlugin(): Plugin<PigmentContext> {
  return {
    name: 'modifiers',
    version: '1.0.0',

    install(kernel) {
      const k = kernel as PigmentKernel;
      k.updateContext({
        modifiers: ANSI_MODIFIERS
      } as Partial<PigmentContext>);
    }
  };
}
