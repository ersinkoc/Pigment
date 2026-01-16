import type { Plugin, PigmentContext, PigmentKernel } from '../../types.js';

/**
 * Core plugin that provides nested/composed style support.
 *
 * @example
 * ```typescript
 * const pigment = createPigment();
 * pigment.red(`Error: ${pigment.bold('critical')} issue`);
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

      k.on('style:nest', (data) => {
        const { innerText, outerStyles } = data as { innerText: string; outerStyles: string[]; _innerStyles: string[] };

        const open = outerStyles.join('');
        const close = outerStyles.map(() => '\x1b[0m').join('');

        return `${open}${innerText}${close}`;
      });
    }
  };
}
